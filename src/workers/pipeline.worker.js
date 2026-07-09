import ParserFactory from '../../lib/engines/parser/index.js';
import { calculateScore } from '../../lib/engines/scoring/calculator.js';
import { mapToMitre } from '../../lib/engines/mitre/mapper.js';
import { suggestPaths } from '../../lib/engines/exposure/pathSuggester.js';
import { generateNarrative } from '../../lib/engines/narrative/engine.js';
import { IntelligencePipeline } from '../../lib/engines/pipeline/index.js';

self.addEventListener('message', async (e) => {
  const { fileContent, fileType, scanLevel } = e.data;

  try {
    const parser = ParserFactory.getParser(fileType);
    const parsedData = parser.parse(fileContent);
    
    if (!parsedData.hosts || parsedData.hosts.length === 0) {
      throw new Error('No active hosts or open ports discovered in Nmap logs.');
    }

    const processedData = IntelligencePipeline.process(parsedData, scanLevel);
    const score = calculateScore(processedData.hosts);

    const flatPorts = [];
    for (const host of parsedData.hosts) {
      for (const p of host.ports) {
        flatPorts.push({
          ip: host.ip,
          port: p.port
        });
      }
    }

    const mitre = mapToMitre(flatPorts);
    const paths = suggestPaths(parsedData.hosts);
    const narrative = generateNarrative(parsedData.hosts);

    const scanResult = {
      score,
      scanLevel,
      metrics: {
        openPorts: processedData.metrics.openPortsCount,
        criticalServices: processedData.metrics.criticalServicesCount,
        attackPathsCount: paths.length,
        exposure_chain: processedData.metrics.exposure_chain
      },
      hosts: processedData.hosts,
      paths,
      mitre,
      narrative,
      recommendations: processedData.metrics.recommendations
    };

    self.postMessage({ success: true, scanResult });
  } catch (error) {
    self.postMessage({ success: false, error: error.message });
  }
});
