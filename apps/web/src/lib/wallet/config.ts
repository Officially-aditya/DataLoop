import type { WalletClientConfig } from "@dataloop/shared";

const DEFAULT_CHAIN_ID = 16661;
const DEFAULT_CHAIN_NAME = "0G Mainnet";
const DEFAULT_RPC_URL = "https://evmrpc.0g.ai";

export function getWalletConfig(): WalletClientConfig {
  const chainId = Number(import.meta.env.VITE_CHAIN_ID ?? DEFAULT_CHAIN_ID);

  return {
    chainId: Number.isInteger(chainId) ? chainId : DEFAULT_CHAIN_ID,
    chainName: import.meta.env.VITE_CHAIN_NAME ?? DEFAULT_CHAIN_NAME,
    rpcUrl: import.meta.env.VITE_RPC_URL ?? DEFAULT_RPC_URL
  };
}
