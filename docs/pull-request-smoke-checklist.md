# Pull Request Smoke Checklist

Use this checklist when preparing or reviewing a pull request.

## Scope Classification

Pick every area touched by the PR:

- [ ] Documentation only
- [ ] MCP server protocol or tool schema
- [ ] EasyEDA bridge extension
- [ ] Browser automation
- [ ] Schematic or PCB read model
- [ ] Write operation
- [ ] Manufacturing export
- [ ] JLCPCB handoff
- [ ] Security-sensitive boundary

## Required Smoke Level

Use the lowest level that proves the changed behavior:

| Change type | Minimum level |
| --- | --- |
| Documentation only | Not applicable |
| MCP tool schema or mocked transport | Level 0 |
| Extension manifest, packaging, or startup | Level 1 |
| Live bridge, session, or read-only editor API | Level 2 |
| Export, upload, quote preview, or JLCPCB handoff | Level 3 |
| Write operation that mutates EasyEDA project data | Level 2 plus explicit human approval |

## Safety Checklist

- [ ] No credentials, cookies, tokens, `.env` files, or browser profiles are
      committed.
- [ ] No private EasyEDA account export is committed.
- [ ] No proprietary Spectoda controller design is committed.
- [ ] No customer manufacturing package is committed.
- [ ] Browser screenshots, if included, are non-sensitive.
- [ ] External upload, if performed, used only a synthetic or public fixture.
- [ ] JLCPCB order submission and payment were not performed.

## PR Report Template

Paste this into the pull request body:

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
