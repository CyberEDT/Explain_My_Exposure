export function detectOpportunities(portsSet) {
  const opportunities = new Set();
  
  if (portsSet.has(22) || portsSet.has(3389) || portsSet.has(5900) || portsSet.has(23)) {
    opportunities.add('Remote Access');
  }
  if (portsSet.has(21) || portsSet.has(445) || portsSet.has(3306) || portsSet.has(1433) || portsSet.has(5432)) {
    opportunities.add('Data Access');
  }
  if (portsSet.has(53) || portsSet.has(389) || portsSet.has(161) || portsSet.has(135)) {
    opportunities.add('Enumeration');
  }
  if (portsSet.has(445) || portsSet.has(5985) || portsSet.has(22)) {
    opportunities.add('Lateral Movement');
  }
  
  return Array.from(opportunities);
}
