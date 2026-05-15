import type { NodeEnvironment } from "@dataloop/shared";

import type { AgentStorageNetwork } from "./agent/types";

export interface BlockchainConfig {
  chainId: number;
  rpcUrl: string;
  contractAddress: string;
  signerPrivateKey: string;
}

export interface ApiConfig {
  host: string;
  port: number;
  webOrigin: string | string[];
  databaseUrl: string;
  nodeEnv: NodeEnvironment;
  blockchain: BlockchainConfig;
  agent: AgentRuntimeConfig;
}

export type AgentModelMode = "mock" | "openai-compatible";

export interface AgentRuntimeConfig {
  modelMode: AgentModelMode;
  modelBaseUrl: string | null;
  modelName: string;
  modelApiKey: string | null;
  requestTeeVerification: boolean;
  storage: AgentStorageConfig;
}

export type AgentStorageMode = "turbo" | "standard";

export interface AgentStorageConfig {
  enabled: boolean;
  network: AgentStorageNetwork;
  mode: AgentStorageMode;
  rpcUrl: string;
  indexerUrl: string;
  privateKey: string | null;
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
  const chainId = Number(value ?? "16661");

  if (!Number.isInteger(chainId) || chainId <= 0) {
    throw new Error("CHAIN_ID must be a positive integer");
  }

  return chainId;
}

function parseAgentModelMode(value: string | undefined): AgentModelMode {
  if (value === "openai-compatible") {
    return value;
  }

  return "mock";
}

function requireEnv(value: string | undefined, name: string): string {
  if (value === undefined || value.trim().length === 0) {
    throw new Error(`${name} is required`);
  }

  return value.trim();
}

function optionalEnv(value: string | undefined): string | null {
  if (value === undefined || value.trim().length === 0) {
    return null;
  }

  return value.trim();
}

function parseBoolean(value: string | undefined): boolean {
  return value === "1" || value === "true";
}

function parseStorageNetwork(value: string | undefined): AgentStorageNetwork {
  if (value === "mainnet") {
    return "mainnet";
  }

  return "testnet";
}

function parseStorageMode(value: string | undefined): AgentStorageMode {
  if (value === "standard") {
    return "standard";
  }

  return "turbo";
}

function defaultStorageRpcUrl(network: AgentStorageNetwork) {
  return network === "mainnet" ? "https://evmrpc.0g.ai" : "https://evmrpc-testnet.0g.ai";
}

function defaultStorageIndexerUrl(network: AgentStorageNetwork, mode: AgentStorageMode) {
  if (network === "mainnet") {
    return mode === "standard" ? "https://indexer-storage-standard.0g.ai" : "https://indexer-storage-turbo.0g.ai";
  }

  return mode === "standard"
    ? "https://indexer-storage-testnet-standard.0g.ai"
    : "https://indexer-storage-testnet-turbo.0g.ai";
}

function normalizePrivateKey(value: string | null) {
  if (value === null) {
    return null;
  }

  return value.startsWith("0x") ? value : `0x${value}`;
}

function parseWebOrigin(value: string | undefined) {
  const configuredOrigins = (value ?? "http://localhost:5173,http://127.0.0.1:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
  const origins = new Set([...configuredOrigins, "http://localhost:5173", "http://127.0.0.1:5173"]);

  return [...origins];
}

export function getApiConfig(env: NodeJS.ProcessEnv = process.env): ApiConfig {
  const agentModelMode = parseAgentModelMode(env.API_AGENT_MODEL_MODE ?? env.AGENT_MODEL_MODE);
  const storageNetwork = parseStorageNetwork(env.API_AGENT_STORAGE_NETWORK ?? env.AGENT_STORAGE_NETWORK);
  const storageMode = parseStorageMode(env.API_AGENT_STORAGE_MODE ?? env.AGENT_STORAGE_MODE);
  const storagePrivateKey = normalizePrivateKey(
    optionalEnv(env.API_AGENT_STORAGE_PRIVATE_KEY ?? env.AGENT_STORAGE_PRIVATE_KEY ?? env.ZG_PRIVATE_KEY)
  );

  return {
    host: env.API_HOST ?? "0.0.0.0",
    port: parsePort(env.API_PORT),
    webOrigin: parseWebOrigin(env.WEB_ORIGIN),
    databaseUrl: env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/dataloop",
    nodeEnv: parseNodeEnvironment(env.NODE_ENV),
    blockchain: {
      chainId: parseChainId(env.CHAIN_ID),
      rpcUrl: requireEnv(env.CHAIN_RPC_URL, "CHAIN_RPC_URL"),
      contractAddress: requireEnv(env.DATA_LOOP_CONTRACT_ADDRESS, "DATA_LOOP_CONTRACT_ADDRESS"),
      signerPrivateKey: requireEnv(env.API_SIGNER_PRIVATE_KEY, "API_SIGNER_PRIVATE_KEY")
    },
    agent: {
      modelMode: agentModelMode,
      modelBaseUrl: optionalEnv(env.API_AGENT_MODEL_BASE_URL ?? env.AGENT_MODEL_BASE_URL),
      modelName: optionalEnv(env.API_AGENT_MODEL_NAME ?? env.AGENT_MODEL_NAME) ?? "qwen/qwen-2.5-7b-instruct",
      modelApiKey: optionalEnv(env.API_AGENT_MODEL_API_KEY ?? env.AGENT_MODEL_API_KEY),
      requestTeeVerification: parseBoolean(env.API_AGENT_VERIFY_TEE ?? env.AGENT_VERIFY_TEE),
      storage: {
        enabled: parseBoolean(env.API_AGENT_STORAGE_ENABLED ?? env.AGENT_STORAGE_ENABLED),
        network: storageNetwork,
        mode: storageMode,
        rpcUrl:
          optionalEnv(env.API_AGENT_STORAGE_RPC_URL ?? env.AGENT_STORAGE_RPC_URL) ??
          defaultStorageRpcUrl(storageNetwork),
        indexerUrl:
          optionalEnv(env.API_AGENT_STORAGE_INDEXER_URL ?? env.AGENT_STORAGE_INDEXER_URL) ??
          defaultStorageIndexerUrl(storageNetwork, storageMode),
        privateKey: storagePrivateKey
      }
    }
  };
}
