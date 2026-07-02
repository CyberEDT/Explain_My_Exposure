import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ExposureChainPipeline({ hosts }) {
  // Calculate funnel probabilities based on hosts data
  // DISCOVER -> ENUMERATE -> ACCESS -> ABUSE -> MOVE -> IMPACT
  
  const total = Math.max(1, hosts.length);
  const withPorts = hosts.filter(h => h.ports && h.ports.length > 0).length;
  const withAccess = hosts.filter(h => h.ports && h.ports.some(p => [22, 3389, 5900, 80, 443].includes(p.port))).length;
  const withAbuse = hosts.filter(h => h.ports && h.ports.some(p => [445, 139, 1433, 3306, 389].includes(p.port))).length;
  const withMove = hosts.filter(h => h.ports && h.ports.some(p => [445, 3389, 5985].includes(p.port))).length;
  const impactNodes = hosts.filter(h => h.intelligence && h.intelligence.attacker_value === 'Critical').length;

  const data = [
    { stage: 'DISCOVER', probability: Math.min(100, Math.round((withPorts/total)*100) + 10) },
    { stage: 'ENUMERATE', probability: Math.min(100, Math.round((withPorts/total)*90)) },
    { stage: 'ACCESS', probability: Math.min(100, Math.round((withAccess/total)*100)) },
    { stage: 'ABUSE', probability: Math.min(100, Math.round((withAbuse/total)*100)) },
    { stage: 'MOVE', probability: Math.min(100, Math.round((withMove/total)*100)) },
    { stage: 'IMPACT', probability: impactNodes > 0 ? 90 : Math.min(100, Math.round((withMove/total)*50)) }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="border border-border bg-card p-3 shadow-xl">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gold mb-1">{label}</p>
          <p className="text-xs text-muted-foreground">{`Success Probability: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorProb" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.7}/>
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={0}/>
            </linearGradient>
            <filter id="areaGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <XAxis dataKey="stage" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} dy={10} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#f59e0b', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <Area 
            type="monotone" 
            dataKey="probability" 
            stroke="#f59e0b" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorProb)" 
            style={{ filter: 'url(#areaGlow)' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
