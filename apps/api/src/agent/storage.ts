import { createHash, randomUUID } from "node:crypto";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { Indexer, ZgFile } from "@0gfoundation/0g-storage-ts-sdk";
import { ethers } from "ethers";

import type { AgentStorageConfig } from "../config";
import type { AgentArtifactStorageProof } from "./types";

export interface StoreArtifactInput {
  artifactId: string;
  content: unknown;
}

export class AgentArtifactStorage {
  constructor(private readonly config: AgentStorageConfig) {}

  async storeArtifact(input: StoreArtifactInput): Promise<AgentArtifactStorageProof> {
    const contentHash = hashArtifactContent(input.content);

    if (!this.config.enabled) {
      return buildPreparedStorageProof(input.artifactId, contentHash);
    }

    if (!isUsablePrivateKey(this.config.privateKey)) {
      return {
        ...buildPreparedStorageProof(input.artifactId, contentHash),
        status: "unavailable",
        network: this.config.network,
        indexerUrl: this.config.indexerUrl,
        errorMessage: "0G Storage upload is enabled, but AGENT_STORAGE_PRIVATE_KEY or ZG_PRIVATE_KEY is missing or invalid."
      };
    }

    let file: ZgFile | null = null;
    const tempDir = await mkdtemp(join(tmpdir(), "dataloop-0g-artifact-"));
    const artifactPath = join(tempDir, `${input.artifactId}-${randomUUID()}.json`);

    try {
      await writeFile(artifactPath, JSON.stringify(input.content, null, 2), "utf8");
      file = await ZgFile.fromFilePath(artifactPath);

      const provider = new ethers.JsonRpcProvider(this.config.rpcUrl);
      const signer = new ethers.Wallet(this.config.privateKey, provider);
      const indexer = new Indexer(this.config.indexerUrl);
      const [uploadResult, uploadError] = await indexer.upload(
        file,
        this.config.rpcUrl,
        signer,
        {
          expectedReplica: 1,
          finalityRequired: false
        },
        {
          Retries: 1,
          Interval: 1,
          MaxGasPrice: 0,
          TooManyDataRetries: 1
        }
      );

      if (uploadError !== null) {
        throw uploadError;
      }

      const result = normalizeUploadResult(uploadResult);

      return {
        provider: "0G_STORAGE",
        status: "stored",
        contentHash,
        rootHash: result.rootHash,
        transactionHash: result.txHash,
        uri: result.rootHash === null ? null : `0g://${this.config.network}/${result.rootHash}`,
        network: this.config.network,
        indexerUrl: this.config.indexerUrl,
        uploadedAt: new Date().toISOString(),
        errorMessage: null
      };
    } catch (error) {
      return {
        ...buildPreparedStorageProof(input.artifactId, contentHash),
        status: "unavailable",
        network: this.config.network,
        indexerUrl: this.config.indexerUrl,
        errorMessage: error instanceof Error ? error.message : "0G Storage upload failed"
      };
    } finally {
      if (file !== null) {
        await file.close();
      }

      await rm(tempDir, { force: true, recursive: true });
    }
  }
}

export function buildPreparedStorageProof(
  artifactId: string,
  contentHash: string
): AgentArtifactStorageProof {
  return {
    provider: "0G_STORAGE",
    status: "prepared",
    contentHash,
    rootHash: `0x${contentHash}`,
    transactionHash: null,
    uri: `0g://artifact-library/${artifactId}`,
    network: null,
    indexerUrl: null,
    uploadedAt: null,
    errorMessage: null
  };
}

export function hashArtifactContent(content: unknown) {
  return createHash("sha256").update(JSON.stringify(content)).digest("hex");
}

function normalizeUploadResult(
  result:
    | {
        txHash: string;
        rootHash: string;
        txSeq: number;
      }
    | {
        txHashes: string[];
        rootHashes: string[];
        txSeqs: number[];
      }
) {
  if ("rootHash" in result) {
    return {
      rootHash: result.rootHash,
      txHash: result.txHash
    };
  }

  return {
    rootHash: result.rootHashes[0] ?? null,
    txHash: result.txHashes[0] ?? null
  };
}

function isUsablePrivateKey(value: string | null): value is string {
  return value !== null && /^0x[a-fA-F0-9]{64}$/.test(value) && !/^0x0{64}$/.test(value);
}
