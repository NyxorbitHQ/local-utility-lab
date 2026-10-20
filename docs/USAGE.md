# Usage guide / 使用说明

[English](#english) · [简体中文](#简体中文)

## English

Open [the workbench](https://nyxorbithq.github.io/local-utility-lab/) after Pages deployment, or open `dist/har-workbench.html` locally. No account or dependency installation is required. The current interface is Chinese; use the labels below.

For local HTTP preview, run `npm start` (`npm.cmd start` on Windows) and open the printed URL. See [deployment](DEPLOYMENT.md) for first publication.

1. Export a HAR from Chrome/Edge DevTools **Network** while reproducing an issue. Only process authorized files.
2. Click **试用虚构示例** (Try synthetic demo) for fictional traffic, or **拖入 HAR 文件，或点击选择** to select a HAR. **也可以粘贴 HAR JSON** expands the paste area.
3. Add optional case-sensitive literal words under **额外替换词**, one per line: customer names, project names, etc. These stay in the page.
4. Set **慢请求阈值** (Slow threshold), then click **生成脱敏报告** (Generate report).
5. **请求线索** lists failed/slow requests. Clear **只看异常与慢请求** to show all requests. Observations do not establish root causes.
6. Review **脱敏预览**, the full sanitized HAR. Change replacement words and regenerate if business details remain. Changing rules invalidates old exports.
7. Download **下载脱敏 HAR**, **下载 Markdown**, or **下载 TXT** under **AI 分析材料**. Copying AI material does not call a model; you decide whether and where to send it.

### Privacy and troubleshooting

- The page does not upload HARs or persist history. External navigation and feedback submission are your choice.
- Automatic redaction may miss arbitrary names, hostnames or business patterns. Inspect the actual output.
- Bodies are removed, HTTP versions normalized, and invalid start times replaced. Output is not suitable for exact replay.
- Limit: 20 MiB / 20,000 requests. Split large exports in DevTools. Errors do not produce partial exports.
- If clipboard access is blocked, the text is selected for manual copy; downloading TXT is another option.
- **清除文件** removes the active input from page state. It does not erase files you downloaded or shared elsewhere.

Use [the feedback template](https://github.com/NyxorbitHQ/local-utility-lab/issues/new?template=feedback.yml). Say what task you tried, whether you finished, and what you used before. **Never attach real HARs or private URLs.**

## 简体中文

Pages 部署成功后打开[在线工作台](https://nyxorbithq.github.io/local-utility-lab/)，或本地打开 `dist/har-workbench.html`，无需账号或安装依赖。也可运行 `npm.cmd start`，打开打印的地址。首次上线见[部署说明](DEPLOYMENT.md)。

1. 在 Chrome／Edge 开发者工具 Network 中复现问题，导出自己有权处理的 HAR。
2. 点击「试用虚构示例」先体验；也可拖入／选择文件，或展开「也可以粘贴 HAR JSON」。
3. 在「额外替换词」输入客户名、内部项目名等，每行一个。字面替换区分大小写，词表只留在页面中。
4. 选择「慢请求阈值」，点击「生成脱敏报告」。
5. 「请求线索」显示异常与慢请求；取消「只看异常与慢请求」可看全部。线索不等于根因。
6. 检查「脱敏预览」中的完整 HAR；如仍有业务信息，补充替换词并重新生成。规则改变后旧导出失效。
7. 下载 HAR、Markdown，或在「AI 分析材料」中下载 TXT／复制。页面不调用模型，由你决定是否发送给其他服务。

### 隐私与常见问题

- 页面不上传 HAR 或持久保存历史；主动跳转外站、提交反馈由用户决定。
- 自动脱敏可能遗漏普通名字、域名和业务模式，必须检查实际输出。
- 正文移除、HTTP 版本统一、无效时间替换，不适合精确重放。
- 上限 20 MiB／20,000 条请求，过大请先筛选导出。错误输入不生成部分导出。
- 剪贴板受限时会选中文本供手动复制，也可下载 TXT。
- 「清除文件」移除当前页面持有的输入，不删除已下载或分享的文件。

使用 [Issue 模板](https://github.com/NyxorbitHQ/local-utility-lab/issues/new?template=feedback.yml)，说明尝试的任务、是否完成、原来如何处理。**不要附真实 HAR、私密地址或客户资料。**
