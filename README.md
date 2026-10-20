# Local Utility Lab · 本地工具实验室

**HAR 工作台：在浏览器本地脱敏网络记录，整理失败请求、慢请求和可分享的故障线索。**

Local HAR redaction and evidence reports. No account, no uploads, no model calls. All dependencies are built into Node.js or the browser.

当前版本：`0.1.0`。这是可使用的开源 MVP，尚未完成用户需求验证或验证付费意愿。

仓库：[NyxorbitHQ/local-utility-lab](https://github.com/NyxorbitHQ/local-utility-lab)。代码通过功能分支及 Pull Request 交付。

## 立即使用

直接双击 `dist/index.html`。这是包含样式、逻辑和虚构示例的独立文件，不需要安装 Node.js、不依赖 CDN。复制按钮在浏览器不允许访问剪贴板时会选中内容，供手动复制；也可下载 TXT。

开发／本地 HTTP 预览需要 Node.js 20 或更高版本。无需 `npm install`。

```powershell
Set-Location "$env:USERPROFILE\Documents\code\local-utility-lab"
npm.cmd run check
npm.cmd start
```

打开终端打印的 `http://127.0.0.1:4173`。如端口已占用：`npm.cmd start -- --port 4174`。macOS／Linux 将 `npm.cmd` 换成 `npm`。

## 使用流程

1. 在浏览器开发者工具 Network 中复现问题并导出 HAR。
2. 拖入或选择 `.har`／`.json`，也可以粘贴 HAR JSON；无日志时点击「试用虚构示例」。
3. 填入需要额外隐藏的客户名、项目名等文字，每行一个，采用区分大小写的字面替换。
4. 选择慢请求阈值，生成报告。修改规则会使旧结果失效，需重新生成。
5. 检查「脱敏预览」，下载脱敏 HAR、Markdown 报告，或下载／复制 AI 分析材料。

AI 功能只是整理提示词和经过处理的证据。此工具不调用模型、不提供自动根因判断。你主动将材料粘贴到其他服务后，数据将受该服务的条款约束。

## 已实现

- 允许字段重建 HAR，而非修改原文件；原始对象保持不变。
- 移除请求／响应正文、所有 Cookie、非 Content-Type 头、原始页面与扩展元数据。
- 移除 URL 用户名、密码、片段；隐藏**所有**查询值，保留重复参数和空值。
- 替换常见邮箱、UUID、数字 ID、长令牌，以及在凭据字段中发现的已知值；支持额外替换词。
- HTTP 4xx／5xx／无响应与慢请求清单、状态分布和最近秩法 P95。
- 表格与 Markdown 最多列出 200 条；脱敏 HAR 保留全部已处理请求。
- 格式错误、文件超限、无效地址、空 HAR 的明确处理。
- 桌面／移动布局、键盘可操作页签、读取状态和错误提示。
- 独立 HTML，内容安全策略限制网络连接和外部脚本；无分析服务、Cookie、持久存储。

## 重要边界

**自动脱敏不等于匿名化保证。** 域名、任意路径文字、时间和请求模式仍可能泄露业务信息。分享前必须人工检查；无法通过常见模式覆盖所有个人资料、秘密或编码方式。

- 为保守处理，正文始终移除，可能丢失定位问题需要的信息。
- HTTP 版本统一为 `HTTP/1.1`；缺失／无效开始时间用 Unix epoch 占位；非有限耗时变为 0，缺失计时项用 -1。
- 输出用于分享线索，**不适合精确重放或完整性能分析**。
- 无响应、HTTP 错误和耗时不能单独证明根因。
- 输入最多 20 MiB、20,000 条请求、2,000 种已知敏感值；额外替换词最多 100 个，每个最多 1,000 字符。
- 仅支持 HTTP(S) 地址；其他地址替换为 `https://redacted.invalid/`。
- 本地预览服务只监听 `127.0.0.1`，只提供构建页面，不提供整个项目目录。

所有示例均为虚构数据，使用 `example.com` 域名。请勿将真实 HAR、凭据或客户数据提交到仓库。

## 开发

```text
src/core.mjs          解析、脱敏、统计、报告生成
src/app.mjs           页面交互，用户数据仅通过 textContent / value 渲染
src/demo.mjs          虚构示例
src/index.html       页面模板
src/style.css        响应式样式
scripts/build.mjs    构建独立 HTML，并计算 CSP 内容哈希
scripts/serve.mjs    仅本机使用的静态预览服务
tests/               核心边界与构建测试
dist/index.html      可直接打开的产物
docs/RESEARCH.md     选题、竞品与证据边界
docs/VALIDATION.md   验证记录
docs/EXPERIMENT.md   首批用户实验与商业化判断标准
```

修改后运行 `npm.cmd run check`。不引入第三方运行依赖。`dist/index.html` 和虚构示例由构建生成，不手工编辑。

## 发布状态

项目使用 MIT 许可证。工作流在 Ubuntu / Windows、Node.js 20 / 22 / 24 上运行测试、构建与产物一致性检查，实际状态以 GitHub Actions 和 PR Checks 为准。CI 不自动部署网站或收款。

贡献流程见 [CONTRIBUTING.md](CONTRIBUTING.md)。请勿直接推送 main；使用功能分支提交 PR。

第二候选「字幕 AI 翻译回填」目前只有选题，未实现。先收集 HAR 工具的使用反馈再决定是否继续。

## License

MIT。见 [LICENSE](LICENSE)。
