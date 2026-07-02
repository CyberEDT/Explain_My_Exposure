export function identifyAsset(ports, osBanner) {
  const portsSet = new Set(ports.map(p => p.port));
  const os = (osBanner || '').toLowerCase();
  
  let assetType = 'Unknown Asset';
  let confidenceScore = 0;
  let exposureProfile = [];
  let primaryObjective = 'Unknown';

  if (portsSet.has(88) || portsSet.has(389) || portsSet.has(636)) {
    assetType = 'Domain Controller';
    confidenceScore = 60;
    exposureProfile = ['Identity Infrastructure'];
    primaryObjective = 'Domain Takeover & Credential Harvesting';
    if (portsSet.has(135) && portsSet.has(445)) confidenceScore += 30;
    if (os.includes('windows')) confidenceScore += 10;
  }
  else if (portsSet.has(1433) || portsSet.has(3306) || portsSet.has(5432) || portsSet.has(27017)) {
    assetType = 'Database Server';
    confidenceScore = 70;
    exposureProfile = ['Data Storage Asset'];
    primaryObjective = 'Data Exfiltration & Ransomware Leverage';
    if (portsSet.has(1433) && os.includes('windows')) confidenceScore += 20;
    if ((portsSet.has(3306) || portsSet.has(5432)) && os.includes('linux')) confidenceScore += 20;
  }
  else if (portsSet.has(80) || portsSet.has(443) || portsSet.has(8443) || portsSet.has(8080)) {
    assetType = 'Web Server';
    confidenceScore = 50;
    exposureProfile = ['Internet-Facing Asset', 'Internal Service Asset'];
    primaryObjective = 'Initial Access & Web Shell Deployment';
    if (portsSet.has(80) && portsSet.has(443)) confidenceScore += 30;
    const hasWebBanner = ports.some(p => (p.version || '').toLowerCase().includes('apache') || (p.version || '').toLowerCase().includes('nginx') || (p.version || '').toLowerCase().includes('iis'));
    if (hasWebBanner) confidenceScore += 20;
  }
  else if (portsSet.has(445) || portsSet.has(2049) || portsSet.has(139) || portsSet.has(21)) {
    assetType = 'File / Storage Server';
    confidenceScore = 50;
    exposureProfile = ['Data Storage Asset', 'Internal Service Asset'];
    primaryObjective = 'Sensitive Document Discovery & Credential Harvesting';
    if (portsSet.has(445) && portsSet.has(139)) confidenceScore += 30;
    if (portsSet.has(21) && portsSet.has(20)) confidenceScore += 30;
  }
  else if (portsSet.has(3389) || portsSet.has(5900) || portsSet.has(22)) {
    assetType = 'Remote Access Host';
    confidenceScore = 50;
    exposureProfile = ['Remote Access Asset'];
    primaryObjective = 'Interactive Foothold & Lateral Movement';
    if (portsSet.has(3389) && os.includes('windows')) confidenceScore += 40;
    if (portsSet.has(22) && os.includes('linux')) confidenceScore += 40;
  }
  else if (portsSet.has(445) && (os.includes('windows 10') || os.includes('windows 11') || os.includes('workstation'))) {
    assetType = 'Workstation';
    confidenceScore = 80;
    exposureProfile = ['Internal Service Asset'];
    primaryObjective = 'Client-side Attacks & Credential Dumping';
  }

  confidenceScore = Math.min(confidenceScore, 100);
  if (confidenceScore < 40) assetType = 'Unknown Asset';

  return { assetType, confidenceScore, exposureProfile, primaryObjective };
}
