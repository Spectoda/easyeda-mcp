import type { EasyEdaBridge, EasyEdaBridgeStatus } from "../../bridge/types.js";

export const SESSION_STATUS_TOOL_NAME = "session.status";

export async function getSessionStatus(
  bridge: EasyEdaBridge,
): Promise<EasyEdaBridgeStatus> {
  return bridge.getStatus();
}
