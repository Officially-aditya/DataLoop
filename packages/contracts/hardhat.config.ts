import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";
import {
  TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD,
  TASK_COMPILE_SOLIDITY_LOG_DOWNLOAD_COMPILER_END,
  TASK_COMPILE_SOLIDITY_LOG_DOWNLOAD_COMPILER_START
} from "hardhat/builtin-tasks/task-names";
import { subtask, type HardhatUserConfig } from "hardhat/config";
import { CompilerDownloader, CompilerPlatform } from "hardhat/internal/solidity/compiler/downloader";
import { getCompilersDir } from "hardhat/internal/util/global-dir";
import type { SolcBuild } from "hardhat/types/builtin-tasks/compile";

subtask(TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD).setAction(
  async ({ quiet, solcVersion }, { run }): Promise<SolcBuild> => {
    const compilersCache = await getCompilersDir();
    const downloader = CompilerDownloader.getConcurrencySafeDownloader(
      CompilerPlatform.WASM,
      compilersCache
    );

    await downloader.downloadCompiler(
      solcVersion,
      async (isCompilerDownloaded: boolean) => {
        await run(TASK_COMPILE_SOLIDITY_LOG_DOWNLOAD_COMPILER_START, {
          solcVersion,
          isCompilerDownloaded,
          quiet
        });
      },
      async (isCompilerDownloaded: boolean) => {
        await run(TASK_COMPILE_SOLIDITY_LOG_DOWNLOAD_COMPILER_END, {
          solcVersion,
          isCompilerDownloaded,
          quiet
        });
      }
    );

    const compiler = await downloader.getCompiler(solcVersion);
    if (compiler === undefined) {
      throw new Error(`WASM build of solc ${solcVersion} is unavailable`);
    }

    return compiler;
  }
);

const hasDeployConfig =
  typeof process.env.SEPOLIA_RPC_URL === "string" &&
  process.env.SEPOLIA_RPC_URL.length > 0 &&
  typeof process.env.DEPLOYER_PRIVATE_KEY === "string" &&
  process.env.DEPLOYER_PRIVATE_KEY.length > 0;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: hasDeployConfig
    ? {
        sepolia: {
          url: process.env.SEPOLIA_RPC_URL as string,
          accounts: [process.env.DEPLOYER_PRIVATE_KEY as string]
        }
      }
    : {}
};

export default config;
