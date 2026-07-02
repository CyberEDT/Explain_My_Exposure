import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Network, Search, Filter, ShieldAlert, Shield, ShieldCheck, ArrowRight, Activity, Terminal, Target } from 'lucide-react';
import { Treemap, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function MitrePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTechnique, setActiveTechnique] = useState('T1021');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for Recharts Treemap
  const treemapData = [
    { name: 'Initial Access', size: 120, fill: '#ffbf00' },
    { name: 'Execution', size: 80, fill: '#333' },
    { name: 'Persistence', size: 40, fill: '#555' },
    { name: 'Privilege Escalation', size: 90, fill: '#997300' },
    { name: 'Defense Evasion', size: 60, fill: '#444' },
    { name: 'Credential Access', size: 150, fill: '#eab308' },
    { name: 'Discovery', size: 200, fill: '#222' },
    { name: 'Lateral Movement', size: 180, fill: '#ef4444' },
    { name: 'Impact', size: 100, fill: '#7f1d1d' },
  ];

  // Mock data for BarChart
  const coverageData = [
    { name: 'Initial Access', count: 3 },
    { name: 'Execution', count: 1 },
    { name: 'Persistence', count: 0 },
    { name: 'Priv Esc', count: 2 },
    { name: 'Defense Evasion', count: 1 },
    { name: 'Cred Access', count: 4 },
    { name: 'Discovery', count: 6 },
    { name: 'Lateral Move', count: 5 },
    { name: 'Impact', count: 2 },
  ];

  const techniques = [
    { 
      id: 'T1046', 
      name: 'Network Service Discovery', 
      tactic: 'Discovery',
      source: 'SMB (Port 445)',
      opportunity: 'The SMB service allows unauthenticated null sessions, permitting adversaries to enumerate network shares, active sessions, and local users to map out the environment before attempting lateral movement.',
      remediation: 'Disable SMBv1 entirely. Enforce SMB signing across the domain. Restrict null session enumeration via Group Policy (RestrictNullSessAccess).'
    },
    { 
      id: 'T1021', 
      name: 'Remote Services', 
      tactic: 'Lateral Movement',
      source: 'SMB (Port 445) / RDP (Port 3389)',
      opportunity: 'Exposed administrative interfaces (RDP and SMB Admin$ shares) allow an adversary with harvested credentials to directly authenticate and execute arbitrary code on adjacent nodes, bypassing standard network perimeter controls.',
      remediation: 'Implement Network Level Authentication (NLA) for RDP. Restrict RDP access to VPN users or jump hosts. Audit and disable unnecessary administrative shares (Admin$, C$).'
    },
    { 
      id: 'T1110', 
      name: 'Brute Force', 
      tactic: 'Credential Access',
      source: 'RDP (Port 3389) / SSH (Port 22)',
      opportunity: 'Publicly exposed remote access protocols without rate-limiting or multifactor authentication (MFA) provide an infinite attack surface for automated password spraying and credential stuffing campaigns.',
      remediation: 'Implement strict account lockout policies. Require MFA for all remote access. Transition from password-based SSH to cryptographic key-pair authentication.'
    },
    { 
      id: 'T1557', 
      name: 'Adversary-in-the-Middle', 
      tactic: 'Credential Access',
      source: 'SMB (Port 445)',
      opportunity: 'A lack of SMB signing enforcement allows an attacker on the same broadcast domain to intercept and relay NTLM authentication hashes, granting them administrative access without ever cracking the password.',
      remediation: 'Require SMB signing for all clients and servers (RequireSecuritySignature). Disable NTLM authentication where possible and enforce Kerberos.'
    }
  ];

  const filteredTechniques = techniques.filter(t => 
    t.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeTechData = techniques.find(t => t.id === activeTechnique) || techniques[0];

  return (
    <div className="relative min-h-screen bg-[#030303] text-[#fafafa] font-mono selection:bg-gold selection:text-black">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden border-b border-border min-h-[90vh] flex flex-col justify-center">
        {/* Subtle Matrix Grid Background */}
        <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/80 to-[#030303]"></div>
        
        <div className="relative mx-auto max-w-[1600px] px-6 text-center z-10 mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 border border-gold/30 bg-gold/5 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-gold mb-12 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 bg-gold rounded-full animate-pulse-dot"></span> // EXPOSURE-TO-TACTIC MAPPING
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter uppercase mb-8 leading-[0.9]"
          >
            EME MITRE <br/> <span className="text-gold">Grid</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground font-mono leading-relaxed mb-16"
          >
            Translating raw network exposures into standardized adversary behavior and recognized threat techniques.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="#matrix" className="inline-flex items-center gap-3 border border-gold bg-gold px-8 py-4 font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:glow-gold hover:translate-y-[-2px]">
              EXPLORE THE MATRIX <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. The Core Philosophy */}
      <section className="bg-background py-32 border-b border-border">
         <div className="mx-auto max-w-[1200px] px-6">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-10 text-foreground text-center">Bridging the Gap Between <span className="text-gold">Port</span> and <span className="text-danger">Payload</span></h2>
            
            <p className="font-mono text-base md:text-lg text-muted-foreground leading-loose text-center max-w-4xl mx-auto mb-16">
              A port scan tells you that <code>445</code> is open. It does not tell you that an adversary will use this exposure to execute <code>T1021.002</code> (SMB/Windows Admin Shares) for lateral movement. The EME MITRE Grid deterministic engine automatically translates exposed services into the corresponding MITRE ATT&CK® Tactics and Techniques. We map the attack surface not by <span className="italic text-foreground">what it is</span>, but by <span className="font-bold text-gold underline decoration-gold underline-offset-4">how it will be weaponized</span>.
            </p>

            <div className="bg-[#0a0a0c] border-l-4 border-l-gold p-8 shadow-[0_0_40px_rgba(255,191,0,0.05)] mx-auto max-w-3xl">
              <div className="flex items-start gap-4">
                <Network className="w-8 h-8 text-gold shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2 font-display tracking-wide">Why Map to MITRE?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Standardizing exposures to the ATT&CK framework allows SOC analysts to immediately feed EME findings into their SIEM detection rules, purple-team exercises, and incident response playbooks. It transforms theoretical vulnerabilities into actionable threat models.
                  </p>
                </div>
              </div>
            </div>
         </div>
      </section>

      {/* 3. Exposure-to-MITRE Mapping */}
      <section className="bg-[#050505] py-32 border-b border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-danger/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="mx-auto max-w-[1600px] px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <div className="text-danger tracking-widest text-[10px] uppercase mb-4">// INTERNAL LOGIC</div>
              <h2 className="font-display text-4xl font-bold uppercase mb-8">The Translation Matrix</h2>
              <p className="font-mono text-muted-foreground leading-relaxed mb-8">
                The EME engine maps raw exposures to MITRE techniques based on service functionality, historical adversary use, and known vulnerability classes. 
              </p>
              <p className="font-mono text-muted-foreground leading-relaxed">
                When a scanner identifies a service, the Intelligence Pipeline splits that singular data point into multiple divergent attack vectors, presenting a complete picture of the adversary's options.
              </p>
            </div>

            <div className="space-y-6 font-mono text-xs">
              {/* SMB Block */}
              <div className="bg-black border border-border p-6 shadow-xl relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold"></div>
                <div className="text-muted-foreground mb-4 font-bold">// EXPOSURE: SMB (Port 445)</div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3"><span className="text-gold">→</span> <span className="text-foreground">T1046</span> <span className="text-muted-foreground opacity-50 hidden md:inline">|</span> <span className="text-muted-foreground">Network Service Discovery (Enumerate shares)</span></div>
                  <div className="flex items-center gap-3"><span className="text-gold">→</span> <span className="text-foreground">T1021</span> <span className="text-muted-foreground opacity-50 hidden md:inline">|</span> <span className="text-danger font-bold">Remote Services (Lateral movement)</span></div>
                  <div className="flex items-center gap-3"><span className="text-gold">→</span> <span className="text-foreground">T1557</span> <span className="text-muted-foreground opacity-50 hidden md:inline">|</span> <span className="text-muted-foreground">Adversary-in-the-Middle (NTLM Relay)</span></div>
                </div>
              </div>

              {/* RDP Block */}
              <div className="bg-black border border-border p-6 shadow-xl relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-danger"></div>
                <div className="text-muted-foreground mb-4 font-bold">// EXPOSURE: RDP (Port 3389)</div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3"><span className="text-danger">→</span> <span className="text-foreground">T1110</span> <span className="text-muted-foreground opacity-50 hidden md:inline">|</span> <span className="text-danger font-bold">Brute Force (Password spraying)</span></div>
                  <div className="flex items-center gap-3"><span className="text-danger">→</span> <span className="text-foreground">T1021</span> <span className="text-muted-foreground opacity-50 hidden md:inline">|</span> <span className="text-muted-foreground">Remote Services (Interactive GUI access)</span></div>
                  <div className="flex items-center gap-3"><span className="text-danger">→</span> <span className="text-foreground">T1078</span> <span className="text-muted-foreground opacity-50 hidden md:inline">|</span> <span className="text-muted-foreground">Valid Accounts (Abuse of leaked creds)</span></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Recharts Visualization Concepts */}
      <section className="bg-background py-32 border-b border-border">
         <div className="mx-auto max-w-[1600px] px-6">
            <div className="text-center mb-20">
               <h2 className="font-display text-4xl font-bold uppercase tracking-widest text-foreground">Visualizing The Attack Surface</h2>
               <p className="font-mono text-muted-foreground mt-4 max-w-2xl mx-auto">See how the MITRE data is actively visualized inside the EME platform Dashboard.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               {/* Chart 1: Heatmap */}
               <div className="bg-card border border-border p-8 flex flex-col">
                  <div className="mb-8 flex justify-between items-start">
                     <div>
                       <h3 className="font-display text-xl font-bold text-gold uppercase mb-2">MITRE Heatmap</h3>
                       <p className="text-xs text-muted-foreground font-mono">Size = Exposure Count | Color = Attacker Interest</p>
                     </div>
                     <Activity className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="h-[300px] w-full flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <Treemap
                        data={treemapData}
                        dataKey="size"
                        aspect={4/3}
                        stroke="#000"
                        fill="#8884d8"
                      >
                        <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333', fontFamily: 'monospace', fontSize: '12px' }} />
                      </Treemap>
                    </ResponsiveContainer>
                  </div>
               </div>

               {/* Chart 2: Coverage Distribution */}
               <div className="bg-card border border-border p-8 flex flex-col">
                  <div className="mb-8 flex justify-between items-start">
                     <div>
                       <h3 className="font-display text-xl font-bold text-foreground uppercase mb-2">ATT&CK Coverage Distribution</h3>
                       <p className="text-xs text-muted-foreground font-mono">Count of potential techniques available to the attacker grouped by Parent Tactic.</p>
                     </div>
                     <BarChart className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="h-[300px] w-full flex-1 font-mono text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={coverageData} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#222" horizontal={false} />
                        <XAxis type="number" stroke="#555" tick={{ fill: '#888' }} />
                        <YAxis dataKey="name" type="category" stroke="#555" tick={{ fill: '#888' }} width={100} />
                        <Tooltip cursor={{fill: '#222'}} contentStyle={{ backgroundColor: '#000', borderColor: '#333' }} />
                        <Bar dataKey="count" fill="#ffbf00" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. Interactive Technique Explorer */}
      <section id="matrix" className="bg-[#050505] py-32 border-b border-border">
         <div className="mx-auto max-w-[1600px] px-6">
            <div className="text-center mb-16">
               <h2 className="font-display text-4xl font-bold uppercase tracking-widest text-foreground">Technique Explorer</h2>
               <p className="font-mono text-muted-foreground mt-4 max-w-2xl mx-auto">Interactive dossier mapping specific techniques to their exposure sources and defensive remediations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[600px]">
               {/* Left Pane: Filter and List */}
               <div className="lg:col-span-4 flex flex-col border border-border bg-[#0a0a0c] overflow-hidden h-full">
                  <div className="p-4 border-b border-border bg-[#111] flex items-center gap-3">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="Filter by ID, Service, or Name..." 
                      className="bg-transparent border-none outline-none font-mono text-xs w-full text-foreground placeholder:text-muted-foreground"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {filteredTechniques.map((tech) => (
                      <button
                        key={tech.id}
                        onClick={() => setActiveTechnique(tech.id)}
                        className={`
                          w-full text-left p-4 border-b border-border/50 transition-colors flex flex-col gap-1
                          ${activeTechnique === tech.id ? 'bg-gold/10 border-l-4 border-l-gold' : 'hover:bg-secondary/30 border-l-4 border-l-transparent'}
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-mono font-bold ${activeTechnique === tech.id ? 'text-gold' : 'text-foreground'}`}>{tech.id}</span>
                          <span className="text-[10px] uppercase text-muted-foreground">{tech.tactic}</span>
                        </div>
                        <div className="font-mono text-xs text-muted-foreground truncate">{tech.name}</div>
                      </button>
                    ))}
                  </div>
               </div>

               {/* Right Pane: Technique Dossier */}
               <div className="lg:col-span-8 bg-black border border-border p-8 md:p-12 flex flex-col h-full overflow-y-auto">
                  <div className="mb-10 pb-6 border-b border-border">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-gold text-black font-display font-bold text-2xl px-4 py-2">{activeTechData.id}</div>
                      <h3 className="font-display text-3xl font-bold text-foreground">{activeTechData.name}</h3>
                    </div>
                    <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      <div className="flex items-center gap-2"><Target className="w-4 h-4 text-gold" /> Tactic: {activeTechData.tactic}</div>
                      <div className="flex items-center gap-2"><Activity className="w-4 h-4 text-danger" /> Source: {activeTechData.source}</div>
                    </div>
                  </div>

                  <div className="space-y-10 flex-1">
                    <div>
                      <h4 className="flex items-center gap-2 font-display text-lg font-bold uppercase text-danger mb-4"><ShieldAlert className="w-5 h-5" /> Attack Opportunity</h4>
                      <p className="font-mono text-sm text-muted-foreground leading-relaxed bg-danger/5 border border-danger/20 p-6">
                        {activeTechData.opportunity}
                      </p>
                    </div>

                    <div>
                      <h4 className="flex items-center gap-2 font-display text-lg font-bold uppercase text-success mb-4"><ShieldCheck className="w-5 h-5" /> Remediation Strategy</h4>
                      <p className="font-mono text-sm text-muted-foreground leading-relaxed bg-success/5 border border-success/20 p-6">
                        {activeTechData.remediation}
                      </p>
                    </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. Closing CTA */}
      <section className="bg-[#030303] py-40 text-center relative overflow-hidden">
         <div className="absolute inset-0 grid-bg opacity-[0.2]"></div>
         <div className="relative z-10 mx-auto max-w-3xl px-6">
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8">
               Speak the Language <br/>of the <span className="text-gold">Adversary.</span>
            </h2>
            <p className="font-mono text-lg text-muted-foreground mb-12">
               Stop translating IP addresses into risk by hand. Upload your network telemetry and let EME instantly map your attack surface to the industry-standard MITRE ATT&CK framework.
            </p>
            <Link 
               to="/scanner" 
               className="inline-flex items-center gap-3 border border-gold bg-gold px-10 py-5 font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:glow-gold hover:translate-y-[-2px] shadow-[0_0_40px_rgba(255,191,0,0.2)]"
            >
               INGEST TELEMETRY <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="mt-8 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              No account required. Local-first analysis. Zero telemetry.
            </div>
         </div>
      </section>
      
    </div>
  );
}
