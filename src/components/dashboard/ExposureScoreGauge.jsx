import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

export default function ExposureScoreGauge({ score }) {
  const data = [
    { name: 'Score', value: score, fill: '#f59e0b' }
  ];

  return (
    <div className="flex h-64 w-full flex-col items-center justify-center relative">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          cx="50%" cy="50%" 
          innerRadius="70%" outerRadius="100%" 
          barSize={24} 
          data={data} 
          startAngle={180} endAngle={-180}
        >
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <RadialBar 
            minAngle={15} 
            background={{ fill: '#1a1a1a' }} 
            clockWise 
            dataKey="value" 
            cornerRadius={12}
            style={{ filter: 'url(#glow)' }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-5xl font-display font-bold text-gold">{score}</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Exposure Score</span>
      </div>
    </div>
  );
}
