import React from 'react';
import Card from '../common/Card';

export default function ExposureScoreWidget({ score = 0 }) {
  const getRiskProfile = (s) => {
    if (s >= 85) return { text: 'text-amber-700', stroke: '#b45309', label: 'Critical' };
    if (s >= 70) return { text: 'text-orange-600', stroke: '#ea580c', label: 'High' };
    if (s >= 40) return { text: 'text-amber-500', stroke: '#f59e0b', label: 'Medium' };
    return { text: 'text-slate-400', stroke: '#94a3b8', label: 'Low' };
  };

  const profile = getRiskProfile(score);

  return (
    <Card className="flex flex-col items-center justify-center text-center">
      <h3 className="text-slate-500 text-xs font-semibold mb-4 tracking-wider uppercase">Exposure Index</h3>
      <div className="relative flex items-center justify-center w-36 h-36">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="72" cy="72" r="60" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
          <circle cx="72" cy="72" r="60" stroke={profile.stroke} strokeWidth="8" fill="transparent" 
            strokeDasharray={376.8} strokeDashoffset={376.8 - (376.8 * score) / 100} 
            className="transition-all duration-1000 ease-out" />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className={`text-4xl font-extrabold font-mono ${profile.text}`}>{score}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{profile.label}</span>
        </div>
      </div>
      <span className="mt-4 text-xs font-mono text-slate-500">CVSS + Attacker Interest Weight</span>
    </Card>
  );
}
