---
{
  "artifactId": "0x528aff9290a034a9c78306c7e27517edc2a1ff1cf754839227c7509bda6b59b0",
  "benchmarkCaseId": "xlookup-basics",
  "title": "Basic XLOOKUP lookup",
  "domain": "excel-qna",
  "schemaVersion": 1,
  "issuePattern": "Given a table with employee names in column A and salaries in column B, what formula in cell D1 looks up the salary for 'John Doe' from A1:B10?",
  "formulaPattern": "=XLOOKUP(\"John Doe\", A1:A10, B1:B10)",
  "concepts": [
    "XLOOKUP",
    "exact match"
  ],
  "difficulty": "easy",
  "version": 1,
  "tags": [
    "easy",
    "lookup",
    "xlookup",
    "exact match",
    "basic",
    "given",
    "table",
    "employee",
    "names",
    "column",
    "salaries",
    "what"
  ],
  "resolutionSteps": [
    "Use XLOOKUP to find the salary for the exact match."
  ],
  "exampleInputs": [
    "Given a table with employee names in column A and salaries in column B, what formula in cell D1 looks up the salary for 'John Doe' from A1:B10?"
  ],
  "provenance": {
    "sourceRunId": "2026-05-03T16-14-51.099Z",
    "benchmarkCaseId": "xlookup-basics",
    "failureCodes": [
      "INVALID_SCHEMA"
    ],
    "generatedAt": "2026-05-03T16:14:51.104Z"
  },
  "storage": {
    "contentHash": "0xd0f502925e92a2abb87309b2383f5f9d1c6c9bf6ad43befeb3f921f6374d738d",
    "artifactUri": "artifact://agent-knowledge/xlookup-basics.v1.artifact.md"
  }
}
---

# Basic XLOOKUP lookup

## Domain
excel-qna

## Question Pattern
Given a table with employee names in column A and salaries in column B, what formula in cell D1 looks up the salary for 'John Doe' from A1:B10?

## Formula Pattern
=XLOOKUP("John Doe", A1:A10, B1:B10)

## Required Concepts
XLOOKUP, exact match

## Difficulty
easy

## Recommended Answer
Use XLOOKUP to find the salary for the exact match.

## Resolution Steps
1. Use XLOOKUP to find the salary for the exact match.

## Examples
- Given a table with employee names in column A and salaries in column B, what formula in cell D1 looks up the salary for 'John Doe' from A1:B10?

## Provenance
Source run: 2026-05-03T16-14-51.099Z
Benchmark case: xlookup-basics
Generated at: 2026-05-03T16:14:51.104Z
Failure codes:
- INVALID_SCHEMA

## Version Metadata
Artifact ID: 0x528aff9290a034a9c78306c7e27517edc2a1ff1cf754839227c7509bda6b59b0
Version: 1
Schema version: 1
Content hash: 0xd0f502925e92a2abb87309b2383f5f9d1c6c9bf6ad43befeb3f921f6374d738d
Artifact URI: artifact://agent-knowledge/xlookup-basics.v1.artifact.md
Tags: easy, lookup, xlookup, exact match, basic, given, table, employee, names, column, salaries, what