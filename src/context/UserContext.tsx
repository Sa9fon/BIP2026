import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Activity, Promo } from '../types';
import { MOCK_USER, MOCK_ACTIVITIES } from '../constants';

interface UserContextType {
  user: User;
  activities: Activity[];
  claimedPromos: string[];
  redeemReward: (points: number, rewardName: string) => void;
  claimPromo: (promoId: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(MOCK_USER);
  const [activities, setActivities] = useState<Activity[]>(MOCK_ACTIVITIES);
  const [claimedPromos, setClaimedPromos] = useState<string[]>([]);

  const redeemReward = (points: number, rewardName: string) => {
    if (user.points >= points) {
      setUser(prev => ({ ...prev, points: prev.points - points }));
      const newActivity: Activity = {
        id: `a${Date.now()}`,
        type: 'redeem',
        title: rewardName,
        points: -points,
        date: 'Just now',
        location: 'Cafeteria',
      };
      setActivities(prev => [newActivity, ...prev]);
      return true;
    }
    return false;
  };

  const claimPromo = (promoId: string) => {
    if (!claimedPromos.includes(promoId)) {
      setClaimedPromos(prev => [...prev, promoId]);
    }
  };

  const logout = () => {
    // In a real app, this would clear tokens etc.
    console.log("Logging out...");
  };

  return (
    <UserContext.Provider value={{ user, activities, claimedPromos, redeemReward, claimPromo, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
