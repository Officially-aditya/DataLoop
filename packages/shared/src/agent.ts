export const SUPPORT_CATEGORIES = [
  "NETWORK_CONFIGURATION",
  "INSUFFICIENT_FUNDS",
  "TRANSACTION_STUCK",
  "SCAM_RISK",
  "WALLET_CONNECTION",
  "CONTRACT_ERROR"
] as const;

export const SUPPORT_SEVERITIES = ["low", "medium", "high", "critical"] as const;

export type SupportCategory = (typeof SUPPORT_CATEGORIES)[number];
export type SupportSeverity = (typeof SUPPORT_SEVERITIES)[number];

export interface AgentStructuredResponse {
  category: SupportCategory;
  severity: SupportSeverity;
  requiresHuman: boolean;
  summary: string;
  suggestedResolution: string;
  confidence: number;
}

export interface AgentBenchmarkCase {
  id: string;
  title: string;
  userPrompt: string;
  expected: AgentStructuredResponse;
  mockResponse: string;
}

export type AgentFailureReasonCode =
  | "INVALID_JSON"
  | "INVALID_SCHEMA"
  | "LOW_CONFIDENCE"
  | "CATEGORY_MISMATCH"
  | "SEVERITY_MISMATCH"
  | "HUMAN_REVIEW_MISMATCH";

export interface AgentEvaluationIssue {
  code: AgentFailureReasonCode;
  message: string;
}

export interface AgentEvaluationResult {
  passed: boolean;
  issues: AgentEvaluationIssue[];
}

export interface AgentTrainingExample {
  messages: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }>;
  metadata: {
    benchmarkCaseId: string;
    benchmarkTitle: string;
    failureCodes: AgentFailureReasonCode[];
  };
}

export interface AgentArtifactProvenance {
  sourceRunId: string;
  benchmarkCaseId: string;
  failureCodes: AgentFailureReasonCode[];
  generatedAt: string;
}

export interface AgentArtifactStorage {
  contentHash: string;
  artifactUri: string | null;
}

export interface AgentArtifactFrontmatter {
  artifactId: string;
  benchmarkCaseId: string;
  title: string;
  domain: string;
  schemaVersion: number;
  issuePattern: string;
  category: SupportCategory;
  classification: SupportCategory;
  severity: SupportSeverity;
  requiresHuman: boolean;
  version: number;
  tags: string[];
  resolutionSteps: string[];
  exampleInputs: string[];
  provenance: AgentArtifactProvenance;
  storage: AgentArtifactStorage;
}

export interface AgentKnowledgeArtifact {
  artifactId: string;
  benchmarkCaseId: string;
  version: number;
  fileName: string;
  frontmatter: AgentArtifactFrontmatter;
  markdown: string;
  retrievalText: string;
  sourceFailureCodes: AgentFailureReasonCode[];
}

export interface AgentArtifactManifest {
  artifactId: string;
  benchmarkCaseId: string;
  version: number;
  fileName: string;
  title: string;
  tags: string[];
  retrievalText: string;
  contentHash: string;
  sourceRunId: string;
  artifactUri?: string | null;
}

export interface AgentArtifactStorageManifestFile {
  artifactId: string;
  benchmarkCaseId: string;
  version: number;
  fileName: string;
  relativePath: string;
  contentHash: string;
  artifactUri: string | null;
  tags: string[];
  retrievalText: string;
}

export interface AgentArtifactStorageManifest {
  schemaVersion: number;
  generatedAt: string;
  runId: string | null;
  suiteLabel: string | null;
  storageProvider: "0G_STORAGE";
  uploadStatus: "prepared";
  artifactCount: number;
  artifactLibraryDir: string;
  artifactManifestPath: string;
  files: AgentArtifactStorageManifestFile[];
}

export interface AgentFailureRecord {
  runId: string;
  benchmarkCase: AgentBenchmarkCase;
  rawModelOutput: string;
  parsedModelOutput: AgentStructuredResponse | null;
  evaluation: AgentEvaluationResult;
}

export interface AgentCorrectionRecord {
  runId: string;
  benchmarkCaseId: string;
  correctedResponse: AgentStructuredResponse;
  knowledgeArtifact: AgentKnowledgeArtifact;
  trainingExample: AgentTrainingExample;
  sourceFailureCodes: AgentFailureReasonCode[];
}

export interface AgentBenchmarkCaseRun {
  benchmarkCaseId: string;
  title: string;
  retrievedArtifactIds: string[];
  rawModelOutput: string;
  parsedModelOutput: AgentStructuredResponse | null;
  evaluation: AgentEvaluationResult;
}

export interface AgentBenchmarkComparison {
  benchmarkCaseId: string;
  improved: boolean;
  baselinePassed: boolean;
  artifactPassed: boolean;
  retrievedArtifactIds: string[];
}

export interface AgentRunSummary {
  benchmarkCaseCount: number;
  baselinePassedCount: number;
  baselineFailedCount: number;
  artifactPassedCount: number;
  artifactFailedCount: number;
  improvedCount: number;
  artifactCount: number;
  publishedTaskCount: number;
  publishedCorrectionCount: number;
  registeredDatasetVersion: boolean;
}
