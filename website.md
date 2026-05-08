# DataLoop Website — Comprehensive Structure & Explanation

## Overview

The website (`apps/web`) is a single-page React application built with **Vite + TypeScript**. It serves as the primary user-facing frontend for the DataLoop platform, providing a glassmorphic dark-mode workspace console that lets users interact with on-chain task records, dataset versioning, and an AI agent comparison interface — all backed by the DataLoop Fastify API.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite 5 |
| Styling | Vanilla CSS (custom design system) |
| Wallet | Injected EVM provider (`window.ethereum`) |
| API communication | Fetch-based typed client (`lib/api.ts`) |
| Shared types | `@dataloop/shared` internal package |
| Target network | 0G-Galileo-Testnet (Chain ID 16602) |

---

## File Structure

```
apps/web/
├── index.html               # Vite HTML shell
├── vite.config.ts           # Vite config (React plugin)
├── tsconfig.json            # TypeScript config
├── package.json             # Dependencies and scripts
├── .env.example             # Environment variable template
└── src/
    ├── main.tsx             # React DOM root mount
    ├── App.tsx              # Entire application (2448 lines)
    ├── styles.css           # Complete design system (1056 lines)
    ├── env.d.ts             # Vite env type declarations
    ├── components/
    │   ├── Panel.tsx        # Reusable glassmorphic panel container
    │   └── StatusNotice.tsx # Inline status/feedback message
    └── lib/
        ├── api.ts           # Typed REST API client (353 lines)
        ├── validation.ts    # Form validation utilities
        └── wallet/
            ├── config.ts    # Wallet + chain configuration
            └── provider.ts  # EVM wallet provider abstraction
```

---

## Environment Variables

Set in `.env` or `.env.example` at the web app root:

| Variable | Purpose | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3001` |
| `VITE_CHAIN_ID` | Target EVM chain ID | `16602` |
| `VITE_CHAIN_NAME` | Human-readable chain name | `0G-Galileo-Testnet` |
| `VITE_RPC_URL` | Chain RPC endpoint | `https://evmrpc-testnet.0g.ai` |
| `VITE_BLOCK_EXPLORER_URL` | Block explorer URL | `https://chainscan-galileo.0g.ai` |

---

## Design System (`styles.css`)

The CSS is a standalone, hand-authored design system with no external CSS framework. It uses CSS custom properties (design tokens) and builds a complete set of components.

### Design Tokens (`--` custom properties)

```
--bg-deep          #0a0c10        Deep background
--bg-mid           #11161f        Mid background
--surface          rgba(20,24,33,0.72)   Glassmorphic surface
--border           rgba(255,255,255,0.1) Subtle borders
--accent-indigo    #6366f1        Primary accent (indigo)
--accent-cyan      #22d3ee        Secondary accent (cyan)
--success          #10b981        Green success state
--error            #f43f5e        Red error state
--text-primary     #ffffff        Primary text
--text-secondary   #94a3b8        Muted descriptive text
--text-muted       #64748b        Faint auxiliary text
```

### Global Background

A layered radial gradient creates atmospheric depth — indigo glow top-left, cyan glow top-right, green glow bottom-center — overlaid on a dark `#0f131b → #0a0c10` linear gradient. A subtle 88×88px CSS grid pattern is applied as a `::before` pseudo-element on `<body>` with a radial mask for a "console grid" aesthetic.

### Key CSS Components

| Class | Description |
|---|---|
| `.topbar` | Fixed floating pill-shaped navigation bar |
| `.brand-mark` | Indigo-to-cyan gradient logo block with glowing decorations |
| `.segmented-control` / `.segment` | Workspace switcher pill tabs |
| `.network-pill` / `.account-pill` | Status indicators with live/alert dot |
| `.app-shell` | Main content area with max-width constraint |
| `.hero-shell` | Two-column hero layout (copy block + stat cards) |
| `.hero-copy-block` | Glassmorphic hero card with radial glow accents |
| `.meta-card` | Stat display card (label + value) |
| `.workspace-shell` | Workspace area container |
| `.workspace-section-nav` | Inner tab pill navigation |
| `.panel` | Primary content panel with blur/backdrop |
| `.record-card` / `.nested-card` | Data record display cards |
| `.detail-grid` / `.detail` | Label-value metadata grid |
| `.button-primary` | Indigo-to-cyan gradient CTA button |
| `.button-secondary` | Ghost/transparent secondary button |
| `.agent-answer-card` | Agent answer output block |
| `.artifact-card` | Selectable artifact item in the marketplace |
| `.formula-block` | Monospace dark code block for formula display |
| `.confidence-pill` / `.library-badge` | Small status badges |
| `.empty-state` | Decorative empty content placeholder |
| `.loading-state` | Shimmer skeleton loading animation |
| `.status-notice` | Contextual feedback notices (neutral / success / error) |

