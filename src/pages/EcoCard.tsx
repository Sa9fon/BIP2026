import React from 'react';
import { ArrowLeft, Leaf, Apple, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { motion } from 'motion/react';

export const EcoCard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-black text-[#f5f5f5] flex flex-col pb-32">
      {/* Header */}
      <header className="flex items-center justify-between px-8 pt-12 pb-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center justify-center size-12 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-2xl font-bold tracking-tight text-white">My EcoCard</h1>
        <div className="size-12"></div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-8 py-4 max-w-md mx-auto w-full">
        {/* Prominent QR Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full bg-[#0f0f0f] rounded-[40px] border border-white/10 overflow-hidden shadow-2xl mb-12 flex flex-col p-10 group"
        >
          {/* Background Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#ccff00]/5 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-white/5 blur-[80px] rounded-full"></div>
          
          {/* Top Section: User Info */}
          <div className="flex flex-col items-center text-center mb-12 z-10">
            <div className="size-24 rounded-full border border-[#ccff00]/20 p-1.5 mb-6 shadow-2xl">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">{user.name}</h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-[#ccff00] text-[11px] uppercase tracking-[0.2em] font-bold">EcoMember</span>
              <div className="size-1 bg-white/20 rounded-full"></div>
              <span className="text-slate-500 text-xs font-medium tracking-wider">ID: {user.studentId}</span>
            </div>
          </div>

          {/* Center Section: High Visibility QR Code */}
          <div className="relative flex flex-col items-center justify-center z-10">
            <div className="absolute inset-0 bg-[#ccff00]/5 blur-3xl rounded-full"></div>
            <div className="bg-white p-8 rounded-[40px] shadow-[0_20px_60px_rgba(204,255,0,0.15)] relative">
              <img 
                alt="QR Code" 
                className="w-56 h-56 sm:w-64 sm:h-64" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqSW3R7TQJli1Ssofp68b0Lh1CND5qhfX8lOHyRlxQjAUPISXxW8ROiJGa1pWpy90ei2MMjlmrQELO_Xkz4pbyWk3trntCqmhziYE5Ox6-nG1NMI17LRxZvHsuXXh9c0pLLcCw6VogbU6qPK-Ie5BdGHNgg-VYRohgHe3TZagxGjsZijeBoiz_zWZEXLcW6aqJpWF95d9xoV1_shsANrMTJ85uhzQsf9fixkhwl_--hMh6LzIXXVrdulOYc-PtDEE0IeJTqRhoVNM"
                referrerPolicy="no-referrer"
              />
              {/* Corner Accents */}
              <div className="absolute -top-3 -left-3 size-12 border-t-4 border-l-4 border-[#ccff00] rounded-tl-2xl"></div>
              <div className="absolute -top-3 -right-3 size-12 border-t-4 border-r-4 border-[#ccff00] rounded-tr-2xl"></div>
              <div className="absolute -bottom-3 -left-3 size-12 border-b-4 border-l-4 border-[#ccff00] rounded-bl-2xl"></div>
              <div className="absolute -bottom-3 -right-3 size-12 border-b-4 border-r-4 border-[#ccff00] rounded-br-2xl"></div>
            </div>
            
            <p className="mt-10 uppercase-label">Scan to return cup</p>
          </div>

          {/* Bottom Section: Branding */}
          <div className="mt-14 flex items-center justify-center gap-3 opacity-30 z-10">
            <Leaf className="text-[#ccff00]" size={18} />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">ISCTE Sustainability</span>
          </div>

          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </motion.div>

        {/* Wallet Integration Section */}
        <div className="w-full space-y-6">
          <p className="text-center uppercase-label mb-8">Add to your wallet</p>
          
          <button className="w-full bg-white/5 border border-white/10 rounded-full h-16 flex items-center justify-center gap-4 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <Apple size={26} fill="white" />
            <span className="text-white font-bold text-lg tracking-tight">Apple Wallet</span>
          </button>

          <button className="w-full bg-white/5 border border-white/10 rounded-full h-16 flex items-center justify-center gap-4 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <Smartphone size={26} className="text-[#4285F4]" />
            <span className="text-white font-bold text-lg tracking-tight">Google Wallet</span>
          </button>
        </div>
      </main>
    </div>
  );
};
