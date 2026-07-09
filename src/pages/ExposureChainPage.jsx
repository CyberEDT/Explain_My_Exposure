import React, { useEffect, useState } from 'react';
import SeoMeta from '../components/seo/SeoMeta';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Eye, Database, Unlock, Crosshair, Map, AlertTriangle, ArrowRight, Activity, Terminal, Cross, CheckCircle2 } from 'lucide-react';

export default function ExposureChainPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeStage, setActiveStage] = useState('DISCOVER');

  const stages = [
    { id: 'DISCOVER', name: 'DISCOVER', question: 'What is visible?', icon: Eye, color: 'text-gold' },
    { id: 'ENUMERATE', name: 'ENUMERATE', question: 'What can I learn?', icon: Database, color: 'text-gold' },
    { id: 'ACCESS', name: 'ACCESS', question: 'What can I reach?', icon: Unlock, color: 'text-gold' },
    { id: 'ABUSE', name: 'ABUSE', question: 'What can I misuse?', icon: Crosshair, color: 'text-danger' },
    { id: 'MOVE', name: 'MOVE', question: 'Where can I go next?', icon: Map, color: 'text-gold' },
    { id: 'IMPACT', name: 'IMPACT', question: 'What could happen?', icon: AlertTriangle, color: 'text-danger' },
  ];

  return (
    <main className="relative min-h-screen bg-[#030303] text-[#fafafa] font-mono selection:bg-gold selection:text-black">
      <SeoMeta title="Exposure Chain" />
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden border-b border-border min-h-[90vh] flex flex-col justify-center">
        <div className="absolute inset-0 grid-bg opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/80 to-[#030303]"></div>
        
        <div className="relative mx-auto max-w-[1600px] px-6 text-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 border border-gold/30 bg-gold/5 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-gold mb-12"
          >
            <span className="h-1.5 w-1.5 bg-gold rounded-full animate-pulse-dot"></span> // PROPRIETARY METHODOLOGY
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase mb-8 leading-[0.9]"
          >
            The EME Exposure <br/> <span className="text-gold">Chain™</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground font-mono leading-relaxed mb-16"
          >
            The definitive framework for understanding how attackers view your exposed systems. Stop counting assets and start measuring opportunity.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="#framework" className="inline-flex items-center gap-3 border border-gold bg-gold px-8 py-4 font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:glow-gold hover:translate-y-[-2px]">
              EXPLORE THE FRAMEWORK <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Descending Line */}
        <motion.div 
          initial={{ height: 0 }}
          animate={{ height: "100px" }}
          transition={{ duration: 1.5, delay: 1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent to-gold"
        />
      </section>

      {/* 2. Why Traditional Security Tools Fall Short */}
      <section className="border-b border-border bg-[#09090b]">
        <div className="mx-auto max-w-[1600px] px-6 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <div className="text-danger font-mono text-[10px] tracking-widest uppercase mb-4">// THE FLAW IN THE SYSTEM</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 uppercase">Data is not <span className="text-danger">Intelligence.</span></h2>
              <p className="font-mono text-sm leading-relaxed text-muted-foreground mb-6">
                Traditional vulnerability scanners and ASM tools stop at discovery. They hand you a massive spreadsheet of open ports, outdated software, and uncontextualized CVEs. 
              </p>
              <p className="font-mono text-sm leading-relaxed text-muted-foreground">
                They tell you <span className="text-foreground">what</span> is exposed, but they fail to tell you <span className="text-gold font-bold">why it matters</span>. To an attacker, a list of open ports is meaningless without the context of how those ports can be chained together to achieve an objective.
              </p>
            </div>

            <div className="flex flex-col gap-6 font-mono text-xs">
              {/* The Old Way */}
              <div className="border border-border bg-black p-6 opacity-60 grayscale">
                <div className="text-[10px] text-muted-foreground tracking-widest mb-4">THE OLD WAY: ASSET INVENTORY</div>
                <div className="flex items-center gap-4 border-b border-border/50 pb-3 mb-3 text-muted-foreground">
                  <Terminal className="w-4 h-4" />
                  <span>Port 445 Open | Protocol: SMB</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <Terminal className="w-4 h-4" />
                  <span>Port 3389 Open | Protocol: RDP</span>
                </div>
              </div>

              {/* The EME Way */}
              <div className="border border-gold bg-gold/5 p-6 shadow-[0_0_30px_rgba(255,191,0,0.1)] relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold"></div>
                <div className="text-[10px] text-gold tracking-widest mb-4 font-bold">THE EME WAY: EXPOSURE INTELLIGENCE</div>
                <div className="space-y-3">
                  <div className="flex items-start gap-4">
                    <span className="text-gold mt-1">→</span>
                    <span className="leading-relaxed">SMB Exposed <span className="text-muted-foreground">(Allows unauthenticated enumeration)</span></span>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-gold mt-1">→</span>
                    <span className="leading-relaxed">Combined with RDP <span className="text-muted-foreground">(Enables credential spray & lateral movement)</span></span>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-danger mt-1">→</span>
                    <span className="leading-relaxed text-foreground font-bold">CRITICAL: Direct pathway to Domain Controller compromise.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2.5 The Actor Landscape (Phase 3 Polish) */}
      <section className="border-b border-border bg-[#030303] py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="mx-auto max-w-[1600px] px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 border border-danger/30 bg-danger/5 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-danger mb-6">
              <span className="h-1.5 w-1.5 bg-danger rounded-full animate-pulse-dot"></span> // ADVERSARIAL MAPPING
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold uppercase tracking-tighter">The <span className="text-danger">Actor</span> Landscape</h2>
            <p className="mt-6 text-muted-foreground font-mono max-w-2xl mx-auto">
              A vulnerability without a threat actor is just a bug. EME actively profiles your exposure chain against the TTPs of known Advanced Persistent Threats (APTs) and Ransomware Syndicates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Actor Card 1 */}
            <div className="border border-border bg-black/50 p-8 hover:border-danger/50 transition-colors group">
              <div className="flex justify-between items-start mb-12">
                <Shield className="w-8 h-8 text-danger group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono tracking-widest text-muted-foreground border border-border px-2 py-1">RANSOMWARE</span>
              </div>
              <h3 className="font-display text-2xl font-bold uppercase mb-2">LockBit / Conti</h3>
              <p className="text-sm font-mono text-muted-foreground mb-6">Exploiting RDP (3389) and SMB (445) for initial access and lateral movement.</p>
              <div className="flex gap-2">
                <span className="text-[10px] bg-danger/10 text-danger border border-danger/20 px-2 py-1 uppercase tracking-wider">T1133</span>
                <span className="text-[10px] bg-danger/10 text-danger border border-danger/20 px-2 py-1 uppercase tracking-wider">T1021.001</span>
              </div>
            </div>

            {/* Actor Card 2 */}
            <div className="border border-border bg-black/50 p-8 hover:border-gold/50 transition-colors group">
              <div className="flex justify-between items-start mb-12">
                <Activity className="w-8 h-8 text-gold group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono tracking-widest text-muted-foreground border border-border px-2 py-1">STATE SPONSORED</span>
              </div>
              <h3 className="font-display text-2xl font-bold uppercase mb-2">Sandworm</h3>
              <p className="text-sm font-mono text-muted-foreground mb-6">Targeting SCADA/Modbus (502) to disrupt critical infrastructure and industrial controls.</p>
              <div className="flex gap-2">
                <span className="text-[10px] bg-gold/10 text-gold border border-gold/20 px-2 py-1 uppercase tracking-wider">T1190</span>
                <span className="text-[10px] bg-gold/10 text-gold border border-gold/20 px-2 py-1 uppercase tracking-wider">T1495</span>
              </div>
            </div>

            {/* Actor Card 3 */}
            <div className="border border-border bg-black/50 p-8 hover:border-[#00d0ff]/50 transition-colors group">
              <div className="flex justify-between items-start mb-12">
                <Database className="w-8 h-8 text-[#00d0ff] group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-mono tracking-widest text-muted-foreground border border-border px-2 py-1">DATA BROKERS</span>
              </div>
              <h3 className="font-display text-2xl font-bold uppercase mb-2">Lapsus$</h3>
              <p className="text-sm font-mono text-muted-foreground mb-6">Hunting exposed Databases (1433, 3306) and dropping unauthenticated tables for extortion.</p>
              <div className="flex gap-2">
                <span className="text-[10px] bg-[#00d0ff]/10 text-[#00d0ff] border border-[#00d0ff]/20 px-2 py-1 uppercase tracking-wider">T1082</span>
                <span className="text-[10px] bg-[#00d0ff]/10 text-[#00d0ff] border border-[#00d0ff]/20 px-2 py-1 uppercase tracking-wider">T1565</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why We Created the Exposure Chain */}
      <section className="bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="mx-auto max-w-[1200px] px-6 py-40 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-12 uppercase">Shifting the <span className="text-gold">Perspective.</span></h2>
          <p className="font-mono text-lg md:text-xl leading-relaxed text-muted-foreground max-w-4xl mx-auto mb-16">
            Most cybersecurity frameworks—like the Cyber Kill Chain or MITRE ATT&CK—are reactive. They map what happens <span className="italic text-foreground">after</span> an adversary has already decided to target you and initiated an attack. 
          </p>
          <div className="border-l-4 border-gold bg-secondary/30 p-8 md:p-12 text-left md:text-center shadow-2xl">
            <h3 className="font-display text-2xl font-bold text-foreground mb-4 uppercase tracking-widest">The Core Thesis</h3>
            <p className="font-mono text-lg text-gold">
              "Defenders inventory assets. Attackers inventory opportunities."
            </p>
          </div>
          <p className="font-mono text-base leading-relaxed text-muted-foreground max-w-3xl mx-auto mt-16">
            We built the Exposure Chain to map the precursor to an attack. By understanding how an adversary perceives the value of an exposed asset during reconnaissance, defenders can prioritize remediation based on actual threat leverage, not CVSS scores.
          </p>
        </div>
      </section>

      {/* 4. Interactive Exposure Chain Visualization */}
      <section id="framework" className="border-y border-border bg-[#050505] py-24">
        <div className="mx-auto max-w-[1600px] px-6">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl font-bold uppercase tracking-widest text-foreground">The 6 Stages of Exposure</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 border border-border">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const isActive = activeStage === stage.id;
              
              return (
                <div 
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`
                    cursor-pointer p-6 border-b md:border-b-0 md:border-r border-border transition-all duration-300
                    ${isActive ? 'bg-[#111] shadow-[inset_0_-2px_0_0_#ffbf00]' : 'bg-transparent hover:bg-secondary/40'}
                    ${index === stages.length - 1 ? 'md:border-r-0' : ''}
                  `}
                >
                  <div className={`font-mono text-[10px] mb-4 ${isActive ? 'text-gold' : 'text-muted-foreground'}`}>0{index + 1}</div>
                  <Icon className={`w-6 h-6 mb-4 ${isActive ? stage.color : 'text-muted-foreground opacity-50'}`} />
                  <div className={`font-display text-lg font-bold mb-2 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{stage.name}</div>
                  <div className={`font-mono text-[10px] ${isActive ? 'text-gold' : 'text-muted-foreground opacity-0'}`}>{stage.question}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-[#0a0a0c] border border-border p-10 min-h-[300px]">
             {activeStage === 'DISCOVER' && (
               <motion.div initial={{opacity:0}} animate={{opacity:1}} className="grid md:grid-cols-2 gap-12">
                 <div>
                   <h3 className="font-display text-3xl font-bold text-foreground mb-4">DISCOVER</h3>
                   <div className="text-gold font-mono text-sm mb-6">Question: What is visible?</div>
                   <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-6">
                     The initial identification of an exposed asset, port, or service on the perimeter. This is the absolute starting point of the attack surface.
                   </p>
                 </div>
                 <div className="bg-black border border-border p-6 font-mono text-xs">
                   <div className="text-muted-foreground mb-2">// INPUTS: IP addresses, domains, open ports</div>
                   <div className="text-muted-foreground mb-4">// OUTPUTS: Perimeter map</div>
                   <div className="text-gold border-t border-border/50 pt-4 mt-4">EXAMPLE: Identifying Port 3389 (RDP) exposed to the public internet.</div>
                 </div>
               </motion.div>
             )}
             {activeStage === 'ENUMERATE' && (
               <motion.div initial={{opacity:0}} animate={{opacity:1}} className="grid md:grid-cols-2 gap-12">
                 <div>
                   <h3 className="font-display text-3xl font-bold text-foreground mb-4">ENUMERATE</h3>
                   <div className="text-gold font-mono text-sm mb-6">Question: What can I learn?</div>
                   <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-6">
                     Interrogating the discovered asset to extract metadata, versions, and configurations without authenticating. Attackers are building a profile of the target.
                   </p>
                 </div>
                 <div className="bg-black border border-border p-6 font-mono text-xs">
                   <div className="text-muted-foreground mb-2">// INPUTS: Service banners, TLS certs, HTTP headers</div>
                   <div className="text-muted-foreground mb-4">// OUTPUTS: OS type, software versions, hostnames</div>
                   <div className="text-gold border-t border-border/50 pt-4 mt-4">EXAMPLE: Determining the exposed RDP server is running Windows Server 2012 R2.</div>
                 </div>
               </motion.div>
             )}
             {activeStage === 'ACCESS' && (
               <motion.div initial={{opacity:0}} animate={{opacity:1}} className="grid md:grid-cols-2 gap-12">
                 <div>
                   <h3 className="font-display text-3xl font-bold text-foreground mb-4">ACCESS</h3>
                   <div className="text-gold font-mono text-sm mb-6">Question: What can I reach?</div>
                   <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-6">
                     Identifying the authentication mechanisms and surfaces available for interaction. This establishes whether the front door is locked, unlocked, or unguarded.
                   </p>
                 </div>
                 <div className="bg-black border border-border p-6 font-mono text-xs">
                   <div className="text-muted-foreground mb-2">// INPUTS: Login portals, API endpoints, SMB shares</div>
                   <div className="text-muted-foreground mb-4">// OUTPUTS: Auth protocols (NTLM, Basic Auth, etc.)</div>
                   <div className="text-gold border-t border-border/50 pt-4 mt-4">EXAMPLE: Confirming RDP accepts NLA but allows unlimited connection attempts.</div>
                 </div>
               </motion.div>
             )}
             {activeStage === 'ABUSE' && (
               <motion.div initial={{opacity:0}} animate={{opacity:1}} className="grid md:grid-cols-2 gap-12">
                 <div>
                   <h3 className="font-display text-3xl font-bold text-danger mb-4">ABUSE</h3>
                   <div className="text-danger font-mono text-sm mb-6">Question: What can I misuse?</div>
                   <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-6">
                     Determining if the access surface can be bypassed, brute-forced, or exploited based on the enumerated data. This is where opportunity becomes a viable threat.
                   </p>
                 </div>
                 <div className="bg-black border border-danger/30 p-6 font-mono text-xs">
                   <div className="text-muted-foreground mb-2">// INPUTS: Known CVEs, weak configs, lack of MFA</div>
                   <div className="text-danger mb-4">// OUTPUTS: Viable vector for initial compromise</div>
                   <div className="text-danger border-t border-danger/30 pt-4 mt-4 font-bold">EXAMPLE: Recognizing the RDP service is vulnerable to credential stuffing.</div>
                 </div>
               </motion.div>
             )}
             {activeStage === 'MOVE' && (
               <motion.div initial={{opacity:0}} animate={{opacity:1}} className="grid md:grid-cols-2 gap-12">
                 <div>
                   <h3 className="font-display text-3xl font-bold text-foreground mb-4">MOVE</h3>
                   <div className="text-gold font-mono text-sm mb-6">Question: Where can I go next?</div>
                   <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-6">
                     Assessing the asset's placement within the network topology and its potential as a pivot point. A compromised host is rarely the final objective.
                   </p>
                 </div>
                 <div className="bg-black border border-border p-6 font-mono text-xs">
                   <div className="text-muted-foreground mb-2">// INPUTS: Network role, subnet arch, AD membership</div>
                   <div className="text-muted-foreground mb-4">// OUTPUTS: Identified lateral movement pathways</div>
                   <div className="text-gold border-t border-border/50 pt-4 mt-4">EXAMPLE: Noting the host sits in a DMZ with routing access to internal AD controllers.</div>
                 </div>
               </motion.div>
             )}
             {activeStage === 'IMPACT' && (
               <motion.div initial={{opacity:0}} animate={{opacity:1}} className="grid md:grid-cols-2 gap-12">
                 <div>
                   <h3 className="font-display text-3xl font-bold text-danger mb-4">IMPACT</h3>
                   <div className="text-danger font-mono text-sm mb-6">Question: What could happen?</div>
                   <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-6">
                     The ultimate consequence to the business if the abuse and movement stages are successfully executed. This defines the true severity of the exposure.
                   </p>
                 </div>
                 <div className="bg-black border border-danger/30 p-6 font-mono text-xs">
                   <div className="text-muted-foreground mb-2">// INPUTS: Asset criticality, data classification</div>
                   <div className="text-danger mb-4">// OUTPUTS: Prioritized risk narrative</div>
                   <div className="text-danger border-t border-danger/30 pt-4 mt-4 font-bold">EXAMPLE: Complete domain compromise leading to ransomware deployment.</div>
                 </div>
               </motion.div>
             )}
          </div>
        </div>
      </section>

      {/* 5. Deep Dive & 6. Real World Example */}
      <section className="bg-background border-b border-border py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          
          <div className="text-center mb-24">
            <div className="inline-block bg-danger/10 border border-danger/20 text-danger px-4 py-2 font-mono text-[10px] tracking-widest uppercase mb-6">
              Case Study Simulation
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase">The SMB Exposure Scenario</h2>
            <p className="font-mono text-muted-foreground mt-4">Watch how the Exposure Chain breaks down a single open port into a critical domain risk.</p>
          </div>

          <div className="relative">
            {/* Connecting vertical line */}
            <div className="absolute left-[27px] top-10 bottom-10 w-[2px] bg-border z-0 hidden md:block"></div>
            
            <div className="space-y-16">
              {/* Step 1 */}
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-14 h-14 rounded bg-black border border-gold flex items-center justify-center font-display font-bold text-xl text-gold shrink-0">01</div>
                <div className="bg-card border border-border p-8 flex-1 shadow-lg">
                  <h4 className="font-display text-xl font-bold text-foreground mb-2">DISCOVER <span className="text-gold mx-2">→</span> Port 445 Visible</h4>
                  <p className="font-mono text-sm text-muted-foreground">The perimeter scan detects an open port exposed to the public internet.</p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-14 h-14 rounded bg-black border border-gold flex items-center justify-center font-display font-bold text-xl text-gold shrink-0">02</div>
                <div className="bg-card border border-border p-8 flex-1 shadow-lg">
                  <h4 className="font-display text-xl font-bold text-foreground mb-2">ENUMERATE <span className="text-gold mx-2">→</span> Host is DC-01</h4>
                  <p className="font-mono text-sm text-muted-foreground">A null session reveals the hostname, confirming it is a Windows machine and likely a core infrastructure server.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-14 h-14 rounded bg-black border border-gold flex items-center justify-center font-display font-bold text-xl text-gold shrink-0">03</div>
                <div className="bg-card border border-border p-8 flex-1 shadow-lg">
                  <h4 className="font-display text-xl font-bold text-foreground mb-2">ACCESS <span className="text-gold mx-2">→</span> SMB Auth Reachable</h4>
                  <p className="font-mono text-sm text-muted-foreground">The SMB authentication surface is reachable from the internet, accepting NTLM handshakes.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-14 h-14 rounded bg-black border border-danger flex items-center justify-center font-display font-bold text-xl text-danger shrink-0">04</div>
                <div className="bg-black border border-danger/40 p-8 flex-1 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                  <h4 className="font-display text-xl font-bold text-danger mb-2">ABUSE <span className="text-danger mx-2">→</span> NTLM Relay Viable</h4>
                  <p className="font-mono text-sm text-muted-foreground">SMB signing is disabled. The host is vulnerable to NTLM relay attacks, allowing attackers to hijack sessions.</p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-14 h-14 rounded bg-black border border-gold flex items-center justify-center font-display font-bold text-xl text-gold shrink-0">05</div>
                <div className="bg-card border border-border p-8 flex-1 shadow-lg">
                  <h4 className="font-display text-xl font-bold text-foreground mb-2">MOVE <span className="text-gold mx-2">→</span> Domain Controller Pivot</h4>
                  <p className="font-mono text-sm text-muted-foreground">The host is a Domain Controller. Compromising this host provides instant administrative routing to the entire Windows estate.</p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-14 h-14 rounded bg-black border border-danger flex items-center justify-center font-display font-bold text-xl text-danger shrink-0">06</div>
                <div className="bg-[#1a0505] border border-danger p-8 flex-1 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                  <h4 className="font-display text-xl font-bold text-danger mb-2">IMPACT <span className="text-danger mx-2">→</span> Enterprise Takeover</h4>
                  <p className="font-mono text-sm text-danger/80 font-bold">Complete loss of directory integrity. The adversary now owns the network.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Comparison Section */}
      <section className="bg-[#050505] border-b border-border py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold uppercase tracking-widest text-foreground">Framework Comparison</h2>
            <p className="font-mono text-muted-foreground mt-4 max-w-2xl mx-auto">See where the EME Exposure Chain fits into the broader cybersecurity intelligence landscape.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-6 px-4 text-muted-foreground font-normal">Feature / Framework</th>
                  <th className="py-6 px-4 text-gold font-bold bg-gold/5 border-t border-l border-r border-gold/30">EME Exposure Chain™</th>
                  <th className="py-6 px-4 text-foreground font-bold">Cyber Kill Chain</th>
                  <th className="py-6 px-4 text-foreground font-bold">MITRE ATT&CK</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr className="hover:bg-secondary/20 transition-colors">
                  <td className="py-6 px-4 text-muted-foreground">Primary Purpose</td>
                  <td className="py-6 px-4 text-foreground font-bold bg-gold/5 border-l border-r border-gold/30">Proactive Exposure Intelligence</td>
                  <td className="py-6 px-4 text-muted-foreground">Reactive Incident Response</td>
                  <td className="py-6 px-4 text-muted-foreground">Threat Actor Behavior Mapping</td>
                </tr>
                <tr className="hover:bg-secondary/20 transition-colors">
                  <td className="py-6 px-4 text-muted-foreground">Starting Point</td>
                  <td className="py-6 px-4 text-foreground font-bold bg-gold/5 border-l border-r border-gold/30">Before the attack (Recon)</td>
                  <td className="py-6 px-4 text-muted-foreground">During the attack (Weaponization)</td>
                  <td className="py-6 px-4 text-muted-foreground">During/After the attack (Initial Access)</td>
                </tr>
                <tr className="hover:bg-secondary/20 transition-colors">
                  <td className="py-6 px-4 text-muted-foreground">Core Perspective</td>
                  <td className="py-6 px-4 text-foreground font-bold bg-gold/5 border-l border-r border-gold/30">Attacker Opportunity</td>
                  <td className="py-6 px-4 text-muted-foreground">Defender Containment</td>
                  <td className="py-6 px-4 text-muted-foreground">Attacker Methodology</td>
                </tr>
                <tr className="border-b border-border hover:bg-secondary/20 transition-colors">
                  <td className="py-6 px-4 text-muted-foreground">Primary Use Case</td>
                  <td className="py-6 px-4 text-foreground font-bold bg-gold/5 border-b border-l border-r border-gold/30">Attack Surface Prioritization</td>
                  <td className="py-6 px-4 text-muted-foreground">Alert Triage & SOC Ops</td>
                  <td className="py-6 px-4 text-muted-foreground">Threat Hunting & Emulation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 9. Methodology Section */}
      <section className="bg-background py-32 border-b border-border">
        <div className="mx-auto max-w-[1600px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-8">How Data Becomes <span className="text-gold">Intelligence</span></h2>
              <p className="font-mono text-muted-foreground leading-relaxed mb-6">
                The EME engine ingests raw telemetry—like Nmap XML outputs—and passes it through our proprietary correlation matrix.
              </p>
              <p className="font-mono text-muted-foreground leading-relaxed mb-8">
                We don't just look at open ports in a vacuum. We analyze <span className="text-foreground font-bold">combinations</span> of ports, inferred roles (e.g., Domain Controller vs. Web Server), and historical attacker behavior. By mapping these data points against the Exposure Chain, EME generates a deterministic, attacker-perspective narrative that tells defenders exactly what to fix first, and why.
              </p>
              
              <div className="flex items-center gap-4 border border-border p-4 bg-card w-max">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="font-mono text-xs uppercase tracking-widest text-foreground">Deterministic Correlation Engine Active</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 font-mono text-xs">
              <div className="bg-black border border-border p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-gold transition-colors">
                <Activity className="w-8 h-8 text-gold" />
                <span className="text-muted-foreground uppercase tracking-widest">Exposure Radar</span>
              </div>
              <div className="bg-black border border-border p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-gold transition-colors">
                <Shield className="w-8 h-8 text-gold" />
                <span className="text-muted-foreground uppercase tracking-widest">Interest Ranking</span>
              </div>
              <div className="bg-black border border-border p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-gold transition-colors">
                <Map className="w-8 h-8 text-gold" />
                <span className="text-muted-foreground uppercase tracking-widest">Lateral Pivot Graph</span>
              </div>
              <div className="bg-black border border-border p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-gold transition-colors">
                <Terminal className="w-8 h-8 text-gold" />
                <span className="text-muted-foreground uppercase tracking-widest">Chain Progression</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Closing CTA */}
      <section className="bg-[#030303] py-40 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.2]"></div>
        <div className="relative mx-auto max-w-[800px] px-6 text-center z-10">
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase mb-8">Stop guessing. <br/><span className="text-gold">Start seeing.</span></h2>
          <p className="font-mono text-lg text-muted-foreground mb-12">
            The Exposure Chain™ is a fundamental shift in how we understand attack surface intelligence. Stop drowning in CVSS scores and start patching the pathways that actually matter to adversaries.
          </p>
          <Link 
            to="/scanner" 
            className="inline-flex items-center gap-3 border border-gold bg-gold px-10 py-5 font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:glow-gold hover:translate-y-[-2px] text-lg shadow-[0_0_40px_rgba(255,191,0,0.3)]"
          >
            INITIALIZE SCAN <ArrowRight className="w-5 h-5" />
          </Link>
          <div className="mt-8 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            No account required. Local-first analysis. Zero telemetry.
          </div>
        </div>
      </section>

    </main>
  );
}
