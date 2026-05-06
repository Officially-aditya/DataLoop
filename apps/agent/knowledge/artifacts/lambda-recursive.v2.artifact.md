---
{
  "artifactId": "0x25cd184ddb60c4fab717ee123c2ddd9c3f20cbc5fb14be7d0b7457792cfa484d",
  "benchmarkCaseId": "lambda-recursive",
  "title": "LAMBDA for running total",
  "domain": "excel-qna",
  "schemaVersion": 1,
  "issuePattern": "Create running total in B1 using LAMBDA (Excel 365).",
  "formulaPattern": "=LAMBDA(x,IF(x=\"\",SUM($B$1:B1),SUM($B$1:B1)))(A2)",
  "concepts": [
    "LAMBDA"
  ],
  "difficulty": "hard",
  "version": 2,
  "tags": [
    "hard",
    "advanced",
    "lambda",
    "running",
    "total",
    "create",
    "using",
    "excel"
  ],
  "resolutionSteps": [
    "Recursive LAMBDA."
  ],
  "exampleInputs": [
    "Create running total in B1 using LAMBDA (Excel 365)."
  ],
  "provenance": {
    "sourceRunId": "2026-05-03T16-16-56.271Z",
    "benchmarkCaseId": "lambda-recursive",
    "failureCodes": [
      "FORMULA_MISMATCH"
    ],
    "generatedAt": "2026-05-03T16:16:56.278Z"
  },
  "storage": {
    "contentHash": "0xe204fe3f871b96665773a45b58128617b6fbcad6c0f0ce3b082cf2fd565a83a1",
    "artifactUri": "artifact://agent-knowledge/lambda-recursive.v2.artifact.md"
  }
}
---

# LAMBDA for running total

## Domain
excel-qna

## Question Pattern
Create running total in B1 using LAMBDA (Excel 365).

## Formula Pattern
=LAMBDA(x,IF(x="",SUM($B$1:B1),SUM($B$1:B1)))(A2)

## Required Concepts
LAMBDA

## Difficulty
hard

## Recommended Answer
Recursive LAMBDA.

## Resolution Steps
1. Recursive LAMBDA.

## Examples
- Create running total in B1 using LAMBDA (Excel 365).

## Provenance
Source run: 2026-05-03T16-16-56.271Z
Benchmark case: lambda-recursive
Generated at: 2026-05-03T16:16:56.278Z
Failure codes:
- FORMULA_MISMATCH

## Version Metadata
Artifact ID: 0x25cd184ddb60c4fab717ee123c2ddd9c3f20cbc5fb14be7d0b7457792cfa484d
Version: 2
Schema version: 1
Content hash: 0xe204fe3f871b96665773a45b58128617b6fbcad6c0f0ce3b082cf2fd565a83a1
Artifact URI: artifact://agent-knowledge/lambda-recursive.v2.artifact.md
Tags: hard, advanced, lambda, running, total, create, using, excel