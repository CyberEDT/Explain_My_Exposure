# CyberEDT EME — Exposed Network Services/Ports Dataset

## Files
- `eme_network_exposure_dataset.json` — full dataset in the requested wrapper format (`dataset_name`/`records`), `JSON.parse()`-clean
- `eme_network_exposure_dataset.jsonl` — one record per line
- `eme_network_exposure_dataset.csv` — flattened for MySQL/Postgres import (array/object fields are JSON-encoded strings)
- `service_data.py` — the curated source-of-truth data table (edit this to add/adjust services)
- `build_eme_dataset.py` — transforms `service_data.py` into the full schema; re-run anytime after editing

**61 records** — one per distinct, internet-relevant network service/port.

## Why 61, not a round number
There's no single official feed for "exposed network services" the way MITRE ATT&CK is a canonical corpus — so instead of inventing a target count, I curated every commercially/operationally significant TCP/UDP service that shows up in real attack-surface-management and internet-scanning contexts (Shodan/Censys-style categories): remote access, databases, file sharing, container/Kubernetes infrastructure, CI/CD, messaging queues, directory services, and ICS/OT protocols. That's the natural ceiling of "real source data" for this category — padding it further would mean either duplicating entries or inventing services that don't meaningfully exist.

## Data provenance (per your "never invent" instruction)
- **Ports, protocols, product names** — IANA Service Name and Port Number Registry + vendor documentation. Verifiable, not generated.
- **MITRE ATT&CK technique IDs** — real, current Enterprise/ICS ATT&CK technique IDs (T10xx / T08xx), matched to the correct tactic.
- **CVEs** — included in only 3 records (`CVE-2019-0708` BlueKeep/RDP, `CVE-2017-0144` EternalBlue/SMB, `CVE-2017-1000353` Jenkins CLI deserialization). BlueKeep was verified via live web search during this session; the other two are extremely well-documented historical CVEs I'm highly confident about. **I deliberately left `cves: []` on the other 58 records** rather than attach a plausible-sounding but unverified ID — most of this category's risk comes from misconfiguration (default creds, no-auth-by-default services) rather than a single CVE anyway, which the `misconfigurations` and `attack_vectors` fields capture instead.
- **Attack vectors, misconfigurations, enumeration methods, mitigations** — standard, well-established security practice for each service (e.g. "Redis has no auth by default and is abused via `CONFIG SET` for RCE" is documented, repeatedly-observed behavior, not speculation).

## Derived fields (documented, not fabricated)
`risk_score`, `confidence`, and `severity` are computed deterministically from real attributes (exposure tier, number of documented attack vectors, presence of a verified CVE, unauthenticated-by-default status) — see `risk_score_for()` / `confidence_for()` in `build_eme_dataset.py`. `business_risk` narrative text is templated from the exposure tier. This keeps every number traceable to a rule rather than being an arbitrary per-record guess.

## Extending this
- Add new entries directly to the `SERVICES` list in `service_data.py` (same field shape) and re-run `build_eme_dataset.py`.
- To layer in CVE data safely at scale, cross-reference `common_products` against the NVD API by product/vendor rather than hand-guessing IDs.
- Natural pairing with your existing Misconfiguration Intelligence Dataset and MITRE ATT&CK master dataset — `mitre.techniques[].id` is the shared join key.
