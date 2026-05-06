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
  "version": 2,
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
    "SORTBY with MATCH order."
  ],
  "exampleInputs": [
    "Sort A:C by priority column D where 'High'>'Medium'>'Low'."
  ],
  "provenance": {
    "sourceRunId": "2026-05-03T16-16-56.271Z",
    "benchmarkCaseId": "sortby-custom",
    "failureCodes": [
      "MISSING_CONCEPTS"
    ],
    "generatedAt": "2026-05-03T16:16:56.278Z"
  },
  "storage": {
    "contentHash": "0x359e1c9dde74aa74399976f4dcbe262c59b105b927cd7daa6d95ee51a7fc85dc",
    "artifactUri": "artifact://agent-knowledge/sortby-custom.v2.artifact.md"
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
SORTBY with MATCH order.

## Resolution Steps
1. SORTBY with MATCH order.

## Examples
- Sort A:C by priority column D where 'High'>'Medium'>'Low'.

## Provenance
Source run: 2026-05-03T16-16-56.271Z
Benchmark case: sortby-custom
Generated at: 2026-05-03T16:16:56.278Z
Failure codes:
- MISSING_CONCEPTS

## Version Metadata
Artifact ID: 0x514a14141806c8045a7ba0240c71c9e25a2736a9f72be94bda9b37da9ef2a067
Version: 2
Schema version: 1
Content hash: 0x359e1c9dde74aa74399976f4dcbe262c59b105b927cd7daa6d95ee51a7fc85dc
Artifact URI: artifact://agent-knowledge/sortby-custom.v2.artifact.md
Tags: hard, dynamic arrays, sortby, custom sort, custom, order, sort, priority, column, where, high, medium