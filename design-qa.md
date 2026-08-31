# Contact widget design QA

## Reference and implementation

- Reference: `/workspace/scratch/7e23f648fc68/upload/0bb2b49f-9168-42d9-a18e-8bab0ba4a4ac.png` (320 × 127 px)
- Implementation: `/workspace/scratch/7e23f648fc68/wingfoildahab/components/contact-widget.js`
- Extracted production icon: `/workspace/scratch/7e23f648fc68/wingfoildahab/assets/contact-widget-icon.png` (108 × 112 px, transparent PNG)

## States checked

- Russian home page, desktop 1363 × 936: widget rendered at bottom right; measured 186.8 × 62 px at x=1139.2, y=852.
- Click behavior: smooth scroll reached `#booking-form`, updated the URL hash and focused the first form input.
- English internal page: click navigated to `/#booking-form-en`.
- Mobile breakpoint up to 640 px: 54 px touch target, 12 px right/safe-area bottom offset, compact 12 px label; on article pages the widget moves to 78 px above the fixed WhatsApp CTA.
- Reduced-motion preference: scroll and button transition are disabled.

## Visual comparison

The implementation follows the selected reference: orange circular chat icon, white outline artwork, dark rectangular label with a small pointer, and the text `Записаться`. The English locale uses `Book now`. The icon and label remain visible without covering the primary mobile CTA.

## Result

**Passed.** No actionable layout, interaction, localization, or accessibility issues found.
