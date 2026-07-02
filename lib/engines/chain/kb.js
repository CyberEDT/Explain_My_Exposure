export const MITRE_KB = {
  // --- DEFAULT FALLBACKS (If port is unknown) ---
  DEFAULT: {
    'DISCOVER': { 
      tactic: 'TA0043', tech: 'T1595', 
      desc: 'Adversaries may scan the target network to discover exposed services.', 
      mitigations: ['Implement port knocking to hide services.', 'Restrict access via strict inbound firewall rules.'],
      threatActors: ['Opportunistic Botnets']
    },
    'ENUMERATE': { 
      tactic: 'TA0007', tech: 'T1082', 
      desc: 'Attackers extract system information from exposed services.', 
      mitigations: ['Disable application version banners.', 'Require strong authentication for all queries.'],
      threatActors: ['Automated Scanners']
    },
    'ACCESS': { 
      tactic: 'TA0001', tech: 'T1190', 
      desc: 'Adversaries exploit exposed applications to gain an initial foothold.', 
      mitigations: ['Aggressively patch public-facing services.', 'Implement a Web Application Firewall (WAF).'],
      threatActors: ['Initial Access Brokers (IABs)']
    },
    'ABUSE': { 
      tactic: 'TA0002', tech: 'T1059', 
      desc: 'Attackers execute unauthorized commands on the compromised system.', 
      mitigations: ['Implement application whitelisting.', 'Monitor process creation events.'],
      threatActors: ['Generic APTs']
    },
    'MOVE': { 
      tactic: 'TA0008', tech: 'T1021', 
      desc: 'Adversaries pivot from the compromised host to other network systems.', 
      mitigations: ['Segment networks with internal firewalls.', 'Enforce strict lateral movement policies.'],
      threatActors: ['Generic APTs']
    },
    'IMPACT': { 
      tactic: 'TA0040', tech: 'T1486', 
      desc: 'Attackers disrupt availability or exfiltrate data.', 
      mitigations: ['Maintain offline backups.', 'Monitor for massive file encryption spikes.'],
      threatActors: ['Ransomware Syndicates']
    }
  },

  // --- REMOTE DESKTOP (RDP 3389) ---
  3389: {
    'DISCOVER': { 
      tactic: 'TA0043', tech: 'T1595.002', 
      desc: 'Attackers scan for exposed RDP endpoints across the internet.', 
      mitigations: ['Restrict RDP to VPN access only.', 'Use Single Packet Authorization for RDP ports.'],
      threatActors: ['Gold Southfield', 'Shodan Scanners']
    },
    'ENUMERATE': { 
      tactic: 'TA0007', tech: 'T1087.002', 
      desc: 'Attackers enumerate valid AD domain accounts via RDP login prompts.', 
      mitigations: ['Disable NLA fallback to force secure authentication.', 'Implement account lockout policies.'],
      threatActors: ['Wizard Spider']
    },
    'ACCESS': { 
      tactic: 'TA0001', tech: 'T1133', 
      desc: 'Attackers utilize external remote services (RDP) to gain a foothold via brute force or stolen credentials.', 
      mitigations: ['Enforce Multi-Factor Authentication (MFA) for RDP.', 'Implement geo-IP blocking for RDP connections.'],
      threatActors: ['LockBit', 'Conti', 'BlackCat']
    },
    'ABUSE': { 
      tactic: 'TA0002', tech: 'T1059.003', 
      desc: 'Adversaries execute Windows Command Shell commands via the RDP session.', 
      mitigations: ['Enable PowerShell Constrained Language Mode.', 'Monitor cmd.exe spawned by RDP processes.'],
      threatActors: ['FIN7']
    },
    'MOVE': { 
      tactic: 'TA0008', tech: 'T1021.001', 
      desc: 'Adversaries use valid accounts to pivot laterally via internal RDP connections.', 
      mitigations: ['Restrict lateral RDP access between standard workstations.', 'Implement Remote Credential Guard.'],
      threatActors: ['LockBit', 'Cl0p']
    },
    'IMPACT': { 
      tactic: 'TA0040', tech: 'T1486', 
      desc: 'Attackers deploy ransomware manually through the active remote desktop session.', 
      mitigations: ['Deploy Endpoint Detection and Response (EDR) to block ransomware execution.', 'Isolate backups from domain authentication.'],
      threatActors: ['LockBit', 'BlackBasta', 'ALPHV']
    }
  },

  // --- SMB / WINDOWS FILE SHARING (445) ---
  445: {
    'DISCOVER': { 
      tactic: 'TA0043', tech: 'T1595', 
      desc: 'Adversaries mass-scan the internet for exposed port 445 (SMB).', 
      mitigations: ['Block port 445 at the perimeter firewall.', 'Disable NetBIOS over TCP/IP.'],
      threatActors: ['Mirai Botnet', 'Masscan Operators']
    },
    'ENUMERATE': { 
      tactic: 'TA0007', tech: 'T1087', 
      desc: 'Attackers extract null session data, enumerating users and group policies via SMB.', 
      mitigations: ['Disable anonymous/null SMB access via registry.', 'Restrict access to IPC$ shares.'],
      threatActors: ['APT29 (Cozy Bear)']
    },
    'ACCESS': { 
      tactic: 'TA0001', tech: 'T1190', 
      desc: 'Attackers exploit known SMB vulnerabilities (e.g. EternalBlue) to gain SYSTEM access.', 
      mitigations: ['Patch Windows systems immediately for SMB CVEs.', 'Disable SMBv1 completely network-wide.'],
      threatActors: ['Lazarus Group', 'WannaCry Actors']
    },
    'ABUSE': { 
      tactic: 'TA0002', tech: 'T1047', 
      desc: 'Adversaries abuse WMI over SMB to execute payloads remotely.', 
      mitigations: ['Restrict WMI access to dedicated administrative subnets.', 'Monitor WmiPrvSE.exe for anomalous child processes.'],
      threatActors: ['APT3', 'FIN7']
    },
    'MOVE': { 
      tactic: 'TA0008', tech: 'T1021.002', 
      desc: 'Attackers laterally move by mounting ADMIN$ / C$ shares and passing the hash.', 
      mitigations: ['Enforce SMB Signing to prevent NTLM Relay attacks.', 'Disable local administrator account lateral usage (LAPS).'],
      threatActors: ['Sandworm', 'Lazarus Group']
    },
    'IMPACT': { 
      tactic: 'TA0040', tech: 'T1565.001', 
      desc: 'Ransomware propagates through the network by encrypting mounted SMB shares.', 
      mitigations: ['Implement aggressive file-screening filters on file servers.', 'Use offline immutable backups for critical data shares.'],
      threatActors: ['NotPetya Actors', 'LockBit']
    }
  },

  // --- WEB APPLICATIONS (80, 443) ---
  80: {
    'DISCOVER': { 
      tactic: 'TA0043', tech: 'T1595.001', 
      desc: 'Adversaries use web scrapers and scanners to map out website structure and paths.', 
      mitigations: ['Deploy a Web Application Firewall (WAF).', 'Block known scanner user-agents.'],
      threatActors: ['Automated Scanners', 'Bug Bounty Hunters']
    },
    'ENUMERATE': { 
      tactic: 'TA0007', tech: 'T1082', 
      desc: 'Attackers identify the underlying web framework (e.g. Apache, Nginx) from HTTP headers.', 
      mitigations: ['Strip "Server" and "X-Powered-By" HTTP response headers.', 'Use generic error pages.'],
      threatActors: ['Reconnaissance Botnets']
    },
    'ACCESS': { 
      tactic: 'TA0001', tech: 'T1190', 
      desc: 'Attackers exploit SQL Injection or Remote Code Execution flaws in the web application.', 
      mitigations: ['Enforce strict input validation and parameterized queries.', 'Deploy WAF signatures for OWASP Top 10.'],
      threatActors: ['APT41', 'Magecart']
    },
    'ABUSE': { 
      tactic: 'TA0002', tech: 'T1505.003', 
      desc: 'Adversaries drop web shells (e.g. PHP/ASP) to maintain persistent execution context.', 
      mitigations: ['Make web directories read-only to the web service user.', 'Monitor web server directories for new file creation.'],
      threatActors: ['HAFNIUM', 'APT32']
    },
    'MOVE': { 
      tactic: 'TA0008', tech: 'T1090', 
      desc: 'Attackers use the compromised web server as a proxy to reach internal databases.', 
      mitigations: ['Segment the DMZ to restrict outbound web server connections.', 'Implement strict egress filtering.'],
      threatActors: ['MuddyWater']
    },
    'IMPACT': { 
      tactic: 'TA0040', tech: 'T1499', 
      desc: 'Adversaries launch Application-Layer DDoS attacks or deface the website.', 
      mitigations: ['Implement aggressive rate-limiting on costly API endpoints.', 'Deploy content delivery networks (CDNs) for caching protection.'],
      threatActors: ['KillNet', 'Anonymous']
    }
  },
  
  // Database aliases mapping back to a custom DB profile
  3306: 'DB', 1433: 'DB', 5432: 'DB',
  
  'DB': {
    'DISCOVER': { 
      tactic: 'TA0043', tech: 'T1595.002', 
      desc: 'Attackers scan the network for exposed database listener ports.', 
      mitigations: ['Never expose databases directly to the internet.', 'Bind database listeners to localhost or internal IPs only.'],
      threatActors: ['Data Brokers']
    },
    'ENUMERATE': { 
      tactic: 'TA0007', tech: 'T1082', 
      desc: 'Attackers extract database version info from the protocol handshake.', 
      mitigations: ['Require client certificates for database connections.', 'Disable banner grabbing on the database port.'],
      threatActors: ['Automated Scanners']
    },
    'ACCESS': { 
      tactic: 'TA0001', tech: 'T1190', 
      desc: 'Attackers brute-force default credentials (e.g. sa/root) or exploit known CVEs.', 
      mitigations: ['Disable default administrative accounts (sa/root).', 'Enforce complex passwords for all database users.'],
      threatActors: ['Karakurt', 'Lapsus$']
    },
    'ABUSE': { 
      tactic: 'TA0002', tech: 'T1059', 
      desc: 'Adversaries use extended stored procedures (e.g. xp_cmdshell) to execute OS commands.', 
      mitigations: ['Disable xp_cmdshell and dangerous stored procedures.', 'Run database services as low-privileged local accounts.'],
      threatActors: ['APT41']
    },
    'MOVE': { 
      tactic: 'TA0008', tech: 'T1021.002', 
      desc: 'Attackers pivot using trust relationships or linked database servers.', 
      mitigations: ['Remove unnecessary database links/federations.', 'Isolate database servers from the rest of the flat network.'],
      threatActors: ['FIN11']
    },
    'IMPACT': { 
      tactic: 'TA0040', tech: 'T1565', 
      desc: 'Adversaries drop entire tables, exfiltrate PII, or encrypt database files.', 
      mitigations: ['Implement Database Activity Monitoring (DAM).', 'Encrypt sensitive PII/PHI columns at rest.'],
      threatActors: ['Cl0p', 'Lapsus$']
    }
  },

  // --- SCADA / MODBUS (502) ---
  502: {
    'DISCOVER': { 
      tactic: 'TA0043', tech: 'T1595', 
      desc: 'Attackers scan the internet for exposed ICS (Industrial Control Systems) and Modbus listeners.', 
      mitigations: ['Strictly isolate ICS networks from the corporate internet.', 'Implement unidirectional gateways (data diodes).'],
      threatActors: ['Sandworm', 'Electrum']
    },
    'ENUMERATE': { 
      tactic: 'TA0007', tech: 'T1082', 
      desc: 'Adversaries query the PLC device to identify manufacturer, firmware version, and register maps.', 
      mitigations: ['Disable passive network discovery protocols on PLCs.', 'Deploy ICS-specific deep packet inspection (DPI).'],
      threatActors: ['Xenotime']
    },
    'ACCESS': { 
      tactic: 'TA0001', tech: 'T1190', 
      desc: 'Attackers send unauthorized Modbus TCP commands directly to the unauthenticated PLC.', 
      mitigations: ['Enforce IP whitelisting at the network boundary for all Modbus traffic.', 'Implement secure remote access (ZTNA) for engineering stations.'],
      threatActors: ['Sandworm', 'Voodoo Bear']
    },
    'ABUSE': { 
      tactic: 'TA0002', tech: 'T1059', 
      desc: 'Adversaries manipulate coil and register values to alter industrial physical processes.', 
      mitigations: ['Implement mechanical safety overrides that cannot be bypassed via software.', 'Lock PLC physical key switches to "RUN" mode.'],
      threatActors: ['Stuxnet Actors', 'Triton']
    },
    'MOVE': { 
      tactic: 'TA0008', tech: 'T1021', 
      desc: 'Attackers use the compromised HMI or engineering station to pivot deeper into the OT network.', 
      mitigations: ['Enforce the Purdue Enterprise Reference Architecture (PERA).', 'Segment OT and IT zones completely.'],
      threatActors: ['Dragonfly']
    },
    'IMPACT': { 
      tactic: 'TA0040', tech: 'T1495', 
      desc: 'Adversaries cause physical destruction of equipment or halt critical infrastructure processes.', 
      mitigations: ['Deploy redundant, out-of-band safety instrumented systems (SIS).', 'Establish manual operation procedures for critical failures.'],
      threatActors: ['Sandworm', 'Triton']
    }
  },

  // --- IN-MEMORY DBS (Redis 6379, Memcached 11211) ---
  6379: 'INMEMORY', 11211: 'INMEMORY',

  'INMEMORY': {
    'DISCOVER': { 
      tactic: 'TA0043', tech: 'T1595', 
      desc: 'Attackers scan for exposed in-memory data stores that are accidentally internet-reachable.', 
      mitigations: ['Bind Redis/Memcached to localhost (127.0.0.1) only.', 'Implement strict host-based firewall rules (iptables).'],
      threatActors: ['Kinsing Botnet', 'WatchDog']
    },
    'ENUMERATE': { 
      tactic: 'TA0007', tech: 'T1082', 
      desc: 'Adversaries use "INFO" or "KEYS" commands to extract infrastructure metadata and caching keys.', 
      mitigations: ['Rename dangerous commands (e.g., CONFIG, FLUSHALL) via configuration.', 'Enable protected mode.'],
      threatActors: ['Automated Scanners']
    },
    'ACCESS': { 
      tactic: 'TA0001', tech: 'T1190', 
      desc: 'Attackers access the unauthenticated database directly to read or write data.', 
      mitigations: ['Enable AUTH and enforce a long, complex password in redis.conf.', 'Deploy TLS for all in-transit memory access.'],
      threatActors: ['TeamTNT', 'Kinsing']
    },
    'ABUSE': { 
      tactic: 'TA0002', tech: 'T1059', 
      desc: 'Adversaries abuse the database to write unauthorized SSH keys to /root/.ssh/authorized_keys.', 
      mitigations: ['Run the service as a dedicated low-privileged user (e.g., "redis").', 'Restrict write access to sensitive OS directories.'],
      threatActors: ['TeamTNT', 'Rocke']
    },
    'MOVE': { 
      tactic: 'TA0008', tech: 'T1021', 
      desc: 'Attackers use the compromised cache server to laterally access internal API endpoints.', 
      mitigations: ['Segment caching servers into a restricted VLAN.', 'Monitor outbound connections from the cache tier.'],
      threatActors: ['Cryptojacking Syndicates']
    },
    'IMPACT': { 
      tactic: 'TA0040', tech: 'T1496', 
      desc: 'Adversaries deploy cryptocurrency miners, causing severe resource exhaustion and application downtime.', 
      mitigations: ['Monitor CPU usage anomalies across all caching infrastructure.', 'Implement strict resource limits using cgroups.'],
      threatActors: ['Kinsing', 'WatchDog']
    }
  },
  
  // --- MQTT / IOT (1883) ---
  1883: {
    'DISCOVER': { 
      tactic: 'TA0043', tech: 'T1595', 
      desc: 'Attackers scan for exposed MQTT brokers leaking IoT telemetry data.', 
      mitigations: ['Ensure MQTT brokers are behind a secure API gateway.', 'Use MQTTS (Port 8883) instead of plaintext MQTT.'],
      threatActors: ['Mirai Botnet']
    },
    'ENUMERATE': { 
      tactic: 'TA0007', tech: 'T1082', 
      desc: 'Adversaries subscribe to "#" (wildcard) to capture all topics and discover connected IoT endpoints.', 
      mitigations: ['Disable wildcard subscriptions for unauthorized clients.', 'Implement strict Access Control Lists (ACLs) per topic.'],
      threatActors: ['Recon Botnets']
    },
    'ACCESS': { 
      tactic: 'TA0001', tech: 'T1190', 
      desc: 'Attackers connect to the open broker without authentication to hijack the data stream.', 
      mitigations: ['Disable anonymous access in mosquitto.conf.', 'Enforce mutual TLS (mTLS) for device authentication.'],
      threatActors: ['IoT Hackers']
    },
    'ABUSE': { 
      tactic: 'TA0002', tech: 'T1059', 
      desc: 'Adversaries publish malicious payloads or forged telemetry to manipulate backend processing engines.', 
      mitigations: ['Implement payload schema validation at the broker level.', 'Rate-limit publish events per client.'],
      threatActors: ['Mirai variants']
    },
    'MOVE': { 
      tactic: 'TA0008', tech: 'T1021', 
      desc: 'Attackers pivot through the MQTT broker to access internal IoT command & control servers.', 
      mitigations: ['Isolate the MQTT broker in a dedicated DMZ.', 'Restrict backend servers from accepting generic broker traffic.'],
      threatActors: ['APT41']
    },
    'IMPACT': { 
      tactic: 'TA0040', tech: 'T1498', 
      desc: 'Adversaries flood the broker with messages, causing a Denial of Service (DoS) for all connected IoT devices.', 
      mitigations: ['Configure strict message size and queue limits.', 'Deploy network traffic analysis to detect MQTT flooding.'],
      threatActors: ['KillNet']
    }
  }
};

// Aliases
MITRE_KB[443] = MITRE_KB[80];

export function getMitreContext(portsSet, stage) {
  // Try to find the most "critical" port to represent the context
  let primaryPort = null;
  const targetPorts = [502, 445, 3389, 6379, 11211, 1433, 3306, 5432, 1883, 80, 443];
  
  for (const p of targetPorts) {
    if (portsSet.has(p)) {
      primaryPort = p;
      break;
    }
  }

  if (primaryPort && MITRE_KB[primaryPort]) {
    const profile = typeof MITRE_KB[primaryPort] === 'string' ? MITRE_KB[MITRE_KB[primaryPort]] : MITRE_KB[primaryPort];
    return profile[stage] || MITRE_KB.DEFAULT[stage];
  }

  return MITRE_KB.DEFAULT[stage];
}
