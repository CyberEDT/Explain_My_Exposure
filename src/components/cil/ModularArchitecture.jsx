import React from 'react';
import { motion } from 'framer-motion';
import { Network, Server, Shield, Cloud, Activity, Lock, Search } from 'lucide-react';

const currentApps = [
  { id: 'eme', label: 'EME', icon: Activity, color: 'text-success', bg: 'bg-success' },
  { id: 'eth', label: 'ETH', icon: Search, color: 'text-danger', bg: 'bg-danger' },
  { id: 'etd', label: 'ETD', icon: Shield, color: 'text-[#38bdf8]', bg: 'bg-[#38bdf8]' },
];

const futureApps = [
  { id: 'siem', label: 'SIEM', icon: Cloud, color: 'text-muted-foreground', bg: 'bg-white' },
  { id: 'soar', label: 'SOAR', icon: Lock, color: 'text-muted-foreground', bg: 'bg-white' },
];

export default function ModularArchitecture() {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-12 flex flex-col items-center justify-center">
      
      {/* Top Row: Current Apps */}
      <div className="flex w-full justify-around md:justify-center md:gap-24 mb-16 relative z-10">
        {currentApps.map((app) => (
          <div key={app.id} className="flex flex-col items-center">
            <motion.div 
              className={`w-16 h-16 rounded-2xl border border-white/10 bg-black/80 flex items-center justify-center mb-4 shadow-lg backdrop-blur-md relative overflow-hidden`}
              whileHover={{ scale: 1.1, rotate: 5, borderColor: "rgba(255,255,255,0.3)" }}
            >
              <div className={`absolute inset-0 opacity-10 ${app.bg}`} />
              <app.icon size={28} className={`${app.color} relative z-10`} />
            </motion.div>
            <span className={`text-[10px] font-bold tracking-widest uppercase ${app.color}`}>{app.label}</span>
          </div>
        ))}
      </div>

      {/* Central CIL */}
      <div className="relative z-20 flex items-center justify-center w-full mb-16">
        <motion.div 
          className="w-40 h-16 rounded-full border border-gold/40 bg-black/80 flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.15)] backdrop-blur-xl"
          animate={{ boxShadow: ["0 0 30px rgba(255,215,0,0.15)", "0 0 50px rgba(255,215,0,0.3)", "0 0 30px rgba(255,215,0,0.15)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1)_0%,transparent_70%)] rounded-full" />
          <Network size={20} className="text-gold mr-3 relative z-10" />
          <span className="text-xs font-black tracking-widest text-gold uppercase relative z-10">CIL Bus</span>
        </motion.div>
        
        {/* Connecting SVG Lines */}
        <svg viewBox="0 0 600 300" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none" style={{ zIndex: -1 }}>
          {/* Lines to top apps */}
          <path d="M140,100 C140,140 300,140 300,180" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <path d="M300,100 C300,140 300,140 300,180" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <path d="M460,100 C460,140 300,140 300,180" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          
          {/* Lines to bottom apps */}
          <path d="M220,260 C220,220 300,220 300,180" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="6 6" />
          <path d="M380,260 C380,220 300,220 300,180" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="6 6" />
        </svg>
      </div>

      {/* Bottom Row: Future Apps */}
      <div className="flex w-full justify-around md:justify-center md:gap-24 relative z-10">
        {futureApps.map((app) => (
          <div key={app.id} className="flex flex-col items-center opacity-50 hover:opacity-100 transition-opacity">
            <motion.div 
              className={`w-16 h-16 rounded-2xl border border-white/5 border-dashed bg-black/40 flex items-center justify-center mb-4 relative overflow-hidden`}
              whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.2)" }}
            >
              <div className={`absolute inset-0 opacity-5 ${app.bg}`} />
              <app.icon size={28} className={`${app.color} relative z-10 opacity-70`} />
            </motion.div>
            <span className={`text-[10px] font-bold tracking-widest uppercase text-muted-foreground`}>{app.label}</span>
          </div>
        ))}
      </div>
      
    </div>
  );
}
