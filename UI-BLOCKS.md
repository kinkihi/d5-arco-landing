# Arco UI Block 索引

后续交互需求可使用下表名称。`data-ui-block` 是组件维护标记，不包含临时预览属性。所有组件使用 `useLanguage()` 获取文案；状态尽量使用稳定 ID / 索引，语言切换不重建画面。

| 画面 / 区域 | 组件 | 稳定标记 |
|---|---|---|
| 聊天策划 | PlanningBlock | design-planning |
| 演示文稿 | PresentationBlock | design-presentation |
| 技能画布 | CanvasBlock | design-canvas |
| 图像生成 | GenerationBlock | design-generation |
| Render 联动 | RenderBlock | connection-render |
| 云资源引用 | ResourcesBlock | connection-resources |
| 分步迁移 | TransferBlock | connection-transfer |
| 协作 Bento | CollaborationBlock | team-collaboration |
| D5 Lite | EcosystemCards | d5-lite |
| D5 Works | EcosystemCards | d5-works |

## 第二章节

位于 `app/ui-blocks/DesignBlocks.tsx`：

- `presentation-editor`、`slide-thumbnails`、`slide-page`：编辑面板、缩略图列表和文本页面。
- `skills-panel`：技能列表。
- `canvas-workspace`、`selected-image`：画布与选中图片。
- `generation-result`、`generation-prompt`：输出区域和描述 / 参数。

## 第三章节

位于 `app/ui-blocks/ConnectionBlocks.tsx`：

- `connection-prompt`：关联提示。
- `render-workspace`、`render-scene-list`、`render-object-list`、`render-viewport`：Render 工作区。
- `quick-reference`、`linked-project`、`project-resource-browser`：快捷引用、关联项目、资源列表。
- `asset-picker`、`transfer-task-list`、`transfer-composer`：素材弹层、迁移任务与输入。

## 第四章节与生态卡片

位于 `app/ui-blocks/TeamBlocks.tsx`：

- `collaborative-canvas`：协作画布与评论。
- `team-projects`：项目文件夹。
- `team-member-management`：成员表格与积分分配。
- `team-sales`：销售入口。
- `works-asset-grid`：D5 Works 单个素材单元。

## 共享组件

位于 `app/ui-blocks/Primitives.tsx`：

- `sidebar`、`canvas-toolbar`、`chat-thread`、`chat-composer`。
- `document-doc`、`document-ppt`：文档卡片。
- `Artboard` 保持原稿尺寸比例，`ResizeObserver` 同步缩放；`DesignGallery` 管理滚动与当前可交互画面。

作品图片和 SVG 图标使用 `public/assets` 中的原始素材；UI 文本与交互层不得再替换为整屏图片。
