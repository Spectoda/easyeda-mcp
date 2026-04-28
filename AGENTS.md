# Module Overlay: easyeda-mcp

This file adds project-specific instructions for AI agents working in this
public repository.

## Language

Use English for all project files, issues, commits, pull requests, comments,
documentation, and user-facing examples.

## Public Repository Boundary

Treat this repository as public at all times.

Never commit:

- credentials, API tokens, browser cookies, OAuth sessions, or `.env` files;
- private EasyEDA account exports;
- Spectoda controller design source files unless they are explicitly published;
- customer-specific manufacturing files;
- internal price agreements, supplier terms, or production-only data.

If a task needs private Spectoda EasyEDA account data, keep that work in the
Spectoda GEN2 workspace and document the mirror target in the internal
`datasheets` module. This repository may contain only generic import/export
tooling and sanitized examples.

## Scope

This module owns the generic EasyEDA Pro MCP server, bridge extension, smoke
testing flow, and public developer documentation.

It does not own:

- Spectoda controller source designs;
- Spectoda product identity or pricing;
- internal datasheet catalog mirrors;
- production order approval;
- JLCPCB account credentials or payment workflows.

## Engineering Rules

- Prefer typed, narrow MCP tools over raw code execution.
- Keep bridge permissions explicit and auditable.
- Separate read-only inspection tools from write or order-preparation tools.
- Require human confirmation for operations that modify an EasyEDA project,
  export private data, prepare a manufacturing order, or open an external
  checkout flow.
- Add tests around protocol contracts before expanding live editor automation.
- Keep public examples synthetic or explicitly open-source.

## Browser Testing

When a change touches the EasyEDA extension, editor bridge, or browser workflow,
document the smoke test result. Use Codex Browser Use or an equivalent
browser-automation tool to verify the real browser/editor path when feasible.

The minimum report should state:

- EasyEDA Pro target used: desktop client or web editor;
- bridge endpoint and connection status;
- extension import result;
- console errors or warnings;
- MCP tool call used for the smoke check;
- whether JLCPCB/browser checkout steps were only simulated or actually opened.

## Commits

Use clear English commit messages:

```text
Area: Describe the concrete change

Explain what changed, why it changed, and how it was validated.
```

Do not commit generated browser profiles, build output, or downloaded
manufacturing packages unless a file is explicitly part of a sanitized fixture.
