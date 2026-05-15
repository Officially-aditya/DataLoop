import { buildPreparedStorageProof, hashArtifactContent } from "./storage";
import type { AgentArtifactDomain, AgentArtifactResource } from "./types";

const seedTimestamp = "2026-05-05T00:00:00.000Z";

export interface KnowledgeArtifactCase {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  questionPattern: string;
  formulaPattern: string;
  concepts: string[];
  answer: string;
  rawFormula: string | null;
  rawAnswer: string;
  usageCount: number;
  benchmarkScore: number;
}

export type ExcelArtifactCase = KnowledgeArtifactCase;
export type ZGArtifactCase = KnowledgeArtifactCase;

export const excelArtifactCases: ExcelArtifactCase[] = [
  {
    id: "sumifs-multi-condition",
    title: "SUMIFS with multiple criteria",
    difficulty: "medium",
    tags: ["aggregation", "sumifs", "date criteria"],
    questionPattern:
      "In a sales table with dates in A, regions in B, amounts in C, what formula sums sales in 'North' region after 2024-01-01?",
    formulaPattern: '=SUMIFS(C:C, B:B, "North", A:A, ">2024-01-01")',
    concepts: ["SUMIFS", "date criteria"],
    answer: "Use SUMIFS with date criteria for multi-condition aggregation.",
    rawFormula: '=SUMIFS(C:C,B:B,"North",A:A,">2024-01-01")',
    rawAnswer: "Sums North region sales after Jan 1, 2024 using date criteria.",
    usageCount: 421,
    benchmarkScore: 0.95
  },
  {
    id: "xlookup-basics",
    title: "Basic XLOOKUP lookup",
    difficulty: "easy",
    tags: ["lookup", "xlookup", "exact match"],
    questionPattern:
      "Given employee names in column A and salaries in column B, what formula looks up the salary for John Doe from A1:B10?",
    formulaPattern: '=XLOOKUP("John Doe", A1:A10, B1:B10)',
    concepts: ["XLOOKUP", "exact match"],
    answer: "Use XLOOKUP to find the salary for the exact match.",
    rawFormula: '=XLOOKUP("John Doe",A1:A10,B1:B10)',
    rawAnswer: "XLOOKUP finds the salary for John Doe.",
    usageCount: 318,
    benchmarkScore: 0.92
  },
  {
    id: "filter-dynamic-array",
    title: "FILTER spilled array",
    difficulty: "medium",
    tags: ["dynamic arrays", "filter", "spill"],
    questionPattern: "Filter sales table A:C for amounts over 1000 and return region and amount columns.",
    formulaPattern: "=FILTER(B:C, C:C>1000)",
    concepts: ["FILTER", "spill"],
    answer: "Use dynamic array FILTER; the result will spill into adjacent cells.",
    rawFormula: "=FILTER(B:C,C:C>1000)",
    rawAnswer: "Filters rows where amounts are over 1000.",
    usageCount: 256,
    benchmarkScore: 0.9
  },
  {
    id: "absolute-ref-mistake",
    title: "Fix absolute reference error",
    difficulty: "medium",
    tags: ["debugging", "absolute references", "$ syntax"],
    questionPattern: "Formula =A$1*B1 copied down changes wrong. Why and how to fix for column totals?",
    formulaPattern: "=A$1*B1 for row copy, =$A1*B1 for column copy, =$A$1*$B1 for fixed.",
    concepts: ["absolute references", "$ syntax"],
    answer: "Use absolute references with $ syntax to control whether rows, columns, or both stay fixed.",
    rawFormula: null,
    rawAnswer: "Use $ to lock row or column when copying.",
    usageCount: 177,
    benchmarkScore: 0.88
  },
  {
    id: "vlookup-limitations",
    title: "When not to use VLOOKUP",
    difficulty: "easy",
    tags: ["explanation", "vlookup", "xlookup"],
    questionPattern: "Why avoid VLOOKUP? When should I use XLOOKUP instead?",
    formulaPattern: "",
    concepts: ["VLOOKUP limitations", "XLOOKUP advantages"],
    answer:
      "VLOOKUP limitations include one-way lookup direction and fragile column indexes; XLOOKUP advantages include exact-match defaults, left/right lookup, and cleaner return arrays.",
    rawFormula: null,
    rawAnswer: "VLOOKUP is older and XLOOKUP is usually easier.",
    usageCount: 203,
    benchmarkScore: 0.89
  },
  {
    id: "text-numbers-sum",
    title: "Sum text-formatted numbers",
    difficulty: "easy",
    tags: ["debugging", "value", "text numbers"],
    questionPattern: "Column A looks like numbers but SUM(A:A) is 0. Fix the formula.",
    formulaPattern: "=SUM(VALUE(A:A))",
    concepts: ["VALUE"],
    answer: "Use VALUE for text to number conversion before summing.",
    rawFormula: "=SUM(A:A)",
    rawAnswer: "Try SUM on the column after checking formatting.",
    usageCount: 141,
    benchmarkScore: 0.86
  }
];

