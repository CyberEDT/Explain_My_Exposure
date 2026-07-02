// Attacker-perspective narrative templates catalog, tiered by expertise
export const templates = {
  21: {
    low: "File Transfer Protocol (FTP) is like a public folder without a lock. Anyone on the internet or network can intercept files and passwords you send because it doesn't use encryption. Hackers look for this to steal sensitive documents.",
    medium: "File Transfer Protocol (FTP) is open. Because FTP is an unencrypted legacy protocol, any credentials sent across this channel can be sniffed by attackers on the network path. Attackers scan this directory for backup databases or source code.",
    high: "TCP/21 (FTP) exposed. This legacy plaintext protocol allows passive credential harvesting via network sniffing. Anonymous bindings often leak sensitive config files. Threat actors target this for initial access (T1078) and source code exfiltration."
  },
  22: {
    low: "Secure Shell (SSH) is the main way administrators control computers remotely. Even though it is secure, leaving it open to the entire internet means hacker bots will constantly guess your passwords trying to break in.",
    medium: "Secure Shell (SSH) is exposed. While SSH is an industry standard for secure administration, exposing it to the public internet makes it a target for automated brute-force bots trying to gain command-line access.",
    high: "TCP/22 (SSH) active. Exposing administrative interfaces to untrusted networks invites continuous credential stuffing and brute-force (T1110) campaigns. Risk increases significantly if root login or password-based authentication is permitted."
  },
  23: {
    low: "Telnet is an ancient way to connect to computers that provides zero security. Every single thing typed, including passwords, is sent in plain text. A hacker can easily steal your passwords just by watching the network.",
    medium: "Telnet is exposed on this system. Exposing Telnet is a critical risk because it transmits all communication in plain text. An attacker on the network path can easily intercept these credentials and hijack the session.",
    high: "TCP/23 (Telnet) exposed. Highly critical legacy protocol that transmits payload and authentication in cleartext. Trivial to intercept via ARP spoofing or span ports, leading to immediate interactive session hijacking (T1056)."
  },
  25: {
    low: "A mail server (SMTP) is running here. Hackers look for this to see if they can trick your server into sending spam emails or phishing attacks on their behalf, making it look like they came from your company.",
    medium: "Simple Mail Transfer Protocol (SMTP) is listening. Attackers scan SMTP to verify if the server acts as an open relay for spam. They also query commands to discover active system users.",
    high: "TCP/25 (SMTP) exposed. Threat actors query EXPN/VRFY commands for deep system user enumeration (T1087). Misconfigurations may allow open relaying, enabling infrastructure to be leveraged for C2 communication or phishing delivery (T1566)."
  },
  53: {
    low: "A domain name system (DNS) server is open. If it's not set up correctly, a hacker could ask it for a list of every single computer inside your company, giving them a perfect map of your network.",
    medium: "DNS resolver is exposed. If misconfigured, attackers can perform zone transfers to download your entire domain structure, listing all internal server names and IPs.",
    high: "UDP/TCP 53 (DNS) exposed. Vulnerable to AXFR zone transfers revealing internal network topology and internal-only domains. Open resolvers are also heavily leveraged by botnets for DNS Amplification DDoS reflection attacks."
  },
  80: {
    low: "A standard website is running here without a padlock (no HTTPS). Information sent here isn't encrypted. Hackers will try to find hidden login pages or try to trick the website into giving them access to the server.",
    medium: "This host runs a web server on Port 80 (HTTP) without SSL encryption. Attackers will look for administrative panels, test directory listings, and exploit application vulnerabilities like SQL Injection.",
    high: "TCP/80 (HTTP) exposed without TLS. Susceptible to MitM attacks. Primary vector for web application exploitation (OWASP Top 10) including SQLi, LFI/RFI, and SSRF (T1190) leading to reverse shell execution."
  },
  443: {
    low: "A secure website (HTTPS) is running here. While the connection is secure with a padlock, the website itself might still have flaws. Hackers will try to find bugs in the website's code to steal information from its database.",
    medium: "This host runs an encrypted web server on Port 443 (HTTPS). While traffic is secure, the underlying web application is still subject to exploit attacks like SQL Injection and SSRF.",
    high: "TCP/443 (HTTPS) active. Traffic is encrypted, but the application layer remains the primary ingress vector. Threat actors will fuzz endpoints for deserialization flaws, unauthenticated APIs, and SSRF to pivot internally (T1190)."
  },
  445: {
    low: "Windows File Sharing is open. This is one of the most dangerous things to leave open. If a hacker gets access, they can quietly move between every single computer in your network and spread ransomware to everything at once.",
    medium: "An attacker would target SMB first because it is a primary vector for lateral movement and executing tools like PsExec. If compromised, they can navigate internal file shares and compromise the domain.",
    high: "TCP/445 (SMB) exposed. Critical vulnerability vector. Enables NTLM relaying, null-session enumeration (T1049), and lateral movement via PsExec/WMI (T1021.002). This is the primary protocol exploited by ransomware operators for entire domain encryption."
  },
  88: {
    low: "A Windows security service (Kerberos) is running. Hackers specifically hunt for this because if they can trick it, they can steal the digital 'keys' to your entire company network.",
    medium: "Kerberos authentication is exposed. Since Kerberos is the backbone of Active Directory, threat actors query it to request tickets which they download and crack offline to compromise service accounts.",
    high: "TCP/88 (Kerberos) exposed. Core identity provider. Threat actors actively target this port for Kerberoasting (T1558.003) and AS-REP Roasting to extract offline-crackable TGS tickets, leading to immediate domain privilege escalation."
  },
  389: {
    low: "A directory service (LDAP) is open. This is essentially the phonebook of your entire company. Hackers look at this to find out who the administrators are and what computers they should attack.",
    medium: "LDAP directory binding is listening. Attackers search for anonymous bindings on this port to query the active directory user list and group memberships, mapping your corporate organization roster.",
    high: "TCP/389 (LDAP) exposed. Primary target for Active Directory reconnaissance (BloodHound/Sharphound). Enables dumping of Domain Admins, group policies, and identifying attack paths via unauthenticated or weak bindings (T1087.002)."
  },
  1433: {
    low: "A Microsoft SQL database is open. This stores your company's actual data. Hackers will try guessing the main administrator password to steal the data or delete it to demand a ransom.",
    medium: "Microsoft SQL Server database is exposed. Database engines are high-value targets because they host sensitive tables. Attackers will attempt SA profile brute-force attacks.",
    high: "TCP/1433 (MSSQL) exposed. Direct exposure of relational data. High-priority target for 'sa' credential brute-forcing. If compromised, attackers frequently abuse the xp_cmdshell stored procedure to achieve remote code execution (T1059.003) on the underlying OS."
  },
  3306: {
    low: "A MySQL database is exposed. Hackers love finding these because they contain the information that powers your websites. They will try to break the password to steal customer information.",
    medium: "MySQL relational database is exposed. Attackers target port 3306 to exfiltrate tables or attempt root credentials brute-force. They also look for configuration weaknesses.",
    high: "TCP/3306 (MySQL) exposed. Attackers will target this for data exfiltration and credential dumping. Weak configurations allow attackers to use SELECT INTO OUTFILE to write PHP web shells directly into the web root (T1505.003)."
  },
  5432: {
    low: "A PostgreSQL database is open. Hackers will scan for this and try a massive list of common passwords. If they get in, they can steal data or completely take over the computer running it.",
    medium: "PostgreSQL database is listening. Threat actors probe this database to run credential dictionaries. If compromised, they can execute commands on the underlying host.",
    high: "TCP/5432 (PostgreSQL) exposed. Target for data theft and brute-force (T1110). If default credentials (postgres:postgres) are active, attackers utilize the COPY command or pg_read_file/pg_write_file to achieve full OS-level RCE (T1190)."
  },
  5900: {
    low: "Screen sharing (VNC) is turned on. This lets someone see your desktop and move your mouse remotely. If there's no password or a weak one, a hacker can just log in and use your computer like they are sitting in front of it.",
    medium: "VNC graphical console sharing is exposed. VNC is an attractive target because compromising it grants immediate visual and desktop control of the machine.",
    high: "TCP/5900 (VNC) exposed. Grants immediate interactive graphical UI control (T1078). Highly sought after by initial access brokers. Often lacks encryption and relies on weak 8-character DES passwords, making it trivial to brute-force or sniff."
  },
  3389: {
    low: "Remote Desktop (RDP) is exposed. This lets employees log into their work computers from home. Hackers use automated tools to try millions of passwords a day against this. If they guess one right, they are inside your network.",
    medium: "This host exposes the Remote Desktop Protocol (RDP). Attackers actively search for open RDP ports to run automated password dictionary attacks.",
    high: "TCP/3389 (RDP) exposed. The number one ingress vector for ransomware deployment. Threat actors utilize automated credential stuffing tools. Without Network Level Authentication (NLA) and MFA, compromise is highly probable (T1133)."
  },
  5985: {
    low: "Windows Remote Management is open. This is a tool IT administrators use to fix computers silently in the background. Hackers target this to take over computers without any warning popping up on the screen.",
    medium: "Windows Remote Management (WinRM HTTP) is exposed. WinRM is the default backend for PowerShell Remoting. Attackers target this port for lateral movement.",
    high: "TCP/5985 (WinRM HTTP) exposed. Primary vector for legitimate administrative tasks and therefore heavily abused by threat actors for 'Living off the Land' lateral movement (T1021.006). Enables stealthy execution of PowerShell payloads."
  },
  5986: {
    low: "Secure Windows Remote Management is open. While the connection is encrypted, a hacker who steals an administrator's password can use this to silently control the entire network.",
    medium: "Windows Remote Management (WinRM Secure HTTPS) is open. Attackers target this encrypted management interface to run remote PowerShell administration commands.",
    high: "TCP/5986 (WinRM HTTPS) exposed. Encrypted variant of WinRM. Attackers who compromise administrative credentials will use this channel to execute fileless PowerShell scripts, effectively bypassing network-level IDS/IPS detection (T1021.006)."
  }
};
