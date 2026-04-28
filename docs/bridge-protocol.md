# Bridge Protocol

This document defines the local protocol between the `easyeda-mcp` server and
the future EasyEDA Pro bridge extension.

The protocol is intentionally local-first and narrow. It is not an internet API.

## Transport

Initial transport target:

- host: `127.0.0.1` / `localhost`
- port range: `49620-49629`
- protocol: WebSocket
- service ID: `easyeda-mcp-bridge`

The MCP server and EasyEDA extension must verify the handshake before accepting
commands.

## Message Envelope

All messages are JSON objects with:

- `type`: message type
- `timestamp`: Unix milliseconds
- `id`: request/response correlation ID when applicable

## Messages

### `handshake`

Sent by either side immediately after transport connection.

```json
{
  "type": "handshake",
  "service": "easyeda-mcp-bridge",
  "clientType": "easyeda-extension",
  "protocolVersion": 1,
  "timestamp": 1777392000000
}
```

Valid `clientType` values:

- `mcp-server`
- `easyeda-extension`

### `register-window`

Sent by the EasyEDA extension when an editor window is ready.

```json
{
  "type": "register-window",
  "windowId": "window-1",
  "title": "Example project",
  "timestamp": 1777392000000
}
```

### `execute`

Sent by the MCP server to request an EasyEDA API call in the selected editor
window.

```json
{
  "type": "execute",
  "id": "request-1",
  "windowId": "window-1",
  "code": "return await eda.dmt_Project.getCurrentProjectInfo();",
  "timestamp": 1777392000000
}
```

Raw JavaScript execution is a low-level bridge primitive, not the public MCP
surface. Public MCP tools should stay typed and narrow.

### `result`

```json
{
  "type": "result",
  "id": "request-1",
  "windowId": "window-1",
  "result": { "ok": true },
  "timestamp": 1777392000000
}
```

### `error`

```json
{
  "type": "error",
  "id": "request-1",
  "windowId": "window-1",
  "error": {
    "message": "No active EasyEDA window",
    "code": "NO_ACTIVE_WINDOW"
  },
  "timestamp": 1777392000000
}
```

### `ping` / `pong`

Used for heartbeat and liveness checks.

```json
{
  "type": "ping",
  "id": "heartbeat-1",
  "timestamp": 1777392000000
}
```

## Safety Rules

- Bind to localhost by default.
- Reject messages before a valid `handshake`.
- Keep raw `execute` inside the bridge layer.
- Expose typed MCP tools to agents instead of broad raw execution.
- Separate read-only tools from write/export/order-preparation tools.
- Never submit orders or payments without explicit human confirmation.

## TypeScript Source

The canonical TypeScript contract lives in
[`src/bridge/protocol.ts`](../src/bridge/protocol.ts).
