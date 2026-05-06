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
  "version": 1,
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
    "sourceRunId": "2026-05-03T16-14-51.099Z",
    "benchmarkCaseId": "countifs-date-range",
    "failureCodes": [
      "INVALID_SCHEMA"
    ],
    "generatedAt": "2026-05-03T16:14:51.104Z"
  },
  "storage": {
    "contentHash": "0x7d78edf7caae969413376ce135b6306271a4d7af32215a4c9521c985e0764ca2",
    "artifactUri": "artifact://agent-knowledge/countifs-date-range.v1.artifact.md"
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
Source run: 2026-05-03T16-14-51.099Z
Benchmark case: countifs-date-range
Generated at: 2026-05-03T16:14:51.104Z
Failure codes:
- INVALID_SCHEMA

## Version Metadata
Artifact ID: 0x06b79f4937ecf9f299571ac04c97b9a586b271c86d5ee7c73c618dfb94562663
Version: 1
Schema version: 1
Content hash: 0x7d78edf7caae969413376ce135b6306271a4d7af32215a4c9521c985e0764ca2
Artifact URI: artifact://agent-knowledge/countifs-date-range.v1.artifact.md
Tags: easy, aggregation, countifs, date range, date, range, count, rows, where, between, 2024, status