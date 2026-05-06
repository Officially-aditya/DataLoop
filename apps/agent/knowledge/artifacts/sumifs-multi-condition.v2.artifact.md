---
{
  "artifactId": "0x0d9987477f34c8c53396be210c860d0ebc2a419863b9854215271484178040a8",
  "benchmarkCaseId": "sumifs-multi-condition",
  "title": "SUMIFS with multiple criteria",
  "domain": "excel-qna",
  "schemaVersion": 1,
  "issuePattern": "In a sales table with dates in A, regions in B, amounts in C, what formula sums sales in 'North' region after 2024-01-01?",
  "formulaPattern": "=SUMIFS(C:C, B:B, \"North\", A:A, \">2024-01-01\")",
  "concepts": [
    "SUMIFS",
    "date criteria"
  ],
  "difficulty": "medium",
  "version": 2,
  "tags": [
    "medium",
    "aggregation",
    "sumifs",
    "date criteria",
    "multiple",
    "criteria",
    "sales",
    "table",
    "dates",
    "regions",
    "amounts",
    "what"
  ],
  "resolutionSteps": [
    "SUMIFS for multi-condition aggregation."
  ],
  "exampleInputs": [
    "In a sales table with dates in A, regions in B, amounts in C, what formula sums sales in 'North' region after 2024-01-01?"
  ],
  "provenance": {
    "sourceRunId": "2026-05-03T16-16-56.271Z",
    "benchmarkCaseId": "sumifs-multi-condition",
    "failureCodes": [
      "MISSING_CONCEPTS"
    ],
    "generatedAt": "2026-05-03T16:16:56.277Z"
  },
  "storage": {
    "contentHash": "0xf042d78463f9e7550437be7a5ef515d1320e3b7187260a7f66e0066f917d03f4",
    "artifactUri": "artifact://agent-knowledge/sumifs-multi-condition.v2.artifact.md"
  }
}
---

# SUMIFS with multiple criteria

## Domain
excel-qna

## Question Pattern
In a sales table with dates in A, regions in B, amounts in C, what formula sums sales in 'North' region after 2024-01-01?

## Formula Pattern
=SUMIFS(C:C, B:B, "North", A:A, ">2024-01-01")

## Required Concepts
SUMIFS, date criteria

## Difficulty
medium

## Recommended Answer
SUMIFS for multi-condition aggregation.

## Resolution Steps
1. SUMIFS for multi-condition aggregation.

## Examples
- In a sales table with dates in A, regions in B, amounts in C, what formula sums sales in 'North' region after 2024-01-01?

## Provenance
Source run: 2026-05-03T16-16-56.271Z
Benchmark case: sumifs-multi-condition
Generated at: 2026-05-03T16:16:56.277Z
Failure codes:
- MISSING_CONCEPTS

## Version Metadata
Artifact ID: 0x0d9987477f34c8c53396be210c860d0ebc2a419863b9854215271484178040a8
Version: 2
Schema version: 1
Content hash: 0xf042d78463f9e7550437be7a5ef515d1320e3b7187260a7f66e0066f917d03f4
Artifact URI: artifact://agent-knowledge/sumifs-multi-condition.v2.artifact.md
Tags: medium, aggregation, sumifs, date criteria, multiple, criteria, sales, table, dates, regions, amounts, what