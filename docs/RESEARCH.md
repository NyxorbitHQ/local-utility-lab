# 选题与资料记录

日期：2026-10-20。目的：找到适合个人开发、可在公开渠道展示和自主试用的小工具。此文不代表已验证收入或付费意愿。

## 结论

先实现 HAR 本地脱敏与报告工具。第二候选是字幕翻译回填。暂缓通用 JSON 格式化／OpenAPI 对比：成熟开源工具已覆盖大量需求，当前没有证据支持一个通用替代品。

HAR 方向仍有充分竞争。此次实现只验证「将安全分享与整理排查材料合成一个流程」是否比既有工作流更方便。

## 已查看资料

| 资料 | 类型 | 观察 | 能证明／不能证明 |
| --- | --- | --- | --- |
| [Chrome Network reference](https://developer.chrome.com/docs/devtools/network/reference/) | 官方产品文档 | 支持 HAR 导出；默认脱敏排除 Cookie、Set-Cookie、Authorization 等头 | 证明官方已有基础能力，不能据此声称存在付费缺口 |
| [Google HAR Sanitizer](https://github.com/google/har-sanitizer) | 开源竞品 | 可选择头、参数和内容类型并导出脱敏 HAR | 证明竞品存在；本项目不复制其源码，也不声称首创 |
| [HAR 分享前是否清理的讨论](https://www.reddit.com/r/webdev/comments/1qg37h3/do_you_scrub_har_files_before_sending_them_to/) | 社区自述，非代表性样本 | 有人担忧 HAR 中凭据并询问本地处理方案 | 只作问题线索，不作为市场规模或付费意愿证据 |
| [oasdiff](https://github.com/oasdiff/oasdiff) | 开源竞品 | OpenAPI 变更与兼容性分析已有成熟实现 | 不优先做通用 OpenAPI 对比器 |
| [Subtitle Edit](https://github.com/SubtitleEdit/subtitleedit) | 开源竞品 | 完整字幕编辑生态 | 不做全功能编辑器，字幕工具仅验证固定 ID 翻译回填流程 |
| [字幕翻译保留时间轴讨论](https://www.reddit.com/r/SubtitleEdit/comments/1sw9oeb/translating_an_srt_files_whilst_maintaining_the/) | 社区自述，非代表性样本 | 有人关心翻译时保留时间轴；回复提到既有解决方式 | 需求不是未被解决，便利性差异仍需验证 |

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
