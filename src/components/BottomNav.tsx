import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, QrCode, Gift, Trophy, User } from 'lucide-react';
import { cn } from '../lib/utils';

export const BottomNav: React.FC = () => {
  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Home' },
    { to: '/card', icon: QrCode, label: 'QR Card' },
    { to: '/leaderboard', icon: Trophy, label: 'Rank' },
    { to: '/rewards', icon: Gift, label: 'Rewards' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-black/80 backdrop-blur-2xl border-t border-white/5 pb-10 pt-4 px-6 z-50">
      <div className="flex justify-between items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1.5 transition-all duration-300",
                isActive ? "text-[#ccff00] scale-110" : "text-slate-600 hover:text-slate-300"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} className="transition-all" />
                <span className={cn(
                  "text-[9px] font-bold uppercase tracking-[0.2em] transition-opacity",
                  isActive ? "opacity-100" : "opacity-40"
                )}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
