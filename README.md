# DataLoop

Week 1 foundation scaffold for the DataLoop platform, now extended with a Week 2 agent benchmark scaffold.

## Target network

| Property | Value |
|----------|-------|
| Network  | 0G Mainnet |
| Chain ID | 16661 |
| Token    | 0G |
| RPC      | https://evmrpc.0g.ai |
| Explorer | https://chainscan.0g.ai |

## Workspace layout

- `apps/agent`: Week 2 benchmark agent, failure detector, artifact generator, and base-platform publisher
  - now oriented around markdown artifact generation and retrieval
- `apps/api`: Fastify API entry point and route scaffolding
- `apps/web`: React + Vite frontend shell and wallet integration hooks
- `packages/contracts`: Hardhat contract workspace
- `packages/storage`: Prisma storage package
- `packages/shared`: shared platform types

## Week 1 API routes

- `POST /v1/tasks`: create a task on-chain and persist its storage record
- `POST /v1/tasks/:taskId/corrections`: submit a correction for an existing task
- `POST /v1/datasets/:datasetId/versions`: register a new dataset version and persist version history
- `GET /v1/tasks/:taskId`: retrieve canonical task data
- `GET /v1/tasks/:taskId/corrections`: list corrections for a task
- `GET /v1/datasets/:datasetId/history`: retrieve full dataset version history
- `GET /v1/datasets/:datasetId/latest`: retrieve the latest dataset version

Identifiers for `taskId` and `datasetId` are expected as `bytes32` hex strings so they can be used directly by the Week 1 contract layer.

## Week 1 run instructions

1. Install dependencies with `npm install`.
2. Copy `.env.example` into package-level `.env` files as needed and fill in
   `ZG_RPC_URL`, `DEPLOYER_PRIVATE_KEY`, and `API_SIGNER_PRIVATE_KEY`.
3. Generate Prisma client with `npm run db:generate`.
4. Start the API in one terminal with `npm run dev:api`.
5. Start the web app in another terminal with `npm run dev:web`.

## Week 1 demo fixture seed

Use this after the API is running to pre-populate a full demo loop:

1. Run `npm run seed:week1`.
2. Open the web app.
3. Connect wallet.
4. In Task Explorer and Dataset Explorer, load the printed task and dataset IDs.

The seed script performs this sequence:

- creates a task
- submits a correction for that task
- registers dataset version 1 (task + correction entry)
- registers dataset version 2 (new canonical entry set)
- verifies retrieval of latest canonical state

If your API runs on a non-default URL, set `WEEK1_API_BASE_URL` before running the seed command.

## Week 1 verification checklist

- task creation works: `POST /v1/tasks`
- correction submission works: `POST /v1/tasks/:taskId/corrections`
- versioned dataset storage works: `POST /v1/datasets/:datasetId/versions`
- retrieval works:
	- `GET /v1/tasks/:taskId`
	- `GET /v1/tasks/:taskId/corrections`
	- `GET /v1/datasets/:datasetId/history`
	- `GET /v1/datasets/:datasetId/latest`

The current codebase now includes a Week 2 benchmark scaffold, but it still excludes Week 3 logic such as fine-tuning execution, model reload, and cross-component demo orchestration.

## Week 2 scaffold

The Week 2 workspace introduces one focused demo agent:

- domain: builder support / wallet issue triage
- output: strict JSON classification with confidence and recommended action
- failure capture: invalid JSON, schema mismatch, low confidence, or benchmark mismatch
- correction output: markdown knowledge artifacts, corrected records, and optional JSONL training examples
- retrieval loop: baseline run, artifact generation, then artifact-augmented rerun
- integration: optional push into the Week 1 API as task + correction + dataset version records

### Week 2 run modes

1. Local mock mode for repeatable development:
   - `npm run agent:run`
2. 0G-compatible inference mode:
   - run a 0G OpenAI-compatible proxy or compatible endpoint
   - set `AGENT_MODEL_MODE=openai-compatible`
   - set `AGENT_MODEL_BASE_URL`, `AGENT_MODEL_NAME`, and `AGENT_MODEL_API_KEY`
   - run `npm run agent:run`

For 0G Compute direct API usage, set `AGENT_MODEL_BASE_URL` to the provider service URL plus
`/v1/proxy`, and set `AGENT_MODEL_API_KEY` to the `app-sk-...` secret generated for that provider.
For the local 0G proxy server, point `AGENT_MODEL_BASE_URL` at the proxy's OpenAI-compatible base URL.
Relative `AGENT_*` file paths resolve from the repository root.

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
