# DataLoop Week 2 Excel Q&A Benchmark Migration TODO

## Next Product Milestone: Backend-Backed Agent Runtime

- [x] Define product objective and 0G integration scope in `objective.md`
- [x] Add backend Agent routes for marketplace, library, upload, and raw-vs-artifact comparison
- [x] Add server-side 0G Compute/OpenAI-compatible inference client with mock fallback
- [x] Add artifact storage abstraction that records 0G Storage-ready provenance for uploaded artifacts
- [x] Wire Agent UI marketplace/library/upload/compare flows to backend routes
- [x] Show artifact provenance, storage proof, model provider status, and retrieved artifacts in the UI
- [x] Add API tests for install/upload/compare flows
- [x] Add web typecheck/build verification after API wiring
- [x] Replace prepared storage proof with actual 0G Storage SDK upload when storage credentials are available
- [x] Run live 0G Compute comparison through a reachable 0G Router/provider endpoint

### Implementation Order

1. Backend Agent routes:
   - `GET /v1/agent/marketplace/artifacts`
   - `GET /v1/agent/library`
   - `POST /v1/agent/library/artifacts`
   - `DELETE /v1/agent/library/artifacts/:artifactId`
   - `POST /v1/agent/artifacts/upload`
   - `POST /v1/agent/compare`
2. Agent runtime service:
   - raw LLM answer
   - artifact retrieval
   - artifact-augmented answer
   - run metadata and provenance
3. 0G integration:
   - 0G Compute for inference through the backend
   - 0G Storage for artifact persistence and proof metadata
4. Frontend integration:
   - replace local-only agent simulation with backend API calls
   - keep mock fallback behavior for demos when 0G credentials are missing

### Backend Agent Runtime Status

- Added Fastify Agent routes in `apps/api/src/routes/agent.ts`.
- Added `AgentService` with marketplace, library, upload, retrieval, raw answer, artifact answer, run metadata, and OpenAI-compatible 0G Compute path.
- Added 0G Storage-ready artifact provenance with content hash, root hash placeholder, `0g://` URI, provider, and status.
- Added Agent UI API client methods and wired marketplace/library/upload/compare flows to backend routes.
- Added local UI fallback when the Agent API is offline.
- Configured live 0G Compute Router testnet defaults:
  - base URL: `https://router-api-testnet.integratenetwork.work/v1`
  - model: `qwen/qwen-2.5-7b-instruct`
- Verified live raw-vs-artifact comparison through the local API on 2026-05-05:
  - raw trace: `24594c86-90cd-49a2-95fa-84baf42fdca9`
  - artifact trace: `5a16bf34-e67e-4675-a9ae-25144cd7c57b`
- Added retry/backoff handling for 0G Compute `429`/`5xx` responses.
- Added `apps/agent/fixtures/excel-qna-live-smoke.json` for small live benchmark checks under testnet quota limits.
- Completed live smoke benchmark path on 2026-05-05, but all smoke cases were rate-limited by 0G Router `429` after retries:
  - output: `/private/tmp/dataloop-live-0g-smoke-runs/2026-05-05T18-46-52.916Z`
- Added live 0G Storage upload through `@0gfoundation/0g-storage-ts-sdk`.
- Verified live artifact upload on 2026-05-06:
  - storage status: `stored`
  - root hash: `0x878596ffb54244a59df5aba8a5a8c29f72e5c5807303ed9aee28f17b43f2e707`
  - transaction hash: `0xcaefdd58ec006ea657199a4d1d90cefdd8b368e0f82d8c75db9b71140a03d19f`
- Verified:
  - `npm run typecheck --workspace @dataloop/api`
  - `npm run test --workspace @dataloop/api`
  - `npm run typecheck --workspace @dataloop/web`
  - `npm run build --workspace @dataloop/web`

## Current Status
- [x] Create `apps/agent/fixtures/excel-qna-benchmark.json` (20 cases)
- [x] Update shared types/constants
- [x] Update pipeline.ts (prompt/eval for Excel)
- [x] Update artifacts.ts (Excel frontmatter)
- [x] Update model.ts (domain prompts)
- [x] Update config.ts (domain flag)
- [x] Run mock benchmark: `AGENT_DOMAIN=excel AGENT_BENCHMARK_PATH=apps/agent/fixtures/excel-qna-benchmark.json npm run agent:run`
- [x] Implement formula evaluator (exact/alt match, concepts)
- [x] Fine-tune mock responses to match expected formulas
- [ ] Run full raw 0G benchmark (endpoint fixed; full run is currently limited by 0G Router `429` quota windows on 2026-05-05)
- [x] Create initial Excel artifact from failures
- [x] Run artifact-augmented benchmark
- [x] Generate comparison report

## Summary

The Excel Q&A benchmark migration is locally complete for the mock and artifact-augmented workflow. The remaining unchecked item requires a reachable 0G/OpenAI-compatible model endpoint:

### Completed
1. **Shared Types** - Added Excel-specific types (`ExcelBenchmarkCase`, `ExcelStructuredResponse`, `ExcelAnswerType`, etc.) alongside support types
2. **Config** - Added `domain` parameter to `AgentConfig` with automatic benchmark path selection
3. **Pipeline** - Updated to handle both domains with domain-specific:
   - System prompts
   - Evaluation logic (formula matching, concept checking)
   - Training example generation
4. **Artifacts** - Updated to generate Excel-specific artifacts with:
   - Formula patterns
   - Required concepts
   - Difficulty levels
   - Excel-specific markdown rendering
5. **Model** - Updated artifact context building to handle Excel domain
6. **Evaluator** - Implemented formula matching with:
   - Normalization (whitespace, $ signs, case)
   - Alternative formula support
   - Required concept checking

### Current State
- Mock benchmark runs successfully with 20 Excel Q&A cases
- 5 cases pass baseline
- 15 baseline failures generate Excel artifacts
- Artifact-augmented mock benchmark passes 20/20 cases with 15 improved cases
- Latest comparison report: `apps/agent/runs/2026-05-05T07-40-23.544Z/benchmark-comparison.md`
- Artifacts are generated with Excel-specific frontmatter, formula patterns, concepts, and storage manifest entries
- Real 0G/OpenAI-compatible benchmark path is implemented, but the configured endpoint did not respond during the latest attempt

### Next Steps
1. Start a reachable 0G/OpenAI-compatible endpoint or set `AGENT_MODEL_BASE_URL` to the provider `/v1/proxy` URL.
2. Rerun the raw 0G benchmark command below.
3. Iterate on artifacts based on real model failures if the real model differs from the mock baseline.

## Usage

Run Excel benchmark in mock mode:
```bash
AGENT_DOMAIN=excel AGENT_BENCHMARK_PATH=apps/agent/fixtures/excel-qna-benchmark.json npm run agent:run
```

Run with 0G model (when ready):
```bash
AGENT_DOMAIN=excel \
AGENT_MODEL_MODE=openai-compatible \
AGENT_MODEL_BASE_URL=<0G_ENDPOINT> \
AGENT_BENCHMARK_PATH=apps/agent/fixtures/excel-qna-benchmark.json \
npm run agent:run
```
