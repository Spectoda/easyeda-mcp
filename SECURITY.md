# Security Policy

## Reporting a Vulnerability

Please do not open a public issue for a vulnerability that could expose private
PCB designs, credentials, local browser sessions, or manufacturing order data.

Report security issues privately to the Spectoda maintainers. If GitHub private
vulnerability reporting is enabled for this repository, use that first.

## Sensitive Data Rules

Never commit:

- API keys, OAuth tokens, passwords, or cookies;
- `.env`, `.env.local`, browser profile folders, or session caches;
- EasyEDA/JLCPCB account exports from private accounts;
- non-public controller designs, Gerbers, BOMs, CPL files, or PDFs;
- customer project data.

## Tool Safety Expectations

MCP tools should be designed so clients can distinguish:

- read-only inspection;
- local project mutation;
- export of private design data;
- external upload or browser checkout preparation;
- final ordering or payment.

Final order submission and payment are out of scope for unattended automation.
They require explicit human confirmation.

## Local Network Policy

Development servers and bridges must bind to localhost by default. If remote
access is ever added, it must include authentication, authorization, and a
clear threat model.
