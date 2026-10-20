# GitHub Pages deployment / GitHub Pages 部署

## English

Targets: [app](https://nyxorbithq.github.io/local-utility-lab/), [demo](https://nyxorbithq.github.io/local-utility-lab/demo/), [offline file](https://nyxorbithq.github.io/local-utility-lab/har-workbench.html).

These URLs are targets, not proof of a successful deployment. Check **Deploy public demo** and open the returned URL before announcing the launch.

1. In repository **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**. Committing YAML does not configure this repository setting.
2. Review the launch PR and wait for all six CI jobs. Do not deploy PR branches as production.
3. Merge into `main`. `pages.yml` tests, rebuilds, checks tracked artifacts, uploads **only dist/**, and deploys it.
4. Verify the Actions result, app, sample, demo and offline download. Only then use the community drafts.

Build has read-only repository access. Only deployment gets `pages: write` and `id-token: write`; it is restricted to `main` and the `github-pages` environment. Manual dispatch requires the workflow on the default branch and only deploys `main`. PRs run CI without publication.

HAR data stays in the browser. GitHub Pages serves site files and follows its own hosting practices. Feedback submission is voluntary and public; never submit private logs. No analytics, accounts, payments or external credentials are added.

If publication fails, inspect logs and Pages settings. Do not change repository visibility, bypass approvals or widen token scopes. [Official custom-workflow reference](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## 简体中文

入口规划：[应用](https://nyxorbithq.github.io/local-utility-lab/)、[演示](https://nyxorbithq.github.io/local-utility-lab/demo/)、[单文件](https://nyxorbithq.github.io/local-utility-lab/har-workbench.html)。

这些是部署目标，不表示已经上线。发帖前检查 **Deploy public demo** 流水线，并实际打开返回的 URL。

1. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。提交 YAML 本身不会配置这个设置。
2. 审阅 PR，等待六个 CI 任务通过，不把 PR 分支作为生产版本。
3. 合并至 `main` 后，工作流测试、构建、检查产物一致性，只上传 `dist/` 并部署。
4. 检查 Actions 成功状态，验证应用、样本、演示和下载，再使用社区文案。

构建只有仓库只读权限。部署阶段才有 Pages 和 OIDC 写权限，限制在 `main`，使用 `github-pages` 环境。手动触发需工作流已进入默认分支，且只部署 `main`；PR 不发布。

HAR 留在浏览器中。GitHub Pages 提供站点文件并遵循其托管规则。反馈公开且自愿，不要提交私密日志。本次没有新增埋点、账号、支付或外部凭据。

失败时查看日志和 Pages 设置，不修改可见性、不绕过审批、不扩大令牌权限。[官方参考](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。
