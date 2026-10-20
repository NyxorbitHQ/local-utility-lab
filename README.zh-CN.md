# Local Utility Lab · HAR 工作台

[English](README.md) · [简体中文](README.zh-CN.md)

**在浏览器本地脱敏 HAR，查看失败与慢请求，导出可分享的故障线索报告。**

面向开发、测试和技术支持人员。无需账号，不上传 HAR，不调用模型；MIT 开源，无第三方运行依赖。

**[在线试用](https://nyxorbithq.github.io/local-utility-lab/) · [30 秒演示](https://nyxorbithq.github.io/local-utility-lab/demo/) · [下载单文件](https://nyxorbithq.github.io/local-utility-lab/har-workbench.html) · [提供反馈](https://github.com/NyxorbitHQ/local-utility-lab/issues/new?template=feedback.yml)**

首次上线需将 GitHub Pages 设置为 **GitHub Actions**，并合并推广准备 PR。部署成功后链接才生效，见[部署说明](docs/DEPLOYMENT.zh-CN.md)。

![使用虚构 HAR 的 30 秒双语演示](docs/assets/demo.gif)

五个真实页面状态，每帧六秒。[字幕和演示说明](docs/DEMO.zh-CN.md)。当前工作台界面为中文，配有英文使用说明和字幕。

## 一分钟体验

1. 打开工作台，点击「试用虚构示例」。
2. 查看六条虚构请求，其中三条异常／无响应、两条超过 2,000 ms。
3. 打开「脱敏预览」，下载 HAR 或 Markdown。
4. 分享前人工检查；域名、任意路径文字和请求模式仍可能包含业务信息。

也可本地打开 `dist/har-workbench.html`。内置样本只含虚构 `example.com` 流量。见[完整使用说明](docs/USAGE.zh-CN.md)。

## 已实现

- 根据允许字段重建最小 HAR，不修改原始输入。
- 移除凭据、Cookie、所有正文、非允许头与原始扩展元数据。
- 隐藏所有查询值，替换常见邮箱／ID 和额外指定的区分大小写的字面词。
- 查看 HTTP 4xx／5xx、无响应与慢请求，统计状态分布及最近秩法 P95。
- 导出脱敏 HAR、Markdown 和供 AI 分析的文本。**不调用模型，不自动判断根因。**

Chrome 已有基础脱敏，市场也有相关工具。本项目验证的是脱敏、预览和报告整理合在一起是否方便，尚未验证付费需求。见[调研](docs/RESEARCH.zh-CN.md)。

## 隐私与限制

**自动脱敏不是匿名化保证。** 分享前请检查完整输出，并补充客户名、项目名等替换词。

- 文件在浏览器内处理，没有埋点、Cookie、浏览器持久存储或自动模型调用。
- GitHub、反馈和演示链接由用户主动打开；提交反馈会将填写的内容发送到 GitHub，请勿包含真实日志或凭据。
- 正文始终移除，可能损失排查上下文。
- HTTP 版本统一为 HTTP/1.1；无效时间用 Unix epoch 占位。不适合精确重放或完整性能分析。
- 上限：20 MiB、20,000 条请求、2,000 种已知敏感值；额外替换词最多 100 个，每个最多 1,000 字符。
- 页面和 Markdown 最多列出 200 条线索；脱敏 HAR 保留全部已处理请求。

见[安全说明](SECURITY.zh-CN.md)和[验证记录](docs/VALIDATION.zh-CN.md)。

## 本地运行与开发

需要 Node.js 20+，**无需 npm install**。

```powershell
Set-Location "$env:USERPROFILE\Documents\code\local-utility-lab"
npm.cmd run check
npm.cmd start
```

打开打印的 `http://127.0.0.1:4173`。端口占用时用 `npm.cmd start -- --port 4174`。服务器只提供固定构建文件，不暴露整个源码目录。macOS／Linux 将 `npm.cmd` 换成 `npm`。

修改 `src/` 后重新构建，不手工修改 `dist/`。现有六个 CI 任务覆盖 Ubuntu／Windows、Node 20／22／24，并验证产物一致性。界面修改需浏览器验证。通过功能分支和 PR 提交，见[贡献指南](CONTRIBUTING.zh-CN.md)。

## 推广资料

[全部文档](docs/README.zh-CN.md)

- [使用说明](docs/USAGE.zh-CN.md)
- [30 秒演示与双语字幕](docs/DEMO.zh-CN.md)
- [GitHub Pages 部署](docs/DEPLOYMENT.zh-CN.md)
- [推广文案](docs/PROMOTION.zh-CN.md)
- [两周验证计划](docs/EXPERIMENT.zh-CN.md)

本次只准备推广材料，不自动发帖或收集使用数据。

## 许可证

[MIT](LICENSE)。
