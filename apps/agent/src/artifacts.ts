import fs from "node:fs/promises";
import path from "node:path";

import type {
  AgentArtifactFrontmatter,
  AgentArtifactManifest,
  AgentArtifactStorageManifest,
  AgentBenchmarkCase,
  AgentEvaluationIssue,
  AgentKnowledgeArtifact
} from "@dataloop/shared";

import type { AgentConfig } from "./config";
import { sha256Hex } from "./hash";

const ARTIFACT_SCHEMA_VERSION = 1;
const STORAGE_MANIFEST_SCHEMA_VERSION = 1;
const ARTIFACT_URI_PREFIX = "artifact://agent-knowledge";
const ARTIFACT_DIRECTORY_NAME = "artifacts";
const STORAGE_MANIFEST_FILE_NAME = "storage-manifest.json";
const RETRIEVAL_STOPWORDS = new Set([
  "about",
  "after",
  "already",
  "before",
  "builder",
  "cannot",
  "chain",
  "connected",
  "correction",
  "dapp",
  "does",
  "expected",
  "from",
  "gets",
  "have",
  "into",
  "issue",
  "needs",
  "says",
  "submission",
  "submit",
  "task",
  "that",
  "their",
  "them",
  "they",
  "this",
  "transaction",
  "user",
  "wallet",
  "with"
]);

export interface ArtifactLibrary {
  artifacts: AgentKnowledgeArtifact[];
  manifest: AgentArtifactManifest[];
  storageManifest: AgentArtifactStorageManifest;
}

interface ArtifactContentInput {
  benchmarkCase: AgentBenchmarkCase;
  issues: AgentEvaluationIssue[];
}

export async function loadArtifactLibrary(
  config: Pick<AgentConfig, "artifactLibraryDir" | "artifactManifestPath">
): Promise<ArtifactLibrary> {
  const manifest = await loadArtifactManifest(config.artifactManifestPath);
  const artifactsDir = getArtifactLibraryArtifactsDir(config.artifactLibraryDir);
  const artifacts: AgentKnowledgeArtifact[] = [];

  for (const entry of manifest) {
    const markdown = await fs.readFile(path.join(artifactsDir, entry.fileName), "utf8");
    const frontmatter = parseArtifactFrontmatter(markdown);

    artifacts.push({
      artifactId: frontmatter.artifactId,
      benchmarkCaseId: frontmatter.benchmarkCaseId,
      version: frontmatter.version,
      fileName: entry.fileName,
      frontmatter,
      markdown,
      retrievalText: entry.retrievalText,
      sourceFailureCodes: frontmatter.provenance.failureCodes
    });
  }

  return {
    artifacts,
    manifest,
    storageManifest: buildArtifactStorageManifest(config, artifacts)
  };
}

export function buildKnowledgeArtifact(input: {
  runId: string;
  benchmarkCase: AgentBenchmarkCase;
  issues: AgentEvaluationIssue[];
  existingArtifact?: AgentKnowledgeArtifact;
  generatedAt?: string;
}): AgentKnowledgeArtifact {
  const artifactId = sha256Hex(`artifact:${input.benchmarkCase.id}`);
  const domain = "builder-support";
  const sourceFailureCodes = input.issues.map((issue) => issue.code);
  const resolutionSteps = buildResolutionSteps(input.benchmarkCase.expected.suggestedResolution);
  const exampleInputs = [input.benchmarkCase.userPrompt];
  const tags = buildArtifactTags(input.benchmarkCase);
  const contentHash = buildArtifactContentHash({
    benchmarkCase: input.benchmarkCase,
    issues: input.issues
  });

  if (
    input.existingArtifact !== undefined &&
    input.existingArtifact.frontmatter.storage.contentHash === contentHash
  ) {
    return input.existingArtifact;
  }

  const version = input.existingArtifact?.version ? input.existingArtifact.version + 1 : 1;
  const fileName = buildArtifactFileName(input.benchmarkCase.id, version);
  const generatedAt = input.generatedAt ?? new Date().toISOString();
  const artifactUri = `${ARTIFACT_URI_PREFIX}/${fileName}`;
  const frontmatter: AgentArtifactFrontmatter = {
    artifactId,
    benchmarkCaseId: input.benchmarkCase.id,
    title: input.benchmarkCase.title,
    domain,
    schemaVersion: ARTIFACT_SCHEMA_VERSION,
    issuePattern: input.benchmarkCase.userPrompt,
    category: input.benchmarkCase.expected.category,
    classification: input.benchmarkCase.expected.category,
    severity: input.benchmarkCase.expected.severity,
    requiresHuman: input.benchmarkCase.expected.requiresHuman,
    version,
    tags,
    resolutionSteps,
    exampleInputs,
    provenance: {
      sourceRunId: input.runId,
      benchmarkCaseId: input.benchmarkCase.id,
      failureCodes: sourceFailureCodes,
      generatedAt
    },
    storage: {
      contentHash,
      artifactUri
    }
  };

  return {
    artifactId,
    benchmarkCaseId: input.benchmarkCase.id,
    version,
    fileName,
    frontmatter,
    markdown: renderArtifactMarkdown(frontmatter, input.benchmarkCase.expected.summary),
    retrievalText: buildRetrievalText(frontmatter),
    sourceFailureCodes
  };
}

