import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Shield, Cpu, Grid, Database, FileText } from 'lucide-react';
import useDevice from '../../hooks/useDevice';

const NAV_ITEMS = [
  { path: '/scanner', label: 'Scan', icon: Activity },
  { path: '/exposure-model', label: 'Chain', icon: Shield },
  { path: '/engine', label: 'Engine', icon: Cpu },
  { path: '/report', label: 'Report', icon: FileText },
];

export default function MobileTabBar() {
  const location = useLocation();
  const { isIOS } = useDevice();
  const isLandingPage = location.pathname === '/';

  // Do not show the tab bar on the landing page for a cleaner entry
  if (isLandingPage) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 w-full bg-background/95 backdrop-blur-xl border-t border-border z-[100] pb-[env(safe-area-inset-bottom,0px)] ${isIOS ? 'pb-6' : 'pb-2'}`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 16px)' }}
    >
      <nav className="flex items-center justify-around px-2 pt-2 pb-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`flex flex-col items-center justify-center w-16 gap-1 transition-colors ${isActive ? 'text-gold' : 'text-muted-foreground hover:text-gold/70'}`}
            >
              <Icon size={20} className={isActive ? 'text-gold' : 'opacity-70'} />
              <span className={`text-[9px] uppercase tracking-wider font-bold ${isActive ? 'text-gold' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
