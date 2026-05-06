---
{
  "artifactId": "0x5e64ae78ec60439b64a38cdd18c51944cbe0ea6b0897ac7d3f48bcf7a7d6972d",
  "benchmarkCaseId": "filter-dynamic-array",
  "title": "FILTER spilled array",
  "domain": "excel-qna",
  "schemaVersion": 1,
  "issuePattern": "Filter sales table A:C for amounts >1000, return region and amount columns.",
  "formulaPattern": "=FILTER(B:C, C:C>1000)",
  "concepts": [
    "FILTER",
    "spill"
  ],
  "difficulty": "medium",
  "version": 1,
  "tags": [
    "medium",
    "dynamic arrays",
    "filter",
    "spill",
    "spilled",
    "array",
    "sales",
    "table",
    "amounts",
    "1000",
    "return",
    "region"
  ],
  "resolutionSteps": [
    "Dynamic array FILTER."
  ],
  "exampleInputs": [
    "Filter sales table A:C for amounts >1000, return region and amount columns."
  ],
  "provenance": {
    "sourceRunId": "2026-05-03T16-14-51.099Z",
    "benchmarkCaseId": "filter-dynamic-array",
    "failureCodes": [
      "INVALID_SCHEMA"
    ],
    "generatedAt": "2026-05-03T16:14:51.104Z"
  },
  "storage": {
    "contentHash": "0x26438e7ca090712008e77d5e43ed552459aa45aca0d0e3fcc144e4950ef40233",
    "artifactUri": "artifact://agent-knowledge/filter-dynamic-array.v1.artifact.md"
  }
}
---

# FILTER spilled array

## Domain
excel-qna

## Question Pattern
Filter sales table A:C for amounts >1000, return region and amount columns.

## Formula Pattern
=FILTER(B:C, C:C>1000)

## Required Concepts
FILTER, spill

## Difficulty
medium

## Recommended Answer
Dynamic array FILTER.

## Resolution Steps
1. Dynamic array FILTER.

## Examples
- Filter sales table A:C for amounts >1000, return region and amount columns.

## Provenance
Source run: 2026-05-03T16-14-51.099Z
Benchmark case: filter-dynamic-array
Generated at: 2026-05-03T16:14:51.104Z
Failure codes:
- INVALID_SCHEMA

## Version Metadata
Artifact ID: 0x5e64ae78ec60439b64a38cdd18c51944cbe0ea6b0897ac7d3f48bcf7a7d6972d
Version: 1
Schema version: 1
Content hash: 0x26438e7ca090712008e77d5e43ed552459aa45aca0d0e3fcc144e4950ef40233
Artifact URI: artifact://agent-knowledge/filter-dynamic-array.v1.artifact.md
Tags: medium, dynamic arrays, filter, spill, spilled, array, sales, table, amounts, 1000, return, region