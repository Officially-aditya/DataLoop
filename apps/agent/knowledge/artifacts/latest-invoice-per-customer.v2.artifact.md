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
  "version": 2,
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
    "sourceRunId": "2026-05-03T16-16-56.271Z",
    "benchmarkCaseId": "latest-invoice-per-customer",
    "failureCodes": [
      "MISSING_CONCEPTS"
    ],
    "generatedAt": "2026-05-03T16:16:56.278Z"
  },
  "storage": {
    "contentHash": "0x0df773e8cd108ca012bcc249bc8d2468beff2b46cc9b2ef45f363a10d9b7af49",
    "artifactUri": "artifact://agent-knowledge/latest-invoice-per-customer.v2.artifact.md"
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
Source run: 2026-05-03T16-16-56.271Z
Benchmark case: latest-invoice-per-customer
Generated at: 2026-05-03T16:16:56.278Z
Failure codes:
- MISSING_CONCEPTS

## Version Metadata
Artifact ID: 0x35856ad7256de18b909c4d1e089b4615cda7cd0c312bb7e59a1b6367d872f940
Version: 2
Schema version: 1
Content hash: 0x0df773e8cd108ca012bcc249bc8d2468beff2b46cc9b2ef45f363a10d9b7af49
Artifact URI: artifact://agent-knowledge/latest-invoice-per-customer.v2.artifact.md
Tags: hard, task, maxifs, latest, invoice, customer, table, date, find, each