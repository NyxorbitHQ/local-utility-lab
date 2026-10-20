# Contributing / 贡献指南

The app is dependency-free and handles sensitive logs locally. Preserve that boundary.

## Standard workflow

1. Open an issue or describe the problem in your PR. Use synthetic examples only.
2. Branch from updated `main`: `feat/<name>`, `fix/<name>` or `chore/<name>`.
3. Change the source in `src/`. Do not hand-edit `dist/index.html`.
4. Run `npm run check` (`npm.cmd run check` in PowerShell).
5. Commit the source and generated artifacts with a focused Conventional Commit.
6. Push the branch and open a Pull Request into `main`.
7. Review the diff and wait for all six CI jobs to pass before merging.

## Review checklist

- No raw HARs, API keys, cookies, private keys or personal data.
- No network upload, analytics or persisted user data in the browser app.
- Display user input with text nodes / value, never HTML interpolation.
- Redaction changes include meaningful synthetic regressions.
- Keep automatic redaction limitations explicit; do not claim confirmed root causes.
- LF source files and regenerated artifacts remain reproducible.
- UI changes are checked in a browser; a successful build is insufficient.

There are no package dependencies to install. CI covers Ubuntu and Windows on Node 20, 22 and 24. Build output is tracked so people can use the standalone page immediately.

Please use English or Chinese for issues and PRs. Do not upload a real log to explain a problem; reduce it to a synthetic case.
