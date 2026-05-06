import { randomUUID } from "node:crypto";

import type { AgentRuntimeConfig } from "../config";
import { ApiError } from "../errors";
import { marketplaceArtifacts } from "./marketplace";
import { AgentArtifactStorage } from "./storage";
import type {
  AgentAnswerResource,
  AgentArtifactResource,
  AgentCompareRequest,
  AgentComparisonResource,
  AgentProviderStatus,
  AgentRunResource,
  AgentUploadArtifactRequest
} from "./types";

interface ModelAnswer {
  formula: string;
  explanation: string;
  confidence: number;
  provider: AgentProviderStatus;
}

interface ChatCompletionResponse {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
  x_0g_trace?: {
    request_id?: string;
    provider?: string;
    tee_verified?: boolean;
  };
}

interface ParsedModelContent {
  formula?: unknown;
  explanation?: unknown;
  confidence?: unknown;
}

export class AgentService {
  private readonly artifactsById = new Map<string, AgentArtifactResource>();
  private readonly artifactStorage: AgentArtifactStorage;
  private libraryIds = ["sumifs-multi-condition"];
  private lastComputeRequestAt = 0;

  constructor(private readonly config: AgentRuntimeConfig) {
    this.artifactStorage = new AgentArtifactStorage(config.storage);

    for (const artifact of marketplaceArtifacts) {
      this.artifactsById.set(artifact.id, artifact);
    }
  }

  listMarketplaceArtifacts() {
    return [...this.artifactsById.values()]
      .filter((artifact) => artifact.source === "marketplace")
      .sort((left, right) => right.usageCount - left.usageCount);
  }

  listLibraryArtifacts() {
    return this.libraryIds
      .map((artifactId) => this.artifactsById.get(artifactId))
      .filter((artifact): artifact is AgentArtifactResource => artifact !== undefined);
  }

  addArtifactToLibrary(artifactId: string) {
    const artifact = this.artifactsById.get(artifactId);

    if (artifact === undefined) {
      throw new ApiError(404, "ARTIFACT_NOT_FOUND", `Artifact ${artifactId} was not found`);
    }

    this.libraryIds = [artifactId, ...this.libraryIds.filter((candidate) => candidate !== artifactId)].slice(0, 24);

    return {
      artifact,
      library: this.listLibraryArtifacts()
    };
  }

  removeArtifactFromLibrary(artifactId: string) {
    const previousLength = this.libraryIds.length;
    this.libraryIds = this.libraryIds.filter((candidate) => candidate !== artifactId);

    if (previousLength === this.libraryIds.length) {
      throw new ApiError(404, "ARTIFACT_NOT_IN_LIBRARY", `Artifact ${artifactId} is not in the library`);
    }

    return {
      artifactId,
      removed: true,
      library: this.listLibraryArtifacts()
    };
  }

  async uploadArtifact(input: AgentUploadArtifactRequest) {
    const title = input.title.trim();
    const answer = input.answer.trim();

    if (title.length === 0 || answer.length === 0) {
      throw new ApiError(400, "INVALID_AGENT_ARTIFACT", "Uploaded artifacts require a title and answer");
    }

    const concepts = (input.concepts ?? [])
      .map((concept) => concept.trim())
      .filter((concept) => concept.length > 0)
      .slice(0, 12);
    const artifactId = `upload-${randomUUID()}`;
    const now = new Date().toISOString();
    const artifactContent = {
      title,
      questionPattern: input.questionPattern?.trim() ?? title,
      formulaPattern: input.formulaPattern?.trim() ?? "",
      concepts,
      answer
    };
    const storage = await this.artifactStorage.storeArtifact({
      artifactId,
      content: artifactContent
    });

    const artifact: AgentArtifactResource = {
      id: artifactId,
      title,
      domain: "excel",
      difficulty: "medium",
      tags: concepts.slice(0, 6),
      questionPattern: artifactContent.questionPattern,
      formulaPattern: artifactContent.formulaPattern,
      concepts,
      answer,
      rawFormula: null,
      rawAnswer: "The raw model does not have this uploaded artifact in context.",
      source: "upload",
      creator: "Current user",
      version: "1.0.0",
      usageCount: 1,
      benchmarkScore: null,
      createdAt: now,
      updatedAt: now,
      storage
    };

    this.artifactsById.set(artifact.id, artifact);
    this.libraryIds = [artifact.id, ...this.libraryIds.filter((candidate) => candidate !== artifact.id)].slice(0, 24);

    return {
      artifact,
      library: this.listLibraryArtifacts()
    };
  }

