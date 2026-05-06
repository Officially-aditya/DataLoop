---
{
  "artifactId": "0xca0d3d242b4bc7d570c7d92ba601763eafe540ffc017d9e99946c0fe966ab149",
  "benchmarkCaseId": "unique-customers-sales",
  "title": "Unique customers total sales",
  "domain": "excel-qna",
  "schemaVersion": 1,
  "issuePattern": "Sum total sales per unique customer from A:Customer, B:Sale.",
  "formulaPattern": "=SUMPRODUCT(UNIQUE(A:A), SUMIF(A:A,UNIQUE(A:A),B:B))",
  "concepts": [
    "UNIQUE",
    "SUMPRODUCT"
  ],
  "difficulty": "hard",
  "version": 1,
  "tags": [
    "hard",
    "aggregation",
    "unique",
    "sumproduct",
    "customers",
    "total",
    "sales",
    "customer",
    "sale"
  ],
  "resolutionSteps": [
    "SUMPRODUCT with UNIQUE."
  ],
  "exampleInputs": [
    "Sum total sales per unique customer from A:Customer, B:Sale."
  ],
  "provenance": {
    "sourceRunId": "2026-05-03T16-14-51.099Z",
    "benchmarkCaseId": "unique-customers-sales",
    "failureCodes": [
      "INVALID_SCHEMA"
    ],
    "generatedAt": "2026-05-03T16:14:51.104Z"
  },
  "storage": {
    "contentHash": "0xf631944de36591d7674ca9e2a6eefa95d0fbce39aef790ece98ba5dfbb4fa8ea",
    "artifactUri": "artifact://agent-knowledge/unique-customers-sales.v1.artifact.md"
  }
}
---

# Unique customers total sales

## Domain
excel-qna

## Question Pattern
Sum total sales per unique customer from A:Customer, B:Sale.

## Formula Pattern
=SUMPRODUCT(UNIQUE(A:A), SUMIF(A:A,UNIQUE(A:A),B:B))

## Required Concepts
UNIQUE, SUMPRODUCT

## Difficulty
hard

## Recommended Answer
SUMPRODUCT with UNIQUE.

## Resolution Steps
1. SUMPRODUCT with UNIQUE.

## Examples
- Sum total sales per unique customer from A:Customer, B:Sale.

## Provenance
Source run: 2026-05-03T16-14-51.099Z
Benchmark case: unique-customers-sales
Generated at: 2026-05-03T16:14:51.104Z
Failure codes:
- INVALID_SCHEMA

## Version Metadata
Artifact ID: 0xca0d3d242b4bc7d570c7d92ba601763eafe540ffc017d9e99946c0fe966ab149
Version: 1
Schema version: 1
Content hash: 0xf631944de36591d7674ca9e2a6eefa95d0fbce39aef790ece98ba5dfbb4fa8ea
Artifact URI: artifact://agent-knowledge/unique-customers-sales.v1.artifact.md
Tags: hard, aggregation, unique, sumproduct, customers, total, sales, customer, sale