export const zgArtifactCases: ZGArtifactCase[] = [
  {
    id: "0g-stack-overview",
    title: "0G stack overview",
    difficulty: "easy",
    tags: ["0g", "zero gravity", "deaios", "ai agents", "modular stack"],
    questionPattern: "What is 0G and what are the core components of its stack?",
    formulaPattern: "",
    concepts: ["0G", "decentralized AI operating system", "Chain", "Compute", "Storage", "Data Availability"],
    answer:
      "0G is positioned as the blockchain for AI agents: a modular, AI-first stack for verifiable compute, decentralized storage, high-speed data availability, and onchain AI services. Its core stack includes 0G Chain, Compute Network, Storage, Data Availability, Service Marketplace, Alignment Nodes, and dApps. Use this answer when the question asks for the big-picture architecture or product positioning.\n\nSources: https://0g.ai/ and https://docs.0g.ai/developer-hub/getting-started",
    rawFormula: null,
    rawAnswer:
      "0G is a blockchain project for decentralized AI, combining chain, storage, compute, and data availability. The raw answer may miss exact product naming or current docs details.",
    usageCount: 362,
    benchmarkScore: 0.93
  },
  {
    id: "0g-chain-galileo",
    title: "0G Chain and Galileo testnet",
    difficulty: "medium",
    tags: ["0g", "chain", "galileo", "testnet", "evm", "rpc", "faucet"],
    questionPattern: "How do I configure or describe 0G Chain on the Galileo testnet?",
    formulaPattern: "",
    concepts: ["0G Chain", "EVM compatibility", "Galileo testnet", "Chain ID 16602", "testnet RPC"],
    answer:
      "0G Chain is an EVM-compatible, AI-optimized L1 with separated consensus and execution layers. The Galileo testnet network name is 0G-Galileo-Testnet, Chain ID is 16602, token symbol is 0G, explorer is https://chainscan-galileo.0g.ai, and the development RPC is https://evmrpc-testnet.0g.ai. Test tokens come from the official 0G faucet or Google Cloud faucet, with the docs noting a 0.1 0G daily wallet limit.\n\nSources: https://docs.0g.ai/concepts/chain and https://docs.0g.ai/developer-hub/testnet/testnet-overview",
    rawFormula: null,
    rawAnswer:
      "0G Chain is an EVM-compatible AI blockchain. For Galileo, use the current docs because chain IDs, RPCs, and contract addresses can change.",
    usageCount: 289,
    benchmarkScore: 0.91
  },
  {
    id: "0g-storage-sdk",
    title: "0G Storage and SDK",
    difficulty: "medium",
    tags: ["0g", "storage", "sdk", "turbo", "indexer", "pora", "erasure coding"],
    questionPattern: "How does 0G Storage work and how do I start with the storage SDK?",
    formulaPattern: "",
    concepts: ["0G Storage", "erasure coding", "Proof of Random Access", "TypeScript SDK", "Turbo indexer"],
    answer:
      "0G Storage is a decentralized storage layer built for AI and Web3 workloads. The docs describe a data publishing lane for metadata and proofs, plus a storage lane where data is erasure-coded, split into chunks, and replicated. Storage providers are checked through Proof of Random Access. For TypeScript, install `@0gfoundation/0g-storage-ts-sdk` with `ethers`; the docs show the testnet RPC `https://evmrpc-testnet.0g.ai` and Turbo indexer `https://indexer-storage-testnet-turbo.0g.ai`. Save the returned Merkle root because it is needed to download later.\n\nSources: https://docs.0g.ai/concepts/storage and https://docs.0g.ai/developer-hub/building-on-0g/storage/sdk",
    rawFormula: null,
    rawAnswer:
      "0G Storage stores data across decentralized nodes and has SDKs for upload/download. The raw answer may omit current endpoint or proof details.",
    usageCount: 334,
    benchmarkScore: 0.92
  },
  {
    id: "0g-compute-inference",
    title: "0G Compute inference",
    difficulty: "medium",
    tags: ["0g", "compute", "inference", "gpu marketplace", "cli", "sdk", "tee"],
    questionPattern: "How do I use 0G Compute for inference?",
    formulaPattern: "",
    concepts: ["0G Compute", "inference", "GPU marketplace", "CLI", "SDK", "TEE verification"],
    answer:
      "0G Compute is a decentralized GPU marketplace for AI workloads. For inference, the docs offer hosted UIs at compute-marketplace.0g.ai/inference and pc.0g.ai Advanced mode, plus local CLI/SDK flows. The CLI path installs `@0gfoundation/0g-compute-ts-sdk`, runs `0g-compute-cli setup-network`, logs in with a wallet, deposits funds, lists providers, verifies provider TEE status, and then sends inference requests.\n\nSources: https://docs.0g.ai/concepts/compute and https://docs.0g.ai/developer-hub/building-on-0g/compute-network/inference",
    rawFormula: null,
    rawAnswer:
      "0G Compute provides decentralized AI inference through providers. A generic answer may not include the current CLI commands or hosted entry points.",
    usageCount: 271,
    benchmarkScore: 0.9
  },
  {
    id: "0g-da",
    title: "0G Data Availability",
    difficulty: "medium",
    tags: ["0g", "data availability", "da", "rollups", "throughput", "galileo"],
    questionPattern: "What is 0G DA and when should a developer use it?",
    formulaPattern: "",
    concepts: ["0G DA", "data availability", "horizontal scalability", "rollups", "50 Gbps Galileo"],
    answer:
      "0G DA is the data availability layer for proving data is accessible, verifiable, and retrievable without forcing every node to receive all data. The docs emphasize built-in storage integration, a modular architecture that decouples storage/DA/consensus, horizontal scalability through additional consensus networks, and demonstrated 50 Gbps throughput on Galileo. It is relevant for rollups, shared sequencers, AI agents, gaming, DeFi, and other high-throughput workloads.\n\nSources: https://docs.0g.ai/concepts/da and https://0g.ai/faq",
    rawFormula: null,
    rawAnswer:
      "0G DA is a scalable data availability layer for rollups and AI workloads. The raw answer may miss the Galileo throughput and architecture details.",
    usageCount: 247,
    benchmarkScore: 0.91
  }
];

