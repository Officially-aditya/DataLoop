---
{
  "artifactId": "0xbb33419ff96d4866390c44d43a709b401516bde7764dcc49ecfadf30b70268c2",
  "benchmarkCaseId": "spill-range-ref",
  "title": "Reference spilled array range",
  "domain": "excel-qna",
  "schemaVersion": 1,
  "issuePattern": "FILTER in D1 spills to D1:D10. Sum the spilled range in E1.",
  "formulaPattern": "=SUM(D1#)",
  "concepts": [
    "spill reference",
    "#"
  ],
  "difficulty": "medium",
  "version": 3,
  "tags": [
    "medium",
    "dynamic arrays",
    "spill reference",
    "#",
    "reference",
    "spilled",
    "array",
    "range",
    "filter",
    "spills"
  ],
  "resolutionSteps": [
    "Use the spill reference operator # to refer to the full spilled range."
  ],
  "exampleInputs": [
    "FILTER in D1 spills to D1:D10. Sum the spilled range in E1."
  ],
  "provenance": {
    "sourceRunId": "2026-05-05T07-40-23.544Z",
    "benchmarkCaseId": "spill-range-ref",
    "failureCodes": [
      "MISSING_CONCEPTS"
    ],
    "generatedAt": "2026-05-05T07:40:23.552Z"
  },
  "storage": {
    "contentHash": "0xb66058eda9de331039da7989451eac3faf5dd5c34646e31894a4c48e7a325f9b",
    "artifactUri": "artifact://agent-knowledge/spill-range-ref.v3.artifact.md"
  }
}
---

# Reference spilled array range

## Domain
excel-qna

## Question Pattern
FILTER in D1 spills to D1:D10. Sum the spilled range in E1.

## Formula Pattern
=SUM(D1#)

## Required Concepts
spill reference, #

## Difficulty
medium

## Recommended Answer
Use the spill reference operator # to refer to the full spilled range.

## Resolution Steps
1. Use the spill reference operator # to refer to the full spilled range.

## Examples
- FILTER in D1 spills to D1:D10. Sum the spilled range in E1.

## Provenance
Source run: 2026-05-05T07-40-23.544Z
Benchmark case: spill-range-ref
Generated at: 2026-05-05T07:40:23.552Z
Failure codes:
- MISSING_CONCEPTS

## Version Metadata
Artifact ID: 0xbb33419ff96d4866390c44d43a709b401516bde7764dcc49ecfadf30b70268c2
Version: 3
Schema version: 1
Content hash: 0xb66058eda9de331039da7989451eac3faf5dd5c34646e31894a4c48e7a325f9b
Artifact URI: artifact://agent-knowledge/spill-range-ref.v3.artifact.md
Tags: medium, dynamic arrays, spill reference, #, reference, spilled, array, range, filter, spills