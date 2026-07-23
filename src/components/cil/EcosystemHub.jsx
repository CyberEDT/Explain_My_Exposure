import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Activity, Target, Shield } from 'lucide-react';

const apps = [
  { id: 'eme', name: 'EME', desc: 'Explain My Exposure', icon: Activity, color: 'text-success', bg: 'bg-success/10', border: 'border-success/30', pos: { x: -120, y: -80 } },
  { id: 'eth', name: 'ETH', desc: 'Explain The Hacker', icon: Target, color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/30', pos: { x: 120, y: -80 } },
  { id: 'etd', name: 'ETD', desc: 'Explain The Defender', icon: Shield, color: 'text-[#38bdf8]', bg: 'bg-[#38bdf8]/10', border: 'border-[#38bdf8]/30', pos: { x: 0, y: 120 } }
];

export default function EcosystemHub() {
  const [activeApp, setActiveApp] = useState(null);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      {/* Central CIL Node */}
      <motion.div 
        className="absolute z-20 flex flex-col items-center justify-center w-32 h-32 rounded-full border border-gold/30 bg-black/80 shadow-[0_0_60px_rgba(255,215,0,0.15)] backdrop-blur-xl cursor-pointer"
        whileHover={{ scale: 1.05, boxShadow: "0 0 80px rgba(255,215,0,0.3)" }}
        onHoverStart={() => setActiveApp('cil')}
        onHoverEnd={() => setActiveApp(null)}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15)_0%,transparent_70%)] rounded-full" />
        <Network size={36} className="text-gold mb-2 relative z-10" />
        <span className="text-xs font-black tracking-widest text-gold relative z-10">CIL BUS</span>
      </motion.div>

      {/* Connection Lines (SVG) */}
      <svg viewBox="0 0 800 800" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none overflow-visible" style={{ zIndex: 10 }}>
        {apps.map((app) => (
          <motion.line
            key={`line-${app.id}`}
            x1="400" y1="400" x2={app.pos.x + 400} y2={app.pos.y + 400}
            stroke={activeApp === app.id || activeApp === 'cil' ? 'rgba(255, 215, 0, 0.5)' : 'rgba(255, 255, 255, 0.2)'}
            strokeWidth="2"
            strokeDasharray={activeApp === app.id ? "4 4" : "0"}
            animate={{
              strokeDashoffset: activeApp === app.id ? [0, -20] : 0,
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>

      {/* Orbiting App Nodes */}
      {apps.map((app) => {
        const Icon = app.icon;
        const isActive = activeApp === app.id;
        return (
          <motion.div
            key={app.id}
            className={`absolute top-1/2 left-1/2 z-20 flex items-center gap-3 p-3 rounded-lg border ${isActive ? app.border : 'border-border'} ${isActive ? app.bg : 'bg-card/80'} backdrop-blur-md cursor-pointer transition-colors duration-300`}
            style={{
              x: app.pos.x,
              y: app.pos.y,
              translateX: '-50%',
              translateY: '-50%'
            }}
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setActiveApp(app.id)}
            onHoverEnd={() => setActiveApp(null)}
          >
            <div className={`p-2 rounded-md bg-black/50 ${app.color}`}>
              <Icon size={20} />
            </div>
            <div className="flex flex-col">
              <span className={`text-xs font-bold tracking-widest uppercase ${isActive ? app.color : 'text-foreground'}`}>{app.name}</span>
              <AnimatePresence>
                {isActive && (
                  <motion.span 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[10px] text-muted-foreground whitespace-nowrap mt-1"
                  >
                    {app.desc}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
