---
version: alpha
name: DataLoop
description: >
  Dark glassmorphic infrastructure console for artifact-augmented AI agents,
  dataset provenance, and 0G-backed decentralised compute workflows.
  The product has two modes: a cinematic landing surface and a dense,
  operational dashboard — both sharing the same glass material, accent system,
  and type scale.
colors:
  # ── Background & Surface ──────────────────────────────────────────────────
  background: "#0A0C10"
  background-mid: "#11161F"
  background-landing: "#05070A"
  surface: "#141821"
  surface-strong: "#0E121A"
  surface-soft: "#1A1F2A"
  surface-code: "#07080B"
  surface-overlay: "#02060C"
  # ── Content on surface ────────────────────────────────────────────────────
  on-surface: "#FFFFFF"
  on-surface-variant: "#94A3B8"
  on-surface-muted: "#64748B"
  # ── Borders ───────────────────────────────────────────────────────────────
  outline: "#94A3B8"
  outline-soft: "#334155"
  outline-glow: "#67E8F9"
  # ── Primary (Cyan) ────────────────────────────────────────────────────────
  primary: "#22D3EE"
  on-primary: "#021014"
  primary-bright: "#DBFCFF"
  primary-kicker: "#67E8F9"
  # ── Secondary (Indigo) ────────────────────────────────────────────────────
  secondary: "#6366F1"
  on-secondary: "#FFFFFF"
  # ── Tertiary (Green) ──────────────────────────────────────────────────────
  tertiary: "#10B981"
  on-tertiary: "#031014"
  # ── Semantic ──────────────────────────────────────────────────────────────
  success: "#10B981"
  on-success-container: "#D4F9EB"
  error: "#F43F5E"
  on-error-container: "#FFD8E0"
  warning: "#F59E0B"
  # ── Specialised text ──────────────────────────────────────────────────────
  code-text: "#D8F8FF"
  landing-heading: "#F8FBFF"
  landing-copy: "#CBD5E1"
typography:
  display-xl:
    fontFamily: Geist
    fontSize: 80px
    fontWeight: "800"
    lineHeight: 0.96
    letterSpacing: "-0.05em"
  display-lg:
    fontFamily: Geist
    fontSize: 56px
    fontWeight: "800"
    lineHeight: 1.04
    letterSpacing: "0em"
  headline-lg:
    fontFamily: Geist
    fontSize: 35px
    fontWeight: "700"
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: "700"
    lineHeight: 1.3
    letterSpacing: "-0.03em"
  title-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: "700"
    lineHeight: 1.35
    letterSpacing: "-0.02em"
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 1.75
    letterSpacing: "0em"
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 1.7
    letterSpacing: "0em"
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 1.6
    letterSpacing: "0em"
  label-lg:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: "800"
    lineHeight: 1.2
    letterSpacing: "0em"
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: "800"
    lineHeight: 1.2
    letterSpacing: "0.12em"
  label-sm:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: "700"
    lineHeight: 1.2
    letterSpacing: "0.16em"
  code-md:
    fontFamily: Consolas
    fontSize: 15px
    fontWeight: "400"
    lineHeight: 1.65
    letterSpacing: "0em"
rounded:
  none: 0px
  xs: 12px
  sm: 16px
  md: 18px
  lg: 22px
  xl: 24px
  xxl: 28px
  panel: 30px
  hero: 32px
  full: 999px
spacing:
  unit: 8px
  hairline: 1px
  xxs: 4px
  xs: 6px
  sm: 10px
  md: 14px
  lg: 18px
  xl: 24px
  xxl: 32px
  section: 48px
  page: 64px
  landing-section: 104px
  container-padding: 24px
  dashboard-gap: 18px
  landing-gap: 42px
  container-max-dashboard: 1380px
  container-max-landing: 1180px
shadows:
  soft: "0 22px 80px rgba(0, 0, 0, 0.35)"
  landing-card: "0 24px 90px rgba(0, 0, 0, 0.36), inset 1px 1px 0 rgba(219, 252, 255, 0.08)"
  nav: "0 18px 50px rgba(0, 0, 0, 0.28)"
  primary-glow: "0 16px 42px rgba(34, 211, 238, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.36)"
  indigo-glow: "0 12px 34px rgba(99, 102, 241, 0.28)"
  cyan-ring: "0 0 0 4px rgba(34, 211, 238, 0.12)"
  orbit-glow: "0 0 44px rgba(34, 211, 238, 0.22)"
