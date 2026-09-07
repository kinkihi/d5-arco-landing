'use client';
/* oxlint-disable next/no-img-element -- Local Figma assets retain their native dimensions inside scaled artboards. */
import { useState } from 'react';
import {
  BookOpen,
  Image as ImageIcon,
  ArrowUp,
  ChevronDown,
  X,
  Play,
  Pause,
  Minus,
  Plus,
  Share2,
  Sparkles,
  Bookmark,
  ArrowLeft,
  SlidersHorizontal,
} from 'lucide-react';
import { useLanguage } from '../Language';
import {
  Artboard,
  Sidebar,
  Header,
  ChatPanel,
  Toolbar,
  CanvasFooter,
  IconButton,
  Icon,
  InlinePanel,
  Sharing,
  art,
} from './Primitives';
export const skills = [
  ['architecture', '建筑设计', 'Architecture'],
  ['aerial_view', '鸟瞰视角', 'Aerial view'],
  ['landscape', '景观设计', 'Landscape'],
  ['interior', '室内设计', 'Interior'],
  ['commercial_interior', '商业室内', 'Commercial Interior'],
  ['time_shift', '时间变化', 'Time Shift'],
  ['seasonal_migration', '季节变换', 'Seasonal Migration'],
] as const;
function DocumentPreview({
  type,
  onClose,
}: {
  type: 'doc' | 'ppt';
  onClose: () => void;
}) {
  const { t } = useLanguage();
  return (
    <InlinePanel
      title={`${t('项目策划汇报', 'Project proposal')}.${type}`}
      onClose={onClose}
    >
      <h3>
        {t('与自然共生的商业空间', 'A commercial space in harmony with nature')}
      </h3>
      <p>
        {t(
          '以开放、灵活的空间布局，连接自然景观与日常活动。',
          'Connect the natural landscape with everyday life through an open and flexible spatial plan.',
        )}
      </p>
      <ol>
        <li>{t('场地分析与设计目标', 'Site analysis and design goals')}</li>
        <li>{t('空间组织与动线', 'Spatial organization and circulation')}</li>
        <li>{t('材料、植物与光环境', 'Materials, planting and lighting')}</li>
      </ol>
      <img src={art.landscape} alt={t('景观设计参考', 'Landscape reference')} />
    </InlinePanel>
  );
}
export function PlanningBlock() {
  const { t } = useLanguage();
  const [document, setDocument] = useState<'doc' | 'ppt' | null>(null),
    [sharing, setSharing] = useState(false),
    [tab, setTab] = useState('chat'),
    [expanded, setExpanded] = useState(true);
  return (
    <Artboard
      id="design-planning"
      label={t('聊天策划界面', 'Planning interface')}
    >
      <Sidebar expanded={expanded} active={tab} onChange={setTab} />
      <div
        className="studio-planning-main"
        style={{ left: expanded ? 240 : 48 }}
      >
        <Header
          title={t('设计与策划', 'Design and Planning')}
          onShare={() => setSharing(true)}
          onPanel={() => setExpanded(!expanded)}
        />
        <ChatPanel wide onDocument={setDocument} />
        {tab !== 'chat' && (
          <div className="studio-navigation-preview">
            <span>
              {t('当前工作区', 'Current workspace')} ·{' '}
              {t(
                (
                  {
                    canvas: '画布',
                    projects: '项目',
                    skills: '技能',
                    connections: '连接',
                  } as Record<string, string>
                )[tab],
                (
                  {
                    canvas: 'Canvas',
                    projects: 'Projects',
                    skills: 'Skills',
                    connections: 'Connections',
                  } as Record<string, string>
                )[tab],
              )}
            </span>
            <button onClick={() => setTab('chat')}>
              {t('返回聊天', 'Back to chat')}
            </button>
          </div>
        )}
      </div>
      {document && (
        <DocumentPreview type={document} onClose={() => setDocument(null)} />
      )}{' '}
      {sharing && <Sharing onClose={() => setSharing(false)} />}
    </Artboard>
  );
}
const slideArt = [
  art.leaf,
  '/assets/imgFrame1.jpg',
  '/assets/lite.jpg',
  '/assets/plant.webp',
  '/assets/canvasimgThumbnail5.jpg',
];
export function PresentationBlock() {
  const { t } = useLanguage();
  const [page, setPage] = useState(0),
    [editing, setEditing] = useState(false),
    [playing, setPlaying] = useState(false),
    [zoom, setZoom] = useState(100),
    [document, setDocument] = useState<'doc' | 'ppt' | null>(null),
    [sharing, setSharing] = useState(false);
  const titles = [
    t('与自然共生', 'Living with nature'),
    t('材料与色彩', 'Materials & color'),
    t('空间组织', 'Spatial planning'),
    t('植物策略', 'Planting strategy'),
    t('设计愿景', 'Design vision'),
  ];
  return (
    <Artboard
      id="design-presentation"
      label={t('演示文稿界面', 'Presentation interface')}
    >
      <Sidebar />
      <div className="studio-presentation-chat">
        <Header
          title={t('设计与策划', 'Design and Planning')}
          onShare={() => setSharing(true)}
        />
        <ChatPanel
          onDocument={(type) =>
            type === 'ppt' ? setPage(0) : setDocument(type)
          }
        />
      </div>
      <section
        className={`studio-presentation ${playing ? 'is-playing' : ''}`}
        data-ui-block="presentation-editor"
      >
        <header className="studio-slide-top">
          <span>{t('画布', 'Canvas')}</span>
          <strong>{t('项目策划汇报', 'Project proposal')}.ppt</strong>
          <IconButton
            icon={Share2}
            name="share"
            label={t('分享', 'Share')}
            onClick={() => setSharing(true)}
          />
          <span>
            {page + 1} / {titles.length}
          </span>
          <IconButton
            icon={Minus}
            name="minus"
            label={t('缩小', 'Zoom out')}
            onClick={() => setZoom(Math.max(75, zoom - 25))}
          />
          <span>{zoom}%</span>
          <IconButton
            icon={Plus}
            name="plus"
            label={t('放大', 'Zoom in')}
            onClick={() => setZoom(Math.min(125, zoom + 25))}
          />
          <div className="studio-spacer" />
          <button onClick={() => setEditing(!editing)} aria-pressed={editing}>
            {t('编辑', 'Edit')}
          </button>
          <button
            className="studio-dark-button"
            onClick={() => setPlaying(!playing)}
          >
            <Icon
              fallback={playing ? Pause : Play}
              name={playing ? undefined : 'play'}
            />
            {playing ? t('退出播放', 'Exit') : t('播放', 'Play')}
          </button>
        </header>
        <div
          className="studio-slide-thumbnails"
          data-ui-block="slide-thumbnails"
        >
          {titles.map((title, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-pressed={page === i}
            >
              <div className="studio-mini-slide">
                <img src={slideArt[i]} alt="" />
                <span>{title}</span>
              </div>
              <small>{i + 1}</small>
            </button>
          ))}
        </div>
        <div
          className="studio-slide-paper"
          data-ui-block="slide-page"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          <div>
            <h2
              contentEditable={editing}
              suppressContentEditableWarning
              key={`title-${page}-${t('zh', 'en')}`}
            >
              {titles[page]}
            </h2>
            <h3>{t('设计愿景', 'Design vision')}</h3>
            <p
              contentEditable={editing}
              suppressContentEditableWarning
              key={`body-${page}-${t('zh', 'en')}`}
            >
              {t(
                '让建筑融入自然，让日常生活与景观相遇。通过开放的空间、柔和的光线与清晰的材料语言，创造舒适而有活力的体验。以灵活的动线连接不同功能，保留自然生长的可能，让空间随着使用者的需求不断演变。',
                'Bring architecture into nature and connect everyday life with the landscape. Open spaces, soft light and a clear material language create a comfortable and vibrant experience. Flexible circulation links different activities, allowing the space to evolve with the people who use it.',
              )}
            </p>
          </div>
          <img src={slideArt[page]} alt={titles[page]} />
        </div>
        {editing && (
          <small className="studio-edit-hint">
            {t(
              '可直接编辑标题与正文 · 本地预览',
              'Edit the title and body directly · Local preview',
            )}
          </small>
        )}
      </section>
      {document && (
        <DocumentPreview type={document} onClose={() => setDocument(null)} />
      )}{' '}
      {sharing && <Sharing onClose={() => setSharing(false)} />}
    </Artboard>
  );
}
export function SkillsPanel({
  selected,
  onSelect,
  onClose,
}: {
  selected: number;
  onSelect: (n: number) => void;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  return (
    <aside className="studio-skills" data-ui-block="skills-panel">
      <header>
        {t('技能', 'Skills')}
        <IconButton
          icon={X}
          name="close"
          label={t('收起技能', 'Hide skills')}
          onClick={onClose}
        />
      </header>
      <div>
        {skills.map(([file, zh, en], i) => (
          <button
            key={file}
            onClick={() => onSelect(i)}
            aria-pressed={selected === i}
          >
            <img src={`/assets/skill-${file}.webp`} alt="" />
            <span>{t(zh, en)}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
export function CanvasBlock() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(0),
    [showSkills, setShowSkills] = useState(true),
    [zoom, setZoom] = useState(200),
    [document, setDocument] = useState<'doc' | 'ppt' | null>(null),
    [sharing, setSharing] = useState(false),
    [note, setNote] = useState(false);
  return (
    <Artboard
      id="design-canvas"
      label={t('画布编辑界面', 'Canvas editing interface')}
    >
      <Sidebar active="canvas" />
      <div className="studio-canvas-chat">
        <Header
          title={t('设计与策划', 'Design and Planning')}
          onShare={() => setSharing(true)}
        />
        <ChatPanel onDocument={setDocument} />
      </div>
      <section
        className="studio-canvas-workspace"
        data-ui-block="canvas-workspace"
      >
        <Header
          title={`${t('画布', 'Canvas')}　 ${t('项目策划汇报', 'Project proposal')}.ppt`}
          onPanel={() => setShowSkills(!showSkills)}
        />
        <Toolbar
          vertical
          onTool={(tool) => {
            if (tool === 'skills') setShowSkills(!showSkills);
            if (tool === 'note') setNote(!note);
          }}
        />
        {showSkills && (
          <SkillsPanel
            selected={selected}
            onSelect={setSelected}
            onClose={() => setShowSkills(false)}
          />
        )}
        <div
          className="studio-image-selection"
          style={{ transform: `scale(${zoom / 200})` }}
          data-ui-block="selected-image"
        >
          <Toolbar
            onTool={(tool) => {
              if (tool === 'skills') setShowSkills(!showSkills);
              if (tool === 'share') setSharing(true);
              if (tool === 'note') setNote(!note);
            }}
          />
          <small>
            <ImageIcon size={12} />
            {t('图片', 'Image')}
          </small>
          <img
            className="studio-canvas-art"
            src={art.landscape}
            alt={t('花海中的石质建筑', 'Stone architecture in a flower meadow')}
          />
          <span className="studio-dimensions">1920 × 1080</span>
          {selected > 0 && (
            <span className="studio-selected-skill">
              <BookOpen size={13} />
              {t(skills[selected][1], skills[selected][2])}
            </span>
          )}
        </div>
        {note && (
          <textarea
            className="studio-canvas-note"
            aria-label={t('画布便笺', 'Canvas note')}
            defaultValue={t(
              '在这里记录你的设计想法…',
              'Capture your design ideas here…',
            )}
          />
        )}
        <CanvasFooter zoom={zoom} onZoom={setZoom} />
      </section>
      {document && (
        <DocumentPreview type={document} onClose={() => setDocument(null)} />
      )}{' '}
      {sharing && <Sharing onClose={() => setSharing(false)} />}
    </Artboard>
  );
}
export function GenerationBlock() {
  const { t } = useLanguage();
  const [prompt, setPrompt] = useState(''),
    [generated, setGenerated] = useState(false),
    [zoom, setZoom] = useState(200),
    [style, setStyle] = useState('natural');
  return (
    <Artboard
      id="design-generation"
      label={t('图像生成界面', 'Image generation interface')}
    >
      <Sidebar active="canvas" />
      <section className="studio-generation">
        <Header
          title={`${t('画布', 'Canvas')}　 ${t('项目策划汇报', 'Project proposal')}.ppt`}
        />
        <Toolbar vertical />
        <img
          className="studio-generation-source"
          src={art.landscape}
          alt={t('原始图片', 'Source image')}
        />
        <div
          className="studio-generation-result"
          data-ui-block="generation-result"
          style={{ transform: `scale(${zoom / 200})` }}
        >
          <div className="studio-generation-settings">
            <select aria-label={t('画面比例', 'Aspect ratio')}>
              <option>{t('自动', 'Auto')}</option>
              <option>16:9</option>
              <option>1:1</option>
            </select>
            <select aria-label={t('图像清晰度', 'Resolution')}>
              <option>HD 1K</option>
              <option>HD 2K</option>
            </select>
            <select aria-label={t('模型版本', 'Model version')}>
              <option>V2</option>
              <option>V1</option>
            </select>
          </div>
          <small>
            <BookOpen size={12} />
            {generated
              ? t('生成效果预览', 'Generated effect preview')
              : t('技能', 'Skill')}
          </small>
          <div className="studio-generation-placeholder">
            {generated ? (
              <img
                src={style === 'natural' ? art.garden : art.interior}
                alt={t('本地效果示例', 'Local result example')}
              />
            ) : (
              <ImageIcon size={32} />
            )}
          </div>
        </div>
        <form
          className="studio-generation-prompt"
          data-ui-block="generation-prompt"
          onSubmit={(e) => {
            e.preventDefault();
            setGenerated(true);
          }}
        >
          <div className="studio-filter-row">
            <ArrowLeft size={16} />
            <select
              aria-label={t('渲染风格', 'Render style')}
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option value="natural">{t('渲染风格', 'Render style')}</option>
              <option value="interior">{t('室内效果', 'Interior')}</option>
            </select>
            {[
              [t('设计风格', 'Design style'), t('现代', 'Modern')],
              [t('人物', 'People'), t('无人物', 'None')],
              [t('车辆', 'Vehicles'), t('无车辆', 'None')],
              [t('天气', 'Weather'), t('晴天', 'Sunny')],
            ].map(([label, option]) => (
              <select key={label} aria-label={label}>
                <option>{label}</option>
                <option>{option}</option>
              </select>
            ))}
          </div>
          <span className="studio-prompt-reference">
            <ImageIcon size={20} />
          </span>
          <textarea
            aria-label={t('生成描述', 'Generation prompt')}
            placeholder={t('描述更多细节…', 'Describe more details…')}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="studio-generation-actions">
            <SlidersHorizontal size={16} />
            <Sparkles size={16} />
            <Bookmark size={16} />
            <span>
              <ImageIcon size={16} /> 2 <ChevronDown size={12} />
            </span>
            <button
              className="studio-ai-button"
              type="submit"
              aria-label={t('预览生成效果', 'Preview generation')}
            >
              <ArrowUp size={18} />
            </button>
          </div>
          {generated && (
            <small className="studio-local-result">
              {t(
                '本地示例效果，未调用生成服务',
                'Local example; no generation service is connected',
              )}
            </small>
          )}
        </form>
        <CanvasFooter
          zoom={zoom}
          onZoom={setZoom}
          onReset={() => setGenerated(false)}
        />
      </section>
    </Artboard>
  );
}
