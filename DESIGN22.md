---
version: alpha
name: DataLoop
description: Dark glassmorphic infrastructure console for artifact-augmented agents, dataset provenance, and 0G-backed agent workflows.
colors:
  primary: "#22D3EE"
  on-primary: "#021014"
  primary-bright: "#DBFCFF"
  secondary: "#6366F1"
  on-secondary: "#FFFFFF"
  tertiary: "#10B981"
  on-tertiary: "#031014"
  neutral: "#94A3B8"
  background: "#0A0C10"
  background-elevated: "#0F131B"
  background-landing: "#05070A"
  surface: "#141821"
  surface-strong: "#0E121A"
  surface-soft: "#1A1F2A"
  surface-code: "#070A10"
  surface-overlay: "#02060C"
  on-surface: "#FFFFFF"
  on-surface-variant: "#94A3B8"
  on-surface-muted: "#64748B"
  outline: "#94A3B8"
  outline-soft: "#334155"
  outline-glow: "#67E8F9"
  success: "#10B981"
  on-success-container: "#D4F9EB"
  error: "#F43F5E"
  on-error-container: "#FFD8E0"
  warning: "#F59E0B"
  code-text: "#D8F8FF"
  landing-heading: "#F8FBFF"
  landing-copy: "#CBD5E1"
typography:
  display-xl:
    fontFamily: Geist
    fontSize: 80px
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.05em"
  display-lg:
    fontFamily: Geist
    fontSize: 56px
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "0em"
  headline-lg:
    fontFamily: Geist
    fontSize: 35px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.03em"
  title-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "-0.02em"
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0em"
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0em"
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  label-lg:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0em"
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.12em"
  label-sm:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.16em"
  code-md:
    fontFamily: Consolas
    fontSize: 15px
    fontWeight: 400
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
  page-background:
    backgroundColor: "{colors.background}"
    textColor: "{colors.on-surface}"
  landing-background:
    backgroundColor: "{colors.background-landing}"
    textColor: "{colors.on-surface}"
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
  button-primary:
    backgroundColor: "linear-gradient(135deg, #6366F1, #22D3EE)"
    textColor: "#061019"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    height: 48px
    padding: 0 18px
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
  input-field:
    backgroundColor: "rgba(7, 10, 16, 0.48)"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 14px 16px
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
  card-metric:
    backgroundColor: "rgba(20, 24, 33, 0.72)"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.xxl}"
    padding: 18px 20px
  panel:
    backgroundColor: "rgba(20, 24, 33, 0.72)"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.panel}"
    padding: 24px
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
  code-block:
    backgroundColor: "rgba(7, 10, 16, 0.62)"
    textColor: "{colors.code-text}"
    typography: "{typography.code-md}"
    rounded: "{rounded.md}"
    padding: 14px
  badge:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.on-surface-variant}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 6px 10px
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
---

## Overview

DataLoop presents itself as a premium Web3 infrastructure product: a dark, glassy operating console for artifact-augmented agents, dataset records, wallet state, and provenance. The visual identity is technical and futuristic, but it remains calm enough for repeated use. It should feel like a developer/data platform with a cinematic landing surface attached, not a generic SaaS dashboard.

The product has two related modes. The landing experience is more dramatic: full-viewport sections, large type, orbit diagrams, neural grid textures, cyan glow, and bento-style glass panels. The application workspace is denser and more utilitarian: fixed navigation, segmented controls, form panels, record cards, status notices, and monospace proof data. Both modes share the same dark glass material, cyan/indigo/green accent system, large radii, and soft shadow depth.

## Colors

The palette is built on near-black space tones and luminous infrastructure accents. Backgrounds should stay between black and deep blue-black, with translucent surfaces layered above them. White is used for primary text; slate blue-gray is used for captions, helper text, disabled labels, and metadata.

Primary cyan is the signature color. Use it for focus rings, landing kickers, active table headers, selected artifact states, and glowing proof/status moments. Indigo gives the dashboard CTAs a more product-like depth. Green represents successful connection, storage, fine-tuning, and verified progress. Coral red is reserved for errors, broken pipelines, unavailable providers, and baseline failure examples.

Avoid large solid fields of cyan, indigo, or green. Accents should appear as gradients, edge glows, badges, dots, or small active states against dark glass. The most common surface should remain translucent charcoal.

## Typography

