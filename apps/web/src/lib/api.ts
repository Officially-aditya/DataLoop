const DEFAULT_API_BASE_URL = "http://localhost:3001";

export interface ApiErrorPayload {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export class ApiClientError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

export interface TaskResource {
  storageId: string;
  taskId: string;
  creatorAddress: string;
  chainCreatorAddress: string | null;
  createdAt: string;
  metadataUri: string | null;
  metadataHash: string | null;
  chain: ChainReference;
}

export interface CorrectionResource {
  storageId: string;
  correctionId: string;
  taskId: string;
  submitterAddress: string;
  chainSubmitterAddress: string | null;
  submittedAt: string;
  metadataUri: string | null;
  metadataHash: string | null;
  chain: ChainReference;
}

export interface DatasetEntryResource {
  id: string;
  datasetVersionId: string;
  sourceType: "TASK" | "CORRECTION";
  position: number;
  taskId: string | null;
  correctionId: string | null;
  metadataUri: string | null;
  metadataHash: string | null;
  insertedAt: string;
}

export interface DatasetSummaryResource {
  storageId: string;
  datasetId: string;
  createdBy: string;
  createdAt: string;
  metadataUri: string | null;
  metadataHash: string | null;
  latestVersionNumber: number;
}

export interface DatasetVersionResource {
  storageId: string;
  datasetId: string;
  versionNumber: number;
  registeredBy: string;
  chainRegistrarAddress: string | null;
  registeredAt: string;
  metadataUri: string | null;
  metadataHash: string | null;
  immutableRef: string;
  entries: DatasetEntryResource[];
  chain: ChainReference;
}

export interface ChainReference {
  chainId: number | null;
  contractAddress: string | null;
  transactionHash: string | null;
  blockNumber: string | null;
  logIndex: number | null;
}

export interface CreateTaskPayload {
  taskId: string;
  creatorAddress: string;
  metadataUri?: string;
  metadataHash?: string;
  stakeAmountWei?: string;
}

export interface SubmitCorrectionPayload {
  submitterAddress: string;
  metadataUri?: string;
  metadataHash?: string;
  stakeAmountWei?: string;
}

export type DatasetEntryPayload =
  | {
      sourceType: "TASK";
      taskId: string;
      metadataUri?: string;
      metadataHash?: string;
    }
  | {
      sourceType: "CORRECTION";
      correctionId: string;
      metadataUri?: string;
      metadataHash?: string;
    };

export interface RegisterDatasetVersionPayload {
  registeredBy: string;
  metadataUri?: string;
  metadataHash?: string;
  immutableRef?: string;
  entries: DatasetEntryPayload[];
}

export interface CreateTaskResult {
  task: TaskResource;
  contractTaskId: string;
  stakeId: string | null;
}

export interface SubmitCorrectionResult {
  correction: CorrectionResource;
  stakeId: string | null;
}

export interface TaskCorrectionsResult {
  task: TaskResource;
  corrections: CorrectionResource[];
}

export interface DatasetHistoryResult {
  dataset: DatasetSummaryResource;
  versions: DatasetVersionResource[];
}

export interface LatestDatasetVersionResult {
  dataset: DatasetSummaryResource;
  version: DatasetVersionResource;
}

export type AgentArtifactDifficulty = "easy" | "medium" | "hard";
export type AgentArtifactSource = "marketplace" | "upload";
export type AgentProviderMode = "mock" | "0g-compute";

export interface AgentArtifactStorageProof {
  provider: "0G_STORAGE";
  status: "prepared" | "stored" | "unavailable";
  contentHash: string;
  rootHash: string | null;
  transactionHash: string | null;
  uri: string | null;
  network: "testnet" | "mainnet" | null;
  indexerUrl: string | null;
  uploadedAt: string | null;
  errorMessage: string | null;
}

export interface AgentArtifactResource {
  id: string;
  title: string;
  domain: "excel";
  difficulty: AgentArtifactDifficulty;
  tags: string[];
  questionPattern: string;
  formulaPattern: string;
  concepts: string[];
  answer: string;
  rawFormula: string | null;
  rawAnswer: string;
  source: AgentArtifactSource;
  creator: string;
  version: string;
  usageCount: number;
  benchmarkScore: number | null;
  createdAt: string;
  updatedAt: string;
  storage: AgentArtifactStorageProof;
}

export interface AgentProviderStatus {
  mode: AgentProviderMode;
  modelName: string;
  baseUrl: string | null;
  traceId: string | null;
  teeVerificationRequested: boolean;
  teeVerified: boolean | null;
  errorMessage: string | null;
}

export interface AgentAnswerResource {
  label: "Raw LLM" | "With Artifacts";
  formula: string;
  explanation: string;
  confidence: number;
  artifactIds: string[];
  matchedArtifactTitle: string;
  provider: AgentProviderStatus;
}

export interface AgentRunResource {
  id: string;
  createdAt: string;
  question: string;
  retrievedArtifactIds: string[];
  storageProvider: "0G_STORAGE";
  rawProvider: AgentProviderStatus;
  augmentedProvider: AgentProviderStatus;
}

export interface AgentComparisonResult {
  raw: AgentAnswerResource;
  augmented: AgentAnswerResource;
  retrievedArtifacts: AgentArtifactResource[];
  run: AgentRunResource;
}

export interface AgentArtifactListResult {
  artifacts: AgentArtifactResource[];
}

export interface AgentLibraryMutationResult {
  artifact: AgentArtifactResource;
  library: AgentArtifactResource[];
}

export interface AgentLibraryRemoveResult {
  artifactId: string;
  removed: boolean;
  library: AgentArtifactResource[];
}

export interface UploadAgentArtifactPayload {
  title: string;
  questionPattern?: string;
  formulaPattern?: string;
  concepts?: string[];
  answer: string;
}

export function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL;
}

