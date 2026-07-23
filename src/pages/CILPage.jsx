import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Network, Activity, Target, Shield, Box, Zap, Layers } from 'lucide-react';

const IntelligenceFlow = lazy(() => import('../components/cil/IntelligenceFlow'));
const EcosystemHub = lazy(() => import('../components/cil/EcosystemHub'));
const ResponsibilityRadar = lazy(() => import('../components/cil/ResponsibilityRadar'));
const IntelligenceObjectTree = lazy(() => import('../components/cil/IntelligenceObjectTree'));
const ModularArchitecture = lazy(() => import('../components/cil/ModularArchitecture'));

// A simple fallback component while chunk is loading
const SectionLoader = () => (
  <div className="w-full min-h-[200px] flex items-center justify-center bg-black/20 border border-border/50 rounded-lg">
    <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
      <span className="h-1.5 w-1.5 bg-muted-foreground animate-pulse-dot rounded-full"></span>
      LOADING_VISUALIZATION...
    </div>
  </div>
);

export default function CILPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  const principles = [
    { title: 'Modular', desc: 'Plug and play intelligence modules', icon: Box },
    { title: 'Independent', desc: 'Each tool operates independently', icon: Activity },
    { title: 'Connected', desc: 'Shared language and schema', icon: Network },
    { title: 'Scalable', desc: 'Ready for future products', icon: Layers }
  ];

  const benefits = [
    "No duplicated analysis", "Independent deployment", "Faster communication", 
    "Future ready", "Standardized intelligence", "Modular architecture"
  ];

  return (
    <>
      <Helmet>
        <title>CyberEDT Intelligence Layer | Explain My Exposure</title>
        <meta name="description" content="The secure intelligence backbone connecting every CyberEDT application." />
      </Helmet>

      <div className="relative w-full min-h-screen bg-background overflow-hidden pb-32">
        {/* Animated Background Overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-30 z-0">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-gold/10 rounded-full blur-[150px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 -right-1/4 w-[800px] h-[800px] bg-success/10 rounded-full blur-[150px]" 
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
        </div>

        <motion.div 
          className="relative z-10 mx-auto max-w-6xl px-6 pt-16 md:pt-24 flex flex-col gap-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Section 1: Hero */}
          <motion.div variants={itemVariants} className="text-center flex flex-col items-center mt-8">
            <motion.div 
              className="inline-flex items-center justify-center p-6 rounded-3xl bg-gold/5 border border-gold/20 mb-8 relative overflow-hidden backdrop-blur-xl shadow-[0_0_40px_rgba(255,215,0,0.1)]"
              whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(255,215,0,0.2)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-gold/10 via-transparent to-white/5" />
              <Network size={56} className="text-gold relative z-10" />
            </motion.div>
            <h1 className="text-4xl md:text-7xl font-black tracking-[0.15em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-6 drop-shadow-2xl">
              CyberEDT <br className="md:hidden" />Intelligence Layer
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 text-gold text-[10px] font-bold tracking-widest uppercase mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Concept In Development
            </div>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl font-mono tracking-widest italic border-l-2 border-gold/50 pl-4 py-2">
              "The secure intelligence backbone connecting every CyberEDT application."
            </p>
          </motion.div>

          {/* Section 2: What is CIL? */}
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto text-center">
            <div className="p-8 md:p-14 border border-border/50 bg-black/40 backdrop-blur-2xl rounded-2xl relative overflow-hidden shadow-2xl group hover:border-gold/30 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/80 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -inset-x-1/2 top-0 h-[100px] bg-gradient-to-b from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
              <h2 className="text-xs font-black tracking-[0.4em] uppercase text-gold mb-8 flex items-center justify-center gap-3">
                <Box size={14} /> What is CIL? <Box size={14} />
              </h2>
              <p className="text-sm md:text-xl text-foreground/80 leading-relaxed max-w-3xl mx-auto font-light">
                CIL is a shared intelligence layer that allows CyberEDT applications to exchange standardized cybersecurity intelligence while remaining completely independent. It is <span className="text-white font-bold">not another scanner or database</span>; it is the fundamental communication layer eliminating duplicated analysis across the ecosystem.
              </p>
            </div>
          </motion.div>

          {/* Section 3: Core Philosophy */}
          <motion.div variants={itemVariants} className="w-full mt-12">
            <h2 className="text-xs font-black tracking-[0.4em] uppercase text-muted-foreground mb-12 text-center">Core Philosophy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {principles.map((p, idx) => (
                <motion.div 
                  key={idx} 
                  className="p-8 border border-white/5 bg-white/[0.02] rounded-2xl hover:bg-white/[0.04] hover:border-gold/30 transition-all duration-300 group backdrop-blur-sm relative overflow-hidden"
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <p.icon size={64} />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gold/20 transition-all">
                    <p.icon size={24} className="text-gold" />
                  </div>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-white mb-3">{p.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Section 4: Intelligence Flow */}
          <motion.div variants={itemVariants} className="w-full">
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-muted-foreground mb-8 text-center">Intelligence Flow</h2>
            <div className="w-full border border-border bg-card/30 rounded-xl p-4 md:p-8 backdrop-blur-sm">
              <Suspense fallback={<SectionLoader />}>
                <IntelligenceFlow />
              </Suspense>
            </div>
          </motion.div>

          {/* Section 5: Ecosystem Hub */}
          <motion.div variants={itemVariants} className="w-full">
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-muted-foreground mb-8 text-center">CyberEDT Ecosystem</h2>
            <div className="w-full border border-border bg-black/60 rounded-xl p-4 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.05)_0%,transparent_70%)]" />
              <Suspense fallback={<SectionLoader />}>
                <EcosystemHub />
              </Suspense>
            </div>
          </motion.div>

          {/* Section 6: Responsibilities */}
          <motion.div variants={itemVariants} className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-muted-foreground mb-2">Single Responsibility</h2>
              
              <div className="p-5 border-l-4 border-success bg-success/5 rounded-r-lg hover:bg-success/10 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <Activity size={16} className="text-success" />
                  <h3 className="text-xs font-bold tracking-widest uppercase text-success">EME</h3>
                </div>
                <p className="text-sm text-foreground">"What is exposed?"</p>
              </div>

              <div className="p-5 border-l-4 border-danger bg-danger/5 rounded-r-lg hover:bg-danger/10 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <Target size={16} className="text-danger" />
                  <h3 className="text-xs font-bold tracking-widest uppercase text-danger">ETH</h3>
                </div>
                <p className="text-sm text-foreground">"How would an attacker exploit this?"</p>
              </div>

              <div className="p-5 border-l-4 border-[#38bdf8] bg-[#38bdf8]/5 rounded-r-lg hover:bg-[#38bdf8]/10 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <Shield size={16} className="text-[#38bdf8]" />
                  <h3 className="text-xs font-bold tracking-widest uppercase text-[#38bdf8]">ETD</h3>
                </div>
                <p className="text-sm text-foreground">"How should it be defended?"</p>
              </div>
            </div>
            
            <div className="w-full flex justify-center bg-black/40 border border-border p-4 rounded-xl">
              <Suspense fallback={<SectionLoader />}>
                <ResponsibilityRadar />
              </Suspense>
            </div>
          </motion.div>

          {/* Section 7: Shared Intelligence Object */}
          <motion.div variants={itemVariants} className="w-full">
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-muted-foreground mb-8 text-center">Shared Intelligence Object</h2>
            <div className="max-w-3xl mx-auto">
              <Suspense fallback={<SectionLoader />}>
                <IntelligenceObjectTree />
              </Suspense>
            </div>
          </motion.div>

          {/* Section 8: Benefits */}
          <motion.div variants={itemVariants} className="w-full">
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-muted-foreground mb-8 text-center">Key Benefits</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 border border-border bg-card/40 rounded-lg">
                  <Zap size={14} className="text-gold shrink-0" />
                  <span className="text-[11px] font-bold tracking-widest uppercase text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section 9: Future Ecosystem */}
          <motion.div variants={itemVariants} className="w-full">
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-muted-foreground mb-8 text-center">Future Ecosystem</h2>
            <div className="w-full border border-border bg-card/30 rounded-xl p-4 md:p-8 backdrop-blur-sm overflow-hidden">
              <Suspense fallback={<SectionLoader />}>
                <ModularArchitecture />
              </Suspense>
            </div>
          </motion.div>

          {/* Section 10: Closing */}
          <motion.div variants={itemVariants} className="text-center py-12 border-t border-border mt-12">
            <h2 className="text-lg md:text-2xl font-bold tracking-[0.2em] uppercase text-foreground mb-4">
              One Intelligence Layer.
            </h2>
            <h2 className="text-lg md:text-2xl font-bold tracking-[0.2em] uppercase text-foreground mb-8 opacity-70">
              Multiple Cybersecurity Applications.
            </h2>
            <div className="inline-block px-8 py-3 bg-gold/10 border border-gold text-gold text-sm font-bold tracking-[0.3em] uppercase rounded-full">
              Infinite Possibilities.
            </div>
          </motion.div>

        </motion.div>
      </div>
    </>
  );
}
