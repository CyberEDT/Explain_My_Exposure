import attackerTechniques from '../../kb/techniques/attackerTechniques.json' assert { type: 'json' };

export function mapToMitre(portsList) {
  const mappings = [];
  const processedTechniques = new Set();
  
  // List of common mapping overrides per port
  const portToMitreMap = {
    21: ['T1040', 'T1110', 'T1190', 'T1078'],
    22: ['T1021.004', 'T1110.003', 'T1556'],
    23: ['T1040', 'T1110'],
    25: ['T1598', 'T1586'],
    53: ['T1590.005'],
    80: ['T1190', 'T1505.003'],
    443: ['T1190', 'T1043'],
    389: ['T1087.002', 'T1069.002'],
    88: ['T1558.003', 'T1558.004'],
    445: ['T1210', 'T1021.002', 'T1563.002'],
    1433: ['T1110', 'T1059'],
    3306: ['T1110', 'T1190', 'T1083'],
    5432: ['T1110', 'T1059'],
    5900: ['T1021.005', 'T1110'],
    3389: ['T1021.001', 'T1110'],
    5985: ['T1021.006', 'T1059.001'],
    5986: ['T1021.006', 'T1059.001']
  };

  for (const portInfo of portsList) {
    const portId = portInfo.port;
    const techniques = portToMitreMap[portId] || ['T1046']; // Fallback to generic scanning technique

    for (const techId of techniques) {
      const uniqueKey = `${portId}-${techId}`;
      if (!processedTechniques.has(uniqueKey)) {
        processedTechniques.add(uniqueKey);
        
        const details = attackerTechniques[techId];
        mappings.push({
          node: `${portInfo.ip}:${portId}`,
          techniqueId: techId,
          techniqueName: details ? details.name : 'Unknown Technique',
          description: details ? details.description : 'Cybersecurity tactic signature.'
        });
      }
    }
  }

  return mappings;
}
