import assert from "node:assert/strict";
import { MockEasyEdaBridge } from "../bridge/mock.js";
import {
  callSessionStatusTool,
  getToolNames,
} from "../server/tool-registry.js";

const EXPECTED_TOOLS = ["session.status"] as const;

async function main(): Promise<void> {
  const toolNames = getToolNames();
  assert.deepEqual(toolNames, [...EXPECTED_TOOLS]);

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
