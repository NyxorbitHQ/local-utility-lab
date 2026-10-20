# 数据边界

## English

HAR processing stays in the browser: no automatic upload, model API call, analytics or persistent storage. The app's CSP blocks network connections. GitHub Pages serves static files; external links and public feedback submission are explicit user actions.

Automatic redaction is not an anonymity guarantee. Hostnames, arbitrary path text, timestamps and business patterns may remain sensitive. Inspect exports and add replacement words. All bodies and non-Content-Type headers are removed, reducing available diagnostic context.

Allowed-field reconstruction excludes original comments, page metadata, server IPs and unknown fields. UI renders input as text/value, not HTML. Size/count limits reduce resource use but do not make the page an isolation sandbox for malicious input.

Use only authorized logs. Never attach a real HAR, credential, private key, internal URL or customer data to public issues. Promotion screenshots and feedback examples must be synthetic.

## 简体中文

工具在浏览器内处理文件，不自动发送数据，不调用 AI API，不持久保存输入。构建产物不加载第三方资源，CSP 包含 `connect-src 'none'`。使用者主动复制／下载后分享给其他服务的行为由使用者决定。

自动脱敏并非匿名化保证。域名、普通路径词、时间和业务模式可能仍敏感。请预览并添加额外替换词。保守默认值移除所有正文与非 Content-Type 头，不支持保留原始正文。

源码允许字段重建输出，原始对象、评论、自定义元数据和原始标题不直接传递到报告。UI 使用 `textContent`、`value` 和原生 DOM 节点渲染输入；不执行输入，不把用户数据插入 HTML。

输入文件可能使浏览器消耗内存／CPU，因此设置了大小和数量上限。该工具不是针对恶意大规模输入的隔离沙箱。只使用自己有权处理的文件。

在未来公开仓库报告漏洞时，只提交最小虚构复现，不上传真实 HAR、Cookie、私钥、客户资料或内部域名。
