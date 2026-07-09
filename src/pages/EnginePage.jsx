import React, { useEffect, useState } from 'react';
import SeoMeta from '../components/seo/SeoMeta';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Terminal, Database, Cpu, Target, Crosshair, Link as LinkIcon, BarChart, FileText, PieChart, ArrowRight, Activity, Shield, Network } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Treemap, ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function EnginePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeStageId, setActiveStageId] = useState(1);

  const stages = [
    { id: 1, name: 'Parser', icon: Terminal, color: 'text-foreground' },
    { id: 2, name: 'Service Intel', icon: Database, color: 'text-foreground' },
    { id: 3, name: 'Asset ID', icon: Cpu, color: 'text-gold' },
    { id: 4, name: 'Attacker Interest', icon: Target, color: 'text-danger' },
    { id: 5, name: 'Opportunities', icon: Crosshair, color: 'text-danger' },
    { id: 6, name: 'Chain Mapping', icon: LinkIcon, color: 'text-gold' },
    { id: 7, name: 'Exposure Scoring', icon: BarChart, color: 'text-danger' },
    { id: 8, name: 'Narrative Gen', icon: FileText, color: 'text-foreground' },
    { id: 9, name: 'Visualizations', icon: PieChart, color: 'text-gold' },
  ];

  const stageDetails = {
    1: {
      purpose: "To ingest raw, unstructured Nmap XML logs and standardize them into a flat JSON object.",
      inputs: "nmap_scan.xml",
      outputs: "Standardized ParsedHost[] array.",
      logic: "Extracts host states, IP addresses, open ports, service banners, and scripts via XML DOM traversal.",
      example: "{ \"ip\": \"10.0.0.5\", \"ports\": [ { \"port\": 445, \"service\": \"microsoft-ds\" } ] }"
    },
    2: {
      purpose: "To enrich raw ports with cybersecurity context and historical adversary preferences.",
      inputs: "Extracted port numbers and service banners.",
      outputs: "Enriched port objects with criticality, threat_tags, and abuse_vectors.",
      logic: "Matches ports against a proprietary deterministic mapping (e.g., Port 445 -> SMB, High Criticality, Relay/RCE Risk).",
      example: "Identifying Port 389 as LDAP, noting its susceptibility to Null Sessions and Kerberoasting."
    },
    3: {
      purpose: "To infer the holistic role of a machine based on its exposed service signature.",
      inputs: "The combined set of enriched ports for a single host.",
      outputs: "Assigned Asset_Role (e.g., Domain Controller, Database, Web Server).",
      logic: "Heuristic matching. If a host runs 445 (SMB), 389 (LDAP), and 88 (Kerberos), the engine confidently flags it as a DOMAIN_CONTROLLER.",
      example: "A host exposing only 80 and 443 is classified as a WEB_FRONTEND."
    },
    4: {
      purpose: "To quantify how attractive a specific asset is to a threat actor upon initial discovery.",
      inputs: "Asset Role and Critical Services.",
      outputs: "A 0-100 Interest_Score.",
      logic: "Applies weight multipliers. A Domain Controller receives a massive multiplier because it holds the keys to the kingdom.",
      example: "An exposed Domain Controller yields an Interest Score of 98/100."
    },
    5: {
      purpose: "To identify specific, actionable pathways an attacker could take to compromise the host.",
      inputs: "Enriched services and Threat Tags.",
      outputs: "An array of Attack_Vectors.",
      logic: "Pattern matching against known exploit chains (e.g., Unauthenticated RDP + No NLA = Credential Brute Force Opportunity).",
      example: "Flagging Anonymous FTP as an initial access vector for payload dropping."
    },
    6: {
      purpose: "To map the identified exposure opportunities directly to the EME Exposure Chain framework.",
      inputs: "Attack_Vectors and Asset_Role.",
      outputs: "Categorization into DISCOVER, ENUMERATE, ACCESS, ABUSE, MOVE, IMPACT.",
      logic: "Assigns a phase based on the service type. (e.g., Port 445 maps to ABUSE via NTLM Relay).",
      example: "The engine maps exposed RDP to the ACCESS stage."
    },
    7: {
      purpose: "To calculate the final, non-linear mathematical risk score of the entire network.",
      inputs: "Interest_Scores and Exposure_Opportunities across all hosts.",
      outputs: "A network-wide Exposure_Score (0-100).",
      logic: "Employs the APES (Attacker Perspective Exposure Scoring) algorithm. Penalizes exposing high-interest administrative services.",
      example: "A network with an exposed Domain Controller scores an immediate 85+ (Critical)."
    },
    8: {
      purpose: "To translate mathematical matrices and JSON arrays into human-readable, executive-level threat intelligence.",
      inputs: "All processed data from Stages 1-7.",
      outputs: "Markdown-formatted intelligence dossiers.",
      logic: "Uses deterministic templating to construct paragraphs explaining why the exposed services are dangerous.",
      example: "\"Host 10.0.0.5 is identified as a Domain Controller. Public exposure of SMB (445) creates an immediate, critical risk...\""
    },
    9: {
      purpose: "To render the intelligence into intuitive graphical interfaces for SOC analysts and security leaders.",
      inputs: "The final Intelligence Object.",
      outputs: "React Components (Gauges, Tables, Flowcharts).",
      logic: "Feeds the data into charting libraries to generate visual command centers.",
      example: "Generating a glowing gold '71' on the main Exposure Gauge."
    }
  };

  // Mock data for Recharts visualizations
  const radarData = [
    { subject: 'DISCOVER', A: 100, fullMark: 100 },
    { subject: 'ENUMERATE', A: 85, fullMark: 100 },
    { subject: 'ACCESS', A: 60, fullMark: 100 },
    { subject: 'ABUSE', A: 90, fullMark: 100 },
    { subject: 'MOVE', A: 45, fullMark: 100 },
    { subject: 'IMPACT', A: 95, fullMark: 100 },
  ];

  const treemapData = [
    { name: 'DOMAIN_CONTROLLER', size: 400 },
    { name: 'WEB_SERVER', size: 300 },
    { name: 'DATABASE', size: 200 },
    { name: 'WORKSTATION', size: 150 },
    { name: 'UNKNOWN', size: 50 },
  ];

  const progressionData = [
    { name: 'Wk 1', score: 85, ports: 140 },
    { name: 'Wk 2', score: 78, ports: 120 },
    { name: 'Wk 3', score: 71, ports: 95 },
    { name: 'Wk 4', score: 45, ports: 60 },
    { name: 'Wk 5', score: 38, ports: 45 },
  ];

  return (
    <main className="relative min-h-screen bg-[#030303] text-[#fafafa] font-mono selection:bg-gold selection:text-black">
      <SeoMeta title="Engine" />
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden border-b border-border min-h-[90vh] flex flex-col justify-center">
        <div className="absolute inset-0 grid-bg opacity-[0.1] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/80 to-[#030303]"></div>
        
        {/* Abstract Data Flow Visual in Background */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
           <motion.div 
             animate={{ x: [0, 1000], opacity: [0, 1, 0] }} 
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             className="absolute top-1/4 left-0 h-[1px] w-[200px] bg-gradient-to-r from-transparent to-gold"
           />
           <motion.div 
             animate={{ x: [0, 1000], opacity: [0, 1, 0] }} 
             transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
             className="absolute top-2/4 left-0 h-[1px] w-[300px] bg-gradient-to-r from-transparent to-white"
           />
           <motion.div 
             animate={{ x: [0, 1000], opacity: [0, 1, 0] }} 
             transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 2 }}
             className="absolute top-3/4 left-0 h-[1px] w-[150px] bg-gradient-to-r from-transparent to-danger"
           />
        </div>

        <div className="relative mx-auto max-w-[1600px] px-6 text-center z-10 mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 border border-border bg-black/50 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-gold mb-12 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 bg-gold rounded-full animate-pulse-dot"></span> // ARCHITECTURE & METHODOLOGY
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase mb-8 leading-[1.1]"
          >
            EME Intelligence <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">Engine</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground font-mono leading-relaxed mb-16"
          >
            The deterministic pipeline that transforms raw Nmap telemetry into actionable, attacker-perspective intelligence.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="#pipeline" className="inline-flex items-center gap-3 border border-gold bg-gold px-8 py-4 font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:glow-gold hover:translate-y-[-2px]">
              EXPLORE THE PIPELINE <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. The Core Philosophy */}
      <section className="bg-background py-32 border-b border-border">
         <div className="mx-auto max-w-[900px] px-6">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-10 text-foreground border-l-4 border-gold pl-6 py-2">From Telemetry to Intelligence</h2>
            
            <div className="prose prose-invert max-w-none font-mono text-base text-muted-foreground leading-loose">
              <p className="mb-6">
                Raw vulnerability scanners give you data points in a vacuum. The EME Intelligence Engine operates differently. It assumes that an adversary doesn't view your network as a list of independent CVEs, but as an interconnected web of opportunities.
              </p>
              <p className="mb-12">
                By passing raw Nmap XML through a multi-stage deterministic pipeline, EME infers asset roles, calculates lateral movement potential, and generates a narrative that explains <span className="text-foreground font-bold underline decoration-gold underline-offset-4">exactly</span> what an attacker sees.
              </p>

              <div className="bg-[#0a0a0c] border border-gold/30 p-8 shadow-[0_0_30px_rgba(255,191,0,0.05)]">
                <div className="flex items-center gap-4 mb-4">
                  <Shield className="w-6 h-6 text-gold" />
                  <h3 className="text-xl font-bold text-foreground m-0">Zero Telemetry. Client-Side Execution.</h3>
                </div>
                <p className="m-0 text-sm">
                  The entire intelligence pipeline executes locally within the browser context. Raw telemetry never leaves your environment, ensuring absolute data privacy and immediate results without API latency.
                </p>
              </div>
            </div>
         </div>
      </section>

      {/* 4. Interactive Module Explorer (The 9 Stages) */}
      <section id="pipeline" className="bg-[#050505] border-b border-border py-24">
         <div className="mx-auto max-w-[1600px] px-6">
            <div className="text-center mb-20">
               <div className="text-gold tracking-widest text-[10px] uppercase mb-4">// PIPELINE ARCHITECTURE</div>
               <h2 className="font-display text-4xl font-bold text-foreground uppercase tracking-widest">The 9-Stage Engine</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
               {/* Left Column: Stage Selector */}
               <div className="lg:col-span-4 flex flex-col border border-border bg-[#0a0a0c] rounded-sm overflow-hidden sticky top-24">
                  {stages.map((stage) => {
                     const Icon = stage.icon;
                     const isActive = activeStageId === stage.id;
                     return (
                        <button
                          key={stage.id}
                          onClick={() => setActiveStageId(stage.id)}
                          className={`
                            flex items-center gap-4 p-5 text-left transition-all duration-300 border-b border-border/50
                            ${isActive ? 'bg-[#111] border-l-4 border-l-gold' : 'hover:bg-secondary/20 border-l-4 border-l-transparent'}
                            ${stage.id === 9 ? 'border-b-0' : ''}
                          `}
                        >
                           <div className={`font-mono text-xs font-bold w-6 ${isActive ? 'text-gold' : 'text-muted-foreground'}`}>
                             {stage.id.toString().padStart(2, '0')}
                           </div>
                           <Icon className={`w-5 h-5 ${isActive ? stage.color : 'text-muted-foreground opacity-50'}`} />
                           <div className={`font-mono text-sm tracking-wide ${isActive ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>
                             {stage.name}
                           </div>
                        </button>
                     )
                  })}
               </div>

               {/* Right Column: Deep Dive Details */}
               <div className="lg:col-span-8 bg-card border border-border p-8 md:p-12 min-h-[600px]">
                  <AnimatePresence mode="wait">
                     <motion.div
                       key={activeStageId}
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -10 }}
                       transition={{ duration: 0.3 }}
                     >
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border">
                           {React.createElement(stages.find(s => s.id === activeStageId).icon, { className: `w-12 h-12 ${stages.find(s => s.id === activeStageId).color}` })}
                           <div>
                              <div className="text-gold font-mono text-[10px] tracking-widest mb-1">STAGE {activeStageId.toString().padStart(2, '0')}</div>
                              <h3 className="font-display text-4xl font-bold uppercase">{stages.find(s => s.id === activeStageId).name}</h3>
                           </div>
                        </div>

                        <div className="space-y-8 font-mono text-sm">
                           <div>
                              <h4 className="text-muted-foreground text-[10px] uppercase tracking-widest mb-2 border-l-2 border-border pl-3">Purpose</h4>
                              <p className="text-foreground leading-relaxed pl-3">{stageDetails[activeStageId].purpose}</p>
                           </div>
                           
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="bg-black/50 border border-border p-4">
                                 <h4 className="text-muted-foreground text-[10px] uppercase tracking-widest mb-2">Inputs</h4>
                                 <div className="text-gold">{stageDetails[activeStageId].inputs}</div>
                              </div>
                              <div className="bg-black/50 border border-border p-4">
                                 <h4 className="text-muted-foreground text-[10px] uppercase tracking-widest mb-2">Outputs</h4>
                                 <div className="text-success">{stageDetails[activeStageId].outputs}</div>
                              </div>
                           </div>

                           <div>
                              <h4 className="text-muted-foreground text-[10px] uppercase tracking-widest mb-2 border-l-2 border-border pl-3">Internal Logic</h4>
                              <p className="text-muted-foreground leading-relaxed pl-3">{stageDetails[activeStageId].logic}</p>
                           </div>

                           <div className="mt-10 border border-border bg-[#09090b] overflow-hidden">
                              <div className="bg-[#111] border-b border-border px-4 py-2 flex items-center justify-between text-[10px] uppercase text-muted-foreground tracking-widest">
                                 <span>Example Data / Output</span>
                                 <span>console.log()</span>
                              </div>
                              <div className="p-6">
                                 <code className="text-xs text-[#a5d6ff] break-words whitespace-pre-wrap font-mono">
                                   {stageDetails[activeStageId].example}
                                 </code>
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  </AnimatePresence>
               </div>
            </div>
         </div>
      </section>

      {/* 5. Recharts Visualization Recommendations */}
      <section className="bg-background py-32 border-b border-border">
         <div className="mx-auto max-w-[1600px] px-6">
            <div className="text-center mb-24">
               <h2 className="font-display text-4xl font-bold uppercase tracking-widest text-foreground">Visual Command Center</h2>
               <p className="font-mono text-muted-foreground mt-4 max-w-2xl mx-auto">Showcasing how the Intelligence Engine's mathematical outputs are rendered using responsive charting components.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               {/* Chart 1: Radar */}
               <div className="bg-card border border-border p-8 flex flex-col">
                  <div className="mb-8">
                     <h3 className="font-display text-xl font-bold text-gold uppercase mb-2">The Intelligence Radar</h3>
                     <p className="text-xs text-muted-foreground font-mono">A polar area chart visualizing the network's vulnerability distribution across the 6 stages of the Exposure Chain.</p>
                  </div>
                  <div className="h-[300px] w-full flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="#333" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace' }} />
                        <Radar name="Exposure" dataKey="A" stroke="#ffbf00" fill="#ffbf00" fillOpacity={0.2} />
                        <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#ffbf00', fontFamily: 'monospace', fontSize: '12px' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
               </div>

               {/* Chart 2: Progression */}
               <div className="bg-card border border-border p-8 flex flex-col">
                  <div className="mb-8">
                     <h3 className="font-display text-xl font-bold text-success uppercase mb-2">Threat Progression Graph</h3>
                     <p className="text-xs text-muted-foreground font-mono">A composed chart showing the reduction in Exposure Score over time alongside total open port counts.</p>
                  </div>
                  <div className="h-[300px] w-full flex-1 font-mono text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={progressionData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                        <XAxis dataKey="name" stroke="#555" tick={{ fill: '#888' }} />
                        <YAxis yAxisId="left" stroke="#555" tick={{ fill: '#888' }} />
                        <YAxis yAxisId="right" orientation="right" stroke="#555" tick={{ fill: '#888' }} />
                        <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333' }} />
                        <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                        <Bar yAxisId="right" dataKey="ports" barSize={20} fill="#333" name="Open Ports" />
                        <Line yAxisId="left" type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} name="Exposure Score" dot={{ r: 4, fill: '#10b981' }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. Call to Action */}
      <section className="bg-[#050505] py-40 text-center relative overflow-hidden">
         <div className="absolute inset-0 grid-bg opacity-[0.2]"></div>
         <div className="relative z-10 mx-auto max-w-3xl px-6">
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8">
               Local. Fast. <br/><span className="text-gold">Deterministic.</span>
            </h2>
            <p className="font-mono text-lg text-muted-foreground mb-12">
               Experience the Intelligence Engine. Upload an Nmap XML scan and watch raw telemetry transform into attacker-perspective intelligence in milliseconds.
            </p>
            <Link 
               to="/scanner" 
               className="inline-flex items-center gap-3 border border-gold bg-gold px-10 py-5 font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:glow-gold hover:translate-y-[-2px] shadow-[0_0_40px_rgba(255,191,0,0.2)]"
            >
               INITIALIZE ENGINE <ArrowRight className="w-4 h-4" />
            </Link>
         </div>
      </section>
      
    </main>
  );
}
