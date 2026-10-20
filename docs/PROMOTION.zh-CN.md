# 推广文案与清单

[English](PROMOTION.md) · [简体中文](PROMOTION.zh-CN.md)

## 发布前

以下均为**草稿**，尚未发布。先合并 PR、确认 Pages 部署，并验证线上应用、演示和下载；链接变化时须替换。说明自己是作者，开发使用了 AI 辅助。不宣传彻底匿名化、自动确认根因或收益保证。本资料不自动发帖或发送消息。

- [试用工具](https://nyxorbithq.github.io/local-utility-lab/)
- [观看演示](https://nyxorbithq.github.io/local-utility-lab/demo/)
- [查看源码](https://github.com/NyxorbitHQ/local-utility-lab)
- [提供反馈](https://github.com/NyxorbitHQ/local-utility-lab/issues/new?template=feedback.yml)

## 一句话介绍

在浏览器本地脱敏 HAR，查看失败与慢请求，整理成可分享的故障线索报告。

建议仓库简介：`本地 HAR 脱敏与故障线索报告。无需账号，不上传 HAR，不调用模型。`

建议标签：`har`、`developer-tools`、`debugging`、`privacy`、`network-analysis`、`testing`、`offline`。

部署成功后，再将已验证的应用地址加入仓库 About 网站字段。

## V2EX 作品帖草稿

标题：**[开源] 做了一个本地 HAR 工作台：脱敏后，直接生成故障线索报告**

分享 HAR 给同事或供应商时，通常需要先处理敏感信息，再整理失败请求和慢请求。

我做了一个小工具，把这些步骤放进同一个页面，开发使用了 AI 辅助，源码和测试公开：

- HAR 在浏览器内处理，不自动上传，无需账号。
- 移除 Cookie、凭据与正文，隐藏所有查询值，可补充替换词。
- 预览处理结果，查看异常与慢请求，导出 Markdown 或脱敏 HAR。
- 有虚构示例和可下载的独立 HTML，可先不用真实日志体验。

Chrome 已有基础脱敏，也有其他开源工具。这个项目想验证的是：把脱敏、预览和报告整理合在一起，是否能减少操作。它不是自动根因分析器，自动脱敏也不能保证覆盖所有业务信息，分享前仍需检查。

试用：https://nyxorbithq.github.io/local-utility-lab/

演示：https://nyxorbithq.github.io/local-utility-lab/demo/

源码：https://github.com/NyxorbitHQ/local-utility-lab

想听听大家：分享 HAR 时更费时间的是清理敏感信息，还是整理排查材料？报告缺少什么才方便交给同事？反馈请用虚构数据，不要上传真实日志。

## 测试社区实战文章

标题：**Chrome 导出 HAR 后，怎样整理成方便排查的缺陷报告？**

1. 先写预期和实际行为，导出获授权的 HAR。
2. 说明敏感字段与浏览器基础脱敏的边界。
3. 使用六请求样本，检查 503、401 和无响应。
4. 补充替换词，检查实际导出。
5. 导出 Markdown，补充复现步骤和服务端证据。
6. 讨论现有工具何时更合适，再收集具体反馈。

附 GIF 与一段脱敏报告，不使用内部地址，不把虚构例子说成客户事故。

## Show HN 投稿参考

标题译文：**浏览器本地 HAR 脱敏工具，可导出排查材料**

以下为中文参考，投稿时使用[英文草稿](PROMOTION.md#show-hn-draft)。

> 我做了一个小型 HAR 工作台，将保守脱敏、异常与慢请求查看、Markdown 材料导出合在一起。文件在浏览器内处理，不上传 HAR，不调用模型。开发使用了 AI 辅助，源码和测试公开。
>
> 为降低敏感信息泄漏风险，工具移除请求与响应正文、未知头，因此会损失部分排查上下文。域名、普通路径文字和请求模式仍可能敏感，自动脱敏不能保证匿名化，也不能直接判断根因。
>
> 项目包含虚构示例、30 秒双语演示和独立 HTML 下载。当前应用界面为中文，提供英文说明和字幕。
>
> 想了解相较现有工具，这个组合流程是否方便，以及报告还缺少哪些排查材料。

作者能解释实现与取舍、项目符合实质性要求后再投稿。不把未经理解的 AI 一次性产物直接投稿，不组织互赞。

## 后续反馈与衡量

仅向愿意参与的人了解：是否完成、缺什么、是否复用、原来用什么。

两周内部目标（不是预测）：20 位目标用户试用、5 位完成真实获授权任务、3 位报告复用。仓库访问、Star 和克隆只能说明关注；Traffic 为滚动 14 天窗口，可每周保存不含用户数据的汇总，不新增埋点。详见[使用价值验证计划](EXPERIMENT.zh-CN.md)。

## 规则与资料

- [V2EX 分享创造](https://www.v2ex.com/go/create)：发布前检查当前要求。
- [TesterHome](https://testerhome.com/)：受众匹配判断，不保证流量。
- [Show HN 指南](https://news.ycombinator.com/showhn.html)：作品可运行、有实质内容、试用门槛低，不组织投票。
- [Reddit 垃圾推广规则](https://support.reddithelp.com/hc/en-us/articles/360043504051-Spam)：不批量重复推广，遵守各社区规则。
- [GitHub 标签说明](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics)。
- [GitHub 仓库流量说明](https://docs.github.com/en/repositories/viewing-activity-and-data-for-your-repository/viewing-traffic-to-a-repository)。

核对日期：2026-10-20。
