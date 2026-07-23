import React, { useEffect } from 'react';
import SeoMeta from '../components/seo/SeoMeta';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, GitCommit, CheckCircle2, Clock, Map, BookOpen, Settings, Star } from 'lucide-react';

export default function ChangelogPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const releases = [
    {
      version: 'v1.0.0',
      date: '2026-06-12',
      theme: 'The Framework Foundation',
      highlight: 'Complete deployment of the five core intelligence frameworks, transitioning EME from an experimental concept to a fully operational local-first analysis tool.',
      updates: [
        { type: 'NEW', icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', label: 'Features', text: 'Implementation of local storage persistence for historical scan retention.' },
        { type: 'FRAMEWORK', icon: Settings, color: 'text-gold', bg: 'bg-gold/10', label: 'Framework Changes', text: 'Introduction of the EME Exposure Chain™ (Discover → Enumerate → Access → Abuse → Impact).' },
        { type: 'MAP', icon: Map, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'MITRE Mapping', text: 'Direct translation of raw port exposures to deterministic MITRE ATT&CK techniques (v0.3 Integration).' },
        { type: 'KB', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-500/10', label: 'Knowledge Base', text: 'Launch of the Service Intelligence Database covering 13 critical protocols.' }
      ]
    },
    {
      version: 'v0.3',
      date: '2026-06-10',
      theme: 'The Intelligence Engine',
      highlight: 'Formalized the 9-stage Nmap XML parsing pipeline and transitioned from raw data extraction to contextual storytelling.',
      updates: [
        { type: 'IMPROVED', icon: ArrowRight, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'Improvements', text: 'Overhauled the scanning engine to generate narrative context and "Attacker Interest" scoring.' },
        { type: 'NEW', icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', label: 'Features', text: 'Added initial proof-of-concept MITRE ATT&CK translation capabilities.' }
      ]
    },
    {
      version: 'v0.2',
      date: '2026-06-08',
      theme: 'Asset Inference',
      highlight: 'Deployed the Asset Identification heuristic engine.',
      updates: [
        { type: 'FRAMEWORK', icon: Settings, color: 'text-gold', bg: 'bg-gold/10', label: 'Framework Changes', text: 'Implemented deterministic port math logic (e.g., # 445 + 88 + 389 = DOMAIN_CONTROLLER).' },
        { type: 'IMPROVED', icon: ArrowRight, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'Improvements', text: 'Added dynamic Confidence Scoring based on supporting port clusters.' }
      ]
    },
    {
      version: 'v0.1',
      date: '2026-06-01',
      theme: 'Project Genesis',
      highlight: 'Initial proof-of-concept for the Explain My Exposure platform.',
      updates: [
        { type: 'NEW', icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', label: 'Features', text: 'Basic Nmap XML parsing logic.' },
        { type: 'NEW', icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', label: 'Features', text: 'Raw Recharts visualizations for host distribution.' }
      ]
    }
  ];

  return (
    <main className="relative min-h-screen bg-[#030303] text-[#fafafa] font-mono selection:bg-gold selection:text-black">
      <SeoMeta title="Changelog" />
      
      {/* 1. Hero / Header Section */}
      <section className="relative overflow-hidden border-b border-border min-h-[50vh] flex flex-col justify-center">
        {/* Subtle Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100%_40px] opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/80 to-[#030303]"></div>
        
        <div className="relative mx-auto max-w-[1200px] w-full px-6 text-center z-10 mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 border border-gold/30 bg-gold/5 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-gold mb-8 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 bg-gold rounded-full animate-pulse-dot"></span> // PLATFORM EVOLUTION
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6"
          >
            EME <span className="text-muted-foreground">Changelog</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mx-auto max-w-2xl text-base text-muted-foreground font-mono leading-relaxed mb-12"
          >
            Tracking the continuous evolution of the EME deterministic intelligence engine, heuristic frameworks, and platform capabilities.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="inline-flex items-center gap-3 border border-success bg-success/10 px-4 py-2 text-xs uppercase tracking-widest text-success font-bold"
          >
            <CheckCircle2 className="w-4 h-4" /> ENGINE V.1.0.0-PROD
          </motion.div>
        </div>
      </section>

      {/* 2. The Timeline Architecture */}
      <section className="bg-background py-20 lg:py-32 border-b border-border relative">
         <div className="mx-auto max-w-[1200px] px-6 relative">
            
            {/* The Vertical Line (Desktop: Center, Mobile: Left) */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2"></div>

            <div className="space-y-24">
               {releases.map((release, idx) => {
                 const isEven = idx % 2 === 0;
                 return (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, y: 40 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 0.7 }}
                     className="relative flex flex-col md:flex-row items-start md:items-center justify-between w-full"
                   >
                     {/* Center Node */}
                     <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-black border-4 border-gold md:-translate-x-1/2 shadow-[0_0_15px_rgba(255,191,0,0.5)] z-10"></div>
                     
                     {/* Left Side (Empty on even, Card on odd on Desktop) */}
                     <div className={`w-full md:w-[45%] pl-10 md:pl-0 ${isEven ? 'md:pr-16 md:text-right order-2 md:order-1' : 'md:pl-16 order-2'}`}>
                       <div className={`bg-[#050505] border border-border p-8 hover:border-gold/30 transition-colors ${idx === 0 ? 'border-gold/50 shadow-[0_0_30px_rgba(255,191,0,0.05)]' : ''}`}>
                         
                         {/* Card Header */}
                         <div className={`flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'} mb-6 border-b border-border pb-6`}>
                           <div className="font-display text-4xl font-bold text-foreground mb-2">{release.version}</div>
                           <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground font-mono">
                             <Clock className="w-3 h-3" /> {release.date}
                           </div>
                           <div className={`mt-4 px-3 py-1 text-[10px] uppercase tracking-widest font-bold bg-black border ${idx === 0 ? 'border-gold text-gold' : 'border-border text-foreground'}`}>
                             {release.theme}
                           </div>
                         </div>

                         {/* Highlight */}
                         <div className="mb-8">
                           <p className="text-sm text-foreground/90 leading-relaxed font-mono italic border-l-2 border-gold pl-4 py-1">
                             "{release.highlight}"
                           </p>
                         </div>

                         {/* Updates */}
                         <div className="space-y-4 text-left">
                            {release.updates.map((update, uIdx) => {
                              return (
                               <div key={uIdx} className="flex items-start gap-4">
                                 <div className={`shrink-0 mt-1 px-2 py-0.5 border flex items-center gap-1 text-[9px] uppercase tracking-widest font-bold ${update.color} ${update.bg} border-current w-24 justify-center`}>
                                   {update.type}
                                 </div>
                                 <div>
                                   <div className="text-xs font-bold text-foreground mb-1">{update.label}</div>
                                   <div className="text-xs text-muted-foreground leading-relaxed font-mono">{update.text}</div>
                                 </div>
                               </div>
                             );
                           })}
                         </div>

                       </div>
                     </div>
                     
                     {/* Empty Spacer for alternating layout */}
                     <div className="hidden md:block w-full md:w-[45%] order-1 md:order-2"></div>
                   </motion.div>
                 );
               })}
            {/* 3. Link to Full Roadmap */}
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="relative mt-32 pt-20 border-t border-border/50 text-center"
            >
               <h2 className="font-display text-3xl font-bold uppercase tracking-widest text-foreground mb-6">Looking Ahead</h2>
               <p className="text-muted-foreground font-mono max-w-2xl mx-auto mb-8">
                 Curious what comes next? View our comprehensive product roadmap detailing the path toward full CIL integration and enterprise features.
               </p>
               <Link 
                 to="/roadmap" 
                 className="inline-flex items-center gap-3 border border-gold/50 text-gold hover:bg-gold hover:text-black px-8 py-3 font-bold uppercase tracking-[0.2em] transition-all"
               >
                 VIEW PRODUCT ROADMAP <ArrowRight className="w-4 h-4" />
               </Link>
            </motion.div>

         </div>
      </section>

      {/* 4. CTA */}
      <section className="bg-[#030303] py-24 text-center border-t border-border">
         <div className="mx-auto max-w-2xl px-6">
            <h2 className="font-display text-3xl font-bold uppercase tracking-widest mb-6">Experience v1.0.0</h2>
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
