import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Bell, CreditCard, Globe, HelpCircle, ChevronRight, Check, Shield, Mail, Phone, MapPin } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { cn } from '../lib/utils';

type SettingType = 'personal' | 'notifications' | 'payment' | 'language' | 'help' | null;
type HelpSubPage = 'privacy' | 'faq' | 'contact' | 'locations' | null;

interface ProfileSettingsModalProps {
  type: SettingType;
  onClose: () => void;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({ type, onClose }) => {
  const { user } = useUser();
  const [activeSubPage, setActiveSubPage] = useState<HelpSubPage>(null);
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    offers: true,
    impact: true
  });

  if (!type) return null;

  const handleClose = () => {
    setActiveSubPage(null);
    onClose();
  };

  const renderHelpContent = () => {
    switch (activeSubPage) {
      case 'privacy':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-6">
              <section className="space-y-3">
                <h4 className="text-[#ccff00] font-bold uppercase tracking-widest text-xs">Data Collection</h4>
                <p className="text-slate-400 text-sm leading-relaxed">We collect information about your cup returns, location (when using the map), and basic profile details to track your environmental impact.</p>
              </section>
              <section className="space-y-3">
                <h4 className="text-[#ccff00] font-bold uppercase tracking-widest text-xs">How we use it</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Your data is used to calculate CO2 savings, manage your rewards, and improve the efficiency of our collection network at ISCTE.</p>
              </section>
              <section className="space-y-3">
                <h4 className="text-[#ccff00] font-bold uppercase tracking-widest text-xs">Third Parties</h4>
                <p className="text-slate-400 text-sm leading-relaxed">We never sell your personal data. Aggregated, anonymous impact data may be shared with university administration for sustainability reporting.</p>
              </section>
              <section className="space-y-3">
                <h4 className="text-[#ccff00] font-bold uppercase tracking-widest text-xs">Your Rights</h4>
                <p className="text-slate-400 text-sm leading-relaxed">You can request a copy of your data or account deletion at any time through the support channel.</p>
              </section>
            </div>
            <button 
              onClick={() => setActiveSubPage(null)}
              className="w-full py-4 bg-white/5 rounded-2xl text-white font-bold border border-white/5 hover:bg-white/10 transition-all"
            >
              Back to Help
            </button>
          </div>
        );
      case 'faq':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {[
              { q: "How do I return a cup?", a: "Find any smart bin on campus, scan your QR code, and place the cup in the designated slot." },
              { q: "When do I get my points?", a: "Points are credited instantly after a successful return is verified by the smart bin." },
              { q: "Where can I use my rewards?", a: "Rewards can be redeemed at any participating campus cafeteria or the ISCTE store." },
              { q: "What if the bin is full?", a: "Please report it through the app and find the next nearest station using the map." },
            ].map((faq, i) => (
              <div key={i} className="premium-card p-6 bg-white/5 space-y-3">
                <p className="text-white font-bold tracking-tight">{faq.q}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
            <button 
              onClick={() => setActiveSubPage(null)}
              className="w-full py-4 mt-4 bg-white/5 rounded-2xl text-white font-bold border border-white/5 hover:bg-white/10 transition-all"
            >
              Back to Help
            </button>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
              <div className="premium-card p-8 bg-gradient-to-br from-white/5 to-[#ccff00]/5 border-[#ccff00]/10">
                <Mail className="text-[#ccff00] mb-4" size={32} />
                <h4 className="text-xl font-bold text-white mb-2">Email Support</h4>
                <p className="text-slate-500 text-sm mb-6">Our team typically responds within 24 hours during campus hours.</p>
                <a href="mailto:support@iscte-iul.pt" className="text-[#ccff00] font-bold tracking-tight hover:underline">support@iscte-iul.pt</a>
              </div>
              <div className="premium-card p-8 bg-white/5">
                <Phone className="text-slate-400 mb-4" size={32} />
                <h4 className="text-xl font-bold text-white mb-2">Campus Hotline</h4>
                <p className="text-slate-500 text-sm mb-6">Available Mon-Fri, 09:00 - 18:00 for urgent bin issues.</p>
                <p className="text-white font-bold tracking-tight">+351 210 464 000</p>
              </div>
            </div>
            <button 
              onClick={() => setActiveSubPage(null)}
              className="w-full py-4 bg-white/5 rounded-2xl text-white font-bold border border-white/5 hover:bg-white/10 transition-all"
            >
              Back to Help
            </button>
          </div>
        );
      case 'locations':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {[
              { name: "Building 1 - Main Entrance", status: "Available", load: "20%" },
              { name: "Building 2 - Cafeteria", status: "Full", load: "95%" },
              { name: "Library Entrance", status: "Available", load: "45%" },
              { name: "Ala Autónoma", status: "Available", load: "10%" },
              { name: "Indeg-ISCTE Patio", status: "Maintenance", load: "-" },
            ].map((loc, i) => (
              <div key={i} className="premium-card p-6 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "size-3 rounded-full shadow-[0_0_8px]",
                    loc.status === 'Available' ? "bg-[#ccff00] shadow-[#ccff00]/50" : 
                    loc.status === 'Full' ? "bg-red-500 shadow-red-500/50" : "bg-orange-500 shadow-orange-500/50"
                  )} />
                  <div>
                    <p className="text-white font-bold tracking-tight">{loc.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{loc.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 font-bold">{loc.load}</p>
                  <p className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">Capacity</p>
                </div>
              </div>
            ))}
            <button 
              onClick={() => setActiveSubPage(null)}
              className="w-full py-4 mt-4 bg-white/5 rounded-2xl text-white font-bold border border-white/5 hover:bg-white/10 transition-all"
            >
              Back to Help
            </button>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            {[
              { id: 'privacy' as HelpSubPage, icon: Shield, label: 'Privacy Policy', desc: 'How we handle your data' },
              { id: 'faq' as HelpSubPage, icon: HelpCircle, label: 'FAQs', desc: 'Common questions & answers' },
              { id: 'contact' as HelpSubPage, icon: Mail, label: 'Contact Support', desc: 'Get in touch with our team' },
              { id: 'locations' as HelpSubPage, icon: MapPin, label: 'Station Locations', desc: 'Find where to return cups' },
            ].map((item, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveSubPage(item.id)}
                className="w-full flex items-center justify-between p-6 premium-card bg-white/5 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div className="size-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-[#ccff00]/10 group-hover:text-[#ccff00] transition-all border border-white/5">
                    <item.icon size={24} />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-bold tracking-tight text-lg">{item.label}</p>
                    <p className="text-xs text-slate-500 font-medium mt-1">{item.desc}</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-600 group-hover:text-[#ccff00] transition-all" />
              </button>
            ))}
          </div>
        );
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'personal':
        return (
          <div className="space-y-10">
            <div className="flex flex-col items-center gap-6 mb-10">
              <div className="size-32 rounded-full border-2 border-[#ccff00] p-1 relative shadow-[0_0_20px_rgba(204,255,0,0.2)]">
                <img src={user.avatar} alt={user.name} className="size-full rounded-full object-cover border-4 border-black" />
                <button className="absolute bottom-1 right-1 size-10 bg-[#ccff00] rounded-full flex items-center justify-center text-black border-4 border-black shadow-lg">
                  <User size={16} strokeWidth={3} />
                </button>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">{user.name}</h3>
            </div>
            
            <div className="space-y-4">
              <div className="premium-card p-6 bg-white/5 space-y-2">
                <p className="uppercase-label">Student ID</p>
                <p className="text-white font-bold tracking-tight">{user.studentId}</p>
              </div>
              <div className="premium-card p-6 bg-white/5 space-y-2">
                <p className="uppercase-label">Email Address</p>
                <div className="flex items-center justify-between">
                  <p className="text-white font-bold tracking-tight">{user.name.toLowerCase()}@iscte-iul.pt</p>
                  <Mail size={18} className="text-slate-500" />
                </div>
              </div>
              <div className="premium-card p-6 bg-white/5 space-y-2">
                <p className="uppercase-label">Phone Number</p>
                <div className="flex items-center justify-between">
                  <p className="text-white font-bold tracking-tight">+351 912 345 678</p>
                  <Phone size={18} className="text-slate-500" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <p className="text-slate-500 text-sm font-medium mb-8">Manage how you receive updates about your impact and rewards.</p>
            {[
              { id: 'push', label: 'Push Notifications', desc: 'Real-time alerts for returns' },
              { id: 'email', label: 'Email Updates', desc: 'Weekly sustainability reports' },
              { id: 'offers', label: 'Partner Offers', desc: 'New discounts near you' },
              { id: 'impact', label: 'Impact Milestones', desc: 'When you reach a new level' },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setNotifications(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof notifications] }))}
                className="w-full flex items-center justify-between p-6 premium-card bg-white/5 transition-all hover:bg-white/10"
              >
                <div className="text-left">
                  <p className="text-white font-bold tracking-tight">{item.label}</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">{item.desc}</p>
                </div>
                <div className={cn(
                  "w-14 h-7 rounded-full transition-all relative border border-white/10",
                  notifications[item.id as keyof typeof notifications] ? "bg-[#ccff00]" : "bg-white/10"
                )}>
                  <motion.div 
                    animate={{ x: notifications[item.id as keyof typeof notifications] ? 28 : 4 }}
                    className={cn(
                      "absolute top-1 size-5 rounded-full shadow-lg transition-colors",
                      notifications[item.id as keyof typeof notifications] ? "bg-black" : "bg-slate-500"
                    )} 
                  />
                </div>
              </button>
            ))}
          </div>
        );
      case 'payment':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[#1152d4] to-[#0a3a9c] p-8 rounded-[32px] shadow-2xl relative overflow-hidden border border-white/10">
              <div className="absolute top-0 right-0 size-48 bg-white/10 blur-3xl rounded-full -mr-24 -mt-24"></div>
              <div className="relative z-10 space-y-10">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                    <CreditCard size={32} className="text-white" />
                  </div>
                  <p className="text-white/60 font-mono text-[10px] font-bold tracking-widest uppercase">ISCTE PAY</p>
                </div>
                <p className="text-white text-2xl font-mono tracking-[0.25em]">•••• •••• •••• 4242</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white/40 text-[9px] uppercase font-bold tracking-widest mb-1">Card Holder</p>
                    <p className="text-white text-base font-bold uppercase tracking-tight">{user.name}</p>
                  </div>
                  <div className="flex gap-1">
                    <div className="size-8 bg-orange-500/80 rounded-full"></div>
                    <div className="size-8 bg-yellow-500/80 rounded-full -ml-4"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <button className="w-full py-6 border-2 border-dashed border-white/10 rounded-[32px] text-slate-500 font-bold flex items-center justify-center gap-3 hover:border-[#ccff00]/30 hover:text-[#ccff00] transition-all group">
              <div className="p-2 bg-white/5 rounded-full group-hover:bg-[#ccff00]/10 transition-all">
                <X size={20} className="rotate-45" />
              </div>
              Add New Payment Method
            </button>
          </div>
        );
      case 'language':
        return (
          <div className="space-y-4">
            {[
              { code: 'en', name: 'English', flag: '🇬🇧' },
              { code: 'pt', name: 'Português', flag: '🇵🇹' },
              { code: 'es', name: 'Español', flag: '🇪🇸' },
              { code: 'fr', name: 'Français', flag: '🇫🇷' },
            ].map((lang) => (
              <button 
                key={lang.code}
                className={cn(
                  "w-full flex items-center justify-between p-6 rounded-[24px] border transition-all",
                  lang.code === 'en' ? "bg-[#ccff00]/10 border-[#ccff00]/30" : "bg-white/5 border-white/5 hover:bg-white/10"
                )}
              >
                <div className="flex items-center gap-6">
                  <span className="text-3xl">{lang.flag}</span>
                  <span className={cn("text-lg font-bold tracking-tight", lang.code === 'en' ? "text-[#ccff00]" : "text-white")}>{lang.name}</span>
                </div>
                {lang.code === 'en' && <Check size={24} className="text-[#ccff00]" />}
              </button>
            ))}
          </div>
        );
      case 'help':
        return renderHelpContent();
      default:
        return null;
    }
  };

  const titles = {
    personal: 'Personal Information',
    notifications: 'Notifications',
    payment: 'Payment Methods',
    language: 'App Language',
    help: activeSubPage ? {
      privacy: 'Privacy Policy',
      faq: 'FAQs',
      contact: 'Contact Support',
      locations: 'Station Locations'
    }[activeSubPage] : 'Help & Support'
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
        />
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-[#0f0f0f] border-t sm:border border-white/10 rounded-t-[40px] sm:rounded-[40px] overflow-hidden shadow-2xl shadow-black/50 flex flex-col max-h-[90vh]"
        >
          <div className="p-10 pt-12 overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-white tracking-tight">{titles[type as keyof typeof titles]}</h2>
              <button 
                onClick={handleClose}
                className="size-12 flex items-center justify-center rounded-full bg-white/5 text-slate-500 hover:text-white transition-all border border-white/10"
              >
                <X size={22} />
              </button>
            </div>

            {renderContent()}

            <div className="mt-10 pb-4">
              <button 
                onClick={handleClose}
                className="w-full bg-white/5 hover:bg-white/10 py-5 rounded-full text-white font-bold transition-all border border-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
