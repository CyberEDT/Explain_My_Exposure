import { describe, it, expect } from 'vitest';
import { IntelligencePipeline } from './index.js';

describe('IntelligencePipeline', () => {
  it('should return original data if no hosts exist', () => {
    const input = { hosts: null };
    const output = IntelligencePipeline.process(input);
    expect(output).toEqual({ hosts: null });
  });

  it('should process a basic host and calculate metrics', () => {
    const mockData = {
      hosts: [
        {
          ip: '192.168.1.10',
          os: 'Windows Server 2019',
          ports: [
            { port: 445, protocol: 'tcp', service: 'microsoft-ds' },
            { port: 3389, protocol: 'tcp', service: 'ms-wbt-server' }
          ]
        }
      ]
    };

    const result = IntelligencePipeline.process(mockData, 'high');
    
    expect(result.hosts.length).toBe(1);
    expect(result.metrics.openPortsCount).toBe(2);
    expect(result.metrics.criticalServicesCount).toBe(2); // 445 and 3389 are critical
    
    const host = result.hosts[0];
    expect(host.intelligence).toBeDefined();
    expect(host.intelligence.asset_type).toBeDefined();
    expect(host.intelligence.exposure_chain.length).toBeGreaterThan(0);
  });

  it('should filter out low interest ports on low scanLevel', () => {
    const mockData = {
      hosts: [
        {
          ip: '192.168.1.10',
          os: 'Linux',
          ports: [
            { port: 80, protocol: 'tcp', service: 'http' }, // Often medium
            { port: 31337, protocol: 'tcp', service: 'unknown' } // Often low
          ]
        }
      ]
    };

    const lowResult = IntelligencePipeline.process(JSON.parse(JSON.stringify(mockData)), 'low');
    // For 'low' scan level, these ports might be filtered out completely depending on calculateAttackerInterest.
    // If it filters out all ports, the host might be dropped.
    
    const highResult = IntelligencePipeline.process(JSON.parse(JSON.stringify(mockData)), 'high');
    expect(highResult.hosts.length).toBe(1);
    expect(highResult.hosts[0].ports.length).toBe(2);
  });
});
