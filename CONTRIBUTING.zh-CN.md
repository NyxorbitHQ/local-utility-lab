# 贡献指南

[English](CONTRIBUTING.md) · [简体中文](CONTRIBUTING.zh-CN.md)

## 提交流程

1. 使用最小虚构示例，在 Issue 或 PR 中说明问题。
2. 从更新后的 `main` 创建 `feat/<name>`、`fix/<name>`、`chore/<name>` 或 `docs/<name>` 分支。
3. 修改 `src/` 源码，不手工修改 `dist/` 生成产物。
4. 执行 `npm.cmd run check`；macOS／Linux 使用 `npm run check`。
5. 使用范围明确的 Conventional Commit，连同生成产物与虚构样本一起提交。
6. 推送分支并创建目标为 `main` 的 PR。
7. 审阅差异、等待六项 CI 检查通过后再合并。

## 审阅要求

- 不提交真实 HAR、凭据、私钥、内部地址或客户信息。
- 保持浏览器本地处理、无运行依赖、无上传、无埋点和无持久存储。
- 用户数据只通过文本节点或 `value` 渲染，不拼接为 HTML。
- 脱敏逻辑修改需有效的虚构回归用例，明确自动脱敏的限制，不声称已确认根因。
- 保持 LF 换行与可重复构建；界面变化需浏览器检查，构建不能代替实际操作。

无需安装应用依赖。CI 覆盖 Ubuntu／Windows、Node 20／22／24，构建产物随代码提交，便于直接使用独立页面。

## 文档与演示

每份文档只使用一种语言：英文为 `NAME.md`，中文为 `NAME.zh-CN.md`。顶部添加互相切换的链接，正文链接指向同语言文件，不逐句夹杂翻译。英文使用说明中的界面标签对照表可以保留实际中文按钮名。

修改演示涉及的界面后重新捕获虚构样本截图。`scripts/make-demo.py` 使用 Pillow 制作 GIF；Pillow 不属于应用或 CI 构建依赖。Pages 只部署经过审阅的 `main`，推广文案仅为草稿，不自动发帖。

Issue 和 PR 可以使用中文或英文。解释问题时提供虚构复现，不上传真实日志。