export function mergeArtifactSets(
  existingArtifacts: AgentKnowledgeArtifact[],
  generatedArtifacts: AgentKnowledgeArtifact[]
) {
  const merged = new Map(existingArtifacts.map((artifact) => [artifact.artifactId, artifact]));

  for (const artifact of generatedArtifacts) {
    merged.set(artifact.artifactId, artifact);
  }

  return [...merged.values()].sort((left, right) => left.artifactId.localeCompare(right.artifactId));
}

export async function persistArtifactLibrary(
  config: Pick<AgentConfig, "artifactLibraryDir" | "artifactManifestPath">,
  artifacts: AgentKnowledgeArtifact[],
  context: {
    runId?: string;
    suiteLabel?: string;
    generatedAt?: string;
  } = {}
): Promise<ArtifactLibrary> {
  const artifactsDir = getArtifactLibraryArtifactsDir(config.artifactLibraryDir);
  const manifest = artifacts.map(buildArtifactManifestEntry);
  const storageManifest = buildArtifactStorageManifest(config, artifacts, context);

  await fs.mkdir(config.artifactLibraryDir, { recursive: true });
  await fs.mkdir(artifactsDir, { recursive: true });
  await fs.mkdir(path.dirname(config.artifactManifestPath), { recursive: true });

  for (const artifact of artifacts) {
    await fs.writeFile(path.join(artifactsDir, artifact.fileName), artifact.markdown, "utf8");
  }

  await fs.writeFile(config.artifactManifestPath, JSON.stringify(manifest, null, 2), "utf8");
  await fs.writeFile(
    getArtifactStorageManifestPath(config.artifactLibraryDir),
    JSON.stringify(storageManifest, null, 2),
    "utf8"
  );

  return {
    artifacts,
    manifest,
    storageManifest
  };
}

export function retrieveArtifacts(
  benchmarkCase: AgentBenchmarkCase,
  artifacts: AgentKnowledgeArtifact[],
  limit: number,
  minScore: number
) {
  const titleTokens = new Set(tokenizeForRetrieval(benchmarkCase.title));
  const issueTokens = new Set(tokenizeForRetrieval(benchmarkCase.userPrompt));

  return [...artifacts]
    .map((artifact) => ({
      artifact,
      score: scoreArtifact(titleTokens, issueTokens, artifact)
    }))
    .filter((entry) => entry.score >= minScore)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      if (right.artifact.version !== left.artifact.version) {
        return right.artifact.version - left.artifact.version;
      }

      return left.artifact.artifactId.localeCompare(right.artifact.artifactId);
    })
    .slice(0, limit)
    .map((entry) => entry.artifact);
}

export function buildArtifactManifestEntry(artifact: AgentKnowledgeArtifact): AgentArtifactManifest {
  return {
    artifactId: artifact.artifactId,
    benchmarkCaseId: artifact.benchmarkCaseId,
    version: artifact.version,
    fileName: artifact.fileName,
    title: artifact.frontmatter.title,
    tags: artifact.frontmatter.tags,
    retrievalText: artifact.retrievalText,
    contentHash: artifact.frontmatter.storage.contentHash,
    sourceRunId: artifact.frontmatter.provenance.sourceRunId,
    artifactUri: artifact.frontmatter.storage.artifactUri
  };
}

