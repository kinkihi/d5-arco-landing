# D5 Arco Landing Page

本地预览：http://localhost:3016/

基于 Figma `P2CIw1nZRLhQLvFM07lnZY / 147:8019`，React 19 + Vinext。源码仓库：[kinkihi/d5-arco-landing](https://github.com/kinkihi/d5-arco-landing)。

GitHub 仓库用于代码托管，尚未启用 GitHub Pages。之前的 Sites 版本已部署，但访问 chatgpt.site 时被平台防护返回 403，当前不作为可用的在线预览入口。

## 运行

```sh
npm install
npm run dev -- --host 127.0.0.1 --port 3016
npm run build
npx tsc --noEmit --incremental false
```

## 当前实现

- 首屏：指针跟随光晕、分层卡片视差、滚动纵深放大与扩散，末端自然渐隐。减少动画偏好下关闭运动；触屏保留滚动反馈。
- 第二章节：聊天策划、PPT 编辑、技能画布、图像生成四个真实 React 界面。
- 第三章节：Render 工作区、云资源引用、迁移与批量任务三个真实 React 界面，以及 D5 Lite / D5 Works 卡片。
- 第四章节：多人协作画布、团队项目文件夹、成员使用表格与积分编辑、销售入口。
- 全部界面文字、输入提示、按钮、辅助标签、页脚、弹窗与页面标题支持中文 / English。品牌、用户名、文件扩展名和作品图片保留原有内容。用户输入不进行自动翻译。

所有产品 UI 使用原生文字、按钮、输入框、表格和组件布局；图片仅用于作品、照片、材质或图标。原始整屏图片留作参考，不再由首页加载。

## UI Block 结构

详见 [UI-BLOCKS.md](UI-BLOCKS.md)。每个区块有稳定的 `data-ui-block`，后续动效需求可按该名称定位。

- `app/ui-blocks/Primitives.tsx`：画板容器、侧栏、标题栏、聊天、输入、文档、工具栏、分享面板。
- `app/ui-blocks/DesignBlocks.tsx`：第二章节的四个画面。
- `app/ui-blocks/ConnectionBlocks.tsx`：第三章节的三个画面。
- `app/ui-blocks/TeamBlocks.tsx`：协作 Bento 和 D5 Lite / Works。
- `app/ui-blocks/studio.css`：隔离命名的 Arco UI 样式。
- `app/DesignGallery.tsx`：横向章节滚动和前后浏览。
- `app/Hero.tsx` / `app/ShaderLensBlur.tsx`：首屏卡片与背景。
- `app/Language.tsx`：语言状态、偏好与元信息。

## 设计与布局

采用原稿 1440 × 800 画板比例、24px 画面间距，以及 Arco 的 base/90、base/100、overlay/3%、border/6%、8px 基础圆角。外框为原稿 16px 圆角。界面通过容器宽度等比缩放，内部是真实 DOM，不是图片。

视口宽于 900px、高度至少 700px 且允许动画时，纵向滚动映射为横向浏览。其余情况使用原生横向滚动吸附。非当前画面使用 inert 防止键盘焦点进入屏幕外控件。D5 Lite / Works 在 560px 以下改为单列。

## 已有本地交互

文档查看、输入消息、PPT 翻页及文本编辑、技能选择、画布缩放、图像效果预览、项目关联状态、场景及对象选择、资源分类和引用、迁移任务勾选、协作评论、项目选择、成员积分编辑。

这些交互修改本地演示状态，未连接真实 AI、Render、云资源或团队账号。图像生成与任务执行不发起外部请求。分享面板可选择查看范围，但不创建公网链接。用户已确认暂无下载和销售地址，相关入口保留明确的待接入说明。

## 验证

已通过生产构建、TypeScript、变更组件的代码检查、两种语言的组件渲染检查（包括英文无残留中文、原生表格/输入/勾选控件、无整屏截图引用）和本地 HTTP 访问检查。本轮未执行浏览器截图或端到端交互测试。

## 图片素材

`public/assets/` 使用为网页压缩过的 WebP / JPEG 素材；原始 PNG 保留在 `design-assets/originals/`，Figma 整体参考图位于 `image/`。原始参考素材不会随网页部署包对外提供。
