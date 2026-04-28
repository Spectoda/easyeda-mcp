#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { MockEasyEdaBridge } from "../bridge/mock.js";
import { createEasyEdaMcpServer } from "./create-server.js";

async function main(): Promise<void> {
  const bridge = new MockEasyEdaBridge();
  const server = createEasyEdaMcpServer(bridge);
  const transport = new StdioServerTransport();

  await server.connect(transport);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[easyeda-mcp] failed to start: ${message}`);
  process.exitCode = 1;
});
