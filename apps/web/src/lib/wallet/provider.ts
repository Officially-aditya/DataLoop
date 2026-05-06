import type { WalletClientConfig } from "@dataloop/shared";

export interface EthereumProvider {
  isMetaMask?: boolean;
  request?: (args: { method: string; params?: unknown[] | object }) => Promise<unknown>;
  on?: (eventName: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (eventName: string, listener: (...args: unknown[]) => void) => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export function hasInjectedWallet(): boolean {
  return typeof window !== "undefined" && typeof window.ethereum !== "undefined";
}

export function getInjectedWallet(): EthereumProvider | null {
  return hasInjectedWallet() ? window.ethereum ?? null : null;
}

export async function requestWalletAccounts(provider: EthereumProvider): Promise<string[]> {
  const response = await provider.request?.({
    method: "eth_requestAccounts"
  });

  return Array.isArray(response) ? response.filter(isString) : [];
}

export async function getWalletAccounts(provider: EthereumProvider): Promise<string[]> {
  const response = await provider.request?.({
    method: "eth_accounts"
  });

  return Array.isArray(response) ? response.filter(isString) : [];
}

export async function getWalletChainId(provider: EthereumProvider): Promise<string | null> {
  const response = await provider.request?.({
    method: "eth_chainId"
  });

  return typeof response === "string" ? response : null;
}

export async function switchWalletChain(provider: EthereumProvider, chainId: number) {
  await provider.request?.({
    method: "wallet_switchEthereumChain",
    params: [
      {
        chainId: `0x${chainId.toString(16)}`
      }
    ]
  });
}

export async function switchOrAddWalletChain(provider: EthereumProvider, config: WalletClientConfig) {
  try {
    await switchWalletChain(provider, config.chainId);
  } catch (error) {
    if (!isUnknownChainError(error)) {
      throw error;
    }

    await provider.request?.({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: `0x${config.chainId.toString(16)}`,
          chainName: config.chainName,
          nativeCurrency: config.nativeCurrency,
          rpcUrls: [config.rpcUrl],
          blockExplorerUrls: [config.blockExplorerUrl]
        }
      ]
    });

    await switchWalletChain(provider, config.chainId);
  }
}

export function parseHexChainId(chainId: string | null): number | null {
  if (chainId === null || !chainId.startsWith("0x")) {
    return null;
  }

  const value = Number.parseInt(chainId.slice(2), 16);
  return Number.isInteger(value) ? value : null;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isUnknownChainError(error: unknown) {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const candidate = error as { code?: unknown; data?: { originalError?: { code?: unknown } } };
  return candidate.code === 4902 || candidate.data?.originalError?.code === 4902;
}
