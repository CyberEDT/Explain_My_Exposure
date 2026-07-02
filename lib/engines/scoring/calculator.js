// Risk and Exposure Scoring Calculator implementing the APES model
export function calculateScore(hostsList) {
  if (!hostsList || hostsList.length === 0) return 0;
  
  // Base Service Risks B(p) dictionary
  const baseServiceRisks = {
    445: 95,   // SMB
    3389: 90,  // RDP
    5985: 90,  // WinRM
    5986: 90,  // WinRM Secure
    5900: 90,  // VNC
    23: 85,    // Telnet
    88: 80,    // Kerberos
    389: 80,   // LDAP
    1433: 75,  // MSSQL
    3306: 75,  // MySQL
    5432: 75,  // PostgreSQL
    21: 70,    // FTP
    22: 65,    // SSH
    25: 55,    // SMTP
    53: 50,    // DNS
    80: 40,    // HTTP
    443: 30    // HTTPS
  };

  const hostScores = [];

  for (const host of hostsList) {
    const ports = host.ports.map(p => p.port);
    if (ports.length === 0) continue;

    // 1. Calculate Base Risks and identify the maximum port
    let maxBaseRisk = 0;
    let maxPort = 0;
    let sumSecondaryRisks = 0;

    for (const portInfo of host.ports) {
      const p = portInfo.port;
      const baseRisk = baseServiceRisks[p] || 20; // Fallback to 20 for custom ports
      
      // Remote Access modifier R_access
      let rAccess = 1.0;
      if ([22, 3389, 5900, 5985, 5986, 23].includes(p)) {
        rAccess = 1.2; // Direct shell access is 1.2x threat
      } else if ([1433, 3306, 5432].includes(p)) {
        rAccess = 1.1; // Database access is 1.1x threat
      }

      // Check for anonymous credentials tags (Authentication Risk)
      let aAuth = 1.0;
      if (portInfo.version && portInfo.version.toLowerCase().includes('anonymous')) {
        aAuth = 1.25; // 25% increase for anonymous credentials
      }

      const totalPortRisk = baseRisk * rAccess * aAuth;
      
      if (totalPortRisk > maxBaseRisk) {
        maxBaseRisk = totalPortRisk;
        maxPort = p;
      }
    }

    // Sum secondary base risks: 10% of base risk of secondary ports
    for (const portInfo of host.ports) {
      const p = portInfo.port;
      if (p !== maxPort) {
        const baseRisk = baseServiceRisks[p] || 20;
        sumSecondaryRisks += baseRisk * 0.1;
      }
    }

    // 2. Legacy Protocol Penalty L_legacy
    let legacyPenalty = 0;
    const legacyPorts = [23, 21]; // Telnet, FTP
    if (ports.some(p => legacyPorts.includes(p))) {
      legacyPenalty = 15;
    }

    // 3. Service Combination Penalty C_combo
    let comboPenalty = 0;
    // Active Directory target
    if (ports.includes(88) && ports.includes(445)) {
      comboPenalty += 20;
    }
    // Database exposure combined with HTTP web application
    if ((ports.includes(80) || ports.includes(443)) && (ports.includes(3306) || ports.includes(1433) || ports.includes(5432))) {
      comboPenalty += 15;
    }
    // Multiple remote control protocols
    if (ports.includes(3389) && ports.includes(5900)) {
      comboPenalty += 10;
    }

    // 4. Internet Exposure Risk E_internet (mocked check based on IP routing)
    let internetExposure = 5; // Default exposure constant
    const ipString = String(host.ip);
    if (ipString.startsWith('10.') || ipString.startsWith('192.168.') || ipString.startsWith('172.16.')) {
      internetExposure = 0; // Private IPs have no external internet exposure penalty
    }

    const hostScore = Math.min(100, maxBaseRisk + sumSecondaryRisks + legacyPenalty + comboPenalty + internetExposure);
    hostScores.push(Math.round(hostScore));
  }

  // The overall network exposure score is the maximum host score
  if (hostScores.length === 0) return 0;
  return Math.max(...hostScores);
}
