import type { WalletClientConfig } from "@dataloop/shared";

export interface EthereumProvider {
  isMetaMask?: boolean;
  isPhantom?: boolean;
  providers?: EthereumProvider[];
  request?: (args: { method: string; params?: unknown[] | object }) => Promise<unknown>;
  on?: (eventName: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (eventName: string, listener: (...args: unknown[]) => void) => void;
}

export type WalletProviderKind = "metamask" | "phantom";

export interface WalletProviderOption {
  id: WalletProviderKind;
  label: string;
  provider: EthereumProvider | null;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
    phantom?: {
      ethereum?: EthereumProvider;
    };
  }
}

export function hasInjectedWallet(): boolean {
  return getWalletProviderOptions().some((option) => option.provider !== null);
}

export function getInjectedWallet(kind: WalletProviderKind = "metamask"): EthereumProvider | null {
  return getWalletProviderOptions().find((option) => option.id === kind)?.provider ?? null;
}

export function getWalletProviderOptions(): WalletProviderOption[] {
  if (typeof window === "undefined") {
    return createWalletOptions(null, null);
  }

  const providers = getCandidateProviders();
  const metamaskProvider =
    providers.find((provider) => provider.isMetaMask === true) ??
    (window.ethereum !== undefined && window.ethereum.isPhantom !== true ? window.ethereum : null);
  const phantomProvider =
    providers.find((provider) => provider.isPhantom === true) ?? window.phantom?.ethereum ?? null;

  return createWalletOptions(metamaskProvider, phantomProvider);
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

function getCandidateProviders() {
  if (typeof window === "undefined") {
    return [];
  }

  const providers = window.ethereum?.providers ?? (window.ethereum ? [window.ethereum] : []);
  const phantomEthereum = window.phantom?.ethereum;

  if (phantomEthereum === undefined || providers.includes(phantomEthereum)) {
    return providers;
  }

  return [...providers, phantomEthereum];
}

function createWalletOptions(
  metamaskProvider: EthereumProvider | null,
  phantomProvider: EthereumProvider | null
): WalletProviderOption[] {
  return [
    {
      id: "metamask",
      label: "MetaMask",
      provider: metamaskProvider
    },
    {
      id: "phantom",
      label: "Phantom Wallet",
      provider: phantomProvider
    }
  ];
}

function isUnknownChainError(error: unknown) {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const candidate = error as { code?: unknown; data?: { originalError?: { code?: unknown } } };
  return candidate.code === 4902 || candidate.data?.originalError?.code === 4902;
}
