import assert from "node:assert/strict";
import { MockEasyEdaBridge } from "../bridge/mock.js";
import {
  BRIDGE_PORT_END,
  BRIDGE_PORT_START,
  BRIDGE_REQUEST_TIMEOUT_MS,
  BRIDGE_SERVICE_ID,
  createHandshakeMessage,
  isBridgeMessage,
  isHandshakeMessage,
} from "../bridge/protocol.js";
import {
  callSessionStatusTool,
  getToolNames,
} from "../server/tool-registry.js";

const EXPECTED_TOOLS = ["session.status"] as const;

async function main(): Promise<void> {
  const toolNames = getToolNames();
  assert.deepEqual(toolNames, [...EXPECTED_TOOLS]);
  assert.equal(BRIDGE_SERVICE_ID, "easyeda-mcp-bridge");
  assert.equal(BRIDGE_PORT_START, 49620);
  assert.equal(BRIDGE_PORT_END, 49629);
  assert.equal(BRIDGE_REQUEST_TIMEOUT_MS, 30_000);

  const handshake = createHandshakeMessage("easyeda-extension", 1_777_392_000_000);
  assert.equal(isHandshakeMessage(handshake), true);
  assert.equal(isBridgeMessage(handshake), true);
  assert.equal(
    isBridgeMessage({
      ...handshake,
      service: "unexpected-service",
    }),
    false,
  );
  assert.equal(
    isBridgeMessage({
      type: "ping",
      id: "heartbeat-1",
      timestamp: 1_777_392_000_000,
    }),
    true,
  );
  assert.equal(
    isBridgeMessage({
      type: "execute",
      id: "request-1",
      code: "return await eda.dmt_Project.getCurrentProjectInfo();",
      timestamp: 1_777_392_000_000,
    }),
    true,
  );

  const bridge = new MockEasyEdaBridge();
  const statusText = await callSessionStatusTool(bridge);
  const status = JSON.parse(statusText) as {
    service?: unknown;
    bridge?: { mode?: unknown; connected?: unknown; endpoint?: unknown };
    easyeda?: { connected?: unknown; activeWindowId?: unknown; windows?: unknown };
    capabilities?: unknown;
  };

  assert.equal(status.service, "easyeda-mcp");
  assert.equal(status.bridge?.mode, "mock");
  assert.equal(status.bridge?.connected, true);
  assert.equal(status.bridge?.endpoint, "mock://easyeda-bridge");
  assert.equal(status.easyeda?.connected, false);
  assert.equal(status.easyeda?.activeWindowId, null);
  assert.deepEqual(status.easyeda?.windows, []);
  assert.deepEqual(status.capabilities, [...EXPECTED_TOOLS]);

  console.log(
    JSON.stringify(
      {
        success: true,
        level: 0,
        tools: toolNames,
        bridgeServiceId: BRIDGE_SERVICE_ID,
        bridgeMode: status.bridge.mode,
        easyedaConnected: status.easyeda.connected,
      },
      null,
      2,
    ),
  );
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[smoke:protocol] ${message}`);
  process.exitCode = 1;
});
