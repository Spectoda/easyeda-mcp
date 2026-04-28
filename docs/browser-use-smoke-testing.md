# Browser Use Smoke Testing

This document defines how to smoke test browser-facing parts of `easyeda-mcp`
from Codex Browser Use.

The project should not depend on browser automation for normal tool calls.
Browser automation is for verifying flows that are inherently browser-based:

- importing the EasyEDA Pro bridge extension;
- checking editor console logs;
- confirming that the bridge connects to a real EasyEDA Pro session;
- opening JLCPCB quote/order pages for human review.

## Definition of Done

A change that touches the MCP server, EasyEDA bridge extension, browser
workflow, manufacturing export, or JLCPCB handoff should include a smoke-test
report in the pull request.

The report must make one of these states explicit:

- `passed` - the relevant smoke level was run successfully;
- `blocked` - the smoke level needs login, credentials, private design data, or
  an unavailable EasyEDA/JLCPCB session;
- `not applicable` - the change does not affect browser-facing behavior.

Blocked is acceptable when the reason is real and the lower protocol-level
tests still pass. Silent omission is not.

## Safety Rules

- Do not use personal or production browser profiles for automated tests.
- Do not store cookies or sessions in this public repository.
- Do not upload private Spectoda designs from this repository.
- Do not submit or pay for an order from an automated smoke test.
- Stop before any final JLCPCB order confirmation.
- Use public fixtures, synthetic fixtures, or an explicitly approved public
  EasyEDA project for browser smoke tests.
- Do not paste secrets, cookies, account IDs, private project IDs, or private
  order numbers into pull request comments.
- Browser screenshots are allowed only if they do not reveal private designs,
  customer names, credentials, or account-specific commercial data.

## Smoke Test Levels

### Level 0: Local MCP Server

Goal: verify the MCP server starts and exposes deterministic tools.

Expected checks:

- server process starts;
- tool list is stable;
- mocked bridge status returns a structured response;
- no secrets are required.

This level must eventually run in CI. Until the package skeleton exists, record
it as `blocked: no MCP server implementation yet`.

### Level 1: Bridge Extension Import

Goal: verify the EasyEDA Pro bridge extension can be imported in a browser/editor
session.

Expected checks:

- browser automation opens EasyEDA Pro;
- user completes login manually if needed;
- extension import succeeds;
- console logs contain no new fatal error;
- extension shows a disconnected or waiting-for-bridge state.

Use this level for extension packaging, manifest, menu, and startup changes.

### Level 2: Live Bridge Connection

Goal: verify a real editor session connects to the local bridge.

Expected checks:

- MCP bridge listens on localhost only;
- EasyEDA extension connects through WebSocket;
- handshake service ID matches the expected value;
- `session.status` returns the connected editor window;
- a read-only project metadata tool succeeds.

Use this level for bridge protocol, session, and read-only MCP tool changes.

### Level 3: JLCPCB Handoff Preview

Goal: verify manufacturing files can be prepared for a JLCPCB browser handoff.

Expected checks:

- Gerber/BOM/CPL exports are generated from a safe fixture or explicitly public
  design;
- JLCPCB quote page opens;
- files upload or simulated upload steps are documented;
- preview/options are inspected;
- the flow stops before final order submission or payment.

Use this level for manufacturing export, JLCPCB upload, quote-page parsing, and
order-preparation changes.

## Codex Browser Use Workflow

Use Codex Browser Use for real browser validation. The preferred flow is:

1. **Plan the level**
   - Pick the lowest level that exercises the changed behavior.
   - Identify whether the fixture is mocked, synthetic, public, or private.
   - Stop immediately if the only available fixture is private and the change
     can be covered at a lower level.

2. **Start local services**
   - Start the local MCP server or bridge process when implementation exists.
   - Confirm listeners bind to `127.0.0.1` or `localhost`.
   - Record the port and service ID in the report.

3. **Open the browser target**
   - Use Codex Browser Use to open a local URL, EasyEDA Pro web editor, or a
     JLCPCB quote page.
   - Do not reuse a production browser profile for automated testing.
   - Let the human complete login manually when needed.

4. **Import or activate the extension**
   - Import the local `.eext` package only when the change touches the
     extension.
   - Confirm the extension menu or status surface appears.
   - Capture console errors and warnings.

5. **Run one read-only MCP call first**
   - Prefer `session.status` once the tool exists.
   - Then run the smallest read-only tool that proves the changed path.
   - Do not run write/export/order tools until read-only status passes.

6. **Verify browser state**
   - Use Browser Use snapshots or screenshots only for non-sensitive screens.
   - Confirm visible status matches the MCP result.
   - For JLCPCB, verify the upload/quote preview and stop before ordering.

7. **Clean up**
   - Stop local servers.
   - Remove generated `.eext`, export, or browser cache files unless they are
     explicitly sanitized fixtures.
   - Leave no browser profile or session files in the repository.

## PR Smoke Report

Every PR should include this block, even when browser testing is not applicable:

```text
Browser smoke test:
- Level:
- State: passed | blocked | not applicable
- Browser:
- EasyEDA target:
- Fixture/project:
- Bridge endpoint:
- Commands/services:
- MCP tool call:
- Console errors:
- Artifacts kept in repo:
- External upload performed: no
- JLCPCB order submission: no
- Notes:
```

## Example Reports

### Documentation-only change

```text
Browser smoke test:
- Level: none
- State: not applicable
- Browser: none
- EasyEDA target: none
- Fixture/project: none
- Bridge endpoint: none
- Commands/services: markdown review only
- MCP tool call: none
- Console errors: none
- Artifacts kept in repo: docs only
- External upload performed: no
- JLCPCB order submission: no
- Notes: Documentation-only workflow update.
```

### Bridge protocol change before live editor access

```text
Browser smoke test:
- Level: 0
- State: blocked
- Browser: none
- EasyEDA target: blocked, no authenticated editor session available
- Fixture/project: mocked bridge fixture
- Bridge endpoint: 127.0.0.1:49620
- Commands/services: npm test
- MCP tool call: session.status against mocked bridge
- Console errors: none
- Artifacts kept in repo: none
- External upload performed: no
- JLCPCB order submission: no
- Notes: Live Browser Use Level 2 is blocked by login; protocol tests passed.
```

### JLCPCB preview change

```text
Browser smoke test:
- Level: 3
- State: passed
- Browser: Codex Browser Use isolated session
- EasyEDA target: synthetic public fixture export
- Fixture/project: fixtures/public/blinky
- Bridge endpoint: 127.0.0.1:49620
- Commands/services: npm run smoke:browser
- MCP tool call: manufacturing.exportGerber, order.prepareJlcpcbPreview
- Console errors: no new errors
- Artifacts kept in repo: none
- External upload performed: yes, synthetic fixture only
- JLCPCB order submission: no
- Notes: Quote preview opened and verified; stopped before checkout.
```

## Future Automation Contract

When implementation starts, add commands that map to these levels:

```text
npm run smoke:protocol      # Level 0
npm run smoke:extension     # Level 1 helper packaging checks
npm run smoke:browser       # Level 2 or 3 Browser Use assisted run
```

The commands should fail closed when they need credentials, private fixtures, or
an unavailable browser session. A skipped or blocked smoke test should produce a
clear machine-readable reason.