  async compare(input: AgentCompareRequest): Promise<AgentComparisonResource> {
    const question = input.question.trim();

    if (question.length === 0) {
      throw new ApiError(400, "INVALID_AGENT_QUESTION", "Question is required");
    }

    const marketplaceMatch = findBestArtifact(question, this.listMarketplaceArtifacts());
    const libraryMatch = findBestArtifact(question, this.listLibraryArtifacts());
    const rawModelAnswer = await this.answerRawQuestion(question, marketplaceMatch);
    const augmentedModelAnswer =
      libraryMatch === null
        ? this.answerWithoutArtifact()
        : await this.answerWithArtifact(question, libraryMatch);

    const raw: AgentAnswerResource = {
      label: "Raw LLM",
      formula: rawModelAnswer.formula,
      explanation: rawModelAnswer.explanation,
      confidence: rawModelAnswer.confidence,
      artifactIds: [],
      matchedArtifactTitle: marketplaceMatch?.title ?? "General response",
      provider: rawModelAnswer.provider
    };
    const augmented: AgentAnswerResource = {
      label: "With Artifacts",
      formula: augmentedModelAnswer.formula,
      explanation: augmentedModelAnswer.explanation,
      confidence: augmentedModelAnswer.confidence,
      artifactIds: libraryMatch === null ? [] : [libraryMatch.id],
      matchedArtifactTitle: libraryMatch?.title ?? "Library context unavailable",
      provider: augmentedModelAnswer.provider
    };
    const run: AgentRunResource = {
      id: `agent-run-${randomUUID()}`,
      createdAt: new Date().toISOString(),
      question,
      retrievedArtifactIds: augmented.artifactIds,
      storageProvider: "0G_STORAGE",
      rawProvider: raw.provider,
      augmentedProvider: augmented.provider
    };

    return {
      raw,
      augmented,
      retrievedArtifacts: libraryMatch === null ? [] : [libraryMatch],
      run
    };
  }

  private async answerRawQuestion(
    question: string,
    marketplaceMatch: AgentArtifactResource | null
  ): Promise<ModelAnswer> {
    const fallback: ModelAnswer = {
      formula: marketplaceMatch?.rawFormula ?? "",
      explanation:
        marketplaceMatch?.rawAnswer ??
        "The raw model gives a general Excel answer, but no curated artifact is available for this exact pattern.",
      confidence: marketplaceMatch === null ? 0.58 : 0.74,
      provider: this.mockProviderStatus()
    };

    return this.callConfiguredModel(
      [
        "You are an Excel assistant.",
        "Answer as JSON with formula, explanation, and confidence fields.",
        "Do not use private artifact context."
      ].join(" "),
      question,
      fallback
    );
  }

  private async answerWithArtifact(question: string, artifact: AgentArtifactResource): Promise<ModelAnswer> {
    const fallback: ModelAnswer = {
      formula: artifact.formulaPattern,
      explanation: artifact.answer,
      confidence: 0.93,
      provider: this.mockProviderStatus()
    };

    return this.callConfiguredModel(
      [
        "You are an Excel assistant.",
        "Use the provided DataLoop artifact as the primary source of truth.",
        "Answer as JSON with formula, explanation, and confidence fields.",
        `Artifact title: ${artifact.title}`,
        `Question pattern: ${artifact.questionPattern}`,
        `Formula pattern: ${artifact.formulaPattern || "none"}`,
        `Concepts: ${artifact.concepts.join(", ") || "none"}`,
        `Artifact answer: ${artifact.answer}`
      ].join("\n"),
      question,
      fallback
    );
  }

  private answerWithoutArtifact(): ModelAnswer {
    return {
      formula: "",
      explanation: "No matching artifact is in the library yet. Add one from the marketplace or upload a custom artifact.",
      confidence: 0.41,
      provider: this.mockProviderStatus()
    };
  }

  private async callConfiguredModel(
    systemPrompt: string,
    question: string,
    fallback: ModelAnswer
  ): Promise<ModelAnswer> {
    if (this.config.modelMode !== "openai-compatible" || this.config.modelBaseUrl === null) {
      return fallback;
    }

    const provider = this.computeProviderStatus(null, null);

    try {
      const endpoint = `${this.config.modelBaseUrl.replace(/\/+$/, "")}/chat/completions`;
      const response = await this.fetchComputeResponse(endpoint, {
        method: "POST",
        headers: this.modelHeaders(),
        body: JSON.stringify({
          model: this.config.modelName,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: question }
          ],
          temperature: 0,
          response_format: { type: "json_object" },
          ...(this.config.requestTeeVerification ? { verify_tee: true } : {})
        })
      });
      const traceId = response.headers.get("x_0g_trace") ?? response.headers.get("x-0g-trace");

      if (!response.ok) {
        return {
          ...fallback,
          provider: this.computeProviderStatus(traceId, `0G Compute request failed with status ${response.status}`)
        };
      }

