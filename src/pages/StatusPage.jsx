import React, { useEffect } from 'react';
import SeoMeta from '../components/seo/SeoMeta';
import { Activity, Clock, AlertCircle, Info } from 'lucide-react';
import { BarChart, Bar, Cell, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function StatusPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 90-day mock data (all 100 except a couple of days)
  const uptimeData = React.useMemo(() => {
    const now = 1720828800000; // Static date to maintain pure function component constraints
    return Array.from({ length: 90 }).map((_, i) => {
      let uptime = 100;
      if (i === 75) uptime = 98; // Minor outage
      if (i === 40) uptime = 99.5; // Maintenance
      
      let color = '#22c55e'; // success
      if (uptime < 99) color = '#eab308'; // warning
      if (uptime < 95) color = '#ef4444'; // danger
      
      return {
        day: 90 - i,
        uptime,
        color,
        date: new Date(now - (90 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
    });
  }, []);

  // Sparkline data
  const sparklineData = [
    { v: 10 }, { v: 15 }, { v: 25 }, { v: 22 }, { v: 45 }, { v: 60 }, { v: 80 }, { v: 120 }
  ];

  const services = [
    { name: 'Parser Engine', desc: 'Processes Nmap XML uploads.', status: 'operational' },
    { name: 'Asset ID Engine', desc: 'Identifies asset types and profiles.', status: 'operational' },
    { name: 'Exposure Engine', desc: 'Generates exposure intelligence.', status: 'operational' },
    { name: 'Chain Engine', desc: 'Maps findings into Exposure Chain stages.', status: 'operational' },
    { name: 'Narrative Engine', desc: 'Generates attacker-perspective narratives.', status: 'operational' },
    { name: 'Visualization Engine', desc: 'Generates charts and dashboards.', status: 'operational' },
    { name: 'MITRE Grid', desc: 'Maps findings to ATT&CK techniques.', status: 'operational' },
    { name: 'Report Generator', desc: 'Creates downloadable reports.', status: 'operational' },
    { name: 'Knowledge Base', desc: 'Service intelligence database.', status: 'operational' }
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'operational': return { color: 'text-success', bg: 'bg-success', label: 'Operational' };
      case 'degraded': return { color: 'text-warning', bg: 'bg-warning', label: 'Degraded Performance' };
      case 'partial': return { color: 'text-[#f97316]', bg: 'bg-[#f97316]', label: 'Partial Outage' };
      case 'major': return { color: 'text-danger', bg: 'bg-danger', label: 'Major Outage' };
      case 'maintenance': return { color: 'text-blue-500', bg: 'bg-blue-500', label: 'Maintenance' };
      default: return { color: 'text-muted-foreground', bg: 'bg-muted-foreground', label: 'Unknown' };
    }
  };

  return (
    <main className="relative min-h-screen bg-[#030303] text-[#fafafa] font-mono selection:bg-gold selection:text-black">
      <SeoMeta title="Status" />
      
      {/* 1. Hero / Header Section */}
      <section className="bg-[#050505] border-b border-border py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 border border-gold/30 bg-gold/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-gold mb-6">
                <Activity className="w-3 h-3" /> // OPERATIONAL METRICS
              </div>
              <h1 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4">
                System Status
              </h1>
              <p className="text-muted-foreground max-w-xl leading-relaxed">
                Real-time operational status of EME services and infrastructure.
              </p>
            </div>
            
            <div className="text-right text-xs uppercase tracking-widest space-y-2 font-bold">
              <div className="text-muted-foreground">Last Updated: <span className="text-foreground animate-pulse">Live (Refreshing)</span></div>
              <div className="text-muted-foreground">Platform Health: <span className="text-success">100%</span></div>
              <div className="text-muted-foreground">90-Day Uptime: <span className="text-foreground">99.99%</span></div>
            </div>
          </div>

          <div className="w-full border-2 border-success/50 bg-[#0a1a0c] p-6 md:p-10 flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.1)]">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-success uppercase tracking-widest flex items-center gap-6">
              <span className="w-4 h-4 md:w-6 md:h-6 bg-success rounded-full animate-pulse-dot"></span>
              ALL SYSTEMS OPERATIONAL
            </h2>
          </div>
        </div>
      </section>

      {/* 2. Service Status Grid */}
      <section className="py-20 border-b border-border bg-background">
         <div className="mx-auto max-w-[1200px] px-6">
            <h3 className="text-xl font-bold uppercase tracking-widest text-foreground mb-8">Core Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {services.map((svc, i) => {
                 const conf = getStatusConfig(svc.status);
                 return (
                   <div key={i} className="bg-black border border-border p-6 hover:border-gold/30 transition-colors">
                     <div className="flex justify-between items-start mb-4">
                       <h4 className="font-bold text-foreground text-lg">{svc.name}</h4>
                       <div className={`flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold ${conf.color}`}>
                         {conf.label} <span className={`w-2 h-2 rounded-full ${conf.bg} ${svc.status === 'operational' ? 'animate-pulse' : ''}`}></span>
                       </div>
                     </div>
                     <p className="text-xs text-muted-foreground leading-relaxed">{svc.desc}</p>
                   </div>
                 )
               })}
            </div>
         </div>
      </section>

      {/* 3. Uptime & Reliability Visualization */}
      <section className="py-20 border-b border-border bg-[#050505]">
         <div className="mx-auto max-w-[1200px] px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h3 className="text-xl font-bold uppercase tracking-widest text-foreground">90-Day Uptime History</h3>
              <div className="flex gap-6 text-xs font-bold uppercase tracking-widest">
                <div className="text-muted-foreground">24H: <span className="text-success">100%</span></div>
                <div className="text-muted-foreground">7D: <span className="text-success">99.99%</span></div>
                <div className="text-muted-foreground">30D: <span className="text-success">99.98%</span></div>
                <div className="text-muted-foreground">90D: <span className="text-success">99.99%</span></div>
              </div>
            </div>

            <div className="h-32 w-full bg-black border border-border p-4 relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={uptimeData} barCategoryGap="10%">
                  <Tooltip 
                    cursor={{fill: '#222'}} 
                    contentStyle={{ backgroundColor: '#000', borderColor: '#333', fontSize: '10px', textTransform: 'uppercase' }} 
                    labelFormatter={(label, payload) => payload[0]?.payload.date}
                    formatter={(value) => [`${value}%`, 'Uptime']}
                  />
                  <Bar dataKey="uptime" minPointSize={2}>
                    {uptimeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              
              <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] text-muted-foreground uppercase tracking-widest">
                <span>90 Days Ago</span>
                <span>Today</span>
              </div>
            </div>
         </div>
      </section>

      {/* 4. Incident History & Maintenance */}
      <section className="py-24 border-b border-border bg-background">
         <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Past Incidents */}
              <div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-foreground mb-12 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-muted-foreground" /> Incident History
                </h3>
                
                <div className="relative border-l border-border ml-2 space-y-12">
                  
                  {/* Incident 1 */}
                  <div className="relative pl-8">
                    <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-warning border-2 border-background"></div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">June 2026</div>
                    <div className="bg-black border border-border p-6 hover:border-warning/50 transition-colors">
                      <div className="flex justify-between items-start mb-6">
                        <h4 className="text-lg font-bold text-foreground">Parser Service Delay</h4>
                        <span className="bg-success/10 text-success border border-success/30 px-3 py-1 text-[10px] uppercase tracking-widest font-bold">Resolved</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-xs font-mono mb-4 border-b border-border pb-4">
                        <div><span className="text-muted-foreground block mb-1 uppercase tracking-widest text-[9px]">Duration</span><span className="font-bold">12 Minutes</span></div>
                        <div><span className="text-muted-foreground block mb-1 uppercase tracking-widest text-[9px]">Impact</span><span className="font-bold text-warning">Low</span></div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">High volume of 500MB+ Nmap XML files caused a queue backup. Auto-scaling groups successfully mitigated the load.</p>
                    </div>
                  </div>

                  {/* Incident 2 */}
                  <div className="relative pl-8">
                    <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-background"></div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">June 2026</div>
                    <div className="bg-black border border-border p-6 hover:border-blue-500/50 transition-colors">
                      <div className="flex justify-between items-start mb-6">
                        <h4 className="text-lg font-bold text-foreground">MITRE Grid Maintenance</h4>
                        <span className="bg-success/10 text-success border border-success/30 px-3 py-1 text-[10px] uppercase tracking-widest font-bold">Resolved</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-xs font-mono border-b border-border pb-4 mb-4">
                        <div><span className="text-muted-foreground block mb-1 uppercase tracking-widest text-[9px]">Duration</span><span className="font-bold">25 Minutes</span></div>
                        <div><span className="text-muted-foreground block mb-1 uppercase tracking-widest text-[9px]">Impact</span><span className="font-bold">None</span></div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">Routine maintenance to update technique mappings.</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Scheduled Maintenance */}
              <div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-foreground mb-12 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-500" /> Scheduled Maintenance
                </h3>
                
                <div className="bg-[#050505] border border-blue-500/30 p-8 shadow-[0_0_30px_rgba(59,130,246,0.05)]">
                  <div className="text-[10px] uppercase tracking-widest text-blue-500 font-bold mb-4 flex items-center gap-2">
                    <Info className="w-3 h-3" /> JULY 10, 2026
                  </div>
                  <h4 className="text-2xl font-display font-bold text-foreground mb-6">Knowledge Base Update</h4>
                  
                  <div className="grid grid-cols-2 gap-6 text-xs font-mono mb-6 bg-black border border-border p-4">
                    <div><span className="text-muted-foreground block mb-1 uppercase tracking-widest text-[9px]">Expected Impact</span><span className="font-bold text-success">None</span></div>
                    <div><span className="text-muted-foreground block mb-1 uppercase tracking-widest text-[9px]">Duration</span><span className="font-bold">15 Minutes</span></div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Pushing 50+ new IoT heuristic signatures to the live database. The Parser and Exposure engines will continue to operate normally using the cached v1.0.0 ruleset during the update.
                  </p>
                </div>
              </div>

            </div>
         </div>
      </section>

      {/* 5. Platform Metrics */}
      <section className="py-24 border-b border-border bg-[#050505]">
         <div className="mx-auto max-w-[1200px] px-6">
            <h3 className="text-center font-display text-3xl font-bold uppercase tracking-widest text-foreground mb-12">
              Operational Scale
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-black border border-border p-6 flex flex-col justify-between">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Analyses Completed</div>
                <div className="font-display text-4xl font-bold text-gold">142,850</div>
                <div className="h-12 mt-4 w-full opacity-50">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sparklineData}><Line type="monotone" dataKey="v" stroke="#ffbf00" strokeWidth={2} dot={false} /></LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-black border border-border p-6 flex flex-col justify-between">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Reports Generated</div>
                <div className="font-display text-4xl font-bold text-foreground">89,400</div>
                <div className="h-12 mt-4 w-full opacity-50">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sparklineData}><Line type="monotone" dataKey="v" stroke="#fff" strokeWidth={2} dot={false} /></LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-black border border-border p-6 flex flex-col justify-between">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Chains Processed</div>
                <div className="font-display text-4xl font-bold text-danger">1.2M</div>
                <div className="h-12 mt-4 w-full opacity-50">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sparklineData}><Line type="monotone" dataKey="v" stroke="#ef4444" strokeWidth={2} dot={false} /></LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-black border border-border p-6 flex flex-col justify-between">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Avg Analysis Time</div>
                <div className="font-display text-4xl font-bold text-blue-500">45ms</div>
                <div className="h-12 mt-4 w-full opacity-50 flex items-center justify-end">
                  <span className="text-[10px] uppercase tracking-widest text-success border border-success/30 bg-success/10 px-2 py-1">OPTIMAL</span>
                </div>
              </div>

            </div>
         </div>
      </section>

      {/* 6. Roadmap */}
      <section className="py-24 bg-background">
         <div className="mx-auto max-w-[1200px] px-6">
            <h3 className="text-xl font-bold uppercase tracking-widest text-foreground mb-8">Feature Roadmap</h3>
            
            <div className="bg-black border border-border">
              <table className="w-full text-left font-mono text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground uppercase tracking-widest text-[10px]">
                    <th className="p-6 font-bold">Feature Initiative</th>
                    <th className="p-6 font-bold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-6 font-bold text-foreground">Multi-Host Analysis Dashboard</td>
                    <td className="p-6 text-right"><span className="inline-block border border-warning text-warning bg-warning/10 px-3 py-1 text-[10px] uppercase tracking-widest font-bold">In Development</span></td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-6 font-bold text-foreground">Active Directory Analyzer</td>
                    <td className="p-6 text-right"><span className="inline-block border border-blue-500 text-blue-500 bg-blue-500/10 px-3 py-1 text-[10px] uppercase tracking-widest font-bold">Testing</span></td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-6 font-bold text-foreground">Cloud Exposure Support (AWS/GCP)</td>
                    <td className="p-6 text-right"><span className="inline-block border border-border text-muted-foreground bg-secondary px-3 py-1 text-[10px] uppercase tracking-widest font-bold">Planned</span></td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-6 font-bold text-foreground">Threat Intelligence Integration</td>
                    <td className="p-6 text-right"><span className="inline-block border border-border text-muted-foreground bg-secondary px-3 py-1 text-[10px] uppercase tracking-widest font-bold">Planned</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
         </div>
      </section>

    </main>
  );
}
