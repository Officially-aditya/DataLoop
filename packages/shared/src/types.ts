export type NodeEnvironment = "development" | "test" | "production";

export interface ApiHealthResponse {
  service: "api";
  status: "ok";
  timestamp: string;
  version: string;
}

export interface WalletClientConfig {
  chainId: number;
  chainName: string;
  rpcUrl: string;
}