export function buildArtifactStorageManifest(
  config: Pick<AgentConfig, "artifactLibraryDir" | "artifactManifestPath">,
  artifacts: AgentKnowledgeArtifact[],
  context: {
    runId?: string;
    suiteLabel?: string;
    generatedAt?: string;
  } = {}
): AgentArtifactStorageManifest {
  return {
    schemaVersion: STORAGE_MANIFEST_SCHEMA_VERSION,
    generatedAt: context.generatedAt ?? new Date().toISOString(),
    runId: context.runId ?? null,
    suiteLabel: context.suiteLabel ?? null,
    storageProvider: "0G_STORAGE",
    uploadStatus: "prepared",
    artifactCount: artifacts.length,
    artifactLibraryDir: config.artifactLibraryDir,
    artifactManifestPath: config.artifactManifestPath,
    files: artifacts.map((artifact) => ({
      artifactId: artifact.artifactId,
      benchmarkCaseId: artifact.benchmarkCaseId,
      version: artifact.version,
      fileName: artifact.fileName,
      relativePath: path.posix.join(ARTIFACT_DIRECTORY_NAME, artifact.fileName),
      contentHash: artifact.frontmatter.storage.contentHash,
      artifactUri: artifact.frontmatter.storage.artifactUri,
      tags: artifact.frontmatter.tags,
      retrievalText: artifact.retrievalText
    }))
  };
}

export function getArtifactLibraryArtifactsDir(artifactLibraryDir: string) {
  return path.join(artifactLibraryDir, ARTIFACT_DIRECTORY_NAME);
}

export function getArtifactStorageManifestPath(artifactLibraryDir: string) {
  return path.join(artifactLibraryDir, STORAGE_MANIFEST_FILE_NAME);
}

export function parseArtifactFrontmatter(markdown: string): AgentArtifactFrontmatter {
  const lines = markdown.split("\n");

  if (lines[0] !== "---") {
    throw new Error("Artifact markdown is missing the opening frontmatter delimiter");
  }

  const closingIndex = lines.indexOf("---", 1);

  if (closingIndex === -1) {
    throw new Error("Artifact markdown is missing the closing frontmatter delimiter");
  }

  const frontmatterText = lines.slice(1, closingIndex).join("\n");
  return JSON.parse(frontmatterText) as AgentArtifactFrontmatter;
}

function buildArtifactContentHash(input: ArtifactContentInput) {
  return sha256Hex(
    JSON.stringify({
      schemaVersion: ARTIFACT_SCHEMA_VERSION,
      artifactId: sha256Hex(`artifact:${input.benchmarkCase.id}`),
      benchmarkCaseId: input.benchmarkCase.id,
      title: input.benchmarkCase.title,
      domain: "builder-support",
      issuePattern: input.benchmarkCase.userPrompt,
      category: input.benchmarkCase.expected.category,
      classification: input.benchmarkCase.expected.category,
      severity: input.benchmarkCase.expected.severity,
      requiresHuman: input.benchmarkCase.expected.requiresHuman,
      summary: input.benchmarkCase.expected.summary,
      resolutionSteps: buildResolutionSteps(input.benchmarkCase.expected.suggestedResolution),
      exampleInputs: [input.benchmarkCase.userPrompt],
      tags: buildArtifactTags(input.benchmarkCase),
      sourceFailureCodes: input.issues.map((issue) => issue.code)
    })
  );
}