const excelConcepts = unique(excelArtifactCases.flatMap((artifactCase) => artifactCase.concepts));
const excelTags = unique(excelArtifactCases.flatMap((artifactCase) => artifactCase.tags));
const excelFileBody = buildExcelArtifactFileBody(excelArtifactCases);
const zgConcepts = unique(zgArtifactCases.flatMap((artifactCase) => artifactCase.concepts));
const zgTags = unique(zgArtifactCases.flatMap((artifactCase) => artifactCase.tags));
const zgFileBody = buildZGArtifactFileBody(zgArtifactCases);

export const marketplaceArtifacts: AgentArtifactResource[] = [
  createMarketplaceArtifact({
    id: "excel",
    title: "Excel artifact pack",
    domain: "excel",
    difficulty: "medium",
    tags: ["excel", "formula library", ...excelTags].slice(0, 18),
    questionPattern: excelArtifactCases.map((artifactCase) => artifactCase.questionPattern).join("\n"),
    formulaPattern: "See excel.md",
    concepts: excelConcepts,
    answer: excelFileBody,
    rawFormula: null,
    rawAnswer: "The raw model answers from general Excel knowledge without the bundled excel.md artifact pack.",
    usageCount: excelArtifactCases.reduce((total, artifactCase) => total + artifactCase.usageCount, 0),
    benchmarkScore:
      excelArtifactCases.reduce((total, artifactCase) => total + artifactCase.benchmarkScore, 0) /
      excelArtifactCases.length,
    storageUri: "0g://artifact-marketplace/excel.md"
  }),
  createMarketplaceArtifact({
    id: "0g",
    title: "0G docs artifact pack",
    domain: "0g",
    difficulty: "medium",
    tags: ["0g", "docs", "ai agents", ...zgTags].slice(0, 18),
    questionPattern: zgArtifactCases.map((artifactCase) => artifactCase.questionPattern).join("\n"),
    formulaPattern: "",
    concepts: zgConcepts,
    answer: zgFileBody,
    rawFormula: null,
    rawAnswer: "The raw model answers from general 0G knowledge without the curated 0G docs artifact pack.",
    usageCount: zgArtifactCases.reduce((total, artifactCase) => total + artifactCase.usageCount, 0),
    benchmarkScore:
      zgArtifactCases.reduce((total, artifactCase) => total + artifactCase.benchmarkScore, 0) /
      zgArtifactCases.length,
    storageUri: "0g://artifact-marketplace/0g.md"
  })
];

