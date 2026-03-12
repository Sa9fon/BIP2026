import React, { useState } from 'react';
import { Settings, Leaf, Recycle, Wind, Trophy, ChevronRight, User, Bell, CreditCard, Globe, HelpCircle, LogOut } from 'lucide-react';
import { MOCK_USER } from '../constants';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { ProfileSettingsModal } from '../components/ProfileSettingsModal';

type SettingType = 'personal' | 'notifications' | 'payment' | 'language' | 'help' | null;

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [activeSetting, setActiveSetting] = useState<SettingType>(null);

  const menuItems = [
    { id: 'personal' as SettingType, icon: User, label: 'Personal Information' },
    { id: 'notifications' as SettingType, icon: Bell, label: 'Notification Settings' },
    { id: 'payment' as SettingType, icon: CreditCard, label: 'Payment Methods' },
    { id: 'language' as SettingType, icon: Globe, label: 'App Language', extra: 'English' },
    { id: 'help' as SettingType, icon: HelpCircle, label: 'Help & Support' },
  ];

  return (
    <div className="min-h-screen bg-black text-[#f5f5f5] pb-32">
      {/* Header Section */}
      <header className="flex items-center justify-between p-8 pt-12 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <div className="size-20 rounded-full border-2 border-[#ccff00] p-1 shadow-[0_0_15px_rgba(204,255,0,0.2)]">
            <div 
              className="size-full rounded-full bg-cover bg-center border-2 border-black" 
              style={{ backgroundImage: `url('${user.avatar}')` }}
            ></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">ID: {user.studentId}</p>
          </div>
        </div>
        <button 
          onClick={() => setActiveSetting('personal')}
          className="size-12 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10 hover:bg-white/10 transition-all"
        >
          <Settings size={22} />
        </button>
      </header>

      {/* Hero Impact Card */}
      <div className="px-8 py-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="premium-card p-8 bg-gradient-to-br from-[#0f0f0f] to-[#ccff00]/5"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold tracking-tight">Environmental Impact</h2>
            <div className="p-2 bg-[#ccff00]/10 rounded-xl border border-[#ccff00]/20">
              <Leaf className="text-[#ccff00]" size={20} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="size-12 rounded-2xl bg-white/5 flex items-center justify-center mb-3 border border-white/5">
                <Leaf className="text-[#ccff00]" size={22} />
              </div>
              <p className="text-2xl font-bold text-white tracking-tighter leading-none">{user.impact.cupsSaved}</p>
              <p className="uppercase-label mt-2">Cups Saved</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="size-12 rounded-2xl bg-white/5 flex items-center justify-center mb-3 border border-white/5">
                <Recycle className="text-[#ccff00]" size={22} />
              </div>
              <p className="text-2xl font-bold text-white tracking-tighter leading-none">{user.impact.plasticSavedKg}kg</p>
              <p className="uppercase-label mt-2">Plastic Out</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="size-12 rounded-2xl bg-white/5 flex items-center justify-center mb-3 border border-white/5">
                <Wind className="text-[#ccff00]" size={22} />
              </div>
              <p className="text-2xl font-bold text-white tracking-tighter leading-none">{user.impact.co2SavedKg}kg</p>
              <p className="uppercase-label mt-2">CO2 Less</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gamified Progress Section */}
      <div className="px-8 pb-10">
        <div className="premium-card p-8 bg-[#0f0f0f]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-[#ccff00]/20 p-2.5 rounded-xl border border-[#ccff00]/20">
                <Trophy className="text-[#ccff00]" size={22} />
              </div>
              <span className="text-xl font-bold tracking-tight">{user.level}</span>
            </div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Level 4</span>
          </div>
          <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(user.xp / user.nextLevelXp) * 100}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="bg-[#ccff00] h-full rounded-full shadow-[0_0_15px_rgba(204,255,0,0.3)]"
            />
          </div>
          <div className="flex justify-between mt-4">
            <p className="uppercase-label">Next Level: Eco Champion</p>
            <p className="text-xs text-[#ccff00] font-bold tracking-tight">{user.xp} / {user.nextLevelXp} XP</p>
          </div>
        </div>
      </div>

      {/* Menu List Section */}
      <div className="px-8 space-y-4">
        <h3 className="uppercase-label mb-6 ml-1">Account Settings</h3>
        <div className="space-y-4">
          {menuItems.map((item, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveSetting(item.id)}
              className="w-full premium-card p-6 flex items-center justify-between group hover:bg-white/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white/5 text-slate-400 group-hover:bg-[#ccff00]/10 group-hover:text-[#ccff00] transition-all">
                  <item.icon size={20} />
                </div>
                <span className="text-base font-bold tracking-tight">{item.label}</span>
              </div>
              <div className="flex items-center gap-3">
                {item.extra && <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.extra}</span>}
                <ChevronRight className="text-slate-600 group-hover:text-[#ccff00] transition-all" size={18} />
              </div>
            </button>
          ))}
          
          <button 
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full premium-card p-6 mt-8 flex items-center justify-between group hover:bg-red-500/5 transition-all border-red-500/10"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-red-500/10 text-red-500">
                <LogOut size={20} />
              </div>
              <span className="text-base font-bold tracking-tight text-red-500">Log Out</span>
            </div>
            <ChevronRight className="text-red-500/40" size={18} />
          </button>
        </div>
      </div>

      <ProfileSettingsModal 
        type={activeSetting} 
        onClose={() => setActiveSetting(null)} 
      />
    </div>
  );
};
