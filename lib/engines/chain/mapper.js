// Core scoring logic for the 6-stage EME Exposure Chain
import { getMitreContext } from './kb.js';

const SERVICE_PROFILES = {
  // Key represents the port
  21:   { DISCOVER: 4, ENUMERATE: 6, ACCESS: 8, ABUSE: 5, MOVE: 3, IMPACT: 6 }, // FTP
  22:   { DISCOVER: 2, ENUMERATE: 5, ACCESS: 8, ABUSE: 9, MOVE: 9, IMPACT: 8 }, // SSH
  23:   { DISCOVER: 5, ENUMERATE: 7, ACCESS: 9, ABUSE: 7, MOVE: 7, IMPACT: 8 }, // Telnet
  25:   { DISCOVER: 5, ENUMERATE: 8, ACCESS: 3, ABUSE: 4, MOVE: 2, IMPACT: 5 }, // SMTP
  53:   { DISCOVER: 9, ENUMERATE: 9, ACCESS: 2, ABUSE: 6, MOVE: 4, IMPACT: 8 }, // DNS
  80:   { DISCOVER: 8, ENUMERATE: 7, ACCESS: 5, ABUSE: 8, MOVE: 3, IMPACT: 7 }, // HTTP
  443:  { DISCOVER: 7, ENUMERATE: 6, ACCESS: 5, ABUSE: 8, MOVE: 3, IMPACT: 7 }, // HTTPS
  88:   { DISCOVER: 3, ENUMERATE: 9, ACCESS: 8, ABUSE: 7, MOVE: 8, IMPACT: 9 }, // Kerberos
  139:  { DISCOVER: 8, ENUMERATE: 9, ACCESS: 7, ABUSE: 8, MOVE: 9, IMPACT: 8 }, // NetBIOS
  389:  { DISCOVER: 6, ENUMERATE: 10, ACCESS: 5, ABUSE: 7, MOVE: 8, IMPACT: 9 }, // LDAP
  445:  { DISCOVER: 8, ENUMERATE: 10, ACCESS: 7, ABUSE: 10, MOVE: 10, IMPACT: 9 }, // SMB
  502:  { DISCOVER: 6, ENUMERATE: 9, ACCESS: 10, ABUSE: 10, MOVE: 8, IMPACT: 10 }, // Modbus/SCADA (Phase 1)
  1433: { DISCOVER: 5, ENUMERATE: 5, ACCESS: 7, ABUSE: 8, MOVE: 4, IMPACT: 9 }, // MSSQL
  1883: { DISCOVER: 8, ENUMERATE: 8, ACCESS: 9, ABUSE: 9, MOVE: 5, IMPACT: 8 }, // MQTT (Phase 1)
  3306: { DISCOVER: 5, ENUMERATE: 5, ACCESS: 7, ABUSE: 8, MOVE: 4, IMPACT: 9 }, // MySQL
  3389: { DISCOVER: 5, ENUMERATE: 7, ACCESS: 9, ABUSE: 7, MOVE: 6, IMPACT: 8 }, // RDP
  5432: { DISCOVER: 5, ENUMERATE: 5, ACCESS: 7, ABUSE: 8, MOVE: 4, IMPACT: 9 }, // PostgreSQL
  5900: { DISCOVER: 6, ENUMERATE: 4, ACCESS: 8, ABUSE: 6, MOVE: 5, IMPACT: 7 }, // VNC
  5985: { DISCOVER: 4, ENUMERATE: 6, ACCESS: 8, ABUSE: 9, MOVE: 9, IMPACT: 8 }, // WinRM
  6379: { DISCOVER: 7, ENUMERATE: 8, ACCESS: 10, ABUSE: 10, MOVE: 7, IMPACT: 10 }, // Redis (Phase 1)
  11211:{ DISCOVER: 7, ENUMERATE: 8, ACCESS: 10, ABUSE: 9, MOVE: 6, IMPACT: 9 }, // Memcached (Phase 1)
};

const STAGES = ['DISCOVER', 'ENUMERATE', 'ACCESS', 'ABUSE', 'MOVE', 'IMPACT'];

export function mapToExposureChain(portsSet, assetType) {
  // 1. Initialize Base Scores
  let baseScores = { DISCOVER: 0, ENUMERATE: 0, ACCESS: 0, ABUSE: 0, MOVE: 0, IMPACT: 0 };
  
  if (portsSet.size === 0) {
    return STAGES.map(stage => ({ 
      stage, 
      score: 0, 
      fullMark: 100,
      context: getMitreContext(portsSet, stage)
    }));
  }

  // 2. Max Aggregation across all exposed services
  for (const port of portsSet) {
    const profile = SERVICE_PROFILES[port];
    if (profile) {
      for (const stage of STAGES) {
        baseScores[stage] = Math.max(baseScores[stage], profile[stage] * 10);
      }
    } else {
      // Default fallback for unknown ports
      baseScores.DISCOVER = Math.max(baseScores.DISCOVER, 30);
      baseScores.ENUMERATE = Math.max(baseScores.ENUMERATE, 20);
      baseScores.ACCESS = Math.max(baseScores.ACCESS, 10);
    }
  }

  // 3. Combination Penalties (Synergies)
  // SMB + RDP
  if (portsSet.has(445) && portsSet.has(3389)) {
    baseScores.MOVE += 30;
    baseScores.IMPACT += 20;
  }
  // LDAP + Kerberos + SMB (DC Profile)
  if (portsSet.has(389) && portsSet.has(88) && portsSet.has(445)) {
    baseScores.IMPACT = 100;
  }
  // Web + Database
  const hasWeb = portsSet.has(80) || portsSet.has(443);
  const hasDb = portsSet.has(1433) || portsSet.has(3306) || portsSet.has(5432);
  if (hasWeb && hasDb) {
    baseScores.ABUSE += 40;
  }
  // Dual Admin (SSH + WinRM)
  if (portsSet.has(22) && portsSet.has(5985)) {
    baseScores.ACCESS += 20;
  }

  // 4. Asset Role Multipliers
  let impactMult = 1.0;
  let accessMult = 1.0;
  let moveMult = 1.0;
  let abuseMult = 1.0;

  if (assetType === 'Domain Controller') impactMult = 2.0;
  else if (assetType === 'Database Server') impactMult = 1.8;
  else if (assetType === 'Web Application Server') accessMult = 1.5;
  else if (assetType === 'Workstation') moveMult = 1.5;
  else if (assetType === 'Network Device') abuseMult = 1.5;

  baseScores.IMPACT *= impactMult;
  baseScores.ACCESS *= accessMult;
  baseScores.MOVE *= moveMult;
  baseScores.ABUSE *= abuseMult;

  // 5. Normalization & Formatting
  return STAGES.map(stage => {
    return {
      stage,
      score: Math.min(100, Math.round(baseScores[stage])),
      fullMark: 100,
      context: getMitreContext(portsSet, stage)
    };
  });
}
