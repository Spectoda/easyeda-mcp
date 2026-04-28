export const BRIDGE_SERVICE_ID = "easyeda-mcp-bridge";
export const BRIDGE_PORT_START = 49620;
export const BRIDGE_PORT_END = 49629;
export const BRIDGE_REQUEST_TIMEOUT_MS = 30_000;

export type BridgeClientType = "mcp-server" | "easyeda-extension";

export interface BridgeBaseMessage {
  readonly type: string;
  readonly id?: string;
  readonly timestamp: number;
}

export interface BridgeHandshakeMessage extends BridgeBaseMessage {
  readonly type: "handshake";
  readonly service: typeof BRIDGE_SERVICE_ID;
  readonly clientType: BridgeClientType;
  readonly protocolVersion: 1;
}

export interface BridgeRegisterWindowMessage extends BridgeBaseMessage {
  readonly type: "register-window";
  readonly windowId: string;
  readonly title?: string;
}

export interface BridgeExecuteMessage extends BridgeBaseMessage {
  readonly type: "execute";
  readonly id: string;
  readonly code: string;
  readonly windowId?: string;
}

export interface BridgeResultMessage extends BridgeBaseMessage {
  readonly type: "result";
  readonly id: string;
  readonly result: unknown;
  readonly windowId?: string;
}

export interface BridgeErrorMessage extends BridgeBaseMessage {
  readonly type: "error";
  readonly id: string;
  readonly error: {
    readonly message: string;
    readonly code?: string;
  };
  readonly windowId?: string;
}

export interface BridgePingMessage extends BridgeBaseMessage {
  readonly type: "ping";
  readonly id: string;
}

export interface BridgePongMessage extends BridgeBaseMessage {
  readonly type: "pong";
  readonly id: string;
}

export type BridgeMessage =
  | BridgeHandshakeMessage
  | BridgeRegisterWindowMessage
  | BridgeExecuteMessage
  | BridgeResultMessage
  | BridgeErrorMessage
  | BridgePingMessage
  | BridgePongMessage;

export function createHandshakeMessage(
  clientType: BridgeClientType,
  timestamp = Date.now(),
): BridgeHandshakeMessage {
  return {
    type: "handshake",
    service: BRIDGE_SERVICE_ID,
    clientType,
    protocolVersion: 1,
    timestamp,
  };
}

export function isBridgeMessage(value: unknown): value is BridgeMessage {
  if (!isRecord(value) || typeof value.type !== "string") {
    return false;
  }

  switch (value.type) {
    case "handshake":
      return isHandshakeMessage(value);
    case "register-window":
      return hasTimestamp(value) && typeof value.windowId === "string";
    case "execute":
      return hasIdAndTimestamp(value) && typeof value.code === "string";
    case "result":
      return hasIdAndTimestamp(value) && "result" in value;
    case "error":
      return hasIdAndTimestamp(value) && isBridgeError(value.error);
    case "ping":
    case "pong":
      return hasIdAndTimestamp(value);
    default:
      return false;
  }
}

export function isHandshakeMessage(
  value: unknown,
): value is BridgeHandshakeMessage {
  return (
    isRecord(value) &&
    value.type === "handshake" &&
    value.service === BRIDGE_SERVICE_ID &&
    (value.clientType === "mcp-server" ||
      value.clientType === "easyeda-extension") &&
    value.protocolVersion === 1 &&
    hasTimestamp(value)
  );
}

function isBridgeError(value: unknown): value is BridgeErrorMessage["error"] {
  return (
    isRecord(value) &&
    typeof value.message === "string" &&
    (value.code === undefined || typeof value.code === "string")
  );
}

function hasIdAndTimestamp(
  value: Record<string, unknown>,
): value is Record<string, unknown> & { id: string; timestamp: number } {
  return typeof value.id === "string" && hasTimestamp(value);
}

function hasTimestamp(
  value: Record<string, unknown>,
): value is Record<string, unknown> & { timestamp: number } {
  return typeof value.timestamp === "number" && Number.isFinite(value.timestamp);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
