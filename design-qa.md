# Design QA

## Comparison target

- Source visual truth: live desktop captures of `https://wingfoildahab.com/ru` at 1363 × 17,955 CSS px and `https://wingfoildahab.com/equipment` at 1363 × 12,973 CSS px.
- Implementation: static checkpoint in `public/` with routes `/`, `/ru`, `/equipment`, and `/equipment-ru`.
- Intended viewport: 1363 × 936 CSS px, device pixel ratio 1.
- State: desktop, initial page state.

## Evidence

- Source captures: opened and inspected in the cloud browser.
- Implementation screenshot: unavailable because the local preview could not be exposed to the cloud browser in this chat.
- HTTP validation: all four routes, `robots.txt`, and `sitemap.xml` returned HTTP 200 from the local server.
- Primary interactions tested: not yet browser-tested on the local implementation.
- Console errors checked: not available without a browser-rendered implementation.
- Full-view comparison: blocked; no implementation screenshot was available.
- Focused region comparison: blocked for the same reason.

## Findings

- [P1] Visual comparison is unavailable
  - Location: all checkpoint routes.
  - Evidence: source pages were captured, but the local preview could not be opened by the cloud browser.
  - Impact: desktop fidelity and interactive parity cannot yet be signed off.
  - Fix: expose the checkpoint through an accessible preview or deployment, capture matching desktop screenshots, and run side-by-side comparison.

- [P2] First checkpoint still depends on Tilda CDN
  - Location: page CSS, scripts, fonts, and some images.
  - Evidence: copied page markup still references `static.tildacdn.com`, `neo.tildacdn.com`, and `thb.tildacdn.com` while local asset migration is in progress.
  - Impact: the checkpoint is not yet independent of Tilda.
  - Fix: finish local asset rewriting and validate every resource before production cutover.

## Required fidelity surfaces

- Fonts and typography: retained from the source markup; visual confirmation blocked.
- Spacing and layout rhythm: retained from the source markup; visual confirmation blocked.
- Colors and visual tokens: retained from the source markup; visual confirmation blocked.
- Image quality and asset fidelity: original source assets are being downloaded; local substitution is incomplete.
- Copy and content: source HTML is retained for the four current routes.

## Implementation checklist

- Expose an accessible preview.
- Finish localizing Tilda CDN dependencies.
- Capture implementation screenshots at 1363 × 936.
- Compare full pages and focused regions against the source captures.
- Test navigation, sliders, FAQ accordions, forms, language switching, and console output.

## Comparison history

- Iteration 1: source captured; static routes created; visual comparison blocked because the implementation preview was not browser-accessible.

final result: blocked
