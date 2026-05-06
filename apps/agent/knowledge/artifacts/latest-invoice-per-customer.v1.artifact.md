---
{
  "artifactId": "0x35856ad7256de18b909c4d1e089b4615cda7cd0c312bb7e59a1b6367d872f940",
  "benchmarkCaseId": "latest-invoice-per-customer",
  "title": "Latest invoice per customer",
  "domain": "excel-qna",
  "schemaVersion": 1,
  "issuePattern": "Table A:Date, B:Customer, C:Invoice#. Find latest invoice# for each customer.",
  "formulaPattern": "=MAXIFS(C:C,B:B,B2)",
  "concepts": [
    "MAXIFS"
  ],
  "difficulty": "hard",
  "version": 1,
  "tags": [
    "hard",
    "task",
    "maxifs",
    "latest",
    "invoice",
    "customer",
    "table",
    "date",
    "find",
    "each"
  ],
  "resolutionSteps": [
    "Task to formula: MAXIFS or FILTER."
  ],
  "exampleInputs": [
    "Table A:Date, B:Customer, C:Invoice#. Find latest invoice# for each customer."
  ],
  "provenance": {
    "sourceRunId": "2026-05-03T16-14-51.099Z",
    "benchmarkCaseId": "latest-invoice-per-customer",
    "failureCodes": [
      "INVALID_SCHEMA"
    ],
    "generatedAt": "2026-05-03T16:14:51.104Z"
  },
  "storage": {
    "contentHash": "0x5c576d56525956446bc844d7aea8b0a465a3d2f831034a58e368e44016cc31a2",
    "artifactUri": "artifact://agent-knowledge/latest-invoice-per-customer.v1.artifact.md"
  }
}
---

# Latest invoice per customer

## Domain
excel-qna

## Question Pattern
Table A:Date, B:Customer, C:Invoice#. Find latest invoice# for each customer.

## Formula Pattern
=MAXIFS(C:C,B:B,B2)

## Required Concepts
MAXIFS

## Difficulty
hard

## Recommended Answer
Task to formula: MAXIFS or FILTER.

## Resolution Steps
1. Task to formula: MAXIFS or FILTER.

## Examples
- Table A:Date, B:Customer, C:Invoice#. Find latest invoice# for each customer.

## Provenance
Source run: 2026-05-03T16-14-51.099Z
Benchmark case: latest-invoice-per-customer
Generated at: 2026-05-03T16:14:51.104Z
Failure codes:
- INVALID_SCHEMA

## Version Metadata
Artifact ID: 0x35856ad7256de18b909c4d1e089b4615cda7cd0c312bb7e59a1b6367d872f940
Version: 1
Schema version: 1
Content hash: 0x5c576d56525956446bc844d7aea8b0a465a3d2f831034a58e368e44016cc31a2
Artifact URI: artifact://agent-knowledge/latest-invoice-per-customer.v1.artifact.md
Tags: hard, task, maxifs, latest, invoice, customer, table, date, find, each