function renderArtifactMarkdown(frontmatter: AgentArtifactFrontmatter, summary: string) {
  const resolutionSteps = frontmatter.resolutionSteps.map((step, index) => `${index + 1}. ${step}`).join("\n");
  const exampleInputs = frontmatter.exampleInputs.map((example) => `- ${example}`).join("\n");
  const failureCodes = frontmatter.provenance.failureCodes.map((code) => `- ${code}`).join("\n");
  const tagLine = frontmatter.tags.join(", ");

  return [
    "---",
    JSON.stringify(frontmatter, null, 2),
    "---",
    "",
    `# ${frontmatter.title}`,
    "",
    "## Domain",
    frontmatter.domain,
    "",
    "## Issue Pattern",
    frontmatter.issuePattern,
    "",
    "## Classification",
    `Category: ${frontmatter.category}`,
    `Classification: ${frontmatter.classification}`,
    "",
    "## Severity",
    frontmatter.severity,
    "",
    "## Human Escalation",
    frontmatter.requiresHuman ? "Required" : "Not required",
    "",
    "## Recommended Resolution Steps",
    resolutionSteps,
    "",
    "## Examples",
    exampleInputs,
    "",
    "## Summary",
    summary,
    "",
    "## Provenance",
    `Source run: ${frontmatter.provenance.sourceRunId}`,
    `Benchmark case: ${frontmatter.provenance.benchmarkCaseId}`,
    `Generated at: ${frontmatter.provenance.generatedAt}`,
    "Failure codes:",
    failureCodes,
    "",
    "## Version Metadata",
    `Artifact ID: ${frontmatter.artifactId}`,
    `Version: ${frontmatter.version}`,
    `Schema version: ${frontmatter.schemaVersion}`,
    `Content hash: ${frontmatter.storage.contentHash}`,
    `Artifact URI: ${frontmatter.storage.artifactUri ?? "n/a"}`,
    `Tags: ${tagLine}`
  ].join("\n");
}

function buildArtifactTags(benchmarkCase: AgentBenchmarkCase) {
  return Array.from(
    new Set([
      benchmarkCase.expected.category.toLowerCase(),
      benchmarkCase.expected.severity,
      ...tokenizeForRetrieval(benchmarkCase.title),
      ...tokenizeForRetrieval(benchmarkCase.userPrompt)
    ])
  ).slice(0, 12);
}

function buildResolutionSteps(suggestedResolution: string) {
  const sentences = suggestedResolution
    .split(/\.(?:\s+|$)/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0);

  if (sentences.length === 0) {
    return [suggestedResolution.trim()];
  }

  return sentences.map((sentence) => (sentence.endsWith(".") ? sentence : `${sentence}.`));
}

function buildRetrievalText(frontmatter: AgentArtifactFrontmatter) {
  return [
    frontmatter.title,
    frontmatter.issuePattern,
    frontmatter.category,
    frontmatter.classification,
    frontmatter.severity,
    frontmatter.tags.join(" "),
    frontmatter.exampleInputs.join(" "),
    frontmatter.resolutionSteps.join(" ")
  ]
    .join(" ")
    .toLowerCase();
}

function buildArtifactFileName(benchmarkCaseId: string, version: number) {
  return `${benchmarkCaseId}.v${version}.artifact.md`;
}

function scoreArtifact(
  titleTokens: Set<string>,
  issueTokens: Set<string>,
  artifact: AgentKnowledgeArtifact
) {
  const titleScore = countTokenOverlap(titleTokens, tokenizeForRetrieval(artifact.frontmatter.title)) * 4;
  const issueScore = countTokenOverlap(issueTokens, tokenizeForRetrieval(artifact.frontmatter.issuePattern)) * 3;
  const tagScore = countTokenOverlap(
    issueTokens,
    artifact.frontmatter.tags.flatMap((tag) => tokenizeForRetrieval(tag))
  ) * 2;
  const classificationScore = countTokenOverlap(
    issueTokens,
    tokenizeForRetrieval(`${artifact.frontmatter.category} ${artifact.frontmatter.classification}`)
  ) * 2;
  const exampleScore = countTokenOverlap(
    issueTokens,
    artifact.frontmatter.exampleInputs.flatMap((example) => tokenizeForRetrieval(example))
  );

  return titleScore + issueScore + tagScore + classificationScore + exampleScore;
}

function countTokenOverlap(queryTokens: Set<string>, candidateTokens: string[]) {
  let score = 0;
  const uniqueCandidateTokens = new Set(candidateTokens);

  for (const token of queryTokens) {
    if (uniqueCandidateTokens.has(token)) {
      score += 1;
    }
  }

  return score;
}

function tokenizeForRetrieval(value: string) {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .filter((token) => token.length >= 4 && !RETRIEVAL_STOPWORDS.has(token));
}

async function loadArtifactManifest(filePath: string) {
  try {
    const manifestText = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(manifestText) as unknown;

    if (!Array.isArray(parsed)) {
      throw new Error("Artifact manifest must be an array");
    }

    return parsed as AgentArtifactManifest[];
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return [];
    }

    throw error;
  }
}
