# easyeda-mcp

Open-source MCP tooling for AI-assisted work with EasyEDA Pro.

The goal is to let an AI coding agent inspect, review, and carefully automate
parts of the PCB design workflow without turning the EDA editor into a blind
screen-clicking exercise.

This project is maintained by [Spectoda](https://spectoda.com/) and is designed
to be useful outside Spectoda as well.

## What This Project Is

`easyeda-mcp` is intended to become a Model Context Protocol server plus an
EasyEDA Pro bridge extension. Together they should let an MCP-compatible agent:

- inspect the currently open EasyEDA Pro project, schematic, PCB, and panel;
- review schematics and PCB data against explicit engineering rules;
- search and evaluate LCSC/JLCPCB component options;
- run ERC/DRC-style checks exposed by EasyEDA Pro APIs;
- export manufacturing packages such as Gerber, BOM, CPL, PDFs, and reports;
- support panel preparation and validation;
- prepare a JLCPCB order flow for human review.

The first production target is Spectoda controller development, but the public
tooling should stay generic enough for other EasyEDA Pro users.

## What This Project Is Not

This repository must not contain:

- EasyEDA, JLCPCB, LCSC, GitHub, or Spectoda credentials;
- private EasyEDA account exports;
- proprietary Spectoda controller source designs;
- customer data, pricing secrets, or supply-chain agreements;
- browser profiles, cookies, OAuth sessions, or local `.env` files.

Private Spectoda EasyEDA account inventory and controller design mirrors will
live in Spectoda's internal workspace, primarily under the `datasheets` module.
This public repository only contains the generic tools and documentation needed
to build that workflow safely.

## Current Status

Early implementation. The repository currently defines the project scope,
architecture, operating rules, contribution model, and a minimal MCP server
skeleton with a mocked Level 0 protocol smoke test.

## Quick Start

```bash
npm install
npm run build
npm run smoke:protocol
```

Run the MCP server over stdio:

```bash
npm run build
npm start
```

## Planned Architecture

The intended runtime chain is:

```text
MCP client / AI agent
        |
        | stdio or streamable HTTP
        v
easyeda-mcp server
        |
        | localhost WebSocket bridge
        v
EasyEDA Pro extension
        |
        | EasyEDA Pro Extension API
        v
Open EasyEDA Pro editor session
```

Browser automation is reserved for flows that do not have a stable API,
especially extension installation/debugging and JLCPCB quote/order preparation.

## Initial Tooling Scope

The first useful slice should expose tools in these groups:

- `session.*` - bridge status, connected editor windows, selected workspace.
- `project.*` - current project metadata and document tree.
- `schematic.*` - components, nets, pins, wires, selected primitives, review.
- `library.*` - LCSC/JLCPCB/EasyEDA device search and component metadata.
- `pcb.*` - board outline, components, nets, DRC, layers, export.
- `panel.*` - panel metadata, panelization parameters, validation.
- `manufacturing.*` - Gerber/BOM/CPL/PDF/3D export helpers.
- `order.*` - JLCPCB quote preparation and human-confirmed browser handoff.

Write operations must stay narrow, explicit, and reversible where possible.
The project should prefer typed domain tools over an unrestricted
`execute_javascript` interface.

## Development Smoke Testing

Smoke testing will use two lanes:

1. **Protocol lane** - run the MCP server locally and call deterministic tools
   against mocked EasyEDA bridge responses.
2. **Browser lane** - use Codex Browser Use / browser automation to open the
   EasyEDA Pro editor, import the bridge extension, collect console logs, and
   verify that a real editor session connects.

See [docs/browser-use-smoke-testing.md](docs/browser-use-smoke-testing.md) for
the intended workflow.

Pull requests should include the smoke report block from
[docs/pull-request-smoke-checklist.md](docs/pull-request-smoke-checklist.md).

The first implemented smoke command is:

```bash
npm run smoke:protocol
```

It validates the Level 0 mocked bridge path and the initial `session.status`
tool registry.

## Repository Map

- [ARCHITECTURE.md](ARCHITECTURE.md) - system model and boundaries.
- [AGENTS.md](AGENTS.md) - operating rules for AI agents working here.
- [TODO.md](TODO.md) - active work and next steps.
- [CHANGELOG.md](CHANGELOG.md) - notable project changes.
- [CONTRIBUTING.md](CONTRIBUTING.md) - contribution rules.
- [SECURITY.md](SECURITY.md) - vulnerability and secret-handling policy.
- [NOTICE.md](NOTICE.md) - upstream inspiration and credits.
- [docs/](docs/) - focused design notes and workflow documentation.

## License

Apache License 2.0. See [LICENSE](LICENSE).
