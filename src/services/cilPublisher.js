// ============================================================
// EME — CIL Publisher Service
// Runs after a scan completes. Maps EME scan results to the
// canonical CIL schema and writes to the intelligence layer.
// ============================================================

import { CILStore, CILBus, CILNavigator } from '../integrations/cil';

/**
 * Map EME's internal scan result to the CIL canonical schema
 * and publish it for ETH and ETD to consume.
 */
export function publishExposureIntelligence(scanResult) {
  const hosts = scanResult?.hosts || [];
  const firstHost = hosts[0] || {};
  const allPorts = hosts.flatMap(h => h.ports || []);

  // Build exposures
  const exposures = allPorts.map((port, idx) => ({
    id: `exp-${idx}-${port.portId || idx}`,
    port: parseInt(port.portId || port.port || '0', 10),
    protocol: (port.protocol || 'tcp').toLowerCase(),
    service: port.service?.name || port.service || 'unknown',
    version: port.service?.version || port.version || undefined,
    state: (port.state?.state || port.state || 'open').toLowerCase(),
    severity: mapSeverity(port),
    cveIds: port.cves || [],
    isInternetFacing: true, // EME default — all discovered open ports are internet-facing
    description: port.service?.extraInfo || port.description || undefined,
    source: 'EME',
  }));

  // Build attack surface summary
  const openPorts = allPorts
    .filter(p => (p.state?.state || p.state || 'open').toLowerCase() === 'open')
    .map(p => parseInt(p.portId || p.port || '0', 10));

  const attackSurface = {
    totalPorts: allPorts.length,
    openPorts,
    criticalServices: exposures
      .filter(e => e.severity === 'critical' || e.severity === 'high')
      .map(e => e.service),
    internetFacingCount: exposures.filter(e => e.isInternetFacing).length,
    exposureScore: scanResult?.riskScore || scanResult?.exposureScore || 0,
  };

  const sessionId = CILStore.create({
    version: '1.0',
    asset: {
      id: `asset-${Date.now()}`,
      hostname: firstHost.hostname || scanResult?.target || undefined,
      ip: firstHost.address || scanResult?.ip || undefined,
      os: firstHost.os?.osMatch?.[0]?.name || firstHost.os || undefined,
      assetType: 'server',
    },
    exposures,
    attackSurface,
    attackPaths: [],
    threats: [],
    mitreTechniques: [],
    securityControls: [],
    detections: [],
    recommendations: [],
    risk: {
      overallScore: scanResult?.riskScore || 0,
      exposureScore: scanResult?.riskScore || 0,
      riskLevel: mapRiskLevel(scanResult?.riskScore || 0),
    },
    metadata: {
      eme: { published: true, publishedAt: new Date().toISOString(), scanLevel: scanResult?.scanLevel },
      eth: { published: false },
      etd: { published: false },
    },
  });

  // Notify any open CyberEDT tabs
  CILBus.emit({ type: 'EME_PUBLISHED', sessionId });

  return sessionId;
}

function mapSeverity(port) {
  const service = (port.service?.name || port.service || '').toLowerCase();
  const criticalServices = ['telnet', 'ftp', 'rsh', 'rlogin', 'vnc', 'rdp', 'smb'];
  const highServices = ['ssh', 'http', 'smtp', 'pop3', 'imap', 'snmp', 'netbios'];
  if (criticalServices.some(s => service.includes(s))) return 'critical';
  if (highServices.some(s => service.includes(s))) return 'high';
  if (port.cves?.length > 0) return 'high';
  return 'medium';
}

function mapRiskLevel(score) {
  if (score >= 80) return 'critical';
  if (score >= 60) return 'high';
  if (score >= 30) return 'medium';
  return 'low';
}

export { CILNavigator };