export async function createTask(payload: CreateTaskPayload) {
  return request<CreateTaskResult>("/v1/tasks", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function submitCorrection(taskId: string, payload: SubmitCorrectionPayload) {
  return request<SubmitCorrectionResult>(`/v1/tasks/${taskId}/corrections`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function registerDatasetVersion(
  datasetId: string,
  payload: RegisterDatasetVersionPayload
) {
  return request<LatestDatasetVersionResult>(`/v1/datasets/${datasetId}/versions`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function getTask(taskId: string) {
  return request<TaskResource>(`/v1/tasks/${taskId}`);
}

export async function getTaskCorrections(taskId: string) {
  return request<TaskCorrectionsResult>(`/v1/tasks/${taskId}/corrections`);
}

export async function getDatasetHistory(datasetId: string) {
  return request<DatasetHistoryResult>(`/v1/datasets/${datasetId}/history`);
}

export async function getLatestDatasetVersion(datasetId: string) {
  return request<LatestDatasetVersionResult>(`/v1/datasets/${datasetId}/latest`);
}

export async function getAgentMarketplaceArtifacts() {
  return request<AgentArtifactListResult>("/v1/agent/marketplace/artifacts");
}

export async function getAgentLibrary() {
  return request<AgentArtifactListResult>("/v1/agent/library");
}

export async function addAgentArtifactToLibrary(artifactId: string) {
  return request<AgentLibraryMutationResult>("/v1/agent/library/artifacts", {
    method: "POST",
    body: JSON.stringify({ artifactId })
  });
}

export async function removeAgentArtifactFromLibrary(artifactId: string) {
  return request<AgentLibraryRemoveResult>(`/v1/agent/library/artifacts/${artifactId}`, {
    method: "DELETE"
  });
}

export async function uploadAgentArtifact(payload: UploadAgentArtifactPayload) {
  return request<AgentLibraryMutationResult>("/v1/agent/artifacts/upload", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function compareAgentQuestion(question: string) {
  return request<AgentComparisonResult>("/v1/agent/compare", {
    method: "POST",
    body: JSON.stringify({ question })
  });
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...init
  });

  const payload = (await response.json()) as { data?: T } | ApiErrorPayload;

  if (!response.ok) {
    const errorPayload = payload as ApiErrorPayload;
    throw new ApiClientError(
      response.status,
      errorPayload.error?.code ?? "API_REQUEST_FAILED",
      errorPayload.error?.message ?? "Request failed",
      errorPayload.error?.details
    );
  }

  return (payload as { data: T }).data;
}
