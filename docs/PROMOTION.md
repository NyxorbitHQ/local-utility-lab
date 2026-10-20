# Launch copy and checklist

[English](PROMOTION.md) · [简体中文](PROMOTION.zh-CN.md)

## Before posting

These are **drafts**, not published posts. Merge the PR, verify Pages deployment and the live app/demo/download, and replace changed links before posting. Disclose that you are the maker and that development used AI assistance. Do not promise full anonymization, confirmed root causes or revenue. This kit does not send messages or publish posts.

- [Try the tool](https://nyxorbithq.github.io/local-utility-lab/)
- [Watch the walkthrough](https://nyxorbithq.github.io/local-utility-lab/demo/)
- [Source](https://github.com/NyxorbitHQ/local-utility-lab)
- [Give feedback](https://github.com/NyxorbitHQ/local-utility-lab/issues/new?template=feedback.yml)

## Positioning

Redact a HAR in your browser, review failed and slow requests, and export an evidence brief before sharing.

Suggested GitHub description: `Local HAR redaction and evidence reports. No HAR uploads, accounts or model calls.`

Suggested topics: `har`, `developer-tools`, `debugging`, `privacy`, `network-analysis`, `testing`, `offline`.

Add the verified app URL to the repository About website field after deployment.

## Maker-community draft

Title: **I built a local HAR workbench for redaction and shareable evidence reports**

Sharing a HAR often means removing sensitive data and then writing up failed or slow requests. I built a browser tool that combines those steps. Development used AI assistance; source and tests are available.

It removes credentials, cookies and bodies, hides query values, supports extra replacement words, previews sanitized output and exports HAR or Markdown. There is fictional sample data and a standalone HTML download.

Chrome and other open-source projects already offer sanitization. This project tests whether the combined workflow is convenient. It does not establish root causes or guarantee anonymization. Review business details before sharing.

Try: https://nyxorbithq.github.io/local-utility-lab/

Source: https://github.com/NyxorbitHQ/local-utility-lab

Which part of HAR sharing takes the most effort in your workflow? Please use only synthetic data in feedback.

## Testing-community tutorial

Title: **Turning a browser HAR into a shareable bug-report evidence brief**

1. Define expected/actual behavior; export an authorized HAR.
2. Explain possible sensitive data and browser sanitization limits.
3. Run the fictional six-request sample; inspect 503, 401 and no-response findings.
4. Add literal replacement words and preview the actual exported HAR.
5. Export Markdown and add reproduction steps and server-side evidence.
6. Discuss when existing tools are better and ask for specific feedback.

Include the GIF and one sanitized report excerpt. Do not use real internal URLs or claim the sample reproduces a customer incident.

## Show HN draft

Title: **Show HN: A browser-local HAR redactor that exports debugging evidence briefs**

Suggested first comment:

> I made a small HAR workbench combining conservative redaction, failed/slow request review and Markdown evidence export. It runs in the browser without HAR uploads or model calls. Development used AI assistance; the source and tests are public.
>
> The trade-off is deliberate: request/response bodies and unknown headers are removed, so some diagnostic context is lost. Hostnames, arbitrary path text and request patterns can still be sensitive. It is not an anonymization guarantee or root-cause detector.
>
> There is a synthetic sample, a 30-second bilingual walkthrough and a standalone HTML download. The app interface is currently Chinese, with English usage instructions and captions.
>
> I would appreciate feedback on whether the combined workflow is useful compared with your existing tools, and which evidence the report is missing.

Publish only when the maker can explain the implementation and trade-offs and the work meets Show HN's substantive-project requirement. Do not submit an unexplained AI-generated one-off or ask friends for votes.

## Follow-up and measurement

Ask willing participants: Did you finish? What was missing? Did you use it again? What did you use before?

Two-week internal targets, not predictions: 20 target users try it, five complete a real authorized task, three report reuse. GitHub visitors/stars/clones are attention signals, not tool usage. GitHub Traffic shows a rolling 14-day window; capture a non-sensitive summary weekly. No tracking script is added. See the [validation plan](EXPERIMENT.md).

## Sources

- [V2EX maker showcase](https://www.v2ex.com/go/create): check current posting requirements.
- [TesterHome](https://testerhome.com/): proposed audience match, not a guarantee of reach.
- [Show HN guidelines](https://news.ycombinator.com/showhn.html): runnable, substantive work, low friction, no vote solicitation.
- [Reddit spam policy](https://support.reddithelp.com/hc/en-us/articles/360043504051-Spam): avoid repeated mass promotion and follow each community's rules.
- [GitHub topics](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics).
- [GitHub Traffic](https://docs.github.com/en/repositories/viewing-activity-and-data-for-your-repository/viewing-traffic-to-a-repository).

Reviewed: 2026-10-20.
