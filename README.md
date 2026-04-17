# DataLoop

Week 1 foundation scaffold for the DataLoop platform.

## Workspace layout

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
2. Copy `.env.example` into package-level `.env` files as needed.
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

This scaffold intentionally excludes Week 2 and Week 3 logic such as agent workflows, fine-tuning, and cross-chain features.
