import React from 'react';
import { motion } from 'framer-motion';
import { Database, Shield, Activity, Target, ArrowRight } from 'lucide-react';

const steps = [
  { id: 'nmap', title: 'Input', subtitle: 'Nmap Scan', icon: Database, color: 'text-muted-foreground', borderColor: 'border-border' },
  { id: 'eme', title: 'EME', subtitle: 'Produces Exposure Intelligence', icon: Activity, color: 'text-success', borderColor: 'border-success/30' },
  { id: 'eth', title: 'ETH', subtitle: 'Produces Threat Intelligence', icon: Target, color: 'text-danger', borderColor: 'border-danger/30' },
  { id: 'etd', title: 'ETD', subtitle: 'Produces Defensive Intelligence', icon: Shield, color: 'text-[#38bdf8]', borderColor: 'border-[#38bdf8]/30' }
];

export default function IntelligenceFlow() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="w-full py-12 flex flex-col items-center">
      <motion.div 
        className="flex flex-col md:flex-row items-center gap-4 md:gap-2 w-full max-w-5xl justify-between"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.id}>
              <motion.div variants={itemVariants} className="flex-1 w-full md:w-auto flex flex-col items-center group cursor-default">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center border border-white/10 bg-black/80 mb-6 group-hover:scale-110 transition-all duration-500 relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] group-hover:border-white/20`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Icon size={28} className={`${step.color} relative z-10`} />
                </div>
                <h4 className={`text-sm font-bold uppercase tracking-widest ${step.color}`}>{step.title}</h4>
                <p className="text-[11px] text-foreground/70 text-center mt-2 px-2 max-w-[120px]">
                  {step.subtitle}
                </p>
              </motion.div>
              
              {index < steps.length - 1 && (
                <motion.div variants={itemVariants} className="hidden md:flex flex-col items-center justify-center px-2">
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight size={18} className="text-muted-foreground/60" />
                  </motion.div>
                </motion.div>
              )}
              {index < steps.length - 1 && (
                <motion.div variants={itemVariants} className="flex md:hidden h-8 items-center justify-center">
                  <div className="w-px h-full bg-muted-foreground/30" />
                </motion.div>
              )}
            </React.Fragment>
          );
        })}
      </motion.div>
    </div>
  );
}
