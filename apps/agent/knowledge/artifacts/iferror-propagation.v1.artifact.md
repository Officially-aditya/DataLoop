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
  "version": 1,
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
    "sourceRunId": "2026-05-03T16-14-51.099Z",
    "benchmarkCaseId": "iferror-propagation",
    "failureCodes": [
      "INVALID_SCHEMA"
    ],
    "generatedAt": "2026-05-03T16:14:51.104Z"
  },
  "storage": {
    "contentHash": "0xf5c9ae2b0733d083a6f1f263a12c13de9efb10b568d94a46354ccb437788544c",
    "artifactUri": "artifact://agent-knowledge/iferror-propagation.v1.artifact.md"
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
Source run: 2026-05-03T16-14-51.099Z
Benchmark case: iferror-propagation
Generated at: 2026-05-03T16:14:51.104Z
Failure codes:
- INVALID_SCHEMA

## Version Metadata
Artifact ID: 0x6d3404ec85975a82bfb89ec4cde44fdbbdbf59f3f04e922818f483a471aebe64
Version: 1
Schema version: 1
Content hash: 0xf5c9ae2b0733d083a6f1f263a12c13de9efb10b568d94a46354ccb437788544c
Artifact URI: artifact://agent-knowledge/iferror-propagation.v1.artifact.md
Tags: medium, error handling, iferror, handle, lookup, xlookup, returns, next, formula, instead, wrap, without