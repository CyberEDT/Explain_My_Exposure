import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-black/90 border border-border p-3 text-xs font-mono shadow-xl backdrop-blur-sm">
        <div className="text-gold font-bold mb-1 uppercase tracking-widest">{data.stage}</div>
        <div className="text-foreground">Score: <span className={data.score > 70 ? 'text-danger' : data.score > 40 ? 'text-gold' : 'text-success'}>{data.score}</span> / 100</div>
      </div>
    );
  }
  return null;
};

export default function ExposureRadar({ data, width = "100%", height = 300 }) {
  if (!data || data.length === 0) return null;

  return (
    <div style={{ width, height }} className="relative group">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_70%)] pointer-events-none"></div>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#262626" />
          <PolarAngleAxis 
            dataKey="stage" 
            tick={{ fill: '#a3a3a3', fontSize: 10, fontFamily: 'monospace', textAnchor: 'middle' }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={false} 
            axisLine={false} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            name="Exposure"
            dataKey="score"
            stroke="#d4af37"
            strokeWidth={2}
            fill="#d4af37"
            fillOpacity={0.2}
            animationBegin={200}
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
