// Strategy parser for standard Nmap text/stdout output
export default class NmapTextParser {
  parse(textData) {
    const lines = textData.split(/\r?\n/);
    const hosts = [];
    let currentHost = null;
    
    // Nmap scan report for 192.168.1.50
    // Nmap scan report for server.local (10.0.0.5)
    const hostRegex = /Nmap scan report for (?:([^\s]+) \(([^)]+)\)|([^\s]+))/i;
    
    // MAC Address: 00:11:22:33:44:55 (Vendor)
    const macRegex = /^MAC Address:\s+([0-9a-fA-F:]+)/i;

    // OS details: Linux 4.15 - 5.6
    const osRegex = /^OS details:\s+(.*)$/i;
    // Aggressive OS guesses: Linux 3.2 (95%)
    const osGuessRegex = /^Aggressive OS guesses:\s+(.*)$/i;

    // Port line: 22/tcp open ssh OpenSSH 8.2p1
    const portRegex = /^(\d+)\/(tcp|udp)\s+open\s+([^\s]+)(?:\s+(.*))?$/i;
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      const hostMatch = hostRegex.exec(trimmed);
      if (hostMatch) {
        if (currentHost && currentHost.ports.length > 0) {
          hosts.push(currentHost);
        }
        
        let ip;
        let hostnames = [];
        if (hostMatch[1] && hostMatch[2]) {
          hostnames.push(hostMatch[1]);
          ip = hostMatch[2];
        } else {
          ip = hostMatch[3];
        }

        currentHost = {
          ip,
          mac: '',
          hostnames,
          os: 'Unknown OS',
          ports: []
        };
        continue;
      }
      
      if (currentHost) {
        const macMatch = macRegex.exec(trimmed);
        if (macMatch) {
          currentHost.mac = macMatch[1];
          continue;
        }

        const osMatch = osRegex.exec(trimmed) || osGuessRegex.exec(trimmed);
        if (osMatch && currentHost.os === 'Unknown OS') {
          currentHost.os = osMatch[1];
          continue;
        }

        const portMatch = portRegex.exec(trimmed);
        if (portMatch) {
          const portId = parseInt(portMatch[1], 10);
          const protocol = portMatch[2];
          const serviceName = portMatch[3];
          const banner = portMatch[4] ? portMatch[4].trim() : '';
          
          currentHost.ports.push({
            port: portId,
            protocol,
            service: serviceName,
            version: banner,
            extraInfo: ''
          });
        }
      }
    }
    
    if (currentHost && currentHost.ports.length > 0) {
      hosts.push(currentHost);
    }
    
    return {
      hosts,
      scanTime: new Date().toISOString(),
      type: 'Text'
    };
  }
}
