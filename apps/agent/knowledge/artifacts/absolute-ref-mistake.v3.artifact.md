---
{
  "artifactId": "0x0d683372acdfb3fe21e9970cf5629389df116f460a0623767a050dd8b1385a4b",
  "benchmarkCaseId": "absolute-ref-mistake",
  "title": "Fix absolute reference error",
  "domain": "excel-qna",
  "schemaVersion": 1,
  "issuePattern": "Formula =A$1*B1 copied down changes wrong. Why and how to fix for column totals?",
  "formulaPattern": "=A$1*B1 for row copy, =$A1*B1 for column copy, =$A$1*$B1 for fixed.",
  "concepts": [
    "absolute references",
    "$ syntax"
  ],
  "difficulty": "medium",
  "version": 3,
  "tags": [
    "medium",
    "debugging",
    "absolute references",
    "$ syntax",
    "absolute",
    "reference",
    "error",
    "formula",
    "copied",
    "down",
    "changes",
    "wrong"
  ],
  "resolutionSteps": [
    "Use absolute references with $ syntax to control whether rows, columns, or both stay fixed."
  ],
  "exampleInputs": [
    "Formula =A$1*B1 copied down changes wrong. Why and how to fix for column totals?"
  ],
  "provenance": {
    "sourceRunId": "2026-05-05T07-40-23.544Z",
    "benchmarkCaseId": "absolute-ref-mistake",
    "failureCodes": [
      "MISSING_CONCEPTS"
    ],
    "generatedAt": "2026-05-05T07:40:23.551Z"
  },
  "storage": {
    "contentHash": "0x7d44a718c3390e55eacabfe3926c28e7f9a9857d60482f13b32bd0c7a810fe94",
    "artifactUri": "artifact://agent-knowledge/absolute-ref-mistake.v3.artifact.md"
  }
}
---

# Fix absolute reference error

## Domain
excel-qna

## Question Pattern
Formula =A$1*B1 copied down changes wrong. Why and how to fix for column totals?

## Formula Pattern
=A$1*B1 for row copy, =$A1*B1 for column copy, =$A$1*$B1 for fixed.

## Required Concepts
absolute references, $ syntax

## Difficulty
medium

## Recommended Answer
Use absolute references with $ syntax to control whether rows, columns, or both stay fixed.

## Resolution Steps
1. Use absolute references with $ syntax to control whether rows, columns, or both stay fixed.

## Examples
- Formula =A$1*B1 copied down changes wrong. Why and how to fix for column totals?

## Provenance
Source run: 2026-05-05T07-40-23.544Z
Benchmark case: absolute-ref-mistake
Generated at: 2026-05-05T07:40:23.551Z
Failure codes:
- MISSING_CONCEPTS

## Version Metadata
Artifact ID: 0x0d683372acdfb3fe21e9970cf5629389df116f460a0623767a050dd8b1385a4b
Version: 3
Schema version: 1
Content hash: 0x7d44a718c3390e55eacabfe3926c28e7f9a9857d60482f13b32bd0c7a810fe94
Artifact URI: artifact://agent-knowledge/absolute-ref-mistake.v3.artifact.md
Tags: medium, debugging, absolute references, $ syntax, absolute, reference, error, formula, copied, down, changes, wrong