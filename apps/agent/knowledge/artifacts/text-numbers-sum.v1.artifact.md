---
{
  "artifactId": "0x57ab586286cf45880e52ed643e8eb8e00c15271edac0578bce059eceff18727e",
  "benchmarkCaseId": "text-numbers-sum",
  "title": "Sum column with text-formatted numbers",
  "domain": "excel-qna",
  "schemaVersion": 1,
  "issuePattern": "Column A looks like numbers but SUM(A:A) is 0. Fix the formula.",
  "formulaPattern": "=SUM(VALUE(A:A))",
  "concepts": [
    "VALUE"
  ],
  "difficulty": "easy",
  "version": 1,
  "tags": [
    "easy",
    "debugging",
    "value",
    "column",
    "text",
    "formatted",
    "numbers",
    "looks",
    "like",
    "formula"
  ],
  "resolutionSteps": [
    "Text to number conversion."
  ],
  "exampleInputs": [
    "Column A looks like numbers but SUM(A:A) is 0. Fix the formula."
  ],
  "provenance": {
    "sourceRunId": "2026-05-03T16-14-51.099Z",
    "benchmarkCaseId": "text-numbers-sum",
    "failureCodes": [
      "INVALID_SCHEMA"
    ],
    "generatedAt": "2026-05-03T16:14:51.104Z"
  },
  "storage": {
    "contentHash": "0xbe0c55e9994791b2ff19b1be98678a2c4e399cc365cf7d753bcc49d0d383ff19",
    "artifactUri": "artifact://agent-knowledge/text-numbers-sum.v1.artifact.md"
  }
}
---

# Sum column with text-formatted numbers

## Domain
excel-qna

## Question Pattern
Column A looks like numbers but SUM(A:A) is 0. Fix the formula.

## Formula Pattern
=SUM(VALUE(A:A))

## Required Concepts
VALUE

## Difficulty
easy

## Recommended Answer
Text to number conversion.

## Resolution Steps
1. Text to number conversion.

## Examples
- Column A looks like numbers but SUM(A:A) is 0. Fix the formula.

## Provenance
Source run: 2026-05-03T16-14-51.099Z
Benchmark case: text-numbers-sum
Generated at: 2026-05-03T16:14:51.104Z
Failure codes:
- INVALID_SCHEMA

## Version Metadata
Artifact ID: 0x57ab586286cf45880e52ed643e8eb8e00c15271edac0578bce059eceff18727e
Version: 1
Schema version: 1
Content hash: 0xbe0c55e9994791b2ff19b1be98678a2c4e399cc365cf7d753bcc49d0d383ff19
Artifact URI: artifact://agent-knowledge/text-numbers-sum.v1.artifact.md
Tags: easy, debugging, value, column, text, formatted, numbers, looks, like, formula