---
{
  "artifactId": "0x514a14141806c8045a7ba0240c71c9e25a2736a9f72be94bda9b37da9ef2a067",
  "benchmarkCaseId": "sortby-custom",
  "title": "SORTBY with custom order",
  "domain": "excel-qna",
  "schemaVersion": 1,
  "issuePattern": "Sort A:C by priority column D where 'High'>'Medium'>'Low'.",
  "formulaPattern": "=SORTBY(A:C, MATCH(D:D,{\"High\";\"Medium\";\"Low\"},0))",
  "concepts": [
    "SORTBY",
    "custom sort"
  ],
  "difficulty": "hard",
  "version": 3,
  "tags": [
    "hard",
    "dynamic arrays",
    "sortby",
    "custom sort",
    "custom",
    "order",
    "sort",
    "priority",
    "column",
    "where",
    "high",
    "medium"
  ],
  "resolutionSteps": [
    "Use SORTBY with MATCH to implement a custom sort order."
  ],
  "exampleInputs": [
    "Sort A:C by priority column D where 'High'>'Medium'>'Low'."
  ],
  "provenance": {
    "sourceRunId": "2026-05-05T07-40-23.544Z",
    "benchmarkCaseId": "sortby-custom",
    "failureCodes": [
      "MISSING_CONCEPTS"
    ],
    "generatedAt": "2026-05-05T07:40:23.552Z"
  },
  "storage": {
    "contentHash": "0x5971e2b34581b86fce350bf018a8fb8e4efdc0d22a728c978c2220badc655819",
    "artifactUri": "artifact://agent-knowledge/sortby-custom.v3.artifact.md"
  }
}
---

# SORTBY with custom order

## Domain
excel-qna

## Question Pattern
Sort A:C by priority column D where 'High'>'Medium'>'Low'.

## Formula Pattern
=SORTBY(A:C, MATCH(D:D,{"High";"Medium";"Low"},0))

## Required Concepts
SORTBY, custom sort

## Difficulty
hard

## Recommended Answer
Use SORTBY with MATCH to implement a custom sort order.

## Resolution Steps
1. Use SORTBY with MATCH to implement a custom sort order.

## Examples
- Sort A:C by priority column D where 'High'>'Medium'>'Low'.

## Provenance
Source run: 2026-05-05T07-40-23.544Z
Benchmark case: sortby-custom
Generated at: 2026-05-05T07:40:23.552Z
Failure codes:
- MISSING_CONCEPTS

## Version Metadata
Artifact ID: 0x514a14141806c8045a7ba0240c71c9e25a2736a9f72be94bda9b37da9ef2a067
Version: 3
Schema version: 1
Content hash: 0x5971e2b34581b86fce350bf018a8fb8e4efdc0d22a728c978c2220badc655819
Artifact URI: artifact://agent-knowledge/sortby-custom.v3.artifact.md
Tags: hard, dynamic arrays, sortby, custom sort, custom, order, sort, priority, column, where, high, medium