'use client';
import { withBasePath } from '@/lib/base-path';
/* oxlint-disable next/no-img-element -- Local Figma assets retain their native dimensions inside scaled artboards. */
import {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from 'react';
import {
  Check,
  Home,
  MessageCircle,
  Frame,
  Folder,
  BookOpen,
  Unplug,
  ImagePlus,
  Zap,
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
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useLanguage } from '../Language';
export const art = {
  landscape: withBasePath("/assets/imgImageFrame.jpg"),
  garden: withBasePath("/assets/figma147/hero-garden.webp"),
  interior: withBasePath("/assets/imgImgVillaGarden4.jpg"),
  plan: withBasePath("/assets/imgImgVillaGarden3.jpg"),
  leaf: withBasePath("/assets/ui/slides-imgImage.webp"),
  lite: withBasePath("/assets/ui/ecosystem-imgImage.webp"),
};
const arcoIcons: Record<string,string> = {
  all:'all',hd:'hd',empty:'imageempty',prompttemplate:'textarticlestar',ratio:'ratio',map:'maptrifold',fullscreen:'cornersout',pan:'hand',template:'bookopentext',mark:'mappinsimplearea',connecttool:'workflow',pantool:'handdrawleft',home:'housesimple',chat:'comment',canvas:'frame',projects:'foldervertical',skills:'bookopentext',connections:'plugsconnected',
  chevron:'chevrondown',share:'share',panel:'sidebarright',plus:'add',folder:'foldervertical',at:'at',more:'more',close:'close',pointer:'selectioncursor',select:'selectioncursor',reset:'arrowclock',minus:'minus',play:'playsimple',download:'arrowdownload',
  image:'imagestar',note:'notepageline',upload:'arrowoutup',history:'arrowclock',connect:'plugsconnected',project:'foldervertical',
  edit:'magicwand',migrate:'activityspark',enhance:'starshooting',upscale:'framecorners',video:'templetevideo',send:'arrowup',optimize:'starfour',save:'bookmarksimple',group:'frame',camera:'cameraaddview',check:'checkmark',appwindow:'appwindow'
};
export function Icon({name,fallback:Fallback,size=16}:{name?:string;fallback:LucideIcon;size?:number}) {
  return name && arcoIcons[name] ? <span className="studio-icon" aria-hidden="true" style={{width:size,height:size,display:'inline-block',backgroundColor:'currentColor',maskImage:`url(${withBasePath('/assets/')}arco-icons/${arcoIcons[name]}.svg)`,maskSize:'contain',maskRepeat:'no-repeat',maskPosition:'center'}}/> : <Fallback size={size} strokeWidth={1.5} aria-hidden="true"/>;
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
const MenuScaleContext=createContext(1);
function ArcoMenuContent(props:React.ComponentProps<typeof DropdownMenuContent>){const scale=useContext(MenuScaleContext);return <DropdownMenuContent {...props} style={{...props.style,'--arco-menu-scale':scale} as CSSProperties}/>;}
function ArcoSubContent(props:React.ComponentProps<typeof DropdownMenuSubContent>){const scale=useContext(MenuScaleContext);return <DropdownMenuSubContent {...props} style={{...props.style,'--arco-menu-scale':scale} as CSSProperties}/>;}
const DemoResetContext=createContext<null|(()=>void)>(null);
export function DemoResetBoundary({children}:{children:ReactNode}){const [epoch,setEpoch]=useState(0);return <DemoResetContext.Provider value={()=>setEpoch(v=>v+1)}><Fragment key={epoch}>{children}</Fragment></DemoResetContext.Provider>;}
export function Artboard({
  children,
  id,
  label,
  width = 1440,
  height = 800,
  className = '',
  onInteraction,
}: {
  children: ReactNode;
  id: string;
  label: string;
  width?: number;
  height?: number;
  className?: string;
  onInteraction?:()=>void;
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
      onPointerDownCapture={onInteraction}
      onKeyDownCapture={onInteraction}
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
        <MenuScaleContext.Provider value={scale||1}>{children}</MenuScaleContext.Provider>
      </div>
    </div>
  );
}
export function Sidebar({
  expanded = false,
  onChange,
}: {
  expanded?: boolean;
  active?: string;
  onChange?: (value: string) => void;
}) {
  const { t } = useLanguage();
  const reset=useContext(DemoResetContext);
  const restore=()=>reset?reset():onChange?.('chat');
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
          onClick={restore}
        />
        {expanded && <Icon name="panel" fallback={PanelRight} />}
      </div>
      <nav>
        {menu.map(([key, I, title]) => (
          <button
            key={key}
            onClick={restore}
            aria-label={title}
            title={title}
            aria-pressed={false}
          >
            <Icon fallback={I} name={key} />
            {expanded && <span>{title}</span>}
          </button>
        ))}
      </nav>
      {expanded && <small>{t('最近', 'Recent')}</small>}
      <button
        className="studio-recent"
        aria-pressed="true"
        aria-label={t('设计与策划','Design and Planning')}
        title={t('设计与策划', 'Design and Planning')}
        onClick={restore}
      >
        <Icon fallback={MessageCircle} name="chat" size={14} />
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
    ? ([['image',ImagePlus,t('图片生成','Generate image')],['note',StickyNote,t('提示词','Prompt')],['template',BookOpen,t('技能','Skills')],['upload',Upload,t('上传图片','Upload images')],['history',History,t('生成记录','Generated records')],['connect',Unplug,t('资源','Resources')],['group',Frame,t('分组','Group')]] as const)
    : ([['edit',ImagePlus,t('编辑','Edit')],['template',BookOpen,t('技能','Skills')],['mark',MousePointer2,t('标记修改','Mark and edit')],['enhance',ImagePlus,t('增强','Enhance')],['migrate',Unplug,t('迁移','Transfer')],['upscale',Maximize,t('放大','Upscale')],['video',Presentation,t('视频','Video')],['pantool',Hand,t('平移','Pan')],['connecttool',Unplug,t('连接','Connect')],['more',MoreVertical,t('更多','More')],['at',AtSign,t('引用','Reference')],['share',Share2,t('分享','Share')],['download',Upload,t('下载','Download')]] as const);
  return (
    <div
      className={`studio-tools ${vertical ? 'is-vertical' : ''}`}
      data-ui-block="canvas-toolbar"
    >
      {items.map(([key, I, label]) => (
        <IconButton
          key={key}
          name={key}
          icon={I}
          label={label}
          active={active === key}
          onClick={() => {
            setActive(key);
            onTool?.(key==='pantool'?'pan':key==='connecttool'?'connect':key);
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
          name="pan"
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
        <IconButton icon={Map} name="map" label={t('画布导航','Canvas navigation')} onClick={()=>onZoom?.(100)}/>
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
        <IconButton icon={Grid2X2} name="all" label={t('显示全图','Show all')} onClick={()=>onZoom?.(50)}/>
        <IconButton
          icon={Maximize}
          name="fullscreen"
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
              '自然共生商业空间：客群定位、业态配比、游逛动线与材料策略。',
              'Nature-led retail: audience, tenant mix, circulation and material strategy.',
            )}
          </small>
        )}
      </span>
    </button>
  );
}
export function CompactSelect({label,options,value,onChange,icon}:{label:string;options:string[];value?:string;onChange?:(value:string)=>void;icon?:string}) {
  const [selectedIndex,setSelectedIndex]=useState(0);
  return <DropdownMenu><DropdownMenuTrigger className="arco-compact-select" aria-label={label}>{icon&&<Icon name={icon} fallback={ImagePlus} size={10}/>}<span>{value??options[selectedIndex]??options[0]}</span><Icon name="chevron" fallback={ChevronDown} size={8}/></DropdownMenuTrigger><ArcoMenuContent className="arco-menu" side="bottom">{options.map((option,index)=><DropdownMenuItem key={option} onClick={()=>{setSelectedIndex(index);onChange?.(option);}}>{option}</DropdownMenuItem>)}</ArcoMenuContent></DropdownMenu>;
}
export function Composer({onSend,reference,connection=false,initialValue='',className='',showFooter=true,showLinked=true,demoText,references=[],onRemoveReference}:{onSend?:(message:string)=>void;reference?:string;connection?:boolean;initialValue?:string;className?:string;showFooter?:boolean;showLinked?:boolean;demoText?:string;references?:string[];onRemoveReference?:(index:number)=>void}) {
  const {t}=useLanguage();
  const [value,setValue]=useState(initialValue),[attachment,setAttachment]=useState(reference||''),[feedback,setFeedback]=useState(''),[model,setModel]=useState('GLM 5.3 Flash'),[effort,setEffort]=useState('Max'),[projectIndex,setProjectIndex]=useState<number|null>(null),[projectOpen,setProjectOpen]=useState(false),[linked,setLinked]=useState<string[]>(connection?['D5 Render','D5 Lite','D5 Create']:[]),[linksExpanded,setLinksExpanded]=useState(false);
  useEffect(()=>{if(demoText!==undefined)setValue(demoText);},[demoText]);
  useEffect(()=>{setAttachment(reference||'');},[reference]);
  const previousInitialValue=useRef(initialValue);
  useEffect(()=>{const previous=previousInitialValue.current;setValue(current=>current===previous?initialValue:current);previousInitialValue.current=initialValue;},[initialValue]);
  const projectOptions=[t('Arco 项目','Arco project'),t('自然共生商业空间','Nature-led retail'),t('城市展厅','City Pavilion')];
  const project=projectIndex===null?'':projectOptions[projectIndex];
  const attachmentOptions=[['商业空间项目资料','Commercial space brief'],['场地平面图','Site plan'],['生成记录','Generation history'],['云资源','Cloud resources'],['关联中资源','Linked resources'],['获取关联中项目视口','Capture linked project viewport'],['商业空间策划','Commercial space planning'],['生成演示文稿','Create presentation']];
  const [attachmentKey,setAttachmentKey]=useState<number|null>(null);
  const attachmentLabel=attachmentKey===null?attachment:t(attachmentOptions[attachmentKey][0],attachmentOptions[attachmentKey][1]);
  const file=useRef<HTMLInputElement>(null),editor=useRef<HTMLTextAreaElement>(null);
  const send=()=>{if(!value.trim())return;onSend?.(value.trim());setFeedback(t('已添加至演示对话','Added to the demo conversation'));setValue('');};
  const add=(label:string,localized=false)=>{setAttachment(label);setAttachmentKey(localized?attachmentOptions.findIndex(pair=>pair.includes(label)):null);editor.current?.focus();};
  return <form className={`studio-composer ${className} ${references.length?'has-scene-references':''}`} data-ui-block="chat-composer" onSubmit={e=>{e.preventDefault();send();}} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)add(f.name);}}>
    {references.length>0&&<div className="studio-reference-chips">{references.map((label,index)=><span key={label}><Icon name="folder" fallback={Folder} size={12}/>{label}<button type="button" aria-label={`${t('移除引用','Remove reference')} ${label}`} onClick={()=>onRemoveReference?.(index)}><Icon name="close" fallback={X} size={10}/></button></span>)}</div>}
    {attachment&&<span className="studio-reference"><Icon name="folder" fallback={Folder}/>{attachmentLabel}<button type="button" aria-label={t('移除引用','Remove reference')} onClick={()=>(setAttachment(''),setAttachmentKey(null))}><Icon name="close" fallback={X} size={12}/></button></span>}
    <textarea ref={editor} aria-label={t('消息','Message')} placeholder={t('@添加， /引用','@Add, /reference')} value={value} onChange={e=>setValue(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.nativeEvent.isComposing){e.preventDefault();send();}}}/>
    {(/(?:^|\s)[@/]$/.test(value))&&<div className="studio-mention-menu">{(value.endsWith('@')?[t('商业空间项目资料','Commercial space brief'),t('场地平面图','Site plan')]:[t('商业空间策划','Commercial space planning'),t('生成演示文稿','Create presentation')]).map(label=><button type="button" key={label} onClick={()=>{add(label,true);setValue(value.slice(0,-1));}}>{label}</button>)}</div>}
    <div className="studio-composer-actions">
      <DropdownMenu><DropdownMenuTrigger className="studio-icon-button arco-add-trigger" title={t('添加文件与引用','Add files and references')} aria-label={t('添加文件与引用','Add files and references')}><Icon name="plus" fallback={Plus}/></DropdownMenuTrigger><ArcoMenuContent className="arco-menu arco-attach-menu" side="top" sideOffset={8}>
        <DropdownMenuItem onClick={()=>file.current?.click()}><Icon name="upload" fallback={Upload}/>{t('上传文件','Upload file')}</DropdownMenuItem>
        <DropdownMenuSub><DropdownMenuSubTrigger><Icon name="at" fallback={AtSign}/>{t('引用文件','Reference file')}</DropdownMenuSubTrigger><ArcoSubContent className="arco-menu arco-attach-menu">{[t('生成记录','Generation history'),t('云资源','Cloud resources'),t('关联中资源','Linked resources'),t('获取关联中项目视口','Capture linked project viewport')].map((label,i)=><Fragment key={label}>{i===3&&<DropdownMenuSeparator/>}<DropdownMenuItem onClick={()=>add(label,true)}>{label}</DropdownMenuItem></Fragment>)}</ArcoSubContent></DropdownMenuSub>
        <DropdownMenuSeparator/>
        <DropdownMenuSub><DropdownMenuSubTrigger><Icon name="skills" fallback={BookOpen}/>{t('技能','Skills')}</DropdownMenuSubTrigger><ArcoSubContent className="arco-menu arco-attach-menu">{[t('商业空间策划','Commercial space planning'),t('生成演示文稿','Create presentation')].map(label=><DropdownMenuItem key={label} onClick={()=>{add(label,true);editor.current?.focus();}}><Icon name="skills" fallback={BookOpen}/>{label}</DropdownMenuItem>)}</ArcoSubContent></DropdownMenuSub>
        <DropdownMenuSub><DropdownMenuSubTrigger><Icon name="connections" fallback={Unplug}/>{t('链接','Connections')}</DropdownMenuSubTrigger><ArcoSubContent className="arco-menu arco-attach-menu">{['D5 Render','D5 Lite','D5 Create'].map(label=><DropdownMenuItem key={label} onClick={()=>{setLinked(v=>v.includes(label)?v:[...v,label]);setLinksExpanded(true);}}><Icon name="connections" fallback={Unplug}/>{label}</DropdownMenuItem>)}</ArcoSubContent></DropdownMenuSub>
      </ArcoMenuContent></DropdownMenu>
      <DropdownMenu><DropdownMenuTrigger className="arco-model-trigger" aria-label={t('AI 模型','AI model')}><span>{t(`${model} ${effort}`,model==='GLM 5.3 Flash'?'GPT-6 Astra':model)}</span><Icon name="chevron" fallback={ChevronDown}/></DropdownMenuTrigger><ArcoMenuContent className="arco-menu arco-model-menu" side="top" sideOffset={8}>
        {['GLM 5.3 Flash','DeepSeek V4 Flash','Kimi 2.6'].map(label=><DropdownMenuItem key={label} onClick={()=>setModel(label)}><span className="arco-menu-check">{model===label&&<Icon name="check" fallback={Check}/>}</span>{label==='GLM 5.3 Flash'?t(label,'GPT-6 Astra'):label}</DropdownMenuItem>)}<DropdownMenuSeparator/>
        <DropdownMenuSub><DropdownMenuSubTrigger><span>{t('思考强度','Thinking effort')}</span><span className="arco-menu-value">{effort}</span></DropdownMenuSubTrigger><ArcoSubContent className="arco-menu arco-model-menu">{['Low','High','Max'].map(label=><DropdownMenuItem key={label} onClick={()=>setEffort(label)}><span className="arco-menu-check">{effort===label&&<Icon name="check" fallback={Check}/>}</span>{label}</DropdownMenuItem>)}</ArcoSubContent></DropdownMenuSub>
      </ArcoMenuContent></DropdownMenu>
      <button type="submit" className="studio-send" disabled={!value.trim()} title={t('发送 · Enter','Send · Enter')} aria-label={t('发送','Send')}><Icon name="send" fallback={ArrowUp}/></button>
    </div>
    <input ref={file} type="file" hidden onChange={e=>{if(e.target.files?.[0])add(e.target.files[0].name);e.target.value='';}}/>
    {showFooter&&<div className="studio-composer-project"><DropdownMenu open={projectOpen} onOpenChange={setProjectOpen}><div className="arco-project-segment"><button type="button" className="arco-project-label" onClick={()=>setProjectOpen(true)}><Icon name="folder" fallback={Folder} size={12}/><span>{project||t('选择项目','Select project')}</span></button><DropdownMenuTrigger className="arco-project-chevron" aria-label={t('选择项目','Select project')}><Icon name="chevron" fallback={ChevronDown}/></DropdownMenuTrigger></div><ArcoMenuContent className="arco-menu arco-project-menu" side="top" sideOffset={8}>{projectOptions.map((label,index)=><DropdownMenuItem key={index} onClick={()=>setProjectIndex(index)}><Icon name="folder" fallback={Folder}/><span>{label}</span>{project===label&&<Icon name="check" fallback={Check}/>}</DropdownMenuItem>)}{project&&<><DropdownMenuSeparator/><DropdownMenuItem onClick={()=>setProjectIndex(null)}>{t('移出项目','Remove from project')}</DropdownMenuItem></>}</ArcoMenuContent></DropdownMenu></div>}
    {showLinked&&linked.length>0&&<div className="arco-linked-context"><header><button type="button" onClick={()=>setLinksExpanded(!linksExpanded)} aria-expanded={linksExpanded}><span className={linksExpanded?'':'arco-chevron-collapsed'}><Icon name="chevron" fallback={ChevronDown} size={12}/></span>{linksExpanded?t('当前属于链接中的文件','Files in linked projects'):t('关联中','Connected')}</button><DropdownMenu><DropdownMenuTrigger className="arco-linked-more" aria-label={t('链接选项','Connection options')}><Icon name="more" fallback={MoreVertical}/></DropdownMenuTrigger><ArcoMenuContent className="arco-menu" side="top"><DropdownMenuItem onClick={()=>setLinked([])}>{t('断开所有链接','Disconnect all')}</DropdownMenuItem></ArcoMenuContent></DropdownMenu></header>{linksExpanded&&linked.map(label=><div className="arco-linked-row" key={label}><Icon name="appwindow" fallback={Folder}/><span>{label}{label==='D5 Render'?'.drs':''}</span><DropdownMenu><DropdownMenuTrigger aria-label={`${t('管理链接','Manage connection')} ${label}`}><Icon name="more" fallback={MoreVertical}/></DropdownMenuTrigger><ArcoMenuContent className="arco-menu" side="top"><DropdownMenuItem onClick={()=>setLinked(v=>v.filter(n=>n!==label))}>{t('断开链接','Disconnect')}</DropdownMenuItem></ArcoMenuContent></DropdownMenu></div>)}</div>}
    {showFooter&&feedback&&!onSend&&<small className="studio-composer-feedback" role="status">{t('已添加至演示对话','Added to the demo conversation')}</small>}
  </form>;
}
export function ChatPanel({wide=false,onDocument,children,connection=false,concise=false}:{wide?:boolean;onDocument?:(type:'doc'|'ppt')=>void;children?:ReactNode;connection?:boolean;concise?:boolean}) {
  const {t}=useLanguage();const [messages,setMessages]=useState<string[]>([]),[thought,setThought]=useState(false);const end=useRef<HTMLDivElement>(null);
  useEffect(()=>{const scroller=end.current?.parentElement;if(scroller&&!concise)scroller.scrollTop=scroller.scrollHeight;},[messages,concise]);
  return <div className={`studio-chat ${wide?'is-wide':''} ${concise?'is-concise':''}`} data-ui-block="chat-thread">
    <div className="studio-chat-scroll">{concise?<><div className="studio-user-message"><DocumentCard compact/><p>{t('策划一个自然、开放的社区商业空间，结合咖啡、零售与共享活动。','Plan an open, nature-led neighborhood space with a café, retail and shared events.')}</p></div><div className="studio-response"><span className="studio-thought">{t('思考了 4 秒','Thought for 4 seconds')}</span><p>{t('以「社区的第二客厅」为定位，用绿意中庭连接咖啡、书店与灵活活动区。木材与浅色石材统一空间体验。','A neighborhood living room: a planted atrium connects the café, bookstore and flexible events, with timber and pale stone unifying the space.')}</p><p>{t('设计策略与空间提案已整理为演示文稿。','The design strategy and spatial proposal are ready in a presentation.')}</p><DocumentCard type="ppt" onOpen={()=>onDocument?.('ppt')}/></div></>:children||<>
      <div className="studio-user-message"><DocumentCard compact onOpen={()=>onDocument?.('doc')}/><p>{t('为 2,400㎡ 的社区商业空间做设计策划：一层咖啡与零售，二层书店与共享活动。希望自然、开放，并兼顾工作日和周末运营。','Plan a 2,400 m² neighborhood retail space: café and retail on the ground floor, a bookstore and shared events upstairs. Keep it natural and open, with weekday and weekend uses.')}</p></div>
      <div className="studio-response"><button className="studio-thought" onClick={()=>setThought(!thought)} aria-expanded={thought}>{t('思考了 4 秒','Thought for 4 seconds')}<Icon name="chevron" fallback={ChevronDown}/></button>{thought&&<p className="studio-thought-detail">{t('正在综合客群、两层业态关系、无障碍动线与活动转换需求。','Considering visitors, connections between floors, accessible circulation and flexible event use.')}</p>}<p>{t('建议以「社区的第二客厅」为定位，用贯通两层的绿意中庭连接消费与停留。','Position it as “the neighborhood living room”, with a planted atrium linking both floors and inviting people to stay.')}</p><ul><li>{t('一层：咖啡 25% · 零售 40% · 公共休憩 35%。','Ground floor: café 25% · retail 40% · public seating 35%.')}</li><li>{t('二层：书店 45% · 活动 30% · 共享办公 25%。','Upper floor: bookstore 45% · events 30% · coworking 25%.')}</li><li>{t('环形游逛动线，入口可见咖啡吧；木材、浅色石材与室内植物统一体验。','A looped visitor route, a café visible from the entrance, and a palette of timber, pale stone and planting.')}</li></ul></div>
      <div className="studio-user-message"><p>{t('周末需要容纳 80 人的市集活动，同时保持书店安静。把运营场景和材料策略一起整理成提案。','We need an 80-person weekend market while keeping the bookstore quiet. Include operating scenarios and a material strategy in the proposal.')}</p></div>
      <div className="studio-response"><p>{t('可将活动区靠中庭布置，用可移动展台切换日常休憩与周末市集；书店以玻璃隔断和吸音顶面控制噪声。以下为策划文档和汇报演示稿。','Place events beside the atrium and use movable display tables to switch between daily seating and weekend markets. Separate the bookstore with glazing and an acoustic ceiling. Here are the brief and presentation.')}</p><div className="studio-documents"><DocumentCard onOpen={()=>onDocument?.('doc')}/><DocumentCard type="ppt" onOpen={()=>onDocument?.('ppt')}/></div></div>
    </>}{messages.map((message,i)=><div key={i}><div className="studio-user-message"><p>{message}</p></div><div className="studio-response"><p>{t('已记录这项需求。可在右侧提案中继续完善客群定位、动线及活动区细节。此处为交互演示回复。','This requirement is recorded. Continue refining visitors, circulation and event areas in the proposal on the right. This is a demo reply.')}</p></div></div>)}<div ref={end}/></div>
    <Composer onSend={message=>setMessages(v=>[...v,message])} connection={connection}/>
  </div>;
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