### Animations

- **`shimmer`** — infinite background-position sweep for skeleton loading bars
- **`wallet-glow`** — pulsing cyan box-shadow on connected wallet button (2.4s ease-in-out)

### Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| `≤ 1240px` | Topbar stacks vertically; all multi-column grids collapse to 1-column |
| `≤ 900px` | Workspace heading, record headers, stat grids, and agent controls all stack |
| `≤ 760px` | Full mobile layout; topbar side insets reduce; all buttons become full-width |

---

## Application Architecture (`App.tsx`)

The entire application is a single `App` component (no router). All workspaces and panels are rendered conditionally based on state. The component is ~2448 lines and manages state, side effects, API calls, form handling, and rendering in one monolithic file with inline sub-components.

### State Model

The top-level `App` component manages the following key state buckets:

#### Workspace Navigation
```typescript
activeWorkspace: "tasks" | "datasets" | "agent"
activeTaskSection: "details" | "create" | "correction" | "session"
activeDatasetSection: "latest" | "register" | "history" | "session"
activeAgentSection: "ask" | "marketplace" | "library" | "upload"
```

#### Wallet State
```typescript
walletAccount: string | null
walletChainIdHex: string | null
isConnectingWallet: boolean
```

#### Tasks State
```typescript
taskForm: TaskFormState             // taskId, metadataUri, metadataHash, stakeAmountWei
correctionForm: CorrectionFormState
selectedTask: TaskResource | null
selectedCorrections: CorrectionResource[]
recentTaskIds: string[]             // Persisted in localStorage
```

#### Datasets State
```typescript
datasetForm: DatasetFormState       // datasetId, metadataUri, metadataHash, entries[]
datasetHistory: DatasetHistoryResult | null
latestDatasetVersion: LatestDatasetVersionResult | null
recentDatasetIds: string[]          // Persisted in localStorage
```

#### Agent State
```typescript
agentQuestion: string
agentAnswerMode: "raw" | "artifact"
marketplaceArtifacts: DemoArtifact[]
agentLibraryIds: string[]           // Persisted in localStorage
uploadedArtifacts: DemoArtifact[]   // Persisted in localStorage
backendAgentComparison: BackendAgentComparisonState | null
```

### Persistence (localStorage)

| Key | Content |
|---|---|
| `dataloop.week1.recentTasks` | Array of recently viewed task IDs |
| `dataloop.week1.recentDatasets` | Array of recently viewed dataset IDs |
| `dataloop.agent.artifactLibrary` | Array of library artifact IDs |
| `dataloop.agent.uploadedArtifacts` | Array of serialized uploaded `DemoArtifact` objects |

### Side Effects (`useEffect`)

1. **Wallet sync** — On mount, reads existing wallet accounts and chain ID from the injected provider; subscribes to `accountsChanged` and `chainChanged` events.
2. **Agent workspace bootstrap** — On mount, calls `GET /v1/agent/marketplace/artifacts` and `GET /v1/agent/library` in parallel to populate the marketplace and library from the backend. Falls back gracefully to the built-in `MARKETPLACE_ARTIFACTS` array if the API is unavailable.
3. **localStorage sync effects** — Four separate effects sync `recentTaskIds`, `recentDatasetIds`, `agentLibraryIds`, and `uploadedArtifacts` to localStorage whenever they change.

---

## Workspaces

### 1. Task Workspace

The **Task** workspace has four inner sections accessible via the section pill nav:

#### Task Details (Read Flow)
- Input field to enter a task ID (`bytes32` hex)
- **Load** button → calls `GET /v1/tasks/:taskId` + `GET /v1/tasks/:taskId/corrections`
- **Recent Tasks** list from localStorage for quick reloads
- Renders a `record-card` with:
  - Storage ID, creator address, chain creator address, creation timestamp
  - Metadata URI and hash
  - Transaction hash and block number from on-chain reference
  - Nested corrections list showing each correction's submitter, metadata, and transaction

