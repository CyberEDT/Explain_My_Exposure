import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { domain: 'Exposure', EME: 100, ETH: 20, ETD: 10 },
  { domain: 'Attack', EME: 20, ETH: 100, ETD: 40 },
  { domain: 'Defense', EME: 10, ETH: 30, ETD: 100 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-border p-3 rounded-lg shadow-xl backdrop-blur-md">
        <p className="text-xs font-bold text-foreground mb-2 tracking-widest uppercase">{payload[0].payload.domain}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4 mt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: entry.color }}>
              {entry.name}
            </span>
            <span className="text-xs font-mono text-muted-foreground">{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ResponsibilityRadar() {
  const [activeApp, setActiveApp] = useState(null);

  const apps = [
    { key: 'EME', color: '#10b981', name: 'EME (Exposure)' },
    { key: 'ETH', color: '#ef4444', name: 'ETH (Attack)' },
    { key: 'ETD', color: '#38bdf8', name: 'ETD (Defense)' },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      {/* Legend & Interactive Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
        {apps.map((app) => (
          <button
            key={app.key}
            onMouseEnter={() => setActiveApp(app.key)}
            onMouseLeave={() => setActiveApp(null)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 ${
              activeApp === app.key || !activeApp 
                ? 'border-border bg-card/50' 
                : 'border-transparent opacity-30'
            }`}
          >
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: app.color }} />
            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: activeApp === app.key || !activeApp ? '#fff' : '#666' }}>
              {app.name}
            </span>
          </button>
        ))}
      </div>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#333" />
            <PolarAngleAxis dataKey="domain" tick={{ fill: '#888', fontSize: 10, fontWeight: 'bold', textAnchor: 'middle' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
            
            {apps.map((app) => (
              <Radar
                key={app.key}
                name={app.key}
                dataKey={app.key}
                stroke={app.color}
                fill={app.color}
                fillOpacity={activeApp === app.key ? 0.5 : (activeApp ? 0.05 : 0.2)}
                strokeWidth={activeApp === app.key ? 3 : 1}
                strokeOpacity={activeApp === app.key || !activeApp ? 1 : 0.2}
                isAnimationActive={true}
              />
            ))}
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
