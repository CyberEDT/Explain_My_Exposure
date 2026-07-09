import React, { useEffect, useState } from 'react';
import SeoMeta from '../components/seo/SeoMeta';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Server, ShieldAlert, Crosshair, Network, FileText, Lock, AlertTriangle, ArrowRight, Activity, Terminal } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function KnowledgeBasePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeServiceId, setActiveServiceId] = useState('smb');

  const services = [
    {
      id: 'smb',
      name: 'SMB / CIFS',
      port: 445,
      category: 'Infrastructure',
      interest: 100,
      description: 'Server Message Block is a network file sharing protocol that allows applications to read and write to files and request services from server programs in a computer network.',
      whyCare: 'SMB is the lifeblood of Active Directory. It allows for file transfer, remote command execution, and authentication relaying. If an attacker gains access to SMB, they have the tools required to own the entire domain.',
      objectives: ['Lateral Movement', 'Data Exfiltration', 'Remote Command Execution (psexec)'],
      opportunities: ['Null Sessions', 'NTLM Relaying', 'Lack of SMB Signing', 'EternalBlue (MS17-010)'],
      chain: 'ABUSE',
      impact: 'Complete domain compromise. Attackers can execute code as SYSTEM on remote hosts, steal sensitive corporate data, and deploy ransomware across the entire estate.',
      radar: [
        { subject: 'Discovery', A: 90, fullMark: 100 },
        { subject: 'Access', A: 70, fullMark: 100 },
        { subject: 'Execution', A: 100, fullMark: 100 },
        { subject: 'Movement', A: 100, fullMark: 100 },
        { subject: 'Exfil', A: 80, fullMark: 100 },
      ]
    },
    {
      id: 'rdp',
      name: 'RDP',
      port: 3389,
      category: 'Remote Access',
      interest: 95,
      description: 'Remote Desktop Protocol provides a user with a graphical interface to connect to another computer over a network connection.',
      whyCare: 'RDP provides direct, interactive GUI access to a machine. It is the absolute preferred initial access vector for ransomware operators and Initial Access Brokers (IABs).',
      objectives: ['Initial Access', 'Interactive Lateral Movement', 'Ransomware Deployment'],
      opportunities: ['Weak Passwords', 'Lack of NLA', 'BlueKeep (CVE-2019-0708)'],
      chain: 'ACCESS',
      impact: 'Immediate interactive control of the host. If exposed to the internet, it is a guarantee that automated botnets are currently brute-forcing the administrator credentials.',
      radar: [
        { subject: 'Discovery', A: 20, fullMark: 100 },
        { subject: 'Access', A: 100, fullMark: 100 },
        { subject: 'Execution', A: 95, fullMark: 100 },
        { subject: 'Movement', A: 90, fullMark: 100 },
        { subject: 'Exfil', A: 70, fullMark: 100 },
      ]
    },
    {
      id: 'ldap',
      name: 'LDAP',
      port: 389,
      category: 'Infrastructure',
      interest: 90,
      description: 'Lightweight Directory Access Protocol is an open, vendor-neutral application protocol for accessing and maintaining distributed directory information services.',
      whyCare: 'LDAP is the blueprint to the Active Directory kingdom. It contains the list of all users, computers, groups, and password policies.',
      objectives: ['Domain Enumeration', 'BloodHound Mapping', 'Cleartext Credential Harvesting'],
      opportunities: ['Anonymous Binds', 'Cleartext Authentication', 'Information Disclosure'],
      chain: 'ENUMERATE',
      impact: 'Attackers can map out the entire organizational structure, identify privileged accounts, and find the exact path required to escalate privileges to Domain Admin.',
      radar: [
        { subject: 'Discovery', A: 100, fullMark: 100 },
        { subject: 'Access', A: 50, fullMark: 100 },
        { subject: 'Execution', A: 10, fullMark: 100 },
        { subject: 'Movement', A: 30, fullMark: 100 },
        { subject: 'Exfil', A: 60, fullMark: 100 },
      ]
    },
    {
      id: 'ssh',
      name: 'SSH',
      port: 22,
      category: 'Remote Access',
      interest: 85,
      description: 'Secure Shell is a cryptographic network protocol for operating network services securely over an unsecured network.',
      whyCare: 'While secure by design, SSH is the primary administrative gateway to Linux infrastructure. Compromised SSH keys or weak passwords provide root access.',
      objectives: ['Initial Access', 'Pivot Point Creation', 'Data Exfiltration'],
      opportunities: ['Password Authentication Enabled', 'Leaked Private Keys', 'Outdated OpenSSH Versions'],
      chain: 'ACCESS',
      impact: 'Full shell access to the host, allowing the attacker to pivot deeper into the internal network or establish persistent backdoors.',
      radar: [
        { subject: 'Discovery', A: 40, fullMark: 100 },
        { subject: 'Access', A: 95, fullMark: 100 },
        { subject: 'Execution', A: 90, fullMark: 100 },
        { subject: 'Movement', A: 85, fullMark: 100 },
        { subject: 'Exfil', A: 90, fullMark: 100 },
      ]
    },
    {
      id: 'kerberos',
      name: 'Kerberos',
      port: 88,
      category: 'Infrastructure',
      interest: 88,
      description: 'Kerberos is a computer-network authentication protocol that works on the basis of tickets to allow nodes to prove their identity over a non-secure network.',
      whyCare: 'Kerberos is the primary authentication mechanism for Active Directory. Flaws in its implementation or weak encryption allow for devastating offline cracking attacks.',
      objectives: ['Offline Password Cracking', 'Privilege Escalation', 'Golden Ticket Creation'],
      opportunities: ['AS-REP Roasting', 'Kerberoasting', 'Unconstrained Delegation'],
      chain: 'ABUSE',
      impact: 'Total compromise of the cryptographic trust within the domain. Attackers can forge tickets to impersonate any user, including Domain Admins, silently bypassing normal authentication.',
      radar: [
        { subject: 'Discovery', A: 60, fullMark: 100 },
        { subject: 'Access', A: 90, fullMark: 100 },
        { subject: 'Execution', A: 40, fullMark: 100 },
        { subject: 'Movement', A: 80, fullMark: 100 },
        { subject: 'Exfil', A: 20, fullMark: 100 },
      ]
    },
    {
      id: 'http',
      name: 'HTTP',
      port: 80,
      category: 'Web',
      interest: 75,
      description: 'Hypertext Transfer Protocol is the foundation of data communication for the World Wide Web, operating in cleartext.',
      whyCare: 'HTTP traffic is completely unencrypted. Attackers can intercept credentials, session tokens, and sensitive data via man-in-the-middle attacks.',
      objectives: ['Credential Sniffing', 'Web App Exploitation', 'Session Hijacking'],
      opportunities: ['Cleartext Authentication', 'Lack of HSTS', 'Directory Traversal'],
      chain: 'DISCOVER',
      impact: 'Exposure of sensitive user data in transit. Provides a vast attack surface for application-layer vulnerabilities (OWASP Top 10).',
      radar: [
        { subject: 'Discovery', A: 80, fullMark: 100 },
        { subject: 'Access', A: 60, fullMark: 100 },
        { subject: 'Execution', A: 50, fullMark: 100 },
        { subject: 'Movement', A: 20, fullMark: 100 },
        { subject: 'Exfil', A: 70, fullMark: 100 },
      ]
    },
    {
      id: 'telnet',
      name: 'Telnet',
      port: 23,
      category: 'Remote Access',
      interest: 90,
      description: 'Telnet is a legacy application protocol used on the Internet or local area network to provide a bidirectional interactive text-oriented communication facility.',
      whyCare: 'Telnet provides zero encryption. Every keystroke, including administrative passwords, is transmitted in cleartext. It is a massive red flag in any modern network.',
      objectives: ['Cleartext Credential Harvesting', 'Initial Access', 'Device Compromise'],
      opportunities: ['Cleartext Traffic', 'Default Credentials', 'Legacy Network Equipment'],
      chain: 'ACCESS',
      impact: 'Immediate compromise of administrative credentials if intercepted, leading to full device control (commonly affecting switches, routers, and IoT devices).',
      radar: [
        { subject: 'Discovery', A: 30, fullMark: 100 },
        { subject: 'Access', A: 95, fullMark: 100 },
        { subject: 'Execution', A: 80, fullMark: 100 },
        { subject: 'Movement', A: 50, fullMark: 100 },
        { subject: 'Exfil', A: 40, fullMark: 100 },
      ]
    },
    {
      id: 'mysql',
      name: 'MySQL',
      port: 3306,
      category: 'Database',
      interest: 85,
      description: 'MySQL is an open-source relational database management system.',
      whyCare: 'Databases contain the crown jewels of an organization. Direct network exposure bypasses the web application layer, allowing attackers to directly interact with the data.',
      objectives: ['Data Exfiltration', 'SQL Injection', 'Ransomware (Database drop)'],
      opportunities: ['Brute Force', 'Default Credentials', 'Unencrypted Connections'],
      chain: 'IMPACT',
      impact: 'Massive data breach, theft of intellectual property, or destructive attacks where the database is wiped and held for ransom.',
      radar: [
        { subject: 'Discovery', A: 40, fullMark: 100 },
        { subject: 'Access', A: 70, fullMark: 100 },
        { subject: 'Execution', A: 50, fullMark: 100 },
        { subject: 'Movement', A: 20, fullMark: 100 },
        { subject: 'Exfil', A: 100, fullMark: 100 },
      ]
    }
  ];

  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.port.toString().includes(searchTerm) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeData = services.find(s => s.id === activeServiceId) || services[0];

  return (
    <main className="relative min-h-screen bg-[#030303] text-[#fafafa] font-mono selection:bg-gold selection:text-black">
      <SeoMeta title="Knowledge Base" />
      
      {/* 1. Hero / Header Section */}
      <section className="relative overflow-hidden border-b border-border min-h-[50vh] flex flex-col justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/80 to-[#030303]"></div>
        
        <div className="relative mx-auto max-w-[1200px] w-full px-6 text-center z-10 mt-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 border border-gold/30 bg-gold/5 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-gold mb-8 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 bg-gold rounded-full animate-pulse-dot"></span> // SERVICE INTELLIGENCE DATABASE
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6"
          >
            EME Knowledge <span className="text-muted-foreground">Base</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mx-auto max-w-2xl text-base text-muted-foreground font-mono leading-relaxed mb-12"
          >
            The definitive encyclopedia of network protocols, evaluated purely from the perspective of an adversary.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by Protocol (e.g. SMB) or Port (e.g. 445)..." 
              className="w-full bg-black border border-gold/30 px-14 py-5 text-lg font-mono text-foreground placeholder:text-muted-foreground outline-none focus:border-gold transition-colors shadow-[0_0_30px_rgba(255,191,0,0.1)]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
        </div>
      </section>

      {/* 2. Leaderboard Ticker */}
      <div className="bg-gold text-black border-y border-border py-3 overflow-hidden whitespace-nowrap relative flex items-center font-bold text-xs uppercase tracking-widest">
        <div className="px-6 flex items-center gap-2 shrink-0 bg-gold z-10 relative"><AlertTriangle className="w-4 h-4"/> HIGH-VALUE TARGETS:</div>
        <div className="animate-marquee inline-block">
          <span className="mx-8">1. SMB (445) // SCORE: 100</span>
          <span className="mx-8 text-black/50">•</span>
          <span className="mx-8">2. RDP (3389) // SCORE: 95</span>
          <span className="mx-8 text-black/50">•</span>
          <span className="mx-8">3. LDAP (389) // SCORE: 90</span>
          <span className="mx-8 text-black/50">•</span>
          <span className="mx-8">4. TELNET (23) // SCORE: 90</span>
          <span className="mx-8 text-black/50">•</span>
          <span className="mx-8">5. KERBEROS (88) // SCORE: 88</span>
        </div>
      </div>

      {/* 3. Interactive Service Explorer */}
      <section className="bg-background min-h-screen border-b border-border">
         <div className="mx-auto max-w-[1600px] h-full flex flex-col lg:flex-row border-x border-border">
            
            {/* Left Pane: Directory */}
            <div className="w-full lg:w-[350px] shrink-0 border-r border-border bg-[#050505] flex flex-col h-auto lg:h-[900px]">
              <div className="p-6 border-b border-border bg-[#0a0a0c]">
                <h3 className="font-display text-lg font-bold text-foreground uppercase tracking-widest">Protocol Directory</h3>
                <div className="text-[10px] text-muted-foreground mt-1">{filteredServices.length} SERVICES INDEXED</div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {filteredServices.map(service => (
                  <button
                    key={service.id}
                    onClick={() => setActiveServiceId(service.id)}
                    className={`w-full text-left p-4 border transition-all flex items-center justify-between group
                      ${activeServiceId === service.id 
                        ? 'border-gold bg-gold/10' 
                        : 'border-border/50 bg-black hover:border-border hover:bg-secondary/30'
                      }`}
                  >
                    <div>
                      <div className={`font-bold font-mono text-lg ${activeServiceId === service.id ? 'text-gold' : 'text-foreground'}`}>{service.name}</div>
                      <div className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">{service.category}</div>
                    </div>
                    <div className={`font-mono text-sm font-bold ${activeServiceId === service.id ? 'text-gold' : 'text-muted-foreground'}`}>
                      {service.port}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Pane: Intelligence Dossier */}
            <div className="flex-1 bg-[#030303] overflow-y-auto h-auto lg:h-[900px] p-6 lg:p-12 relative">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-danger/5 rounded-full blur-[100px] pointer-events-none"></div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeData.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-4xl relative z-10"
                >
                  {/* Section 1: Dashboard */}
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-border pb-8">
                    <div>
                      <div className="text-gold font-bold uppercase tracking-widest text-xs mb-2">INTELLIGENCE DOSSIER</div>
                      <h2 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-4">{activeData.name}</h2>
                      <div className="flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                        <span className="border border-border px-3 py-1 bg-[#0a0a0c]">PORT: {activeData.port}</span>
                        <span className="border border-border px-3 py-1 bg-[#0a0a0c]">CLASS: {activeData.category}</span>
                      </div>
                    </div>
                    <div className="w-full md:w-48 shrink-0 bg-black border border-border p-4">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Attacker Interest</div>
                      <div className="flex items-end gap-2 mb-2">
                        <span className="font-display text-4xl font-bold text-danger leading-none">{activeData.interest}</span>
                        <span className="text-muted-foreground text-xs mb-1">/ 100</span>
                      </div>
                      <div className="w-full bg-[#111] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-danger h-full" style={{ width: `${activeData.interest}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2 & 5: Threat Narrative & Radar */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                    <div className="col-span-2 space-y-8">
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-3 flex items-center gap-2 border-b border-border pb-2"><FileText className="w-4 h-4 text-gold"/> Description</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">{activeData.description}</p>
                      </div>
                      <div className="bg-danger/10 border border-danger/20 p-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-danger mb-3 flex items-center gap-2"><Target className="w-4 h-4"/> Why Attackers Care</h3>
                        <p className="text-foreground leading-relaxed text-sm font-bold">{activeData.whyCare}</p>
                      </div>
                    </div>
                    <div className="col-span-1 bg-black border border-border p-4 flex flex-col justify-center items-center h-[250px] relative">
                      <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-muted-foreground z-10">Utility Mapping</div>
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="60%" data={activeData.radar}>
                          <PolarGrid stroke="#333" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 9, fontFamily: 'monospace' }} />
                          <Radar name="Utility" dataKey="A" stroke="#ffbf00" fill="#ffbf00" fillOpacity={0.2} />
                          <Tooltip contentStyle={{ backgroundColor: '#000', borderColor: '#333', fontSize: '12px' }} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Section 3: Tactical Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="border border-border bg-[#0a0a0c] p-8">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-6 flex items-center gap-2"><Crosshair className="w-4 h-4 text-gold"/> Common Objectives</h3>
                      <ul className="space-y-4">
                        {activeData.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span className="text-gold mt-1">▹</span> {obj}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border border-border bg-[#0a0a0c] p-8">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-6 flex items-center gap-2"><Lock className="w-4 h-4 text-danger"/> Exposure Opportunities</h3>
                      <ul className="space-y-4">
                        {activeData.opportunities.map((opp, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span className="text-danger mt-1">▹</span> {opp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Section 4 & 5: Exposure Chain & Impact */}
                  <div className="space-y-8 pb-12">
                    <div className="flex flex-col md:flex-row items-center gap-6 border border-border p-6 bg-black">
                      <div className="w-full md:w-1/3 shrink-0">
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Exposure Chain Phase</div>
                        <div className="font-display text-2xl font-bold text-gold">{activeData.chain}</div>
                      </div>
                      <div className="flex-1 w-full flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-muted-foreground/50 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                        <span className={activeData.chain === 'DISCOVER' ? 'text-foreground' : ''}>1. DISCOVER</span>
                        <span className={activeData.chain === 'ENUMERATE' ? 'text-foreground' : ''}>2. ENUMERATE</span>
                        <span className={activeData.chain === 'ACCESS' ? 'text-foreground' : ''}>3. ACCESS</span>
                        <span className={activeData.chain === 'ABUSE' ? 'text-foreground' : ''}>4. ABUSE</span>
                        <span className={activeData.chain === 'IMPACT' ? 'text-foreground' : ''}>5. IMPACT</span>
                      </div>
                    </div>

                    <div className="bg-[#0f0000] border-l-4 border-l-danger p-6 border border-border">
                      <div className="flex items-center gap-2 text-danger font-bold uppercase tracking-widest text-sm mb-2">
                        <ShieldAlert className="w-5 h-5"/> Potential Impact
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{activeData.impact}</p>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

         </div>
      </section>

    </main>
  );
}

// Inline Target icon definition to avoid missing lucide-react import issues
function Target(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
