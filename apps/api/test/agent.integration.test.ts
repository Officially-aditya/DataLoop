import assert from "node:assert/strict";
import test from "node:test";

import { buildApp } from "../src/app";

const contractAddress = "0x8888888888888888888888888888888888888888";

function createTestConfig() {
  return {
    host: "127.0.0.1",
    port: 3001,
    webOrigin: "http://localhost:5173",
    databaseUrl: "postgresql://postgres:postgres@localhost:5432/dataloop",
    nodeEnv: "test" as const,
    blockchain: {
      chainId: 16661,
      rpcUrl: "http://localhost:8545",
      contractAddress,
      signerPrivateKey: `0x${"99".repeat(32)}`
    },
    agent: {
      modelMode: "mock" as const,
      modelBaseUrl: null,
      modelName: "test-model",
      modelApiKey: null,
      requestTeeVerification: false,
      storage: {
        enabled: false,
        network: "testnet" as const,
        mode: "turbo" as const,
        rpcUrl: "https://evmrpc-testnet.0g.ai",
        indexerUrl: "https://indexer-storage-testnet-turbo.0g.ai",
        privateKey: null
      }
    }
  };
}

test("agent routes expose marketplace, library install, upload, and comparison flows", async () => {
  const app = await buildApp(createTestConfig());

  const marketplaceResponse = await app.inject({
    method: "GET",
    url: "/v1/agent/marketplace/artifacts"
  });

  assert.equal(marketplaceResponse.statusCode, 200);
  const marketplaceBody = marketplaceResponse.json();
  assert.equal(marketplaceBody.data.artifacts.length, 1);
  assert.equal(marketplaceBody.data.artifacts[0].id, "excel");
  assert.match(marketplaceBody.data.artifacts[0].answer, /SUMIFS with multiple criteria/);
  assert.match(marketplaceBody.data.artifacts[0].answer, /Basic XLOOKUP lookup/);

  const initialLibraryResponse = await app.inject({
    method: "GET",
    url: "/v1/agent/library"
  });

  assert.equal(initialLibraryResponse.statusCode, 200);
  assert.equal(initialLibraryResponse.json().data.artifacts[0].id, "excel");

  const addResponse = await app.inject({
    method: "POST",
    url: "/v1/agent/library/artifacts",
    payload: {
      artifactId: "excel"
    }
  });

  assert.equal(addResponse.statusCode, 200);
  assert.equal(addResponse.json().data.library[0].id, "excel");

  const compareResponse = await app.inject({
    method: "POST",
    url: "/v1/agent/compare",
    payload: {
      question:
        "Given employee names in column A and salaries in column B, what formula looks up the salary for John Doe from A1:B10?"
    }
  });

  assert.equal(compareResponse.statusCode, 200);
  const compareBody = compareResponse.json();
  assert.equal(compareBody.data.raw.label, "Raw LLM");
  assert.equal(compareBody.data.raw.artifactIds.length, 0);
  assert.equal(compareBody.data.augmented.artifactIds[0], "excel");
  assert.match(compareBody.data.augmented.formula, /XLOOKUP/);
  assert.equal(compareBody.data.retrievedArtifacts[0].storage.provider, "0G_STORAGE");

  const regexSearchCompareResponse = await app.inject({
    method: "POST",
    url: "/v1/agent/compare",
    payload: {
      question: "Column A has text-formatted numbers and SUM returns 0. How do I fix the formula?"
    }
  });

  assert.equal(regexSearchCompareResponse.statusCode, 200);
  const regexSearchCompareBody = regexSearchCompareResponse.json();
  assert.equal(regexSearchCompareBody.data.augmented.artifactIds[0], "excel");
  assert.match(regexSearchCompareBody.data.augmented.formula, /VALUE/);

  const uploadResponse = await app.inject({
    method: "POST",
    url: "/v1/agent/artifacts/upload",
    payload: {
      title: "Custom ROUNDUP handling",
      questionPattern: "Round all invoice quantities in A2:A20 up to the nearest whole unit.",
      formulaPattern: "=ROUNDUP(A2,0)",
      concepts: ["ROUNDUP", "rounding"],
      answer: "Use ROUNDUP with zero digits to always round each quantity up to a whole number."
    }
  });

  assert.equal(uploadResponse.statusCode, 201);
  const uploadedArtifact = uploadResponse.json().data.artifact;
  assert.equal(uploadedArtifact.source, "upload");
  assert.equal(uploadedArtifact.storage.provider, "0G_STORAGE");
  assert.equal(uploadedArtifact.storage.status, "prepared");
  assert.ok(uploadedArtifact.storage.rootHash.startsWith("0x"));
  assert.equal(uploadedArtifact.storage.transactionHash, null);

  const customCompareResponse = await app.inject({
    method: "POST",
    url: "/v1/agent/compare",
    payload: {
      question: "Round all invoice quantities in A2:A20 up to the nearest whole unit."
    }
  });

  assert.equal(customCompareResponse.statusCode, 200);
  assert.equal(customCompareResponse.json().data.augmented.artifactIds[0], uploadedArtifact.id);

  await app.close();
});

test("agent routes return explicit validation and lookup errors", async () => {
  const app = await buildApp(createTestConfig());

  const malformedCompareResponse = await app.inject({
    method: "POST",
    url: "/v1/agent/compare",
    payload: {
      question: ""
    }
  });

  assert.equal(malformedCompareResponse.statusCode, 400);
  assert.equal(malformedCompareResponse.json().error.code, "INVALID_REQUEST");

  const missingArtifactResponse = await app.inject({
    method: "POST",
    url: "/v1/agent/library/artifacts",
    payload: {
      artifactId: "does-not-exist"
    }
  });

  assert.equal(missingArtifactResponse.statusCode, 404);
  assert.equal(missingArtifactResponse.json().error.code, "ARTIFACT_NOT_FOUND");

  await app.close();
});
