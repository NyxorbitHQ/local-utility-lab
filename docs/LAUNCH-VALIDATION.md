# Launch validation

[English](LAUNCH-VALIDATION.md) · [简体中文](LAUNCH-VALIDATION.zh-CN.md)

Date: 2026-10-20.

- Windows, Node.js 22.19.0: `npm.cmd run check` passed all 20 tests and rebuilt the site. Build regressions cover matching CSP hashes, reproducible standalone output and byte-identical demo images. Core redaction tests remain unchanged.
- Local HTTP browser checks: launch link opened the bilingual walkthrough; Next, Restart, Play and Pause worked. Playback reached `5 / 5 · 30 / 30s` and stopped. The page does not auto-play. Browser warning/error log was empty during these checks.
- Responsive viewport: both the workbench and demo at 390 × 844 had document client/scroll width 375, with no page overflow. This is viewport emulation, not a physical-phone test.
- HTTP checks: app, standalone download, demo and all five JPEGs returned 200 with the expected content types; HEAD had an empty body and correct content length. Source/private routes returned 404; POST returned 405. The server remains loopback-only.
- GIF inspected with Pillow: five frames, total duration 30,000 ms. Screenshots contain only fictional traffic. The GIF is a screenshot walkthrough, not a continuous screen recording.
- Repository content scan removed unrelated candidate-project references from source, generated app, READMEs and research. Public launch documentation has separate English and Chinese files; the workbench UI remains Chinese.

Remote CI is reported on the PR. Publication requires a merge into `main`, GitHub Actions as the Pages source, and a successful deployment workflow. Check the repository for the current release status. No live-production validation, community posting, user interviews or revenue validation is claimed. Direct `file://` execution is not browser-tested; standalone structure and local HTTP behavior are checked. See [historical MVP validation](VALIDATION.md) for earlier application-flow checks and their limits.
