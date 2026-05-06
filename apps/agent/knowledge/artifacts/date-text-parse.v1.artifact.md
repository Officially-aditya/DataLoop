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
  "version": 1,
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
    "Date parsing."
  ],
  "exampleInputs": [
    "Column A has '01/15/2024' as text, convert to date in B."
  ],
  "provenance": {
    "sourceRunId": "2026-05-03T16-14-51.099Z",
    "benchmarkCaseId": "date-text-parse",
    "failureCodes": [
      "INVALID_SCHEMA"
    ],
    "generatedAt": "2026-05-03T16:14:51.104Z"
  },
  "storage": {
    "contentHash": "0xa75f77e9eece99ca0854fa5a51e2385f3fa5fac7877b98466a66d4d914392bcf",
    "artifactUri": "artifact://agent-knowledge/date-text-parse.v1.artifact.md"
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
Date parsing.

## Resolution Steps
1. Date parsing.

## Examples
- Column A has '01/15/2024' as text, convert to date in B.

## Provenance
Source run: 2026-05-03T16-14-51.099Z
Benchmark case: date-text-parse
Generated at: 2026-05-03T16:14:51.104Z
Failure codes:
- INVALID_SCHEMA

## Version Metadata
Artifact ID: 0x32c3d19e9cf57d0c4403f005e689a0b6bf6e87432fbf20070b14ec3cdee6e821
Version: 1
Schema version: 1
Content hash: 0xa75f77e9eece99ca0854fa5a51e2385f3fa5fac7877b98466a66d4d914392bcf
Artifact URI: artifact://agent-knowledge/date-text-parse.v1.artifact.md
Tags: easy, dates, datevalue, parse, text, proper, column, 2024, convert, date