elevation:
  base:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface}"
    shadow: none
    backdropBlur: 0px
  raised-glass:
    backgroundColor: "rgba(20, 24, 33, 0.72)"
    textColor: "{colors.on-surface}"
    shadow: "{shadows.soft}"
    backdropBlur: 14px
  strong-glass:
    backgroundColor: "rgba(14, 18, 26, 0.82)"
    textColor: "{colors.on-surface}"
    shadow: "{shadows.soft}"
    backdropBlur: 18px
  landing-glass:
    backgroundColor: "rgba(18, 22, 31, 0.68)"
    textColor: "{colors.on-surface}"
    shadow: "{shadows.landing-card}"
    backdropBlur: 18px
  nav-glass:
    backgroundColor: "rgba(7, 9, 13, 0.78)"
    textColor: "{colors.on-surface}"
    shadow: "{shadows.nav}"
    backdropBlur: 24px
motion:
  duration-fast: 180ms
  duration-standard: 200ms
  duration-reveal: 700ms
  duration-shimmer: 1500ms
  duration-wallet-glow: 2400ms
  duration-float: 5000ms
  duration-orbit-slow: 22000ms
  easing-standard: ease
  easing-emphasized: ease-in-out
  hover-lift: "-1px"
  hover-card-scale: 1.02
components:
  # ── Page wrappers ─────────────────────────────────────────────────────────
  page-background:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface}"
  landing-background:
    backgroundColor: "{colors.background-landing}"
    textColor: "{colors.on-surface}"
  # ── Navigation ────────────────────────────────────────────────────────────
  topbar:
    backgroundColor: "rgba(20, 24, 33, 0.72)"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 14px 18px
    height: 80px
  landing-nav:
    backgroundColor: "rgba(7, 9, 13, 0.78)"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-md}"
    height: 78px
  # ── Buttons ───────────────────────────────────────────────────────────────
  button-primary:
    backgroundColor: "linear-gradient(135deg, #6366F1, #22D3EE)"
    textColor: "#061019"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    height: 48px
    padding: 0 18px
  button-primary-hover:
    backgroundColor: "linear-gradient(135deg, #22D3EE, #10B981)"
  landing-button-primary:
    backgroundColor: "linear-gradient(135deg, #DBFCFF, #22D3EE 56%, #10B981)"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    height: 52px
    padding: 0 22px
  button-secondary:
    backgroundColor: "rgba(255, 255, 255, 0.06)"
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    height: 48px
    padding: 0 18px
  button-tertiary:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    height: 48px
    padding: 0 18px
  # ── Panels & cards ────────────────────────────────────────────────────────
  dashboard-surface:
    backgroundColor: "rgba(20, 24, 33, 0.72)"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.panel}"
    padding: "{spacing.xl}"
  landing-surface:
    backgroundColor: "rgba(18, 22, 31, 0.68)"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xxl}"
  hero-panel:
    backgroundColor: "rgba(20, 24, 33, 0.78)"
    textColor: "{colors.on-surface}"
    typography: "{typography.display-xl}"
    rounded: "{rounded.hero}"
    padding: 36px
  card-metric:
    backgroundColor: "rgba(20, 24, 33, 0.72)"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xxl}"
    padding: 18px 20px
  record-card:
    backgroundColor: "linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.panel}"
    padding: 18px
  detail-cell:
    backgroundColor: "linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    padding: 15px
  agent-answer-card:
    backgroundColor: "linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.025))"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xxl}"
    padding: 20px
  agent-answer-card-featured:
    backgroundColor: "linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.025))"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xxl}"
    padding: 20px
  artifact-card:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 16px
  artifact-card-hover:
    backgroundColor: "rgba(255, 255, 255, 0.065)"
  code-block:
    backgroundColor: "rgba(7, 10, 16, 0.62)"
    textColor: "{colors.code-text}"
    typography: "{typography.code-md}"
    rounded: "{rounded.md}"
    padding: 14px
  # ── Navigation controls ───────────────────────────────────────────────────
  segmented-control:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.full}"
    padding: 6px
  segmented-control-active:
    backgroundColor: "linear-gradient(135deg, rgba(99, 102, 241, 0.26), rgba(34, 211, 238, 0.22))"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 10px 16px
  # ── Form fields ───────────────────────────────────────────────────────────
  input-field:
    backgroundColor: "rgba(7, 10, 16, 0.48)"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 14px 16px
  input-field-focus:
    backgroundColor: "rgba(7, 10, 16, 0.48)"
    textColor: "{colors.on-surface}"
  # ── Badges & chips ────────────────────────────────────────────────────────
  badge:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 6px 10px
  badge-success:
    backgroundColor: "rgba(16, 185, 129, 0.10)"
    textColor: "{colors.on-success-container}"
    rounded: "{rounded.full}"
    padding: 6px 10px
  badge-error:
    backgroundColor: "rgba(244, 63, 94, 0.08)"
    textColor: "{colors.on-error-container}"
    rounded: "{rounded.full}"
    padding: 6px 10px
  # ── Status notices ────────────────────────────────────────────────────────
  status-success:
    backgroundColor: "rgba(16, 185, 129, 0.10)"
    textColor: "{colors.on-success-container}"
    rounded: "{rounded.lg}"
    padding: 14px 16px
  status-error:
    backgroundColor: "rgba(244, 63, 94, 0.08)"
    textColor: "{colors.on-error-container}"
    rounded: "{rounded.lg}"
    padding: 14px 16px
  status-neutral:
    backgroundColor: "rgba(148, 163, 184, 0.06)"
    textColor: "#DBE6F5"
    rounded: "{rounded.lg}"
    padding: 14px 16px
