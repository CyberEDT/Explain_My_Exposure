import serviceMap from '../../kb/services/serviceMap.json' assert { type: 'json' };

export function analyzeService(port, serviceName) {
  const portStr = String(port);
  const metadata = serviceMap[portStr];

  if (metadata) {
    return {
      port,
      name: metadata.name,
      description: metadata.description,
      interest: metadata.interest,
      severity: metadata.severity,
      whyAttackersCare: metadata.whyAttackersCare,
      recon: metadata.recon,
      exploit: metadata.exploit,
      objective: metadata.objective,
      mitre: metadata.mitre,
      detection: metadata.detection
    };
  }

  // Fallback profile if port is not in our KB database
  return {
    port,
    name: serviceName || 'Unknown Service',
    description: `Generic network service listening on port ${port}.`,
    interest: 20,
    severity: 'Low',
    whyAttackersCare: 'An attacker would probe this port during reconnaissance to find out what service is listening and whether a banner exposes a version.',
    recon: 'Banner grabbing, connection testing.',
    exploit: 'Standard connection scanning, protocol version checks.',
    objective: 'Reconnaissance / Footprinting.',
    mitre: ['T1046'],
    detection: 'Standard network connection logs.'
  };
}
