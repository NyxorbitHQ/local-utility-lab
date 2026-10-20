# Local Utility Lab · HAR Workbench

[English](README.md) · [简体中文](README.zh-CN.md)

**Redact a HAR locally, review failed and slow requests, and export a shareable evidence brief.**

For developers, QA engineers and technical support. No account, no HAR upload, no model calls. MIT licensed, with no third-party runtime dependencies.

**[Try online](https://nyxorbithq.github.io/local-utility-lab/) · [30-second walkthrough](https://nyxorbithq.github.io/local-utility-lab/demo/) · [Download standalone HTML](https://nyxorbithq.github.io/local-utility-lab/har-workbench.html) · [Give feedback](https://github.com/NyxorbitHQ/local-utility-lab/issues/new?template=feedback.yml)**

First publication requires enabling GitHub Pages with **GitHub Actions** and merging the launch PR. These URLs become live after a successful deployment; see [deployment instructions](docs/DEPLOYMENT.md).

![30-second bilingual walkthrough using fictional HAR data](docs/assets/demo.gif)

Five real UI states, six seconds each. [Captions and demo notes](docs/DEMO.md). The workbench currently has a Chinese interface; English usage instructions and captions are provided.

The interface is currently Chinese. See the [UI label reference](docs/USAGE.md#interface-label-reference) when following the translated button names below.

## Try it in a minute

1. Open the workbench and click **Try synthetic demo**.
2. See six fictional requests, three failed/no-response requests and two slow requests at the 2,000 ms threshold.
3. Open **Sanitized preview**, then download HAR or Markdown.
4. Inspect the output before sharing. Hostnames, arbitrary path text and request patterns can still reveal business information.

You can also open `dist/har-workbench.html` locally. The sample uses only fictional `example.com` traffic. [Full usage guide](docs/USAGE.md).

## What it does

- Rebuilds a minimal HAR from allowed fields; leaves the original input unchanged.
- Removes credentials, cookies, request/response bodies, unknown headers and original extension metadata.
- Hides every query value; masks common email/ID patterns and extra case-sensitive literal replacement words.
- Lists HTTP 4xx/5xx, no-response and slow requests, plus status distribution and nearest-rank P95.
- Exports sanitized HAR, Markdown evidence and AI-ready text. **It does not call a model or diagnose root causes.**

Chrome already offers basic HAR sanitization, and other tools solve related tasks. This project tests whether combining sanitization, preview and report preparation is convenient. Paid demand has not been validated. See [research](docs/RESEARCH.md).

## Privacy and limitations

**Automatic redaction is not an anonymity guarantee.** Review every export; add replacement words for customer names, project names or other business details.

- Processing stays in the browser. No analytics, cookies, persistent browser storage or automatic model calls.
- Navigation to GitHub/feedback/demo links is an explicit user action. GitHub receives feedback you choose to submit; never include real logs or credentials.
- Bodies are always removed, so useful diagnostic context may be lost.
- HTTP versions are normalized to HTTP/1.1; invalid start times use the Unix epoch. Output is for evidence sharing, not exact replay or full performance analysis.
- Maximum: 20 MiB, 20,000 requests and 2,000 known sensitive values. Up to 100 extra replacement words, each at most 1,000 characters.
- Tables and Markdown show at most 200 findings; sanitized HAR retains all processed requests.

See [security notes](SECURITY.md) and [validation](docs/VALIDATION.md).

## Run locally / develop

Node.js 20+; **no `npm install` needed**.

```sh
npm run check
npm start
```

On Windows PowerShell, use `npm.cmd`. Open the printed `http://127.0.0.1:4173`. For another port: `npm start -- --port 4174`. The server only exposes a fixed set of built site files on loopback.

Edit `src/`, then regenerate tracked `dist/` with `npm run build`. Six CI jobs cover Ubuntu/Windows with Node 20/22/24 and verify generated artifacts. Browser checks remain necessary for UI changes. Use a feature branch and PR; see [contributing](CONTRIBUTING.md).

## Launch material

[All documentation](docs/README.md)

- [Usage guide](docs/USAGE.md)
- [30-second demo](docs/DEMO.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Post drafts](docs/PROMOTION.md)
- [Two-week validation plan](docs/EXPERIMENT.md)

The promotion kit does not publish posts or collect usage telemetry.

## License

[MIT](LICENSE).
