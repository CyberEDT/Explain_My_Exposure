import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="border border-border bg-card p-3 shadow-xl max-w-[200px]">
        <p className="text-xs font-bold text-foreground mb-1">{data.ip}</p>
        <p className="text-[10px] text-gold uppercase tracking-wider mb-2">{data.type}</p>
        <p className="text-[11px] text-muted-foreground">Confidence: {data.confidence}%</p>
        <p className="text-[11px] text-muted-foreground">Value: {data.valueLabel}</p>
        <p className="text-[11px] text-muted-foreground">Exposed Services: {data.surface / 20}</p>
      </div>
    );
  }
  return null;
};

export default function AssetPriorityMatrix({ hosts }) {
  const valueMap = { 'Low': 1, 'Medium': 2, 'High': 3, 'Critical': 4 };
  const labelMap = { 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Critical' };

  const data = hosts.map(h => ({
    ip: h.ip,
    confidence: h.intelligence?.confidence_score || 0,
    valueNum: valueMap[h.intelligence?.attacker_value || 'Low'],
    valueLabel: h.intelligence?.attacker_value || 'Low',
    surface: Math.max(1, (h.ports?.length || 0) * 20),
    type: h.intelligence?.asset_type || 'Unknown'
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <defs>
            <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <XAxis type="number" dataKey="valueNum" name="Attacker Value" domain={[0, 5]} ticks={[1,2,3,4]} tickFormatter={(v) => labelMap[v]} stroke="#888888" fontSize={10} axisLine={false} tickLine={false} dy={10} />
          <YAxis type="number" dataKey="confidence" name="Confidence" domain={[0, 100]} stroke="#888888" fontSize={10} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} dx={-10} />
          <ZAxis type="number" dataKey="surface" range={[50, 400]} />
          <Tooltip content={<CustomTooltip />} cursor={{strokeDasharray: '3 3'}} />
          <Scatter data={data} fill="#f59e0b" style={{ filter: 'url(#dotGlow)' }}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.valueNum >= 3 ? '#f59e0b' : '#888888'} fillOpacity={0.8} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
