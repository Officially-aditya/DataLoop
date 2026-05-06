---
{
  "artifactId": "0xa1884af29d00a3f4fe84ee2c727b5f7896110a1bf36c34f492672f0ab09c7ac2",
  "benchmarkCaseId": "broken-range-copy",
  "title": "Formula breaks when copied across columns",
  "domain": "excel-qna",
  "schemaVersion": 1,
  "issuePattern": "Formula =SUM(A1:A10) copied to B1 becomes SUM(A1:A10). Why and fix?",
  "formulaPattern": "=SUM($A1:$A10)",
  "concepts": [
    "relative ranges"
  ],
  "difficulty": "easy",
  "version": 1,
  "tags": [
    "easy",
    "debugging",
    "relative ranges",
    "formula",
    "breaks",
    "when",
    "copied",
    "across",
    "columns",
    "becomes"
  ],
  "resolutionSteps": [
    "Relative range issue."
  ],
  "exampleInputs": [
    "Formula =SUM(A1:A10) copied to B1 becomes SUM(A1:A10). Why and fix?"
  ],
  "provenance": {
    "sourceRunId": "2026-05-03T16-14-51.099Z",
    "benchmarkCaseId": "broken-range-copy",
    "failureCodes": [
      "INVALID_SCHEMA"
    ],
    "generatedAt": "2026-05-03T16:14:51.104Z"
  },
  "storage": {
    "contentHash": "0x6f5b3580281954c7d85fd5d8164a9445ddc5c5b0325d2be1cff8fd51c624e6aa",
    "artifactUri": "artifact://agent-knowledge/broken-range-copy.v1.artifact.md"
  }
}
---

# Formula breaks when copied across columns

## Domain
excel-qna

## Question Pattern
Formula =SUM(A1:A10) copied to B1 becomes SUM(A1:A10). Why and fix?

## Formula Pattern
=SUM($A1:$A10)

## Required Concepts
relative ranges

## Difficulty
easy

## Recommended Answer
Relative range issue.

## Resolution Steps
1. Relative range issue.

## Examples
- Formula =SUM(A1:A10) copied to B1 becomes SUM(A1:A10). Why and fix?

## Provenance
Source run: 2026-05-03T16-14-51.099Z
Benchmark case: broken-range-copy
Generated at: 2026-05-03T16:14:51.104Z
Failure codes:
- INVALID_SCHEMA

## Version Metadata
Artifact ID: 0xa1884af29d00a3f4fe84ee2c727b5f7896110a1bf36c34f492672f0ab09c7ac2
Version: 1
Schema version: 1
Content hash: 0x6f5b3580281954c7d85fd5d8164a9445ddc5c5b0325d2be1cff8fd51c624e6aa
Artifact URI: artifact://agent-knowledge/broken-range-copy.v1.artifact.md
Tags: easy, debugging, relative ranges, formula, breaks, when, copied, across, columns, becomes