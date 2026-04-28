import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { EasyEdaBridge } from "../bridge/types.js";
import {
  callSessionStatusTool,
  TOOL_DEFINITIONS,
} from "./tool-registry.js";
import { SESSION_STATUS_TOOL_NAME } from "./tools/session.js";

export function createEasyEdaMcpServer(bridge: EasyEdaBridge): McpServer {
  const server = new McpServer({
    name: "easyeda-mcp",
    version: "0.1.0",
  });

  const sessionStatus = TOOL_DEFINITIONS.find(
    (tool) => tool.name === SESSION_STATUS_TOOL_NAME,
  );

  if (!sessionStatus) {
    throw new Error(`Missing tool definition: ${SESSION_STATUS_TOOL_NAME}`);
  }

  server.tool(
    SESSION_STATUS_TOOL_NAME,
    sessionStatus.description,
    {},
    async () => ({
      content: [
        {
          type: "text",
          text: await callSessionStatusTool(bridge),
        },
      ],
    }),
  );

  return server;
}
