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
  "version": 1,
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
    "Spill reference."
  ],
  "exampleInputs": [
    "FILTER in D1 spills to D1:D10. Sum the spilled range in E1."
  ],
  "provenance": {
    "sourceRunId": "2026-05-03T16-14-51.099Z",
    "benchmarkCaseId": "spill-range-ref",
    "failureCodes": [
      "INVALID_SCHEMA"
    ],
    "generatedAt": "2026-05-03T16:14:51.104Z"
  },
  "storage": {
    "contentHash": "0x06c68a6623d31e43a33f4ed9df8c02248018b2785b48eb19e5ae2b4efaf564f4",
    "artifactUri": "artifact://agent-knowledge/spill-range-ref.v1.artifact.md"
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
Spill reference.

## Resolution Steps
1. Spill reference.

## Examples
- FILTER in D1 spills to D1:D10. Sum the spilled range in E1.

## Provenance
Source run: 2026-05-03T16-14-51.099Z
Benchmark case: spill-range-ref
Generated at: 2026-05-03T16:14:51.104Z
Failure codes:
- INVALID_SCHEMA

## Version Metadata
Artifact ID: 0xbb33419ff96d4866390c44d43a709b401516bde7764dcc49ecfadf30b70268c2
Version: 1
Schema version: 1
Content hash: 0x06c68a6623d31e43a33f4ed9df8c02248018b2785b48eb19e5ae2b4efaf564f4
Artifact URI: artifact://agent-knowledge/spill-range-ref.v1.artifact.md
Tags: medium, dynamic arrays, spill reference, #, reference, spilled, array, range, filter, spills