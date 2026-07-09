import React, { useEffect, useState } from 'react';
import SeoMeta from '../components/seo/SeoMeta';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Network, Search, Filter, ShieldAlert, Cpu, ArrowRight, Activity, Terminal, Database, Server, Laptop, HelpCircle } from 'lucide-react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from 'recharts';

export default function RulesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');

  // Confidence Chart Data
  const confidenceData = [
    { name: 'Definitive Cluster', confidence: 98, fill: '#ffbf00' },
    { name: 'Strong Correlation', confidence: 85, fill: '#997300' },
    { name: 'Generic Indicator', confidence: 50, fill: '#555555' },
    { name: 'Contradictory', confidence: 25, fill: '#ef4444' },
  ];

  // Rule Matrix Data
  const rules = [
    {
      identity: 'DOMAIN_CONTROLLER',
      primary: '445 | 88 | 389',
      supporting: '53 | 135 | 3268',
      confidence: '98%',
      logic: 'The combination of SMB, Kerberos, and LDAP is the definitive signature of an Active Directory Domain Controller.',
      icon: Network,
      color: 'text-gold'
    },
    {
      identity: 'WEB_APPLICATION_SERVER',
      primary: '80 | 443 | 3306',
      supporting: '8080 | 8443',
      confidence: '92%',
      logic: 'Public HTTP/S protocols running on the same host as a relational database implies a monolithic web application backend.',
      icon: Server,
      color: 'text-gold'
    },
    {
      identity: 'DATABASE',
      primary: '3306 | 1433 | 5432',
      supporting: '1521 | 27017',
      confidence: '90%',
      logic: 'Exclusive exposure of a known database port (MySQL, MSSQL, Postgres) strongly suggests a dedicated database server.',
      icon: Database,
      color: 'text-gold'
    },
    {
      identity: 'FILE_SERVER_CANDIDATE',
      primary: '445 | 3389',
      supporting: '139',
      confidence: '65%',
      logic: 'Exposing file sharing (SMB) alongside interactive remote access (RDP) suggests an internal file server or admin workstation.',
      icon: Server,
      color: 'text-muted-foreground'
    },
    {
      identity: 'WORKSTATION',
      primary: '135 | 3389',
      supporting: 'None',
      confidence: '55%',
      logic: 'RPC and RDP without specific infrastructure services commonly implies a standard Windows workstation.',
      icon: Laptop,
      color: 'text-muted-foreground'
    },
    {
      identity: 'UNKNOWN',
      primary: 'None',
      supporting: 'Random High Ports',
      confidence: '10%',
      logic: 'The host is alive but exposes no definitive service signatures that match the deterministic heuristics.',
      icon: HelpCircle,
      color: 'text-danger'
    }
  ];

  const filteredRules = rules.filter(r => 
    r.identity.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.primary.includes(searchTerm) ||
    r.supporting.includes(searchTerm)
  );

  return (
    <main className="relative min-h-screen bg-[#030303] text-[#fafafa] font-mono selection:bg-gold selection:text-black overflow-hidden">
      <SeoMeta title="Rules" />
      
      {/* 1. Hero / Header Section */}
      <section className="relative overflow-hidden border-b border-border min-h-[90vh] flex flex-col justify-center">
        {/* Subtle Branching Node Background */}
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#fff" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <path d="M 0 50 Q 200 50 200 200 T 400 400" fill="none" stroke="#ffbf00" strokeWidth="2" className="animate-pulse" />
            <path d="M 0 500 Q 300 500 300 300 T 600 200" fill="none" stroke="#fff" strokeWidth="1" className="animate-pulse" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/80 to-[#030303]"></div>
        
        <div className="relative mx-auto max-w-[1600px] px-6 text-center z-10 mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 border border-gold/30 bg-gold/5 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-gold mb-12 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 bg-gold rounded-full animate-pulse-dot"></span> // ASSET INFERENCE METHODOLOGY
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter uppercase mb-8 leading-[0.9]"
          >
            EME Host <br/> <span className="text-gold">Rules</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground font-mono leading-relaxed mb-16"
          >
            The deterministic heuristic engine that transforms raw port combinations into highly-confident asset identities.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="#rules" className="inline-flex items-center gap-3 border border-gold bg-gold px-8 py-4 font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:glow-gold hover:translate-y-[-2px]">
              EXPLORE THE RULES <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. The Core Philosophy */}
      <section className="bg-background py-32 border-b border-border">
         <div className="mx-auto max-w-[1200px] px-6">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-10 text-foreground text-center">Inferring Identity from Exposure</h2>
            
            <p className="font-mono text-base md:text-lg text-muted-foreground leading-loose text-center max-w-4xl mx-auto mb-16">
              A vulnerability scanner sees an IP address. EME sees an identity. By analyzing the unique signature of open ports on a machine, our Host Rules engine uses a deterministic, rule-based algorithm to infer the asset's primary function within the network taxonomy. We do not rely on fragile OS fingerprinting or authenticated scans; we rely on the same fundamental service relationships that threat actors use to identify their targets.
            </p>

            <div className="bg-[#0a0a0c] border border-border p-8 shadow-xl mx-auto max-w-3xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-gold"></div>
              <div className="flex items-start gap-4">
                <Terminal className="w-8 h-8 text-gold shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2 font-display tracking-wide uppercase">Transparent Methodology</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Security through obscurity fails. We publish our exact classification heuristics so that SOC analysts understand precisely <em>why</em> an asset was flagged as a Domain Controller versus a generic File Server.
                  </p>
                </div>
              </div>
            </div>
         </div>
      </section>

      {/* 3. The Heuristic Signatures */}
      <section className="bg-[#050505] py-32 border-b border-border relative">
         <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
         <div className="mx-auto max-w-[1400px] px-6 relative z-10">
            <div className="text-center mb-24">
               <div className="text-gold tracking-widest text-[10px] uppercase mb-4">// CORE SIGNATURES</div>
               <h2 className="font-display text-4xl font-bold uppercase tracking-widest text-foreground">The Math of Identification</h2>
            </div>

            <div className="space-y-16">
              
              {/* Signature 1 */}
              <div className="flex flex-col lg:flex-row items-center gap-12 bg-black border border-border p-12 hover:border-gold/50 transition-colors">
                <div className="flex-1 text-center lg:text-left">
                  <div className="font-display text-5xl md:text-7xl font-bold text-foreground tracking-tighter">
                    <span className="text-gold">#</span> 445 <span className="text-muted-foreground">+</span> 88 <span className="text-muted-foreground">+</span> 389
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                    <span className="text-2xl font-bold text-gold uppercase tracking-widest">= DOMAIN_CONTROLLER</span>
                    <span className="border border-border px-3 py-1 text-xs text-muted-foreground bg-[#111]">CONFIDENCE: 98%</span>
                  </div>
                </div>
                <div className="lg:w-1/3 border-l-2 border-border pl-0 lg:pl-8 pt-8 lg:pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed font-mono">
                    <strong className="text-foreground">Rationale:</strong> The presence of SMB (445) alongside Kerberos (88) and LDAP (389) is the absolute definitive signature of an Active Directory Domain Controller.
                  </p>
                </div>
              </div>

              {/* Signature 2 */}
              <div className="flex flex-col lg:flex-row items-center gap-12 bg-black border border-border p-12 hover:border-gold/50 transition-colors">
                <div className="flex-1 text-center lg:text-left">
                  <div className="font-display text-5xl md:text-7xl font-bold text-foreground tracking-tighter">
                    <span className="text-gold">#</span> 80 <span className="text-muted-foreground">+</span> 443 <span className="text-muted-foreground">+</span> 3306
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                    <span className="text-2xl font-bold text-foreground uppercase tracking-widest">= WEB_APP_SERVER</span>
                    <span className="border border-border px-3 py-1 text-xs text-muted-foreground bg-[#111]">CONFIDENCE: 92%</span>
                  </div>
                </div>
                <div className="lg:w-1/3 border-l-2 border-border pl-0 lg:pl-8 pt-8 lg:pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed font-mono">
                    <strong className="text-foreground">Rationale:</strong> Public HTTP/S protocols running on the same host as a relational database (MySQL) heavily implies a monolithic web application or a direct database backend exposure.
                  </p>
                </div>
              </div>

              {/* Signature 3 */}
              <div className="flex flex-col lg:flex-row items-center gap-12 bg-black border border-border p-12 hover:border-gold/50 transition-colors">
                <div className="flex-1 text-center lg:text-left">
                  <div className="font-display text-5xl md:text-7xl font-bold text-foreground tracking-tighter">
                    <span className="text-gold">#</span> 445 <span className="text-muted-foreground">+</span> 3389
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                    <span className="text-2xl font-bold text-muted-foreground uppercase tracking-widest">= FILE_SERVER_CANDIDATE</span>
                    <span className="border border-border px-3 py-1 text-xs text-muted-foreground bg-[#111]">CONFIDENCE: 65%</span>
                  </div>
                </div>
                <div className="lg:w-1/3 border-l-2 border-border pl-0 lg:pl-8 pt-8 lg:pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed font-mono">
                    <strong className="text-foreground">Rationale:</strong> Exposing file sharing (SMB) alongside interactive remote access (RDP) suggests an internal file server or administrative workstation, though confidence is lower without further context.
                  </p>
                </div>
              </div>

            </div>
         </div>
      </section>

      {/* 4. Taxonomy & Confidence Scoring */}
      <section className="bg-background py-32 border-b border-border">
         <div className="mx-auto max-w-[1600px] px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               
               {/* Left: Logic */}
               <div className="space-y-12">
                  <div>
                    <h3 className="font-display text-3xl font-bold text-foreground uppercase mb-6">Asset Taxonomy & Logic</h3>
                    <p className="font-mono text-muted-foreground leading-relaxed mb-6">
                      EME categorizes hosts into predefined, mutually exclusive buckets. The engine looks for <em>clusters</em> of services. A lone Port 80 is generic. Port 80 + 8080 + 8443 strongly implies an application load balancer or dev environment.
                    </p>
                    <div className="flex flex-wrap gap-3 font-mono text-[10px] uppercase tracking-widest font-bold">
                      <span className="px-3 py-1 border border-gold text-gold bg-gold/10">DOMAIN_CONTROLLER</span>
                      <span className="px-3 py-1 border border-border text-foreground bg-secondary">DATABASE</span>
                      <span className="px-3 py-1 border border-border text-foreground bg-secondary">WEB_FRONTEND</span>
                      <span className="px-3 py-1 border border-border text-foreground bg-secondary">INFRASTRUCTURE</span>
                      <span className="px-3 py-1 border border-border text-foreground bg-secondary">WORKSTATION</span>
                      <span className="px-3 py-1 border border-danger text-danger bg-danger/10">UNKNOWN</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground uppercase mb-4">Dynamic Confidence Scoring</h3>
                    <p className="font-mono text-muted-foreground leading-relaxed text-sm">
                      Every rule has a base confidence score. When secondary supporting ports are discovered, the confidence score increases. If contradictory ports are discovered, the score decays. A definitive cluster achieves near 100% confidence.
                    </p>
                  </div>
               </div>

               {/* Right: Chart */}
               <div className="bg-[#050505] border border-border p-8 h-[400px] flex flex-col justify-center items-center relative">
                  <div className="absolute top-6 left-6 text-[10px] uppercase tracking-widest text-muted-foreground">Confidence Scaling Model</div>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart 
                      cx="50%" 
                      cy="50%" 
                      innerRadius="20%" 
                      outerRadius="90%" 
                      barSize={20} 
                      data={confidenceData}
                      startAngle={180}
                      endAngle={0}
                    >
                      <RadialBar
                        minAngle={15}
                        background={{ fill: '#111' }}
                        clockWise
                        dataKey="confidence"
                        cornerRadius={10}
                      />
                      <Legend iconSize={10} layout="vertical" verticalAlign="bottom" wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace', color: '#888' }} />
                      <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333', fontSize: '12px', fontFamily: 'monospace' }} />
                    </RadialBarChart>
                  </ResponsiveContainer>
               </div>

            </div>
         </div>
      </section>

      {/* 5. Interactive Rule Explorer */}
      <section id="rules" className="bg-[#050505] py-32 border-b border-border">
         <div className="mx-auto max-w-[1600px] px-6">
            <div className="text-center mb-16">
               <h2 className="font-display text-4xl font-bold uppercase tracking-widest text-foreground">Rule Matrix Explorer</h2>
               <p className="font-mono text-muted-foreground mt-4 max-w-2xl mx-auto">Search the underlying heuristic database to understand exact base confidence scores and required ports.</p>
            </div>

            <div className="border border-border bg-[#0a0a0c] overflow-hidden">
               {/* Filter Bar */}
               <div className="p-6 border-b border-border bg-[#111] flex flex-col md:flex-row items-center gap-6 justify-between">
                  <div className="flex items-center gap-4 w-full md:w-1/2 bg-black border border-border p-3">
                    <Search className="w-5 h-5 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="Filter by Identity or Port Number (e.g. '445' or 'DATABASE')..." 
                      className="bg-transparent border-none outline-none font-mono text-sm w-full text-foreground placeholder:text-muted-foreground"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <Filter className="w-4 h-4" /> {filteredRules.length} Rules Match
                  </div>
               </div>

               {/* Table */}
               <div className="overflow-x-auto">
                 <table className="w-full text-left font-mono text-sm">
                   <thead>
                     <tr className="bg-black border-b border-border text-[10px] uppercase tracking-widest text-muted-foreground">
                       <th className="py-4 px-6 whitespace-nowrap">Asset Identity</th>
                       <th className="py-4 px-6 whitespace-nowrap">Primary Ports</th>
                       <th className="py-4 px-6 whitespace-nowrap">Supporting Ports</th>
                       <th className="py-4 px-6 whitespace-nowrap">Base Conf.</th>
                       <th className="py-4 px-6 min-w-[300px]">Heuristic Logic</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-border/50">
                     {filteredRules.map((rule, idx) => {
                       const Icon = rule.icon;
                       return (
                         <tr key={idx} className="hover:bg-white/5 transition-colors">
                           <td className="py-6 px-6">
                             <div className={`flex items-center gap-3 font-bold ${rule.color}`}>
                               <Icon className="w-5 h-5" />
                               {rule.identity}
                             </div>
                           </td>
                           <td className="py-6 px-6 font-bold text-foreground whitespace-nowrap">{rule.primary}</td>
                           <td className="py-6 px-6 text-muted-foreground whitespace-nowrap">{rule.supporting}</td>
                           <td className="py-6 px-6">
                             <span className="border border-border bg-black px-2 py-1 text-xs">{rule.confidence}</span>
                           </td>
                           <td className="py-6 px-6 text-muted-foreground leading-relaxed text-xs">{rule.logic}</td>
                         </tr>
                       )
                     })}
                     {filteredRules.length === 0 && (
                       <tr>
                         <td colSpan="5" className="py-12 text-center text-muted-foreground">No heuristic rules matched your query.</td>
                       </tr>
                     )}
                   </tbody>
                 </table>
               </div>
            </div>
         </div>
      </section>

      {/* 6. CTA */}
      <section className="bg-[#030303] py-32 text-center relative overflow-hidden">
         <div className="absolute inset-0 grid-bg opacity-[0.2]"></div>
         <div className="relative z-10 mx-auto max-w-3xl px-6">
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8">
               Test the <span className="text-gold">Heuristics.</span>
            </h2>
            <p className="font-mono text-lg text-muted-foreground mb-12">
               The EME Intelligence Engine is deterministically driven by these exact rules. Upload a scan and watch it perfectly categorize your infrastructure in milliseconds.
            </p>
            <Link 
               to="/scanner" 
               className="inline-flex items-center gap-3 border border-gold bg-gold px-10 py-5 font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:glow-gold hover:translate-y-[-2px] shadow-[0_0_40px_rgba(255,191,0,0.2)]"
            >
               INGEST TELEMETRY <ArrowRight className="w-4 h-4" />
            </Link>
         </div>
      </section>
      
    </main>
  );
}
