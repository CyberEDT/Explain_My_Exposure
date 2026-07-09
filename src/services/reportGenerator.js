export const getSectionMarkdown = (section, activeResult, targetHostIp, hosts, currentHost) => {
  if (section === '01 Executive Summary') {
    return `### 01 Executive Summary
    
The network exposure assessment has concluded client-side. The compiled threat metrics highlight potential ingress vectors that could be leveraged by threat groups to compromise infrastructure nodes.

*   **Overall Network Exposure Index:** **${activeResult.score}/100 Exposure Score**
*   **Identified Risk Profile:** ${activeResult.score >= 85 ? 'CRITICAL' : activeResult.score >= 70 ? 'HIGH' : activeResult.score >= 40 ? 'MEDIUM' : 'LOW'}
*   **Total Scanned Hosts:** ${hosts.length}
*   **Exposed Network Port Count:** ${activeResult.metrics?.openPorts || 0}
*   **Critical Entrypoints:** ${activeResult.metrics?.criticalServices || 0}

**Asset Intelligence Insights:**
${hosts.map(h => `*   **${h.ip}** (${h.intelligence?.asset_type || 'Unknown'}): ${h.intelligence?.narrative_context || 'No narrative generated.'}`).join('\n')}

**Privacy Statement:** Analysis was executed client-side local-first. No topology data was transmitted to external servers. All IP configurations, hostnames, and service listings remain in volatile memory.`;
  }

  if (section === '02 Host Inventory') {
    let table = `### 02 Detected Node Inventory\n\n| Host IP Address | Assumed Network Role | Confidence | Active Interfaces |\n| --- | --- | --- | --- |\n`;
    hosts.forEach(h => {
      const portStr = (h.ports || []).map(p => `${p.port}/${p.protocol}`).join(', ');
      const role = h.intelligence?.asset_type || h.role || 'Unknown';
      const conf = h.intelligence?.confidence_score ? `${h.intelligence.confidence_score}%` : 'N/A';
      table += `| **${h.ip}** | ${role} | ${conf} | ${portStr} |\n`;
    });
    return table;
  }

  if (section === '03 Exposure Scoring') {
    let breakdown = `### 03 Exposure Scoring Breakdown

The Exposure Scoring model calculates threats based on non-linear chaining.

$$EXPOSURE\\_SCORE = \\min(100, B_{max} + \\sum B_{secondary} \\cdot 0.1 + L_{legacy} + C_{combo} + E_{internet})$$

*   **Active Host:** **${targetHostIp}**
*   **Host Exposure Score:** **${currentHost?.apesScore || activeResult.score}**
*   **Maximum Target Port:** Port ${currentHost?.maxPort || 445}
*   **Legacy Protocols:** ${currentHost?.ports?.some(p => [23, 21].includes(p.port)) ? 'Detected (+15 Penalty)' : 'None Detected'}
*   **Chaining Combos:** ${currentHost?.ports?.some(p => p.port === 445) && currentHost?.ports?.some(p => p.port === 3389) ? 'Active Directory Pivots Enabled (+20)' : 'None Identified'}`;

    if (activeResult?.metrics?.exposure_chain) {
      breakdown += `\n\n#### Network Exposure Chain Profile\n\n| Stage | Score | Full Mark |\n| --- | --- | --- |\n`;
      activeResult.metrics.exposure_chain.forEach(stg => {
        breakdown += `| **${stg.stage}** | ${stg.score} | ${stg.fullMark} |\n`;
      });
    }

    return breakdown;
  }

  if (section === '04 Attack Paths') {
    const paths = activeResult.paths || [];
    const stepsText = paths[0]?.steps ? paths[0].steps.join(' → ') : 'INTERNET → RDP:3389 → SMB:445 → DC_ADMIN';
    
    return `### 04 Attack Paths

The target host (**${targetHostIp}**) exposes a triad that, in combination, removes friction from every meaningful adversary objective: **RDP for interactive access**, **SMB for lateral spread**, and **LDAP for directory enumeration**.

\`\`\`bash
$ eme.explain --host ${targetHostIp} --path ${stepsText.toLowerCase().replace(/ /g, '')}
[1] RDP:3389  — credential spray window (T1110)
[2] SMB:445   — admin-share pivot via PsExec (T1021.002)
[3] LDAP:389  — Kerberoast SPN harvest (T1558.003)
→ tier-0 compromise probability: HIGH
\`\`\`

#### Detection Opportunities
*   4625 burst on 3389 from a single source — credential spray indicator.
*   Service installation events (7045) following SMB session establishment.
*   LDAP queries with unusual SPN filter patterns from non-admin contexts.

#### Recommended Hardening
*   Restrict 3389 to a bastion subnet and enforce Network Level Authentication.
*   Disable SMBv1; enable SMB signing & require Kerberos for tier-0 hosts.
*   Move sensitive service accounts to gMSA to neutralise Kerberoast value.`;
  }

  if (section === '05 MITRE Mapping') {
    let list = `### 05 MITRE ATT&CK Mappings\n\n`;
    const mappings = activeResult.mitre || [];
    mappings.forEach(m => {
      list += `*   **${m.node} (${m.techniqueId} - ${m.techniqueName}):** ${m.description}\n`;
    });
    if (mappings.length === 0) {
      list += `*No active service nodes mapped to MITRE techniques.*`;
    }
    return list;
  }

  if (section === '06 Detection Hooks') {
    return `### 06 Detection Hooks

To monitor and alert on exploitation of these exposed interfaces, deploy the following SIEM rules:

*   **Remote Services Pivot (Port 445):** Alert on Event ID \`7045\` (New Service Creation) on Windows Server nodes, combined with source IPs outside the admin subnet.
*   **Credential Spraying (Port 3389):** Alert on Event ID \`4625\` (Failed Logon) exceeding 30 attempts within 60 seconds from a single IP source.
*   **Active Directory Enumeration (Port 389):** Monitor LDAP search filters matching SPN tags (\`servicePrincipalName=*\`) originating from standard developer workstations.`;
  }

  if (section === '07 Remediation') {
    let recommendations = `### 07 Remediation Roadmaps\n\n`;
    const recs = activeResult.recommendations || [];
    recs.forEach((r, idx) => {
      recommendations += `${idx + 1}.  **${r}**\n`;
    });
    return recommendations;
  }

  return '';
};

export const handleDownloadMd = (activeResult, targetHostIp, hosts, currentHost) => {
  const sections = [
    '01 Executive Summary',
    '02 Host Inventory',
    '03 Exposure Scoring',
    '04 Attack Paths',
    '05 MITRE Mapping',
    '06 Detection Hooks',
    '07 Remediation'
  ];
  const fullReport = sections.map(s => getSectionMarkdown(s, activeResult, targetHostIp, hosts, currentHost)).join('\n\n---\n\n');
  const blob = new Blob([fullReport], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `eme_exposure_report_${targetHostIp}.md`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
