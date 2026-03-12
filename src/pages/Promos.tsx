import React, { useState } from 'react';
import { ArrowLeft, Search, ChevronDown, MapPin, Ticket, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PROMOS } from '../constants';
import { cn } from '../lib/utils';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';

export const Promos: React.FC = () => {
  const navigate = useNavigate();
  const { user, claimPromo, claimedPromos } = useUser();
  const [activeCategory, setActiveCategory] = useState('All');
  const [redeemedPromo, setRedeemedPromo] = useState<typeof MOCK_PROMOS[0] | null>(null);
  const [redemptionId, setRedemptionId] = useState<string>('');

  const categories = ['All', 'Food', 'Drinks', 'Retail'];

  const filteredPromos = activeCategory === 'All' 
    ? MOCK_PROMOS 
    : MOCK_PROMOS.filter(p => p.category === activeCategory);

  const handleClaim = (promo: typeof MOCK_PROMOS[0]) => {
    claimPromo(promo.id);
    const id = `PRM-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    setRedemptionId(id);
    setRedeemedPromo(promo);
  };

  return (
    <div className="min-h-screen bg-black text-[#f5f5f5] pb-32">
      {/* Header */}
      <div className="flex items-center bg-black/80 backdrop-blur-xl p-8 pt-12 justify-between sticky top-0 z-10 border-b border-white/5">
        <button 
          onClick={() => navigate(-1)}
          className="text-white flex size-12 shrink-0 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
        >
          <ArrowLeft size={22} />
        </button>
        <h2 className="text-2xl font-bold tracking-tight flex-1 text-center pr-12">Partner Promos</h2>
      </div>

      {/* Search & Filters */}
      <div className="px-8 py-8 space-y-8">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-[#ccff00]" size={20} />
          <input 
            className="w-full bg-[#0f0f0f] border border-white/10 rounded-full py-4 pl-14 pr-6 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#ccff00]/50 transition-all shadow-inner"
            placeholder="Search local businesses"
          />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "flex h-11 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 text-sm font-bold transition-all uppercase tracking-widest",
                activeCategory === cat 
                  ? "bg-[#ccff00] text-black" 
                  : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
              )}
            >
              {cat}
              {cat !== 'All' && <ChevronDown size={14} />}
            </button>
          ))}
        </div>
      </div>

      {/* Feed of Cards */}
      <div className="px-8 space-y-6">
        {filteredPromos.map((promo) => (
          <div 
            key={promo.id}
            className={cn(
              "premium-card p-6 flex flex-col gap-6",
              promo.featured && "border-[#ccff00]/30 bg-gradient-to-br from-[#0f0f0f] to-[#ccff00]/5"
            )}
          >
            {promo.featured && (
              <div className="absolute top-6 right-6 z-[1]">
                <span className="flex items-center gap-1.5 rounded-full bg-[#ccff00]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#ccff00] border border-[#ccff00]/20">
                  <Ticket size={12} className="fill-[#ccff00]" />
                  Featured
                </span>
              </div>
            )}
            
            <div className="flex gap-6 items-center">
              <div className="size-20 rounded-2xl bg-white/5 flex items-center justify-center overflow-hidden border border-white/10 shadow-xl">
                <img 
                  className="w-full h-full object-cover opacity-90" 
                  src={promo.logo} 
                  alt={promo.name}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-white text-xl font-bold tracking-tight">{promo.name}</p>
                <p className="text-[#ccff00] text-sm font-bold uppercase tracking-wider">{promo.offer}</p>
                <p className="text-slate-500 text-xs mt-1 flex items-center gap-1.5 font-medium">
                  <MapPin size={14} />
                  {promo.distance}
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => handleClaim(promo)}
              disabled={claimedPromos.includes(promo.id)}
              className={cn(
                "w-full py-4 font-bold rounded-full transition-all flex items-center justify-center gap-2 text-base tracking-tight",
                claimedPromos.includes(promo.id) 
                  ? "bg-white/5 text-slate-600 cursor-not-allowed border border-white/5"
                  : promo.featured 
                    ? "bg-[#ccff00] hover:scale-[1.02] active:scale-[0.98] text-black shadow-[0_10px_20px_rgba(204,255,0,0.15)]" 
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:scale-[1.02] active:scale-[0.98]"
              )}
            >
              {claimedPromos.includes(promo.id) ? "Claimed" : "Claim Promo"}
              {promo.featured && !claimedPromos.includes(promo.id) && <Ticket size={18} />}
            </button>
          </div>
        ))}
      </div>

      {/* Redemption Modal */}
      <AnimatePresence>
        {redeemedPromo && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRedeemedPromo(null)}
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
                  <h2 className="text-xl font-bold text-white">Promo Activated!</h2>
                  <p className="text-slate-400 text-sm">Show this QR code at {redeemedPromo.name} to redeem your {redeemedPromo.offer.toLowerCase()}.</p>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-inner">
                  <QRCodeSVG 
                    value={JSON.stringify({
                      id: redemptionId,
                      promo: redeemedPromo.name,
                      offer: redeemedPromo.offer,
                      user: user.name,
                      timestamp: new Date().toISOString()
                    })}
                    size={200}
                    level="H"
                    includeMargin={false}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Promo ID</p>
                  <p className="text-sm font-mono text-[#39FF14]">{redemptionId}</p>
                </div>

                <button 
                  onClick={() => setRedeemedPromo(null)}
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
