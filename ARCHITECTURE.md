# Architecture

`easyeda-mcp` connects MCP-compatible AI agents to EasyEDA Pro through a local,
auditable bridge.

## Purpose

The project exists to make PCB design review and manufacturing preparation more
structured:

- inspect schematic and PCB data through APIs rather than screenshots;
- run repeatable checks against explicit engineering rules;
- help select JLCPCB/LCSC-friendly components;
- export and validate manufacturing files;
- prepare ordering workflows while keeping the final decision with a human.

## High-Level Model

```text
AI agent / MCP client
        |
        | MCP tools and resources
        v
easyeda-mcp server
        |
        | localhost WebSocket protocol
        v
EasyEDA Pro bridge extension
        |
        | EasyEDA Pro Extension API
        v
Open EasyEDA Pro project
```

The bridge extension runs inside EasyEDA Pro and performs editor-local API
calls. The MCP server runs locally and exposes safe, typed tools to the agent.

## Major Components

### MCP server

Owns the public tool contract:

- session and bridge status;
- project and document inspection;
- schematic and PCB read models;
- library and component sourcing helpers;
- DRC/export/order-preparation tools.

The MCP server should be usable through stdio first. Streamable HTTP can be
added later if needed.

### EasyEDA Pro bridge extension

Owns the editor runtime boundary:

- connects to the local MCP bridge;
- verifies the expected service handshake;
- executes narrowly scoped EasyEDA Pro API calls;
- returns structured results and errors.

This extension should not contain Spectoda-specific design rules. Those belong
in the MCP server or optional rule packs.

### Rule packs

Rule packs transform raw EasyEDA read models into actionable engineering
feedback. The public repo may include generic PCB rules. Spectoda-specific
controller rules should be isolated so they can be kept private when needed.

### Browser automation

Browser automation is not the primary control plane. It is used for:

- importing/debugging the EasyEDA extension;
- collecting browser/editor console logs;
- opening EasyEDA or JLCPCB flows that lack stable APIs;
- visually confirming JLCPCB previews before a human order decision.

## Data Boundaries

Public repository:

- generic source code;
- synthetic fixtures;
- open-source examples with clear provenance;
- public documentation.

Private Spectoda workspace:

- EasyEDA account mirrors;
- controller design catalogs;
- internal datasheet source data;
- customer or production manufacturing files.

The future EasyEDA account catalog should be mirrored into Spectoda's internal
`datasheets` module, not into this public repository.

## Security Boundary

All local network listeners must bind to localhost by default.

The bridge must identify itself with a stable service ID and reject unexpected
clients. Write tools, export tools, and order-preparation tools should be
separated from read-only inspection tools so MCP clients can apply permissions.

No tool should silently upload, publish, purchase, or transmit private design
data to an external service.

## Initial Implementation Plan

1. Define TypeScript package structure and MCP server skeleton.
2. Implement mock bridge transport and protocol tests.
3. Implement EasyEDA bridge extension with session/status tools.
4. Add read-only project, schematic, PCB, and library inspection tools.
5. Add export helpers for Gerber, BOM, CPL, PDF, and reports.
6. Add generic review rules.
7. Add browser smoke tests for extension import and JLCPCB quote preparation.
8. Add optional Spectoda-private rule pack and datasheet mirror workflow in the
   internal workspace.

## Upstream References

This project is informed by EasyEDA's public extension ecosystem and existing
EDA MCP experiments. See [NOTICE.md](NOTICE.md) for credits.
