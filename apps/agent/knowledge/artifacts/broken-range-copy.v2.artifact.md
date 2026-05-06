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
  "version": 2,
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
    "sourceRunId": "2026-05-03T16-16-56.271Z",
    "benchmarkCaseId": "broken-range-copy",
    "failureCodes": [
      "FORMULA_MISMATCH",
      "MISSING_CONCEPTS"
    ],
    "generatedAt": "2026-05-03T16:16:56.278Z"
  },
  "storage": {
    "contentHash": "0x1a3aac2c8780a24689059bae882e4538fd7da774d6a6d23efa0872bf456e8da3",
    "artifactUri": "artifact://agent-knowledge/broken-range-copy.v2.artifact.md"
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
Source run: 2026-05-03T16-16-56.271Z
Benchmark case: broken-range-copy
Generated at: 2026-05-03T16:16:56.278Z
Failure codes:
- FORMULA_MISMATCH
- MISSING_CONCEPTS

## Version Metadata
Artifact ID: 0xa1884af29d00a3f4fe84ee2c727b5f7896110a1bf36c34f492672f0ab09c7ac2
Version: 2
Schema version: 1
Content hash: 0x1a3aac2c8780a24689059bae882e4538fd7da774d6a6d23efa0872bf456e8da3
Artifact URI: artifact://agent-knowledge/broken-range-copy.v2.artifact.md
Tags: easy, debugging, relative ranges, formula, breaks, when, copied, across, columns, becomes