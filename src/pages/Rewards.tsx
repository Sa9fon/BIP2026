import React, { useState } from 'react';
import { ArrowLeft, MapPin, X, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { MOCK_REWARDS } from '../constants';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';

export const Rewards: React.FC = () => {
  const navigate = useNavigate();
  const { user, redeemReward } = useUser();
  const [redeemedReward, setRedeemedReward] = useState<typeof MOCK_REWARDS[0] | null>(null);
  const [redemptionId, setRedemptionId] = useState<string>('');
  const [vendorFilter, setVendorFilter] = useState<'ALL' | 'CAFETERIA' | 'LOCAL_BUSINESS'>('ALL');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'FREE' | 'PROMO' | 'DISCOUNT'>('ALL');

  const filteredRewards = MOCK_REWARDS.filter(reward => {
    const vendorMatch = vendorFilter === 'ALL' || reward.vendorType === vendorFilter;
    const typeMatch = typeFilter === 'ALL' || reward.rewardType === typeFilter;
    return vendorMatch && typeMatch;
  });

  const handleRedeem = (reward: typeof MOCK_REWARDS[0]) => {
    if (user.points >= reward.points) {
      redeemReward(reward.points, reward.name);
      const id = `RED-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      setRedemptionId(id);
      setRedeemedReward(reward);
    } else {
      alert("Not enough points!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#f5f5f5] pb-32">
      {/* Header */}
      <header className="flex items-center bg-black/80 backdrop-blur-xl p-8 pt-12 justify-between border-b border-white/5">
        <button 
          onClick={() => navigate(-1)}
          className="text-white flex size-12 items-center justify-center bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-2xl font-bold tracking-tight flex-1 text-center pr-12">Rewards</h1>
      </header>

      {/* Balance Card */}
      <div className="px-8 py-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="premium-card p-8 bg-gradient-to-br from-[#0f0f0f] to-[#ccff00]/5"
        >
          <p className="uppercase-label mb-2">Available Balance</p>
          <div className="flex items-baseline gap-3">
            <p className="text-[#ccff00] text-5xl font-bold tracking-tighter leading-tight">{user.points}</p>
            <p className="text-white text-xl font-medium uppercase tracking-widest opacity-60">EcoPoints</p>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-8">
        <div className="flex flex-col gap-6 pb-8">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold tracking-tight">Available Rewards</h3>
            <button 
              onClick={() => navigate('/map')}
              className="text-[#ccff00] text-[10px] font-bold uppercase tracking-widest bg-[#ccff00]/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-[#ccff00]/20 transition-all border border-[#ccff00]/20"
            >
              <MapPin size={12} />
              Near You
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {(['ALL', 'CAFETERIA', 'LOCAL_BUSINESS'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVendorFilter(v)}
                  className={cn(
                    "px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border whitespace-nowrap",
                    vendorFilter === v 
                      ? "bg-[#ccff00] text-black border-[#ccff00]" 
                      : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                  )}
                >
                  {v === 'ALL' ? 'All Vendors' : v.replace('_', ' ')}
                </button>
              ))}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {(['ALL', 'FREE', 'PROMO', 'DISCOUNT'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={cn(
                    "px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border whitespace-nowrap",
                    typeFilter === t 
                      ? "bg-[#ccff00] text-black border-[#ccff00]" 
                      : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                  )}
                >
                  {t === 'ALL' ? 'All Types' : t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        {filteredRewards.length > 0 ? (
          <div className="grid grid-cols-2 gap-6">
            {filteredRewards.map((reward) => (
              <motion.div 
                key={reward.id}
                whileHover={{ y: -4 }}
                className="premium-card p-4 flex flex-col gap-4 group"
              >
                <div className="w-full aspect-square rounded-2xl bg-white/5 overflow-hidden relative border border-white/5 shadow-xl">
                  <div 
                    className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-90 transition-transform duration-500 group-hover:scale-110" 
                    style={{ backgroundImage: `url("${reward.image}")` }}
                  ></div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xl px-2.5 py-1 rounded-full text-[10px] font-bold text-[#ccff00] border border-[#ccff00]/20">
                    {reward.points} PTS
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xl px-2 py-0.5 rounded-full text-[8px] font-bold text-white/60 border border-white/10 uppercase tracking-widest">
                    {reward.rewardType}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="text-white text-base font-bold truncate tracking-tight">{reward.name}</p>
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-0.5">{reward.category}</p>
                  </div>
                  <button 
                    onClick={() => handleRedeem(reward)}
                    className="w-full bg-[#ccff00] py-3 rounded-full text-black text-xs font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#ccff00]/10"
                  >
                    Redeem
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="size-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10">
              <X className="text-white/20" size={32} />
            </div>
            <p className="text-white font-bold">No rewards found</p>
            <p className="text-white/40 text-sm mt-1">Try adjusting your filters</p>
            <button 
              onClick={() => { setVendorFilter('ALL'); setTypeFilter('ALL'); }}
              className="mt-6 text-[#ccff00] text-xs font-bold uppercase tracking-widest"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Redemption Modal */}
      <AnimatePresence>
        {redeemedReward && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRedeemedReward(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-[#16161a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 flex flex-col items-center text-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="size-12 bg-[#39FF14]/20 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 className="text-[#39FF14]" size={28} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Redemption Successful!</h2>
                  <p className="text-slate-400 text-sm">Show this QR code to the vendor to claim your free {redeemedReward.name.toLowerCase()}.</p>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-inner">
                  <QRCodeSVG 
                    value={JSON.stringify({
                      id: redemptionId,
                      reward: redeemedReward.name,
                      user: user.name,
                      timestamp: new Date().toISOString()
                    })}
                    size={200}
                    level="H"
                    includeMargin={false}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Redemption ID</p>
                  <p className="text-sm font-mono text-[#39FF14]">{redemptionId}</p>
                </div>

                <button 
                  onClick={() => setRedeemedReward(null)}
                  className="w-full bg-white/5 hover:bg-white/10 py-3 rounded-xl text-white text-sm font-bold transition-colors border border-white/10"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
