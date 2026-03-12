import React, { useState } from 'react';
import { Bell, TrendingUp, Leaf, Coffee } from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_USER, MOCK_ACTIVITIES } from '../constants';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useUser } from '../context/UserContext';
import { ActivityDetailModal } from '../components/ActivityDetailModal';
import { Activity } from '../types';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, activities } = useUser();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  return (
    <div className="min-h-screen bg-black text-[#f5f5f5] pb-32">
      <header className="flex items-center justify-between p-8 pt-12">
        <div className="flex items-center gap-4">
          <div className="size-14 rounded-full border border-white/10 p-1 overflow-hidden shadow-xl">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <p className="uppercase-label">Welcome back</p>
            <h1 className="text-2xl font-bold text-white tracking-tight">Hi, {user.name}</h1>
          </div>
        </div>
        <button className="size-12 flex items-center justify-center rounded-full bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all">
          <Bell size={22} />
        </button>
      </header>

      <main className="px-6 space-y-10">
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          <div className="premium-card p-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 size-40 bg-[#ccff00]/5 blur-[80px] rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 size-40 bg-white/5 blur-[80px] rounded-full"></div>
            
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="uppercase-label mb-1">Current Balance</p>
                  <h2 className="text-6xl font-bold tracking-tighter text-white">
                    {user.points} <span className="text-xl font-medium text-[#ccff00] uppercase tracking-widest ml-1">pts</span>
                  </h2>
                </div>
                <div className="bg-[#ccff00]/10 text-[#ccff00] px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold border border-[#ccff00]/20">
                  <TrendingUp size={14} />
                  +12%
                </div>
              </div>
              
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mt-2 border border-white/5">
                <div 
                  className="bg-[#ccff00] h-full rounded-full shadow-[0_0_15px_rgba(204,255,0,0.5)]"
                  style={{ width: `${(user.xp / user.nextLevelXp) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest opacity-40">
                <span>Level {user.level}</span>
                <span>Next goal: {user.nextLevelXp} pts</span>
              </div>
            </div>
          </div>
        </motion.section>

        <section className="">
          <button 
            onClick={() => navigate('/card')}
            className="w-full bg-[#ccff00] hover:scale-[1.02] active:scale-[0.98] transition-all p-5 rounded-full flex items-center justify-center gap-4 shadow-[0_15px_30px_rgba(204,255,0,0.15)] group"
          >
            <Leaf className="text-black font-bold" size={26} />
            <span className="text-black font-bold text-xl tracking-tight">Show My QR Card</span>
          </button>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-bold text-white tracking-tight">Recent Activity</h3>
            <button 
              onClick={() => navigate('/activities')}
              className="text-[#ccff00] text-sm font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
            >
              See All
            </button>
          </div>
          
          <div className="space-y-4">
            {activities.slice(0, 3).map((activity) => (
              <div 
                key={activity.id} 
                onClick={() => setSelectedActivity(activity)}
                className="premium-card p-5 flex items-center justify-between active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-center gap-5">
                  <div className={cn(
                    "size-12 rounded-2xl flex items-center justify-center border border-white/5",
                    activity.type === 'return' ? "bg-[#ccff00]/10 text-[#ccff00]" : "bg-white/5 text-white"
                  )}>
                    {activity.type === 'return' ? <Leaf size={22} /> : <Coffee size={22} />}
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg leading-tight">{activity.title}</p>
                    <p className="text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">{activity.date} • {activity.location}</p>
                  </div>
                </div>
                <span className={cn(
                  "font-bold text-lg tracking-tight",
                  activity.points > 0 ? "text-[#ccff00]" : "text-slate-500"
                )}>
                  {activity.points > 0 ? `+${activity.points}` : activity.points}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <ActivityDetailModal 
        activity={selectedActivity} 
        onClose={() => setSelectedActivity(null)} 
      />
    </div>
  );
};
