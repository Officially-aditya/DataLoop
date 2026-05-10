# UI Redesign Objective

The current UI should be redesigned into a modern infrastructure-platform workspace: calm, structured, user-centric, and easy to scan. The product should feel closer to a developer/data infrastructure console than a marketing site.

The UI should make the core value obvious:

- Users can ask an agent a question.
- The platform can answer with a raw LLM response.
- The platform can also answer with selected artifacts from the user's library.
- Users can discover artifacts in a marketplace.
- Users can add artifacts to their own library.
- Users can upload custom artifacts.
- Users can directly use library artifacts with the agent.

The redesign should reduce visual confusion by replacing the current top-level header navigation with a persistent sidebar and clearer workspace hierarchy.

## Product Feel

The target experience should feel like an infrastructure product:

- Dense but readable.
- Quiet visual styling.
- Clear left navigation.
- Predictable page structure.
- Strong status visibility.
- Minimal decorative elements.
- More console/workspace than landing page.

References for the general feel:

- Vercel dashboard
- Railway dashboard
- Linear workspace
- Supabase project console
- Cloudflare dashboard
- Datadog-style operational panels

This does not mean copying any of these products directly. The goal is the same level of clarity, hierarchy, and confidence.

## Layout Direction

Use a persistent left sidebar instead of the current top header navigation.

The sidebar should use the current product model: `Agent` and `Artifacts`. Artifacts are the reusable data layer for agents, so the UI should not expose legacy labeling or separate data-pack workspaces. The workspace bubbles should also move into the sidebar as named workspace entries.

The main page should have three stable regions:

- Left sidebar: navigation, workspace switching, user/library entry points.
- Top content bar: current page title, short context, primary action.
- Main workspace: the actual tool, comparison, marketplace, or library view.

Avoid making the UI feel like multiple disconnected demos. The entire product should feel like one platform with multiple connected workspaces.

## Sidebar

The sidebar should become the main navigation surface.

Primary sections:

- Overview
- Agent
- Artifacts
- Marketplace
- Uploads
- Settings

Workspace entries should appear in the sidebar as simple named items, not bubbles in the main content area. Clicking a workspace name should open that workspace in the main content area.

Example sidebar structure:

```text
DataLoop

Workspace
  Excel Agent
  Finance QA
  Excel Artifact Pack

Platform
  Overview
  Agent
  Artifacts
  Marketplace
  Uploads

System
  Wallet
  Settings
```

Sidebar behavior:

- Active item should be visually obvious.
- Icons should be used for primary nav items.
- Workspace names should be text-first and readable.
- Long workspace names should truncate cleanly.
- Sidebar should support collapsed and expanded states later, but the first pass can stay expanded.
- Wallet/network status can sit at the bottom of the sidebar or in the top content bar.

## Main Workspace

The main workspace should be page-specific and focused. Avoid showing too many unrelated panels at once.

Each page should follow a consistent structure:

- Page title.
- One-sentence context.
- Primary action on the right.
- Main content area below.

Example:

```text
Agent
Ask a question and compare raw LLM output with artifact-grounded output.

[Run comparison]
```

The first screen should not be a landing page. It should open directly into the usable product surface.

## Agent Page

The Agent page is the most important demo surface.

It should show a clear user journey:

1. User enters a question.
2. User selects response mode.
3. User sees two answer versions:
   - Raw LLM
   - With Artifacts
4. User can see which artifacts were used.
5. User can add or remove artifacts from the active context.

Recommended layout:

- Left/main column: question input and response comparison.
- Right context panel: selected artifacts, model/provider status, storage status.

The comparison area should use two side-by-side panels on desktop:

- Raw LLM
- With Artifacts

On mobile, stack these panels vertically.

The "With Artifacts" panel should clearly show:

- Which artifact was used.
- Why it was selected.
- Whether it came from library, marketplace, or upload.
- 0G Storage status if available.
- 0G Compute trace/status if available.

The user should not need to understand backend details to use the page. Technical proof details should be visible but secondary.

## Artifacts Page

Artifacts should represent the user's library.

This page should show artifacts the user has added or uploaded.

Each artifact row/card should include:

- Title
- Domain
- Tags
- Difficulty or confidence
- Source
- Storage status
- Last used
- Primary action: Use with Agent

The page should support:

- Search
- Filter by domain
- Filter by source
- Filter by storage status
- Use artifact with agent
- Remove artifact from library

Use a table or dense list for this page, not large decorative cards.

## Marketplace Page

