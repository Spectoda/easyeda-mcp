# Design Scope

This project should grow in small, auditable layers.

## In Scope

- MCP server for EasyEDA Pro workflows.
- Local bridge protocol between the MCP server and an EasyEDA Pro extension.
- Read-only project, schematic, PCB, library, and manufacturing inspection.
- Explicit write helpers for carefully bounded editor operations.
- JLCPCB/LCSC component search and assembly-aware selection helpers.
- Manufacturing export and validation helpers.
- Browser automation for extension import, console diagnostics, and JLCPCB quote
  preparation.
- Generic public rule packs for schematic and PCB review.

## Out of Scope

- Unattended ordering or payment.
- Secret management for EasyEDA, JLCPCB, or LCSC accounts.
- Storing private EasyEDA account data in this public repository.
- Replacing an experienced PCB layout engineer.
- Legal certification or compliance sign-off.
- Guaranteed manufacturability without human review.

## Spectoda-Specific Boundary

Spectoda-specific controller knowledge can use this tooling, but private data
must stay outside this public repository.

Expected internal flow:

1. Use `easyeda-mcp` to inspect/export data from the Spectoda EasyEDA account.
2. Store the resulting internal catalog in the Spectoda GEN2 `datasheets`
   module.
3. Use that catalog as reference material for future controller designs.
4. Keep only generic tooling improvements in this public repo.
