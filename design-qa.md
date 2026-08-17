# Design QA — Russian desktop baseline

- Source visual truth: `https://wingfoildahab.com/ru`
- Implementation: local `/ru/` preview in the cloud browser
- Viewport: 1363 × 936 CSS px, device density 1
- Source page: 1363 × 17955 px rendered document
- Implementation page: 1363 × 17955 px rendered document
- State: desktop, fixed navigation visible, hero carousel loaded
- Browser evidence: source and implementation were captured in separate cloud-browser tabs at the same viewport.

## Full-view comparison evidence

Browser measurements match exactly for viewport, total document height, 90 px fixed header geometry, black body background, Raleway font stack, title, navigation labels and destinations. The hero can show a different carousel slide when captures are taken at different moments; this is expected state variance, not layout drift.

## Focused-region comparison evidence

The header and hero were compared at 1363 × 936. Header bounds match at x=0, y=0, width=1348, height=90. Typography, palette, logo, social icons, language controls, hero text, technical badge and CTA layout use the source markup and styles. Additional focused regions were unnecessary for this baseline because the same captured page renders at the same full document height.

## Required fidelity surfaces

- Fonts and typography: passed — Raleway stack, sizes, weights, wrapping and hierarchy are preserved.
- Spacing and layout rhythm: passed — fixed header and rendered page geometry match.
- Colors and visual tokens: passed — source styles and opacity layers are preserved.
- Image quality and asset fidelity: passed — original images, logo, icons and carousel assets are used.
- Copy and content: passed — Russian content and navigation labels are identical.

## Primary interactions tested

- Fixed desktop navigation and in-page anchors are present.
- Equipment, organizers, windsurfing, social and language destinations are preserved.
- Hero carousel and Windguru widget initialize.

## Console check

No page-breaking application errors. One browser-extension metadata error is external to the page. Windguru emits one deprecation warning from its third-party iframe.

## Findings

- No actionable P0/P1/P2 visual differences in the desktop baseline.
- Header migration: passed — the fixed header no longer depends on its former Tilda HTML block or inline assembly script.
- P3: the remaining page still contains Tilda runtime and remote asset references. Every replacement must retain this baseline visually.

## Comparison history

- Earlier prototype was rejected because it was a redesign rather than a clone.
- Fix: restored the exact current Russian page as the visual baseline.
- Post-fix evidence: equal 1363 × 17955 geometry, equal 90 px header, and equal font, background and navigation properties.
- Header component iteration: replaced the Tilda header record with an independent component and local logo/social assets.
- Header post-fix evidence: source and component both render at x=0, y=0, 1348 × 90; both logos render at x=40, y=18.125, 110 × 45.75; navigation labels and full document height are unchanged. The Training anchor resolves to the exact expected 7445 px scroll position.

## Implementation checklist

1. Convert the hero while preserving the baseline.
2. Localize original hero assets without changing crop or dimensions.
3. Re-run same-viewport comparison after the hero conversion.
4. Address mobile only after desktop remains identical.

final result: passed