---

## Overview

DataLoop presents itself as a premium Web3 infrastructure product: a dark, glassy operating console for artifact-augmented AI agents, dataset records, wallet state, and on-chain provenance. The visual identity is technical and futuristic while remaining calm enough for extended daily use. It should feel like a developer/data platform with a cinematic landing surface attached — not a generic SaaS dashboard.

The product has two related modes. The **landing experience** is theatrical: full-viewport sections, large type, animated orbit diagrams, neural-grid textures, cyan glow, and bento-style glass panels. The **application workspace** is denser and more utilitarian: a floating pill topbar, segmented controls, glass panels, record cards, status notices, and monospace proof data. Both modes share the same dark glass material, cyan/indigo/green accent system, large border radii, and soft ambient shadows.

The guiding emotional tone is *calm authority* — the product knows what it is doing so the user doesn't have to feel anxious about the infrastructure underneath.

## Colors

The palette is built on near-black space tones and luminous infrastructure accents. Backgrounds should stay between pure black and deep blue-black, with translucent surfaces layered above them. White is used for primary text; slate blue-gray (`#94A3B8`) is used for captions, helper text, disabled labels, and metadata; deep muted slate (`#64748B`) is reserved for truly tertiary information such as timestamps and IDs.

**Primary cyan** (`#22D3EE`) is the product's signature color. Use it for focus rings, landing kickers, active table headers, selected artifact states, wallet-connected glow, and data-flow visuals. Its light cousin `#67E8F9` is the kicker/eyebrow color on the landing. Its pale tint `#DBFCFF` appears in primary button gradients and inset border highlights.

**Secondary indigo** (`#6366F1`) provides the CTA depth in the dashboard. Combined with cyan in a 135° gradient it produces the primary button and the active-segment state on pill controls.

**Tertiary green** (`#10B981`) signals successful connections, confirmed storage, verified provenance, and progress milestones.

**Error coral** (`#F43F5E`) is reserved exclusively for failures, broken pipelines, unavailable providers, and negative baseline comparisons. Warning amber (`#F59E0B`) is used sparingly for non-critical caution states.

Avoid large solid fields of cyan, indigo, or green. Accents should appear as gradients, edge glows, dot indicators, badges, or small active states against dark glass. The most common surface should remain translucent charcoal.

