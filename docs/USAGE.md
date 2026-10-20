# Usage guide

[English](USAGE.md) · [简体中文](USAGE.zh-CN.md)

Open [the workbench](https://nyxorbithq.github.io/local-utility-lab/) after Pages deployment, or open `dist/har-workbench.html` locally. No account or dependency installation is required. The current interface is Chinese; use the labels below.

For local HTTP preview, run `npm start` (`npm.cmd start` on Windows) and open the printed URL. See [deployment](DEPLOYMENT.md) for first publication.

1. Export a HAR from Chrome/Edge DevTools **Network** while reproducing an issue. Only process authorized files.
2. Click **Try synthetic demo** for fictional traffic, or **Drop a HAR file or click to select** to select a HAR. **Paste HAR JSON** expands the paste area.
3. Add optional case-sensitive literal words under **Extra replacement words**, one per line: customer names, project names, etc. These stay in the page.
4. Set **Slow threshold**, then click **Generate report**.
5. **Request evidence** lists failed/slow requests. Clear **Only failed and slow requests** to show all requests. Observations do not establish root causes.
6. Review **Sanitized preview**, the full sanitized HAR. Change replacement words and regenerate if business details remain. Changing rules invalidates old exports.
7. Download **Download sanitized HAR**, **Download Markdown**, or **Download TXT** under **AI-ready material**. Copying AI material does not call a model; you decide whether and where to send it.

### Privacy and troubleshooting

- The page does not upload HARs or persist history. External navigation and feedback submission are your choice.
- Automatic redaction may miss arbitrary names, hostnames or business patterns. Inspect the actual output.
- Bodies are removed, HTTP versions normalized, and invalid start times replaced. Output is not suitable for exact replay.
- Limit: 20 MiB / 20,000 requests. Split large exports in DevTools. Errors do not produce partial exports.
- If clipboard access is blocked, the text is selected for manual copy; downloading TXT is another option.
- **Clear file** removes the active input from page state. It does not erase files you downloaded or shared elsewhere.

Use [the feedback template](https://github.com/NyxorbitHQ/local-utility-lab/issues/new?template=feedback.yml). Say what task you tried, whether you finished, and what you used before. **Never attach real HARs or private URLs.**

### Interface label reference

The steps above use translated names. This table maps them to the current Chinese interface.

| English name | On-screen label |
| --- | --- |
| Try synthetic demo | 试用虚构示例 |
| Drop a HAR file or click to select | 拖入 HAR 文件，或点击选择 |
| Paste HAR JSON | 也可以粘贴 HAR JSON |
| Extra replacement words | 额外替换词 |
| Slow threshold | 慢请求阈值 |
| Generate report | 生成脱敏报告 |
| Request evidence | 请求线索 |
| Only failed and slow requests | 只看异常与慢请求 |
| Sanitized preview | 脱敏预览 |
| Download sanitized HAR | 下载脱敏 HAR |
| Download Markdown | 下载 Markdown |
| Download TXT | 下载 TXT |
| AI-ready material | AI 分析材料 |
| Clear file | 清除文件 |
