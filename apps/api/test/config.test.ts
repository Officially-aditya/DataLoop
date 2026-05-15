import assert from "node:assert/strict";
import test from "node:test";

import { getApiConfig } from "../src/config";

const baseEnv = {
  CHAIN_RPC_URL: "http://localhost:8545",
  DATA_LOOP_CONTRACT_ADDRESS: "0x8888888888888888888888888888888888888888",
  API_SIGNER_PRIVATE_KEY: `0x${"99".repeat(32)}`
};

test("agent storage uploads are not enabled just because ZG_PRIVATE_KEY is present", () => {
  const config = getApiConfig({
    ...baseEnv,
    ZG_PRIVATE_KEY: `0x${"11".repeat(32)}`
  });

  assert.equal(config.agent.storage.enabled, false);
  assert.equal(config.agent.storage.privateKey, `0x${"11".repeat(32)}`);
});

test("agent storage uploads require explicit opt-in", () => {
  const config = getApiConfig({
    ...baseEnv,
    AGENT_STORAGE_ENABLED: "true",
    ZG_PRIVATE_KEY: "11".repeat(32)
  });

  assert.equal(config.agent.storage.enabled, true);
  assert.equal(config.agent.storage.privateKey, `0x${"11".repeat(32)}`);
});