Background gradients layer three radial glows (indigo at upper-left, cyan at upper-right, green at lower-center) over a deep blue-black linear base. These must remain behind the interface glass and never reduce text contrast.

## Typography

Use **Geist** for brand wordmark, navigation, labels, headings, buttons, and compact operational UI. Its geometric precision and tight default spacing give the product a machine-console feel. Use **Inter** for readable paragraphs, panel body content, and helper copy — its balanced proportions handle information-dense screens without fatigue. Use **Consolas** (or a comparable compact monospace) for hashes, formula blocks, chain IDs, storage references, and terminal-style output.

Headings are confident and close-set. The dashboard hero uses very tight display typography (`letter-spacing: -0.05em`, `line-height: 0.96`); landing section headings are still large but slightly more open. Labels are uppercase, small, bold, and widely tracked (`letter-spacing: 0.12em–0.16em`), reinforcing the machine-console aesthetic. Body copy uses generous line height (1.7–1.75) because most screens mix dense data, technical identifiers, and explanatory context.

Font weight is used as a hierarchy signal: `800` for display/brand, `700` for headings and strong labels, `600` for buttons and prominent copy, `400` for all body text.

## Layout & Spacing

The system uses an **8px rhythm**. The dashboard uses 18px gaps between panel cards and a max-width container of 1380px with 24px side padding, positioned beneath a fixed floating topbar (80px height, 16px from viewport edges). The two-column dashboard grid collapses to single-column below 1240px. Buttons become full-width on mobile.

The landing page uses full-width sections with a centered 1180px container and 24px side gutters. Section vertical padding is 104px, providing strong breathing room between content bands. The hero section uses a two-column grid (`1fr / 0.86fr`) with a 42px gap. Hero h1 type is fluid: `clamp(2.8rem, 5.4vw, 5rem)` in the dashboard hero, and a fixed `5rem` on the landing.

Long hashes and formulas wrap or scroll within their containers rather than breaking the layout. Workspace section navs hide their scrollbar on overflow to keep the UI clean.

A fine 88×88px grid texture is layered behind the dashboard content via CSS `background-image` at 3% opacity, masked to a center radial gradient, providing subtle depth cues without competing with content.

## Elevation & Depth

Depth is created through glass, blur, border light, and soft black shadows — never through hard drop shadows or color darkening.

**Raised glass** (standard dashboard panels): `backdrop-filter: blur(14px)`, `background: rgba(20, 24, 33, 0.72)`, border `rgba(255,255,255,0.10)`, shadow `0 22px 80px rgba(0,0,0,0.35)`.

**Strong glass** (modals, focused panels): `backdrop-filter: blur(18px)`, `background: rgba(14, 18, 26, 0.82)`.

**Landing glass** (bento cards, orbit panel, architecture cards): `backdrop-filter: blur(18px)`, `background: rgba(18, 22, 31, 0.68)`, shadow adds an inset cyan highlight `inset 1px 1px 0 rgba(219, 252, 255, 0.08)`.

**Nav glass** (fixed navigation bar): `backdrop-filter: blur(24px)`, `background: rgba(7, 9, 13, 0.78)` — the heaviest blur, to anchor the nav above all content.

Borders are essential for defining glass edges. Use subtle white or slate-alpha borders (`rgba(255,255,255,0.08–0.10)`) for passive surfaces; use cyan borders (`rgba(34,211,238,0.26–0.45)`) only for selected, active, or focused states. Active focus rings use `box-shadow: 0 0 0 4px rgba(34,211,238,0.12)`.

Hover on interactive glass cards applies `transform: scale(1.02)` and shifts the border toward indigo (`rgba(99,102,241,0.26)`). Hover on list rows applies `translateY(-1px)` and the border shifts toward cyan (`rgba(34,211,238,0.28)`).

## Shapes

The shape language is **soft and futuristic**. Pills (`border-radius: 999px`) are used for the floating topbar, workspace tabs, segmented controls, section-nav pills, status chips, badges, buttons, network-status indicators, and orbit-node labels. Panels and large cards use 28–32px radii. Agent answer cards and metric cards use 28px. Standard input fields use 18px — modern without becoming decorative. Brand mark squares use 12–16px rounded square form.

