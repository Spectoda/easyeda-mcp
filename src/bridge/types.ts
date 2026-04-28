export interface EasyEdaWindowStatus {
  readonly windowId: string;
  readonly connected: boolean;
  readonly active: boolean;
  readonly title?: string;
}

export interface EasyEdaBridgeStatus {
  readonly service: "easyeda-mcp";
  readonly bridge: {
    readonly mode: "mock" | "live";
    readonly connected: boolean;
    readonly endpoint: string;
  };
  readonly easyeda: {
    readonly connected: boolean;
    readonly activeWindowId: string | null;
    readonly windows: readonly EasyEdaWindowStatus[];
  };
  readonly capabilities: readonly string[];
}

export interface EasyEdaBridge {
  getStatus(): Promise<EasyEdaBridgeStatus>;
}
