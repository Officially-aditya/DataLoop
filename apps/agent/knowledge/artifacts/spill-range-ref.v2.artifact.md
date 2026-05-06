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
  "version": 2,
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
    "sourceRunId": "2026-05-03T16-16-56.271Z",
    "benchmarkCaseId": "spill-range-ref",
    "failureCodes": [
      "MISSING_CONCEPTS"
    ],
    "generatedAt": "2026-05-03T16:16:56.278Z"
  },
  "storage": {
    "contentHash": "0x4e0e164eb0d1bfd860f3eaee35e8ffebcbd6722f03c772475b180cfbeb478345",
    "artifactUri": "artifact://agent-knowledge/spill-range-ref.v2.artifact.md"
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
Source run: 2026-05-03T16-16-56.271Z
Benchmark case: spill-range-ref
Generated at: 2026-05-03T16:16:56.278Z
Failure codes:
- MISSING_CONCEPTS

## Version Metadata
Artifact ID: 0xbb33419ff96d4866390c44d43a709b401516bde7764dcc49ecfadf30b70268c2
Version: 2
Schema version: 1
Content hash: 0x4e0e164eb0d1bfd860f3eaee35e8ffebcbd6722f03c772475b180cfbeb478345
Artifact URI: artifact://agent-knowledge/spill-range-ref.v2.artifact.md
Tags: medium, dynamic arrays, spill reference, #, reference, spilled, array, range, filter, spills