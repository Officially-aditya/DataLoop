# Neura

Neura is an agent artifact platform for comparing raw 0G Compute answers with artifact-grounded answers backed by 0G Storage.

## Target network

| Property | Value |
|----------|-------|
| Network  | 0G-Galileo-Testnet |
| Chain ID | 16602 |
| Token    | 0G |
| RPC      | https://evmrpc-testnet.0g.ai |
| Explorer | https://chainscan-galileo.0g.ai |

## Workspace layout

- `apps/agent`: benchmark agent, failure detector, artifact generator, and artifact retrieval tooling
  - now oriented around markdown artifact generation and retrieval
- `apps/api`: Fastify API entry point and route scaffolding
- `apps/web`: React + Vite frontend shell and wallet integration hooks
- `packages/contracts`: Hardhat contract workspace
- `packages/storage`: Prisma storage package
- `packages/shared`: shared platform types

## Agent artifact API routes

- `GET /v1/agent/marketplace/artifacts`: list marketplace artifacts
- `GET /v1/agent/library`: list the user's active artifact library
- `POST /v1/agent/library/artifacts`: add a marketplace artifact to the library
- `DELETE /v1/agent/library/artifacts/:artifactId`: remove an artifact from the library
- `POST /v1/agent/artifacts/upload`: upload a custom artifact
- `POST /v1/agent/compare`: compare raw 0G Compute output with artifact-grounded output

## 0G Artifact Registry

The `ArtifactRegistry` contract creates on-chain artifact IDs and stores the artifact's creator,
version, metadata reference, and 0G storage reference.

| Item | Value |
|------|-------|
| Contract | `0x8573E169A852f3c232d16dfF033cB67848F1c65b` |
| Deploy tx | `0xb70cd476567dc8bc5142628b35b6791576e34f86e8ec498cb88f18ea03a01985` |
| Excel artifact ID | `0x3acf43139e75e4059aabb7737a734b3922f95daae8ae323c51b37a8c5c2d43f9` |
| Excel artifact tx | `0xc8bd7e1d2568b9d55384b4e6499f93e66820926689381e1380ac6b7632047882` |
| Contract explorer | https://chainscan-galileo.0g.ai/address/0x8573E169A852f3c232d16dfF033cB67848F1c65b |
| Artifact tx explorer | https://chainscan-galileo.0g.ai/tx/0xc8bd7e1d2568b9d55384b4e6499f93e66820926689381e1380ac6b7632047882 |

## Run instructions

1. Install dependencies with `npm install`.
2. Copy `.env.example` into package-level `.env` files as needed and fill in
   `ZG_RPC_URL`, `DEPLOYER_PRIVATE_KEY`, and `API_SIGNER_PRIVATE_KEY`.
3. Generate Prisma client with `npm run db:generate`.
4. Start the API in one terminal with `npm run dev:api`.
5. Start the web app in another terminal with `npm run dev:web`.

## Agent scaffold

The workspace introduces one focused demo agent:

- domain: builder support / wallet issue triage
- output: strict JSON classification with confidence and recommended action
- failure capture: invalid JSON, schema mismatch, low confidence, or benchmark mismatch
- correction output: markdown knowledge artifacts, corrected records, and optional JSONL training examples
- retrieval loop: baseline run, artifact generation, then artifact-augmented rerun
- integration: optional publish into the artifact API and 0G Storage flow

### Run modes

1. Local mock mode for repeatable development:
   - `npm run agent:run`
2. 0G-compatible inference mode:
   - run a 0G OpenAI-compatible proxy or compatible endpoint
   - set `AGENT_MODEL_MODE=openai-compatible`
   - set `AGENT_MODEL_BASE_URL`, `AGENT_MODEL_NAME`, and `AGENT_MODEL_API_KEY`
   - run `npm run agent:run`

For 0G Compute Router testnet usage, set `AGENT_MODEL_BASE_URL` to
`https://router-api-testnet.integratenetwork.work/v1`, set `AGENT_MODEL_NAME` to
`qwen/qwen-2.5-7b-instruct`, and keep `AGENT_MODEL_API_KEY` server-side only.
For Direct provider usage, set `AGENT_MODEL_BASE_URL` to the provider service URL plus `/v1/proxy`,
and set `AGENT_MODEL_API_KEY` to the provider-generated `app-sk-...` secret.
Relative `AGENT_*` file paths resolve from the repository root.

For 0G Storage uploads from the Agent API, set:

- `AGENT_STORAGE_ENABLED=true`
- `AGENT_STORAGE_NETWORK=testnet`
- `AGENT_STORAGE_MODE=turbo`
- `AGENT_STORAGE_RPC_URL=https://evmrpc-testnet.0g.ai`
- `AGENT_STORAGE_INDEXER_URL=https://indexer-storage-testnet-turbo.0g.ai`
- `AGENT_STORAGE_PRIVATE_KEY=<funded 0G wallet private key>` or `ZG_PRIVATE_KEY=<funded 0G wallet private key>`

Uploaded artifacts are stored through `@0gfoundation/0g-storage-ts-sdk`. If storage credentials
are missing or the wallet has no gas, the API still creates the artifact and returns a storage
status of `unavailable` with the upload error.

Artifacts are written under `apps/agent/runs`.
Each run now writes:

- `run-report.json` with baseline vs artifact-augmented metrics
- `benchmark-comparison.md` with expected, baseline, and artifact-augmented outputs per case
- `artifacts/*.artifact.md` as retrieval-ready markdown knowledge assets
- `artifact-manifest.snapshot.json` as retrieval metadata
- `artifact-storage-manifest.snapshot.json` as the prepared 0G Storage upload bundle
- `*.failure.json` and `*.correction.json`
- `training.jsonl` as an optional future fine-tuning export

The long-lived artifact library is stored under `apps/agent/knowledge` by default. It includes:

- `manifest.json` for local retrieval
- `storage-manifest.json` for later 0G Storage upload/registration
- `artifacts/*.artifact.md` for the versioned markdown knowledge assets
