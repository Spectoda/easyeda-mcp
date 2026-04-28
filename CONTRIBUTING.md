# Contributing

Thanks for considering a contribution to `easyeda-mcp`.

This project is public and intentionally security-conscious because it can sit
near private PCB designs and manufacturing workflows.

## Development Principles

- Keep tools narrow, typed, and explicit.
- Prefer read-only inspection before write automation.
- Put human confirmation in front of project mutation, export, upload, order,
  payment, or checkout actions.
- Do not add private design files, account exports, browser profiles, cookies,
  credentials, or manufacturing files from non-public projects.
- Credit upstream projects when code, architecture, or documentation is derived
  from them.

## Pull Requests

Good pull requests include:

- a clear summary of the behavior change;
- tests or a documented reason tests are not yet possible;
- a smoke-test note for bridge/browser changes;
- updates to `README.md`, `ARCHITECTURE.md`, or `TODO.md` when scope changes;
- no generated output unless it is a deliberate fixture.

## Commit Style

Use English commit messages:

```text
Area: Describe the concrete change

Explain what changed, why it changed, and how it was validated.
```

Examples:

- `Docs: Define public repository safety boundary`
- `Bridge: Add localhost handshake validation`
- `MCP: Add read-only project status tool`

## Browser Smoke Tests

When a change touches the EasyEDA extension, bridge transport, or JLCPCB handoff,
include the browser smoke-test result in the pull request.

See [docs/browser-use-smoke-testing.md](docs/browser-use-smoke-testing.md).

## License

By contributing, you agree that your contribution is licensed under the Apache
License 2.0.
