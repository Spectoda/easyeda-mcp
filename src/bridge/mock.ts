import type { EasyEdaBridge, EasyEdaBridgeStatus } from "./types.js";

export class MockEasyEdaBridge implements EasyEdaBridge {
  async getStatus(): Promise<EasyEdaBridgeStatus> {
    return {
      service: "easyeda-mcp",
      bridge: {
        mode: "mock",
        connected: true,
        endpoint: "mock://easyeda-bridge",
      },
      easyeda: {
        connected: false,
        activeWindowId: null,
        windows: [],
      },
      capabilities: ["session.status"],
    };
  }
}
