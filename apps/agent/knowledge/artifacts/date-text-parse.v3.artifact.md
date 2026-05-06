---
{
  "artifactId": "0x32c3d19e9cf57d0c4403f005e689a0b6bf6e87432fbf20070b14ec3cdee6e821",
  "benchmarkCaseId": "date-text-parse",
  "title": "Parse text dates to proper dates",
  "domain": "excel-qna",
  "schemaVersion": 1,
  "issuePattern": "Column A has '01/15/2024' as text, convert to date in B.",
  "formulaPattern": "=DATEVALUE(A1)",
  "concepts": [
    "DATEVALUE"
  ],
  "difficulty": "easy",
  "version": 3,
  "tags": [
    "easy",
    "dates",
    "datevalue",
    "parse",
    "text",
    "proper",
    "column",
    "2024",
    "convert",
    "date"
  ],
  "resolutionSteps": [
    "Use DATEVALUE for date parsing from text to a proper Excel date."
  ],
  "exampleInputs": [
    "Column A has '01/15/2024' as text, convert to date in B."
  ],
  "provenance": {
    "sourceRunId": "2026-05-05T07-40-23.544Z",
    "benchmarkCaseId": "date-text-parse",
    "failureCodes": [
      "MISSING_CONCEPTS"
    ],
    "generatedAt": "2026-05-05T07:40:23.551Z"
  },
  "storage": {
    "contentHash": "0xc41be9a0a552f02789cb4f2155bff646f563df9db0ead1a35374cabeabd9bd6f",
    "artifactUri": "artifact://agent-knowledge/date-text-parse.v3.artifact.md"
  }
}
---

# Parse text dates to proper dates

## Domain
excel-qna

## Question Pattern
Column A has '01/15/2024' as text, convert to date in B.

## Formula Pattern
=DATEVALUE(A1)

## Required Concepts
DATEVALUE

## Difficulty
easy

## Recommended Answer
Use DATEVALUE for date parsing from text to a proper Excel date.

## Resolution Steps
1. Use DATEVALUE for date parsing from text to a proper Excel date.

## Examples
- Column A has '01/15/2024' as text, convert to date in B.

## Provenance
Source run: 2026-05-05T07-40-23.544Z
Benchmark case: date-text-parse
Generated at: 2026-05-05T07:40:23.551Z
Failure codes:
- MISSING_CONCEPTS

## Version Metadata
Artifact ID: 0x32c3d19e9cf57d0c4403f005e689a0b6bf6e87432fbf20070b14ec3cdee6e821
Version: 3
Schema version: 1
Content hash: 0xc41be9a0a552f02789cb4f2155bff646f563df9db0ead1a35374cabeabd9bd6f
Artifact URI: artifact://agent-knowledge/date-text-parse.v3.artifact.md
Tags: easy, dates, datevalue, parse, text, proper, column, 2024, convert, date