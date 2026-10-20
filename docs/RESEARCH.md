# HAR research / HAR 调研记录

## English summary

Research date: 2026-10-20. The first experiment combines browser-local HAR redaction with request evidence reports. Chrome and Google's HAR Sanitizer already address sanitization; the hypothesis is convenience, not a new market or validated willingness to pay. Community anecdotes are problem clues, not representative demand statistics.

No user interviews, retention measurements, price validation or sales have been completed. This document covers only the HAR workbench.

| Source | Observation and limits |
| --- | --- |
| [Chrome Network reference](https://developer.chrome.com/docs/devtools/network/reference/) | HAR export and basic sanitization already exist. This does not demonstrate an unmet paid need. |
| [Google HAR Sanitizer](https://github.com/google/har-sanitizer) | An existing open-source competitor. This project does not claim to invent HAR sanitization or copy its source. |
| [HAR sharing discussion](https://www.reddit.com/r/webdev/comments/1qg37h3/do_you_scrub_har_files_before_sending_them_to/) | Anecdotes about credentials in HAR files are problem clues, not representative demand or willingness-to-pay evidence. |

The MVP processes files in the browser, rebuilds an allowlist of fields, drops bodies and extension metadata, and exports readable evidence. Conservative redaction loses some debugging detail. AI-ready material can be copied to the user's own model; the app does not request API keys or make model calls. Static hosting avoids per-use model fees but development, maintenance, acquisition and support still cost time.

Still unknown: repeat use versus existing alternatives, which users need reports or batch/comparison features, real download and retention counts, pricing, conversion, acquisition cost and revenue. Shipping software and finding competitors or anecdotes do not establish commercial validation.

## 简体中文

日期：2026-10-20。目的：研究 HAR 工作台的使用价值、现有方案与验证边界。此文不代表已验证收入或付费意愿。

## 结论

本项目聚焦 HAR 本地脱敏与报告整理。

HAR 方向仍有充分竞争。此次实现只验证「将安全分享与整理排查材料合成一个流程」是否比既有工作流更方便。

## 已查看资料

| 资料 | 类型 | 观察 | 能证明／不能证明 |
| --- | --- | --- | --- |
| [Chrome Network reference](https://developer.chrome.com/docs/devtools/network/reference/) | 官方产品文档 | 支持 HAR 导出；默认脱敏排除 Cookie、Set-Cookie、Authorization 等头 | 证明官方已有基础能力，不能据此声称存在付费缺口 |
| [Google HAR Sanitizer](https://github.com/google/har-sanitizer) | 开源竞品 | 可选择头、参数和内容类型并导出脱敏 HAR | 证明竞品存在；本项目不复制其源码，也不声称首创 |
| [HAR 分享前是否清理的讨论](https://www.reddit.com/r/webdev/comments/1qg37h3/do_you_scrub_har_files_before_sending_them_to/) | 社区自述，非代表性样本 | 有人担忧 HAR 中凭据并询问本地处理方案 | 只作问题线索，不作为市场规模或付费意愿证据 |

## HAR MVP 的取舍

- 浏览器内处理，降低安装与使用门槛；不需要对方给业务系统访问权限。
- 使用允许字段重建，保守丢弃正文和扩展元数据；为此接受部分排查信息损失。
- 输出可阅读报告，但不将状态码直接包装成 AI 根因。
- AI 材料可复制到用户自己的模型；不收集 API Key 或代付调用费用。
- 使用静态文件，免费开放版不存在每次调用的模型费用；仍有开发、维护、获客和支持成本。

## 尚未验证

- 是否有人愿意持续使用本项目，而不是浏览器、脚本或现有竞品。
- 哪类人最需要报告导出、批量处理或对比。
- 下载和重复使用的真实数量。
- 付费价格、转化率、获客成本和收入。

不得把「完成开发」「竞品存在」「有人讨论问题」写成「商业验证成功」。
