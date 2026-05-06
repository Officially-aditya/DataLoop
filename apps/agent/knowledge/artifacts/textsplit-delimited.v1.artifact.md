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
  "version": 1,
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
    "sourceRunId": "2026-05-03T16-14-51.099Z",
    "benchmarkCaseId": "textsplit-delimited",
    "failureCodes": [
      "INVALID_SCHEMA"
    ],
    "generatedAt": "2026-05-03T16:14:51.104Z"
  },
  "storage": {
    "contentHash": "0x98a815dfe0827c573c95476ff08ee31507db1b975b33d4724093ad85047ee0a5",
    "artifactUri": "artifact://agent-knowledge/textsplit-delimited.v1.artifact.md"
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
Source run: 2026-05-03T16-14-51.099Z
Benchmark case: textsplit-delimited
Generated at: 2026-05-03T16:14:51.104Z
Failure codes:
- INVALID_SCHEMA

## Version Metadata
Artifact ID: 0x9f87918d0d9973b2f701a2a9944b58828ae4eb9e648cafc791778d1c34f046d6
Version: 1
Schema version: 1
Content hash: 0x98a815dfe0827c573c95476ff08ee31507db1b975b33d4724093ad85047ee0a5
Artifact URI: artifact://agent-knowledge/textsplit-delimited.v1.artifact.md
Tags: easy, text, textsplit, pipe, delimited, data, column, product, price, split