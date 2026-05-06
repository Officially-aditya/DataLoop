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
  "version": 1,
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
    "sourceRunId": "2026-05-03T16-14-51.099Z",
    "benchmarkCaseId": "lambda-recursive",
    "failureCodes": [
      "INVALID_SCHEMA"
    ],
    "generatedAt": "2026-05-03T16:14:51.104Z"
  },
  "storage": {
    "contentHash": "0x385e1ab45d1c1376e5428081c8f2f580a695289a706cd6f747ecd9885b7ec041",
    "artifactUri": "artifact://agent-knowledge/lambda-recursive.v1.artifact.md"
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
Source run: 2026-05-03T16-14-51.099Z
Benchmark case: lambda-recursive
Generated at: 2026-05-03T16:14:51.104Z
Failure codes:
- INVALID_SCHEMA

## Version Metadata
Artifact ID: 0x25cd184ddb60c4fab717ee123c2ddd9c3f20cbc5fb14be7d0b7457792cfa484d
Version: 1
Schema version: 1
Content hash: 0x385e1ab45d1c1376e5428081c8f2f580a695289a706cd6f747ecd9885b7ec041
Artifact URI: artifact://agent-knowledge/lambda-recursive.v1.artifact.md
Tags: hard, advanced, lambda, running, total, create, using, excel