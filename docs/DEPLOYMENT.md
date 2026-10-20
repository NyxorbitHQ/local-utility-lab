# GitHub Pages deployment

[English](DEPLOYMENT.md) · [简体中文](DEPLOYMENT.zh-CN.md)

Targets: [app](https://nyxorbithq.github.io/local-utility-lab/), [demo](https://nyxorbithq.github.io/local-utility-lab/demo/), [offline file](https://nyxorbithq.github.io/local-utility-lab/har-workbench.html).

These URLs are targets, not proof of a successful deployment. Check **Deploy public demo** and open the returned URL before announcing the launch.

1. In repository **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**. Committing YAML does not configure this repository setting.
2. Review the launch PR and wait for all six CI jobs. Do not deploy PR branches as production.
3. Merge into `main`. `pages.yml` tests, rebuilds, checks tracked artifacts, uploads **only dist/**, and deploys it.
4. Verify the Actions result, app, sample, demo and offline download. Only then use the community drafts.

Build has read-only repository access. Only deployment gets `pages: write` and `id-token: write`; it is restricted to `main` and the `github-pages` environment. Manual dispatch requires the workflow on the default branch and only deploys `main`. PRs run CI without publication.

HAR data stays in the browser. GitHub Pages serves site files and follows its own hosting practices. Feedback submission is voluntary and public; never submit private logs. No analytics, accounts, payments or external credentials are added.

If publication fails, inspect logs and Pages settings. Do not change repository visibility, bypass approvals or widen token scopes. [Official custom-workflow reference](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
