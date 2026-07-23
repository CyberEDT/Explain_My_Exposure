import { Buffer } from 'buffer';
// Entrypoint for scan analysis (POST /api/analyze)
import ParserFactory from '../../lib/engines/parser/index.js';
import { calculateScore } from '../../lib/engines/scoring/calculator.js';
import { mapToMitre } from '../../lib/engines/mitre/mapper.js';
import { suggestPaths } from '../../lib/engines/exposure/pathSuggester.js';
import { generateNarrative } from '../../lib/engines/narrative/engine.js';
import { analyzeExposure } from '../../lib/engines/exposure/analyzer.js';
import { sanitizeXml } from '../shared/security/xmlSanitizer.js';
import { validateFile } from '../shared/security/fileValidator.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
  try {
    const { fileContent, fileType } = req.body;
    
    if (!fileContent) {
      return res.status(400).json({ error: 'Missing scan content' });
    }
    
    // In-memory file verification
    const isValid = validateFile(Buffer.from(fileContent));
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid file format or size limit exceeded' });
    }
    
    // Sanitization for XML (XXE prevention)
    let sanitizedContent = fileContent;
    if (fileType === 'xml') {
      try {
        sanitizedContent = sanitizeXml(fileContent);
      } catch (secError) {
        return res.status(400).json({ error: secError.message });
      }
    }
    
    // 1. Ingest and Parse Scan
    const parser = ParserFactory.getParser(fileType);
    const parsedData = parser.parse(sanitizedContent);
    
    if (!parsedData.hosts || parsedData.hosts.length === 0) {
      return res.status(400).json({ error: 'No active hosts or open ports found in scan log.' });
    }

    // 2. Aggregate Metrics
    const metrics = analyzeExposure(parsedData);

    // 3. Compute Risk Score (APES model)
    const score = calculateScore(parsedData.hosts);

    // Collect all open ports with IP tags for mapping
    const flatPorts = [];
    for (const host of parsedData.hosts) {
      for (const p of host.ports) {
        flatPorts.push({
          ip: host.ip,
          port: p.port
        });
      }
    }

    // 4. Map MITRE ATT&CK TTPs
    const mitreMappings = mapToMitre(flatPorts);

    // 5. Generate Attack Paths
    const paths = suggestPaths(parsedData.hosts);

    // 6. Compile Narrative explanation
    const narrative = generateNarrative(parsedData.hosts);
    
    return res.status(200).json({
      status: 'success',
      data: {
        score,
        metrics: {
          openPorts: metrics.openPortsCount,
          criticalServices: metrics.criticalServicesCount,
          attackPathsCount: paths.length
        },
        hosts: parsedData.hosts,
        paths,
        mitre: mitreMappings,
        narrative,
        recommendations: metrics.recommendations
      }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal Engine Exception: ' + err.message });
  }
}
