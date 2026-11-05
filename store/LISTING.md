# Chrome Web Store 上架材料

上传地址：<https://chrome.google.com/webstore/devconsole>

## 0. 前置条件

- 开发者账号：一次性注册费 **5 美元**（信用卡支付），需填写开发者名称与联系邮箱
- 待上传包：[dist/svg-zoom-extension-1.4.zip](../dist/svg-zoom-extension-1.4.zip)（`manifest.json` 位于 zip 根目录，已是商店要求的结构）
- 每次改版：递增 `manifest.json` 的 `version` → 重新打包 → 后台「Package」页上传新 zip → 提交审核

## 1. 基本信息

| 字段 | 值 |
|------|-----|
| Name | `SVG Viewer` |
| Summary（中文，≤132 字符） | `为直接打开的 SVG 文档加上滚轮缩放与拖拽平移，支持本地文件与 HTTP(S)，不发网络请求。` |
| Summary（English，≤132 字符） | `Pan and zoom any SVG document opened from file:// or http(s)://. No network requests, no tracking.` |
| Category | Developer Tools（开发者工具） |
| Language | 中文（简体），可另加 English 本地化条目 |
| Icon 128×128 | `icons/icon128.png`（已在 manifest 声明） |

## 2. 详细描述（中文）

```
SVG Viewer 为浏览器直接打开的 SVG 文档添加交互：

• 滚轮缩放：以光标位置为中心，范围 0.01x – 100x
• 拖拽平移：按住鼠标左键拖动图形
• 自适应窗口：SVG 自动铺满浏览器窗口

支持的范围
• 本地文件：file:///.../xxx.svg（需在扩展详情页开启「允许访问文件网址」）
• 服务器文档：http(s)://host/.../xxx.svg

适用场景
• 变电站拓扑图、系统架构图、CAD 导出图的放大器版本
• 大型 SVG 图标、流程图、地图，在浏览器里直接查看细节

为什么安全
• 只在 URL 以 .svg 结尾的文档中运行
• 不读取、不上传任何页面内容，不收集任何数据
• d3.js 已随扩展打包，符合 Manifest V3 无远程代码要求

源码与问题反馈：https://github.com/gaopengpian/svg-zoom-extension
```

## 3. 详细描述（English）

```
SVG Viewer adds natural navigation to SVG documents opened directly in the browser:

• Wheel to zoom around the cursor (0.01x – 100x)
• Drag to pan
• Fills the browser window automatically

Works on local files (file:///.../xxx.svg, requires "Allow access to file URLs")
and on SVG documents served over HTTP(S).

Runs only in documents whose URL ends with .svg. No page content is read or
uploaded, no data is collected. d3.js is bundled with the extension, so no
remote code is used (Manifest V3 compliant).

Source and issue tracker: https://github.com/gaopengpian/svg-zoom-extension
```

## 4. 隐私与权限问卷

| 问题 | 回答 |
|------|------|
| Single purpose | 为独立 SVG 文档提供鼠标缩放与平移导航 |
| 是否收集用户数据 | 否（No user data collected） |
| 是否使用远程代码 | 否（No remote code） |
| 主机权限理由 | `file://*/*.svg` 与 `*://*/*.svg`：仅在这些以 `.svg` 结尾的文档中注入缩放脚本，用于取得根 `<svg>` 元素并绑定 d3.zoom；不读取其他页面，不发起网络请求 |
| 隐私政策 URL | 可填仓库 README 或本文件所在仓库地址；不收集数据时该字段可选但建议填写 |
| 单个用途说明 | 扩展只有一项功能：SVG 缩放/平移 |

## 5. 图片素材

| 类型 | 要求 | 现状 |
|------|------|------|
| 截图 | 至少 1 张，1280×800 或 640×400 | [screenshot-1280x800.png](screenshot-1280x800.png) 已生成 |
| 小型宣传图 | 可选，440×280 | 未提供 |
| 大型宣传图 | 可选，1400×560 | 未提供 |
| 商店图标 | 128×128 | `icons/icon128.png` |

截图建议：用真实浏览器窗口再截几张效果更好（`chrome://extensions` 开启扩展 → 打开拓扑图 → 滚轮放大到局部 → 截图 1280×800）。

## 6. 上传步骤

1. 用注册开发者账号的 Google 账户登录 <https://chrome.google.com/webstore/devconsole>
2. 首次使用：完成开发者协议与注册费支付（5 美元）
3. 点「新建项目」，上传 `dist/svg-zoom-extension-1.4.zip`
4. 按第 1–4 节填写商店信息、描述、分类、语言、隐私问卷
5. 上传截图，填写「商店图标」沿用包内 128 图标
6. 保存并「提交审核」
7. 审核通过后把商店链接补进 `README.md` 的「Chrome 应用商店」小节

## 7. 常见驳回原因与应对

| 原因 | 应对 |
|------|------|
| 主机权限过宽 | 说明仅注入 `.svg` 文档本身、不读取 HTML 页面内容；必要时改为用户手动授予的 `optional_host_permissions` |
| 缺少隐私政策 | 提供公开可访问的隐私政策页面（可放仓库 README 或新建 docs 页） |
| 截图不清晰 | 换成真实浏览器窗口截图，尺寸严格 1280×800 |

## 8. 后续版本发布流程

```powershell
# 1. 改代码并递增 manifest.json 的 version（如 1.5）
# 2. 打包（保持 manifest.json 在 zip 根目录）
# 3. 本地验证：chrome://extensions 重新加载，打开 SVG 测试
# 4. 提交并打 tag
git add -A; git commit -m "feat: ..."; git push
gh release create v1.5 dist/svg-zoom-extension-1.5.zip --title "v1.5" --notes "..."
# 5. 开发者后台 Package 页上传新 zip，提交审核
```
