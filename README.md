# Explain My Exposure (EME)

Explain My Exposure (EME) is an **Attacker-Perspective Exposure Assessment Platform** designed to shift the paradigm from traditional vulnerability listing to threat context explanation. Rather than dumping raw port listings and CVE codes on security teams, EME translates network scanner outputs (Nmap XML/Text logs) into human-readable narratives explaining *why* services are attractive to attackers, *how* threat actors pivot across subnets, and *what* detection opportunities exist.

Developed as a modern, local-first, privacy-respecting threat operations dashboard.

---

## 🚀 Key Features

*   **Local-First, Privacy-Hardened Parsing:** Ingests Nmap XML or plain text console files. The analysis runs entirely in-memory within the client browser, ensuring sensitive internal IP layouts never leave your workstation.
*   **APES Risk Scoring Model:** Implements the Attacker-Perspective Exposure Scoring (APES) mathematical model, incorporating base service risks, legacy protocol flags, remote access multipliers, and port chaining modifiers.
*   **Host Classification Rules:** Automatically categorizes host roles (e.g., Domain Controllers, Web Servers, Database Servers, File Servers, Workstations) using signature-based port and OS predicate logic.
*   **Attacker Priority Engine:** Classifies nodes into threat-actor focus tiers (Critical, High, Medium, Low) to prioritize remediation actions.
*   **Interactive Attack Path Simulator:** Dynamically builds step-by-step lateral movement maps showing pivot techniques threat actors chain to move from external exposure to core administrative access.
*   **MITRE ATT&CK Mapping Grid:** Aligns open network interfaces with active tactics and technique IDs (such as T1021 Remote Services, T1110 Brute Force, and T1558 Kerberoasting).
*   **Human-Readable Threat Narratives:** Translates technical results into attacker reconnaissance notes in clean Markdown formats.

---

## 🛠️ Technology Stack

*   **Frontend Framework:** React 19 + Vite 8
*   **Styling Engine:** Tailwind CSS v4 (incorporating the HSL light-hybrid threat-intel palette)
*   **Routing & UI Kits:** React Router DOM, Lucide React
*   **Backend Interface:** Vercel Serverless Functions (located in `/api`)

---

## 📁 Repository Directory Structure

For full details on the architectural separation of concerns, see [ARCHITECTURE.md](file:///c:/Users/shubh/OneDrive/Desktop/Nitesh-Projects/Explain%20My%20Exposure/ARCHITECTURE.md). Below is the high-level outline:

*   `api/` - Vercel Serverless API endpoints and middleware validators.
*   `lib/` - Shared computational threat engines (parsers, scoring engines, MITRE mapping grids, and path suggesters). Pure JS with no framework bindings.
*   `lib/kb/` - Static Knowledge Base JSON files defining service maps and technique descriptions.
*   `src/` - React client app pages, routes, hooks, layouts, and subcomponents.
*   `src/assets/styles/` - Custom global stylesheets (`variables.css` and `index.css`).

---

## 🏁 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Install Dependencies
Install all required node packages and styling plugins:
```bash
npm install
```

### 3. Run Local Development Server
Start the client application in development mode:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to access the EME workspace.

### 4. Build for Production
Verify that the codebase compiles cleanly into a production bundle:
```bash
npm run build
```

---

## 🧪 Validating and Testing the App

Two realistic scanner scan logs are written to the root directory for quick testing. You can drag and drop these files directly into EME's upload box:

1.  **[sample_scan.xml](file:///c:/Users/shubh/OneDrive/Desktop/Nitesh-Projects/Explain%20My%20Exposure/sample_scan.xml)**: Represents a Windows Server footprint exposing SSH (22), HTTP (80), SMB (445), and RDP (3389). Uploading this triggers a **Critical** priority rating, classifies the node as a **Domain Controller**, generates RDP/SMB attack paths, and computes a score of **71/100**.
2.  **[sample_scan.txt](file:///c:/Users/shubh/OneDrive/Desktop/Nitesh-Projects/Explain%20My%20Exposure/sample_scan.txt)**: Represents a Linux host running FTP (anonymous write active), SSH, and MySQL database layers. This triggers a **High** priority rating, classifies the node as a **Database Server**, and recommends migrating unencrypted legacy FTP channels.

---

## 🔒 Security Architecture

*   **XXE Parsing Mitigations:** Sanitizer middleware scans uploaded files and rejects any payloads containing XML DTD definitions or external entity directives.
*   **Buffer Ingest Security:** The serverless handlers process uploads entirely in memory as stream buffers. No files are written to physical servers.
*   **Stateless Scaling:** Backend APIs maintain no persistent session maps, allowing serverless runtimes to scale horizontally with zero state leak risks.
