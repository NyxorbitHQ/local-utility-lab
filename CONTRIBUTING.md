# Contributing / 贡献指南

The app is dependency-free and handles sensitive logs locally. Preserve that boundary.

## Standard workflow

1. Open an issue or describe the problem in your PR. Use synthetic examples only.
2. Branch from updated `main`: `feat/<name>`, `fix/<name>` or `chore/<name>`.
3. Change the source in `src/`. Do not hand-edit generated `dist/` files.
4. Run `npm run check` (`npm.cmd run check` in PowerShell).
5. Commit the source and generated artifacts with a focused Conventional Commit.
6. Push the branch and open a Pull Request into `main`.
7. Review the diff and wait for all six CI jobs to pass before merging.

## Review checklist

- No raw HARs, API keys, cookies, private keys or personal data.
- No network upload, analytics or persisted user data in the browser app.
- Display user input with text nodes / value, never HTML interpolation.
- Redaction changes include meaningful synthetic regressions.
- Keep automatic redaction limitations explicit; do not claim confirmed root causes.
- LF source files and regenerated artifacts remain reproducible.
- UI changes are checked in a browser; a successful build is insufficient.

There are no package dependencies to install. CI covers Ubuntu and Windows on Node 20, 22 and 24. Build output is tracked so people can use the standalone page immediately.

Provide English and Chinese in new public documentation. Recapture synthetic screenshots after changes to the demonstrated UI. `scripts/make-demo.py` uses Pillow only for authoring the GIF; the app and CI build need no Python dependencies. Deploy only reviewed `main` through Pages. Promotion drafts do not publish themselves.

Please use English or Chinese for issues and PRs. Do not upload a real log to explain a problem; reduce it to a synthetic case.

## 简体中文

从更新后的 main 创建 feat／fix／chore 分支，修改 src 后运行 npm.cmd run check，连同生成的 dist 和虚构样本一起提交 PR。等待全部六个 CI 任务通过再合并，不直接推 main。

保持无运行依赖、本地处理和无埋点边界。用户数据只用 textContent／value 渲染；脱敏改动需真实有效的虚构回归用例。界面改动需浏览器验证，构建成功不能代替实际操作。

新增对外文档提供中英文内容；修改演示相关界面后重新捕获虚构样本截图。使用 scripts/make-demo.py 更新 GIF，Pillow 仅用于素材制作，不加入应用依赖。修改 Pages 配置时只部署经过审阅的 main。

请勿提交真实 HAR、内部地址、凭据、私钥或客户信息。Issue、PR 和截图使用最小虚构复现。推广文案是草稿，不自动发帖。
