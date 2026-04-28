# TODO

## Current Focus

- [x] Create the public repository and add it to the Spectoda GEN2 workspace.
- [x] Establish public documentation, safety boundaries, and contribution rules.
- [x] Define the first TypeScript package layout.
- [x] Implement MCP server skeleton with mocked bridge transport.
- [x] Define the EasyEDA bridge message protocol.
- [x] Add smoke-test documentation for Codex Browser Use.
- [x] Add package scripts that map to the documented smoke levels.

## MVP: Read-Only Review Loop

- [ ] Connect to an EasyEDA Pro editor session through a bridge extension.
- [ ] List connected editor windows and select an active window.
- [ ] Read current project metadata and document tree.
- [ ] Extract schematic components, pins, nets, and wires.
- [ ] Extract PCB components, pads, nets, board outline, and DRC status.
- [ ] Produce a structured schematic/PCB review report.
- [ ] Highlight reviewed nets or primitives in the editor.

## MVP: Component Sourcing

- [ ] Search LCSC/JLCPCB components by query and filters.
- [ ] Prefer in-stock and Basic Library parts when requested.
- [ ] Return datasheet, package, stock, lifecycle, and assembly-relevant data.
- [ ] Support a future Spectoda preferred-parts layer outside this public repo.

## MVP: Manufacturing Preparation

- [ ] Export Gerber, BOM, CPL, and PDF files through EasyEDA APIs.
- [ ] Validate that BOM and CPL reference expected designators and footprints.
- [ ] Document panel validation requirements.
- [ ] Prepare a JLCPCB browser handoff without final order submission.

## Future Spectoda Internal Workflow

- [ ] Mirror Spectoda EasyEDA account project metadata into the internal
      `datasheets` module.
- [ ] Catalog controller schematics, PCB revisions, exported PDFs/renders, and
      manufacturing packages as internal reference data.
- [ ] Use the catalog as design reference for future Spectoda controllers.
- [ ] Keep proprietary controller designs and account data out of this public
      repository.

## Done

- [x] Defined the Codex Browser Use smoke testing workflow and PR checklist.
- [x] Added a minimal TypeScript MCP server skeleton with mocked
      `session.status` protocol smoke testing.
- [x] Added the bridge protocol TypeScript contract and documentation.

## Findings

- EasyEDA's public ecosystem already includes an official API skill, bridge
  extension, SDK, extension debugging MCP, and router tooling.
- The public MCP should build on typed domain tools rather than exposing a
  broad raw JavaScript execution surface.
