import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useExposureStore } from '../store/exposureStore';
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

import { MOCK_PRELOADED_DATA } from '../constants/mockData';
import { handleDownloadMd } from '../services/reportGenerator';
import SeoMeta from '../components/seo/SeoMeta';

export default function DashboardPage() {
  const { loading, error, scanResult, triggerAnalysis, clearScan, storagePermission, handleSetStoragePermission } = useExposureStore();
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

  // Trigger JSON download
  const handleDownloadMdClick = () => {
    handleDownloadMd(activeResult, targetHostIp, hosts, currentHost);
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
    <main className="font-mono text-[#fafafa] bg-[#030303] min-h-screen">
      <SeoMeta 
        title="Interactive Console" 
        description="Explain My Exposure interactive dashboard. Upload your Nmap XML to view actionable exposure intelligence."
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "EME Interactive Scanner",
          "applicationCategory": "SecurityApplication"
        }}
      />
      
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
              <div role="alert" aria-live="assertive" className="mt-6 w-full p-4 border border-danger/40 bg-danger/10 text-danger text-xs font-mono text-left">
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
                  aria-label="View Intelligence Dossier"
                  aria-pressed={activeTab === 'REPORT'}
                  className={`text-xs font-bold tracking-widest px-3 py-1.5 transition-colors ${activeTab === 'REPORT' ? 'bg-gold text-black' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  // INTELLIGENCE DOSSIER
                </button>
                <button 
                  onClick={() => setActiveTab('DASHBOARD')}
                  aria-label="View Visual Command Center"
                  aria-pressed={activeTab === 'DASHBOARD'}
                  className={`text-xs font-bold tracking-widest px-3 py-1.5 transition-colors ${activeTab === 'DASHBOARD' ? 'bg-gold text-black' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  // VISUAL COMMAND CENTER
                </button>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={handleDownloadMdClick} className="flex items-center gap-2 text-xs border border-border px-3 py-1.5 hover:border-gold hover:text-gold transition-colors">
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




    </main>
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
