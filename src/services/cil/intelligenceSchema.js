/**
 * Map EME's internal analysis result to the standardized CyberEDT Intelligence Object.
 */
export function formatToIntelligenceObject(scanResult) {
  const hosts = scanResult?.hosts || [];
  const firstHost = hosts[0] || {};
  const allPorts = hosts.flatMap(h => h.ports || []);

  const ports = allPorts.map(p => parseInt(p.portId || p.port || '0', 10));
  const services = allPorts.map(p => p.service?.name || p.service || 'unknown');

  const exposures = allPorts.map((port, idx) => ({
    id: `exp-${idx}-${port.portId || idx}`,
    port: parseInt(port.portId || port.port || '0', 10),
    protocol: (port.protocol || 'tcp').toLowerCase(),
    service: port.service?.name || port.service || 'unknown',
    version: port.service?.version || port.version || undefined,
    state: (port.state?.state || port.state || 'open').toLowerCase(),
    severity: mapSeverity(port),
    cveIds: port.cves || [],
    description: port.service?.extraInfo || port.description || undefined,
  }));

  const riskScore = scanResult?.riskScore || scanResult?.exposureScore || scanResult?.score || 0;

  return {
    tool: "EME",
    version: "1.0",
    asset: {
      hostname: firstHost.hostname || scanResult?.target || 'unknown',
      ip: firstHost.address || firstHost.ip || scanResult?.ip || 'unknown',
      os: firstHost.os?.osMatch?.[0]?.name || firstHost.os || 'unknown',
    },
    exposureChain: scanResult?.paths || [],
    services,
    ports,
    exposures,
    risk: {
      score: riskScore,
      level: mapRiskLevel(riskScore),
    },
    metadata: {
      publishedAt: new Date().toISOString(),
      scanLevel: scanResult?.scanLevel,
    }
  };
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
