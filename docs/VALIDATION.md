# MVP validation record

[English](VALIDATION.md) · [简体中文](VALIDATION.zh-CN.md)

This is the historical v0.1.0 validation record from 2026-10-20, not proof of current deployment or CI status. See [launch validation](LAUNCH-VALIDATION.md) for the launch-kit checks.

## Local automated checks

Windows, Node.js 22.19.0: `npm.cmd run check` passed all 20 tests in the project directory and built the standalone page without third-party packages.

Coverage includes BOM and malformed JSON/HAR inputs, size/count limits, empty inputs; removal of credentials, bodies and metadata; repeated parameters, encoded paths, literal replacement words and common email/ID patterns; retained arbitrary path text, invalid URLs, numbers and times; immutable input, prototype-like keys, status/P95 calculation, Markdown escaping and report truncation; matching CSP hashes, reproducible output, no external script/style/API calls and no input assigned to `innerHTML`.

An earlier build check found that `$&` in string replacement could alter embedded code and invalidate CSP hashes. Replacement callbacks fixed the issue and the regression passed.

## Browser checks

The following checks used local HTTP preview in the Codex in-app browser.

| Action | Result |
| --- | --- |
| Load the synthetic demo | Six requests, three failed/no-response, two slow, P95 3,800 ms |
| Import `examples/synthetic-demo.har` through the file chooser | Read and analyzed successfully |
| Download sanitized HAR, Markdown and AI TXT | Three files saved; request counts and content checked; no sample credentials remained |
| Inspect sanitized preview and AI material | Valid JSON; AI material separates facts from hypotheses |
| Add literal replacement word `shop` | Original hostname disappeared, replaced by `redacted.invalid` |
| Change rules or threshold | Old exports hidden until regeneration; no slow requests at 5,000 ms |
| Enter malformed JSON | Clear error; prior results removed |
| Disable the findings-only filter | All six requests shown |
| Switch tabs with the right-arrow key | Correct `aria-selected` state on sanitized preview |
| Include `img`/`script` markup in URLs or bodies | No image nodes or script dialogs appeared |
| Open guide and research pages | Navigation and content visible |
| Desktop viewport, 1440 × 1050 | Inspected and screenshot saved |
| Mobile viewport, 390 × 844 | Document client/scroll width both 375; table scrolls independently |
| Console | No warning/error entries |
| HTTP entry and source paths | App returned 200; README path returned 404 |

All input was synthetic. No business logs were uploaded and no model was called.

## Limits and unverified behavior

- The standalone HTML has no external resources/imports, but double-click execution was not tested: browser automation blocked `file://` access and that restriction was not bypassed. App flows passed over local HTTP.
- Other browsers/operating systems were not fully tested. Mobile checks used a responsive viewport, not a physical device.
- The original local checks preceded GitHub remote setup and remote CI. Consult the PR and Actions for current delivery status.
- No user interviews, acquisition or paid-demand validation were performed.
- Automatic redaction can miss business details. Review exports before sharing.

## Run locally

Run `npm start` (`npm.cmd start` in PowerShell) and open the printed local URL. The original standalone page is `dist/index.html`. Users can verify direct file execution themselves. If clipboard access is blocked, download TXT or copy manually.
