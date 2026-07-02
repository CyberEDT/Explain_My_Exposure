import React from 'react';
import ExposureRadar from './ExposureRadar';
import ExposureChainTable from './ExposureChainTable';
import AttackLikelihoodChart from './AttackLikelihoodChart';
import ExposureChainTimeline from './ExposureChainTimeline';
import MitreCoverageCards from './MitreCoverageCards';

export default function IntelligenceReportView({ activeResult, hosts, scanLevel = 'medium' }) {
  const score = activeResult?.score || 0;
  const riskProfile = score >= 85 ? 'CRITICAL' : score >= 70 ? 'HIGH' : score >= 40 ? 'MEDIUM' : 'LOW';
  
  const isLow = scanLevel === 'low';
  const isHigh = scanLevel === 'high';
  
  let sectionIndex = 1;
  const nextSec = () => String(sectionIndex++).padStart(2, '0');
  
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 pb-24 text-[#fafafa] font-mono">
      <div className="space-y-16">
        
        {/* Executive Summary */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-widest text-gold border-b border-border pb-2 uppercase">{nextSec()} // Executive Summary</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The network exposure assessment has concluded client-side. The compiled threat metrics highlight potential ingress vectors that could be leveraged by threat groups to compromise infrastructure nodes.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li><strong className="text-foreground">Overall Network Exposure Index:</strong> <span className="text-gold">{score}/100 Exposure Score</span></li>
            <li><strong className="text-foreground">Identified Risk Profile:</strong> {riskProfile}</li>
            <li><strong className="text-foreground">Total Scanned Hosts:</strong> {hosts.length}</li>
            <li><strong className="text-foreground">Exposed Network Port Count:</strong> {activeResult?.metrics?.openPorts || 0}</li>
            <li><strong className="text-foreground">Critical Entrypoints:</strong> {activeResult?.metrics?.criticalServices || 0}</li>
          </ul>

          <h3 className="text-base font-bold text-foreground mt-6 uppercase tracking-wider">Asset Intelligence Insights:</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            {hosts.map((h, i) => (
              <li key={i}>
                <strong className="text-foreground">{h.ip}</strong> <span className="text-gold">({h.intelligence?.asset_type || 'Unknown'})</span>: {h.intelligence?.narrative_context || 'No narrative generated.'}
              </li>
            ))}
          </ul>
          
          <div className="mt-6 p-4 border border-border bg-black/40 text-xs text-muted-foreground">
            <strong className="text-gold">Privacy Statement:</strong> Analysis was executed client-side local-first. No topology data was transmitted to external servers. All IP configurations, hostnames, and service listings remain in volatile memory.
          </div>
        </section>

        {/* Detected Node Inventory */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-widest text-gold border-b border-border pb-2 uppercase">{nextSec()} // Detected Node Inventory</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="p-3 font-bold text-foreground">Host IP Address</th>
                  <th className="p-3 font-bold text-foreground">Assumed Network Role</th>
                  <th className="p-3 font-bold text-foreground">Confidence</th>
                  <th className="p-3 font-bold text-foreground">Active Interfaces</th>
                </tr>
              </thead>
              <tbody>
                {hosts.map((h, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                    <td className="p-3 font-bold">{h.ip}</td>
                    <td className="p-3 text-gold">{h.intelligence?.asset_type || 'Unknown'}</td>
                    <td className="p-3">{h.intelligence?.confidence_score || 0}%</td>
                    <td className="p-3 text-muted-foreground">{(h.ports || []).map(p => `${p.port}/tcp`).join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Exposure Scoring Breakdown - Now shown for all levels, but contents filter based on intensity */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-widest text-gold border-b border-border pb-2 uppercase">{nextSec()} // Exposure Scoring Breakdown</h2>
          
          {!isLow && (
            <>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The Exposure Scoring model calculates threats based on non-linear chaining.
              </p>
              <div className="bg-card border border-border p-4 overflow-x-auto text-xs whitespace-pre">
                {`EXPOSURE_SCORE = min(100, B_max + SUM(B_secondary) * 0.1 + L_legacy + C_combo + E_internet)`}
              </div>
            </>
          )}

          {activeResult?.metrics?.exposure_chain && (
            <div className="mt-8 border border-border bg-black/40 p-6 flex flex-col items-center w-full">
              <div className="text-gold font-bold uppercase tracking-widest mb-4">Network Exposure Chain Profile</div>
              
              {!isLow && (
                <>
                  <div className="w-full max-w-[500px]">
                    <ExposureRadar data={activeResult.metrics.exposure_chain} height={350} />
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-10">
                    <AttackLikelihoodChart data={activeResult.metrics.exposure_chain} />
                    <ExposureChainTimeline data={activeResult.metrics.exposure_chain} />
                  </div>
                  
                  <div className="w-full mt-6">
                    <MitreCoverageCards data={activeResult.metrics.exposure_chain} />
                  </div>
                </>
              )}

              {/* Exposure Chain Table always renders, but handles its own condensation based on scanLevel */}
              <div className={isLow ? "w-full" : "w-full mt-8"}>
                <ExposureChainTable data={activeResult.metrics.exposure_chain} scanLevel={activeResult.scanLevel || scanLevel} />
              </div>
            </div>
          )}
          
          <div className="space-y-6 mt-4">
            {hosts.map((h, i) => {
              const maxPort = (h.ports || []).reduce((max, p) => (p.port > max.port ? p : max), {port: 0});
              return (
                <ul key={i} className="list-disc pl-5 space-y-1 text-sm">
                  <li><strong className="text-foreground">Active Host:</strong> {h.ip}</li>
                  <li><strong className="text-foreground">Host Exposure Score:</strong> <span className="text-gold">{score}</span></li>
                  <li><strong className="text-foreground">Maximum Target Port:</strong> {maxPort.port ? `Port ${maxPort.port}` : 'None'}</li>
                  <li><strong className="text-foreground">Legacy Protocols:</strong> {(h.ports || []).some(p => [21, 23].includes(p.port)) ? 'Detected (+15 Penalty)' : 'None Detected'}</li>
                  <li><strong className="text-foreground">Chaining Combos:</strong> {(h.ports || []).some(p => [445, 139].includes(p.port)) && (h.ports || []).some(p => [3389, 5985].includes(p.port)) ? 'RDP+SMB Identified (+20 Penalty)' : 'None Identified'}</li>
                </ul>
              );
            })}
          </div>
        </section>

        {/* Attack Paths */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-widest text-gold border-b border-border pb-2 uppercase">{nextSec()} // Attack Paths</h2>
          
          {activeResult?.paths && activeResult.paths.length > 0 ? (
            activeResult.paths.map((path, idx) => (
              <div key={idx} className="border border-border bg-card p-5 mb-6">
                <p className="text-sm text-foreground font-bold uppercase tracking-widest mb-3">
                  <span className="text-gold mr-2">{idx + 1}.</span>
                  {path.title || `Attack Path: ${path.id || 'Custom'}`}
                </p>
                {path.description && <p className="text-sm text-muted-foreground leading-relaxed mb-4">{path.description}</p>}
                
                {!isLow && (
                  <div className="bg-black/80 border border-border p-4 text-xs font-mono text-muted-foreground overflow-x-auto">
                    <div className="text-green-500 mb-3">$ {path.command || `eme.explain --target ${path.node || 'network'}`}</div>
                    <div className="flex flex-wrap items-center gap-3 text-foreground mb-4">
                      {path.steps.map((step, sIdx) => (
                        <React.Fragment key={sIdx}>
                          <span className="bg-white/10 border border-white/20 px-2 py-1">{step}</span>
                          {sIdx < path.steps.length - 1 && <span className="text-gold font-bold text-sm">-&gt;</span>}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="text-gold mt-2">→ tier-0 compromise probability: {path.likelihood || path.probability || 'UNKNOWN'}</div>
                  </div>
                )}
                
                {isLow && (
                  <div className="bg-black/80 border border-border p-4 text-xs text-foreground">
                    <span className="text-danger font-bold">Hackers Could Use This Path To:</span> {path.steps && path.steps[path.steps.length - 1].replace('Objective: ', '')}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No definitive attack paths could be mapped from the active interfaces.</p>
          )}
        </section>

        {/* MITRE ATT&CK Mappings - HIDE FOR BEGINNERS */}
        {!isLow && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-widest text-gold border-b border-border pb-2 uppercase">{nextSec()} // MITRE ATT&CK Mappings</h2>
          <ul className="space-y-3 text-sm">
            {activeResult?.mitre && activeResult.mitre.length > 0 ? (
              activeResult.mitre.map((m, idx) => (
                <li key={idx}>
                  <strong className="text-foreground">{m.ip}:{m.port} (T{m.techniqueId} - {m.techniqueName}):</strong> <span className="text-muted-foreground">{m.description}</span>
                </li>
              ))
            ) : (
              <p className="text-muted-foreground">No MITRE tactics were mapped for the discovered services.</p>
            )}
          </ul>
          </section>
        )}

        {/* Detection Hooks - ONLY SHOW FOR HIGH/PROFESSIONALS */}
        {isHigh && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold tracking-widest text-gold border-b border-border pb-2 uppercase">{nextSec()} // Detection Hooks</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            To monitor and alert on exploitation of these exposed interfaces, deploy the following SIEM rules:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li><strong className="text-foreground">Remote Services Pivot (Port 445):</strong> Alert on Event ID <code>7045</code> (New Service Creation) on Windows Server nodes, combined with source IPs outside the admin subnet.</li>
            <li><strong className="text-foreground">Credential Spraying (Port 3389):</strong> Alert on Event ID <code>4625</code> (Failed Logon) exceeding 30 attempts within 60 seconds from a single IP source.</li>
            <li><strong className="text-foreground">Active Directory Enumeration (Port 389):</strong> Monitor LDAP search filters matching SPN tags (<code>servicePrincipalName=*</code>) originating from standard developer workstations.</li>
            <li><strong className="text-foreground">Cleartext Sniffing (Port 21/23):</strong> Alert on high-volume traffic on cleartext ports indicating potential bulk data exfiltration or credential harvesting.</li>
          </ul>
          </section>
        )}

        {/* Remediation Roadmaps */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold tracking-widest text-gold border-b border-border pb-2 uppercase">{nextSec()} // Remediation Roadmaps</h2>
          <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
            {activeResult?.recommendations && activeResult.recommendations.length > 0 ? (
              activeResult.recommendations.map((rec, idx) => (
                <li key={idx} className="leading-relaxed"><strong>{rec}</strong></li>
              ))
            ) : (
              <li className="leading-relaxed">Ensure all systems are fully patched and unnecessary services are disabled.</li>
            )}
          </ol>
        </section>

      </div>
    </div>
  );
}
