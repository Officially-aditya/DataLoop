# DataLoop Design System

## Visual Direction
The DataLoop interface uses a **minimalist glassmorphism** style with a soft futuristic polish. The mood is airy, flowing, and premium, prioritizing intelligent layouts that feel calm and highly usable.

## Color Palette
A sophisticated palette built on deep neutral tones with elegant accents.

| Role | Color | Hex |
| :--- | :--- | :--- |
| **Background (Deep)** | Space Black | `#0A0C10` |
| **Surface (Glass)** | Obsidian Glass | `rgba(20, 24, 33, 0.7)` |
| **Accent 1** | Electric Indigo | `#6366F1` |
| **Accent 2** | Soft Cyan | `#22D3EE` |
| **Success** | Mint Green | `#10B981` |
| **Alert/Error** | Warm Coral | `#F43F5E` |
| **Text (Primary)** | Pure White | `#FFFFFF` |
| **Text (Secondary)** | Slate Gray | `#94A3B8` |

## Typography
- **Font System:** Modern Sans-Serif (e.g., Inter, Geist, or SF Pro).
- **Headings:** Crisp, confident, and slightly tracking-reduced for a premium feel.
- **Body:** Highly readable with generous line-height (1.6).
- **Hierarchy:** Established through scale and weight, never cluttering the view.

## Spacing & Layout
- **Scale:** 4px baseline grid.
- **Gaps:** Generous whitespace between sections (48px - 80px).
- **Layout:** Card-driven with centered focal points for key tasks.

## Component Rules
### Buttons
- **Primary:** Soft gradient from Indigo to Cyan, rounded-full (pill-shaped), subtle glow on hover.
- **Secondary:** Translucent border with blur, white text.
- **Tertiary:** Ghost style, subtle hover lift.

### Cards
- **Surfaces:** Layered glass with `backdrop-filter: blur(12px)`.
- **Borders:** Ultra-thin (1px) semi-transparent borders to define edges.
- **Corners:** Large radii (24px - 32px) for a soft, modern feel.

### Navigation
- **Top Bar:** Fixed, blurred background, containing wallet connection and network status.
- **Pills:** Segmented controls for switching views (e.g., Tasks vs. Datasets).

## Motion & Interaction
- **Micro-interactions:** Smooth scale up (1.02) on card hover.
- **Transitions:** Delicate opacity and transform fades between pages.
- **Feedback:** Subtle glow animation around the primary button upon wallet connection.

## State Patterns
- **Success:** Minimalist checkmark with a soft green pulse.
- **Error:** Clean coral typography with a "Retry" secondary button.
- **Empty:** Elegant, abstract line-art illustrations representing "No Data".
- **Loading:** Shimmer/Skeleton screens that follow the glassy card structure.

## Do's and Don'ts
- **DO:** Maintain transparency and layering.
- **DO:** Keep text concise.
- **DON'T:** Use heavy drop shadows; use soft glows and blurs instead.
- **DON'T:** Overload with neon; keep accents restrained and purposeful.