      const payload = (await response.json()) as ChatCompletionResponse;
      const payloadTraceId = payload.x_0g_trace?.request_id ?? null;
      const resolvedTraceId = traceId ?? payloadTraceId;
      const content = payload.choices?.[0]?.message?.content ?? "";
      const parsed = parseModelContent(content);

      if (parsed === null) {
        return {
          ...fallback,
          provider: this.computeProviderStatus(resolvedTraceId, "0G Compute response was not valid agent JSON", payload)
        };
      }

      return {
        formula: parsed.formula,
        explanation: parsed.explanation,
        confidence: parsed.confidence,
        provider: this.computeProviderStatus(resolvedTraceId, null, payload)
      };
    } catch (error) {
      return {
        ...fallback,
        provider: this.computeProviderStatus(null, error instanceof Error ? error.message : "0G Compute request failed")
      };
    }
  }

  private modelHeaders() {
    const headers: Record<string, string> = {
      "Content-Type": "application/json"
    };

    if (this.config.modelApiKey !== null) {
      headers.Authorization = `Bearer ${this.config.modelApiKey}`;
    }

    return headers;
  }

  private async fetchComputeResponse(endpoint: string, init: RequestInit) {
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      await this.waitForComputeSlot();

      const response = await fetch(endpoint, init);

      if (response.ok || !isRetryableComputeStatus(response.status) || attempt === maxAttempts) {
        return response;
      }

      await sleep(getRetryDelayMs(response, attempt));
    }

    throw new Error("0G Compute request failed after retries");
  }

  private async waitForComputeSlot() {
    const minIntervalMs = 1_000;
    const elapsedMs = Date.now() - this.lastComputeRequestAt;

    if (elapsedMs < minIntervalMs) {
      await sleep(minIntervalMs - elapsedMs);
    }

    this.lastComputeRequestAt = Date.now();
  }

  private mockProviderStatus(): AgentProviderStatus {
    return {
      mode: "mock",
      modelName: "dataloop-demo-mock",
      baseUrl: null,
      traceId: null,
      teeVerificationRequested: false,
      teeVerified: null,
      errorMessage: null
    };
  }

  private computeProviderStatus(
    traceId: string | null,
    errorMessage: string | null,
    payload?: ChatCompletionResponse
  ): AgentProviderStatus {
    return {
      mode: "0g-compute",
      modelName: this.config.modelName,
      baseUrl: this.config.modelBaseUrl,
      traceId,
      teeVerificationRequested: this.config.requestTeeVerification,
      teeVerified:
        typeof payload?.x_0g_trace?.tee_verified === "boolean" ? payload.x_0g_trace.tee_verified : null,
      errorMessage
    };
  }
}

export function createAgentService(config: AgentRuntimeConfig) {
  return new AgentService(config);
}

function parseModelContent(content: string) {
  try {
    const parsed = JSON.parse(content) as ParsedModelContent;

    if (typeof parsed.explanation !== "string") {
      return null;
    }

    const confidence = typeof parsed.confidence === "number" ? parsed.confidence : 0.7;

    return {
      formula: typeof parsed.formula === "string" ? parsed.formula : "",
      explanation: parsed.explanation,
      confidence: Math.max(0, Math.min(confidence, 1))
    };
  } catch {
    return null;
  }
}

function findBestArtifact(question: string, artifacts: AgentArtifactResource[]) {
  const queryTokens = tokenizeAgentText(question);
  let bestArtifact: AgentArtifactResource | null = null;
  let bestScore = 0;

  for (const artifact of artifacts) {
    const candidateTokens = tokenizeAgentText(
      `${artifact.title} ${artifact.questionPattern} ${artifact.formulaPattern} ${artifact.concepts.join(" ")} ${artifact.tags.join(" ")}`
    );
    const score = countAgentTokenOverlap(queryTokens, candidateTokens);

    if (score > bestScore) {
      bestArtifact = artifact;
      bestScore = score;
    }
  }

  return bestScore >= 2 ? bestArtifact : null;
}

function tokenizeAgentText(value: string) {
  return new Set(
    value
      .toLowerCase()
      .split(/[^a-z0-9]+/g)
      .filter((token) => token.length >= 4 && !["with", "from", "what", "where", "when", "into"].includes(token))
  );
}

function countAgentTokenOverlap(queryTokens: Set<string>, candidateTokens: Set<string>) {
  let score = 0;

  for (const token of queryTokens) {
    if (candidateTokens.has(token)) {
      score += 1;
    }
  }

  return score;
}

function isRetryableComputeStatus(status: number) {
  return status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
}

function getRetryDelayMs(response: Response, attempt: number) {
  const retryAfter = response.headers.get("retry-after");
  const retryAfterSeconds = retryAfter === null ? NaN : Number(retryAfter);

  if (Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0) {
    return Math.min(12_000, retryAfterSeconds * 1_000);
  }

  return Math.min(12_000, 1_500 * 2 ** (attempt - 1));
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