The marketplace should feel like a catalog of reusable agent capabilities.

Users should be able to:

- Browse available artifacts.
- Search by use case.
- Filter by domain.
- Preview artifact details.
- Add artifact to library.
- Open artifact in Agent.

Marketplace artifact entries should clearly show:

- What problem the artifact helps solve.
- Expected input type.
- Benchmark or quality score if available.
- Usage count if available.
- Creator/source.
- Storage/provenance status.

Adding an artifact to the library should feel like installing a capability into the user's agent workspace.

## Uploads Page

The upload flow should support user-created artifacts.

Users should be able to upload:

- Files
- Structured artifact metadata
- Prompt templates
- Formula examples
- Domain knowledge snippets

The upload page should show:

- Upload dropzone
- Artifact metadata form
- Preview before submit
- Storage destination/status
- Result after upload

After upload, the artifact should be added to the user's library and become usable by the Agent.

## Artifact Data Layer

Artifacts are the product's data layer. Do not expose separate legacy labeling or data-pack pages.

Artifacts page:

- Show installed artifacts.
- Show marketplace artifacts.
- Show uploaded artifacts.
- Show storage status and proof metadata.
- Show which artifacts are available to the agent.
- Let users add, remove, inspect, and upload artifacts without leaving the artifact workspace.

## Overview Page

The Overview page should give a quick platform snapshot.

Useful sections:

- Recent agent runs
- Active artifacts
- Storage status
- Compute status
- Recent uploads
- Suggested marketplace artifacts

Keep this page operational. Avoid marketing copy.

## Visual Style

Use a restrained, modern console style.

Recommended styling:

- Light or neutral dark theme.
- Clear background contrast.
- Subtle borders.
- Small radius, around 6 to 8px.
- Consistent spacing.
- Compact typography.
- Strong empty states.
- Clear loading states.
- Clear error states.

Avoid:

- Large hero sections.
- Decorative gradient backgrounds.
- Oversized cards.
- Floating card sections.
- Too many colors.
- Bubble-style navigation.
- Marketing-style feature blocks.

The UI should prioritize readability and repeated use.

## Information Hierarchy

Every page should make these questions easy to answer:

- Where am I?
- What can I do here?
- What is selected?
- What is running?
- What succeeded or failed?
- What should I do next?

Status indicators should be direct:

- Connected
- Disconnected
- Stored
- Prepared
- Unavailable
- Running
- Failed

Avoid vague copy when a precise status is available.

## Empty States

Empty states should be useful and action-oriented.

Examples:

- No artifacts in library: show "Add from Marketplace" and "Upload Artifact".
- No selected artifact: show "Select an artifact to ground the agent response."
- Backend unavailable: show a clear backend connection error and whether local fallback is being used.
- Wallet mismatch: show the expected network and a switch-network action.

Do not hide backend failures behind demo copy. The user should know whether they are seeing a live result or fallback result.

## Demo Requirements

The UI must clearly demonstrate both versions of the agent answer:

- Raw LLM response.
- Artifact-grounded response.

The user should be able to follow this path without confusion:

1. Open Agent.
2. Ask a question.
3. See raw and artifact-grounded answers.
4. Open Marketplace.
5. Add an artifact to Library.
6. Return to Agent.
7. Use that artifact directly.
8. Upload a custom artifact.
9. Use the uploaded artifact with the Agent.

This flow should feel like one connected product experience, not separate screens stitched together.

## Implementation Checklist

- Replace top navigation with a persistent sidebar.
- Move `Agent` and `Artifacts` into sidebar navigation.
- Move workspace bubbles into sidebar as named workspace entries.
- Add active route/page state to sidebar items.
- Create a consistent page header pattern.
- Make Agent the primary demo page.
- Add side-by-side raw vs artifact response comparison.
- Add a selected-artifacts context panel.
- Make Marketplace a browsable catalog.
- Make Library/Artifacts a dense management page.
- Make Uploads a dedicated page.
- Add clear backend, storage, compute, wallet, and network states.
- Add useful empty states.
- Remove bubble navigation from the main workspace.
- Reduce decorative styling and prioritize readability.

## Success Criteria

The redesign is successful when:

- A new user can understand the product in under one minute.
- The Agent demo flow is obvious without explanation.
- The marketplace-to-library-to-agent loop is visible and usable.
- Raw LLM vs artifact-grounded output is easy to compare.
- Backend and 0G statuses are visible without dominating the interface.
- The UI feels like a real infrastructure platform, not a prototype dashboard.
