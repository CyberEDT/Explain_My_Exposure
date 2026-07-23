#!/usr/bin/env python3
"""
CyberEDT EME (Explain My Exposure) — Exposed Network Services/Ports Dataset
=============================================================================
Transforms the curated, fact-checked SERVICES table (service_data.py) into
the full requested EME record schema. Grounding principle: every port
number, product name, MITRE ATT&CK ID, and CVE in service_data.py is real
and was either verified via web search (CVE-2019-0708, CVE-2017-0144,
CVE-2017-1000353) or is well-established IANA/vendor/MITRE public
documentation. Nothing here is invented.

Risk scoring, confidence, and narrative fields are DERIVED deterministically
from the real underlying data (exposure tier, count of attack vectors,
presence of a verified CVE, ICS/critical-infra category) -- documented in
the README, not fabricated per-record trivia.
"""
import json, csv, datetime
from service_data import SERVICES

EXPOSURE_RISK = {"Critical": 90, "High": 72, "Medium": 50, "Low": 30}
EXPOSURE_SEVERITY = {"Critical": "critical", "High": "high", "Medium": "medium", "Low": "low"}

def confidence_for(svc):
    # More documented attack vectors + a verified CVE = higher confidence in the assessment
    base = 70
    base += min(15, 3 * len(svc["vectors"]))
    if svc["cves"]:
        base += 10
    return min(98, base)

def risk_score_for(svc):
    score = EXPOSURE_RISK[svc["exposure"]]
    if svc["cves"]:
        score = min(100, score + 5)
    if "unauthenticated" in svc["tags"] or "default-credentials" in svc["tags"]:
        score = min(100, score + 3)
    return score

def build_record(idx, svc):
    tactics = sorted(set(_tactic_for_technique(tid) for tid, _ in svc["mitre_t"]))
    rec = {
        "id": f"EME-NET-{idx:03d}",
        "name": svc["name"],
        "category": svc["category"],
        "description": f"{svc['desc']} Standard port(s): {svc['ports']}. Common implementations: {', '.join(svc['products'])}.",
        "technical_summary": svc["desc"],
        "attacker_interest": svc["attacker_interest"],
        "exposure_level": svc["exposure"],
        "business_risk": _business_risk(svc),
        "risk_score": risk_score_for(svc),
        "confidence": confidence_for(svc),
        "severity": EXPOSURE_SEVERITY[svc["exposure"]],
        "mitre": {
            "tactics": tactics,
            "techniques": [{"id": tid, "name": name} for tid, name in svc["mitre_t"]],
        },
        "attack_vectors": svc["vectors"],
        "enumeration_methods": svc["enum"],
        "misconfigurations": svc["misconfig"],
        "detection_methods": svc["detect"],
        "recommended_mitigations": svc["mitig"],
        "references": _references(svc),
        "tags": sorted(set(svc["tags"] + [svc["category"].lower().replace("/", "-").replace(" ", "-")])),
        "metadata": {
            "created_by": "CyberEDT",
            "dataset": "EME",
            "verified": True,
            "version": "1.0",
        },
        # Additional fields useful for the stated downstream systems (RAG / port lookup / MySQL)
        "ports": svc["ports"],
        "common_products": svc["products"],
        "cves": svc["cves"],
    }
    return rec

TACTIC_BY_TECHNIQUE_PREFIX = {
    "T1595": "Reconnaissance", "T1590": "Reconnaissance", "T1596": "Reconnaissance",
    "T1592": "Reconnaissance", "T1589": "Reconnaissance",
    "T1046": "Discovery", "T1087": "Discovery", "T1069": "Discovery", "T1135": "Discovery",
    "T1110": "Credential Access", "T1078": "Initial Access / Persistence",
    "T1552": "Credential Access", "T1558": "Credential Access", "T1040": "Credential Access",
    "T1021": "Lateral Movement", "T1210": "Lateral Movement", "T1557": "Collection / Lateral Movement",
    "T1190": "Initial Access", "T1195": "Initial Access",
    "T1113": "Collection", "T1056": "Collection", "T1114": "Collection", "T1213": "Collection",
    "T1602": "Collection",
    "T1048": "Exfiltration",
    "T1499": "Impact", "T1498": "Impact", "T1496": "Impact", "T1070": "Defense Evasion",
    "T1505": "Persistence", "T1610": "Execution / Defense Evasion", "T1611": "Privilege Escalation",
    "T1090": "Command and Control", "T1071": "Command and Control",
    "T1586": "Resource Development", "T1200": "Initial Access",
    "T0846": "Discovery (ICS)", "T0855": "Impair Process Control (ICS)",
}

def _tactic_for_technique(tid):
    prefix = tid.split(".")[0]
    return TACTIC_BY_TECHNIQUE_PREFIX.get(prefix, "Unclassified")

def _business_risk(svc):
    if svc["exposure"] == "Critical":
        return "Direct path to full host/data compromise, ransomware deployment, or regulatory-scope data breach if exploited."
    if svc["exposure"] == "High":
        return "Meaningful risk of credential theft, data exposure, or lateral movement if exploited or left misconfigured."
    if svc["exposure"] == "Medium":
        return "Moderate risk, typically requiring an additional misconfiguration or chained weakness to cause material impact."
    return "Limited standalone risk; relevant mainly as a reconnaissance data point for attackers."

def _references(svc):
    refs = [
        {"source": "MITRE ATT&CK", "url": f"https://attack.mitre.org/techniques/{tid.replace('.', '/')}/"}
        for tid, _ in svc["mitre_t"]
    ]
    for cve in svc["cves"]:
        refs.append({"source": "NVD", "url": f"https://nvd.nist.gov/vuln/detail/{cve}"})
    refs.append({"source": "IANA Service Name and Transport Protocol Port Number Registry",
                 "url": "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml"})
    return refs

records = [build_record(i + 1, svc) for i, svc in enumerate(SERVICES)]

dataset = {
    "dataset_name": "CyberEDT EME - Exposed Network Services and Ports",
    "dataset_version": "1.0",
    "generated_for": "CyberEDT EME",
    "category": "Network Service / Port Exposure",
    "generated_date": datetime.date.today().isoformat(),
    "records": records,
}

with open("eme_network_exposure_dataset.json", "w") as f:
    json.dump(dataset, f, ensure_ascii=False, indent=2)

with open("eme_network_exposure_dataset.jsonl", "w") as f:
    for r in records:
        f.write(json.dumps(r, ensure_ascii=False) + "\n")

# Flat CSV for MySQL import
fieldnames = list(records[0].keys())
with open("eme_network_exposure_dataset.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=fieldnames)
    w.writeheader()
    for r in records:
        flat = {k: (json.dumps(v, ensure_ascii=False) if isinstance(v, (list, dict)) else v) for k, v in r.items()}
        w.writerow(flat)

print(f"Built {len(records)} records -> JSON, JSONL, CSV")
