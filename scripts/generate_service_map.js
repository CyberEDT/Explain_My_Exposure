import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const datasetPath = path.resolve(__dirname, '../Dataset/files/eme_network_exposure_dataset.json');
const outputPath = path.resolve(__dirname, '../lib/kb/services/serviceMap.json');

// Read the new dataset
const datasetRaw = fs.readFileSync(datasetPath, 'utf8');
const dataset = JSON.parse(datasetRaw);

const newMap = {};

dataset.records.forEach(record => {
  // Parse port string (e.g. "21/tcp", "137/udp, 139/tcp", "6000-6063/tcp")
  const portsString = record.ports || "";
  const parts = portsString.split(',');
  
  parts.forEach(part => {
    // Extract numbers and ranges, ignoring protocol
    const cleanPart = part.split('/')[0].trim();
    if (cleanPart.includes('-')) {
      const [start, end] = cleanPart.split('-').map(Number);
      for (let p = start; p <= end; p++) {
        mapRecordToPort(p, record);
      }
    } else {
      const p = parseInt(cleanPart, 10);
      if (!isNaN(p)) {
        mapRecordToPort(p, record);
      }
    }
  });
});

function mapRecordToPort(portNum, record) {
  // Create an object that includes both the old expected schema and the new rich schema
  const mappedObj = {
    // Legacy mapping (Backward compatibility)
    name: record.name,
    description: record.description,
    interest: record.risk_score,
    severity: record.severity ? record.severity.charAt(0).toUpperCase() + record.severity.slice(1) : "Medium",
    whyAttackersCare: record.attacker_interest,
    recon: record.enumeration_methods ? record.enumeration_methods.join(', ') : "",
    exploit: record.attack_vectors ? record.attack_vectors.join(', ') : "",
    objective: (record.mitre && record.mitre.tactics) ? record.mitre.tactics.join(', ') : "",
    mitre: (record.mitre && record.mitre.techniques) ? record.mitre.techniques.map(t => t.id) : [],
    detection: record.detection_methods ? record.detection_methods.join(', ') : "",
    
    // New Dataset Rich Fields
    id: record.id,
    category: record.category,
    technical_summary: record.technical_summary,
    exposure_level: record.exposure_level,
    business_risk: record.business_risk,
    risk_score: record.risk_score,
    confidence: record.confidence,
    attack_vectors: record.attack_vectors || [],
    enumeration_methods: record.enumeration_methods || [],
    misconfigurations: record.misconfigurations || [],
    detection_methods: record.detection_methods || [],
    recommended_mitigations: record.recommended_mitigations || [],
    references: record.references || [],
    tags: record.tags || [],
    common_products: record.common_products || [],
    cves: record.cves || []
  };

  newMap[String(portNum)] = mappedObj;
}

fs.writeFileSync(outputPath, JSON.stringify(newMap, null, 2));
console.log(`Successfully generated new serviceMap.json with ${Object.keys(newMap).length} ports indexed.`);
