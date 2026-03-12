import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Leaf, Coffee, MapPin, Calendar, Info } from 'lucide-react';
import { Activity } from '../types';
import { cn } from '../lib/utils';

interface ActivityDetailModalProps {
  activity: Activity | null;
  onClose: () => void;
}

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({ activity, onClose }) => {
  if (!activity) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-[#0f0f0f] border-t sm:border border-white/10 rounded-t-[40px] sm:rounded-[40px] overflow-hidden shadow-2xl shadow-black/50"
        >
          <div className="p-10 pt-12">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 size-12 flex items-center justify-center rounded-full bg-white/5 text-slate-500 hover:text-white transition-all border border-white/10"
            >
              <X size={22} />
            </button>

            <div className="flex flex-col items-center text-center gap-8">
              <div className={cn(
                "size-24 rounded-[32px] flex items-center justify-center border border-white/5 shadow-2xl",
                activity.type === 'return' ? "bg-[#ccff00]/10 text-[#ccff00] shadow-[#ccff00]/5" : "bg-[#1152d4]/10 text-[#1152d4] shadow-[#1152d4]/5"
              )}>
                {activity.type === 'return' ? <Leaf size={48} /> : <Coffee size={48} />}
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-white tracking-tight">{activity.title}</h2>
                <p className={cn(
                  "text-2xl font-bold tracking-tight",
                  activity.points > 0 ? "text-[#ccff00]" : "text-slate-500"
                )}>
                  {activity.points > 0 ? `+${activity.points}` : activity.points} EcoPoints
                </p>
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-6 rounded-[24px] flex flex-col items-center gap-2 border border-white/5">
                  <Calendar size={18} className="text-slate-500" />
                  <p className="uppercase-label">Date</p>
                  <p className="text-base font-bold text-white tracking-tight">{activity.date.split(',')[0]}</p>
                </div>
                <div className="bg-white/5 p-6 rounded-[24px] flex flex-col items-center gap-2 border border-white/5">
                  <MapPin size={18} className="text-slate-500" />
                  <p className="uppercase-label">Location</p>
                  <p className="text-base font-bold text-white tracking-tight">{activity.location}</p>
                </div>
              </div>

              <div className="w-full bg-white/5 p-8 rounded-[32px] border border-white/5 text-left space-y-4">
                <div className="flex items-center gap-3 text-[#1152d4]">
                  <div className="p-2 bg-[#1152d4]/10 rounded-xl border border-[#1152d4]/20">
                    <Info size={18} />
                  </div>
                  <h3 className="uppercase-label">Details</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  {activity.description || "No additional information available for this activity."}
                </p>
              </div>

              <button 
                onClick={onClose}
                className="w-full bg-[#ccff00] hover:scale-[1.02] active:scale-[0.98] py-5 rounded-full text-black font-bold transition-all shadow-xl shadow-[#ccff00]/10"
              >
                Got it
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
