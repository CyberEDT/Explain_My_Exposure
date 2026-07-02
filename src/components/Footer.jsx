import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] border-t border-border mt-20 font-mono text-[#fafafa]">
      <div className="mx-auto max-w-[1600px] px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Branding */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="EME Hacker Logo" className="w-8 h-8 object-contain" />
              <span className="font-display font-bold tracking-widest text-3xl text-foreground">EME</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[280px]">
              Explain My Exposure. Sister product to <a href="https://explainthehacker.cyberedt.com/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Explain The Hacker</a>. Built by <a href="http://www.cyberedt.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">CyberEDT</a>.
            </p>
          </div>

          {/* Column 2: PRODUCT */}
          <div className="col-span-1">
            <div className="text-[10px] uppercase tracking-[0.2em] text-gold">PRODUCT</div>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              <li><Link to="/engine" className="hover:text-foreground transition-colors">// Engine</Link></li>
              <li><Link to="/mitre" className="hover:text-foreground transition-colors">// MITRE Grid</Link></li>
              <li><Link to="/scanner" className="hover:text-foreground transition-colors">// Discover</Link></li>
              <li><Link to="/report" className="hover:text-foreground transition-colors">// Report</Link></li>
            </ul>
          </div>

          {/* Column 3: DOCS */}
          <div className="col-span-1">
            <h4 className="text-gold text-xs font-bold tracking-widest mb-6">DOCS</h4>
            <ul className="space-y-4 text-xs text-muted-foreground">
              <li><Link to="/exposure-model" className="hover:text-foreground transition-colors">// Exposure Model</Link></li>
              <li><Link to="/rules" className="hover:text-foreground transition-colors">// Host Rules</Link></li>
              <li><Link to="/kb" className="hover:text-foreground transition-colors">// Knowledge Base</Link></li>
              <li><Link to="/changelog" className="hover:text-foreground transition-colors">// Changelog</Link></li>
            </ul>
          </div>

          {/* Column 4: ECOSYSTEM */}
          <div className="col-span-1">
            <h4 className="text-gold text-xs font-bold tracking-widest mb-6">ECOSYSTEM</h4>
            <ul className="space-y-4 text-xs text-muted-foreground">
              <li><a href="https://github.com/CyberEDT/Explain_My_Exposure" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">// Source on GitHub</a></li>
              <li><a href="https://explainthehacker.cyberedt.com/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">// Explain The Hacker</a></li>
              <li><a href="http://www.cyberedt.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">// CyberEDT</a></li>
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">// Privacy</Link></li>
              <li><Link to="/status" className="hover:text-foreground transition-colors">// Status</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>&copy; 2026 CyberEDT &mdash; LOCAL-FIRST, PRIVACY-HARDENED</span>
          <div className="text-[10px] tracking-widest text-muted-foreground flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            ALL SYSTEMS NOMINAL <span className="opacity-50 ml-2">V.1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