Use Geist for brand, navigation, labels, headings, buttons, and compact operational UI. Use Inter for readable paragraphs and panel body content. Use Consolas or another compact monospace face for hashes, formulas, terminal blocks, provider traces, chain IDs, and storage references.

Headings are confident and close-set. The dashboard hero can use very tight display typography; landing headings are still large but slightly more open. Labels are uppercase, small, bold, and widely tracked, giving the product a machine-console feel. Body copy uses generous line height because most screens mix dense data, technical identifiers, and explanatory context.

## Layout & Spacing

The system uses an 8px rhythm with frequent 18px gaps in the app workspace and larger 42px to 104px spacing in landing sections. The dashboard is max-width constrained and starts below a fixed floating topbar. Its content is organized with two-column grids on desktop and single-column stacking below tablet widths.

The landing page uses full-width bands with a centered 1180px container. It relies on strong section spacing, bento grids, orbit visuals, comparison tables, and terminal panels. The dashboard relies on cards, nested cards, detail grids, recent-ID lists, and tabbed sub-navigation.

Keep information aligned to predictable grids. Long hashes and formulas should wrap or scroll within their containers rather than breaking the layout. Buttons become full-width on small screens.

## Elevation & Depth

Depth is created through glass, blur, border light, and soft black shadows. Primary app surfaces use translucent charcoal with a 14px to 18px backdrop blur and a large diffused shadow. Landing surfaces use stronger blur and inset cyan highlights to feel more atmospheric.

Borders are essential. Use subtle white or slate borders to define glass edges; use cyan borders only for selected, active, or focused states. Shadows should never feel like flat gray card shadows. They should read as ambient separation in a dark room, often with a faint cyan or indigo glow on active controls.

The background carries atmospheric depth through radial cyan, indigo, and green glows plus a faint grid/noise layer. These textures should remain behind the interface and never reduce text contrast.

## Shapes

The shape language is soft and futuristic. Pills are used for top navigation, workspace tabs, status chips, badges, buttons, and orbit labels. Panels and large cards use 24px to 32px radii. Inputs use 18px radii, enough to feel modern without becoming decorative. Small brand marks use rounded squares with 12px to 16px radii.

Do not mix sharp enterprise table styling with this system unless the component is explicitly a code, terminal, or architecture block. Even technical data cells should retain rounded containers and soft border treatment.

## Components

Primary buttons use a cyan/indigo gradient in the dashboard and a brighter cyan-to-green gradient on the landing page. They should have dark text, rounded-full geometry, and subtle glow. Secondary buttons are translucent, bordered, and white-text. Ghost or tertiary controls stay transparent with a slate border.

Panels are the default application container. They use glass background, blur, soft shadow, large radius, and internal 24px padding. Panel headers pair an uppercase eyebrow with a compact heading and optional right-side action.

Record cards and nested cards show technical entities such as tasks, datasets, corrections, artifacts, and answers. They should use gradient-tinted translucent fills, label/value grids, compact helper text, and monospace identifiers. The result should be scannable rather than decorative.

Segmented controls and workspace section navs use pill containers with a translucent inactive state and a subtle cyan/indigo gradient active state. Keep active states obvious, but avoid changing layout dimensions.

Status notices use the same glass material as panels but tint text and border by tone. Success uses green, error uses coral, and neutral uses slate. Empty states use abstract concentric ring art and a small gradient center, staying quiet and non-cartoonish. Loading states use shimmer bars and chips that mirror real card dimensions.

Landing-specific components include orbit cards, neural grid backgrounds, terminal comparison panels, bento cards, roadmap tiles, and final CTA bands. These may be more animated and theatrical, but they should still use the same color, blur, border, and type rules as the dashboard.

## Do's and Don'ts

- Do keep the UI dark, glassy, and infrastructure-oriented.
- Do use cyan as the main active signal and indigo/green as supporting accents.
- Do preserve strong readability for all body text, formulas, hashes, and status messages.
- Do use large radii, translucent surfaces, 1px borders, and soft ambient shadows together.
- Do keep dashboard screens denser and more operational than landing screens.
- Don't use opaque light cards, beige palettes, or generic enterprise blue surfaces.
- Don't overuse glow; reserve it for focus, active states, important CTAs, and data-flow visuals.
- Don't let decorative grids, radial glows, or orbit animations compete with content.
- Don't flatten all cards into the same layer; nested technical data needs visible hierarchy.
- Don't use red except for failure, errors, unavailable state, or negative baseline examples.
