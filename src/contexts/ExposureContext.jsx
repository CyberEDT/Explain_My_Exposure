import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import ParserFactory from '../../lib/engines/parser/index.js';
import { calculateScore } from '../../lib/engines/scoring/calculator.js';
import { mapToMitre } from '../../lib/engines/mitre/mapper.js';
import { suggestPaths } from '../../lib/engines/exposure/pathSuggester.js';
import { generateNarrative } from '../../lib/engines/narrative/engine.js';
import { IntelligencePipeline } from '../../lib/engines/pipeline/index.js';

const ExposureContext = createContext();

export function ExposureProvider({ children }) {
  const [storagePermission, setStoragePermission] = useState(() => {
    return localStorage.getItem('eme_storage_permission') || 'prompt';
  });

  const [scanResult, setScanResult] = useState(() => {
    try {
      if (localStorage.getItem('eme_storage_permission') === 'granted') {
        const saved = localStorage.getItem('eme_saved_scan');
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse saved scan", e);
    }
    return null;
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSetStoragePermission = useCallback((status) => {
    setStoragePermission(status);
    localStorage.setItem('eme_storage_permission', status);
    if (status === 'denied') {
      localStorage.removeItem('eme_saved_scan');
    }
  }, []);

  useEffect(() => {
    if (storagePermission === 'granted' && scanResult) {
      try {
        localStorage.setItem('eme_saved_scan', JSON.stringify(scanResult));
      } catch (e) {
        console.error("Failed to save scan to local storage. Might be too large.", e);
      }
    } else if (storagePermission === 'granted' && !scanResult) {
      localStorage.removeItem('eme_saved_scan');
    }
  }, [scanResult, storagePermission]);

  const triggerAnalysis = async (fileContent, fileType, scanLevel = 'medium') => {
    setLoading(true);
    setError(null);
    try {
      // Parse file in-memory client-side (no network uploads of target IP networks)
      const parser = ParserFactory.getParser(fileType);
      const parsedData = parser.parse(fileContent);
      
      if (!parsedData.hosts || parsedData.hosts.length === 0) {
        throw new Error('No active hosts or open ports discovered in Nmap logs.');
      }

      // Run the data through the EME Nmap Intelligence Engine Pipeline
      const processedData = IntelligencePipeline.process(parsedData, scanLevel);

      // Calculate score (APES scoring model)
      const score = calculateScore(processedData.hosts);

      // Collect flat port maps for MITRE mappings
      const flatPorts = [];
      for (const host of parsedData.hosts) {
        for (const p of host.ports) {
          flatPorts.push({
            ip: host.ip,
            port: p.port
          });
        }
      }

      // Map MITRE TTPs
      const mitre = mapToMitre(flatPorts);

      // Suggest attack paths
      const paths = suggestPaths(parsedData.hosts);

      // Generate human-readable narrative report
      const narrative = generateNarrative(parsedData.hosts);

      setScanResult({
        score,
        scanLevel, // Persisted for Intensity Filtering
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
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearScan = useCallback(() => {
    setScanResult(null);
    setError(null);
  }, []);

  return (
    <ExposureContext.Provider value={{ scanResult, loading, error, triggerAnalysis, clearScan, storagePermission, handleSetStoragePermission }}>
      {children}
    </ExposureContext.Provider>
  );
}

export const useExposure = () => useContext(ExposureContext);
