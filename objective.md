# DataLoop Objective

## Product Direction

DataLoop lets users create artifact-augmented agents. The agent runs on 0G Compute, while its knowledge, corrections, uploaded files, benchmark reports, and reusable artifact packs live on 0G Storage.

The core product idea is simple:

> Raw LLMs are inconsistent. DataLoop makes agents improve by installing artifacts. Artifacts are stored on 0G Storage, agents run through 0G Compute, and users can build a reusable library of agent capabilities.

For the hackathon demo, DataLoop should focus on showing the difference between a raw LLM answer and an artifact-augmented answer. The clearest demo path is a Spreadsheet Agent because the current benchmark already proves improvement from artifact usage.

## 0G Ecosystem Usage

### 0G Compute

Use 0G Compute Router for LLM inference from the backend.

The Router is the best fit because it is server-side friendly, OpenAI-compatible, and supports:

- `/v1/chat/completions`
- Streaming
- Tool calling, depending on model support
- JSON mode, depending on model support
- Provider routing
- Billing traces
- Optional TEE verification

The frontend should not call 0G Compute directly with API keys. Compute calls should go through backend agent routes so keys, provider settings, tracing, and artifact injection stay server-side.

### 0G Storage

Use 0G Storage as the durable artifact layer.

Store:

- Uploaded artifacts
- Marketplace artifact files
- User library manifests
- Benchmark reports
- Generated correction artifacts
- Training JSONL exports
- Agent run traces and result metadata

For private artifacts, use 0G Storage encryption. Public marketplace artifacts can be stored as public content with root hashes and metadata visible in the app.

### 0G Chain

Use 0G Chain later for registry and ownership features.

Good uses:

- Artifact registry
- Creator attribution
- Marketplace ownership
- Usage permissions
- Paid artifact packs
- Version commitments

This is a useful extension, but the hackathon MVP should prioritize 0G Compute and 0G Storage first.

### INFTs / Agent ID

Use INFTs or Agent ID as a roadmap feature for tokenized agents or transferable artifact libraries.

Potential uses:

- Tokenized agent ownership
- Transferable private artifact libraries
- Agent capability packs
- Creator monetization
- Licensed AI-as-a-service agents

This should be described as a future expansion unless a minimal registry integration is implemented.

### Fine-Tuning

0G fine-tuning is a stretch goal.

DataLoop already generates correction and training examples. These can be exported as JSONL and stored on 0G Storage. A later flow can submit that JSONL to 0G fine-tuning providers.

### Persistent Memory

Persistent Memory is listed as coming soon. Do not claim live integration. For now, DataLoop can simulate persistent agent memory through artifact libraries and stored run history.

## Agent Capabilities

DataLoop agents should support these capabilities.

### 1. Raw LLM vs Artifact-Augmented Answering

The UI should demonstrate one user question with two answer paths:

- Raw LLM: direct 0G Compute response without artifact context.
- With Artifacts: retrieve relevant artifacts from the user library, inject them into the prompt, and return a better grounded answer.

The user should be able to compare both responses side by side.

### 2. Artifact Retrieval

Agents should retrieve artifacts from the user library by:

- Domain
- Task pattern
- Question pattern
- Concepts
- Formula or answer pattern
- Examples
- Metadata

Example: if a user asks about `SUMIFS` with multiple conditions, the Spreadsheet Agent should retrieve the installed `SUMIFS` artifact before answering.

### 3. Artifact Creation

Users should be able to create artifacts from:

- Uploaded files
- Markdown notes
- Text files
- JSON files
- CSV notes
- Formula examples
- Support documentation
- Playbooks
- Failed answers
- Corrected answers
- Benchmark cases

Artifacts should have structured metadata:

- Artifact ID
- Title
- Domain
- Question pattern
- Answer pattern
- Concepts
- Formula pattern, when relevant
- Examples
- Tests
- Owner
- Version
- Visibility
- 0G root hash
- Transaction hash, if available

### 4. Artifact Marketplace

The platform should provide a marketplace where users can discover and install public artifact packs.

Marketplace artifacts should show:

- Title
- Domain
- Description
- Concepts
- Version
- Creator
- Usage count
- Benchmark score
- Last updated date
- Storage proof or 0G root hash

Example marketplace packs:

- Excel formulas
- SQL analytics
- Customer support playbooks
- Solidity audit patterns
- DeFi research templates
- Data cleaning recipes

### 5. Artifact Library

Each user should have a personal artifact library.

If an artifact is added to the library, the user can directly use it with an agent. If no relevant artifact exists, the system can either answer in raw mode or recommend marketplace artifacts to install.

The library should support:

- Add from marketplace
- Upload custom artifact
- Remove artifact
- Use artifact with agent
- View artifact details
- See storage proof

### 6. Evaluation and Self-Improvement

Agents should be benchmarkable.

The platform should track:

- Raw LLM score
- Artifact-augmented score
- Improved cases
- Regressions
- Artifacts generated from failures
- Training examples generated

Failed or corrected answers should be convertible into new artifacts.

### 7. Tool Use

