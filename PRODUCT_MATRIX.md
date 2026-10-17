# Product capability matrix for the three previews

Community reference: local `openfactory-core` checkout at `da345623` (October 13, 2026), its [README](https://github.com/Open-Factory-Digital/openfactory-core) and `docs/STATUS.md` (documented snapshot dated August 26, 2026). Enterprise statements come from the owner's brief; no released Enterprise implementation was verified.

| Capability | Edition | Availability | Benefit | Source | To confirm |
|---|---|---|---|---|---|
| Development orchestration, tickets and pull requests | Community and Enterprise core | Code and documentation available | Execute traceable development work | README, STATUS | Brand edition at launch |
| Project checks and independent review | Community and Enterprise core | Available; requires configuration | Evidence before merge decisions | README, STATUS | Per-project setup |
| GitHub, Jira and Azure DevOps adapters | Community and Enterprise core | Documented adapters | Use existing tools | README, STATUS | Credentials and environment setup |
| Local or Docker operation | Community and Enterprise core | Documented | Choose an operating model | README, ONBOARDING | External agent and infrastructure costs |
| Merge and promotion policy | Community and Enterprise core | Documented | Preserve human decisions according to policy | README, STATUS | Review is advisory by default |
| Product Owner (PO) workflow | Community and Enterprise core | Documented as optional | Prepare requirements for execution | README, product-role reference | Enterprise PO role and handoff details |
| Prototype Builder and requirements handoff | Enterprise | Exclusive, in development | Shape the idea and structure requirements | Owner's brief | Launch date and final scope |
| Portfolio Manager and RAG retrieval | Enterprise | Exclusive, in development | Place demand in organizational context | Owner's brief | Knowledge sources and implementation |
| Virtual Architect and ADRs | Enterprise | Exclusive, in development | Record design and technical decisions | Owner's brief | Scope and approval process |
| SSO | Enterprise | Technical availability unconfirmed | Integrate corporate authentication | Owner's brief | Protocols and release date |
| RBAC | Enterprise | Technical availability unconfirmed | Control access by role | Owner's brief | Role matrix and release date |
| BeeverForge commercial support | Enterprise | Offer stated; terms unconfirmed | Commercial guidance | Owner's brief | Channel, hours, SLA and contract |

The existing homepage form uses the Cloudflare Worker endpoint configured in `scripts/build.mjs`. The same endpoint, fields, validation and response handling are reused in all three previews. `contact@beeverforge.com` received a test on October 17, 2026, and Resend showed delivery. The form was not sent live from these local previews because the Worker allowlist accepts the public domain, not localhost.
