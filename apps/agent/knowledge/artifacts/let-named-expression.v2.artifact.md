---
{
  "artifactId": "0x8310ac1a97493ccd9b98afe36f4e48a2f70d0af41f2aa1562b8c75b798fe819d",
  "benchmarkCaseId": "let-named-expression",
  "title": "LET for reusable calculation",
  "domain": "excel-qna",
  "schemaVersion": 1,
  "issuePattern": "Calculate average sales per region using LET to avoid repeating SUMIFS.",
  "formulaPattern": "=LET(north,SUMIFS(C:C,B:B,\"North\"),south,SUMIFS(C:C,B:B,\"South\"),(north+south)/2)",
  "concepts": [
    "LET"
  ],
  "difficulty": "hard",
  "version": 2,
  "tags": [
    "hard",
    "performance",
    "let",
    "reusable",
    "calculation",
    "calculate",
    "average",
    "sales",
    "region",
    "using",
    "avoid",
    "repeating"
  ],
  "resolutionSteps": [
    "LET for intermediate calculations."
  ],
  "exampleInputs": [
    "Calculate average sales per region using LET to avoid repeating SUMIFS."
  ],
  "provenance": {
    "sourceRunId": "2026-05-03T16-16-56.271Z",
    "benchmarkCaseId": "let-named-expression",
    "failureCodes": [
      "MISSING_CONCEPTS"
    ],
    "generatedAt": "2026-05-03T16:16:56.277Z"
  },
  "storage": {
    "contentHash": "0x30f3950b5e034fe50f5a9bf66c1a95b733d066a61776f68bd9c1c511b177f4b1",
    "artifactUri": "artifact://agent-knowledge/let-named-expression.v2.artifact.md"
  }
}
---

# LET for reusable calculation

## Domain
excel-qna

## Question Pattern
Calculate average sales per region using LET to avoid repeating SUMIFS.

## Formula Pattern
=LET(north,SUMIFS(C:C,B:B,"North"),south,SUMIFS(C:C,B:B,"South"),(north+south)/2)

## Required Concepts
LET

## Difficulty
hard

## Recommended Answer
LET for intermediate calculations.

## Resolution Steps
1. LET for intermediate calculations.

## Examples
- Calculate average sales per region using LET to avoid repeating SUMIFS.

## Provenance
Source run: 2026-05-03T16-16-56.271Z
Benchmark case: let-named-expression
Generated at: 2026-05-03T16:16:56.277Z
Failure codes:
- MISSING_CONCEPTS

## Version Metadata
Artifact ID: 0x8310ac1a97493ccd9b98afe36f4e48a2f70d0af41f2aa1562b8c75b798fe819d
Version: 2
Schema version: 1
Content hash: 0x30f3950b5e034fe50f5a9bf66c1a95b733d066a61776f68bd9c1c511b177f4b1
Artifact URI: artifact://agent-knowledge/let-named-expression.v2.artifact.md
Tags: hard, performance, let, reusable, calculation, calculate, average, sales, region, using, avoid, repeating