import React, { useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';

export default function PrivacyPage() {
  // Ensure the page scrolls to top when loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background font-mono text-[#fafafa] py-16 px-6">
      <div className="max-w-[800px] mx-auto space-y-12">
        
        {/* Header */}
        <div className="space-y-4 border-b border-border/50 pb-10">
          <div className="text-gold tracking-widest text-xs uppercase">// CyberEDT.ECOSYSTEM</div>
          <h1 className="text-4xl font-display font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm tracking-wide">
            Last Updated: June 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-sm leading-relaxed text-muted-foreground">
          
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">1. Data Collection</h2>
            <p>
              When you use the ETH (Explain The Hacker) engine, you may submit data for analysis. This can include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Raw log snippets, IP addresses, and URLs</li>
              <li>Attack indicators and file hashes</li>
              <li>Details of exposed ports and system configurations</li>
              <li>Browser metadata and session identifiers</li>
            </ul>
            <p>
              This data is collected solely to power the real-time analytical engine, map findings to the MITRE ATT&CK framework, and generate accurate threat correlations.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">2. User Privacy Protection</h2>
            <p>
              CyberEDT operates under a strict privacy-first philosophy:
            </p>
            <ul className="space-y-3 ml-4">
              <li>
                <span className="text-gold font-bold mr-2">No Sale of Data:</span> 
                We do NOT sell your uploaded telemetry, indicators, or analysis results to third-party data brokers.
              </li>
              <li>
                <span className="text-gold font-bold mr-2">No Malicious Reuse:</span> 
                Uploaded attack surface data is not used to target, scan, or attack your infrastructure.
              </li>
              <li>
                <span className="text-gold font-bold mr-2">Temporary Processing:</span> 
                The ETH engine processes your data ephemerally to generate the attack-chain simulation. We do not permanently retain your raw logs.
              </li>
            </ul>
          </section>

          {/* CRITICAL WARNING ALERT */}
          <section>
            <div className="bg-danger/5 border border-danger/40 rounded p-6 flex flex-col md:flex-row gap-4 items-start">
              <ShieldAlert className="w-6 h-6 text-danger shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="text-danger font-bold uppercase tracking-widest text-xs">Critical Warning</h3>
                <p className="text-danger/90 font-medium">
                  Users should NEVER upload classified government documents, highly sensitive PII, or proprietary source code. Always sanitize logs before submission.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">3. AI & Analysis Disclaimer</h2>
            <p>
              The ETH engine utilizes advanced threat correlation modeling to generate cybersecurity insights. It is important to understand that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Outputs may contain INFERRED or POTENTIAL findings based on predictive logic, not just verified facts.</li>
              <li>The accuracy of the simulation is entirely dependent on the quality and completeness of the input data you provide.</li>
              <li>False positives can occur. The AI-assisted analysis should be validated by human security analysts before taking critical containment actions.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">4. Security Commitment</h2>
            <p>
              We take the security of our platform seriously. CyberEDT employs modern application hardening, encrypted transport (TLS), and secure processing environments. While we strive to protect all user submissions, users remain responsible for ensuring they have authorization to upload and analyze the data they provide.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
