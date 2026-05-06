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
  "version": 2,
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
    "sourceRunId": "2026-05-03T16-16-56.271Z",
    "benchmarkCaseId": "date-text-parse",
    "failureCodes": [
      "MISSING_CONCEPTS"
    ],
    "generatedAt": "2026-05-03T16:16:56.277Z"
  },
  "storage": {
    "contentHash": "0x4cfc782b2532e10dbe5b64118c26194c8b1659ca9cf17d014316d72042c0d565",
    "artifactUri": "artifact://agent-knowledge/date-text-parse.v2.artifact.md"
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
Source run: 2026-05-03T16-16-56.271Z
Benchmark case: date-text-parse
Generated at: 2026-05-03T16:16:56.277Z
Failure codes:
- MISSING_CONCEPTS

## Version Metadata
Artifact ID: 0x32c3d19e9cf57d0c4403f005e689a0b6bf6e87432fbf20070b14ec3cdee6e821
Version: 2
Schema version: 1
Content hash: 0x4cfc782b2532e10dbe5b64118c26194c8b1659ca9cf17d014316d72042c0d565
Artifact URI: artifact://agent-knowledge/date-text-parse.v2.artifact.md
Tags: easy, dates, datevalue, parse, text, proper, column, 2024, convert, date