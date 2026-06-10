# Prompt: Review & validate UX Checkup modal implementation

## Context

This is the Uxuaria website — a UX consultancy portfolio site built with vanilla HTML/CSS/JS. 
The design system is "retro 3.1": pixel-border buttons, Silkscreen monospace labels, 
`--color-highlight: #C8F135` (lime green) as accent, `border: 3px solid var(--color-text)` 
with `box-shadow: 4px 4px 0 0 var(--color-text)` as the signature retro style.

**Project root:** `/Users/luiscarlosromero/Documents/Uxuaria/website/`

---

## What was just implemented

A two-view modal for the UX Checkup lead-gen flow:

1. **`index.html`**
   - The "Aplicar al UX Checkup" button (inside `<section class="checkup" id="ux-checkup">`) 
     was changed from `<a href="mailto:...">` to `<button id="btn-apply-checkup">`.
   - A full modal was added before `</body>` with id `checkup-modal` and class `ckm-overlay`.
   - The modal has two views:
     - `#ckm-view-info` — info screen with badge, title, checklist, conditions, scarcity, CTA
     - `#ckm-view-form` — Typeform iframe (lazy-loaded on demand via `data-src`)

2. **`styles.css`**  
   New CSS block at the bottom under comment `/* UX CHECKUP MODAL */` with `.ckm-*` classes.

3. **`script.js`**  
   New IIFE under comment `// --- UX Checkup Modal ---` with open/close/view-switch logic.

---

## Your tasks

### 1. Code review

Read the three files and verify:

- [ ] `index.html`: the button `#btn-apply-checkup` is inside `.checkup__content`, 
      the modal `#checkup-modal` is the last element before `</body>`, 
      the iframe has both `src="about:blank"` and `data-src="https://form.typeform.com/to/TYPEFORM_ID"`.
- [ ] `styles.css`: `.ckm-overlay` uses `position: fixed; inset: 0; z-index: 1000`, 
      `.ckm-panel` has `border: 3px solid var(--color-text)` and `box-shadow: 8px 8px 0 0 var(--color-text)`,
      `.ckm-check` uses `background: var(--color-highlight)`.
- [ ] `script.js`: the IIFE guards with `if (!overlay || !openBtn) return`, 
      `formLoaded` flag prevents double-loading the iframe,
      Escape key and overlay-click both close the modal,
      `document.body.style.overflow = 'hidden'` is set on open and cleared on close.

### 2. Consistency check

- Verify the modal's `aria-labelledby="ckm-title"` points to an element with `id="ckm-title"` inside the modal.
- Verify the close button has `aria-label="Cerrar"`.
- Verify the `role="dialog"` and `aria-modal="true"` are on `#checkup-modal`.
- Confirm `aria-hidden="true"` is the default state of the overlay (modal starts closed).

### 3. Style consistency with the design system

- The `.ckm-badge` should use `font-family: 'Silkscreen', monospace` — verify the font is 
  already loaded in `fonts.css` or `<head>`.
- The `.btn--primary` class used on `.ckm-cta` should already be defined in `styles.css` — 
  confirm it exists and doesn't conflict inside the modal's white background context.
- Check that `.btn--white` (used on the section button) and `.btn--primary` (used inside modal) 
  are both defined.

### 4. Fix anything broken

If you find any issues in the above checks, fix them directly in the files. Common things to watch for:
- Missing closing tags or mismatched IDs
- `hidden` attribute on `#ckm-view-form` — should be present by default (modal starts on info view)
- The `is-open` class toggling — make sure CSS transitions work (opacity + transform)
- Mobile: `.ckm-panel` should not overflow on screens < 400px wide

### 5. Spin up a local preview

Run a local HTTP server to preview the result:

```bash
cd /Users/luiscarlosromero/Documents/Uxuaria/website
python3 -m http.server 8080
```

Then take a screenshot or describe what you see at `http://localhost:8080`:
- The UX Checkup section is visible with the button
- Clicking the button opens the modal with the info view
- The modal has the retro border + box-shadow style
- Clicking "Completar la aplicación" switches to the form view
- Clicking the ✕ or pressing Escape closes the modal

### 6. Report

After completing the above, give me a concise summary:
- What you verified ✓
- What you fixed (if anything) and why
- Any open issues or decisions I need to make

---

## Files to read

```
/Users/luiscarlosromero/Documents/Uxuaria/website/index.html
/Users/luiscarlosromero/Documents/Uxuaria/website/styles.css
/Users/luiscarlosromero/Documents/Uxuaria/website/script.js
/Users/luiscarlosromero/Documents/Uxuaria/website/fonts.css
```

## Do NOT touch

- Any existing HTML sections outside `<section class="checkup">` and the modal block
- The CLAUDE.md file
- Any portfolio or blog HTML files
