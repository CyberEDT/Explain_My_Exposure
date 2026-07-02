import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldAlert, ShieldCheck, Activity, Terminal, Crosshair, Network, FileText, Lock, AlertTriangle, ArrowRight, Layers } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function ReportPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const radarData = [
    { subject: 'DISCOVER', A: 100, fullMark: 100 },
    { subject: 'ENUMERATE', A: 90, fullMark: 100 },
    { subject: 'ACCESS', A: 95, fullMark: 100 },
    { subject: 'ABUSE', A: 85, fullMark: 100 },
    { subject: 'MOVE', A: 95, fullMark: 100 },
    { subject: 'IMPACT', A: 100, fullMark: 100 },
  ];

  const pieData = [
    { name: 'RDP (3389)', value: 40 },
    { name: 'SMB (445)', value: 40 },
    { name: 'LDAP (389)', value: 20 },
  ];
  const COLORS = ['#ef4444', '#f59e0b', '#3b82f6'];

  return (
    <div className="relative min-h-screen bg-[#030303] text-[#fafafa] font-mono selection:bg-danger selection:text-white">
      
      {/* 1. Hero / Header Section */}
      <section className="border-b border-border bg-[#050505]">
        <div className="mx-auto max-w-[1200px] px-6 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            
            {/* Left: Briefing Info */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 border border-danger/30 bg-danger/5 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-danger mb-8">
                <span className="h-1.5 w-1.5 bg-danger rounded-full animate-pulse-dot"></span> // INTELLIGENCE DOSSIER : DECLASSIFIED
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-6">Network Exposure <br/><span className="text-muted-foreground">Assessment</span></h1>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-xs tracking-widest uppercase">
                <div>
                  <div className="text-muted-foreground mb-1">Target Asset</div>
                  <div className="text-foreground font-bold">CORP-DC-01 (10.0.0.5)</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Scan Profile</div>
                  <div className="text-foreground font-bold">EME High (Verbose)</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Timestamp</div>
                  <div className="text-foreground font-bold">2026-06-12T14:30:00Z</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Engine Version</div>
                  <div className="text-foreground font-bold">V.1.0.0-PROD</div>
                </div>
              </div>
            </div>

            {/* Right: Scorecard */}
            <div className="w-full lg:w-[400px] shrink-0 border border-border bg-black p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-danger/20 rounded-full blur-[50px]"></div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Exposure Score</div>
              <div className="flex items-end gap-4 mb-6">
                <div className="font-display text-7xl font-bold text-danger leading-none">88</div>
                <div className="text-danger font-bold text-xs uppercase tracking-widest mb-2 border border-danger px-2 py-1">CRITICAL EXPOSURE</div>
              </div>
              
              <div className="space-y-4 border-t border-border pt-6 text-xs uppercase tracking-widest">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Attacker Interest</span>
                  <span className="text-foreground font-bold">98/100 (HIGH VALUE)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Inferred Asset Type</span>
                  <span className="text-gold font-bold">DOMAIN_CONTROLLER</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Executive Summary */}
      <section className="border-b border-border bg-background">
         <div className="mx-auto max-w-[1200px] px-6 py-16">
            <h2 className="font-display text-2xl font-bold uppercase tracking-widest text-foreground mb-8 flex items-center gap-3">
              <FileText className="w-6 h-6 text-gold" /> Executive Summary
            </h2>
            <div className="font-serif text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl border-l-4 border-border pl-6">
              <p className="mb-6">
                The deterministic intelligence engine has completed the analysis of host <code>10.0.0.5</code>. Based on the specific service signature identified (Ports 53, 88, 135, 389, 445, 3389), this asset is confidently classified as a <strong className="text-foreground">Domain Controller</strong>.
              </p>
              <p>
                The current exposure profile presents an immediate, critical risk to the organization. Public or unrestricted exposure of these administrative protocols provides threat actors with multiple initial access vectors and lateral movement capabilities. <span className="text-danger font-bold underline decoration-danger/50 underline-offset-4">Immediate remediation is required to prevent domain-wide compromise.</span>
              </p>
            </div>
         </div>
      </section>

      {/* 3. Technical Summary & Analyst Notes */}
      <section className="border-b border-border bg-[#050505]">
         <div className="mx-auto max-w-[1200px] px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              {/* Left: Tech Summary */}
              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-widest text-foreground mb-8 flex items-center gap-3">
                  <Terminal className="w-6 h-6 text-muted-foreground" /> Technical Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-border pb-4">
                    <span className="text-muted-foreground uppercase tracking-widest text-xs">Open Ports</span>
                    <span className="text-foreground font-bold font-mono text-lg">6</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border pb-4">
                    <span className="text-muted-foreground uppercase tracking-widest text-xs">Critical Services Exposed</span>
                    <span className="text-danger font-bold font-mono text-lg">3 <span className="text-xs text-muted-foreground font-normal">(RDP, SMB, LDAP)</span></span>
                  </div>
                  <div className="flex justify-between items-center border-b border-border pb-4">
                    <span className="text-muted-foreground uppercase tracking-widest text-xs">Attack Pathways Identified</span>
                    <span className="text-foreground font-bold font-mono text-lg">4</span>
                  </div>
                  <div className="flex justify-between items-center pb-4">
                    <span className="text-muted-foreground uppercase tracking-widest text-xs">CVE Mapping</span>
                    <span className="text-muted-foreground italic font-mono text-xs text-right max-w-[200px]">Deferred to vulnerability scanner. EME focuses on architectural exposure.</span>
                  </div>
                </div>
              </div>

              {/* Right: Analyst Notes */}
              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-widest text-foreground mb-8 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-danger" /> Analyst Notes
                </h2>
                <div className="bg-danger/10 border border-danger/30 p-6 shadow-[0_0_30px_rgba(239,68,68,0.05)]">
                  <div className="text-danger font-bold uppercase tracking-widest text-[10px] mb-4">PRIORITY INTELLIGENCE REQUIREMENT</div>
                  <p className="text-sm leading-relaxed text-foreground/90 font-mono">
                    The combination of Port 3389 (RDP) and Port 445 (SMB) on a Domain Controller is the most heavily penalized configuration in the APES scoring model. 
                    <br/><br/>
                    It allows an attacker to achieve initial access via RDP credential spraying, and then immediately utilize SMB admin shares for rapid lateral movement across the domain.
                  </p>
                </div>
              </div>

            </div>
         </div>
      </section>

      {/* 4. Exposure Chain Breakdown */}
      <section className="border-b border-border bg-background">
         <div className="mx-auto max-w-[1200px] px-6 py-20">
            <h2 className="font-display text-2xl font-bold uppercase tracking-widest text-foreground mb-12 flex items-center gap-3">
              <Network className="w-6 h-6 text-gold" /> Exposure Chain Breakdown
            </h2>
            
            <div className="relative border-l-2 border-border ml-4 md:ml-8 space-y-12">
              
              <div className="relative pl-8 md:pl-12">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-border border-4 border-background"></div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">PHASE 01 // DISCOVER</div>
                <div className="bg-black border border-border p-5">
                  <div className="flex gap-4 mb-2"><span className="text-gold font-bold w-20">Finding:</span><span className="text-muted-foreground">The host responds to ICMP and port scans.</span></div>
                  <div className="flex gap-4"><span className="text-danger font-bold w-20">Action:</span><span className="text-foreground">The adversary confirms the asset is live and begins service enumeration.</span></div>
                </div>
              </div>

              <div className="relative pl-8 md:pl-12">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-border border-4 border-background"></div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">PHASE 02 // ENUMERATE</div>
                <div className="bg-black border border-border p-5">
                  <div className="flex gap-4 mb-2"><span className="text-gold font-bold w-20">Finding:</span><span className="text-muted-foreground">Port 389 (LDAP) and 445 (SMB) are exposed.</span></div>
                  <div className="flex gap-4"><span className="text-danger font-bold w-20">Action:</span><span className="text-foreground">The adversary utilizes null sessions to dump the Active Directory user list and password policies.</span></div>
                </div>
              </div>

              <div className="relative pl-8 md:pl-12">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-gold border-4 border-background shadow-[0_0_10px_rgba(255,191,0,0.5)]"></div>
                <div className="text-[10px] uppercase tracking-widest text-gold mb-2">PHASE 03 // ACCESS</div>
                <div className="bg-black border border-gold/50 p-5">
                  <div className="flex gap-4 mb-2"><span className="text-gold font-bold w-20">Finding:</span><span className="text-muted-foreground">Port 3389 (RDP) is exposed.</span></div>
                  <div className="flex gap-4"><span className="text-danger font-bold w-20">Action:</span><span className="text-foreground">The adversary initiates a password spraying campaign against the enumerated user list via RDP.</span></div>
                </div>
              </div>

              <div className="relative pl-8 md:pl-12">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-danger border-4 border-background shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                <div className="text-[10px] uppercase tracking-widest text-danger mb-2">PHASE 04 // ABUSE</div>
                <div className="bg-black border border-danger/50 p-5">
                  <div className="flex gap-4 mb-2"><span className="text-gold font-bold w-20">Finding:</span><span className="text-muted-foreground">Port 445 (SMB) allows NTLM relaying.</span></div>
                  <div className="flex gap-4"><span className="text-danger font-bold w-20">Action:</span><span className="text-foreground">The adversary forces network authentication from adjacent machines and relays it to the Domain Controller to execute code.</span></div>
                </div>
              </div>

              <div className="relative pl-8 md:pl-12">
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-danger border-4 border-background"></div>
                <div className="text-[10px] uppercase tracking-widest text-danger mb-2">PHASE 05 // MOVE & IMPACT</div>
                <div className="bg-black border border-border p-5">
                  <div className="flex gap-4"><span className="text-danger font-bold w-20">Action:</span><span className="text-foreground">Complete domain compromise, leading to data exfiltration and organizational ransomware deployment.</span></div>
                </div>
              </div>

            </div>
         </div>
      </section>

      {/* 5. MITRE ATT&CK Mapping */}
      <section className="border-b border-border bg-[#050505]">
         <div className="mx-auto max-w-[1200px] px-6 py-20">
            <h2 className="font-display text-2xl font-bold uppercase tracking-widest text-foreground mb-8 flex items-center gap-3">
              <Layers className="w-6 h-6 text-muted-foreground" /> MITRE ATT&CK Mapping
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-4 px-4 font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Exposure Source</th>
                    <th className="py-4 px-4 font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Tactic</th>
                    <th className="py-4 px-4 font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Technique ID</th>
                    <th className="py-4 px-4 font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Technique Name</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50 bg-black">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-bold">SMB (445)</td>
                    <td className="py-4 px-4 text-muted-foreground">Discovery</td>
                    <td className="py-4 px-4 text-gold">T1046</td>
                    <td className="py-4 px-4">Network Service Discovery</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-bold">LDAP (389)</td>
                    <td className="py-4 px-4 text-muted-foreground">Credential Access</td>
                    <td className="py-4 px-4 text-gold">T1558</td>
                    <td className="py-4 px-4">Steal or Forge Kerberos Tickets</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-bold text-danger">RDP (3389)</td>
                    <td className="py-4 px-4 text-muted-foreground">Credential Access</td>
                    <td className="py-4 px-4 text-danger font-bold">T1110</td>
                    <td className="py-4 px-4">Brute Force</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-bold text-danger">SMB (445)</td>
                    <td className="py-4 px-4 text-muted-foreground">Lateral Movement</td>
                    <td className="py-4 px-4 text-danger font-bold">T1021.002</td>
                    <td className="py-4 px-4">SMB/Windows Admin Shares</td>
                  </tr>
                </tbody>
              </table>
            </div>
         </div>
      </section>

      {/* 6. Recommendations & Visualizations */}
      <section className="bg-background">
         <div className="mx-auto max-w-[1200px] px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Left: Recommendations */}
              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-widest text-foreground mb-8 flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-success" /> Tactical Remediation Plan
                </h2>
                <div className="space-y-6">
                  <div className="border border-border bg-[#0a0a0c] p-6">
                    <div className="text-danger font-bold uppercase tracking-widest text-[10px] mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-danger inline-block"></span> CRITICAL PRIORITY
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Isolate RDP Access</h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                      <li>Immediately remove Port 3389 from public routing.</li>
                      <li>Require VPN or an identity-aware proxy for all administrative RDP access.</li>
                    </ul>
                  </div>

                  <div className="border border-border bg-[#0a0a0c] p-6">
                    <div className="text-gold font-bold uppercase tracking-widest text-[10px] mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-gold inline-block"></span> HIGH PRIORITY
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Harden SMB Configurations</h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                      <li>Enforce SMB signing globally across the domain to prevent NTLM relay attacks (<code>RequireSecuritySignature</code>).</li>
                      <li>Disable SMBv1 entirely across the estate.</li>
                    </ul>
                  </div>

                  <div className="border border-border bg-[#0a0a0c] p-6">
                    <div className="text-gold font-bold uppercase tracking-widest text-[10px] mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-gold inline-block"></span> HIGH PRIORITY
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Restrict Null Sessions</h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
                      <li>Modify Group Policy (<code>RestrictNullSessAccess</code>) to prevent unauthenticated enumeration of network shares and AD accounts.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right: Visualizations */}
              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-widest text-foreground mb-8 flex items-center gap-3">
                  <Activity className="w-6 h-6 text-muted-foreground" /> Visual Summary
                </h2>
                
                <div className="space-y-8">
                  {/* Radar Chart */}
                  <div className="bg-[#050505] border border-border p-6 h-[300px] relative">
                    <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-muted-foreground z-10">Exposure Radar</div>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                        <PolarGrid stroke="#333" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace' }} />
                        <Radar name="Risk" dataKey="A" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                        <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Donut Chart */}
                  <div className="bg-[#050505] border border-border p-6 h-[250px] relative">
                    <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-muted-foreground z-10">Opportunity Distribution</div>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333', fontSize: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Legend */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6 text-[10px] uppercase tracking-widest text-muted-foreground">
                      <div className="flex items-center gap-2"><span className="w-2 h-2 bg-danger"></span> RDP</div>
                      <div className="flex items-center gap-2"><span className="w-2 h-2 bg-[#f59e0b]"></span> SMB</div>
                      <div className="flex items-center gap-2"><span className="w-2 h-2 bg-blue-500"></span> LDAP</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
         </div>
      </section>

      {/* 7. CTA */}
      <section className="bg-[#030303] py-24 text-center border-t border-border">
         <div className="mx-auto max-w-2xl px-6">
            <h2 className="font-display text-3xl font-bold uppercase tracking-widest mb-6">Generate Your Report</h2>
            <p className="text-muted-foreground mb-8">Upload your Nmap XML to instantly generate a local, fully private intelligence dossier identical to this showcase.</p>
            <Link 
               to="/scanner" 
               className="inline-flex items-center gap-3 border border-gold bg-gold px-8 py-3 font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:glow-gold"
            >
               UPLOAD SCAN <ArrowRight className="w-4 h-4" />
            </Link>
         </div>
      </section>

    </div>
  );
}
