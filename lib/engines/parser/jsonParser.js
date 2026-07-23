// Strategy parser for JSON output (like Masscan -oJ or native EME JSON format)
export default class JsonParser {
  parse(jsonData) {
    let parsed;
    try {
      parsed = JSON.parse(jsonData);
    } catch (e) {
      throw new Error("Invalid JSON format", { cause: e });
    }

    const hosts = [];

    // Detect Masscan format array
    if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].ports) {
      // Group by IP
      const ipMap = {};
      parsed.forEach(entry => {
        const ip = entry.ip;
        if (!ipMap[ip]) {
          ipMap[ip] = { ip, mac: '', hostnames: [], os: 'Unknown OS', ports: [] };
        }
        entry.ports.forEach(p => {
          if (p.status === 'open') {
            ipMap[ip].ports.push({
              port: parseInt(p.port, 10),
              protocol: p.proto || 'tcp',
              service: 'unknown',
              version: '',
              extraInfo: ''
            });
          }
        });
      });

      Object.values(ipMap).forEach(host => {
        if (host.ports.length > 0) hosts.push(host);
      });
    } 
    // Detect Native EME format / Custom format
    else if (parsed.hosts && Array.isArray(parsed.hosts)) {
      parsed.hosts.forEach(h => {
        const validPorts = (h.ports || []).map(p => ({
          port: parseInt(p.port || p.id, 10),
          protocol: p.protocol || 'tcp',
          service: p.service || 'unknown',
          version: p.version || '',
          extraInfo: p.extraInfo || ''
        }));

        if (validPorts.length > 0) {
          hosts.push({
            ip: h.ip || 'Unknown IP',
            mac: h.mac || '',
            hostnames: Array.isArray(h.hostnames) ? h.hostnames : [],
            os: h.os || 'Unknown OS',
            ports: validPorts
          });
        }
      });
    } else {
      throw new Error("Unrecognized JSON scan structure. Use Masscan -oJ or EME Native format.");
    }

    return {
      hosts,
      scanTime: new Date().toISOString(),
      type: 'JSON'
    };
  }
}
