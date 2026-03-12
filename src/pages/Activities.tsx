import React, { useState } from 'react';
import { ArrowLeft, Leaf, Coffee, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useUser } from '../context/UserContext';
import { cn } from '../lib/utils';
import { Activity } from '../types';
import { ActivityDetailModal } from '../components/ActivityDetailModal';

export const Activities: React.FC = () => {
  const navigate = useNavigate();
  const { activities } = useUser();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActivities = activities.filter(activity => 
    activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-[#f5f5f5] pb-32">
      <header className="flex items-center bg-black/80 backdrop-blur-xl p-8 pt-12 justify-between sticky top-0 z-20 border-b border-white/5">
        <button 
          onClick={() => navigate(-1)}
          className="text-white flex size-12 items-center justify-center bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-2xl font-bold tracking-tight flex-1 text-center pr-12">All Activity</h1>
      </header>

      <div className="px-8 py-8 space-y-8">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-[#ccff00]" size={20} />
          <input 
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0f0f0f] border border-white/10 rounded-full py-4 pl-14 pr-6 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#ccff00]/50 transition-all shadow-inner"
          />
        </div>

        <div className="space-y-4">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity, index) => (
              <motion.div 
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
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
              </motion.div>
            ))
          ) : (
            <div className="py-32 text-center space-y-6">
              <div className="size-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-700 border border-white/5">
                <Search size={36} />
              </div>
              <p className="text-slate-500 font-medium text-lg tracking-tight">No activities found</p>
            </div>
          )}
        </div>
      </div>

      <ActivityDetailModal 
        activity={selectedActivity} 
        onClose={() => setSelectedActivity(null)} 
      />
    </div>
  );
};
