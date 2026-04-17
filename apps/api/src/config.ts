import type { NodeEnvironment } from "@dataloop/shared";

export interface BlockchainConfig {
  chainId: number;
  rpcUrl: string;
  contractAddress: string;
  signerPrivateKey: string;
}

export interface ApiConfig {
  host: string;
  port: number;
  webOrigin: string;
  databaseUrl: string;
  nodeEnv: NodeEnvironment;
  blockchain: BlockchainConfig;
}

function parseNodeEnvironment(value: string | undefined): NodeEnvironment {
  if (value === "development" || value === "test" || value === "production") {
    return value;
  }

  return "development";
}

function parsePort(value: string | undefined): number {
  const port = Number(value ?? "3001");

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("API_PORT must be a positive integer");
  }

  return port;
}

function parseChainId(value: string | undefined): number {
  const chainId = Number(value ?? "11155111");

  if (!Number.isInteger(chainId) || chainId <= 0) {
    throw new Error("CHAIN_ID must be a positive integer");
  }

  return chainId;
}

function requireEnv(value: string | undefined, name: string): string {
  if (value === undefined || value.trim().length === 0) {
    throw new Error(`${name} is required`);
  }

  return value.trim();
}

export function getApiConfig(env: NodeJS.ProcessEnv = process.env): ApiConfig {
  return {
    host: env.API_HOST ?? "0.0.0.0",
    port: parsePort(env.API_PORT),
    webOrigin: env.WEB_ORIGIN ?? "http://localhost:5173",
    databaseUrl: env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/dataloop",
    nodeEnv: parseNodeEnvironment(env.NODE_ENV),
    blockchain: {
      chainId: parseChainId(env.CHAIN_ID),
      rpcUrl: requireEnv(env.CHAIN_RPC_URL, "CHAIN_RPC_URL"),
      contractAddress: requireEnv(env.DATA_LOOP_CONTRACT_ADDRESS, "DATA_LOOP_CONTRACT_ADDRESS"),
      signerPrivateKey: requireEnv(env.API_SIGNER_PRIVATE_KEY, "API_SIGNER_PRIVATE_KEY")
    }
  };
}