#### Create Task (Write Flow)
- **Task ID** field with a `Generate` button that creates a random `bytes32` hex string
- Metadata URI field (`ipfs://...` placeholder)
- Metadata Hash field (`0x...` bytes32)
- Stake Amount (wei) field — optional whole-number string
- On submit: calls `POST /v1/tasks` with creator wallet address; navigates to Task Details after success

#### Correction (Write Flow)
- Task ID field (pre-filled from last loaded/created task)
- Correction Metadata URI and Hash fields
- Stake Amount (wei) — optional
- On submit: calls `POST /v1/tasks/:taskId/corrections`; navigates to Task Details for that task

#### Session
- Shared wallet/session status panel showing: injected provider status, connected account, current chain ID, configured network
- Connect / Reconnect button
- If chain mismatch: shows a Switch Network inline action

---

### 2. Dataset Workspace

The **Dataset** workspace has four inner sections:

#### Latest View (Read Flow)
- Dataset ID input + **Load Latest** button → `GET /v1/datasets/:datasetId/latest`
- Renders latest version details: version number, storage ID, registered-by address, chain registrar, timestamp, immutable ref, transaction hash
- Nested `DatasetEntries` list showing each entry's source type (TASK/CORRECTION), position, task/correction ID, and metadata

#### History (Read Flow)
- Dataset ID input + **Load History** button → `GET /v1/datasets/:datasetId/history`
- Renders all versions in a nested card list: version number, registration timestamp, immutable ref, registered-by, metadata hash, entry count

#### Register (Write Flow)
- Dataset ID with `Generate` button
- Dataset Metadata URI, Hash, Immutable Reference fields
- Dynamic **Dataset Entries** sub-form: each entry has a Source Type dropdown (`TASK` / `CORRECTION`), a reference ID field, and optional metadata override fields
- **Add Entry** button adds more entries; each entry can be individually removed
- On submit: calls `POST /v1/datasets/:datasetId/versions`

#### Session
- Same shared session/wallet panel as the Task workspace

---

### 3. Agent Workspace

The **Agent** workspace is the primary demo surface. It has four inner sections:

#### Ask Agent (Main Demo)
A two-column layout:
- **Left panel — "Ask Excel Agent":**
  - `<textarea>` for the user's question
  - Quick question grid: 4 pre-built question buttons from the marketplace artifacts
  - Answer mode toggle: **Raw LLM** vs **With Artifacts** (segmented pill control)
  - **Run Comparison** button → calls `POST /v1/agent/compare`
- **Right panel — Selected Output:**
  - Shows the active answer (raw or artifact-backed) in an `AgentAnswerCard`:
    - Label ("Raw LLM" / "With Artifacts"), matched artifact title, confidence percentage pill
    - Formula in a monospace `formula-block`
    - Explanation text
    - Footer: artifact count and short artifact ID, or provider mode and trace ID
  - Action button: View Library or Add Artifact based on whether artifacts are in context
- **Full-width comparison row:**
  - Two `AgentAnswerCard` components side by side: Raw LLM vs With Artifacts

**Local fallback**: When the backend is unreachable, the app computes a local comparison using a token-overlap scoring algorithm (`findBestArtifact`) that tokenizes the question and matches against artifact titles, question patterns, formula patterns, concepts, and tags (minimum 2-token overlap required).

#### Marketplace
A two-column layout:
- **Left panel — "Artifact Marketplace":**
  - Scrollable list of all artifacts (marketplace + uploaded) as selectable `artifact-card` buttons
  - Each card shows: difficulty/source label, In Library / Marketplace badge, title, formula or answer preview
  - Active selection highlighted with a cyan border
  - **Add Selected** action button to add to library
- **Right panel — "Selection" (Artifact Detail):**
  - Shows details of the selected artifact: formula, concepts, difficulty, source, storage status, root hash, storage transaction
  - Answer block
  - **Use with Agent** button — sets the agent question to the artifact's question pattern, adds the artifact to the library, and navigates to the Ask Agent view

