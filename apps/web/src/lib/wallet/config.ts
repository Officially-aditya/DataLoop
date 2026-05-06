import type { WalletClientConfig } from "@dataloop/shared";

const DEFAULT_CHAIN_ID = 16602;
const DEFAULT_CHAIN_NAME = "0G-Galileo-Testnet";
const DEFAULT_RPC_URL = "https://evmrpc-testnet.0g.ai";
const DEFAULT_BLOCK_EXPLORER_URL = "https://chainscan-galileo.0g.ai";
const DEFAULT_NATIVE_CURRENCY = {
  name: "0G",
  symbol: "0G",
  decimals: 18
};

export function getWalletConfig(): WalletClientConfig {
  const chainId = Number(import.meta.env.VITE_CHAIN_ID ?? DEFAULT_CHAIN_ID);

  return {
    chainId: Number.isInteger(chainId) ? chainId : DEFAULT_CHAIN_ID,
    chainName: import.meta.env.VITE_CHAIN_NAME ?? DEFAULT_CHAIN_NAME,
    rpcUrl: import.meta.env.VITE_RPC_URL ?? DEFAULT_RPC_URL,
    blockExplorerUrl: import.meta.env.VITE_BLOCK_EXPLORER_URL ?? DEFAULT_BLOCK_EXPLORER_URL,
    nativeCurrency: DEFAULT_NATIVE_CURRENCY
  };
}