Agents should eventually use domain tools.

Initial tools:

- Excel/formula validator
- CSV/table analyzer
- Document retriever
- JSON/schema formatter

0G Compute Router supports tool calling when the selected model supports it, so tool-enabled agents are a natural extension.

### 8. Provenance and Trust

Every artifact and agent run should carry provenance metadata:

- Artifact source
- 0G root hash
- Version
- Creator
- Install date
- Retrieval reason
- Compute provider trace, when available
- Cost trace, when available
- TEE verification status, when requested

This makes DataLoop more than a wrapper around a model. It becomes an auditable agent capability platform.

## Agent Types Users Can Create

The platform should avoid positioning itself as a generic chatbot builder. The stronger position is that users create domain agents whose behavior improves through installable, verifiable artifacts.

### 1. Spreadsheet Agent

Answers Excel and Google Sheets questions.

Capabilities:

- Formula help
- Formula correction
- Range and reference debugging
- Lookup guidance
- Pivot and summary logic
- Common spreadsheet mistakes

This should be the primary hackathon demo agent.

### 2. Data Analyst Agent

Answers CSV, SQL, KPI, dashboard, and reporting questions.

Artifacts can include:

- Metric definitions
- Schema docs
- Query examples
- Dashboard rules
- Data cleaning recipes
- Business glossary terms

### 3. Support Playbook Agent

Answers customer or internal support questions.

Artifacts can include:

- Support documentation
- Solved tickets
- Escalation rules
- Standard operating procedures
- Troubleshooting flows

### 4. Research Agent

Uses curated research artifacts, notes, summaries, and source packs.

This is useful later, but needs strong citation handling and source provenance.

### 5. Code or Smart Contract Helper

Uses audit patterns, bug examples, framework docs, and review checklists.

This is a strong Web3 demo angle, but the platform should avoid overclaiming correctness. It should present outputs as assistance, not guaranteed audits.

### 6. Personal Workflow Agent

Uses private user artifacts such as templates, preferences, rules, and procedures.

This is a good path for private artifact libraries and eventually Agent ID or INFT ownership.

## What DataLoop Provides

### Agent Builder

DataLoop should let users:

- Choose an agent type
- Choose a model or provider strategy
- Choose allowed tools
- Attach artifact packs
- Set privacy level
- Configure whether marketplace artifacts can be recommended

### Artifact Infrastructure

DataLoop should provide:

- Artifact upload
- Artifact parsing
- Artifact metadata extraction
- Artifact indexing
- Artifact versioning
- Artifact retrieval
- Artifact evaluation
- Artifact storage on 0G Storage

### Marketplace

DataLoop should provide a public artifact marketplace where users can:

- Browse artifacts
- View quality metrics
- Inspect metadata
- Add artifacts to their library
- Use artifacts with an agent

Later marketplace capabilities:

- Paid artifacts
- Creator royalties
- Artifact licensing
- Ownership transfer
- Team libraries

### Runtime

The agent runtime should:

1. Receive the user question.
2. Run a raw 0G Compute call.
3. Retrieve matching artifacts from the user library.
4. Run an artifact-augmented 0G Compute call.
5. Return side-by-side answers.
6. Store run metadata and traces.
7. Offer correction or artifact creation if the answer is wrong.

### Evaluation Layer

DataLoop should provide evaluation for every agent and artifact pack:

- Benchmark case management
- Raw vs artifact comparison
- Improvement tracking
- Regression tracking
- Generated artifact tracking
- Training JSONL export

### 0G Integration Layer

DataLoop should wrap 0G integrations behind backend services:

- 0G Compute service for model calls
- 0G Storage service for artifact persistence
- 0G Storage download and proof verification
- Optional 0G Chain registry service
- Optional INFT or Agent ID service

## Hackathon MVP

The strongest MVP scope is:

1. Spreadsheet Agent demo.
2. User asks a spreadsheet question.
3. UI shows two options: Raw LLM and With Artifacts.
4. Raw answer uses 0G Compute.
5. Artifact answer retrieves from the user artifact library and uses 0G Compute.
6. Marketplace lets user install artifacts.
7. Upload lets user add custom artifacts.
8. Artifacts are stored on 0G Storage.
9. The run page shows answer comparison and artifact provenance.

This demonstrates that 0G is central to the product:

- 0G Compute powers inference.
- 0G Storage stores artifacts and user knowledge.
- DataLoop provides the agent builder, artifact marketplace, retrieval, evaluation, and UI.

## Source References

- 0G Compute Router: https://docs.0g.ai/developer-hub/building-on-0g/compute-network/router/overview
- 0G Chat Completions: https://docs.0g.ai/developer-hub/building-on-0g/compute-network/router/features/chat-completions
- 0G Storage SDK: https://docs.0g.ai/developer-hub/building-on-0g/storage/sdk
- 0G INFTs: https://docs.0g.ai/developer-hub/building-on-0g/inft/inft-overview
- 0G Fine-Tuning: https://docs.0g.ai/developer-hub/building-on-0g/compute-network/fine-tuning
