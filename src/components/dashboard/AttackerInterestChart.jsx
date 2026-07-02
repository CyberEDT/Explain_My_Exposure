import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function AttackerInterestChart({ hosts }) {
  const portFreq = {};
  
  hosts.forEach(h => {
    (h.ports || []).forEach(p => {
      if (!portFreq[p.port]) {
        portFreq[p.port] = { port: p.port, service: p.service, count: 0 };
      }
      portFreq[p.port].count++;
    });
  });

  const getInterestLevel = (port) => {
    if ([445, 3389, 23, 21, 5900].includes(port)) return 'Critical';
    if ([1433, 3306, 5432, 5985, 389].includes(port)) return 'High';
    if ([80, 443, 22].includes(port)) return 'Medium';
    return 'Low';
  };

  const colorMap = {
    'Critical': 'url(#gradCritical)',
    'High': 'url(#gradHigh)',
    'Medium': 'url(#gradMedium)',
    'Low': 'url(#gradLow)'
  };

  const data = Object.values(portFreq)
    .map(d => ({
      ...d,
      name: `${(d.service || 'unknown').toUpperCase()}:${d.port}`,
      interest: getInterestLevel(d.port)
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8); // Top 8 exposed ports

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="border border-border bg-card p-3 shadow-xl">
          <p className="text-xs font-bold text-foreground mb-1">{data.name}</p>
          <p className="text-[11px] text-muted-foreground">Exposed on {data.count} hosts</p>
          <p className="text-[10px] uppercase tracking-wider mt-2" style={{ color: colorMap[data.interest] }}>
            {data.interest} Attacker Interest
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 5 }} barSize={24}>
          <defs>
            <linearGradient id="gradCritical" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.6}/>
              <stop offset="100%" stopColor="#ef4444" stopOpacity={1}/>
            </linearGradient>
            <linearGradient id="gradHigh" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.6}/>
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={1}/>
            </linearGradient>
            <linearGradient id="gradMedium" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#888888" stopOpacity={0.6}/>
              <stop offset="100%" stopColor="#888888" stopOpacity={1}/>
            </linearGradient>
            <linearGradient id="gradLow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#262626" stopOpacity={0.6}/>
              <stop offset="100%" stopColor="#262626" stopOpacity={1}/>
            </linearGradient>
          </defs>
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" stroke="#888888" fontSize={11} axisLine={false} tickLine={false} dx={-10} />
          <Tooltip content={<CustomTooltip />} cursor={{fill: '#1a1a1a', opacity: 0.5}} />
          <Bar dataKey="count" radius={[0, 6, 6, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colorMap[entry.interest]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
