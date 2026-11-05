# SVG Viewer

Chrome 扩展：为直接打开的 `.svg` 文档加上滚轮缩放与拖拽平移，基于 d3.js v7。

适用于本地文件（`file://`）和 HTTP(S) 服务器上的独立 SVG 文档，例如：

```
file:///D:/work/notes/diagram.svg
http://127.0.0.1:8766/ems/topo/mid/test_fail/tongwei_h_通渭西川变.svg
```

## 功能

- 滚轮以光标位置为中心缩放（0.01x – 100x）
- 鼠标拖拽平移
- 自动适配窗口尺寸（`width` / `height` 置为 100%）
- 无网络请求、无数据收集，d3.js 随扩展打包

## 安装

### Chrome 应用商店

（上架后补充商店链接）

### 手动加载（开发版）

1. 下载 [Releases](https://github.com/gaopengpian/svg-zoom-extension/releases) 中的 `svg-zoom-extension-<版本>.zip` 并解压，或克隆本仓库
2. 打开 `chrome://extensions`
3. 打开右上角「开发者模式」
4. 点击「加载已解压的扩展程序」，选择解压后的目录
5. 若要支持本地文件，进入扩展详情页打开「允许访问文件网址」

## 说明

- 只作用于以 `.svg` 结尾的文档本身；HTML 页面内联的 `<svg>` 不会被接管
- Chrome 需以 `image/svg+xml` 渲染该文档（`python -m http.server` 等常见服务器默认如此）

## 目录结构

| 路径 | 说明 |
|------|------|
| `manifest.json` | MV3 清单，匹配 `file://*/*.svg` 与 `*://*/*.svg` |
| `content.js` | 唯一业务逻辑：包装 `<g>`、设置尺寸、绑定 `d3.zoom` |
| `js/d3.min.js` | d3.js v7 UMD bundle（本地引入，符合 MV3 无远程代码要求） |
| `icons/` | 16 / 48 / 128 px 图标 |

## 开发

改完代码后：`chrome://extensions` → 该扩展「重新加载」→ 重新打开 SVG 验证。
每次改动递增 `manifest.json` 的 `version`。

## 许可

MIT
