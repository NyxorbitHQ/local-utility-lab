# Data boundaries

[English](SECURITY.md) · [简体中文](SECURITY.zh-CN.md)

HAR processing stays in the browser: no automatic upload, model API call, analytics or persistent storage. The app's CSP blocks network connections. GitHub Pages serves static files; external links and public feedback submission are explicit user actions.

Automatic redaction is not an anonymity guarantee. Hostnames, arbitrary path text, timestamps and business patterns may remain sensitive. Inspect exports and add replacement words. All bodies and non-Content-Type headers are removed, reducing available diagnostic context.

Allowed-field reconstruction excludes original comments, page metadata, server IPs and unknown fields. UI renders input as text/value, not HTML. Size/count limits reduce resource use but do not make the page an isolation sandbox for malicious input.

Use only authorized logs. Never attach a real HAR, credential, private key, internal URL or customer data to public issues. Promotion screenshots and feedback examples must be synthetic.
