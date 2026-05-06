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
  "version": 1,
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
    "Absolute vs relative references."
  ],
  "exampleInputs": [
    "Formula =A$1*B1 copied down changes wrong. Why and how to fix for column totals?"
  ],
  "provenance": {
    "sourceRunId": "2026-05-03T16-14-51.099Z",
    "benchmarkCaseId": "absolute-ref-mistake",
    "failureCodes": [
      "INVALID_SCHEMA"
    ],
    "generatedAt": "2026-05-03T16:14:51.104Z"
  },
  "storage": {
    "contentHash": "0x8c1cb3b61fbbab7d57bd3ccd174bd86a9385dfc3e79b91595e1a7643dc42d31e",
    "artifactUri": "artifact://agent-knowledge/absolute-ref-mistake.v1.artifact.md"
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
Absolute vs relative references.

## Resolution Steps
1. Absolute vs relative references.

## Examples
- Formula =A$1*B1 copied down changes wrong. Why and how to fix for column totals?

## Provenance
Source run: 2026-05-03T16-14-51.099Z
Benchmark case: absolute-ref-mistake
Generated at: 2026-05-03T16:14:51.104Z
Failure codes:
- INVALID_SCHEMA

## Version Metadata
Artifact ID: 0x0d683372acdfb3fe21e9970cf5629389df116f460a0623767a050dd8b1385a4b
Version: 1
Schema version: 1
Content hash: 0x8c1cb3b61fbbab7d57bd3ccd174bd86a9385dfc3e79b91595e1a7643dc42d31e
Artifact URI: artifact://agent-knowledge/absolute-ref-mistake.v1.artifact.md
Tags: medium, debugging, absolute references, $ syntax, absolute, reference, error, formula, copied, down, changes, wrong