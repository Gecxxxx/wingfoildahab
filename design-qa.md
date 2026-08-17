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
- `?clean=1` verification mode hides every remaining `.t-rec` block and renders only migrated components; its document height is exactly 936 px at the desktop viewport.
- Independent `/clean/` route contains only the rewritten header and hero components. It has no Tilda records, scripts, stylesheets or runtime references.
- Tripadvisor ticker on `/clean/` matches the source at x=0, y=936, width=1348 and height=50. Its 15-second linear marquee, gradient, typography, review copy and outbound URL are preserved.
- Photo carousel matches the source block at x=0, y=986, width=1348 and height=431. The visible image is centered at x=94, y=1001, width=1160 and height=400; six local slides, 500 ms transitions, 5-second autoplay, arrows and swipe are implemented.
- “Мы находимся в Дахабе” matches the source at x=0, y=1417, width=1348 and height=953.5. Title, two-column layout, four local images, full copy, dividers and buttons are preserved.
- “Наша акватория” matches the source at x=0, y=2370.5, width=1348 and height=956.656. Both local map states, cards, controls and contact action are preserved.
- “Наша команда” matches the source at x=0, y=3327.156, width=1348 and height=1820.047. Six local portraits, two-row card grid, copy, hover states and CTA are preserved.
- “Мы научим вас летать” matches the source at x=0, y=5147.203, width=1348 and height=840.875. Local background, four local icons, glass cards and both actions are preserved.
- “Процесс обучения” matches the source at x=0, y=5988.078, width=1348 and height=1546.547. The four original YouTube videos and desktop grid geometry are preserved; no Tilda runtime is used.
- “Ваш путь к первому полёту” matches the source at x=0, y=7534.625, width=1348 and height=859.594. Four local images, card states, keyboard activation and the detailed modal are implemented.
- “Цены” matches the source at x=0, y=8394.219, width=1348 and height=1414.813. Six local images, price cards, CTAs and the detailed modal are implemented.
- “Пакеты обучения” matches the source at x=0, y=9809.031, width=1348 and height=1541.625. Both tabs, all eleven local package images, card states, form scroll and details modal are implemented.
- Guest gallery matches the source at x=0, y=11350.656, width=1348 and height=981. Thirteen local source images, arrows, dots, five-second autoplay, swipe and Telegram CTA are implemented.
- “Связаться с нами” matches the source at x=0, y=12331.656, width=1348 and height=265.188. The contact trigger, local social icons, links, keyboard support and modal are implemented.
- Contact form matches the source at x=0, y=12596.844, width=1348 and height=547.688. Local source image, required fields, contact-method selector, validation and success state are implemented.
- Reviews match the source at x=0, y=13144.531, width=1348 and height=536.563. Five local avatars, navigation and Tripadvisor link are implemented.
- “Как добраться” matches the source at x=0, y=13681.094, width=1348 and height=888.656 with local source imagery and transfer CTA.
- Hotels match the source at x=0, y=14569.75, width=1348 and height=773. All five local images, tabs, descriptions and Booking links are implemented.
- FAQ matches the source at x=0, y=15342.75, width=1348 and height=733. All seven questions use a working single-open accordion.
- Contacts, forecast, Windguru, map and footer reproduce the source sequence from y=16075.75 through y=17955.391. Contact and footer assets are local; Windguru and Google Maps remain their original external services.

## Console check

No page-breaking application errors. One browser-extension metadata error is external to the page. Windguru emits one deprecation warning from its third-party iframe.

## Findings

- No actionable P0/P1/P2 visual differences in the desktop baseline.
- Header migration: passed — the fixed header no longer depends on its former Tilda HTML block or inline assembly script.
- Hero migration: passed — the first screen no longer depends on its former Tilda record, inline styles, inline handlers or remote image URLs.
- P3: the remaining page still contains Tilda runtime and remote asset references. Every replacement must retain this baseline visually.

## Comparison history

- Earlier prototype was rejected because it was a redesign rather than a clone.
- Fix: restored the exact current Russian page as the visual baseline.
- Post-fix evidence: equal 1363 × 17955 geometry, equal 90 px header, and equal font, background and navigation properties.
- Header component iteration: replaced the Tilda header record with an independent component and local logo/social assets.
- Header post-fix evidence: source and component both render at x=0, y=0, 1348 × 90; both logos render at x=40, y=18.125, 110 × 45.75; navigation labels and full document height are unchanged. The Training anchor resolves to the exact expected 7445 px scroll position.
- Hero component iteration: replaced the Tilda hero record with an independent component, nine local slides and a local decorative rider asset.
- Hero post-fix evidence: source and component both render at x=0, y=0, 1348 × 936. The content grid matches at x=0, y=516, 1348 × 420; the information badge matches at x=40, y=549.875, 620 × 76.171875; the CTA grid matches at x=816.796875, y=720, 491.203125 × 116. The document remains 17955 px tall. Contact modal open/close and training scroll actions were tested.
- Clean-route iteration: added `/clean/` as a separate page instead of hiding legacy records with a query parameter. The route loads only `components/header.*`, `components/hero.*`, local image assets and the Raleway font; the page intentionally ends after the hero.
- Tripadvisor iteration: recreated the first post-hero record as `components/tripadvisor.*`. The clean document is now 986 px tall at 1363 × 936, contains no `.t-rec` elements and loads no Tilda scripts or stylesheets.
- Photo-carousel iteration: recreated the 431 px source carousel as `components/photo-carousel.*` using six downloaded local source images and the source arrow asset.
- Dahab-section iteration: recreated the complete first editorial section as `components/dahab.*` using four downloaded local source images. Its title starts at y=1437 and content wrapper at y=1558, matching the original.
- Aquatory iteration: recreated the interactive satellite/map section as `components/aquatory.*` with three local source assets and working state buttons.
- Team iteration: recreated the full six-person section as `components/team.*` with six local portraits and source-matched animation/hover behavior.
- Fly iteration: recreated the four-benefit section as `components/fly.*` with the local source background and four local source icons.
- Training-process iteration: recreated the source video section as `components/process.*`; the videos remain standard YouTube embeds by design, while all layout and styling are independent of Tilda.
- Training-path iteration: recreated four training-step cards and their modal as `components/steps.*` with local source images.
- Prices iteration: recreated all six price cards and their modal as `components/prices.*` with local source images.
- Packages iteration: recreated both package tabs and the details modal as `components/packages.*` with eleven local source images.
- Guest-gallery iteration: recreated the thirteen-slide guest carousel as `components/guest-gallery.*`; all source images were re-downloaded in full and optimized as local WebP files.
- Asset repair: replaced the truncated images from the original Tilda export with complete source downloads for all eleven package cards and all thirteen gallery slides.
- Contact-intro iteration: recreated the contact heading and full contact modal as `components/contact-intro.*` with local social assets.
- Remaining-page iteration: recreated the form, reviews, directions, hotel tabs, FAQ, contacts, forecast, map and footer as `components/remaining.*` with local source assets.

## Implementation checklist

1. Desktop Russian page conversion is complete from hero through footer.
2. Address mobile only after desktop remains identical.

final result: passed
