import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, ChevronRight, ArrowLeft, Medal, Users, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';

interface UserRank {
  name: string;
  points: number;
  avatar: string;
  rank: number;
}

interface DepartmentRank {
  id: string;
  name: string;
  points: number;
  totalUsers: number;
  rank: number;
  users: UserRank[];
}

const DEPARTMENTS: DepartmentRank[] = [
  {
    id: 'ista',
    name: 'ISTA - Technology & Architecture',
    points: 125400,
    totalUsers: 450,
    rank: 1,
    users: [
      { name: 'Ricardo Silva', points: 4500, avatar: 'https://picsum.photos/seed/ricardo/100/100', rank: 1 },
      { name: 'Ana Pereira', points: 4200, avatar: 'https://picsum.photos/seed/ana/100/100', rank: 2 },
      { name: 'João Santos', points: 3900, avatar: 'https://picsum.photos/seed/joao/100/100', rank: 3 },
      { name: 'Maria Costa', points: 3750, avatar: 'https://picsum.photos/seed/maria/100/100', rank: 4 },
      { name: 'Pedro Alves', points: 3600, avatar: 'https://picsum.photos/seed/pedro/100/100', rank: 5 },
    ]
  },
  {
    id: 'ibs',
    name: 'ISCTE Business School',
    points: 118200,
    totalUsers: 620,
    rank: 2,
    users: [
      { name: 'Sofia Martins', points: 4100, avatar: 'https://picsum.photos/seed/sofia/100/100', rank: 1 },
      { name: 'Tiago Rocha', points: 3950, avatar: 'https://picsum.photos/seed/tiago/100/100', rank: 2 },
      { name: 'Beatriz Lima', points: 3800, avatar: 'https://picsum.photos/seed/beatriz/100/100', rank: 3 },
    ]
  },
  {
    id: 'ecsh',
    name: 'ECSH - Social Sciences',
    points: 94500,
    totalUsers: 380,
    rank: 3,
    users: [
      { name: 'Gonçalo Dias', points: 3500, avatar: 'https://picsum.photos/seed/goncalo/100/100', rank: 1 },
      { name: 'Inês Ferreira', points: 3400, avatar: 'https://picsum.photos/seed/ines/100/100', rank: 2 },
    ]
  },
  {
    id: 'espp',
    name: 'ESPP - Sociology & Policy',
    points: 82100,
    totalUsers: 310,
    rank: 4,
    users: [
      { name: 'Miguel Sousa', points: 3200, avatar: 'https://picsum.photos/seed/miguel/100/100', rank: 1 },
      { name: 'Clara Mota', points: 3100, avatar: 'https://picsum.photos/seed/clara/100/100', rank: 2 },
    ]
  }
];

export const Leaderboard: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<DepartmentRank | null>(null);

  const renderDepartmentList = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Leaderboard</h1>
          <p className="text-slate-500 font-medium mt-1">Top performing departments at ISCTE</p>
        </div>
        <div className="size-14 rounded-2xl bg-[#ccff00]/10 flex items-center justify-center text-[#ccff00] border border-[#ccff00]/20">
          <Trophy size={28} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {DEPARTMENTS.map((dept) => (
          <button
            key={dept.id}
            onClick={() => setSelectedDept(dept)}
            className="premium-card p-6 bg-white/5 hover:bg-white/10 transition-all group text-left relative overflow-hidden"
          >
            {dept.rank <= 3 && (
              <div className={cn(
                "absolute top-0 right-0 w-24 h-24 blur-3xl opacity-10 -mr-12 -mt-12",
                dept.rank === 1 ? "bg-yellow-400" : dept.rank === 2 ? "bg-slate-300" : "bg-orange-400"
              )} />
            )}
            
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-6">
                <div className={cn(
                  "size-12 rounded-xl flex items-center justify-center font-bold text-xl border",
                  dept.rank === 1 ? "bg-yellow-400/10 border-yellow-400/30 text-yellow-400" :
                  dept.rank === 2 ? "bg-slate-300/10 border-slate-300/30 text-slate-300" :
                  dept.rank === 3 ? "bg-orange-400/10 border-orange-400/30 text-orange-400" :
                  "bg-white/5 border-white/10 text-slate-500"
                )}>
                  {dept.rank}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg tracking-tight group-hover:text-[#ccff00] transition-colors">{dept.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Users size={10} /> {dept.totalUsers} Members
                    </span>
                    <span className="text-[10px] text-[#ccff00] font-bold uppercase tracking-widest flex items-center gap-1">
                      <TrendingUp size={10} /> {dept.points.toLocaleString()} pts
                    </span>
                  </div>
                </div>
              </div>
              <ChevronRight size={20} className="text-slate-600 group-hover:text-[#ccff00] transition-all" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderUserList = (dept: DepartmentRank) => (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => setSelectedDept(null)}
          className="size-12 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10 hover:bg-white/10 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">{dept.name}</h2>
          <p className="text-slate-500 font-medium text-sm">Top contributors in this department</p>
        </div>
      </div>

      <div className="space-y-3">
        {dept.users.map((user) => (
          <div 
            key={user.name}
            className="premium-card p-5 bg-white/5 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="size-12 rounded-full object-cover border-2 border-white/10"
                  referrerPolicy="no-referrer"
                />
                {user.rank <= 3 && (
                  <div className={cn(
                    "absolute -top-1 -right-1 size-5 rounded-full flex items-center justify-center border-2 border-black",
                    user.rank === 1 ? "bg-yellow-400" : user.rank === 2 ? "bg-slate-300" : "bg-orange-400"
                  )}>
                    <Medal size={10} className="text-black" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-white font-bold tracking-tight">{user.name}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Rank #{user.rank}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#ccff00] font-bold tracking-tight">{user.points.toLocaleString()}</p>
              <p className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">Points</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 premium-card bg-[#ccff00]/5 border-[#ccff00]/10 mt-8">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-full bg-[#ccff00] flex items-center justify-center text-black">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-white font-bold">You're in the top 15%!</p>
            <p className="text-slate-500 text-xs">Keep returning cups to climb the rank.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black pb-32 pt-12 px-6">
      <AnimatePresence mode="wait">
        {selectedDept ? (
          <motion.div
            key="users"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderUserList(selectedDept)}
          </motion.div>
        ) : (
          <motion.div
            key="depts"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {renderDepartmentList()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
