import React, { useState } from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps';
import { maptiler } from 'pigeon-maps/providers';
import { ArrowLeft, MapPin, Navigation, Info, List, Map as MapIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

// Modern locations with distances (simulated from campus center)
const LOCATIONS = [
  { 
    id: 1, 
    name: 'Building I - Return Station', 
    pos: [38.7487, -9.1533] as [number, number], 
    type: 'station', 
    dist: '120m',
    description: 'Main return station located at the entrance of Building I. Open 24/7 for cup returns.',
    hours: '24/7',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400'
  },
  { 
    id: 2, 
    name: 'Building II - Return Station', 
    pos: [38.7495, -9.1540] as [number, number], 
    type: 'station', 
    dist: '250m',
    description: 'Convenient return point near the student lounge in Building II.',
    hours: '08:00 - 22:00',
    image: 'https://images.unsplash.com/photo-1591193686104-fddbaaf28b7e?auto=format&fit=crop&q=80&w=400'
  },
  { 
    id: 3, 
    name: 'Campus Cafeteria', 
    pos: [38.7490, -9.1530] as [number, number], 
    type: 'station', 
    dist: '80m',
    description: 'The central hub for food and drinks. Multiple return bins available inside.',
    hours: '07:30 - 20:00',
    image: 'https://images.unsplash.com/photo-1567529684892-09290a1b2d05?auto=format&fit=crop&q=80&w=400'
  },
  { 
    id: 4, 
    name: 'The Burger Joint', 
    pos: [38.7505, -9.1520] as [number, number], 
    type: 'partner', 
    dist: '400m',
    description: 'Eco-friendly burger spot. Get 10% off when you return your cup here!',
    hours: '11:00 - 23:00',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=400'
  },
  { 
    id: 5, 
    name: 'Coffee House', 
    pos: [38.7475, -9.1550] as [number, number], 
    type: 'partner', 
    dist: '550m',
    description: 'Premium coffee and pastries. A proud partner of the EcoCup initiative.',
    hours: '08:00 - 19:00',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400'
  },
];

export const CampusMap: React.FC = () => {
  const navigate = useNavigate();
  const [center, setCenter] = useState<[number, number]>([38.7490, -9.1535]);
  const [zoom, setZoom] = useState(17);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [showDetails, setShowDetails] = useState(false);

  const selectedLoc = LOCATIONS.find(l => l.id === selectedId);

  const handleDirections = (loc: typeof LOCATIONS[0]) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${loc.pos[0]},${loc.pos[1]}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-[#f5f5f5] pb-32 overflow-hidden">
      {/* Header */}
      <header className="flex items-center bg-black/80 backdrop-blur-xl p-8 pt-12 justify-between sticky top-0 z-[100] border-b border-white/5">
        <button 
          onClick={() => navigate(-1)}
          className="text-white flex size-12 items-center justify-center bg-white/5 rounded-full border border-white/10 active:scale-95 transition-all hover:bg-white/10"
        >
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-2xl font-bold tracking-tight">Campus Map</h1>
        <button 
          onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
          className="size-12 flex items-center justify-center bg-[#ccff00]/10 text-[#ccff00] rounded-full border border-[#ccff00]/20 hover:bg-[#ccff00]/20 transition-all"
        >
          {viewMode === 'map' ? <List size={22} /> : <MapIcon size={22} />}
        </button>
      </header>

      <div className="flex-1 relative h-[calc(100vh-120px)]">
        <AnimatePresence mode="wait">
          {viewMode === 'map' ? (
            <motion.div 
              key="map-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <Map 
                height={undefined} // Fill container
                center={center} 
                zoom={zoom} 
                onBoundsChanged={({ center, zoom }) => {
                  setCenter(center);
                  setZoom(zoom);
                }}
                // Using a dark theme provider (CartoDB Dark Matter)
                provider={(x, y, z, dpr) => `https://basemaps.cartocdn.com/dark_all/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png`}
              >
                {/* User Location Pulse (Simulated) */}
                <Overlay anchor={[38.7490, -9.1535]} offset={[0, 0]}>
                  <div className="relative">
                    <div className="absolute -inset-6 bg-[#ccff00]/20 rounded-full animate-ping"></div>
                    <div className="size-5 bg-[#ccff00] rounded-full border-4 border-black shadow-[0_0_20px_#ccff00]"></div>
                  </div>
                </Overlay>

                {LOCATIONS.map((loc) => {
                  const MarkerAny = Marker as any;
                  return (
                    <MarkerAny 
                      key={loc.id} 
                      anchor={loc.pos} 
                      payload={loc.id}
                      onClick={({ payload }: { payload: number }) => setSelectedId(payload)}
                      color={loc.type === 'station' ? '#ccff00' : '#1152d4'}
                    />
                  );
                })}
              </Map>

              {/* Map Controls */}
              <div className="absolute top-6 right-6 flex flex-col gap-3 z-20">
                <button 
                  onClick={() => setZoom(Math.min(zoom + 1, 20))}
                  className="size-12 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center font-bold text-xl text-white hover:bg-black/80 transition-all"
                >
                  +
                </button>
                <button 
                  onClick={() => setZoom(Math.max(zoom - 1, 12))}
                  className="size-12 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center font-bold text-xl text-white hover:bg-black/80 transition-all"
                >
                  -
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="list-view"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute inset-0 overflow-y-auto p-8 space-y-6 bg-black"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="uppercase-label">Nearby Locations</h2>
                <span className="text-[10px] bg-white/5 px-3 py-1 rounded-full text-slate-500 font-bold uppercase tracking-widest">5 Found</span>
              </div>
              {LOCATIONS.map((loc) => (
                <button 
                  key={loc.id}
                  onClick={() => {
                    setCenter(loc.pos);
                    setViewMode('map');
                    setSelectedId(loc.id);
                  }}
                  className="w-full premium-card p-6 flex items-center justify-between group active:scale-[0.98] transition-all hover:bg-white/5"
                >
                  <div className="flex items-center gap-6">
                    <div className={`size-14 rounded-2xl flex items-center justify-center border border-white/5 ${loc.type === 'station' ? 'bg-[#ccff00]/10 text-[#ccff00]' : 'bg-[#1152d4]/10 text-[#1152d4]'}`}>
                      <MapPin size={28} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#ccff00] transition-colors tracking-tight">{loc.name}</h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{loc.type === 'station' ? '♻️ Return Station' : '🎁 Partner Business'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white tracking-tight">{loc.dist}</p>
                    <p className="text-[10px] text-slate-600 uppercase font-bold tracking-widest mt-0.5">Away</p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected Location Card */}
        <AnimatePresence>
          {selectedLoc && viewMode === 'map' && (
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="absolute bottom-8 left-8 right-8 bg-black/90 backdrop-blur-2xl border border-white/10 p-8 rounded-[40px] z-50 shadow-2xl shadow-black/50"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-6 size-10 flex items-center justify-center bg-white/5 rounded-full text-slate-500 hover:text-white transition-all"
              >
                ✕
              </button>
              
              <div className="flex items-center gap-6 mb-8">
                <div className={`size-16 rounded-[24px] flex items-center justify-center border border-white/5 ${selectedLoc.type === 'station' ? 'bg-[#ccff00]/20 text-[#ccff00]' : 'bg-[#1152d4]/20 text-[#1152d4]'}`}>
                  <MapPin size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{selectedLoc.name}</h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest ${selectedLoc.type === 'station' ? 'bg-[#ccff00]/10 text-[#ccff00]' : 'bg-[#1152d4]/10 text-[#1152d4]'}`}>
                      {selectedLoc.type}
                    </span>
                    <span className="text-slate-600 text-xs">•</span>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">{selectedLoc.dist} from you</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => handleDirections(selectedLoc)}
                  className="flex-1 bg-[#ccff00] text-black h-14 rounded-full font-bold flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-[#ccff00]/10"
                >
                  <Navigation size={20} />
                  Directions
                </button>
                <button 
                  onClick={() => setShowDetails(true)}
                  className="flex-1 bg-white/5 text-white h-14 rounded-full font-bold flex items-center justify-center gap-3 border border-white/10 active:scale-95 transition-all hover:bg-white/10"
                >
                  <Info size={20} />
                  Details
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Details Modal */}
        <AnimatePresence>
          {showDetails && selectedLoc && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/80 backdrop-blur-md"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-lg bg-[#111] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl"
              >
                <div className="relative h-64">
                  <img 
                    src={selectedLoc.image} 
                    alt={selectedLoc.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button 
                    onClick={() => setShowDetails(false)}
                    className="absolute top-6 right-6 size-12 flex items-center justify-center bg-black/60 backdrop-blur-xl rounded-full text-white border border-white/10 hover:bg-black/80 transition-all"
                  >
                    ✕
                  </button>
                  <div className="absolute bottom-6 left-6">
                    <span className={`text-[10px] px-4 py-1.5 rounded-full font-bold uppercase tracking-widest bg-black/60 backdrop-blur-xl border border-white/10 ${selectedLoc.type === 'station' ? 'text-[#ccff00]' : 'text-[#1152d4]'}`}>
                      {selectedLoc.type === 'station' ? 'Return Station' : 'Partner Business'}
                    </span>
                  </div>
                </div>

                <div className="p-10">
                  <h2 className="text-3xl font-bold text-white tracking-tight mb-4">{selectedLoc.name}</h2>
                  <p className="text-slate-400 leading-relaxed mb-8">
                    {selectedLoc.description}
                  </p>

                  <div className="space-y-6 mb-10">
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 border border-white/5">
                        <Navigation size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Distance</p>
                        <p className="text-white font-bold">{selectedLoc.dist} from your location</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 border border-white/5">
                        <Info size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Opening Hours</p>
                        <p className="text-white font-bold">{selectedLoc.hours}</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleDirections(selectedLoc)}
                    className="w-full bg-[#ccff00] text-black h-16 rounded-full font-bold flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-[#ccff00]/20"
                  >
                    <Navigation size={22} />
                    Get Directions
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Info (When nothing selected) */}
        <AnimatePresence>
          {!selectedId && viewMode === 'map' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 z-10 shadow-xl"
            >
              <p className="text-[10px] text-white/70 font-bold uppercase tracking-[0.2em] whitespace-nowrap">
                Tap a marker to see details
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
