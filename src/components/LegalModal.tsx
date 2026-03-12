import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText, Scale } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  const content = {
    terms: {
      title: 'Terms of Service',
      icon: <Scale className="text-[#ccff00]" size={28} />,
      sections: [
        {
          title: '1. Acceptance of Terms',
          body: 'By accessing the ISCTE EcoCup application, you agree to comply with these terms and all applicable laws and regulations in Portugal and the European Union.'
        },
        {
          title: '2. Use of the Service',
          body: 'This application is intended for the ISCTE-IUL community to promote sustainability. Users must return reusable cups to designated stations to earn EcoPoints. Any misuse of the system may lead to account suspension.'
        },
        {
          title: '3. EcoPoints System',
          body: 'EcoPoints are non-transferable and have no monetary value. They can only be redeemed for rewards within the ISCTE campus partner network.'
        },
        {
          title: '4. User Conduct',
          body: 'Users are responsible for maintaining the confidentiality of their Fénix login credentials. You agree not to engage in any activity that interferes with or disrupts the service.'
        },
        {
          title: '5. Modifications',
          body: 'ISCTE-IUL reserves the right to modify these terms at any time. Continued use of the app constitutes acceptance of the new terms.'
        }
      ]
    },
    privacy: {
      title: 'Privacy Policy',
      icon: <Shield className="text-[#ccff00]" size={28} />,
      sections: [
        {
          title: '1. Data Collection (GDPR)',
          body: 'In accordance with the General Data Protection Regulation (GDPR), we collect minimal data required for the service: your name, student/staff ID, and activity logs related to cup returns and reward redemptions.'
        },
        {
          title: '2. Purpose of Processing',
          body: 'Your data is processed solely to track sustainability impact, manage the EcoPoints balance, and provide access to partner promotions within the ISCTE campus.'
        },
        {
          title: '3. Data Sharing',
          body: 'We do not share your personal data with third parties. Aggregated, non-identifiable sustainability data may be used for institutional reporting.'
        },
        {
          title: '4. Data Retention',
          body: 'Personal data is retained for the duration of your active enrollment or employment at ISCTE-IUL, or until you request account deletion.'
        },
        {
          title: '5. Your Rights',
          body: 'Under Portuguese law (Lei n.º 58/2019), you have the right to access, rectify, or delete your data. Contact the ISCTE Data Protection Officer for any inquiries.'
        }
      ]
    }
  };

  const activeContent = content[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            className="relative w-full max-w-2xl bg-[#0f0f0f] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl shadow-black/50 flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/2">
              <div className="flex items-center gap-6">
                <div className="p-4 bg-[#ccff00]/10 rounded-2xl border border-[#ccff00]/20">
                  {activeContent.icon}
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  {activeContent.title}
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="size-12 flex items-center justify-center rounded-full bg-white/5 text-slate-500 hover:text-white transition-all border border-white/10"
              >
                <X size={22} />
              </button>
            </div>

            {/* Content */}
            <div className="p-10 overflow-y-auto custom-scrollbar space-y-12">
              {activeContent.sections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-[#ccff00] font-bold text-xs uppercase tracking-[0.2em]">
                    {section.title}
                  </h3>
                  <p className="text-slate-400 text-lg leading-relaxed font-medium">
                    {section.body}
                  </p>
                </div>
              ))}
              
              <div className="pt-10 border-t border-white/5">
                <p className="text-xs text-slate-600 text-center italic font-medium">
                  Last updated: March 2026 • ISCTE-IUL Sustainability Office
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-10 bg-white/2 border-t border-white/5">
              <button 
                onClick={onClose}
                className="w-full py-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-bold transition-all active:scale-[0.98]"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
