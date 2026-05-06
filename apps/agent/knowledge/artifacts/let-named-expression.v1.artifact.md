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
  "version": 1,
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
    "sourceRunId": "2026-05-03T16-14-51.099Z",
    "benchmarkCaseId": "let-named-expression",
    "failureCodes": [
      "INVALID_SCHEMA"
    ],
    "generatedAt": "2026-05-03T16:14:51.104Z"
  },
  "storage": {
    "contentHash": "0x0c7c8ba2b3599888b4e1655a3642056803fb5214e7a829532740ac549cb10770",
    "artifactUri": "artifact://agent-knowledge/let-named-expression.v1.artifact.md"
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
Source run: 2026-05-03T16-14-51.099Z
Benchmark case: let-named-expression
Generated at: 2026-05-03T16:14:51.104Z
Failure codes:
- INVALID_SCHEMA

## Version Metadata
Artifact ID: 0x8310ac1a97493ccd9b98afe36f4e48a2f70d0af41f2aa1562b8c75b798fe819d
Version: 1
Schema version: 1
Content hash: 0x0c7c8ba2b3599888b4e1655a3642056803fb5214e7a829532740ac549cb10770
Artifact URI: artifact://agent-knowledge/let-named-expression.v1.artifact.md
Tags: hard, performance, let, reusable, calculation, calculate, average, sales, region, using, avoid, repeating