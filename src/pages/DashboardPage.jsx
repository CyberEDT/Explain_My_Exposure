import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useExposure } from '../contexts/ExposureContext';
import { analyzeService } from '../../lib/engines/service-intel/analyzer.js';
import Card from '../components/common/Card';
import ExposureScoreGauge from '../components/dashboard/ExposureScoreGauge';
import ExposureChainPipeline from '../components/dashboard/ExposureChainPipeline';
import AssetPriorityMatrix from '../components/dashboard/AssetPriorityMatrix';
import AttackerInterestChart from '../components/dashboard/AttackerInterestChart';
import MitreTacticsTreemap from '../components/dashboard/MitreTacticsTreemap';
import IntelligenceReportView from '../components/dashboard/IntelligenceReportView';
import HostDashboardLive from '../components/dashboard/HostDashboardLive';
import { 
  Shield, 
  Terminal, 
  Search, 
  Download, 
  Copy, 
  FileText, 
  Check, 
  ArrowRight,
  Database,
  Lock,
  Cpu,
  AlertTriangle,
  FileCode
} from 'lucide-react';

// Preloaded mock data matching the threat-lens reference site's initial state
const MOCK_PRELOADED_DATA = {
  score: 71,
  metrics: {
    openPorts: 6,
    criticalServices: 2,
    attackPathsCount: 1
  },
  hosts: [
    {
      ip: '172.18.4.12',
      role: 'DOMAIN_CONTROLLER',
      os: 'Windows Server 2019',
      ports: [
        { port: 22, protocol: 'tcp', service: 'ssh', version: 'OpenSSH 8.0' },
        { port: 80, protocol: 'tcp', service: 'http', version: 'Microsoft IIS 10.0' },
        { port: 135, protocol: 'tcp', service: 'msrpc', version: 'Microsoft Windows RPC' },
        { port: 389, protocol: 'tcp', service: 'ldap', version: 'Microsoft Active Directory LDAP' },
        { port: 445, protocol: 'tcp', service: 'microsoft-ds', version: 'Windows Server 2019 SMBv1' },
        { port: 3389, protocol: 'tcp', service: 'ms-wbt-server', version: 'Microsoft Terminal Services' }
      ],
      priority: 'Critical',
      apesScore: 71,
      maxPort: 445,
      intelligence: {
        asset_type: 'Domain Controller',
        exposure_profile: ['Identity Infrastructure'],
        confidence_score: 90,
        attacker_value: 'Critical',
        attacker_interest: 'Critical',
        primary_objective: 'Domain Takeover & Credential Harvesting',
        narrative_context: 'This asset operates as a core identity provider. Exposing administrative or directory services makes it a highly-prized target for NTLM relay, Kerberoasting, and complete domain takeover.'
      }
    }
  ],
  paths: [
    {
      id: 'path-1',
      node: '172.18.4.12',
      likelihood: 'High',
      steps: ['Public Internet', 'RDP:3389', 'SMB:445', 'LDAP:389', 'DC_ADMIN']
    }
  ],
  mitre: [
    { node: '172.18.4.12:445', techniqueName: 'Remote Services', techniqueId: 'T1021', description: 'Adversaries may use Remote Services to move laterally within a network.' },
    { node: '172.18.4.12:3389', techniqueName: 'Brute Force', techniqueId: 'T1110', description: 'Adversaries may use brute force attacks to obtain credentials.' },
    { node: '172.18.4.12:389', techniqueName: 'Kerberoasting', techniqueId: 'T1558', description: 'Adversaries may target Active Directory service accounts to dump Kerberos tickets.' }
  ],
  narrative: `### Attacker Priority: HIGH RISK EXPOSURE DETECTED

An attacker scanning this network segment would immediately isolate this host because it exposes critical remote control and file sharing services (such as SMB/RDP/LDAP). These protocols represent the highest priority targets for initial ingress and internal lateral movement.

#### Exposed Port Breakdown:

*   **Port 445 (SMB):** Windows admin shares (C$, ADMIN$) allow remote execution if admin credentials are relayable or sprayed.
*   **Port 3389 (RDP):** Active Remote Desktop console enables interactive GUI control, susceptible to credential stuffing and brute force.
*   **Port 389 (LDAP):** Active Directory directory service allows unauthenticated Active Directory querying and SPN harvesting.
*   **Port 22 (SSH):** Secure shell management console. Botnets routinely brute-force SSH endpoints.
*   **Port 80 (HTTP):** Standard web service interface. May run outdated IIS modules.

#### Attacker's Next Steps:

The presence of an open SMB interface makes it highly likely that attackers will deploy automated NTLM hash harvesting scripts. Your primary objective should be blocking public SMB bindings and enforcing firewall rules to restrict lateral movement across subnets.`,
  recommendations: [
    "Disable SMBv1; enforce SMB signing and disable null-session directory enumeration.",
    "Restrict RDP (3389) bindings using network ACLs and require multi-factor authentication.",
    "Transition sensitive Active Directory SPN service accounts to Group Managed Service Accounts (gMSA)."
  ]
};

