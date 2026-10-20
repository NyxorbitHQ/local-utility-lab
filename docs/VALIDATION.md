# 验证记录

## English summary / 历史记录说明

The record below describes the original v0.1.0 checks on 2026-10-20: 20 local tests, successful HTTP browser flows and synthetic-data exports. It is historical, not proof of current remote deployment or CI status. The original browser interface blocked file:// automation; that boundary was not bypassed. See LAUNCH-VALIDATION.md for launch-kit checks and their actual limits.

下文是最初 v0.1.0 的历史验证，不代表当前远程部署或 CI 状态。推广准备的验证与限制另记于 LAUNCH-VALIDATION.md。

## 简体中文 / Original validation record

日期：2026-10-20。版本：0.1.0。

## 本地自动检查

环境：Windows，Node.js v22.19.0。已在实际项目目录执行 `npm.cmd run check`：20 项测试全部通过，独立页面构建成功。无需安装第三方包。

测试覆盖：

- BOM、错误 JSON、错误 HAR、大小和条数限制、空文件内容与空 HAR。
- 凭据／正文／元数据移除、重复参数、编码路径、自定义字面替换、常见邮箱与 ID。
- 未知路径文字仍保留的已知边界，无效 URL 替换，非数值与无效时间处理。
- 原始对象不变、原型类键不复制、状态和 P95 计算、Markdown 标记转义、报告截断。
- 独立构建、CSP 哈希匹配、无外部脚本／样式／调用接口、用户输入不写入 innerHTML、构建可重复。

构建检查曾发现字符串替换中的 `$&` 会改变内嵌代码，导致 CSP 哈希不匹配；已改用替换回调并通过回归。

## 浏览器实际验证

通过本机 HTTP 预览，在 Codex 内置浏览器中完成：

| 操作 | 结果 |
| --- | --- |
| 点击虚构示例 | 6 条请求、3 条异常、2 条慢请求、P95 3,800 ms |
| 真实文件选择器导入 examples/synthetic-demo.har | 成功读取并分析 |
| 下载脱敏 HAR、Markdown、AI TXT | 三个文件实际落盘；读取校验条数与内容，未发现示例凭据残留 |
| 脱敏预览与 AI 材料 | JSON 可解析；AI 材料区分事实与假设 |
| 自定义替换词 shop | 原域名从预览消失，替换为 redacted.invalid |
| 改变规则／阈值 | 旧导出隐藏，需重新生成；5,000 ms 阈值下慢请求为 0 |
| 错误 JSON | 显示明确错误，不保留上一次结果 |
| 取消「只看异常」 | 表格显示全部 6 条请求 |
| 键盘右箭头切换页签 | aria-selected 正确切到脱敏预览 |
| URL／正文带 img 与 script 标记 | 未生成图片节点，未出现脚本对话框 |
| 使用说明与选题页面 | 导航和内容可见 |
| 桌面 1440 × 1050 视口 | 已检查并保存截图 |
| 手机 390 × 844 视口 | 文档 clientWidth 与 scrollWidth 均为 375；表格单独横向滚动 |
| 控制台 | 已检查 warn／error，结果为空 |
| HTTP 入口及源码路径 | 页面返回 200，README.md 路径返回 404 |

所有输入均为虚构数据。没有上传真实业务日志，也没有调用模型。

## 未验证与限制

- 独立 HTML 无外部资源／导入依赖，但**未实测双击文件运行**：浏览器自动化接口的安全策略禁止访问 file://，未尝试绕过。实际页面流程在本地 HTTP 预览中通过。
- 未在其他浏览器与操作系统做完整兼容性验证；移动端只验证响应式视口，非实体手机。
- 首次本地验证时尚未连接 GitHub remote 或运行远程 CI。当前交付状态请查看仓库的 PR 与 GitHub Actions；本段不作为远程 CI 结果。
- 没有进行真实用户访谈、获客或付费验证。
- 自动脱敏不能保证所有业务信息都被识别，分享仍需人工检查。

## 运行

```powershell
Set-Location "$env:USERPROFILE\Documents\code\local-utility-lab"
npm.cmd start
```

打开打印的本地地址。独立页面位于 dist/index.html，可由使用者自行双击验证；剪贴板受限时使用下载 TXT 或手动复制。
