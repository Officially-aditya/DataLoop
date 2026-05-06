---
{
  "artifactId": "0x92fc86587d4ba8f0695450a0fe0fd484e114de7d936d5f0bd9620a31f2741feb",
  "benchmarkCaseId": "index-match-2d",
  "title": "INDEX MATCH for 2D lookup",
  "domain": "excel-qna",
  "schemaVersion": 1,
  "issuePattern": "In a grid A1:D10 with months across top, products down side, sales in middle, lookup Q1 sales for 'Widget' row and 'Jan' column.",
  "formulaPattern": "=INDEX(B2:D10, MATCH(\"Widget\",A2:A10,0), MATCH(\"Jan\",B1:D1,0))",
  "concepts": [
    "INDEX MATCH",
    "2D lookup"
  ],
  "difficulty": "medium",
  "version": 1,
  "tags": [
    "medium",
    "lookup",
    "index match",
    "2d lookup",
    "index",
    "match",
    "grid",
    "months",
    "across",
    "products",
    "down",
    "side"
  ],
  "resolutionSteps": [
    "INDEX MATCH row and column."
  ],
  "exampleInputs": [
    "In a grid A1:D10 with months across top, products down side, sales in middle, lookup Q1 sales for 'Widget' row and 'Jan' column."
  ],
  "provenance": {
    "sourceRunId": "2026-05-03T16-14-51.099Z",
    "benchmarkCaseId": "index-match-2d",
    "failureCodes": [
      "INVALID_SCHEMA"
    ],
    "generatedAt": "2026-05-03T16:14:51.104Z"
  },
  "storage": {
    "contentHash": "0x3dc4d7a2ccd08ef285e849901aadf15c4e40e13297c250b590d31f5e01d541ba",
    "artifactUri": "artifact://agent-knowledge/index-match-2d.v1.artifact.md"
  }
}
---

# INDEX MATCH for 2D lookup

## Domain
excel-qna

## Question Pattern
In a grid A1:D10 with months across top, products down side, sales in middle, lookup Q1 sales for 'Widget' row and 'Jan' column.

## Formula Pattern
=INDEX(B2:D10, MATCH("Widget",A2:A10,0), MATCH("Jan",B1:D1,0))

## Required Concepts
INDEX MATCH, 2D lookup

## Difficulty
medium

## Recommended Answer
INDEX MATCH row and column.

## Resolution Steps
1. INDEX MATCH row and column.

## Examples
- In a grid A1:D10 with months across top, products down side, sales in middle, lookup Q1 sales for 'Widget' row and 'Jan' column.

## Provenance
Source run: 2026-05-03T16-14-51.099Z
Benchmark case: index-match-2d
Generated at: 2026-05-03T16:14:51.104Z
Failure codes:
- INVALID_SCHEMA

## Version Metadata
Artifact ID: 0x92fc86587d4ba8f0695450a0fe0fd484e114de7d936d5f0bd9620a31f2741feb
Version: 1
Schema version: 1
Content hash: 0x3dc4d7a2ccd08ef285e849901aadf15c4e40e13297c250b590d31f5e01d541ba
Artifact URI: artifact://agent-knowledge/index-match-2d.v1.artifact.md
Tags: medium, lookup, index match, 2d lookup, index, match, grid, months, across, products, down, side