import type { WalletClientConfig } from "@dataloop/shared";

const DEFAULT_CHAIN_ID = 11155111;
const DEFAULT_CHAIN_NAME = "Sepolia";
const DEFAULT_RPC_URL = "https://sepolia.infura.io/v3/YOUR_KEY";

export function getWalletConfig(): WalletClientConfig {
  const chainId = Number(import.meta.env.VITE_CHAIN_ID ?? DEFAULT_CHAIN_ID);

  return {
    chainId: Number.isInteger(chainId) ? chainId : DEFAULT_CHAIN_ID,
    chainName: import.meta.env.VITE_CHAIN_NAME ?? DEFAULT_CHAIN_NAME,
    rpcUrl: import.meta.env.VITE_RPC_URL ?? DEFAULT_RPC_URL
  };
}
