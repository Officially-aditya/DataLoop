---
{
  "artifactId": "0x06b79f4937ecf9f299571ac04c97b9a586b271c86d5ee7c73c618dfb94562663",
  "benchmarkCaseId": "countifs-date-range",
  "title": "COUNTIFS date range",
  "domain": "excel-qna",
  "schemaVersion": 1,
  "issuePattern": "Count rows where date in A is between 2024-01-01 and 2024-03-31, status in B is 'Paid'.",
  "formulaPattern": "=COUNTIFS(A:A,\">=2024-01-01\",A:A,\"<=2024-03-31\",B:B,\"Paid\")",
  "concepts": [
    "COUNTIFS",
    "date range"
  ],
  "difficulty": "easy",
  "version": 3,
  "tags": [
    "easy",
    "aggregation",
    "countifs",
    "date range",
    "date",
    "range",
    "count",
    "rows",
    "where",
    "between",
    "2024",
    "status"
  ],
  "resolutionSteps": [
    "COUNTIFS with date range."
  ],
  "exampleInputs": [
    "Count rows where date in A is between 2024-01-01 and 2024-03-31, status in B is 'Paid'."
  ],
  "provenance": {
    "sourceRunId": "2026-05-05T07-40-23.544Z",
    "benchmarkCaseId": "countifs-date-range",
    "failureCodes": [
      "MISSING_CONCEPTS"
    ],
    "generatedAt": "2026-05-05T07:40:23.551Z"
  },
  "storage": {
    "contentHash": "0x250dd4953d8f9fe88aed17cb3c40b3934ab26cd28c124a881cc899a0db5e9dd4",
    "artifactUri": "artifact://agent-knowledge/countifs-date-range.v3.artifact.md"
  }
}
---

# COUNTIFS date range

## Domain
excel-qna

## Question Pattern
Count rows where date in A is between 2024-01-01 and 2024-03-31, status in B is 'Paid'.

## Formula Pattern
=COUNTIFS(A:A,">=2024-01-01",A:A,"<=2024-03-31",B:B,"Paid")

## Required Concepts
COUNTIFS, date range

## Difficulty
easy

## Recommended Answer
COUNTIFS with date range.

## Resolution Steps
1. COUNTIFS with date range.

## Examples
- Count rows where date in A is between 2024-01-01 and 2024-03-31, status in B is 'Paid'.

## Provenance
Source run: 2026-05-05T07-40-23.544Z
Benchmark case: countifs-date-range
Generated at: 2026-05-05T07:40:23.551Z
Failure codes:
- MISSING_CONCEPTS

## Version Metadata
Artifact ID: 0x06b79f4937ecf9f299571ac04c97b9a586b271c86d5ee7c73c618dfb94562663
Version: 3
Schema version: 1
Content hash: 0x250dd4953d8f9fe88aed17cb3c40b3934ab26cd28c124a881cc899a0db5e9dd4
Artifact URI: artifact://agent-knowledge/countifs-date-range.v3.artifact.md
Tags: easy, aggregation, countifs, date range, date, range, count, rows, where, between, 2024, status