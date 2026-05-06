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
  "version": 3,
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
    "Use SUMIFS with date criteria for multi-condition aggregation."
  ],
  "exampleInputs": [
    "In a sales table with dates in A, regions in B, amounts in C, what formula sums sales in 'North' region after 2024-01-01?"
  ],
  "provenance": {
    "sourceRunId": "2026-05-05T07-40-23.544Z",
    "benchmarkCaseId": "sumifs-multi-condition",
    "failureCodes": [
      "MISSING_CONCEPTS"
    ],
    "generatedAt": "2026-05-05T07:40:23.551Z"
  },
  "storage": {
    "contentHash": "0xc7e74764ceea6f758414f48af7192d9e259379a4b4101e0fdcc6b59c6490a998",
    "artifactUri": "artifact://agent-knowledge/sumifs-multi-condition.v3.artifact.md"
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
Use SUMIFS with date criteria for multi-condition aggregation.

## Resolution Steps
1. Use SUMIFS with date criteria for multi-condition aggregation.

## Examples
- In a sales table with dates in A, regions in B, amounts in C, what formula sums sales in 'North' region after 2024-01-01?

## Provenance
Source run: 2026-05-05T07-40-23.544Z
Benchmark case: sumifs-multi-condition
Generated at: 2026-05-05T07:40:23.551Z
Failure codes:
- MISSING_CONCEPTS

## Version Metadata
Artifact ID: 0x0d9987477f34c8c53396be210c860d0ebc2a419863b9854215271484178040a8
Version: 3
Schema version: 1
Content hash: 0xc7e74764ceea6f758414f48af7192d9e259379a4b4101e0fdcc6b59c6490a998
Artifact URI: artifact://agent-knowledge/sumifs-multi-condition.v3.artifact.md
Tags: medium, aggregation, sumifs, date criteria, multiple, criteria, sales, table, dates, regions, amounts, what