---
{
  "artifactId": "0xc5b5e837a34ea1c0e66f0e8f72665750511daac01a289e8d2f1c0795ab091889",
  "benchmarkCaseId": "choose-cols",
  "title": "Dynamic column selection",
  "domain": "excel-qna",
  "schemaVersion": 1,
  "issuePattern": "Return column 2 if month=1, column 3 if month=2 from A1:F10.",
  "formulaPattern": "=INDEX(A1:F10,,CHOOSE(MONTH(TODAY()),2,3))",
  "concepts": [
    "CHOOSE",
    "dynamic columns"
  ],
  "difficulty": "medium",
  "version": 3,
  "tags": [
    "medium",
    "dynamic",
    "choose",
    "dynamic columns",
    "column",
    "selection",
    "return",
    "month"
  ],
  "resolutionSteps": [
    "Use CHOOSE with INDEX for dynamic columns selected by month."
  ],
  "exampleInputs": [
    "Return column 2 if month=1, column 3 if month=2 from A1:F10."
  ],
  "provenance": {
    "sourceRunId": "2026-05-05T07-40-23.544Z",
    "benchmarkCaseId": "choose-cols",
    "failureCodes": [
      "MISSING_CONCEPTS"
    ],
    "generatedAt": "2026-05-05T07:40:23.552Z"
  },
  "storage": {
    "contentHash": "0xf355e721e03bf62a654d9bd036b772feaf4909262cbc9c1f9a7c3711f0a7c0e2",
    "artifactUri": "artifact://agent-knowledge/choose-cols.v3.artifact.md"
  }
}
---

# Dynamic column selection

## Domain
excel-qna

## Question Pattern
Return column 2 if month=1, column 3 if month=2 from A1:F10.

## Formula Pattern
=INDEX(A1:F10,,CHOOSE(MONTH(TODAY()),2,3))

## Required Concepts
CHOOSE, dynamic columns

## Difficulty
medium

## Recommended Answer
Use CHOOSE with INDEX for dynamic columns selected by month.

## Resolution Steps
1. Use CHOOSE with INDEX for dynamic columns selected by month.

## Examples
- Return column 2 if month=1, column 3 if month=2 from A1:F10.

## Provenance
Source run: 2026-05-05T07-40-23.544Z
Benchmark case: choose-cols
Generated at: 2026-05-05T07:40:23.552Z
Failure codes:
- MISSING_CONCEPTS

## Version Metadata
Artifact ID: 0xc5b5e837a34ea1c0e66f0e8f72665750511daac01a289e8d2f1c0795ab091889
Version: 3
Schema version: 1
Content hash: 0xf355e721e03bf62a654d9bd036b772feaf4909262cbc9c1f9a7c3711f0a7c0e2
Artifact URI: artifact://agent-knowledge/choose-cols.v3.artifact.md
Tags: medium, dynamic, choose, dynamic columns, column, selection, return, month