import serviceMap from '../../kb/services/serviceMap.json' with { type: 'json' };

export function analyzeService(port, serviceName) {
  const portStr = String(port);
  const metadata = serviceMap[portStr];

  if (metadata) {
    return {
      port,
      ...metadata
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
    detection: 'Standard network connection logs.',
    
    // New Dataset Rich Fields Default Fallback
    id: `UNK-${port}`,
    category: 'Unknown',
    technical_summary: `Generic network service listening on port ${port}.`,
    exposure_level: 'Low',
    business_risk: 'Limited standalone risk; relevant mainly as a reconnaissance data point for attackers.',
    risk_score: 20,
    confidence: 50,
    attack_vectors: [],
    enumeration_methods: ['Banner grabbing', 'Connection testing'],
    misconfigurations: [],
    detection_methods: ['Standard network connection logs'],
    recommended_mitigations: ['Ensure service is intentionally exposed and adequately protected'],
    references: [],
    tags: ['unknown'],
    common_products: [],
    cves: []
  };
}
