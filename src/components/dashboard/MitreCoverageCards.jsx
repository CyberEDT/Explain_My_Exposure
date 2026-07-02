import React from 'react';

export default function MitreCoverageCards({ data }) {
  if (!data || data.length === 0) return null;

  const getStatus = (score) => {
    if (score >= 60) return { label: 'INFERRED', color: 'text-gold', bg: 'bg-gold' };
    if (score > 0) return { label: 'POTENTIAL', color: 'text-[#00d0ff]', bg: 'bg-[#00d0ff]' };
    return { label: 'NO MAP', color: 'text-[#333]', bg: 'bg-[#333]' };
  };

  return (
    <div className="w-full flex flex-col border border-border bg-card">
      <div className="p-4 border-b border-border/50">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">MITRE ATT&CK COVERAGE</h3>
        <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">Tactics are highlighted only where the engine generated evidence-backed mappings.</p>
      </div>
      <div className="w-full p-4 overflow-x-auto">
        <div className="flex gap-4 pb-2 min-w-max">
          {data.map((row, idx) => {
            const status = getStatus(row.score);
            const displayScore = Math.max(5, row.score); // Minimum width for visibility
            
            return (
              <div key={idx} className="w-[180px] h-[100px] border border-border/50 bg-[#0a0a0a] flex flex-col p-3 relative flex-shrink-0">
                <div className="flex justify-between items-center w-full mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${status.color}`}>
                    {status.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {row.score > 0 ? '1' : '0'}
                  </span>
                </div>
                
                <div className="text-sm font-mono text-white mb-auto capitalize">
                  {row.stage.toLowerCase()}
                </div>
                
                {/* Progress bar at bottom */}
                <div className="w-full h-1 bg-[#222] mt-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${status.bg}`} 
                    style={{ width: `${row.score > 0 ? displayScore : 0}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
