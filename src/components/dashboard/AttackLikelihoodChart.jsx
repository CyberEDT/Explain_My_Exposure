import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function AttackLikelihoodChart({ data }) {
  if (!data || data.length === 0) return null;

  // Custom Tooltip matching the dark theme
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#111] border border-border p-3">
          <p className="text-white text-xs font-mono mb-1 uppercase tracking-wider">{label}</p>
          <p className="text-gold text-xs font-mono">Likelihood : {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full flex flex-col border border-border bg-card">
      <div className="p-4 border-b border-border/50">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Exposure Likelihood By Phase</h3>
        <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">Dependency-aware phase likelihood; high scores indicate feasible attack transitions.</p>
      </div>
      <div className="w-full h-[300px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#333" />
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis 
              dataKey="stage" 
              type="category" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace', textAnchor: 'end', dx: -10 }} 
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
            <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24}>
              {data.map((entry, index) => {
                let color = '#00ff88'; // green
                if (entry.score >= 75) color = '#d4af37'; // gold
                else if (entry.score >= 40) color = '#00d0ff'; // cyan
                
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
