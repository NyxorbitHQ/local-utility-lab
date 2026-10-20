# Launch validation / 推广准备验证

Date / 日期：2026-10-20。

## English

- Windows, Node.js 22.19.0: `npm.cmd run check` passed all 20 tests and rebuilt the site. Build regressions cover matching CSP hashes, reproducible standalone output and byte-identical demo images. Core redaction tests remain unchanged.
- Local HTTP browser checks: launch link opened the bilingual walkthrough; Next, Restart, Play and Pause worked. Playback reached `5 / 5 · 30 / 30s` and stopped. The page does not auto-play. Browser warning/error log was empty during these checks.
- Responsive viewport: both the workbench and demo at 390 × 844 had document client/scroll width 375, with no page overflow. This is viewport emulation, not a physical-phone test.
- HTTP checks: app, standalone download, demo and all five JPEGs returned 200 with the expected content types; HEAD had an empty body and correct content length. Source/private routes returned 404; POST returned 405. The server remains loopback-only.
- GIF inspected with Pillow: five frames, total duration 30,000 ms. Screenshots contain only fictional traffic. The GIF is a screenshot walkthrough, not a continuous screen recording.
- Repository content scan removed unrelated candidate-project references from source, generated app, READMEs and research. Public launch documentation includes English and Chinese; the workbench UI remains Chinese.

Remote CI is reported on the PR. Deployment is pending merge into `main`, Pages source configuration and a successful deployment workflow. No live-production validation, community posting, user interviews or revenue validation is claimed. Direct `file://` execution is not browser-tested; standalone structure and local HTTP behavior are checked. See [historical MVP validation](VALIDATION.md) for earlier application-flow checks and their limits.

## 简体中文

- Windows、Node.js 22.19.0 执行 `npm.cmd run check`，20 项测试全部通过并重新构建。构建回归覆盖 CSP 哈希、独立页面可重复构建和演示图片字节一致性；原脱敏核心测试未改动。
- 本地 HTTP 浏览器检查：新增入口能打开双语演示，下一步、重来、播放和暂停正常。播放到 `5 / 5 · 30 / 30s` 后停止，默认不自动播放；检查期间控制台 warn／error 为空。
- 390 × 844 视口下，工作台与演示文档的 clientWidth／scrollWidth 均为 375，无页面横向溢出。属于视口模拟，未在实体手机验证。
- HTTP 检查：应用、单文件、演示与五张 JPEG 返回 200，类型正确；HEAD 无正文且长度正确。源码／私有路径为 404，POST 为 405；服务器仍只绑定本机回环地址。
- Pillow 检查 GIF：五帧，共 30,000 ms。素材只有虚构流量；这是截图演示，不是连续录屏。
- 已检查并清除源码、生成页面、README 和调研中的无关候选项目内容。对外推广文档包含中英文，工作台界面仍为中文。

远程 CI 结果以 PR 为准。上线还需合并至 main、配置 Pages 来源并成功部署。不将本次检查描述成线上生产验证、已发布社区帖子、用户访谈或收入验证。未通过浏览器实测 file:// 直接运行；已检查独立产物结构及本地 HTTP 行为。之前的应用流程检查和限制见[历史 MVP 验证](VALIDATION.md)。
