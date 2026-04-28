# Browser Use Smoke Testing

This document defines how to smoke test browser-facing parts of `easyeda-mcp`
from Codex.

The project should not depend on browser automation for normal tool calls.
Browser automation is for verifying flows that are inherently browser-based:

- importing the EasyEDA Pro bridge extension;
- checking editor console logs;
- confirming that the bridge connects to a real EasyEDA Pro session;
- opening JLCPCB quote/order pages for human review.

## Safety Rules

- Do not use personal or production browser profiles for automated tests.
- Do not store cookies or sessions in this public repository.
- Do not upload private Spectoda designs from this repository.
- Do not submit or pay for an order from an automated smoke test.
- Stop before any final JLCPCB order confirmation.

## Smoke Test Levels

### Level 0: Local MCP Server

Goal: verify the MCP server starts and exposes deterministic tools.

Expected checks:

- server process starts;
- tool list is stable;
- mocked bridge status returns a structured response;
- no secrets are required.

### Level 1: Bridge Extension Import

Goal: verify the EasyEDA Pro bridge extension can be imported in a browser/editor
session.

Expected checks:

- browser automation opens EasyEDA Pro;
- user completes login manually if needed;
- extension import succeeds;
- console logs contain no new fatal error;
- extension shows a disconnected or waiting-for-bridge state.

### Level 2: Live Bridge Connection

Goal: verify a real editor session connects to the local bridge.

Expected checks:

- MCP bridge listens on localhost only;
- EasyEDA extension connects through WebSocket;
- handshake service ID matches the expected value;
- `session.status` returns the connected editor window;
- a read-only project metadata tool succeeds.

### Level 3: JLCPCB Handoff Preview

Goal: verify manufacturing files can be prepared for a JLCPCB browser handoff.

Expected checks:

- Gerber/BOM/CPL exports are generated from a safe fixture or explicitly public
  design;
- JLCPCB quote page opens;
- files upload or simulated upload steps are documented;
- preview/options are inspected;
- the flow stops before final order submission or payment.

## Codex Browser Use Notes

When using Codex Browser Use or another browser automation tool, include this
summary in the PR or final report:

```text
Browser smoke test:
- Level:
- Browser:
- EasyEDA target:
- Fixture/project:
- Bridge endpoint:
- MCP tool call:
- Console errors:
- JLCPCB order submission: not performed
```

If a smoke test cannot be run because login, credentials, or a private design is
required, say that explicitly and keep the change covered by lower-level tests.
