export const MOCK_PRELOADED_DATA = {
  score: 71,
  metrics: {
    openPorts: 6,
    criticalServices: 2,
    attackPathsCount: 1
  },
  hosts: [
    {
      ip: '172.18.4.12',
      role: 'DOMAIN_CONTROLLER',
      os: 'Windows Server 2019',
      ports: [
        { port: 22, protocol: 'tcp', service: 'ssh', version: 'OpenSSH 8.0' },
        { port: 80, protocol: 'tcp', service: 'http', version: 'Microsoft IIS 10.0' },
        { port: 135, protocol: 'tcp', service: 'msrpc', version: 'Microsoft Windows RPC' },
        { port: 389, protocol: 'tcp', service: 'ldap', version: 'Microsoft Active Directory LDAP' },
        { port: 445, protocol: 'tcp', service: 'microsoft-ds', version: 'Windows Server 2019 SMBv1' },
        { port: 3389, protocol: 'tcp', service: 'ms-wbt-server', version: 'Microsoft Terminal Services' }
      ],
      priority: 'Critical',
      apesScore: 71,
      maxPort: 445,
      intelligence: {
        asset_type: 'Domain Controller',
        exposure_profile: ['Identity Infrastructure'],
        confidence_score: 90,
        attacker_value: 'Critical',
        attacker_interest: 'Critical',
        primary_objective: 'Domain Takeover & Credential Harvesting',
        narrative_context: 'This asset operates as a core identity provider. Exposing administrative or directory services makes it a highly-prized target for NTLM relay, Kerberoasting, and complete domain takeover.'
      }
    }
  ],
  paths: [
    {
      id: 'path-1',
      node: '172.18.4.12',
      likelihood: 'High',
      steps: ['Public Internet', 'RDP:3389', 'SMB:445', 'LDAP:389', 'DC_ADMIN']
    }
  ],
  mitre: [
    { node: '172.18.4.12:445', techniqueName: 'Remote Services', techniqueId: 'T1021', description: 'Adversaries may use Remote Services to move laterally within a network.' },
    { node: '172.18.4.12:3389', techniqueName: 'Brute Force', techniqueId: 'T1110', description: 'Adversaries may use brute force attacks to obtain credentials.' },
    { node: '172.18.4.12:389', techniqueName: 'Kerberoasting', techniqueId: 'T1558', description: 'Adversaries may target Active Directory service accounts to dump Kerberos tickets.' }
  ],
  narrative: `### Attacker Priority: HIGH RISK EXPOSURE DETECTED

An attacker scanning this network segment would immediately isolate this host because it exposes critical remote control and file sharing services (such as SMB/RDP/LDAP). These protocols represent the highest priority targets for initial ingress and internal lateral movement.

#### Exposed Port Breakdown:

*   **Port 445 (SMB):** Windows admin shares (C$, ADMIN$) allow remote execution if admin credentials are relayable or sprayed.
*   **Port 3389 (RDP):** Active Remote Desktop console enables interactive GUI control, susceptible to credential stuffing and brute force.
*   **Port 389 (LDAP):** Active Directory directory service allows unauthenticated Active Directory querying and SPN harvesting.
*   **Port 22 (SSH):** Secure shell management console. Botnets routinely brute-force SSH endpoints.
*   **Port 80 (HTTP):** Standard web service interface. May run outdated IIS modules.

#### Attacker's Next Steps:

The presence of an open SMB interface makes it highly likely that attackers will deploy automated NTLM hash harvesting scripts. Your primary objective should be blocking public SMB bindings and enforcing firewall rules to restrict lateral movement across subnets.`,
  recommendations: [
    "Disable SMBv1; enforce SMB signing and disable null-session directory enumeration.",
    "Restrict RDP (3389) bindings using network ACLs and require multi-factor authentication.",
    "Transition sensitive Active Directory SPN service accounts to Group Managed Service Accounts (gMSA)."
  ]
};
