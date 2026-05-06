import { buildPreparedStorageProof, hashArtifactContent } from "./storage";
import type { AgentArtifactResource } from "./types";

const seedTimestamp = "2026-05-05T00:00:00.000Z";

export const marketplaceArtifacts: AgentArtifactResource[] = [
  createMarketplaceArtifact({
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
  }),
  createMarketplaceArtifact({
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
  }),
  createMarketplaceArtifact({
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
  }),
  createMarketplaceArtifact({
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
  }),
  createMarketplaceArtifact({
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
  }),
  createMarketplaceArtifact({
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
  })
];

function createMarketplaceArtifact(
  artifact: Omit<
    AgentArtifactResource,
    "domain" | "source" | "creator" | "version" | "createdAt" | "updatedAt" | "storage"
  >
): AgentArtifactResource {
  const contentHash = hashArtifactContent(artifact);

  return {
    ...artifact,
    domain: "excel",
    source: "marketplace",
    creator: "DataLoop",
    version: "1.0.0",
    createdAt: seedTimestamp,
    updatedAt: seedTimestamp,
    storage: {
      ...buildPreparedStorageProof(artifact.id, contentHash),
      uri: `0g://artifact-marketplace/${artifact.id}`
    }
  };
}
