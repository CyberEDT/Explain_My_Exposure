import React, { useState } from 'react';

export default function ExposureChainTable({ data, scanLevel = 'medium', mitreMappings = [] }) {
  const [expandedRows, setExpandedRows] = useState({});

  const isLow = scanLevel === 'low';
  const isHigh = scanLevel === 'high';

  if (!data || data.length === 0) return null;

  const toggleRow = (idx) => {
    setExpandedRows(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const getSeverity = (score) => {
    if (score >= 75) return { label: 'HIGH', bg: 'bg-gold', text: 'text-black' };
    if (score >= 40) return { label: 'MEDIUM', bg: 'bg-[#00d0ff]', text: 'text-black' };
    return { label: 'LOW', bg: 'bg-[#00ff88]', text: 'text-black' };
  };

  const getStatus = (score) => {
    if (score >= 60) return { label: 'INFERRED', border: 'border-gold', text: 'text-gold' };
    return { label: 'POTENTIAL', border: 'border-[#00d0ff]', text: 'text-[#00d0ff]' };
  };

  const getRowBg = (score) => {
    if (score >= 75) return 'bg-gold';
    if (score >= 40) return 'bg-[#00d0ff]';
    return 'bg-[#00ff88]';
  };

  return (
    <div className="w-full font-mono text-sm border-t border-border mt-8 pt-4">
      <div className="text-[10px] text-muted-foreground tracking-widest mb-4 uppercase">Attack Chain Mapping</div>
      {data.map((row, idx) => {
        const stage = row.stage;
        const score = row.score;
        
        // Dynamically pull the trained MITRE context from the engine
        const mapping = row.context || { 
          tactic: 'TA0000', 
          tech: 'T0000', 
          desc: 'Unknown phase mapping.', 
          mitigations: ['Review manual logs.', 'Audit configurations.'] 
        };
        
        const severity = getSeverity(score);
        const status = getStatus(score);
        
        // Compute pseudo-likelihood based on score for visual flair
        const cVal = score;
        const lVal = Math.max(0, score - 15);

        const isExpanded = !!expandedRows[idx];
        
        // Intensity filtering for mitigations
        const mitigationCount = isLow ? 1 : scanLevel === 'medium' ? 2 : mapping.mitigations.length;
        const visibleMitigations = mapping.mitigations.slice(0, mitigationCount);

        return (
          <div key={idx} className="flex flex-col border-b border-border/50 hover:bg-white/5 transition-colors">
            <div 
              className="flex items-center justify-between py-3 px-2 cursor-pointer"
              onClick={() => toggleRow(idx)}
            >
              {/* Left side: Number, Stage, Tactic, Technique */}
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-6 h-6 flex items-center justify-center font-bold text-black text-xs ${getRowBg(score)}`}>
                  {idx + 1}
                </div>
                <div className="font-bold text-foreground tracking-wider uppercase min-w-[140px]">
                  {stage}
                </div>
                <div className="border border-[#00d0ff]/30 text-[#00d0ff] text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider bg-[#00d0ff]/10" title={mapping.desc}>
                  {mapping.tactic}
                </div>
                {!isLow && (
                  <div className="border border-border text-muted-foreground text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider bg-black/50 ml-4 hidden sm:block">
                    {mapping.tech}
                  </div>
                )}
              </div>

              {/* Right side: Status, Info, C/L, Severity, Plus icon */}
              <div className="flex items-center gap-3 md:gap-4">
                <div className={`border ${status.border} ${status.text} text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider bg-black/50 hidden md:block`}>
                  {status.label}
                </div>
                <div className="text-[10px] text-muted-foreground tracking-wider hidden lg:block">
                  Scenario-dependent
                </div>
                {!isLow && (
                  <div className="hidden lg:flex gap-2 ml-4">
                    <div className="border border-border text-muted-foreground text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider">
                      C {cVal}%
                    </div>
                    <div className="border border-border text-muted-foreground text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-wider">
                      L {lVal}%
                    </div>
                  </div>
                )}
                <div className={`text-[10px] font-bold px-3 py-0.5 ml-2 md:ml-4 uppercase tracking-wider min-w-[70px] text-center ${severity.bg} ${severity.text}`}>
                  {severity.label}
                </div>
                <div className="text-muted-foreground ml-2 transition-colors w-4 text-center font-bold text-lg leading-none select-none">
                  {isExpanded ? '-' : '+'}
                </div>
              </div>
            </div>

            {/* Expanded section */}
            {isExpanded && (
              <div className="px-12 py-5 bg-black/60 border-t border-border/30 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
                  <div>
                    <h4 className="text-gold font-mono uppercase tracking-widest font-bold mb-2">Technique Context</h4>
                    <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-4">{mapping.desc}</p>
                    
                    {/* Threat Actor Profiling (Phase 2) - Only visible on High intensity */}
                    {isHigh && mapping.threatActors && mapping.threatActors.length > 0 && (
                      <div className="mt-4">
                        <div className="text-[10px] text-danger/80 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-danger rounded-full animate-pulse"></span>
                          Known Threat Actors
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {mapping.threatActors.map((actor, aIdx) => (
                            <span key={aIdx} className="border border-danger text-danger bg-danger/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm">
                              {actor}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-[#00d0ff] font-mono uppercase tracking-widest font-bold mb-3">Hardening Recommendations</h4>
                    <ul className="text-muted-foreground font-sans text-sm space-y-2 list-none">
                      {visibleMitigations.map((mitigation, mIdx) => (
                        <li key={mIdx} className="flex gap-2 items-start">
                          <span className="text-[#00d0ff] opacity-70 mt-0.5">›</span>
                          <span className="leading-relaxed">{mitigation}</span>
                        </li>
                      ))}
                    </ul>
                    {isLow && mapping.mitigations.length > 1 && (
                      <p className="text-[10px] text-muted-foreground opacity-50 mt-4 italic">Increase scan intensity for additional hardening paths.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
