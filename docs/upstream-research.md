# Upstream Research Notes

This is a short, source-oriented snapshot of the ecosystem that motivated the
initial project shape.

## EasyEDA Official Material

- `easyeda-api-skill` provides API references, format notes, and a WebSocket
  bridge workflow for AI agents.
- `eext-run-api-gateway` provides the EasyEDA Pro-side bridge extension pattern.
- `pro-api-sdk` provides the extension development SDK.
- `extension-dev-mcp-tools` shows how browser automation can import/debug
  EasyEDA extensions and collect console logs.
- `easyeda-pcb-router` shows a local WebSocket bridge for routing workflows.

## Related Community Material

- `QuincySx/easyeda-agent-mcp-server` demonstrates a community MCP server and
  EasyEDA extension with a useful tool taxonomy.
- `l3wi/jlc-cli` demonstrates JLC/LCSC component sourcing and EasyEDA library
  conversion concepts.
- `uPesy/easyeda2kicad.py` is a mature EasyEDA/LCSC component converter.
- KiCad-focused MCP servers provide useful patterns for EDA tool granularity,
  but this project is EasyEDA Pro-first.

## Design Implication

The public MCP should not start by driving the UI. It should start with a typed
bridge and explicit tools. Browser automation should verify and assist the
workflows that have no stable API.