**Built-in marketplace artifacts (6 items):**
| ID | Title | Difficulty |
|---|---|---|
| `sumifs-multi-condition` | SUMIFS with multiple criteria | medium |
| `xlookup-basics` | Basic XLOOKUP lookup | easy |
| `filter-dynamic-array` | FILTER spilled array | medium |
| `absolute-ref-mistake` | Fix absolute reference error | medium |
| `vlookup-limitations` | When not to use VLOOKUP | easy |
| `text-numbers-sum` | Sum text-formatted numbers | easy |

#### Library
- Grid of all currently installed artifacts from the user's library
- Each `artifact-library-card` shows the title, source type, compact details, and two actions: **Use with Agent** and **Remove**
- Empty state if the library is empty, with a link to Browse Marketplace

#### Upload
- **Artifact File** file picker (`.md`, `.txt`, `.json`) — auto-populates title and answer from file content
- **Title** field
- **Question Pattern** textarea
- **Formula Pattern** input
- **Concepts** input (comma-separated)
- **Answer** textarea
- On submit: calls `POST /v1/agent/artifacts/upload`; on success, adds to library and redirects to Library section. Falls back to local storage if the backend is unavailable.

---

## Components

### `Panel` (`components/Panel.tsx`)
A structural wrapper rendered as a `<section>` with:
- `eyebrow` — optional uppercase category label
- `title` — panel heading (`<h2>`)
- `action` — optional right-aligned action slot (for header buttons)
- `children` — panel body content

Applies the `.panel`, `.panel-header`, `.panel-body` CSS classes with glassmorphic blur and border styling.

### `StatusNotice` (`components/StatusNotice.tsx`)
A contextual feedback component with three visual tones:
- `neutral` — grey border, light blue text
- `success` — green border, light green text
- `error` — red border, light pink text

### Inline Sub-Components (defined in `App.tsx`)

| Component | Purpose |
|---|---|
| `WorkspaceToggle` | Three-segment pill switcher (Tasks / Datasets / Agent) in the topbar |
| `WorkspaceSectionNav` | Generic pill tab nav for sub-sections within a workspace |
| `MetricCard` | Small stat card with label and value; supports mono font for IDs |
| `AgentAnswerCard` | Full answer display block with formula, explanation, confidence, and provider trace |
| `ArtifactDetail` | Detail view of an artifact (formula, concepts, source, storage proof) |
| `Field` | Form label wrapper with optional helper text |
| `Detail` | Label + value display cell in a grid; supports mono font |
| `RecordHeader` | Title + subtitle header inside record cards |
| `EmptyState` | Decorative concentric-circle art + message for empty content |
| `LoadingState` | Shimmer skeleton (wide bar + narrow bar + 3-chip grid) with message |
| `RecentIdList` | Clickable list of localStorage-stored IDs for quick reload |
| `DatasetEntries` | Nested list of dataset version entries with source type, position, and metadata |

---

## API Client (`lib/api.ts`)

All communication goes through a typed `fetch` wrapper. The base URL is read from `VITE_API_BASE_URL` (defaults to `http://localhost:3001`).

### Error Handling
Errors are thrown as `ApiClientError` instances with `statusCode`, `code`, and `message`. The UI maps known error codes to human-readable messages:

| Code | User message |
|---|---|
| `TASK_NOT_FOUND` | Task ID was not found. Create the task first. |
| `INVALID_REQUEST` | Malformed request. Check address format and required fields. |
| `RELATED_RECORD_NOT_FOUND` | Storage reference is missing. |
| `DATASET_NOT_FOUND` | Dataset ID was not found. |
| `ARTIFACT_NOT_FOUND` | Artifact not found in marketplace or upload set. |
| `ARTIFACT_NOT_IN_LIBRARY` | Artifact is not currently installed in the library. |
| `INVALID_AGENT_QUESTION` | Enter a question before running the agent. |
| `INVALID_AGENT_ARTIFACT` | Uploaded artifacts need a title and answer. |

