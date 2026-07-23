import React, { useEffect } from 'react';
import SeoMeta from '../components/seo/SeoMeta';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GitCommit, CheckCircle2, Star, Network, ArrowRight } from 'lucide-react';

export default function RoadmapPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#030303] text-[#fafafa] font-mono selection:bg-gold selection:text-black">
      <SeoMeta title="Product Roadmap" />
      
      {/* 1. Hero / Header Section */}
      <section className="relative overflow-hidden border-b border-border min-h-[50vh] flex flex-col justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100%_40px] opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/80 to-[#030303]"></div>
        
        <div className="relative mx-auto max-w-[1200px] w-full px-6 text-center z-10 mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 border border-gold/30 bg-gold/5 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-gold mb-8 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 bg-gold rounded-full animate-pulse-dot"></span> // THE PATH FORWARD
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6"
          >
            EME <span className="text-muted-foreground">Roadmap</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mx-auto max-w-2xl text-base text-muted-foreground font-mono leading-relaxed mb-12"
          >
            Mapping the continuous evolution of the EME intelligence engine from a standalone analysis tool to an enterprise-grade CyberEDT ecosystem platform.
          </motion.p>
        </div>
      </section>

      {/* 2. The Interactive Roadmap */}
      <section className="bg-background py-20 lg:py-32 relative border-b border-border">
        <div className="mx-auto max-w-[1500px] px-6 relative">
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10">
            
            {/* v1.0 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#050505] border border-success/30 p-8 flex flex-col relative overflow-hidden group hover:border-success/50 transition-colors"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-success"></div>
              <div className="mb-6 border-b border-border pb-6">
                <span className="text-success text-[10px] font-bold tracking-widest uppercase mb-2 inline-flex items-center gap-2 px-2 py-1 bg-success/10 border border-success/20">
                  <CheckCircle2 size={12} /> Released
                </span>
                <h3 className="text-3xl font-display font-bold text-white mb-2">v1.0</h3>
                <p className="text-sm font-mono tracking-widest uppercase text-muted-foreground">Foundation</p>
              </div>
              <ul className="space-y-3 font-mono text-xs text-foreground/80">
                {["Nmap XML/Text Import", "Exposure Chain™", "Exposure Scoring", "Host Intelligence", "Attack Surface Analysis", "MITRE ATT&CK Mapping", "Interactive Dashboard", "Privacy-first Processing"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-success mt-0.5 opacity-50">▹</span> 
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* v1.1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#050505] border border-blue-500/30 p-8 flex flex-col relative overflow-hidden group hover:border-blue-500/50 transition-colors"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
              <div className="mb-6 border-b border-border pb-6">
                <span className="text-blue-500 text-[10px] font-bold tracking-widest uppercase mb-2 inline-flex items-center gap-2 px-2 py-1 bg-blue-500/10 border border-blue-500/20">
                  <span className="w-1.5 h-1.5 bg-blue-500 animate-pulse rounded-full" /> In Progress
                </span>
                <h3 className="text-3xl font-display font-bold text-white mb-2">v1.1</h3>
                <p className="text-sm font-mono tracking-widest uppercase text-muted-foreground">Exposure Intelligence</p>
              </div>
              <ul className="space-y-3 font-mono text-xs text-foreground/80">
                {["Multi-host Analysis", "Network Topology", "Service Fingerprinting", "Exposure Heatmaps", "Critical Asset Detection", "Threat Correlation", "CVE Intelligence", "Exposure History"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5 opacity-50">▹</span> 
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* v1.2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#0a0a0c] border border-gold/50 p-8 flex flex-col relative overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.1)] group hover:shadow-[0_0_50px_rgba(255,215,0,0.2)] transition-all"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gold"></div>
              <div className="absolute top-6 right-6">
                <Star size={24} className="text-gold fill-gold animate-pulse" />
              </div>
              <div className="mb-6 border-b border-gold/20 pb-6 pr-8">
                <span className="text-gold text-[10px] font-bold tracking-widest uppercase mb-2 inline-flex items-center gap-2 px-2 py-1 bg-gold/10 border border-gold/20">
                  <Network size={12} /> Concept
                </span>
                <h3 className="text-3xl font-display font-bold text-white mb-2">v1.2</h3>
                <p className="text-sm font-mono tracking-widest uppercase text-gold">CIL Integration</p>
              </div>
              <ul className="space-y-3 font-mono text-xs text-foreground/80">
                {["CyberEDT Intelligence Language (CIL)", "Export Exposure Reports as CIL", "Import CIL Reports", "CIL Validation Engine", "CIL Visualizer", "CIL Templates", "Universal Intelligence Exchange", "One-click \"Open in ETH\"", "One-click \"Open in ETD\""].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gold mt-0.5">▹</span> 
                    <span className={i === 0 ? "text-gold font-bold" : ""}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* v2.0 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#050505] border border-purple-500/30 p-8 flex flex-col relative overflow-hidden group hover:border-purple-500/50 transition-colors opacity-75 hover:opacity-100"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
              <div className="mb-6 border-b border-border pb-6">
                <span className="text-purple-500 text-[10px] font-bold tracking-widest uppercase mb-2 inline-flex items-center gap-2 px-2 py-1 bg-purple-500/10 border border-purple-500/20">
                  <GitCommit size={12} /> Planned
                </span>
                <h3 className="text-3xl font-display font-bold text-white mb-2">v2.0</h3>
                <p className="text-sm font-mono tracking-widest uppercase text-muted-foreground">Enterprise Exposure</p>
              </div>
              <ul className="space-y-3 font-mono text-xs text-foreground/80">
                {["AI Exposure Assistant", "Continuous Exposure Monitoring", "Cloud Exposure", "Active Directory Analysis", "API Platform", "Team Workspaces"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-500 mt-0.5 opacity-50">▹</span> 
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. CTA */}
      <section className="bg-[#030303] py-24 text-center">
         <div className="mx-auto max-w-2xl px-6">
            <h2 className="font-display text-3xl font-bold uppercase tracking-widest mb-6">Experience v1.0.0 Today</h2>
            <p className="text-muted-foreground mb-8">The frameworks are active. The heuristic rules are loaded. Ingest your telemetry and let the intelligence engine run.</p>
            <Link 
               to="/scanner" 
               className="inline-flex items-center gap-3 border border-gold bg-gold px-8 py-3 font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:glow-gold"
            >
               LAUNCH SCANNER <ArrowRight className="w-4 h-4" />
            </Link>
         </div>
      </section>
    </main>
  );
}