function createMarketplaceArtifact(
  artifact: Omit<
    AgentArtifactResource,
    "source" | "creator" | "version" | "createdAt" | "updatedAt" | "storage"
  > & { domain: AgentArtifactDomain; storageUri: string }
): AgentArtifactResource {
  const { storageUri, ...artifactContent } = artifact;
  const contentHash = hashArtifactContent(artifactContent);

  return {
    ...artifactContent,
    source: "marketplace",
    creator: "DataLoop",
    version: "1.0.0",
    createdAt: seedTimestamp,
    updatedAt: seedTimestamp,
    storage: {
      ...buildPreparedStorageProof(artifact.id, contentHash),
      uri: storageUri
    }
  };
}

function buildExcelArtifactFileBody(artifactCases: ExcelArtifactCase[]) {
  return [
    "# Excel Artifact Pack",
    "",
    "A single DataLoop artifact file containing reusable Excel question patterns, formulas, concepts, and answer guidance.",
    "",
    "## Questions",
    "",
    artifactCases.map(renderExcelArtifactCase).join("\n\n")
  ].join("\n");
}

function renderExcelArtifactCase(artifactCase: ExcelArtifactCase, index: number) {
  return [
    `### ${index + 1}. ${artifactCase.title}`,
    "",
    `Question: ${artifactCase.questionPattern}`,
    "",
    "Formula:",
    "```excel",
    artifactCase.formulaPattern || "No formula pattern",
    "```",
    "",
    `Concepts: ${artifactCase.concepts.join(", ")}`,
    "",
    `Answer: ${artifactCase.answer}`,
    "",
    `Raw baseline: ${artifactCase.rawAnswer}`
  ].join("\n");
}

function buildZGArtifactFileBody(artifactCases: ZGArtifactCase[]) {
  return [
    "# 0G Docs Artifact Pack",
    "",
    "A DataLoop artifact file containing 0G website and documentation Q&A for the agent benchmark.",
    "",
    "## Questions",
    "",
    artifactCases.map(renderZGArtifactCase).join("\n\n")
  ].join("\n");
}

function renderZGArtifactCase(artifactCase: ZGArtifactCase, index: number) {
  return [
    `### ${index + 1}. ${artifactCase.title}`,
    "",
    `Question: ${artifactCase.questionPattern}`,
    "",
    `Concepts: ${artifactCase.concepts.join(", ")}`,
    "",
    `Answer: ${artifactCase.answer}`,
    "",
    `Raw baseline: ${artifactCase.rawAnswer}`
  ].join("\n");
}

function unique(values: string[]) {
  return [...new Set(values)];
}
