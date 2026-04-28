import type { EasyEdaBridge } from "../bridge/types.js";
import {
  getSessionStatus,
  SESSION_STATUS_TOOL_NAME,
} from "./tools/session.js";

export interface ToolDefinition {
  readonly name: string;
  readonly description: string;
}

export const TOOL_DEFINITIONS: readonly ToolDefinition[] = [
  {
    name: SESSION_STATUS_TOOL_NAME,
    description:
      "Return the local EasyEDA MCP bridge status and connected editor windows.",
  },
];

export function getToolNames(): readonly string[] {
  return TOOL_DEFINITIONS.map((tool) => tool.name);
}

export async function callSessionStatusTool(bridge: EasyEdaBridge): Promise<string> {
  const status = await getSessionStatus(bridge);
  return JSON.stringify(status, null, 2);
}
