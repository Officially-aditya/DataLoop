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
  "version": 2,
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
    "CHOOSE or INDEX."
  ],
  "exampleInputs": [
    "Return column 2 if month=1, column 3 if month=2 from A1:F10."
  ],
  "provenance": {
    "sourceRunId": "2026-05-03T16-16-56.271Z",
    "benchmarkCaseId": "choose-cols",
    "failureCodes": [
      "FORMULA_MISMATCH",
      "MISSING_CONCEPTS"
    ],
    "generatedAt": "2026-05-03T16:16:56.278Z"
  },
  "storage": {
    "contentHash": "0x7f97ea8254cd5f915b5458dd4e1350e4493af21f489e5066d81fe705f2d172ef",
    "artifactUri": "artifact://agent-knowledge/choose-cols.v2.artifact.md"
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
CHOOSE or INDEX.

## Resolution Steps
1. CHOOSE or INDEX.

## Examples
- Return column 2 if month=1, column 3 if month=2 from A1:F10.

## Provenance
Source run: 2026-05-03T16-16-56.271Z
Benchmark case: choose-cols
Generated at: 2026-05-03T16:16:56.278Z
Failure codes:
- FORMULA_MISMATCH
- MISSING_CONCEPTS

## Version Metadata
Artifact ID: 0xc5b5e837a34ea1c0e66f0e8f72665750511daac01a289e8d2f1c0795ab091889
Version: 2
Schema version: 1
Content hash: 0x7f97ea8254cd5f915b5458dd4e1350e4493af21f489e5066d81fe705f2d172ef
Artifact URI: artifact://agent-knowledge/choose-cols.v2.artifact.md
Tags: medium, dynamic, choose, dynamic columns, column, selection, return, month