export default function DashboardPage() {
  const { loading, error, scanResult, triggerAnalysis, clearScan, storagePermission, handleSetStoragePermission } = useExposure();
  const fileInputRef = useRef();
  
  const navigate = useNavigate();
  const location = useLocation();

  // Sync scan results with the URL hash so the back button can clear the scan
  useEffect(() => {
    if (scanResult && location.hash !== '#results') {
      navigate('/scanner#results', { replace: true });
    }
  }, [scanResult, location.hash, navigate]);

  useEffect(() => {
    const handleHashChange = () => {
      // If the user hits back and removes the #results hash, clear the scan to return to Ingest UI
      if (window.location.hash !== '#results' && scanResult) {
        clearScan();
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [scanResult, clearScan]);

  // Active result switches between mock preloaded data and user scanResult
  const activeResult = scanResult || MOCK_PRELOADED_DATA;
  const isDemo = !scanResult;

  // Local state managers
  const [activeHostIdx, setActiveHostIdx] = useState(0);
  const [activeReportSection, setActiveReportSection] = useState('04 Attack Paths');
  const [activeTab, setActiveTab] = useState('REPORT');
  const [copied, setCopied] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [scanLevel, setScanLevel] = useState('low');
  const [analystPrompt, setAnalystPrompt] = useState('Explain why exposing SMB(445) on a DC is critical.');

  // Reset host index when scanResult changes
  useEffect(() => {
    setActiveHostIdx(0);
  }, [scanResult]);

  // Auto-clean the scan results when navigating away from the dashboard
  useEffect(() => {
    return () => {
      clearScan();
    };
  }, [clearScan]);

  const hosts = activeResult.hosts || [];
  const currentHost = hosts[activeHostIdx] || hosts[0];
  const targetHostIp = currentHost?.ip || '172.18.4.12';

  // Analyst prompts map
  const analystPrompts = {
    'Explain why exposing SMB(445) on a DC is critical.': 
      'SMB on a domain controller is the single highest-leverage port in a Windows estate. It enables NTLM relay, SMB null-session enumeration, and post-auth lateral movement via admin shares. The Exposure Score weights it at 1.6× with a chaining bonus when paired with RDP or LDAP on the same host.',
    'What is the risk of exposing databases (e.g. MySQL/MSSQL) publicly?': 
      'Exposing databases like MySQL (3306), MSSQL (1433), or PostgreSQL (5432) publicly opens direct exposure vectors for brute-force credential stuffing, SQL injection, and remote execution exploits (like xp_cmdshell). Threat actors prioritize these to harvest customer PII or dump system hashes.',
    'How does an attacker chain RDP and SMB for lateral movement?': 
      'An attacker uses RDP (3389) as an interactive foothold (often through VPN credential stuffing or brute force). Once inside, they use SMB (445) shares to execute commands remotely on adjacent nodes using administrative credentials. This pivot allows moving from a DMZ workstation to tier-0 domain controllers.',
    'What is the significance of the calculated Exposure score?': 
      'The Exposure Score is a non-linear scoring model. Unlike standard CVSS which just lists individual vulnerabilities, it evaluates how easily services can be chained together, their remote access utility, and host network roles. A score of 70+ indicates a high probability of compromised domain controls.'
  };

  // Helper to compile markdown text for each report section
  const getSectionMarkdown = (section) => {
    if (section === '01 Executive Summary') {
      return `### 01 Executive Summary
      
The network exposure assessment has concluded client-side. The compiled threat metrics highlight potential ingress vectors that could be leveraged by threat groups to compromise infrastructure nodes.

*   **Overall Network Exposure Index:** **${activeResult.score}/100 Exposure Score**
*   **Identified Risk Profile:** ${activeResult.score >= 85 ? 'CRITICAL' : activeResult.score >= 70 ? 'HIGH' : activeResult.score >= 40 ? 'MEDIUM' : 'LOW'}
*   **Total Scanned Hosts:** ${hosts.length}
*   **Exposed Network Port Count:** ${activeResult.metrics.openPorts}
*   **Critical Entrypoints:** ${activeResult.metrics.criticalServices}

**Asset Intelligence Insights:**
${hosts.map(h => `*   **${h.ip}** (${h.intelligence?.asset_type || 'Unknown'}): ${h.intelligence?.narrative_context || 'No narrative generated.'}`).join('\n')}

**Privacy Statement:** Analysis was executed client-side local-first. No topology data was transmitted to external servers. All IP configurations, hostnames, and service listings remain in volatile memory.`;
    }

    if (section === '02 Host Inventory') {
      let table = `### 02 Detected Node Inventory\n\n| Host IP Address | Assumed Network Role | Confidence | Active Interfaces |\n| --- | --- | --- | --- |\n`;
      hosts.forEach(h => {
        const portStr = h.ports.map(p => `${p.port}/${p.protocol}`).join(', ');
        const role = h.intelligence?.asset_type || h.role || 'Unknown';
        const conf = h.intelligence?.confidence_score ? `${h.intelligence.confidence_score}%` : 'N/A';
        table += `| **${h.ip}** | ${role} | ${conf} | ${portStr} |\n`;
      });
      return table;
    }

    if (section === '03 Exposure Scoring') {
      let breakdown = `### 03 Exposure Scoring Breakdown

The Exposure Scoring model calculates threats based on non-linear chaining.

$$EXPOSURE\\_SCORE = \\min(100, B_{max} + \\sum B_{secondary} \\cdot 0.1 + L_{legacy} + C_{combo} + E_{internet})$$

*   **Active Host:** **${targetHostIp}**
*   **Host Exposure Score:** **${currentHost?.apesScore || activeResult.score}**
*   **Maximum Target Port:** Port ${currentHost?.maxPort || 445}
*   **Legacy Protocols:** ${currentHost?.ports?.some(p => [23, 21].includes(p.port)) ? 'Detected (+15 Penalty)' : 'None Detected'}
*   **Chaining Combos:** ${currentHost?.ports?.some(p => p.port === 445) && currentHost?.ports?.some(p => p.port === 3389) ? 'Active Directory Pivots Enabled (+20)' : 'None Identified'}`;

      if (activeResult?.metrics?.exposure_chain) {
        breakdown += `\n\n#### Network Exposure Chain Profile\n\n| Stage | Score | Full Mark |\n| --- | --- | --- |\n`;
        activeResult.metrics.exposure_chain.forEach(stg => {
          breakdown += `| **${stg.stage}** | ${stg.score} | ${stg.fullMark} |\n`;
        });
      }

      return breakdown;
    }

    if (section === '04 Attack Paths') {
      const paths = activeResult.paths || [];
      const stepsText = paths[0]?.steps ? paths[0].steps.join(' → ') : 'INTERNET → RDP:3389 → SMB:445 → DC_ADMIN';
      
      return `### 04 Attack Paths

The target host (**${targetHostIp}**) exposes a triad that, in combination, removes friction from every meaningful adversary objective: **RDP for interactive access**, **SMB for lateral spread**, and **LDAP for directory enumeration**.

\`\`\`bash
$ eme.explain --host ${targetHostIp} --path ${stepsText.toLowerCase().replace(/ /g, '')}
[1] RDP:3389  — credential spray window (T1110)
[2] SMB:445   — admin-share pivot via PsExec (T1021.002)
[3] LDAP:389  — Kerberoast SPN harvest (T1558.003)
→ tier-0 compromise probability: HIGH
\`\`\`

#### Detection Opportunities
*   4625 burst on 3389 from a single source — credential spray indicator.
*   Service installation events (7045) following SMB session establishment.
*   LDAP queries with unusual SPN filter patterns from non-admin contexts.

#### Recommended Hardening
*   Restrict 3389 to a bastion subnet and enforce Network Level Authentication.
*   Disable SMBv1; enable SMB signing & require Kerberos for tier-0 hosts.
*   Move sensitive service accounts to gMSA to neutralise Kerberoast value.`;
    }

    if (section === '05 MITRE Mapping') {
      let list = `### 05 MITRE ATT&CK Mappings\n\n`;
      const mappings = activeResult.mitre || [];
      mappings.forEach(m => {
        list += `*   **${m.node} (${m.techniqueId} - ${m.techniqueName}):** ${m.description}\n`;
      });
      if (mappings.length === 0) {
        list += `*No active service nodes mapped to MITRE techniques.*`;
      }
      return list;
    }

    if (section === '06 Detection Hooks') {
      return `### 06 Detection Hooks

To monitor and alert on exploitation of these exposed interfaces, deploy the following SIEM rules:

*   **Remote Services Pivot (Port 445):** Alert on Event ID \`7045\` (New Service Creation) on Windows Server nodes, combined with source IPs outside the admin subnet.
*   **Credential Spraying (Port 3389):** Alert on Event ID \`4625\` (Failed Logon) exceeding 30 attempts within 60 seconds from a single IP source.
*   **Active Directory Enumeration (Port 389):** Monitor LDAP search filters matching SPN tags (\`servicePrincipalName=*\`) originating from standard developer workstations.`;
    }

    if (section === '07 Remediation') {
      let recommendations = `### 07 Remediation Roadmaps\n\n`;
      const recs = activeResult.recommendations || [];
      recs.forEach((r, idx) => {
        recommendations += `${idx + 1}.  **${r}**\n`;
      });
      return recommendations;
    }

    return '';
  };

  // Trigger JSON download
  const handleDownloadMd = () => {
    const sections = [
      '01 Executive Summary',
      '02 Host Inventory',
      '03 Exposure Scoring',
      '04 Attack Paths',
      '05 MITRE Mapping',
      '06 Detection Hooks',
      '07 Remediation'
    ];
    const fullReport = sections.map(s => getSectionMarkdown(s)).join('\n\n---\n\n');
    const blob = new Blob([fullReport], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eme_exposure_report_${targetHostIp}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(activeResult, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle file drop/upload
  const handleFile = (file) => {
    if (!file) return;
    setUploadProgress(10);
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const reader = new FileReader();
    
    // Simulate upload progress
    const timer = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(timer);
          return 90;
        }
        return prev + 25;
      });
    }, 150);

    reader.onload = async (e) => {
      clearInterval(timer);
      setUploadProgress(100);
      try {
        await triggerAnalysis(e.target.result, fileExtension, scanLevel);
        navigate('/scanner#results'); // Push to history so the back button can clear the scan
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => setUploadProgress(0), 1000);
      }
    };
    reader.readAsText(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="font-mono text-[#fafafa] bg-[#030303] min-h-screen">
      
      {!scanResult ? (
        <section id="upload" className="border-b border-border bg-black/40 min-h-screen flex flex-col justify-center">
          <div className="mx-auto max-w-3xl px-6 py-16 w-full flex flex-col items-center">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 border border-border bg-card px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-gold">
                <span className="h-1.5 w-1.5 bg-gold animate-pulse-dot rounded-full"></span>
                DISCOVER_LAYER
              </div>
              <h2 className="mt-5 font-display text-4xl font-bold tracking-tight md:text-6xl text-foreground">
                ANALYZE YOUR ATTACK SURFACE
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground mx-auto">
                Drag an Nmap XML or console-text log. Parsing runs in-memory; nothing transmits to a server.
              </p>
            </div>

            {error && (
              <div className="mt-6 w-full p-4 border border-danger/40 bg-danger/10 text-danger text-xs font-mono text-left">
                [PARSING_ERROR] &gt; {error}
              </div>
            )}

            {/* Scan Intensity Selector */}
            <div className="mt-8 flex flex-col items-center w-full max-w-lg">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3 flex items-center gap-2">
                <Shield className="w-3 h-3" /> EXPOSURE INTENSITY FILTER
              </div>
              <div className="flex w-full border border-border bg-card p-1">
                <button 
                  onClick={() => setScanLevel('low')}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${scanLevel === 'low' ? 'bg-gold text-black' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  LOW (STRICT)
                </button>
                <button 
                  onClick={() => setScanLevel('medium')}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${scanLevel === 'medium' ? 'bg-gold text-black' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  MEDIUM
                </button>
                <button 
                  onClick={() => setScanLevel('high')}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${scanLevel === 'high' ? 'bg-gold text-black' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  HIGH (VERBOSE)
                </button>
              </div>
              <p className="mt-3 text-[10px] text-muted-foreground text-center max-w-sm">
                {scanLevel === 'low' && 'Filters out all noise. Displays only Critical and High interest attack vectors.'}
                {scanLevel === 'medium' && 'Standard intelligence. Filters out Low interest network noise.'}
                {scanLevel === 'high' && 'Verbose analysis. Processes every single port and host discovered.'}
              </p>
            </div>

            <div className="mt-8 border border-border bg-border w-full">
              {/* Drag & Drop Card */}
              <div className="relative bg-card p-8 transition-colors select-none">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <span>// dropzone.local</span>
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-gold animate-pulse-dot rounded-full"></span> IN-MEMORY ONLY
                  </span>
                </div>
                
                <div 
                  onDragOver={onDragOver}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current.click()}
                  className="mt-4 flex h-[280px] cursor-pointer flex-col items-center justify-center gap-3 border border-dashed border-border hover:border-gold/60 bg-background/20 transition-colors"
                >
                  <Terminal className="w-10 h-10 text-muted-foreground" />
                  <div className="font-display text-2xl font-bold tracking-tight text-foreground">DROP_SCAN_FILE</div>
                  <div className="text-[11px] text-muted-foreground">.xml · .txt · .log · .json   —   max 50 MB</div>
                  <button
                    type="button"
                    className="mt-2 inline-flex items-center gap-2 border border-gold bg-gold px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-transparent hover:text-gold"
                  >
                    SELECT_FILE
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={(e) => handleFile(e.target.files[0])} 
                    className="hidden" 
                    accept=".xml,.txt,.log,.json" 
                  />
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <span>parser_progress</span>
                    <span className="text-gold">{loading ? 'ANALYZING...' : `${uploadProgress}%`}</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full bg-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gold transition-all duration-300" 
                      style={{ width: loading ? '80%' : `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Demo Override */}
            <div className="mt-10">
              <button onClick={() => triggerAnalysis(`Nmap scan report for DC-01.corp.local (172.18.4.12)
Host is up (0.0010s latency).
Not shown: 994 closed ports
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
135/tcp  open  msrpc
389/tcp  open  ldap
445/tcp  open  microsoft-ds
3389/tcp open  ms-wbt-server
MAC Address: 00:11:22:33:44:55 (Vendor)
OS details: Windows Server 2019`, 'text', scanLevel)} className="text-xs text-muted-foreground hover:text-gold transition-colors underline decoration-border underline-offset-4">Or load sample intelligence data</button>
            </div>
          </div>
        </section>
      ) : (
        <div className="pb-24">
          {/* Storage Permission Banner */}
          {storagePermission === 'prompt' && (
            <div className="bg-[#111] border-b border-gold p-4 text-center text-sm font-mono flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 z-40 relative">
              <span className="text-foreground">Do you want to securely save your scan in your browser's local storage for easy access?</span>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleSetStoragePermission('granted')} 
                  className="bg-gold text-black px-4 py-1.5 font-bold text-xs uppercase hover:bg-transparent hover:text-gold border border-gold transition-colors"
                >
                  Allow Storage
                </button>
                <button 
                  onClick={() => handleSetStoragePermission('denied')} 
                  className="text-muted-foreground text-xs uppercase underline decoration-border hover:text-foreground"
                >
                  Keep In-Memory
                </button>
              </div>
            </div>
          )}
          {/* Top Navbar Actions */}
          <div className="border-b border-border bg-card sticky top-0 z-50">
            <div className="mx-auto max-w-[1600px] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-bold tracking-widest text-gold text-sm mr-4">EME</span>
                <button 
                  onClick={() => setActiveTab('REPORT')}
                  className={`text-xs font-bold tracking-widest px-3 py-1.5 transition-colors ${activeTab === 'REPORT' ? 'bg-gold text-black' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  // INTELLIGENCE DOSSIER
                </button>
                <button 
                  onClick={() => setActiveTab('DASHBOARD')}
                  className={`text-xs font-bold tracking-widest px-3 py-1.5 transition-colors ${activeTab === 'DASHBOARD' ? 'bg-gold text-black' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  // VISUAL COMMAND CENTER
                </button>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={handleDownloadMd} className="flex items-center gap-2 text-xs border border-border px-3 py-1.5 hover:border-gold hover:text-gold transition-colors">
                  <Download className="w-3 h-3" /> EXPORT_REPORT
                </button>
                <button onClick={clearScan} className="flex items-center gap-2 text-xs border border-danger/40 text-danger px-3 py-1.5 hover:bg-danger/10 transition-colors">
                  CLEAR_SCAN
                </button>
              </div>
            </div>
          </div>

          {activeTab === 'REPORT' ? (
            <IntelligenceReportView activeResult={activeResult} hosts={hosts} scanLevel={scanLevel} />
          ) : (
            <div className="mx-auto max-w-[1600px] px-6 mt-10 space-y-10">
              
              {/* PRIMARY HOST DASHBOARD */}
              <div className="w-full">
                <HostDashboardLive 
                  host={currentHost} 
                  activeResult={activeResult} 
                  activeHostIdx={activeHostIdx}
                  setActiveHostIdx={setActiveHostIdx}
                  totalHosts={hosts.length}
                />
              </div>
              
              {/* SECONDARY VISUAL LAYER */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-1 border border-border bg-card p-6 relative">
                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-muted-foreground">01 // Overall Threat</div>
                <ExposureScoreGauge score={activeResult.score} />
              </div>
              <div className="col-span-2 border border-border bg-card p-6 relative">
                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-muted-foreground">02 // Exposure Chain</div>
                <div className="mt-8">
                  <ExposureChainPipeline hosts={hosts} />
                </div>
              </div>
            </div>

            {/* INTELLIGENCE LAYER */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-border bg-card p-6 relative">
                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-muted-foreground">03 // Asset Intelligence</div>
                <div className="mt-8">
                  <AssetPriorityMatrix hosts={hosts} />
                </div>
              </div>
              <div className="border border-border bg-card p-6 relative">
                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-muted-foreground">04 // Attacker Interest</div>
                <div className="mt-8">
                  <AttackerInterestChart hosts={hosts} />
                </div>
              </div>
            </div>

            {/* TACTICAL LAYER */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-2 border border-border bg-card p-6 relative">
                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-widest text-muted-foreground">05 // MITRE ATT&CK Coverage</div>
                <div className="mt-8">
                  <MitreTacticsTreemap mitre={activeResult.mitre} />
                </div>
              </div>
              <div className="col-span-1 border border-border bg-card p-6 relative flex flex-col">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">06 // Narrative Context</div>
                <div className="flex-1 overflow-y-auto bg-background border border-border p-4 text-xs text-muted-foreground font-mono space-y-4">
                  {hosts.slice(0, 5).map((h, i) => (
                    <div key={i} className="border-l-2 border-gold pl-3">
                      <p className="text-foreground font-bold">{h.ip} <span className="text-gold">[{h.intelligence?.asset_type}]</span></p>
                      <p className="mt-1 leading-relaxed">{h.intelligence?.narrative_context}</p>
                    </div>
                  ))}
                  {hosts.length > 5 && (
                    <div className="text-center pt-4 opacity-50">+ {hosts.length - 5} more hosts processed</div>
                  )}
                </div>
              </div>
            </div>

          </div>
          )}
        </div>
      )}




    </div>
  );
}

function getPortName(port) {
  const names = {
    21: 'FTP',
    22: 'SSH',
    23: 'Telnet',
    25: 'SMTP',
    53: 'DNS',
    80: 'HTTP',
    443: 'HTTPS',
    88: 'Kerberos',
    389: 'LDAP',
    445: 'SMB',
    1433: 'MSSQL',
    3306: 'MySQL',
    5432: 'PostgreSQL',
    5900: 'VNC',
    3389: 'RDP',
    5985: 'WinRM',
    5986: 'WinRM Secure'
  };
  return names[port] || 'Custom Service';
}
