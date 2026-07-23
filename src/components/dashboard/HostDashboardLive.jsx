import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ExposureRadar from './ExposureRadar';

export default function HostDashboardLive({ host, activeResult, activeHostIdx, setActiveHostIdx, totalHosts }) {
  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setActiveHostIdx(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveHostIdx(prev => Math.min(totalHosts - 1, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalHosts, setActiveHostIdx]);

  if (!host) return null;

  // Extract necessary data
  const ip = host.ip || 'UNKNOWN';
  const mac = host.mac || 'N/A';
  const hostnames = host.hostnames && host.hostnames.length > 0 ? host.hostnames.join(', ') : 'N/A';
  const role = host.intelligence?.asset_type ? host.intelligence.asset_type.toUpperCase().replace(/\s+/g, '_') : 'UNKNOWN_ROLE';
  const os = host.os || 'Unknown OS';
  const ports = (host.ports || []).map(p => p.port).sort((a, b) => a - b).join(' · ');
  
  // Detect Legacy
  const hasLegacy = (host.ports || []).some(p => [21, 23, 445].includes(p.port));
  const legacyText = hasLegacy ? 'Detected (SMBv1 / Cleartext)' : 'None Detected';
  const legacyColor = hasLegacy ? 'text-danger' : 'text-success';

  // Determine Actor Tier based on exposed critical ports
  const hasCritical = (host.ports || []).some(p => [445, 3389, 389, 88].includes(p.port));
  const actorTier = hasCritical ? 'HIGH' : 'MEDIUM';
  const tierColor = hasCritical ? 'text-danger' : 'text-gold';

  // Global Score (or could be host-specific if implemented)
  const score = activeResult?.score || 0;
  
  // SVG Ring calculations
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // MITRE Tactics for this specific host
  const hostMitre = (activeResult?.mitre || []).filter(m => m.ip === ip).slice(0, 3);

  // Dynamic Attack Path Generation based on ports
  const pathNodes = ['INTERNET'];
  if ((host.ports || []).some(p => p.port === 3389)) pathNodes.push('RDP:3389');
  if ((host.ports || []).some(p => p.port === 22)) pathNodes.push('SSH:22');
  if ((host.ports || []).some(p => p.port === 445)) pathNodes.push('SMB:445');
  if ((host.ports || []).some(p => p.port === 80 || p.port === 443)) pathNodes.push('WEB_EXPLOIT');
  if ((host.ports || []).some(p => p.port === 389 || p.port === 88)) pathNodes.push('LDAP:389');
  
  if (role.includes('DOMAIN_CONTROLLER')) {
    pathNodes.push('DC_ADMIN');
  } else if (role.includes('DATABASE')) {
    pathNodes.push('DATA_EXFIL');
  } else {
    pathNodes.push('SYSTEM_COMPROMISE');
  }

  return (
    <div className="border border-border bg-[#0a0a0a] p-6 md:p-8 font-mono text-[#fafafa] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      {/* Header */}
      <div className="flex justify-between items-center mb-10 border-b border-border/50 pb-4">
        <div className="flex items-center gap-6">
          <div className="text-[10px] text-muted-foreground tracking-widest">// HOST_DASHBOARD.LIVE</div>
          
          {/* Navigation Controls */}
          {totalHosts > 1 && (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveHostIdx(Math.max(0, activeHostIdx - 1))}
                disabled={activeHostIdx === 0}
                className="px-3 py-1 border border-border/50 bg-black/40 text-[10px] hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-border/50 disabled:hover:text-muted-foreground transition-all tracking-widest"
              >
                &lt; PREV
              </button>
              <span className="text-muted-foreground text-[10px] tracking-widest">
                {activeHostIdx + 1} / {totalHosts}
              </span>
              <button 
                onClick={() => setActiveHostIdx(Math.min(totalHosts - 1, activeHostIdx + 1))}
                disabled={activeHostIdx === totalHosts - 1}
                className="px-3 py-1 border border-border/50 bg-black/40 text-[10px] hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-border/50 disabled:hover:text-muted-foreground transition-all tracking-widest"
              >
                NEXT &gt;
              </button>
            </div>
          )}
        </div>
        <div className={`text-[10px] tracking-widest ${tierColor}`}>PRIORITY: {actorTier}</div>
      </div>

      {/* Top Section: Score & Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Score Ring -> Exposure Radar */}
        <div className="col-span-1 flex flex-col items-center justify-center border-r border-border/30 w-full">
          <div className="text-[10px] text-muted-foreground tracking-widest mb-2 uppercase">Host Exposure Chain</div>
          <div className="w-full max-w-[250px]">
            <ExposureRadar data={host.intelligence?.exposure_chain} height={250} />
          </div>
          <div className="flex flex-col items-center justify-center mt-2">
            <span className="text-3xl font-display font-bold text-foreground">{score}</span>
            <span className="text-[10px] tracking-widest text-muted-foreground mt-1">BASE SCORE</span>
          </div>
        </div>

        {/* Details Table */}
        <div className="col-span-1 md:col-span-2">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-border/30">
                <td className="py-4 text-muted-foreground tracking-widest text-xs w-1/4">HOST</td>
                <td className="py-4 font-bold text-base">{ip}</td>
              </tr>
              <tr className="border-b border-border/30">
                <td className="py-4 text-muted-foreground tracking-widest text-xs">HOSTNAME</td>
                <td className="py-4 text-muted-foreground">{hostnames}</td>
              </tr>
              <tr className="border-b border-border/30">
                <td className="py-4 text-muted-foreground tracking-widest text-xs">MAC_ADDR</td>
                <td className="py-4 text-muted-foreground">{mac}</td>
              </tr>
              <tr className="border-b border-border/30">
                <td className="py-4 text-muted-foreground tracking-widest text-xs">ROLE</td>
                <td className="py-4 font-bold text-gold">{role}</td>
              </tr>
              <tr className="border-b border-border/30">
                <td className="py-4 text-muted-foreground tracking-widest text-xs">OS</td>
                <td className="py-4">{os}</td>
              </tr>
              <tr className="border-b border-border/30">
                <td className="py-4 text-muted-foreground tracking-widest text-xs">OPEN_PORTS</td>
                <td className="py-4 text-muted-foreground">{ports}</td>
              </tr>
              <tr className="border-b border-border/30">
                <td className="py-4 text-muted-foreground tracking-widest text-xs">LEGACY</td>
                <td className={`py-4 ${legacyColor}`}>{legacyText}</td>
              </tr>
              <tr>
                <td className="py-4 text-muted-foreground tracking-widest text-xs">ACTOR_TIER</td>
                <td className={`py-4 ${tierColor}`}>{actorTier}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Middle Section: Attack Path Graph */}
      <div className="mt-12">
        <div className="text-[10px] text-muted-foreground tracking-widest mb-6">// ATTACK_PATH.GRAPH</div>
        <div className="flex flex-wrap items-center gap-3 text-xs overflow-x-auto pb-4">
          {pathNodes.map((node, idx) => {
            const isLast = idx === pathNodes.length - 1;
            const isFirst = idx === 0;
            return (
              <React.Fragment key={idx}>
                <div className={`px-4 py-3 border ${isLast ? 'border-danger text-danger bg-[#1a0505]' : isFirst ? 'border-border bg-transparent text-muted-foreground' : 'border-border bg-[#0f0f0f] text-muted-foreground'}`}>
                  {node}
                </div>
                {!isLast && (
                  <div className="text-gold opacity-60">¬</div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: MITRE Grid */}
      {hostMitre.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
          {hostMitre.map((m, idx) => (
            <div key={idx} className={`p-6 bg-transparent flex flex-col items-center justify-center text-center ${idx !== hostMitre.length - 1 ? 'border-b md:border-b-0 md:border-r border-border' : ''}`}>
              <span className="text-gold font-bold text-sm mb-1">T{m.techniqueId}</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{m.techniqueName}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
