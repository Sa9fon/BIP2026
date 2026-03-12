import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, LogIn, QrCode } from 'lucide-react';
import { motion } from 'motion/react';
import { LegalModal } from '../components/LegalModal';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'terms' | 'privacy' }>({
    isOpen: false,
    type: 'terms'
  });

  const openLegal = (type: 'terms' | 'privacy') => {
    setLegalModal({ isOpen: true, type });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-black text-[#f5f5f5]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full flex flex-col items-center"
      >
        {/* Logo Section */}
        <div className="mb-16 text-center">
          <div className="relative w-28 h-28 mb-8 mx-auto bg-[#0f0f0f] rounded-[32px] flex items-center justify-center overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ccff00]/10 to-transparent"></div>
            <Leaf className="text-[#ccff00] drop-shadow-[0_0_15px_rgba(204,255,0,0.4)]" size={56} />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">
            ISCTE <span className="text-[#ccff00]">Eco</span>Cup
          </h1>
          <p className="text-slate-400 text-lg font-light max-w-[280px] mx-auto leading-relaxed">
            Join the green campus movement. One cup at a time.
          </p>
        </div>

        <div className="w-full">
          {/* Hero Image Section */}
          <div 
            className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-[32px] min-h-[220px] mb-12 border border-white/10 relative group shadow-2xl"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD-y5qj51ecr3wXfUngcGGPXpjQKBR40Z7fQQcJV8eybW3EVUlaRpsGhAUuYLn7kvf1tFZgLLU2YSRnKo1SjtZ4Y8Zr5O7xDKQaf9ySaSemO1caLDbICFFSuka4SJDe3udt5PcsYs-OWyFoysvpEmK9O21OJWWsDUmjGn9aPsIbvJm3vy1StoOy6iVv-hkpxU5OYMY3j9NwlceCXmvQl2AoJedUfG27g0_fNaTnCtGdiqFXSsSnrsnoZX-ZTq4PZ9pYRMEU3CVSmks")' }}
          >
            <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:bg-black/40"></div>
            <div className="bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 relative z-10">
              <p className="text-white font-medium text-sm uppercase tracking-[0.2em] opacity-80">Sustainability</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-6 w-full">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center justify-center gap-4 bg-[#ccff00] hover:scale-[1.02] active:scale-[0.98] text-black font-bold py-5 px-8 rounded-full transition-all shadow-[0_10px_30px_rgba(204,255,0,0.2)]"
            >
              <LogIn size={22} strokeWidth={2.5} />
              <span className="text-lg">Login with Fénix</span>
            </button>

            <div className="relative flex items-center py-6">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="flex-shrink mx-6 text-slate-600 text-[11px] font-bold uppercase tracking-[0.3em]">or</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full flex items-center justify-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white font-semibold py-5 px-8 rounded-full hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <QrCode size={22} className="text-[#ccff00]" />
              <span className="text-lg">Continue as Guest</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pb-8 w-full text-center">
          <div className="flex justify-center gap-10 mb-6">
            <button 
              onClick={() => openLegal('terms')}
              className="text-xs font-bold text-slate-500 hover:text-[#ccff00] transition-colors uppercase tracking-[0.2em]"
            >
              Terms
            </button>
            <button 
              onClick={() => openLegal('privacy')}
              className="text-xs font-bold text-slate-500 hover:text-[#ccff00] transition-colors uppercase tracking-[0.2em]"
            >
              Privacy
            </button>
          </div>
          <p className="text-[11px] text-slate-700 font-medium tracking-widest uppercase">
            ISCTE-IUL Sustainability Initiative © 2026
          </p>
        </div>
      </motion.div>

      <LegalModal 
        isOpen={legalModal.isOpen} 
        type={legalModal.type} 
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })} 
      />
    </div>
  );
};
