// Strategy parser for Nmap XML output utilizing DOMParser
export default class NmapXmlParser {
  parse(xmlData) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "text/xml");
    
    // Check for parsing errors
    const parseError = xmlDoc.getElementsByTagName("parsererror");
    if (parseError.length > 0) {
      throw new Error("Invalid XML format: " + parseError[0].textContent);
    }

    const hosts = [];
    const hostNodes = xmlDoc.getElementsByTagName("host");

    for (let i = 0; i < hostNodes.length; i++) {
      const hostNode = hostNodes[i];
      
      // Extract IP and MAC
      let ip = 'Unknown IP';
      let mac = '';
      const addresses = hostNode.getElementsByTagName("address");
      for (let j = 0; j < addresses.length; j++) {
        const addrType = addresses[j].getAttribute("addrtype");
        if (addrType === "ipv4" || addrType === "ipv6") {
          ip = addresses[j].getAttribute("addr");
        } else if (addrType === "mac") {
          mac = addresses[j].getAttribute("addr");
        }
      }

      // Extract Hostnames
      let hostnames = [];
      const hostnameNodes = hostNode.getElementsByTagName("hostname");
      for (let j = 0; j < hostnameNodes.length; j++) {
        const name = hostnameNodes[j].getAttribute("name");
        if (name) hostnames.push(name);
      }

      // Extract OS
      let os = 'Unknown OS';
      const osMatchNodes = hostNode.getElementsByTagName("osmatch");
      if (osMatchNodes.length > 0) {
        // Get highest accuracy OS match
        let bestOs = osMatchNodes[0];
        let bestAccuracy = parseInt(bestOs.getAttribute("accuracy") || "0", 10);
        for (let j = 1; j < osMatchNodes.length; j++) {
          const acc = parseInt(osMatchNodes[j].getAttribute("accuracy") || "0", 10);
          if (acc > bestAccuracy) {
            bestOs = osMatchNodes[j];
            bestAccuracy = acc;
          }
        }
        os = bestOs.getAttribute("name");
      }

      // Extract Ports
      const ports = [];
      const portNodes = hostNode.getElementsByTagName("port");
      for (let j = 0; j < portNodes.length; j++) {
        const portNode = portNodes[j];
        const stateNode = portNode.getElementsByTagName("state")[0];
        const state = stateNode ? stateNode.getAttribute("state") : "closed";

        if (state === "open") {
          const portId = parseInt(portNode.getAttribute("portid"), 10);
          const protocol = portNode.getAttribute("protocol");
          
          let serviceName = "unknown";
          let banner = "";
          let extraInfo = "";

          const serviceNode = portNode.getElementsByTagName("service")[0];
          if (serviceNode) {
            serviceName = serviceNode.getAttribute("name") || "unknown";
            const product = serviceNode.getAttribute("product") || "";
            const version = serviceNode.getAttribute("version") || "";
            extraInfo = serviceNode.getAttribute("extrainfo") || "";
            banner = `${product} ${version}`.trim();
          }

          ports.push({
            port: portId,
            protocol,
            service: serviceName,
            version: banner,
            extraInfo
          });
        }
      }

      if (ports.length > 0) {
        hosts.push({
          ip,
          mac,
          hostnames,
          os,
          ports
        });
      }
    }

    return {
      hosts,
      scanTime: new Date().toISOString(),
      type: 'XML'
    };
  }
}
