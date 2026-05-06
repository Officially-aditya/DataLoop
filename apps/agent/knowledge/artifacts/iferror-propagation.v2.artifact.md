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
  "version": 2,
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
    "sourceRunId": "2026-05-03T16-16-56.271Z",
    "benchmarkCaseId": "iferror-propagation",
    "failureCodes": [
      "FORMULA_MISMATCH",
      "MISSING_CONCEPTS"
    ],
    "generatedAt": "2026-05-03T16:16:56.277Z"
  },
  "storage": {
    "contentHash": "0x678adc1c17429bb81591b5b76c44e835f865499c92963b6c68659e850daa1402",
    "artifactUri": "artifact://agent-knowledge/iferror-propagation.v2.artifact.md"
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
Source run: 2026-05-03T16-16-56.271Z
Benchmark case: iferror-propagation
Generated at: 2026-05-03T16:16:56.277Z
Failure codes:
- FORMULA_MISMATCH
- MISSING_CONCEPTS

## Version Metadata
Artifact ID: 0x6d3404ec85975a82bfb89ec4cde44fdbbdbf59f3f04e922818f483a471aebe64
Version: 2
Schema version: 1
Content hash: 0x678adc1c17429bb81591b5b76c44e835f865499c92963b6c68659e850daa1402
Artifact URI: artifact://agent-knowledge/iferror-propagation.v2.artifact.md
Tags: medium, error handling, iferror, handle, lookup, xlookup, returns, next, formula, instead, wrap, without