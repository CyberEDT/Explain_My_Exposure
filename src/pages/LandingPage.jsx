import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SeoMeta from '../components/seo/SeoMeta';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-[#030303] text-[#fafafa] font-mono">
      <SeoMeta 
        title="Explain My Exposure" 
        description="Explain My Exposure (EME) by CyberEDT translates raw Nmap output into a threat-actor's reconnaissance brief. Exposure risk scoring and MITRE ATT&CK alignment." 
      />
      {/* Hero Section */}
      <section id="top" className="relative overflow-hidden border-b border-border">
        {/* Decorative Grid BG */}
        <div className="absolute inset-0 grid-bg opacity-[0.25] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"></div>
        
        <div className="relative mx-auto max-w-[1600px] px-6 pb-20 pt-16">
          <div className="mb-10 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <span>// attacker-perspective exposure assessment</span>
            <div className="hidden gap-6 md:flex">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot"></span> STATUS: OPERATIONAL
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-dot"></span> HOSTS_INDEXED: 1,204
              </span>
              <span>V.1.0.0</span>
            </div>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-[10vw] leading-[0.85] font-bold tracking-tighter md:text-[8rem]"
          >
            <span className="block text-foreground">VISUALIZING</span>
            <span className="block text-foreground">THE EXPOSURE</span>
            <span className="block text-gold">CHAIN</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-10 grid gap-10 md:grid-cols-3"
          >
            <p className="text-sm leading-relaxed text-muted-foreground md:col-span-2 md:max-w-2xl font-mono">
              EME turns raw Nmap output into a threat-actor's reconnaissance brief. Upload XML or console logs and receive Exposure risk scoring, host-role classification, MITRE ATT&CK alignment, and step-by-step lateral movement simulations — rendered locally in your browser. Sensitive topology never leaves the workstation.
            </p>
            <div className="flex flex-col items-start gap-3 text-[11px]">
              <Link
                to="/scanner"
                aria-label="Initialize Scan - Open Dashboard"
                className="group inline-flex items-center gap-3 border border-gold bg-gold px-5 py-3 font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:glow-gold"
              >
                <span>INITIALIZE_SCAN</span>
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
              <span className="inline-flex items-center gap-2 border border-border px-5 py-3 uppercase tracking-[0.2em] text-muted-foreground bg-card">
                <span>local-first · zero telemetry</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Engine Workflow */}
      <section id="engine" className="border-t border-border bg-background">
        <div className="mx-auto max-w-[1600px] px-6 py-24">
          <div className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
            <span className="h-1.5 w-1.5 bg-gold rounded-full"></span> // EXPOSURE_CHAIN PIPELINE
          </div>
          <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl text-foreground uppercase">
            DISCOVER → IMPACT
          </h2>
          <p className="mt-6 max-w-3xl font-mono text-sm leading-relaxed text-muted-foreground">
            Each scan flows through six deterministic stages of the Exposure Chain. No black boxes — every stage maps attacker perspective to actionable intelligence.
          </p>
          
          <div className="mt-16 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
            <div className="flex items-center gap-2 text-danger">
              <span className="h-1.5 w-1.5 bg-danger rounded-full animate-pulse-dot"></span> EME Exposure Chain™
            </div>
            <div>SCENARIO: HOST_$172.18.4.12</div>
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-l border-t border-border"
          >
            {/* Box 01 */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="relative border-r border-b border-border p-5 bg-card hover:bg-secondary/40 transition-colors">
              <motion.div variants={{ hidden: { width: "0%" }, visible: { width: "100%", transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" } } }} className="absolute top-[-1px] left-0 h-[2px] bg-gold z-10" />
              <div className="text-gold font-mono text-[10px] mb-4 pb-2">01</div>
              <div className="font-display text-lg font-bold text-foreground mb-4">DISCOVER</div>
              <div className="font-mono text-[10px] space-y-2 text-muted-foreground">
                <div className="text-gold">VISIBLE_ASSETS</div>
                <div>Ports: 445</div>
                <div>Domains: 1</div>
              </div>
            </motion.div>
            {/* Box 02 */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="relative border-r border-b border-border p-5 bg-card hover:bg-secondary/40 transition-colors">
              <motion.div variants={{ hidden: { width: "0%" }, visible: { width: "100%", transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" } } }} className="absolute top-[-1px] left-0 h-[2px] bg-gold z-10" />
              <div className="text-gold font-mono text-[10px] mb-4 pb-2">02</div>
              <div className="font-display text-lg font-bold text-foreground mb-4">ENUMERATE</div>
              <div className="font-mono text-[10px] space-y-2 text-muted-foreground">
                <div className="text-foreground">CONTEXT_GATHERED</div>
                <div>OS: Windows Server</div>
                <div>Service: SMBv2</div>
              </div>
            </motion.div>
            {/* Box 03 */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="relative border-r border-b border-border p-5 bg-card hover:bg-secondary/40 transition-colors">
              <motion.div variants={{ hidden: { width: "0%" }, visible: { width: "100%", transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" } } }} className="absolute top-[-1px] left-0 h-[2px] bg-gold z-10" />
              <div className="text-gold font-mono text-[10px] mb-4 pb-2">03</div>
              <div className="font-display text-lg font-bold text-foreground mb-4">ACCESS</div>
              <div className="font-mono text-[10px] space-y-2 text-muted-foreground">
                <div className="text-gold">AUTH_SURFACE</div>
                <div>Reachability: OK</div>
                <div>Prompt: Active</div>
              </div>
            </motion.div>
            {/* Box 04 - Highlighted */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="relative border-r border-b border-l border-l-danger border-border p-5 bg-card shadow-[0_0_15px_rgba(239,68,68,0.15)] overflow-visible">
              <motion.div variants={{ hidden: { width: "0%" }, visible: { width: "100%", transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" } } }} className="absolute top-[-1px] left-[-1px] h-[2px] bg-danger z-10" />
              <div className="absolute inset-0 border border-danger pointer-events-none z-0"></div>
              <div className="text-danger font-mono text-[10px] mb-4 pb-2 relative z-10">04</div>
              <div className="font-display text-lg font-bold text-foreground mb-4 relative z-10">ABUSE</div>
              <div className="font-mono text-[10px] space-y-2 text-muted-foreground relative z-10">
                <div className="text-danger">VALUE: HIGH</div>
                <div>Anonymous Read</div>
                <div className="inline-block border border-danger text-danger px-2 py-0.5 mt-2">VULNERABLE</div>
              </div>
            </motion.div>
            {/* Box 05 */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="relative border-r border-b border-border p-5 bg-card hover:bg-secondary/40 transition-colors">
              <motion.div variants={{ hidden: { width: "0%" }, visible: { width: "100%", transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" } } }} className="absolute top-[-1px] left-0 h-[2px] bg-gold z-10" />
              <div className="text-gold font-mono text-[10px] mb-4 pb-2">05</div>
              <div className="font-display text-lg font-bold text-foreground mb-4">MOVE</div>
              <div className="font-mono text-[10px] space-y-2 text-muted-foreground">
                <div className="text-gold">LATERAL_PATHS</div>
                <div>Pivots: AD Trusts</div>
                <div>Blast Radius: High</div>
              </div>
            </motion.div>
            {/* Box 06 */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="relative border-r border-b border-border p-5 bg-card hover:bg-secondary/40 transition-colors">
              <motion.div variants={{ hidden: { width: "0%" }, visible: { width: "100%", transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" } } }} className="absolute top-[-1px] left-0 h-[2px] bg-gold z-10" />
              <div className="text-muted-foreground font-mono text-[10px] mb-4 pb-2">06</div>
              <div className="font-display text-lg font-bold text-foreground mb-4">IMPACT</div>
              <div className="font-mono text-[10px] space-y-2 text-muted-foreground">
                <div className="text-gold">OUTCOME</div>
                <div>Compromise: Domain</div>
                <div>Risk: Critical</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tactics Grid & Problem */}
      <section id="tactics" className="border-t border-border bg-[#030303]">
        <div className="mx-auto max-w-[1600px] px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            
            <div className="lg:col-span-2">
              <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl text-foreground uppercase">
                TACTICS GRID
              </h2>
              <p className="mt-6 mb-16 font-mono text-sm leading-relaxed text-muted-foreground">
                MITRE ATT&CK alignment — open ports translated to active techniques.
              </p>
              
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-l border-t border-border"
              >
                {/* Reconnaissance */}
                <div className="border-r border-b border-border p-6 bg-card">
                  <div className="text-gold font-mono text-[10px] mb-2 uppercase">TA0043</div>
                  <div className="font-display text-lg font-bold text-foreground mb-6 uppercase tracking-wide">Reconnaissance</div>
                  <ul className="font-mono text-[11px] text-muted-foreground space-y-3">
                    <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span> Active Scanning</li>
                    <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span> Gather Victim Host Info</li>
                    <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span> Search Open Tech Databases</li>
                  </ul>
                </div>
                {/* Initial Access */}
                <div className="border-r border-b border-border p-6 bg-card">
                  <div className="text-gold font-mono text-[10px] mb-2 uppercase">TA0001</div>
                  <div className="font-display text-lg font-bold text-foreground mb-6 uppercase tracking-wide">Initial Access</div>
                  <ul className="font-mono text-[11px] text-muted-foreground space-y-3">
                    <li className="flex items-start gap-2"><span className="text-muted-foreground mt-1">•</span> Exploit Public-Facing App</li>
                    <li className="flex items-start gap-2"><span className="text-muted-foreground mt-1">•</span> External Remote Services</li>
                    <li className="flex items-start gap-2"><span className="text-muted-foreground mt-1">•</span> Valid Accounts Harvesting</li>
                  </ul>
                </div>
                {/* Lateral Movement */}
                <div className="border-r border-b border-border p-6 bg-card">
                  <div className="text-gold font-mono text-[10px] mb-2 uppercase">TA0008</div>
                  <div className="font-display text-lg font-bold text-foreground mb-6 uppercase tracking-wide">Lateral Movement</div>
                  <ul className="font-mono text-[11px] text-muted-foreground space-y-3">
                    <li className="flex items-start gap-2"><span className="text-muted-foreground mt-1">•</span> T1021 Remote Services</li>
                    <li className="flex items-start gap-2"><span className="text-muted-foreground mt-1">•</span> SMB / Windows Admin Shares</li>
                    <li className="flex items-start gap-2"><span className="text-muted-foreground mt-1">•</span> RDP Session Hijacking</li>
                  </ul>
                </div>
                {/* Credential Access */}
                <div className="border-r border-b border-border p-6 bg-card">
                  <div className="text-gold font-mono text-[10px] mb-2 uppercase">TA0006</div>
                  <div className="font-display text-lg font-bold text-foreground mb-6 uppercase tracking-wide">Credential Access</div>
                  <ul className="font-mono text-[11px] text-muted-foreground space-y-3">
                    <li className="flex items-start gap-2"><span className="text-muted-foreground mt-1">•</span> T1110 Brute Force</li>
                    <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span> T1558 Kerberoasting</li>
                    <li className="flex items-start gap-2"><span className="text-muted-foreground mt-1">•</span> AS-REP Roasting</li>
                  </ul>
                </div>
                {/* Discovery */}
                <div className="border-r border-b border-border p-6 bg-card">
                  <div className="text-gold font-mono text-[10px] mb-2 uppercase">TA0007</div>
                  <div className="font-display text-lg font-bold text-foreground mb-6 uppercase tracking-wide">Discovery</div>
                  <ul className="font-mono text-[11px] text-muted-foreground space-y-3">
                    <li className="flex items-start gap-2"><span className="text-muted-foreground mt-1">•</span> Network Service Scanning</li>
                    <li className="flex items-start gap-2"><span className="text-muted-foreground mt-1">•</span> Domain Trust Discovery</li>
                    <li className="flex items-start gap-2"><span className="text-muted-foreground mt-1">•</span> Account Discovery</li>
                  </ul>
                </div>
                {/* Exfiltration */}
                <div className="border-r border-b border-border p-6 bg-card">
                  <div className="text-gold font-mono text-[10px] mb-2 uppercase">TA0010</div>
                  <div className="font-display text-lg font-bold text-foreground mb-6 uppercase tracking-wide">Exfiltration</div>
                  <ul className="font-mono text-[11px] text-muted-foreground space-y-3">
                    <li className="flex items-start gap-2"><span className="text-muted-foreground mt-1">•</span> Exfil over C2 Channel</li>
                    <li className="flex items-start gap-2"><span className="text-gold mt-1">•</span> Transfer to Cloud Storage</li>
                    <li className="flex items-start gap-2"><span className="text-muted-foreground mt-1">•</span> Data Encrypted for Impact</li>
                  </ul>
                </div>
              </motion.div>
              <div className="mt-8">
                <button 
                  aria-label="Download Tactics Matrix CSV"
                  className="inline-flex items-center border border-border px-4 py-2 font-mono text-[10px] tracking-widest text-muted-foreground hover:text-foreground hover:border-muted-foreground transition-colors uppercase"
                >
                  DOWNLOAD_MATRIX.CSV <span aria-hidden="true">&darr;</span>
                </button>
              </div>
            </div>

            {/* Sidebar (Analyst Box) */}
            <div className="lg:col-span-1 border border-border bg-card p-8 flex flex-col">
              <div className="inline-block bg-gold px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-black self-start mb-6">
                EME ANALYST
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                The Exposure Asymmetry Problem
              </h3>
              <p className="font-mono text-[13px] leading-relaxed text-muted-foreground mb-8">
                Defenders inventory assets. Attackers inventory <span className="text-gold font-bold">opportunities</span>. EME re-frames every open port as a question: <span className="text-foreground">what does an adversary gain by touching this?</span>
              </p>
              
              <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border pb-2">
                SELECT ANALYST PROMPT
              </div>
              
              <div className="space-y-2 mb-8">
                <div className="border border-gold text-gold p-3 font-mono text-[11px] cursor-pointer bg-gold/5">
                  &gt; Explain why exposing SMB(445) on a DC is critical.
                </div>
                <div className="border border-border text-muted-foreground p-3 font-mono text-[11px] cursor-pointer hover:border-muted-foreground transition-colors">
                  &gt; What is the risk of exposing databases (e.g. MySQL/MSSQL) publicly?
                </div>
                <div className="border border-border text-muted-foreground p-3 font-mono text-[11px] cursor-pointer hover:border-muted-foreground transition-colors">
                  &gt; How does an attacker chain RDP and SMB for lateral movement?
                </div>
                <div className="border border-border text-muted-foreground p-3 font-mono text-[11px] cursor-pointer hover:border-muted-foreground transition-colors">
                  &gt; What is the significance of the calculated Exposure score?
                </div>
              </div>
              
              <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground border-b border-border pb-2">
                RESPONSE
              </div>
              
              <div className="font-mono text-[12px] leading-relaxed text-muted-foreground mb-8">
                SMB on a domain controller is the single highest-leverage port in a Windows estate. It enables NTLM relay, SMB null-session enumeration, and post-auth lateral movement via admin shares. The Exposure Score weights it at 1.6x with a chaining bonus when paired with RDP or LDAP on the same host.
              </div>
              
              <div className="mt-auto pt-4 flex items-center gap-2 font-mono text-[10px] text-success uppercase tracking-widest">
                <span className="h-1.5 w-1.5 bg-success rounded-full"></span> READY_FOR_ACTION
              </div>
            </div>
            
          </div>
        </div>
      </section>



      {/* Human Readable Report */}
      <section id="report" className="border-t border-border bg-background pb-24">
        <div className="mx-auto max-w-[1600px] px-6 py-24">
          <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl text-foreground uppercase mb-4">
            HUMAN-READABLE REPORT
          </h2>
          <p className="max-w-3xl font-mono text-sm leading-relaxed text-muted-foreground mb-16">
            Markdown export ready for tickets, briefings or executive read-outs — written from an attacker's first-person reconnaissance perspective.
          </p>
          
          <div className="flex flex-col md:flex-row border border-border bg-[#09090b]">
            
            {/* Sidebar menu */}
            <div className="w-full md:w-64 border-r border-border p-6 flex flex-col font-mono">
              <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-6">REPORT.MD SECTIONS</div>
              <ul className="space-y-4 text-xs mb-12">
                <li className="text-muted-foreground hover:text-foreground cursor-pointer">01 Executive Summary</li>
                <li className="text-muted-foreground hover:text-foreground cursor-pointer">02 Host Inventory</li>
                <li className="text-muted-foreground hover:text-foreground cursor-pointer">03 Exposure Scoring</li>
                <li className="text-gold border-l-2 border-gold pl-2 -ml-2">04 Attack Paths</li>
                <li className="text-muted-foreground hover:text-foreground cursor-pointer">05 MITRE Mapping</li>
                <li className="text-muted-foreground hover:text-foreground cursor-pointer">06 Detection Hooks</li>
                <li className="text-muted-foreground hover:text-foreground cursor-pointer">07 Remediation</li>
              </ul>
              
              <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-6">EXPORT OPTIONS</div>
              <div className="space-y-2">
                <button 
                  aria-label="Download Markdown Report"
                  className="w-full bg-gold text-black font-bold py-3 text-xs tracking-widest uppercase flex justify-center items-center gap-2"
                >
                  <span aria-hidden="true">↓</span> DOWNLOAD .MD
                </button>
                <button 
                  aria-label="Export PDF Report"
                  className="w-full border border-border text-muted-foreground hover:text-foreground py-3 text-xs tracking-widest uppercase flex justify-center items-center gap-2"
                >
                  <span aria-hidden="true">📄</span> EXPORT .PDF
                </button>
                <button 
                  aria-label="Copy JSON Data"
                  className="w-full border border-border text-muted-foreground hover:text-foreground py-3 text-xs tracking-widest uppercase flex justify-center items-center gap-2"
                >
                  <span aria-hidden="true">⎘</span> COPY JSON
                </button>
              </div>
            </div>
            
            {/* Content area */}
            <div className="flex-1 p-8 md:p-12">
              <div className="flex justify-between items-center mb-10 font-mono text-[10px] uppercase tracking-widest">
                <div className="text-muted-foreground">04_ATTACK_PATHS.MD</div>
                <div className="flex items-center gap-2 text-success">
                  <span className="h-1.5 w-1.5 bg-success rounded-full"></span> RENDERED_LOCAL
                </div>
              </div>
              
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">From DMZ Foothold to Domain Admin</h3>
              <p className="font-mono text-sm leading-relaxed text-muted-foreground mb-8">
                The target host <span className="text-gold font-bold">(172.18.4.12)</span> exposes a triad that, in combination, removes friction from every meaningful adversary objective: <span className="text-foreground">RDP for interactive access, SMB for lateral spread, and LDAP for directory enumeration.</span>
              </p>
              
              <div className="bg-black border border-border p-5 font-mono text-xs leading-relaxed text-muted-foreground mb-10">
                <div className="text-gold mb-2">$ eme.explain --host 172.18.4.12 --path publicinternet-rdp:3389-smb:445-ldap:389-dc_admin</div>
                <div>[1] RDP:3389 - credential spray window (T1110)</div>
                <div>[2] SMB:445 - admin-share pivot via PsExec (T1021.002)</div>
                <div>[3] LDAP:389 - Kerberoast SPN harvest (T1558.003)</div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-muted-foreground">↳</span>
                  <span>tier-0 compromise probability: <span className="text-danger font-bold">HIGH</span></span>
                </div>
              </div>
              
              <h4 className="font-display text-xl font-bold text-gold mb-4">Detection Opportunities</h4>
              <ul className="list-disc pl-5 font-mono text-sm leading-relaxed text-muted-foreground space-y-2 mb-10 marker:text-border">
                <li>4625 burst on 3389 from a single source — credential spray indicator.</li>
                <li>Service installation events (7045) following SMB session establishment.</li>
                <li>LDAP queries with unusual SPN filter patterns from non-admin contexts.</li>
              </ul>
              
              <h4 className="font-display text-xl font-bold text-gold mb-4">Recommended Hardening</h4>
              <ul className="list-disc pl-5 font-mono text-sm leading-relaxed text-muted-foreground space-y-2 marker:text-border">
                <li>Restrict 3389 to a bastion subnet and enforce Network Level Authentication (NLA).</li>
                <li>Disable SMBv1; enable SMB signing & require Kerberos for tier-0 hosts.</li>
                <li>Move sensitive service accounts to gMSA to neutralize Kerberoast value.</li>
              </ul>
            </div>
            
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="border-t border-border bg-black/40">
        <div className="mx-auto max-w-[1600px] px-6 py-20">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 border border-border bg-card px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold">
                <span className="h-1.5 w-1.5 bg-gold animate-pulse-dot rounded-full"></span> CAPABILITIES
              </div>
              <h2 className="mt-5 font-display text-5xl font-bold tracking-tight md:text-7xl">
                WHAT EME DELIVERS
              </h2>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid gap-[1px] border border-border bg-border md:grid-cols-3"
          >
            <div className="group relative bg-card p-6 transition-colors hover:bg-secondary/60">
              <div className="text-[10px] text-muted-foreground">01</div>
              <div className="mt-3 font-display text-xl font-bold tracking-wide text-foreground">EXPOSURE SCORING</div>
              <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground font-mono">
                Weighted risk engine that treats exposure like an attacker does. Legacy protocols, critical roles, and chainable services multiply together — not just additive CVSS.
              </p>
              <div className="absolute bottom-4 right-4 text-[10px] text-border group-hover:text-gold transition-colors">↗</div>
            </div>
            
            <div className="group relative bg-card p-6 transition-colors hover:bg-secondary/60">
              <div className="text-[10px] text-muted-foreground">02</div>
              <div className="mt-3 font-display text-xl font-bold tracking-wide text-foreground">MITRE ATT&CK</div>
              <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground font-mono">
                Every open port maps to a tactic and technique. See your network through the ATT&CK matrix, not just a spreadsheet of service banners.
              </p>
              <div className="absolute bottom-4 right-4 text-[10px] text-border group-hover:text-gold transition-colors">↗</div>
            </div>
            
            <div className="group relative bg-card p-6 transition-colors hover:bg-secondary/60">
              <div className="text-[10px] text-muted-foreground">03</div>
              <div className="mt-3 font-display text-xl font-bold tracking-wide text-foreground">LATERAL PATHS</div>
              <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground font-mono">
                Simulated pivot chains from internet foothold to domain admin. Understand blast radius before an adversary does.
              </p>
              <div className="absolute bottom-4 right-4 text-[10px] text-border group-hover:text-gold transition-colors">↗</div>
            </div>
          </motion.div>
          
          <div className="mt-12 text-center">
            <Link
              to="/scanner"
              aria-label="Initialize Scan - Open Dashboard"
              className="inline-flex items-center gap-3 border border-gold bg-gold px-8 py-4 font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:glow-gold"
            >
              <span>INITIALIZE_SCAN <span aria-hidden="true">→</span></span>
            </Link>
            <p className="mt-4 text-[11px] text-muted-foreground">
              No account required. Runs in your browser. No data leaves the workstation.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
