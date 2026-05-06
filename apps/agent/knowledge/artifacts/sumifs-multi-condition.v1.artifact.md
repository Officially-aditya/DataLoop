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
  "version": 1,
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
    "sourceRunId": "2026-05-03T16-14-51.099Z",
    "benchmarkCaseId": "sumifs-multi-condition",
    "failureCodes": [
      "INVALID_SCHEMA"
    ],
    "generatedAt": "2026-05-03T16:14:51.104Z"
  },
  "storage": {
    "contentHash": "0x8e0761ca73950e99f2a91bf9b1ab270057d2cc877f43f0c302c767fad0ffb292",
    "artifactUri": "artifact://agent-knowledge/sumifs-multi-condition.v1.artifact.md"
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
Source run: 2026-05-03T16-14-51.099Z
Benchmark case: sumifs-multi-condition
Generated at: 2026-05-03T16:14:51.104Z
Failure codes:
- INVALID_SCHEMA

## Version Metadata
Artifact ID: 0x0d9987477f34c8c53396be210c860d0ebc2a419863b9854215271484178040a8
Version: 1
Schema version: 1
Content hash: 0x8e0761ca73950e99f2a91bf9b1ab270057d2cc877f43f0c302c767fad0ffb292
Artifact URI: artifact://agent-knowledge/sumifs-multi-condition.v1.artifact.md
Tags: medium, aggregation, sumifs, date criteria, multiple, criteria, sales, table, dates, regions, amounts, what