Do not mix sharp enterprise table styling with this system unless the component is explicitly a code or terminal block. Even technical data cells retain rounded containers (`border-radius: 22px`) and soft border treatment.

## Components

**Primary buttons** use a cyan/indigo gradient in the dashboard (`linear-gradient(135deg, #6366F1, #22D3EE)`) and a brighter cyan-to-green gradient on the landing page. They carry dark text (`#061019`), rounded-full geometry, and a subtle indigo glow shadow. On hover they lift `translateY(-1px)`. When the wallet is connected, the primary button enters a looping `wallet-glow` animation (2.4s, ease-in-out), alternating between an indigo glow and an expanding cyan ring.

**Secondary buttons** are translucent (`rgba(255,255,255,0.06)`) with a barely-visible white border. **Tertiary/ghost buttons** are fully transparent with a slate border. **Link buttons** are borderless, padding-free, and colored cyan (`rgba(34,211,238,0.95)`).

**Panels** are the default application container. They use raised-glass elevation, 30px radius, and `24px` internal padding. Panel headers pair an uppercase label (eyebrow) with a compact Geist heading and an optional right-side action.

**Record cards** and **nested cards** show technical entities — tasks, datasets, corrections, artifacts, answers — using a gradient-tinted translucent fill (`linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))`), label/value grids, compact helper text, and monospace identifiers. The result is scannable rather than decorative.

**Segmented controls** and workspace section navs use a pill container with a translucent inactive state and a subtle cyan/indigo gradient active state. Keep active states obvious without changing layout dimensions.

**Input fields** use the darkest translucent background (`rgba(7,10,16,0.48)`), `18px` radius, and a cyan focus ring. Placeholder text appears at 70% opacity of the secondary slate color.

**Status notices** use the same glass material as panels but tint the border and text by tone: success → green, error → coral, neutral → slate. They always appear inline within panel content rather than as floating toasts.

**Empty states** use abstract concentric-ring artwork with a small indigo/cyan gradient center sphere. They stay quiet and non-cartoonish — no character illustrations. Loading states use shimmer bars (animated `background-position` sweep) and chip skeletons that mirror real card dimensions.

**Code and formula blocks** use `rgba(7,10,16,0.62)` background, `18px` radius, Consolas, and the `#D8F8FF` code-text color to distinguish technical content clearly from body prose.

**Landing-specific components** — orbit cards (spinning concentric rings around a glowing core), neural-grid backgrounds (fine 24×24px dot pattern), terminal comparison panels, bento cards, roadmap tiles, and the final CTA band — may be more animated and theatrical. They must still use the same color, blur, border, and type rules as the dashboard. The orbit animation runs at 22s (outer ring) and 30s (inner ring, reverse) using a `linear` ease for a mechanical, continuous feel. Orbit node labels float on a 5s `ease-in-out` loop with staggered delays (0ms, 400ms, 800ms, 1200ms).

## Do's and Don'ts

- **Do** keep the UI dark, glassy, and infrastructure-oriented.
- **Do** use cyan as the main active signal; use indigo and green as supporting accents.
- **Do** preserve strong readability for all body text, formulas, hashes, and status messages.
- **Do** use large radii, translucent surfaces, 1px borders, and soft ambient shadows together as a system.
- **Do** keep dashboard screens denser and more operational than landing screens.
- **Do** use uppercase eyebrow labels with wide letter-spacing to introduce panels and sections.
- **Do** provide clear, action-oriented empty states that guide users to a next step.
- **Don't** use opaque light cards, beige palettes, or generic enterprise blue surfaces.
- **Don't** overuse glow; reserve it for focus rings, active states, important CTAs, and data-flow visuals.
- **Don't** let decorative grids, radial glows, or orbit animations compete with content.
- **Don't** flatten all cards into the same layer; nested technical data needs visible hierarchy.
- **Don't** use red except for failure, errors, unavailable state, or negative comparison examples.
- **Don't** apply heavy drop shadows; use diffused ambient shadows and backdrop blur instead.
- **Don't** rely on color alone for status — pair color with a label or icon.
