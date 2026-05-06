---
{
  "artifactId": "0x6d3404ec85975a82bfb89ec4cde44fdbbdbf59f3f04e922818f483a471aebe64",
  "benchmarkCaseId": "iferror-propagation",
  "title": "Handle #N/A in lookup chain",
  "domain": "excel-qna",
  "schemaVersion": 1,
  "issuePattern": "XLOOKUP returns #N/A, but next formula needs 0 instead. Wrap without hiding real errors.",
  "formulaPattern": "=IFERROR(XLOOKUP(...),0)",
  "concepts": [
    "IFERROR"
  ],
  "difficulty": "medium",
  "version": 3,
  "tags": [
    "medium",
    "error handling",
    "iferror",
    "handle",
    "lookup",
    "xlookup",
    "returns",
    "next",
    "formula",
    "instead",
    "wrap",
    "without"
  ],
  "resolutionSteps": [
    "IFERROR selective handling."
  ],
  "exampleInputs": [
    "XLOOKUP returns #N/A, but next formula needs 0 instead. Wrap without hiding real errors."
  ],
  "provenance": {
    "sourceRunId": "2026-05-05T07-40-23.544Z",
    "benchmarkCaseId": "iferror-propagation",
    "failureCodes": [
      "MISSING_CONCEPTS"
    ],
    "generatedAt": "2026-05-05T07:40:23.551Z"
  },
  "storage": {
    "contentHash": "0xf940f8cad139d2fc6d0f1f33bea624278330955ad2e6a67f88844526efc4ff61",
    "artifactUri": "artifact://agent-knowledge/iferror-propagation.v3.artifact.md"
  }
}
---

# Handle #N/A in lookup chain

## Domain
excel-qna

## Question Pattern
XLOOKUP returns #N/A, but next formula needs 0 instead. Wrap without hiding real errors.

## Formula Pattern
=IFERROR(XLOOKUP(...),0)

## Required Concepts
IFERROR

## Difficulty
medium

## Recommended Answer
IFERROR selective handling.

## Resolution Steps
1. IFERROR selective handling.

## Examples
- XLOOKUP returns #N/A, but next formula needs 0 instead. Wrap without hiding real errors.

## Provenance
Source run: 2026-05-05T07-40-23.544Z
Benchmark case: iferror-propagation
Generated at: 2026-05-05T07:40:23.551Z
Failure codes:
- MISSING_CONCEPTS

## Version Metadata
Artifact ID: 0x6d3404ec85975a82bfb89ec4cde44fdbbdbf59f3f04e922818f483a471aebe64
Version: 3
Schema version: 1
Content hash: 0xf940f8cad139d2fc6d0f1f33bea624278330955ad2e6a67f88844526efc4ff61
Artifact URI: artifact://agent-knowledge/iferror-propagation.v3.artifact.md
Tags: medium, error handling, iferror, handle, lookup, xlookup, returns, next, formula, instead, wrap, without