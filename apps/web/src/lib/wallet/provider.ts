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
