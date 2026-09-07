'use client';
/* oxlint-disable next/no-img-element -- Local Figma assets retain their native dimensions inside scaled artboards. */
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from 'react';
import {
  Home,
  MessageCircle,
  Frame,
  Folder,
  BookOpen,
  Unplug,
  ImagePlus,
  StickyNote,
  Upload,
  History,
  MousePointer2,
  Hand,
  RotateCcw,
  Map,
  Minus,
  Plus,
  Maximize,
  Grid2X2,
  Share2,
  PanelRight,
  ChevronDown,
  ArrowUp,
  FileText,
  Presentation,
  AtSign,
  MoreVertical,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useLanguage } from '../Language';
export const art = {
  landscape: '/assets/imgImageFrame.jpg',
  garden: '/assets/figma147/hero-garden.webp',
  interior: '/assets/imgImgVillaGarden4.jpg',
  plan: '/assets/imgImgVillaGarden3.jpg',
  leaf: '/assets/ui/slides-imgImage.webp',
  lite: '/assets/ui/ecosystem-imgImage.webp',
};
const exported: Record<string, string> = {
  home: 'planning-imgHouseSimple',
  chevron: 'planning-imgChevronDown',
  share: 'planning-imgShare',
  panel: 'planning-imgSidebarRight',
  plus: 'planning-imgAdd',
  folder: 'planning-imgFolderVertical',
  at: 'planning-imgAt',
  more: 'planning-imgMore',
  close: 'canvasDetail-imgClose',
  pointer: 'canvasDetail-imgSelectionCursor',
  reset: 'team-imgArrowClockwise',
  minus: 'team-imgMinus',
  play: 'slides-imgPlaySimple',
  download: 'slides-imgArrowDownload',
};
export function Icon({
  name,
  fallback: Fallback,
  size = 16,
}: {
  name?: string;
  fallback: LucideIcon;
  size?: number;
}) {
  return name && exported[name] ? (
    <img
      className="studio-icon"
      src={`/assets/ui/${exported[name]}.svg`}
      width={size}
      height={size}
      alt=""
    />
  ) : (
    <Fallback size={size} strokeWidth={1.5} aria-hidden="true" />
  );
}
export function IconButton({
  icon,
  label,
  onClick,
  active = false,
  name,
  disabled = false,
}: {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  active?: boolean;
  name?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className="studio-icon-button"
      title={label}
      aria-label={label}
      aria-pressed={onClick ? active : undefined}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon fallback={icon} name={name} />
    </button>
  );
}
export function Artboard({
  children,
  id,
  label,
  width = 1440,
  height = 800,
  className = '',
}: {
  children: ReactNode;
  id: string;
  label: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / width);
    const observer = new ResizeObserver(update);
    observer.observe(el);
    update();
    return () => observer.disconnect();
  }, [width]);
  return (
    <div
      ref={root}
      className={`studio-frame ${className}`}
      data-ui-block={id}
      aria-label={label}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      <div
        className="studio-artboard"
        style={{
          width,
          height,
          transform: `scale(${scale || 1})`,
          visibility: scale ? 'visible' : 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
}
export function Sidebar({
  expanded = false,
  active = 'chat',
  onChange,
}: {
  expanded?: boolean;
  active?: string;
  onChange?: (value: string) => void;
}) {
  const { t } = useLanguage();
  const menu = [
    ['chat', MessageCircle, t('新聊天', 'New Chat')],
    ['canvas', Frame, t('画布', 'Canvas')],
    ['projects', Folder, t('项目', 'Projects')],
    ['skills', BookOpen, t('技能', 'Skills')],
    ['connections', Unplug, t('连接', 'Connections')],
  ] as const;
  return (
    <aside
      className={`studio-sidebar ${expanded ? 'is-expanded' : ''}`}
      data-ui-block="sidebar"
    >
      <div className="studio-side-home">
        <IconButton
          icon={Home}
          name="home"
          label={t('首页', 'Home')}
          onClick={() => onChange?.('chat')}
        />
        {expanded && <Icon name="panel" fallback={PanelRight} />}
      </div>
      <nav>
        {menu.map(([key, I, title]) => (
          <button
            key={key}
            onClick={() => onChange?.(key)}
            aria-label={title}
            title={title}
            aria-pressed={active === key}
          >
            <Icon fallback={I} />
            {expanded && <span>{title}</span>}
          </button>
        ))}
      </nav>
      {expanded && <small>{t('最近', 'Recent')}</small>}
      <button
        className="studio-recent"
        title={t('设计与策划', 'Design and Planning')}
        onClick={() => onChange?.('chat')}
      >
        <MessageCircle size={14} />
        {expanded && <span>{t('设计与策划', 'Design and Planning')}</span>}
      </button>
    </aside>
  );
}
export function Header({
  title,
  children,
  onShare,
  onPanel,
}: {
  title: string;
  children?: ReactNode;
  onShare?: () => void;
  onPanel?: () => void;
}) {
  const { t } = useLanguage();
  return (
    <header className="studio-header">
      <span>{title}</span>
      <Icon name="chevron" fallback={ChevronDown} />
      <div className="studio-header-actions">
        {children}
        {onShare && (
          <IconButton
            icon={Share2}
            name="share"
            label={t('分享', 'Share')}
            onClick={onShare}
          />
        )}{' '}
        {onPanel && (
          <IconButton
            icon={PanelRight}
            name="panel"
            label={t('切换面板', 'Toggle panel')}
            onClick={onPanel}
          />
        )}
      </div>
    </header>
  );
}
export function Toolbar({
  vertical = false,
  onTool,
}: {
  vertical?: boolean;
  onTool?: (tool: string) => void;
}) {
  const { t } = useLanguage();
  const [active, setActive] = useState('select');
  const items = vertical
    ? ([
        ['image', ImagePlus, t('添加图片', 'Add image')],
        ['note', StickyNote, t('便笺', 'Note')],
        ['skills', BookOpen, t('技能', 'Skills')],
        ['upload', Upload, t('导入', 'Import')],
        ['history', History, t('历史记录', 'History')],
        ['connect', Unplug, t('关联资源', 'Linked resources')],
        ['project', Folder, t('项目', 'Project')],
      ] as const)
    : ([
        ['undo', RotateCcw, t('撤销', 'Undo')],
        ['select', MousePointer2, t('选择', 'Select')],
        ['image', ImagePlus, t('图片', 'Image')],
        ['skills', BookOpen, t('技能', 'Skills')],
        ['note', StickyNote, t('便笺', 'Note')],
        ['share', Share2, t('分享', 'Share')],
        ['more', MoreVertical, t('更多工具', 'More tools')],
      ] as const);
  return (
    <div
      className={`studio-tools ${vertical ? 'is-vertical' : ''}`}
      data-ui-block="canvas-toolbar"
    >
      {items.map(([key, I, label]) => (
        <IconButton
          key={key}
          icon={I}
          label={label}
          active={active === key}
          onClick={() => {
            setActive(key);
            onTool?.(key);
          }}
        />
      ))}
    </div>
  );
}
export function CanvasFooter({
  zoom = 200,
  onZoom,
  onReset,
}: {
  zoom?: number;
  onZoom?: (n: number) => void;
  onReset?: () => void;
}) {
  const { t } = useLanguage();
  const [tool, setTool] = useState('select');
  return (
    <div className="studio-canvas-footer">
      <div>
        <IconButton
          icon={MousePointer2}
          name="pointer"
          label={t('选择', 'Select')}
          active={tool === 'select'}
          onClick={() => setTool('select')}
        />
        <IconButton
          icon={Hand}
          label={t('平移', 'Pan')}
          active={tool === 'pan'}
          onClick={() => setTool('pan')}
        />
      </div>
      <div>
        <IconButton
          icon={RotateCcw}
          name="reset"
          label={t('重置视图', 'Reset view')}
          onClick={() => {
            onZoom?.(200);
            onReset?.();
          }}
        />
        <Map size={16} />
        <IconButton
          icon={Minus}
          name="minus"
          label={t('缩小', 'Zoom out')}
          onClick={() => onZoom?.(Math.max(50, zoom - 25))}
        />
        <span>{zoom}%</span>
        <IconButton
          icon={Plus}
          name="plus"
          label={t('放大', 'Zoom in')}
          onClick={() => onZoom?.(Math.min(300, zoom + 25))}
        />
        <Grid2X2 size={16} />
        <IconButton
          icon={Maximize}
          label={t('适应画布', 'Fit canvas')}
          onClick={() => onZoom?.(200)}
        />
      </div>
    </div>
  );
}
export function DocumentCard({
  type = 'doc',
  compact = false,
  onOpen,
}: {
  type?: 'doc' | 'ppt';
  compact?: boolean;
  onOpen?: () => void;
}) {
  const { t } = useLanguage();
  return (
    <button
      className={`studio-document ${compact ? 'is-compact' : ''}`}
      onClick={onOpen}
      data-ui-block={`document-${type}`}
    >
      <span className="studio-file-icon">
        {type === 'doc' ? <FileText size={24} /> : <Presentation size={24} />}
        <small>{type.toUpperCase()}</small>
      </span>
      <span>
        <strong>
          {compact
            ? t('项目资料', 'Project Information')
            : `${t('项目策划汇报', 'Project proposal')}.${type}`}
        </strong>
        {!compact && (
          <small>
            {t(
              '基于 BRUTHER 建筑风格的极简主义景观实践，打造开放、灵活、生态的科研社区。',
              'A minimalist landscape inspired by BRUTHER: an open, flexible and ecological research community.',
            )}
          </small>
        )}
      </span>
    </button>
  );
}
export function Composer({
  onSend,
  reference,
  connection = false,
}: {
  onSend?: (message: string) => void;
  reference?: string;
  connection?: boolean;
}) {
  const { t } = useLanguage();
  const [value, setValue] = useState('');
  const [attachment, setAttachment] = useState(false);
  return (
    <form
      className="studio-composer"
      data-ui-block="chat-composer"
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) {
          onSend?.(value.trim());
          setValue('');
        }
      }}
    >
      {(reference || attachment) && (
        <span className="studio-reference">
          <Folder size={13} />
          {reference || t('项目资料', 'Project information')}
          <button
            type="button"
            aria-label={t('移除引用', 'Remove reference')}
            onClick={() => setAttachment(false)}
            disabled={!!reference}
          >
            <X size={12} />
          </button>
        </span>
      )}
      <textarea
        aria-label={t('消息', 'Message')}
        placeholder={t('@添加， /引用', '@Add, /reference')}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="studio-composer-actions">
        <IconButton
          icon={Plus}
          name="plus"
          label={t('添加项目资料', 'Add project information')}
          onClick={() => setAttachment((v) => !v)}
        />
        <select aria-label={t('AI 模型', 'AI model')} defaultValue="auto">
          <option value="auto">{t('AI 模型', 'AI Model')}</option>
          <option>Arco</option>
        </select>
        <button
          type="submit"
          className="studio-send"
          disabled={!value.trim()}
          aria-label={t('发送', 'Send')}
        >
          <ArrowUp size={16} />
        </button>
      </div>
      <div className="studio-composer-project">
        <Folder size={13} />
        <select
          aria-label={t('选择项目', 'Select project')}
          defaultValue="select"
        >
          <option value="select">{t('选择项目', 'Select project')}</option>
          <option value="garden">{t('庭院住宅', 'Garden Residence')}</option>
          {connection && <option value="render">D5 Render</option>}
        </select>
      </div>
    </form>
  );
}
export function ChatPanel({
  wide = false,
  onDocument,
  children,
  connection = false,
}: {
  wide?: boolean;
  onDocument?: (type: 'doc' | 'ppt') => void;
  children?: ReactNode;
  connection?: boolean;
}) {
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const [thought, setThought] = useState(false);
  return (
    <div
      className={`studio-chat ${wide ? 'is-wide' : ''}`}
      data-ui-block="chat-thread"
    >
      {children || (
        <>
          <div className="studio-user-message">
            <DocumentCard compact onOpen={() => onDocument?.('doc')} />
            <p>
              {message ||
                t(
                  '按项目资料策划一个与自然共生的商业空间',
                  'Plan a commercial space in harmony with nature, based on the project brief.',
                )}
            </p>
          </div>
          <div className="studio-response">
            <button
              className="studio-thought"
              onClick={() => setThought(!thought)}
              aria-expanded={thought}
            >
              {t('思考了 4 秒', 'Thought for 4 seconds')}
              <ChevronDown size={12} />
            </button>
            {thought && (
              <small className="studio-thought-detail">
                {t(
                  '已整理场地条件、空间目标与参考资料。',
                  'Site conditions, spatial goals and references have been organized.',
                )}
              </small>
            )}
            <p>
              {t(
                '已整理设计方向与项目策划内容。',
                'The design direction and project proposal are ready.',
              )}
            </p>
            <div className="studio-response-actions">
              <AtSign size={16} />
              <MoreVertical size={16} />
            </div>
            <div className="studio-documents">
              <DocumentCard onOpen={() => onDocument?.('doc')} />
              <DocumentCard type="ppt" onOpen={() => onDocument?.('ppt')} />
            </div>
          </div>
        </>
      )}
      <Composer onSend={setMessage} connection={connection} />
    </div>
  );
}
export function InlinePanel({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  return (
    <dialog open className="studio-inline-panel" aria-label={title}>
      <header>
        <strong>{title}</strong>
        <IconButton
          icon={X}
          name="close"
          label={t('关闭', 'Close')}
          onClick={onClose}
        />
      </header>
      {children}
    </dialog>
  );
}
export function Sharing({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const [access, setAccess] = useState('team');
  return (
    <InlinePanel title={t('分享项目', 'Share project')} onClose={onClose}>
      <p>{t('选择项目的查看范围。', 'Choose who can view this project.')}</p>
      <select
        aria-label={t('查看权限', 'Access')}
        value={access}
        onChange={(e) => setAccess(e.target.value)}
      >
        <option value="team">{t('团队成员', 'Team members')}</option>
        <option value="link">
          {t('获得链接的任何人', 'Anyone with the link')}
        </option>
      </select>
      <small>
        {t(
          '本地交互预览，尚未创建公开链接。',
          'Local interaction preview. No public link has been created.',
        )}
      </small>
    </InlinePanel>
  );
}
export const pos = (
  left: number,
  top: number,
  width?: number,
  height?: number,
): CSSProperties => ({
  position: 'absolute',
  left,
  top,
  ...(width ? { width } : {}),
  ...(height ? { height } : {}),
});
