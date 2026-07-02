// Attack path generator matching open ports to threat scenarios
export function suggestPaths(hostsList) {
  const suggested = [];
  
  // Attacker path profiles matching our 50 attack paths catalog
  const pathDatabase = {
    445: [
      { id: 'path-21', title: 'EternalBlue Remote Code Execution', steps: ['Ingress: Port 445 (SMB) Exposed', 'Exploit: EternalBlue Buffer Overflow (CVE-2017-0143)', 'Tactic: SYSTEM Privilege Escalation'], likelihood: 'Critical' },
      { id: 'path-22', title: 'SMB Null Session Directory Enumeration', steps: ['Ingress: SMB Null Session Enabled', 'Tactic: Directory Share Enumeration (C$, ADMIN$)', 'Objective: Configuration Backups Leaked'], likelihood: 'High' },
      { id: 'path-29', title: 'Pass-the-Hash Lateral Movement', steps: ['Credential Access: SMB Hash Interception', 'Exploit: Pass-the-Hash (T1563.002)', 'Objective: Lateral Command Exec'], likelihood: 'High' }
    ],
    3389: [
      { id: 'path-1', title: 'Interactive RDP Hijack via Credential Stuffing', steps: ['Ingress: Port 3389 (RDP) Exposed', 'Tactic: Credential Brute-Force (T1110)', 'Objective: Interactive Desktop Hijack'], likelihood: 'High' },
      { id: 'path-5', title: 'BlueKeep Kernel Exploitation', steps: ['Ingress: RDP Remote Shell Access', 'Exploit: BlueKeep Kernel Memory Corruption (CVE-2019-0708)', 'Objective: Remote Code Exec'], likelihood: 'Critical' }
    ],
    22: [
      { id: 'path-2', title: 'SSH Administrative Password Spraying', steps: ['Ingress: Port 22 (SSH) Exposed', 'Tactic: Administrative User Password Spraying', 'Objective: Local Console shell foothold'], likelihood: 'Medium' },
      { id: 'path-6', title: 'SSH Key Theft & Auth Bypass', steps: ['Credential Leak: Private Key Theft', 'Tactic: SSH Key Logon authentication bypass', 'Objective: Admin shell access'], likelihood: 'High' }
    ],
    5985: [
      { id: 'path-3', title: 'WinRM PowerShell Lateral Movement', steps: ['Ingress: Port 5985 (WinRM) Open', 'Tactic: local admin credential spraying', 'Objective: Remote PowerShell script command execution'], likelihood: 'High' }
    ],
    5986: [
      { id: 'path-7', title: 'Encrypted WinRM Session Hijack', steps: ['Ingress: Port 5986 (WinRM Secure) Open', 'Tactic: Pass-the-Hash login authentication', 'Objective: Encrypted administrative shell persistence'], likelihood: 'High' }
    ],
    5900: [
      { id: 'path-4', title: 'VNC Unauthenticated Session Hijack', steps: ['Ingress: Port 5900 (VNC) Exposed', 'Tactic: Session Negotiation hijack without auth', 'Objective: Graphical remote control session'], likelihood: 'Critical' },
      { id: 'path-8', title: 'VNC Weak Password Brute-Forcing', steps: ['Ingress: RFB Server Port', 'Tactic: Weak VNC password brute-forcing', 'Objective: Desktop UI monitoring'], likelihood: 'High' }
    ],
    80: [
      { id: 'path-11', title: 'HTTP SQL Injection Database Exfil', steps: ['Ingress: Web Server Port 80', 'Exploit: SQL Injection (OWASP Top 10)', 'Objective: Database records extraction'], likelihood: 'Medium' },
      { id: 'path-13', title: 'Unprotected Web Shell Upload', steps: ['Ingress: Unprotected File Upload endpoint', 'Tactic: Web Shell payload upload', 'Objective: HTTP terminal persistence'], likelihood: 'High' }
    ],
    443: [
      { id: 'path-12', title: 'HTTPS Local File Inclusion (LFI)', steps: ['Ingress: Web Server Port 443', 'Exploit: Local File Inclusion configuration read', 'Objective: Credentials key leak'], likelihood: 'Medium' },
      { id: 'path-18', title: 'Server-Side Request Forgery (SSRF)', steps: ['Ingress: HTTPS App request router', 'Exploit: SSRF metadata target relay', 'Objective: Cloud tokens extraction'], likelihood: 'High' }
    ],
    21: [
      { id: 'path-23', title: 'vsftpd Backdoor Command Execution', steps: ['Ingress: Port 21 (FTP) version banner', 'Exploit: Version backdoor command trigger (vsftpd 2.3.4)', 'Objective: Root administrative shell'], likelihood: 'High' },
      { id: 'path-24', title: 'Anonymous FTP Configuration Leak', steps: ['Ingress: Anonymous FTP folder login', 'Tactic: Read/Download configuration profiles', 'Objective: Key credentials leakage'], likelihood: 'Medium' }
    ],
    23: [
      { id: 'path-25', title: 'Telnet Cleartext Traffic Sniffing', steps: ['Ingress: Port 23 (Telnet) exposed', 'Tactic: MitM traffic cleartext sniffing', 'Objective: Capturing admin passwords in transit'], likelihood: 'Critical' },
      { id: 'path-28', title: 'Telnet Default Credential Brute-Forcing', steps: ['Ingress: Insecure management terminal', 'Tactic: Default firmware credential guesses', 'Objective: Device control shell'], likelihood: 'High' }
    ],
    3306: [
      { id: 'path-32', title: 'MySQL Root Brute-Force to Web Shell', steps: ['Ingress: Port 3306 (MySQL) Exposed', 'Tactic: root credential brute-force access', 'Exploit: SELECT INTO OUTFILE web root write', 'Objective: Web shell foothold'], likelihood: 'High' }
    ],
    1433: [
      { id: 'path-31', title: 'MSSQL xp_cmdshell RCE Execution', steps: ['Ingress: Port 1433 (MSSQL) Exposed', 'Tactic: SA user account brute-force access', 'Exploit: Trigger xp_cmdshell execution', 'Objective: Command execution foothold'], likelihood: 'High' }
    ],
    5432: [
      { id: 'path-33', title: 'PostgreSQL COPY FROM RCE Execution', steps: ['Ingress: Port 5432 (Postgres) Exposed', 'Tactic: default password guess connection', 'Exploit: COPY FROM PROGRAM execution', 'Objective: Operating system access shell'], likelihood: 'High' }
    ],
    88: [
      { id: 'path-41', title: 'Kerberoasting TGS Ticket Theft', steps: ['Ingress: AD Domain Controller', 'Tactic: Service Principal Name ticket requests', 'Exploit: Kerberoasting hash cracking offline', 'Objective: AD Service account take-over'], likelihood: 'High' },
      { id: 'path-43', title: 'AS-REP Roasting Credential Cracking', steps: ['Ingress: AD Kerberos service port 88', 'Tactic: Pre-authentication disabled accounts scan', 'Exploit: AS-REP roasting password crack', 'Objective: Active Directory user access'], likelihood: 'High' }
    ],
    389: [
      { id: 'path-42', title: 'Unauthenticated LDAP Directory Reconnaissance', steps: ['Ingress: AD Directory server port 389', 'Tactic: Anonymous LDAP bind enumeration', 'Objective: Domain subnet registry exfiltration'], likelihood: 'Medium' }
    ]
  };

  const processedPaths = new Set();

  for (const host of hostsList) {
    for (const portInfo of host.ports) {
      const p = portInfo.port;
      const paths = pathDatabase[p] || [];

      for (const pathTemplate of paths) {
        const uniqueKey = `${host.ip}-${pathTemplate.id}`;
        if (!processedPaths.has(uniqueKey)) {
          processedPaths.add(uniqueKey);
          
          suggested.push({
            id: pathTemplate.id,
            title: pathTemplate.title,
            node: `${host.ip}:${p}`,
            steps: pathTemplate.steps,
            likelihood: pathTemplate.likelihood
          });
        }
      }
    }
  }

  // Fallback default path if no high interest ports are found
  if (suggested.length === 0 && hostsList.length > 0) {
    suggested.push({
      id: 'path-50',
      title: 'General OS Reconnaissance',
      node: `${hostsList[0].ip}:General`,
      steps: ['Ingress: Network scanning detection', 'Tactic: General OS fingerprinting', 'Objective: External footprint map compiled'],
      likelihood: 'Low'
    });
  }

  return suggested;
}
