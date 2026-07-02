export function calculateAttackerInterest(portsSet) {
  if (portsSet.has(445) || portsSet.has(3389) || portsSet.has(23) || portsSet.has(21) || portsSet.has(5900)) {
    return 'Critical';
  }
  if (portsSet.has(1433) || portsSet.has(3306) || portsSet.has(5432) || portsSet.has(5985) || portsSet.has(389)) {
    return 'High';
  }
  if (portsSet.has(80) || portsSet.has(443) || portsSet.has(22)) {
    return 'Medium';
  }
  return 'Low';
}

export function calculateAttackerValue(assetType) {
  const map = {
    'Domain Controller': 'Critical',
    'Identity Provider': 'Critical',
    'Database Server': 'Critical',
    'CI/CD Server': 'Critical',
    'File / Storage Server': 'High',
    'Web Server': 'High',
    'Remote Access Host': 'High',
    'Workstation': 'Medium',
    'Development Server': 'Medium',
    'Unknown Asset': 'Low'
  };
  return map[assetType] || 'Low';
}
