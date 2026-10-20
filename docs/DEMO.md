# 30-second walkthrough

[English](DEMO.md) · [简体中文](DEMO.zh-CN.md)

[Play walkthrough](https://nyxorbithq.github.io/local-utility-lab/demo/) · [Try the tool](https://nyxorbithq.github.io/local-utility-lab/)

Five screenshot states, six seconds each (30 seconds total). The GIF loops in supporting Markdown viewers; the web version starts only on Play and supports Pause, Previous, Next and Restart. It pauses when the page becomes hidden.

Frames are captured from the real app using the built-in fictional `example.com` HAR, not customer traffic or a continuous video recording. Bilingual captions explain the Chinese interface. The demo does not read user files, call models or trigger automatic downloads.

| Time | Caption |
| --- | --- |
| 00–06s | Start with the built-in synthetic HAR. No account needed. |
| 06–12s | Review failed and slow requests, then inspect the status and timing. |
| 12–18s | Preview the sanitized HAR. Bodies, credentials and query values are removed. |
| 18–24s | Review the AI-ready evidence brief. Nothing is sent to a model. |
| 24–30s | Export HAR or Markdown, then inspect business details before sharing. |

Expected sample results at 2,000 ms: six requests, three failed/no-response, two slow, P95 3,800 ms. These describe the fictional sample only.

Assets: `docs/assets/step-1.jpg` to `step-5.jpg`, `preview.jpg`, `demo.gif`. Build copies five frames to `dist/media/`; no runtime media library. Capture new frames when relevant UI changes. `scripts/make-demo.py` assembles screenshots using Pillow, which is only a media-authoring dependency. Set `DEMO_FONT` to a CJK font on non-Windows systems. Never capture private logs.

![30-second walkthrough](assets/demo.gif)
