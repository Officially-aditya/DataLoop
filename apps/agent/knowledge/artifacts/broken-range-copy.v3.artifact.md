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
  "version": 3,
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
    "Use relative ranges carefully; lock the column with $ so the copied formula keeps the intended range."
  ],
  "exampleInputs": [
    "Formula =SUM(A1:A10) copied to B1 becomes SUM(A1:A10). Why and fix?"
  ],
  "provenance": {
    "sourceRunId": "2026-05-05T07-40-23.544Z",
    "benchmarkCaseId": "broken-range-copy",
    "failureCodes": [
      "MISSING_CONCEPTS"
    ],
    "generatedAt": "2026-05-05T07:40:23.552Z"
  },
  "storage": {
    "contentHash": "0xfeac6cedd5ddc88e3f6968adb4ac6316775bd772859c58850a980afc953985d1",
    "artifactUri": "artifact://agent-knowledge/broken-range-copy.v3.artifact.md"
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
Use relative ranges carefully; lock the column with $ so the copied formula keeps the intended range.

## Resolution Steps
1. Use relative ranges carefully; lock the column with $ so the copied formula keeps the intended range.

## Examples
- Formula =SUM(A1:A10) copied to B1 becomes SUM(A1:A10). Why and fix?

## Provenance
Source run: 2026-05-05T07-40-23.544Z
Benchmark case: broken-range-copy
Generated at: 2026-05-05T07:40:23.552Z
Failure codes:
- MISSING_CONCEPTS

## Version Metadata
Artifact ID: 0xa1884af29d00a3f4fe84ee2c727b5f7896110a1bf36c34f492672f0ab09c7ac2
Version: 3
Schema version: 1
Content hash: 0xfeac6cedd5ddc88e3f6968adb4ac6316775bd772859c58850a980afc953985d1
Artifact URI: artifact://agent-knowledge/broken-range-copy.v3.artifact.md
Tags: easy, debugging, relative ranges, formula, breaks, when, copied, across, columns, becomes