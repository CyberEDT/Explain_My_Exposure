import { identifyAsset } from '../asset-id/identifier.js';
import { calculateAttackerInterest, calculateAttackerValue } from '../interest/calculator.js';
import { detectOpportunities } from '../opportunity/detector.js';
import { mapToExposureChain } from '../chain/mapper.js';
import { getMitreContext } from '../chain/kb.js';
import { generateHostNarrative } from '../narrative/engine.js';

export class IntelligencePipeline {
  static process(parsedData, scanLevel = 'medium') {
    if (!parsedData || !parsedData.hosts) return parsedData;

    let totalPorts = 0;
    let criticalServices = 0;
    let hasRdpOrSmb = false;
    let hasCleartext = false;

    const aggregateChain = {
      DISCOVER: 0, ENUMERATE: 0, ACCESS: 0, ABUSE: 0, MOVE: 0, IMPACT: 0
    };
    const allPortsSet = new Set();

    const filteredHosts = [];

    parsedData.hosts.forEach(host => {
      let validPorts = host.ports || [];
      
      if (scanLevel === 'low') {
        validPorts = validPorts.filter(p => ['Critical', 'High'].includes(calculateAttackerInterest(new Set([p.port]))));
      } else if (scanLevel === 'medium') {
        validPorts = validPorts.filter(p => ['Critical', 'High', 'Medium'].includes(calculateAttackerInterest(new Set([p.port]))));
      }

      // If strict filtering removed all ports, drop the host unless it's a high intensity scan
      if (validPorts.length === 0 && scanLevel !== 'high') return;

      host.ports = validPorts;
      const portsSet = new Set(validPorts.map(p => p.port));
      for (const p of portsSet) allPortsSet.add(p);
      
      const identity = identifyAsset(validPorts, host.os);

      // --- Hostname Heuristics Enhancement ---
      const hostnamesStr = (host.hostnames || []).join(' ').toLowerCase();
      if (hostnamesStr) {
        if (hostnamesStr.includes('dc') || hostnamesStr.includes('ad')) {
          if (identity.assetType === 'Domain Controller') identity.confidenceScore = Math.min(100, identity.confidenceScore + 15);
        }
        if (hostnamesStr.includes('sql') || hostnamesStr.includes('db')) {
          if (identity.assetType === 'Database Server') identity.confidenceScore = Math.min(100, identity.confidenceScore + 15);
        }
        if (hostnamesStr.includes('web') || hostnamesStr.includes('www')) {
          if (identity.assetType === 'Web Application Server') identity.confidenceScore = Math.min(100, identity.confidenceScore + 15);
        }
      }

      const attackerValue = calculateAttackerValue(identity.assetType);
      const attackerInterest = calculateAttackerInterest(portsSet);
      const opportunities = detectOpportunities(portsSet);
      const chainStages = mapToExposureChain(portsSet, identity.assetType);
      const narrativeContext = generateHostNarrative(identity.assetType, identity.exposureProfile, attackerInterest, portsSet, scanLevel);

      host.intelligence = {
        asset_type: identity.assetType,
        exposure_profile: identity.exposureProfile,
        confidence_score: identity.confidenceScore,
        attacker_value: attackerValue,
        attacker_interest: attackerInterest,
        primary_objective: identity.primaryObjective,
        opportunities: opportunities,
        exposure_chain: chainStages,
        narrative_context: narrativeContext
      };

      // Aggregate network chain
      chainStages.forEach(stg => {
        aggregateChain[stg.stage] = Math.max(aggregateChain[stg.stage], stg.score);
      });

      // Legacy fallback
      host.role = identity.assetType.toUpperCase().replace(/ /g, '_');

      // Metrics calculation
      totalPorts += (host.ports || []).length;
      for (const portInfo of (host.ports || [])) {
        const p = portInfo.port;
        if ([445, 3389, 5900, 5985, 5986, 23, 21].includes(p)) criticalServices++;
        if ([445, 3389].includes(p)) hasRdpOrSmb = true;
        if ([21, 23].includes(p)) hasCleartext = true;
      }
      
      filteredHosts.push(host);
    });

    parsedData.hosts = filteredHosts;

    const recommendations = [];
    
    if (scanLevel === 'low') {
      // Beginner / Executive language
      recommendations.push('Turn on Multi-Factor Authentication (MFA) for all remote logins to prevent stolen passwords from being used.');
      recommendations.push('Keep all internet-facing software updated automatically to protect against known hacker exploits.');
      if (hasRdpOrSmb) recommendations.push('Never expose Windows file sharing or remote desktop directly to the internet. Always use a secure VPN.');
      if (hasCleartext) recommendations.push('Stop using outdated, unencrypted systems (like Telnet or FTP) where passwords can be intercepted.');
      if (recommendations.length < 4) recommendations.push('Close any background services or network ports that your business does not actively use.');
      if (recommendations.length < 4) recommendations.push('Install a basic firewall to block incoming connections from unknown or suspicious locations.');
    } else if (scanLevel === 'medium') {
      // Standard IT / Intermediate language
      recommendations.push('Enforce network segmentation to isolate external-facing servers from internal core data repositories.');
      recommendations.push('Establish a continuous attack surface monitoring program and enforce strict patching SLAs within 48 hours for critical CVEs.');
      if (hasRdpOrSmb) recommendations.push('Restrict public access to SMB (445) and RDP (3389). Route administrative access through a VPN requiring MFA.');
      if (hasCleartext) recommendations.push('Migrate unencrypted legacy administrative terminals to secure cryptographic alternatives (SFTP/SSH) to prevent credential sniffing.');
      if (totalPorts > 10) recommendations.push('Reduce external attack surface density by disabling unneeded interfaces and implementing strict rate-limiting.');
      if (recommendations.length < 4) recommendations.push('Sanitize exposed service configurations by disabling OS and application version banners to slow down automated scanners.');
    } else {
      // Expert / Verbose language
      recommendations.push('Implement a Zero-Trust Network Access (ZTNA) architecture, requiring continuous context-aware authentication before granting access to internal nodes.');
      recommendations.push('Enforce strict micro-segmentation and deploy active defense mechanisms (honeypots) to detect early reconnaissance and lateral pivoting.');
      if (hasRdpOrSmb) {
        recommendations.push('Enforce SMB Signing network-wide and permanently disable legacy SMBv1 protocols to neutralize NTLM relay and lateral movement paths.');
        recommendations.push('Restrict Tier-0 administrative access to dedicated Privileged Access Workstations (PAWs) isolated from standard internet routing.');
      }
      if (hasCleartext) recommendations.push('Audit legacy protocols and enforce strict IPSec tunneling for any required plaintext legacy transmission across untrusted boundaries.');
      if (totalPorts > 10) recommendations.push('Reduce external attack surface density by implementing Single Packet Authorization (SPA) or port-knocking for sensitive administrative ports.');
      if (recommendations.length < 4) recommendations.push('Maintain offline, immutable backup infrastructure decoupled from Active Directory to ensure ransomware recovery resilience.');
    }


    parsedData.metrics = {
      openPortsCount: totalPorts,
      criticalServicesCount: criticalServices,
      recommendations: recommendations,
      exposure_chain: [
        { stage: 'DISCOVER', score: aggregateChain.DISCOVER, fullMark: 100, context: getMitreContext(allPortsSet, 'DISCOVER') },
        { stage: 'ENUMERATE', score: aggregateChain.ENUMERATE, fullMark: 100, context: getMitreContext(allPortsSet, 'ENUMERATE') },
        { stage: 'ACCESS', score: aggregateChain.ACCESS, fullMark: 100, context: getMitreContext(allPortsSet, 'ACCESS') },
        { stage: 'ABUSE', score: aggregateChain.ABUSE, fullMark: 100, context: getMitreContext(allPortsSet, 'ABUSE') },
        { stage: 'MOVE', score: aggregateChain.MOVE, fullMark: 100, context: getMitreContext(allPortsSet, 'MOVE') },
        { stage: 'IMPACT', score: aggregateChain.IMPACT, fullMark: 100, context: getMitreContext(allPortsSet, 'IMPACT') }
      ]
    };

    return parsedData;
  }
}