### API Endpoints Used by the Frontend

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/v1/tasks` | Create a task |
| `POST` | `/v1/tasks/:taskId/corrections` | Submit a correction |
| `GET` | `/v1/tasks/:taskId` | Fetch a task record |
| `GET` | `/v1/tasks/:taskId/corrections` | Fetch corrections for a task |
| `POST` | `/v1/datasets/:datasetId/versions` | Register a dataset version |
| `GET` | `/v1/datasets/:datasetId/history` | Fetch full version history |
| `GET` | `/v1/datasets/:datasetId/latest` | Fetch the latest version |
| `GET` | `/v1/agent/marketplace/artifacts` | Fetch marketplace artifacts |
| `GET` | `/v1/agent/library` | Fetch user's artifact library |
| `POST` | `/v1/agent/library/artifacts` | Add artifact to library |
| `DELETE` | `/v1/agent/library/artifacts/:id` | Remove artifact from library |
| `POST` | `/v1/agent/artifacts/upload` | Upload a custom artifact |
| `POST` | `/v1/agent/compare` | Run raw vs artifact-augmented comparison |

---

## Wallet Integration (`lib/wallet/`)

### `config.ts`
Exports `getWalletConfig()` which reads VITE env vars and returns a `WalletClientConfig` object:
- `chainId`, `chainName`, `rpcUrl`, `blockExplorerUrl`, `nativeCurrency`
- Defaults target the **0G-Galileo-Testnet** (Chain ID 16602)

### `provider.ts`
A thin, dependency-free abstraction over `window.ethereum`:

| Function | Behavior |
|---|---|
| `getInjectedWallet()` | Returns `window.ethereum` or `null` |
| `requestWalletAccounts()` | Calls `eth_requestAccounts` |
| `getWalletAccounts()` | Calls `eth_accounts` (silent read) |
| `getWalletChainId()` | Calls `eth_chainId` |
| `switchOrAddWalletChain()` | Tries `wallet_switchEthereumChain`; catches error 4902 and falls back to `wallet_addEthereumChain` |
| `parseHexChainId()` | Converts `"0x..."` hex string to integer |

---

## Validation (`lib/validation.ts`)

Client-side form validation utilities used before any API call:

| Function | Validates |
|---|---|
| `isBytes32(v)` | String is a valid `0x`-prefixed 32-byte hex |
| `isAddress(v)` | String is a valid 20-byte EVM address |
| `isUintString(v)` | String is a whole non-negative integer (for wei amounts) |
| `hasMetadataReference(uri, hash)` | At least one of URI or hash is non-empty |
| `generateBytes32Hex()` | Generates a random `bytes32` for the task/dataset ID fields |

---

## Page Layout Hierarchy

```
<header class="topbar">          ← Fixed floating pill nav
  Brand lockup + WorkspaceToggle + Network pill + Account pill + Connect button

<main class="app-shell">         ← Max-width constrained container
  <section class="hero-shell">   ← Two-column hero
    Hero copy block              ← Title, description, primary action buttons
    Hero meta column             ← API endpoint card + 4 stat metric cards

  [Network mismatch banner]      ← Conditionally shown when chain ID doesn't match

  <section class="workspace-shell">
    Workspace heading            ← Current workspace label, title, description + summary metrics
    WorkspaceSectionNav          ← Inner section pill tabs
    [Active section panel]       ← Conditional Panel or agent-grid content
```

---

## Data Flow Summary

```
User action
  → Form validation (lib/validation.ts)
  → API call (lib/api.ts → fetch → Fastify API)
  → Success: update state → re-render + persist to localStorage
  → Error: ApiClientError → mapped user message → StatusNotice

Wallet action
  → lib/wallet/provider.ts → window.ethereum RPC calls
  → State update: walletAccount, walletChainIdHex
  → Derived: hasWalletConnection, chainMismatch → UI gating

Agent comparison
  → POST /v1/agent/compare → BackendAgentComparisonState
  → Fallback: local token-overlap scoring (findBestArtifact)
  → Renders AgentAnswerCard for raw and augmented paths
```

---

## Key UX Patterns

- **Graceful degradation** — Every API call has a try/catch. When the backend is unavailable, the UI falls back to local state and shows a `neutral` notice rather than a hard error.
- **Optimistic library updates** — Adding or removing artifacts from the library updates local state immediately, then syncs with the backend asynchronously.
- **Recent ID memory** — Task and dataset IDs loaded during a session are stored in localStorage and shown as a clickable list for instant reload.
- **Chain mismatch protection** — Write operations (task creation, corrections, dataset registration) are gated behind wallet connection. A banner appears when the wallet's chain does not match the configured network, with a one-click Switch Network action.
- **Local agent fallback** — If `POST /v1/agent/compare` fails, the UI builds a synthetic comparison locally using token overlap scoring against the library, maintaining a useful demo flow even without a live backend.
