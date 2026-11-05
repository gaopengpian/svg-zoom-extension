<!-- Generated: 2026-08-27 | Updated: 2026-08-27 -->

# SVG Viewer Extension

Chrome Manifest V3 扩展，为本地 `.svg` 文件添加 d3.js 缩放/平移交互。

## Key Files

| File | Description |
|------|-------------|
| `manifest.json` | MV3 清单，匹配 `file://*/*.svg` 与 `*://*/*.svg`，注入 content scripts |
| `content.js` | 核心逻辑：包裹 `<g>` 元素，设置 100% 尺寸，绑定 d3.zoom |

## Subdirectories

| Directory | Purpose |
|-----------|---------|
| `icons/` | 扩展图标 16/48/128px (见 `icons/AGENTS.md`) |
| `js/` | 第三方库 (见 `js/AGENTS.md`) |

## For AI Agents

### Working In This Directory
- `content.js` 是唯一业务逻辑文件，改动即全量
- manifest 未声明 `icons` 字段，图标文件当前未被引用
- 仅在 `.svg` 文档本身（`file://`、`http://`、`https://`）生效；HTML 页面内联 `<svg>` 不匹配

### Testing Requirements
- 本地加载未打包扩展，Chrome `file://` 打开 `.svg` 文件验证缩放/平移

### Common Patterns
- d3 v7 全局引入（非模块化），`d3.select` / `d3.zoom` 链式调用
- SVG namespace 操作使用 `createElementNS`

## Dependencies

### Internal
- `js/d3.min.js` — content.js 的 d3 全局对象来源
- `icons/` — 图标资源（manifest 未引用）

### External
- d3.js (v7, bundled as minified UMD)

<!-- MANUAL: -->
