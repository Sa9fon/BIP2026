import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Promos } from './pages/Promos';
import { Rewards } from './pages/Rewards';
import { EcoCard } from './pages/EcoCard';
import { Profile } from './pages/Profile';
import { CampusMap } from './pages/Map';
import { Activities } from './pages/Activities';
import { Leaderboard } from './pages/Leaderboard';
import { BottomNav } from './components/BottomNav';
import { AnimatePresence, motion } from 'motion/react';

import { UserProvider } from './context/UserContext';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};

const AppContent = () => {
  const location = useLocation();
  const showNav = location.pathname !== '/';

  return (
    <div className="max-w-md mx-auto relative min-h-screen shadow-2xl bg-black">
      <AnimatePresence mode="wait">
        <Routes location={location}>
          <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
          <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="/promos" element={<PageWrapper><Promos /></PageWrapper>} />
          <Route path="/rewards" element={<PageWrapper><Rewards /></PageWrapper>} />
          <Route path="/leaderboard" element={<PageWrapper><Leaderboard /></PageWrapper>} />
          <Route path="/map" element={<PageWrapper><CampusMap /></PageWrapper>} />
          <Route path="/activities" element={<PageWrapper><Activities /></PageWrapper>} />
          <Route path="/card" element={<PageWrapper><EcoCard /></PageWrapper>} />
          <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
      {showNav && <BottomNav />}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </Router>
  );
}
