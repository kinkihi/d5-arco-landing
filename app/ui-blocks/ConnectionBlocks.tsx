'use client';
/* oxlint-disable next/no-img-element -- Local Figma assets retain their native dimensions inside scaled artboards. */
import { useState } from 'react';
import {
  Menu,
  FileDown,
  MessageCircle,
  Sparkles,
  Lightbulb,
  Leaf,
  Flame,
  Frame,
  Layers,
  Globe,
  Camera,
  Eye,
  Plus,
  ChevronDown,
  ChevronRight,
  Check,
  Search,
  Grid2X2,
  List,
  Image as ImageIcon,
  Video,
  Sun,
  SlidersHorizontal,
  ArrowUp,
  Bookmark,
  X,
  ArrowLeft,
  ArrowRight,
  Box,
} from 'lucide-react';
import { useLanguage } from '../Language';
import {
  Artboard,
  Sidebar,
  Header,
  Composer,
  IconButton,
  Toolbar,
  CanvasFooter,
  Sharing,
  art,
} from './Primitives';
export function SceneList({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (n: number) => void;
}) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(true);
  const row = (i: number) => (
    <button
      key={i}
      className="studio-scene-row"
      onClick={() => onSelect(i)}
      aria-pressed={selected === i}
    >
      <span className="studio-empty-thumb">
        <ImageIcon size={16} />
      </span>
      <span>
        {t('场景', 'Scene')} {i + 1}
      </span>
      <Video size={14} />
    </button>
  );
  return (
    <div className="studio-render-scenes" data-ui-block="render-scene-list">
      <header>
        {t('场景', 'Scene')}
        <Plus size={16} />
      </header>
      {[0, 1, 2].map(row)}
      <button
        className="studio-scene-group"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <ChevronRight
          size={12}
          style={{ transform: expanded ? 'rotate(90deg)' : undefined }}
        />
        {t('场景组', 'Scene Group')}
      </button>
      {expanded && [3, 4].map(row)}
    </div>
  );
}
export function RenderBlock() {
  const { t } = useLanguage();
  const [connected, setConnected] = useState(false),
    [ignored, setIgnored] = useState(false),
    [scene, setScene] = useState(-1),
    [search, setSearch] = useState(''),
    [selectedObject, setSelectedObject] = useState<number | null>(null),
    [sharing, setSharing] = useState(false),
    [showScene, setShowScene] = useState(true);
  const objects = [
    t('素材名称', 'Asset Name'),
    t('聚光灯', 'Spotlight'),
    t('线光源', 'Line light'),
    t('矩形光源', 'Rect light'),
    t('盘形光源', 'Disk light'),
    t('舞台灯', 'Stage light'),
  ];
  return (
    <Artboard
      id="connection-render"
      label={t('D5 Render 联动界面', 'D5 Render connection interface')}
    >
      <Sidebar active="connections" />
      <section className="studio-render-chat">
        <Header
          title={t('连接', 'Connection')}
          onShare={() => setSharing(true)}
        />
        {!ignored && (
          <div
            className="studio-connect-card"
            data-ui-block="connection-prompt"
          >
            <strong>
              {connected
                ? t('已关联 D5 工作流', 'D5 workflow connected')
                : t('需要关联 D5 工作流吗？', 'Connect to your D5 workflow?')}
            </strong>
            <p>
              {t(
                '已检测到当前正在运行的 D5 程序',
                'An active D5 application has been detected.',
              )}
            </p>
            <div>
              <Frame size={14} />
              <span>{t('D5 Render 项目', 'D5 Render Project')}.drs</span>
              <button onClick={() => setIgnored(true)}>
                {t('忽略', 'Ignore')}
              </button>
              <button
                className="studio-dark-button"
                onClick={() => setConnected(!connected)}
              >
                {connected ? t('断开', 'Disconnect') : t('关联', 'Connect')}
              </button>
            </div>
          </div>
        )}
        {ignored && (
          <button
            className="studio-reconnect"
            onClick={() => setIgnored(false)}
          >
            {t('查看可关联项目', 'Show available project')}
          </button>
        )}
        <Composer connection onSend={() => setConnected(true)} />
      </section>
      <section className="studio-render-app" data-ui-block="render-workspace">
        <div className="studio-render-title">
          <img src="/assets/brand.webp" alt="D5" />
          {t('D5 Render 项目', 'D5 Render Project')}
          {connected && (
            <span className="studio-connected">
              <Check size={12} />
              {t('已关联', 'Connected')}
            </span>
          )}
        </div>
        <div className="studio-render-toolbar">
          <IconButton
            icon={Menu}
            label={t('显示场景列表', 'Toggle scenes')}
            onClick={() => setShowScene(!showScene)}
          />
          <FileDown size={17} />
          <MessageCircle size={17} />
          <Sparkles size={17} />
          <button onClick={() => setSearch(search ? '' : objects[0])}>
            {t('素材', 'Assets')}
          </button>
          {[Lightbulb, Leaf, Flame, Frame, Layers].map((I, i) => (
            <I key={i} size={18} />
          ))}
        </div>
        {showScene && (
          <aside className="studio-render-sidebar">
            <SceneList selected={scene} onSelect={setScene} />
            <div className="studio-render-layer">
              <header>
                {t('图层', 'Layer')}
                <Plus size={16} />
              </header>
              <p>
                <Check size={14} />
                <Layers size={14} />
                {t('默认', 'Default')}
              </p>
            </div>
            <div
              className="studio-render-objects"
              data-ui-block="render-object-list"
            >
              <header>
                {t('对象', 'Object')} <span>{t('导入', 'Imported')}</span>
              </header>
              <label>
                <Search size={14} />
                <input
                  aria-label={t('搜索对象', 'Search objects')}
                  placeholder={t('搜索', 'Search')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
              {objects
                .filter((name) =>
                  name.toLowerCase().includes(search.toLowerCase()),
                )
                .map((name, i) => (
                  <button
                    key={name}
                    onClick={() => setSelectedObject(objects.indexOf(name))}
                    aria-pressed={objects.indexOf(name) === selectedObject}
                  >
                    {i === 0 ? <Leaf size={16} /> : <Lightbulb size={16} />}{' '}
                    {name}
                  </button>
                ))}
            </div>
          </aside>
        )}
        <div
          className="studio-render-viewport"
          style={{ left: showScene ? 240 : 0 }}
          data-ui-block="render-viewport"
        >
          <div className="studio-viewport-controls">
            <span>
              <Frame size={16} />
              <Globe size={16} />
            </span>
            <span>
              <Camera size={16} />
              {t('相机', 'Camera')}
              <ChevronDown size={12} />
              <Eye size={16} />
            </span>
          </div>
          <div className="studio-ground-grid" />
          {scene >= 0 && (
            <span className="studio-viewport-label">
              {t('场景', 'Scene')} {scene + 1}
            </span>
          )}
          {selectedObject !== null && (
            <div className="studio-object-selection">
              <Box size={80} />
              <span>
                {selectedObject !== null ? objects[selectedObject] : null}
              </span>
            </div>
          )}
        </div>
      </section>
      {sharing && <Sharing onClose={() => setSharing(false)} />}
    </Artboard>
  );
}
export function Checker({ stack = false }: { stack?: boolean }) {
  return (
    <span
      className={`studio-checker ${stack ? 'is-stack' : ''}`}
      aria-hidden="true"
    />
  );
}
export function QuickReference({
  onSelect,
  active,
}: {
  onSelect: (n: number) => void;
  active: number;
}) {
  const { t } = useLanguage();
  const cards = [
    [
      t('场景列表', 'Scene list'),
      t('300 个 / 100 组', '300 scenes / 100 groups'),
      null,
    ],
    [t('渲染记录', 'Render history'), t('48 张图片', '48 images'), null],
    [
      t('已有材质', 'Materials'),
      t('24 种', '24 materials'),
      '/assets/materials.webp',
    ],
    [t('已有素材', 'Assets'), t('39 种', '39 assets'), '/assets/chair.webp'],
  ];
  return (
    <div className="studio-quick-reference" data-ui-block="quick-reference">
      <header>
        {t('快捷引用', 'Quick reference')}
        <span>
          <ArrowLeft size={14} />
          <ArrowRight size={14} />
          <X size={14} />
        </span>
      </header>
      <div>
        {cards.map(([title, count, img], i) => (
          <button
            key={title}
            onClick={() => onSelect(i)}
            aria-pressed={active === i}
          >
            <strong>{title}</strong>
            <small>{count}</small>
            {img ? (
              <img src={img} alt={title || ''} />
            ) : (
              <span className="studio-resource-empty">
                <ImageIcon size={26} />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
export function ResourceBrowser({
  tab,
  onTab,
  onReference,
}: {
  tab: number;
  onTab: (n: number) => void;
  onReference: (n: number) => void;
}) {
  const { t } = useLanguage();
  const [grid, setGrid] = useState(false),
    [selected, setSelected] = useState(-1);
  const tabs = [
    t('场景列表', 'Scenes'),
    t('渲染队列', 'Renders'),
    t('已有材质', 'Materials'),
    t('已有资源', 'Assets'),
  ];
  return (
    <aside
      className="studio-resource-browser"
      data-ui-block="project-resource-browser"
    >
      <header>
        <span>{t('画布', 'Canvas')}</span>
        <span>{t('详情', 'Details')}</span>
        <strong>{t('项目', 'Project')}</strong>
      </header>
      <nav>
        {tabs.map((label, i) => (
          <button
            key={i}
            onClick={() => {
              onTab(i);
              setSelected(-1);
            }}
            aria-pressed={tab === i}
          >
            {label}
          </button>
        ))}
        <IconButton
          icon={grid ? List : Grid2X2}
          label={t('切换列表布局', 'Toggle list layout')}
          onClick={() => setGrid(!grid)}
        />
      </nav>
      <div className={`studio-resource-rows ${grid ? 'is-grid' : ''}`}>
        {Array.from({ length: 7 }, (_, i) => {
          const name =
            tab === 0
              ? `${t(i === 3 ? '场景组' : '场景列表', i === 3 ? 'Scene Group' : 'Scene')} ${i + 1}`
              : `${tabs[tab]} ${i + 1}`;
          return (
            <button
              key={i}
              onClick={() => {
                setSelected(i);
                onReference(i);
              }}
              aria-pressed={selected === i}
            >
              {tab < 2 ? (
                <Checker stack={i === 3 || i === 6} />
              ) : (
                <img
                  src={
                    tab === 2 ? '/assets/materials.webp' : '/assets/chair.webp'
                  }
                  alt=""
                />
              )}
              <span>{name}</span>
              {selected === i ? (
                <Check size={16} />
              ) : i === 3 ? (
                <ChevronRight size={16} />
              ) : null}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
export function ResourcesBlock() {
  const { t } = useLanguage();
  const [tab, setTab] = useState(0),
    [reference, setReference] = useState(0),
    [linked, setLinked] = useState(true),
    [sharing, setSharing] = useState(false);
  return (
    <Artboard
      id="connection-resources"
      label={t('云资源引用界面', 'Cloud resource interface')}
    >
      <Sidebar active="connections" />
      <section className="studio-resource-main">
        <Header
          title={t('连接', 'Connection')}
          onShare={() => setSharing(true)}
        />
        <QuickReference active={tab} onSelect={setTab} />
        <div className="studio-linked-project" data-ui-block="linked-project">
          <button onClick={() => setLinked(!linked)}>
            <ChevronDown size={12} />
            {linked ? t('关联中', 'Connected') : t('已收起', 'Collapsed')}
          </button>
          {linked && (
            <div>
              <Frame size={14} />
              {t('Render 的项目名字', 'Render project')}.drs
              <MoreSymbol />
            </div>
          )}
        </div>
        <Composer
          connection
          reference={`${t('资源', 'Resource')} ${reference + 1}`}
        />
      </section>
      <ResourceBrowser tab={tab} onTab={setTab} onReference={setReference} />
      {sharing && <Sharing onClose={() => setSharing(false)} />}
    </Artboard>
  );
}
function MoreSymbol() {
  return (
    <span className="studio-more-symbol" aria-hidden="true">
      ⋮
    </span>
  );
}
export function AssetPicker({
  onClose,
  onReference,
}: {
  onClose: () => void;
  onReference: (n: number) => void;
}) {
  const { t } = useLanguage();
  const [tab, setTab] = useState(2),
    [group, setGroup] = useState(0),
    [selected, setSelected] = useState(-1);
  return (
    <div className="studio-asset-picker" data-ui-block="asset-picker">
      <header>
        {[
          t('当前对话', 'Current chat'),
          t('全部生成', 'Generated'),
          t('关联中', 'Connected'),
          t('云资源', 'Cloud assets'),
        ].map((label, i) => (
          <button key={i} onClick={() => setTab(i)} aria-pressed={tab === i}>
            {label}
          </button>
        ))}
        <IconButton
          icon={X}
          name="close"
          label={t('关闭资源', 'Close assets')}
          onClick={onClose}
        />
      </header>
      <nav>
        {[t('场景列表', 'Scene list'), t('渲染队列', 'Render queue')].map(
          (label, i) => (
            <button
              key={i}
              onClick={() => setGroup(i)}
              aria-pressed={group === i}
            >
              {label}
            </button>
          ),
        )}
        <Grid2X2 size={16} />
      </nav>
      <div>
        {Array.from({ length: 8 }, (_, i) => (
          <button
            key={`${tab}-${group}-${i}`}
            aria-label={`${t('引用资源', 'Reference asset')} ${i + 1}`}
            aria-pressed={selected === i}
            onClick={() => {
              setSelected(i);
              onReference(i);
            }}
          >
            <Checker />
            {selected === i && <Check size={16} />}
          </button>
        ))}
      </div>
    </div>
  );
}
export function TransferTasks({
  checked,
  onChange,
}: {
  checked: boolean[];
  onChange: (i: number) => void;
}) {
  const { t } = useLanguage();
  const labels = [
    [
      t('氛围', 'Atmosphere'),
      t(
        '环境、特效等全局视觉参数',
        'Environment, effects and global visual settings',
      ),
      Sun,
    ],
    [
      t('素材', 'Assets'),
      t(
        '模型搭配及路径、散布、城市等配景生成',
        'Models, paths, scattering and context elements',
      ),
      Leaf,
    ],
    [
      t('材质', 'Materials'),
      t(
        '匹配及推荐图片中的材质',
        'Match and recommend materials from the image',
      ),
      Layers,
    ],
  ] as const;
  return (
    <div className="studio-transfer-tasks" data-ui-block="transfer-task-list">
      <h3>{t('分步式迁移', 'Step-by-step transfer')}</h3>
      <p>
        {t(
          '可确认迁移细节，迁移任务将依次执行',
          'Review the details. Transfer tasks will run in sequence.',
        )}
      </p>
      {labels.map(([title, description, I], i) => (
        <label key={i}>
          <input
            type="checkbox"
            checked={checked[i]}
            onChange={() => onChange(i)}
          />
          <span className="studio-task-icon">
            <I size={20} />
          </span>
          <span>
            <strong>{title}</strong>
            <small>{description}</small>
          </span>
          <SlidersHorizontal size={15} />
        </label>
      ))}
    </div>
  );
}
export function TransferBlock() {
  const { t } = useLanguage();
  const [assets, setAssets] = useState(true),
    [checked, setChecked] = useState([true, true, true]),
    [reference, setReference] = useState(-1),
    [started, setStarted] = useState(false),
    [zoom, setZoom] = useState(200),
    [sharing, setSharing] = useState(false);
  return (
    <Artboard
      id="connection-transfer"
      label={t('场景迁移与批量操作', 'Scene transfer and batch operations')}
    >
      <Sidebar active="canvas" />
      <section className="studio-transfer">
        <Header
          title={t('连接', 'Connection')}
          onShare={() => setSharing(true)}
        />
        <Toolbar vertical onTool={() => setAssets(!assets)} />
        <div
          className="studio-transfer-image"
          style={{ transform: `scale(${zoom / 200})` }}
        >
          <small>
            <ImageIcon size={12} />
            {t('图片', 'Image')}
          </small>
          <img
            src={art.landscape}
            alt={t('待迁移的设计图片', 'Design image to transfer')}
          />
        </div>
        {assets && (
          <AssetPicker
            onClose={() => setAssets(false)}
            onReference={setReference}
          />
        )}
        <div className="studio-transfer-right">
          <small className="studio-transfer-status" aria-live="polite">
            {started
              ? t('预览任务已选择', 'Preview tasks selected')
              : t('等待迁移', 'Ready to transfer')}
          </small>
          <TransferTasks
            checked={checked}
            onChange={(i) => {
              setChecked((v) => v.map((n, j) => (j === i ? !n : n)));
              setStarted(false);
            }}
          />
          <div
            className="studio-transfer-composer"
            data-ui-block="transfer-composer"
          >
            <div>
              <img src="/assets/skill-storyboard.webp" alt="" />
              {reference >= 0 && (
                <span>
                  {t('资源', 'Asset')} {reference + 1}
                </span>
              )}
              <Bookmark size={16} />
            </div>
            <textarea
              aria-label={t('迁移说明', 'Transfer instructions')}
              placeholder={t('补充迁移说明…', 'Add transfer instructions…')}
            />
            <footer>
              <SlidersHorizontal size={16} />
              <Sparkles size={16} />
              <Bookmark size={16} />
              <button
                className="studio-ai-button"
                disabled={!checked.some(Boolean)}
                onClick={() => setStarted(true)}
                aria-label={t('预览迁移任务', 'Preview transfer tasks')}
              >
                <ArrowUp size={18} />
              </button>
            </footer>
            {started && (
              <small>
                {t(
                  `已选择 ${checked.filter(Boolean).length} 项，本地预览未修改 Render 项目。`,
                  `${checked.filter(Boolean).length} tasks selected. This local preview does not modify a Render project.`,
                )}
              </small>
            )}
          </div>
        </div>
        <CanvasFooter zoom={zoom} onZoom={setZoom} />
      </section>
      {sharing && <Sharing onClose={() => setSharing(false)} />}
    </Artboard>
  );
}
