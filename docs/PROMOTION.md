# Launch copy and checklist / 推广文案与清单

## Before posting / 发布前

English: These are **drafts**, not published posts. First merge the PR, enable Pages, verify the live app/demo/download and replace any changed links. Disclose that you are the maker and that development used AI assistance. Do not promise full anonymization, confirmed root causes or revenue. No messages or posts are sent by this kit.

中文：以下均为**草稿**，尚未发布。先合并 PR、启用 Pages，并验证线上应用／演示／下载；链接变化时须替换。说明自己是作者、开发使用了 AI 辅助。不宣传彻底匿名化、自动确认根因或收益保证。本资料不自动发帖或发送消息。

App / 试用：https://nyxorbithq.github.io/local-utility-lab/

Demo / 演示：https://nyxorbithq.github.io/local-utility-lab/demo/

Source / 源码：https://github.com/NyxorbitHQ/local-utility-lab

Feedback / 反馈：https://github.com/NyxorbitHQ/local-utility-lab/issues/new?template=feedback.yml

## Positioning / 一句话介绍

EN: Redact a HAR in your browser, review failed and slow requests, and export an evidence brief before sharing.

中文：在浏览器本地脱敏 HAR，查看失败与慢请求，整理成可分享的故障线索报告。

GitHub description: `Local HAR redaction and evidence reports. No HAR uploads, accounts or model calls. / 本地 HAR 脱敏与故障线索报告。`

Suggested topics / 建议标签：`har`, `developer-tools`, `debugging`, `privacy`, `network-analysis`, `testing`, `offline`。

Add the verified app URL to the repository About website field after deployment. / 部署成功后再将试用链接加入仓库 About 网站字段。

## V2EX / Maker-community draft

### 中文

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

### English equivalent

Title: **I built a local HAR workbench for redaction and shareable evidence reports**

Sharing a HAR often means removing sensitive data and then writing up failed or slow requests. I built a browser tool that combines those steps. Development used AI assistance; source and tests are available.

It removes credentials, cookies and bodies, hides query values, supports extra replacement words, previews sanitized output and exports HAR or Markdown. There is fictional sample data and a standalone HTML download.

Chrome and other open-source projects already offer sanitization. This project tests whether the combined workflow is convenient. It does not establish root causes or guarantee anonymization. Review business details before sharing.

Try: https://nyxorbithq.github.io/local-utility-lab/

Source: https://github.com/NyxorbitHQ/local-utility-lab

Which part of HAR sharing takes the most effort in your workflow? Please use only synthetic data in feedback.

## Testing-community tutorial / 测试社区实战文章

EN title: **Turning a browser HAR into a shareable bug-report evidence brief**

中文标题：**Chrome 导出 HAR 后，怎样整理成方便排查的缺陷报告？**

Outline / 提纲：

1. Define expected/actual behavior; export an authorized HAR. / 先写预期和实际行为，导出获授权的 HAR。
2. Explain possible sensitive data and browser sanitization limits. / 说明敏感字段与浏览器基础脱敏的边界。
3. Run the fictional six-request sample; inspect 503, 401 and no-response findings. / 使用六请求样本，检查 503、401 和无响应。
4. Add literal replacement words and preview the actual exported HAR. / 补充替换词，检查实际导出。
5. Export Markdown and add reproduction steps and server-side evidence. / 导出 Markdown，补充复现步骤和服务端证据。
6. Discuss when existing tools are better and ask for specific feedback. / 讨论现有工具何时更合适，再收集具体反馈。

Include the GIF and one sanitized report excerpt. Do not use real internal URLs or claim the sample reproduces a customer incident. / 附 GIF 与一段脱敏报告，不使用内部地址，不把虚构例子说成客户事故。

## Show HN draft / Show HN 草稿

EN title: **Show HN: A browser-local HAR redactor that exports debugging evidence briefs**

Suggested first comment:

> I made a small HAR workbench combining conservative redaction, failed/slow request review and Markdown evidence export. It runs in the browser without HAR uploads or model calls. Development used AI assistance; the source and tests are public.
>
> The trade-off is deliberate: request/response bodies and unknown headers are removed, so some diagnostic context is lost. Hostnames, arbitrary path text and request patterns can still be sensitive. It is not an anonymization guarantee or root-cause detector.
>
> There is a synthetic sample, a 30-second bilingual walkthrough and a standalone HTML download. The app interface is currently Chinese, with English usage instructions and captions.
>
> I would appreciate feedback on whether the combined workflow is useful compared with your existing tools, and which evidence the report is missing.

中文对应：展示将保守脱敏、异常／慢请求查看和 Markdown 导出合在一起的工具；公开 AI 辅助开发事实、信息丢失的取舍、脱敏限制和当前中文界面，询问相较既有工作流是否有价值。

Publish only when the maker can explain the implementation and trade-offs and the work meets Show HN's substantive-project requirement. The draft is not a recommendation to post an unexplained AI-generated one-off. Never ask friends for votes. / 作者能解释实现与取舍、项目满足实质性要求后再投递，不把未经理解的 AI 一次性产物直接投稿，不组织互赞。

## Follow-up and measurement / 后续反馈与衡量

Ask only willing participants: Did you finish? What was missing? Did you use it again? What did you use before? / 仅向愿意参与的人了解：是否完成、缺什么、是否复用、原来用什么。

Two-week internal targets (not predictions): 20 target users try it, 5 complete a real authorized task, 3 report reuse. GitHub visitors/stars/clones are attention signals, not tool usage. GitHub Traffic shows a rolling 14-day window; capture your own non-sensitive summary weekly. No tracking script is added.

两周内部目标（不是预测）：20 位目标用户试用、5 位完成真实获授权任务、3 位报告复用。仓库访问／Star／克隆只能说明关注；Traffic 为滚动 14 天窗口，可每周保存不含用户数据的汇总，不新增埋点。

## Sources / 规则与资料

- [V2EX 分享创造](https://www.v2ex.com/go/create): maker showcase; check current posting requirements. / 发布前检查当前要求。
- [TesterHome](https://testerhome.com/): proposed audience match, not a guarantee of reach. / 受众匹配判断，不保证流量。
- [Show HN guidelines](https://news.ycombinator.com/showhn.html): runnable, substantive work, low friction, no vote solicitation.
- [Reddit spam policy](https://support.reddithelp.com/hc/en-us/articles/360043504051-Spam): avoid repeated mass promotion and follow each community's rules. / 不批量重复推广，遵守各社区规则。
- [GitHub topics](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics).
- [GitHub Traffic](https://docs.github.com/en/repositories/viewing-activity-and-data-for-your-repository/viewing-traffic-to-a-repository).

Reviewed / 核对日期：2026-10-20。
