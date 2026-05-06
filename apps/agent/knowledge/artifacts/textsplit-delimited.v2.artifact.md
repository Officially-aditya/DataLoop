---
{
  "artifactId": "0x9f87918d0d9973b2f701a2a9944b58828ae4eb9e648cafc791778d1c34f046d6",
  "benchmarkCaseId": "textsplit-delimited",
  "title": "TEXTSPLIT on pipe-delimited data",
  "domain": "excel-qna",
  "schemaVersion": 1,
  "issuePattern": "Column A has 'Product|Qty|Price', split into B:D in row 1.",
  "formulaPattern": "=TEXTSPLIT(A1,\"|\")",
  "concepts": [
    "TEXTSPLIT"
  ],
  "difficulty": "easy",
  "version": 2,
  "tags": [
    "easy",
    "text",
    "textsplit",
    "pipe",
    "delimited",
    "data",
    "column",
    "product",
    "price",
    "split"
  ],
  "resolutionSteps": [
    "TEXTSPLIT dynamic split."
  ],
  "exampleInputs": [
    "Column A has 'Product|Qty|Price', split into B:D in row 1."
  ],
  "provenance": {
    "sourceRunId": "2026-05-03T16-16-56.271Z",
    "benchmarkCaseId": "textsplit-delimited",
    "failureCodes": [
      "MISSING_CONCEPTS"
    ],
    "generatedAt": "2026-05-03T16:16:56.277Z"
  },
  "storage": {
    "contentHash": "0xe3166d496477f572d7b7247dda70ac63db87651ee694cbf4f0fbcf33048f8dc4",
    "artifactUri": "artifact://agent-knowledge/textsplit-delimited.v2.artifact.md"
  }
}
---

# TEXTSPLIT on pipe-delimited data

## Domain
excel-qna

## Question Pattern
Column A has 'Product|Qty|Price', split into B:D in row 1.

## Formula Pattern
=TEXTSPLIT(A1,"|")

## Required Concepts
TEXTSPLIT

## Difficulty
easy

## Recommended Answer
TEXTSPLIT dynamic split.

## Resolution Steps
1. TEXTSPLIT dynamic split.

## Examples
- Column A has 'Product|Qty|Price', split into B:D in row 1.

## Provenance
Source run: 2026-05-03T16-16-56.271Z
Benchmark case: textsplit-delimited
Generated at: 2026-05-03T16:16:56.277Z
Failure codes:
- MISSING_CONCEPTS

## Version Metadata
Artifact ID: 0x9f87918d0d9973b2f701a2a9944b58828ae4eb9e648cafc791778d1c34f046d6
Version: 2
Schema version: 1
Content hash: 0xe3166d496477f572d7b7247dda70ac63db87651ee694cbf4f0fbcf33048f8dc4
Artifact URI: artifact://agent-knowledge/textsplit-delimited.v2.artifact.md
Tags: easy, text, textsplit, pipe, delimited, data, column, product, price, split