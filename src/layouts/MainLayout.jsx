import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useExposure } from '../contexts/ExposureContext';
import Footer from '../components/Footer';
import MobileTabBar from '../components/common/MobileTabBar';
import useDevice from '../hooks/useDevice';
import { Menu, X, Activity, Cpu, Grid, Shield, Database, FileText, Code } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/scanner', label: 'ingest', icon: Activity },
  { path: '/exposure-model', label: 'exposure model', icon: Shield },
  { path: '/engine', label: 'engine', icon: Cpu },
  { path: '/mitre', label: 'mitre', icon: Grid },
  { path: '/kb', label: 'knowledge base', icon: Database },
  { path: '/report', label: 'report', icon: FileText },
];

export default function MainLayout({ children }) {
  const { scanResult } = useExposure();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const { isMobile, isIOS } = useDevice();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Determine if we should show the mobile bottom tab bar
  const showMobileTabs = isMobile && !isLandingPage;

  return (
    <div className="relative min-h-screen overflow-x-hidden font-mono bg-background text-foreground selection:bg-gold/30 selection:text-white">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-6 text-[11px] uppercase tracking-[0.2em]">
          <Link to="/" className="flex items-center gap-2 font-bold tracking-[0.3em] text-foreground z-50">
            <span className="inline-block h-2 w-2 bg-gold animate-pulse-dot"></span>
            EME_/_EXPLAIN_MY_EXPOSURE
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {isLandingPage ? (
              <Link to="/scanner" className="text-muted-foreground hover:text-gold transition-colors flex items-center gap-1.5">
                <Activity size={12} />
                // scanner
              </Link>
            ) : (
              <>
                {NAV_ITEMS.map((item) => {
                  const isActive = location.pathname.startsWith(item.path);
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={item.path} 
                      to={item.path} 
                      className={`flex items-center gap-1.5 transition-colors ${isActive ? 'text-gold font-bold' : 'text-muted-foreground hover:text-gold/70'}`}
                    >
                      <Icon size={12} className={isActive ? 'text-gold' : 'opacity-70'} />
                      // {item.label}
                    </Link>
                  );
                })}
              </>
            )}
            <a href="http://www.cyberedt.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 transition-colors font-bold ml-4 border-l border-border pl-6">
              CYBEREDT
            </a>
            <a href="https://github.com/CyberEDT/Explain_My_Exposure" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold transition-colors ml-4" title="View Source on GitHub">
              <Code size={14} />
            </a>
          </nav>

          {/* Mobile Toggle Button (Hidden if using Bottom Tabs) */}
          {!showMobileTabs && (
            <button 
              className="md:hidden text-foreground hover:text-gold transition-colors z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>

        {/* Mobile Dropdown Overlay */}
        {mobileMenuOpen && !showMobileTabs && (
          <div className="md:hidden absolute top-14 left-0 w-full bg-background/95 border-b border-border backdrop-blur-xl animate-in slide-in-from-top-2 duration-200 z-40">
            <nav className="flex flex-col p-6 gap-6 text-[11px] uppercase tracking-[0.2em]">
              {isLandingPage ? (
                <Link to="/scanner" className="text-muted-foreground hover:text-gold flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <Activity size={14} /> // scanner
                </Link>
              ) : (
                NAV_ITEMS.map((item) => {
                  const isActive = location.pathname.startsWith(item.path);
                  const Icon = item.icon;
                  return (
                    <Link 
                      key={item.path} 
                      to={item.path} 
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 transition-colors ${isActive ? 'text-gold font-bold' : 'text-muted-foreground hover:text-gold/70'}`}
                    >
                      <Icon size={14} className={isActive ? 'text-gold' : 'opacity-70'} />
                      // {item.label}
                    </Link>
                  );
                })
              )}
              <div className="w-full h-px bg-border my-2"></div>
              <a href="http://www.cyberedt.com" target="_blank" rel="noopener noreferrer" className="text-gold font-bold flex items-center gap-2 border-t border-border pt-4 mt-2">
                CYBEREDT
              </a>
              <a href="https://github.com/CyberEDT/Explain_My_Exposure" target="_blank" rel="noopener noreferrer" className="text-muted-foreground flex items-center gap-2">
                <Code size={14} />
                // GITHUB REPO
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Live Threat Ticker Tape */}
      <div className="border-b border-border bg-black/40 py-2 overflow-hidden">
        <div className="flex w-max animate-ticker gap-10 whitespace-nowrap text-[11px]">
          <span className="flex items-center gap-3 px-2">
            <span className="text-danger font-bold">CRITICAL</span>
            <span className="text-muted-foreground">Domain Controller exposing SMB(445) & RDP(3389) — Exposure Score 71/100</span>
            <span className="text-border">·</span>
          </span>
          <span className="flex items-center gap-3 px-2">
            <span className="text-gold font-bold">DETECTED</span>
            <span className="text-muted-foreground">Anonymous FTP write enabled on prod database host</span>
            <span className="text-border">·</span>
          </span>
          <span className="flex items-center gap-3 px-2">
            <span className="text-success font-bold">MITIGATED</span>
            <span className="text-muted-foreground">Legacy SMBv1 channel disabled across finance subnet</span>
            <span className="text-border">·</span>
          </span>
          <span className="flex items-center gap-3 px-2">
            <span className="text-warn font-bold">HIGH</span>
            <span className="text-muted-foreground">Kerberoastable SPN identified on tier-0 service account</span>
            <span className="text-border">·</span>
          </span>
          <span className="flex items-center gap-3 px-2">
            <span className="text-gold font-bold">DETECTED</span>
            <span className="text-muted-foreground">Pivot chain RDP → SMB → LDAP discovered in DMZ</span>
            <span className="text-border">·</span>
          </span>
          <span className="flex items-center gap-3 px-2">
            <span className="text-danger font-bold">CRITICAL</span>
            <span className="text-muted-foreground">Unauthenticated MySQL bind on 0.0.0.0 — internet reachable</span>
            <span className="text-border">·</span>
          </span>
          <span className="flex items-center gap-3 px-2">
            <span className="text-success font-bold">MITIGATED</span>
            <span className="text-muted-foreground">Telnet(23) replaced by SSH key-only on jump hosts</span>
            <span className="text-border">·</span>
          </span>
          <span className="flex items-center gap-3 px-2">
            <span className="text-warn font-bold">HIGH</span>
            <span className="text-muted-foreground">Web admin panel exposed without IP allowlist — T1190</span>
            <span className="text-border">·</span>
          </span>
          
          {/* Duplicate to ensure seamless looping marquee */}
          <span className="flex items-center gap-3 px-2">
            <span className="text-danger font-bold">CRITICAL</span>
            <span className="text-muted-foreground">Domain Controller exposing SMB(445) & RDP(3389) — Exposure Score 71/100</span>
            <span className="text-border">·</span>
          </span>
          <span className="flex items-center gap-3 px-2">
            <span className="text-gold font-bold">DETECTED</span>
            <span className="text-muted-foreground">Anonymous FTP write enabled on prod database host</span>
            <span className="text-border">·</span>
          </span>
          <span className="flex items-center gap-3 px-2">
            <span className="text-success font-bold">MITIGATED</span>
            <span className="text-muted-foreground">Legacy SMBv1 channel disabled across finance subnet</span>
            <span className="text-border">·</span>
          </span>
          <span className="flex items-center gap-3 px-2">
            <span className="text-warn font-bold">HIGH</span>
            <span className="text-muted-foreground">Kerberoastable SPN identified on tier-0 service account</span>
            <span className="text-border">·</span>
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className={`mx-auto max-w-[1600px] bg-background overflow-hidden relative z-10 min-h-[calc(100vh-3.5rem)] flex flex-col ${showMobileTabs ? 'pb-24' : ''} ${isIOS && showMobileTabs ? 'pb-28' : ''}`}>
        {children}
      </main>

      <Footer />
      
      {/* Mobile Sticky Bottom Navigation */}
      {showMobileTabs && <MobileTabBar />}
    </div>
  );
}
