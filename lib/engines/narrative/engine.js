import { templates } from './templates.js';

export function generateNarrative(hostsList, scanLevel = 'medium') {
  if (!hostsList || hostsList.length === 0) {
    if (scanLevel === 'low') return "No exposed computers or open doors were found. Your network looks safe from the outside.";
    if (scanLevel === 'high') return "Zero active hosts or exposed interfaces detected. The perimeter footprint is fully stealth/filtered (T1562.004).";
    return "No active hosts or exposed ports were identified in the scan. The system footprint appears internally secure or completely firewalled from the assessment perspective.";
  }

  const allPorts = new Set();
  for (const host of hostsList) {
    for (const portInfo of host.ports) {
      allPorts.add(portInfo.port);
    }
  }

  const portsArray = Array.from(allPorts).sort((a, b) => b - a);
  
  if (portsArray.length === 0) {
    if (scanLevel === 'low') return "No open doors were found. A hacker wouldn't be able to get in directly from the outside.";
    if (scanLevel === 'high') return "No open ports discovered. Ingress routing is effectively nullified at the network layer, preventing direct initial access via exposed services.";
    return "No open ports were discovered during the scan. An attacker would find no direct entry points at the network layer.";
  }

  let intro = "";
  let body = "";
  let conclusion = "";

  // 1. Compile attacher priorities & introductions
  if (portsArray.includes(445) || portsArray.includes(3389) || portsArray.includes(5900)) {
    if (scanLevel === 'low') intro = "### Attacker Priority: HIGH RISK EXPOSURE DETECTED\n\nHackers would immediately target this computer because it has remote control and file-sharing features left completely open to the internet. This is the easiest way for them to break in and spread viruses.\n\n";
    else if (scanLevel === 'high') intro = "### Attacker Priority: CRITICAL (TIER-0 COMPROMISE RISK)\n\nAdversaries will prioritize this asset immediately. Exposure of remote access protocols (RDP/VNC) and SMB provides a frictionless vector for Initial Access (T1133) and Lateral Movement (T1021). High probability of rapid ransomware deployment across the AD estate.\n\n";
    else intro = "### Attacker Priority: HIGH RISK EXPOSURE DETECTED\n\nAn attacker scanning this network segment would immediately isolate this host because it exposes critical remote control and file sharing services (such as SMB/RDP/VNC). These protocols represent the highest priority targets for initial ingress and internal lateral movement.\n\n";
  } else if (portsArray.includes(22) || portsArray.includes(1433) || portsArray.includes(3306) || portsArray.includes(5432)) {
    if (scanLevel === 'low') intro = "### Attacker Priority: MEDIUM EXPOSURE DETECTED\n\nHackers would see this computer as a good secondary target. It's running databases or management tools. They will use automated software to try millions of passwords to get inside and steal your data.\n\n";
    else if (scanLevel === 'high') intro = "### Attacker Priority: ELEVATED (DATA EXFILTRATION RISK)\n\nAdversaries will classify this as a high-value secondary target. Exposed administrative shells (SSH) or relational databases (SQL) invite sustained brute-force campaigns (T1110) and targeted vulnerability exploitation to achieve data exfiltration (T1048).\n\n";
    else intro = "### Attacker Priority: MEDIUM TO HIGH EXPOSURE DETECTED\n\nAn attacker would prioritize this host as a secondary target. While it lacks direct Windows directory pivots, it exposes active database layers and management terminals (SSH/SQL). Threat actors will attempt brute-force attacks or hunt for application vulnerabilities to access sensitive data columns.\n\n";
  } else {
    if (scanLevel === 'low') intro = "### Attacker Priority: LOW EXPOSURE DETECTED\n\nHackers wouldn't find an easy way in immediately. They would have to look very closely at your websites and web servers to find complex bugs to exploit.\n\n";
    else if (scanLevel === 'high') intro = "### Attacker Priority: STANDARD (APPLICATION LAYER FOCUS)\n\nDirect network compromise is unlikely. Adversaries will pivot to application-layer reconnaissance (T1592), fuzzing exposed web services for OWASP Top 10 vulnerabilities (like SSRF or SQLi) to establish a foothold.\n\n";
    else intro = "### Attacker Priority: LOW FOOTPRINT EXPOSURE\n\nAn attacker would view this host as a low-priority target for initial direct compromise. The exposed footprint is restricted to standard web interfaces or baseline resolvers. Attackers will shift to footprinting and directory enumeration to identify custom application vulnerabilities.\n\n";
  }

  // 2. Generate specific descriptions for each port detected
  body += "#### Exposed Port Breakdown:\n\n";
  for (const p of portsArray) {
    const descObj = templates[p];
    if (descObj) {
      body += `*   **Port ${p} (${getPortName(p)}):** ${descObj[scanLevel]}\n\n`;
    } else {
      if (scanLevel === 'low') body += `*   **Port ${p}:** An unknown service is running here. Hackers will try to figure out what software it is to see if it's old and breakable.\n\n`;
      else if (scanLevel === 'high') body += `*   **Port ${p}:** Unrecognized daemon listening. Adversaries will utilize aggressive banner grabbing and service fingerprinting (T1592.002) to identify 0-day or n-day exploit opportunities.\n\n`;
      else body += `*   **Port ${p}:** A custom network service is open. An attacker would perform banner grabbing to discover the service type, seeking outdated software signatures or local administrative interfaces.\n\n`;
    }
  }

  // 3. Compile tactical conclusions
  if (portsArray.includes(445)) {
    if (scanLevel === 'low') conclusion = "#### Next Steps for Hackers:\n\nBecause Windows File Sharing is open, hackers will use automated tools to steal passwords. You must block this port from the internet immediately to prevent a massive virus infection.";
    else if (scanLevel === 'high') conclusion = "#### Adversary Next Steps:\n\nAdversaries will immediately execute automated NTLM relaying or attempt null-session binding (T1049). Mitigation requires strict network segmentation, disabling SMBv1, and enforcing SMB signing to prevent lateral movement (T1021.002).";
    else conclusion = "#### Attacker's Next Steps:\n\nThe presence of an open SMB interface makes it highly likely that attackers will deploy automated NTLM hash harvesting scripts. Your primary objective should be blocking public SMB bindings and enforcing firewall rules to restrict lateral movement across subnets.";
  } else if (portsArray.includes(3389)) {
    if (scanLevel === 'low') conclusion = "#### Next Steps for Hackers:\n\nHacker bots are probably trying to guess your Remote Desktop password right now. Make sure you use a very strong password and turn on Two-Factor Authentication (MFA).";
    else if (scanLevel === 'high') conclusion = "#### Adversary Next Steps:\n\nExpect immediate and sustained credential stuffing (T1110) against the RDP interface. Immediate enforcement of Network Level Authentication (NLA), MFA, and migrating access behind a Zero Trust Network Access (ZTNA) gateway is mandatory.";
    else conclusion = "#### Attacker's Next Steps:\n\nAutomated dictionary attacks will continually spray common passwords against the RDP interface. Ensure Network Level Authentication (NLA) is strictly enforced, set up Multi-Factor Authentication (MFA), or place RDP access behind a corporate VPN gateway.";
  } else {
    if (scanLevel === 'low') conclusion = "#### Next Steps for Hackers:\n\nHackers will keep poking around your website looking for hidden files or outdated code. Make sure all your software is updated to the latest version.";
    else if (scanLevel === 'high') conclusion = "#### Adversary Next Steps:\n\nAdversaries will transition to web application fuzzing and directory brute-forcing (T1595). Implement a Web Application Firewall (WAF) and ensure strict input validation to mitigate SSRF and command injection threats.";
    else conclusion = "#### Attacker's Next Steps:\n\nAttackers will continue scanning web applications for common configuration bugs or directory paths. Keep all web server software patched and ensure database layers are isolated on local private network interfaces.";
  }

  return `${intro}${body}${conclusion}`;
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

export function generateHostNarrative(assetType, exposureProfile, attackerInterest, portsSet, scanLevel = 'medium') {
  if (assetType === 'Domain Controller') {
    if (scanLevel === 'low') return "This computer is the master key to your entire company network. Hackers want to break into it to steal everyone's passwords and take over completely.";
    if (scanLevel === 'high') return "Tier-0 Identity Provider. Extremely high-value target for Kerberoasting (T1558.003), DCSync (T1003.006), and complete Active Directory compromise.";
    return "This asset operates as a core identity provider. Exposing administrative or directory services makes it a highly-prized target for NTLM relay, Kerberoasting, and complete domain takeover.";
  }
  if (assetType === 'Database Server') {
    if (scanLevel === 'low') return "This server holds your actual company data. Hackers target this specifically to steal your customer information or delete it for ransom.";
    if (scanLevel === 'high') return "Core relational data store. Prime target for SQL injection (T1190), credential dumping, and database exfiltration (T1048) for double-extortion ransomware schemes.";
    return "This system stores structured data. Given its role, it is highly targeted for SQL injection, credential brute-forcing, and data exfiltration to support ransomware extortion operations.";
  }
  if (assetType === 'Web Application Server' || assetType === 'Web Server') {
    if (scanLevel === 'low') return "This server runs websites. Hackers will look for flaws in the website code to sneak inside and take control of the machine.";
    if (scanLevel === 'high') return "Public-facing web infrastructure. Adversaries will probe for unpatched vulnerabilities, attempt web shell deployment (T1505.003), and use SSRF to pivot into the internal network.";
    return "This system hosts web infrastructure. It serves as a primary external attack surface for zero-day exploitation, web shell deployment, and SSRF pivoting into the internal network.";
  }
  if (assetType === 'Remote Access Host' || portsSet.has(3389) || portsSet.has(22)) {
    if (scanLevel === 'low') return "This computer allows people to log in from home. Hackers use automated bots to guess passwords 24/7 to break in through this door.";
    if (scanLevel === 'high') return "Interactive remote access node. Adversaries leverage these endpoints for credential stuffing (T1110) to establish persistent, interactive footholds (T1078).";
    return "This asset provides interactive remote access. Attackers leverage these endpoints for credential stuffing, brute-forcing, and establishing persistent interactive footholds.";
  }
  if (assetType === 'File Server Candidate' || assetType === 'File / Storage Server') {
    if (scanLevel === 'low') return "This computer shares files across the network. Hackers look for these to find hidden passwords in documents and to lock all your files for ransom.";
    if (scanLevel === 'high') return "Network attached storage/file share. High priority during internal reconnaissance (T1083) to harvest plaintext credentials in scripts and to stage ransomware encryption algorithms.";
    return "This system manages shared storage. It is prioritized by attackers during internal reconnaissance to discover plaintext credentials in scripts, sensitive intellectual property, and to stage ransomware encryption.";
  }
  
  if (scanLevel === 'low') return "This computer is connected to the network. Hackers might use it as a stepping stone to jump to more important computers inside your company.";
  if (scanLevel === 'high') return "Generic network node. Adversaries may utilize exposed interfaces for internal network mapping (T1046) and lateral movement pivots (T1021).";
  return "This system presents an exposed surface that could be leveraged as a stepping stone. Attackers may utilize available services for internal network mapping and lateral movement.";
}
