'use client';
import { withBasePath } from '@/lib/base-path';
/* oxlint-disable next/no-img-element -- Local Figma assets retain their native dimensions inside scaled artboards. */
import { useRef, useState } from 'react';
import {
  BookOpen,
  MousePointer2,
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
import {useStoryNavigation} from '../DesignStory';
import { useLanguage } from '../Language';
import {
  Artboard,
  CompactSelect,
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
  ['art_style_transfer','风格迁移','Art Style Transfer'],
  ['storyboard','故事板','Storyboard'],
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
export function PlanningBlock(){return <PresentationBlock planning/>;}
const slideArt = [
  art.leaf,
  withBasePath("/assets/imgFrame1.jpg"),
  withBasePath("/assets/lite.jpg"),
  withBasePath("/assets/plant.webp"),
  withBasePath("/assets/canvasimgThumbnail5.jpg"),
];
export function PresentationBlock({planning=false,embedded=false,onCanvas}:{planning?:boolean;embedded?:boolean;onCanvas?:()=>void}) {
  const moveStory=useStoryNavigation();
  const { t } = useLanguage();
  const [page, setPage] = useState(0),
    [editing, setEditing] = useState(false),
    [playing, setPlaying] = useState(false),
    [zoom, setZoom] = useState(100),
    [document, setDocument] = useState<'doc' | 'ppt' | null>(planning?null:'ppt'),
    [expanded,setExpanded]=useState(planning),
    [sharing, setSharing] = useState(false);
  const titles = [
    t('与自然共生', 'Living with nature'),
    t('材料与色彩', 'Materials & color'),
    t('空间组织', 'Spatial planning'),
    t('植物策略', 'Planting strategy'),
    t('设计愿景', 'Design vision'),
  ];
  const preview=(<section
        className={`studio-presentation ${playing ? 'is-playing' : ''}`}
        data-ui-block="presentation-editor"
      >
        <header className="studio-slide-top">
          <strong>{t('项目策划汇报', 'Project proposal')}.{document}</strong>
          <div className="studio-spacer" />
          <button onClick={() => setEditing(!editing)} aria-pressed={editing}>
            {t('编辑', 'Edit')}
          </button>
          {document==='ppt'&&<button
            className="studio-dark-button"
            onClick={() => setPlaying(!playing)}
          >
            <Icon
              fallback={playing ? Pause : Play}
              name={playing ? undefined : 'play'}
            />
            {playing ? t('退出播放', 'Exit') : t('播放', 'Play')}
          </button>}
        </header>
        {document==='ppt'?<><div
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
          <div className="studio-slide-image has-cursor-demo"><img src={slideArt[page]} alt={titles[page]}/><div className="studio-slide-mask"><button onClick={()=>onCanvas?onCanvas():moveStory(1)}><Icon name="canvas" fallback={ImageIcon}/>{t('发送到画布','Send to canvas')}</button></div></div><span className="studio-demo-pointer" aria-hidden="true"><MousePointer2 size={30} fill="#b38bff" stroke="#9855ff"/></span>
        </div>
        </>:<div className="studio-document-scroll"><article className="studio-document-paper" contentEditable={editing} suppressContentEditableWarning><small>ARCO / DESIGN STRATEGY</small><h1>{t('社区的第二客厅','The neighborhood living room')}</h1><p className="document-subtitle">{t('2,400㎡ 社区商业空间 · 设计策划提案','2,400 m² neighborhood retail · Design proposal')}</p><img src={art.interior} alt={t('空间氛围参考','Spatial atmosphere reference')}/><h2>{t('01 项目定位','01 Positioning')}</h2><p>{t('面向周边居民、年轻家庭和自由职业者，将咖啡、零售、阅读与共享活动结合，形成全天候开放的社区目的地。','A welcoming destination for neighbors, young families and independent professionals, combining café, retail, reading and shared events.')}</p><h2>{t('02 业态与空间组织','02 Program and circulation')}</h2><p>{t('一层设置咖啡、零售与公共座位；二层设置书店、活动区与共享办公。中庭连接上下层，环形动线避免回头路，服务动线与顾客游线分离。','The ground floor combines café, retail and seating; the upper floor houses a bookstore, events and coworking. An atrium connects the floors, while a looped visitor route stays separate from service access.')}</p><h2>{t('03 运营场景','03 Operating scenarios')}</h2><p>{t('工作日：咖啡、阅读和轻办公。周末：可移动展台组合成 80 人市集；书店通过玻璃隔断与吸音顶面维持安静。具体容量需结合平面和疏散条件复核。','Weekdays support coffee, reading and light work. On weekends, movable tables form an 80-person market; glazing and an acoustic ceiling protect the bookstore. Capacity remains subject to detailed layout and egress review.')}</p><h2>{t('04 材料与照明','04 Materials and lighting')}</h2><p>{t('浅色石材、木饰面与可替换植物模块建立统一语言。咖啡与休憩区使用暖光，零售区增加重点照明，阅读区保证均匀照度。','Pale stone, timber and replaceable planting modules establish a consistent palette. Warm light supports seating, accents highlight retail, and even illumination supports reading.')}</p><footer>ARCO · {t('商业空间设计策划','Commercial space strategy')}<span>01</span></footer></article></div>}
        {editing && (
          <small className="studio-edit-hint">
            {t(
              '可直接编辑标题与正文 · 本地预览',
              'Edit the title and body directly · Local preview',
            )}
          </small>
        )}
      </section>);
  if(embedded)return preview;
  return (
    <Artboard
      id={planning?'design-planning':'design-presentation'}
      label={t('演示文稿界面', 'Presentation interface')}
    >
      <Sidebar expanded={!document&&expanded}/>
      <div className={document?'studio-presentation-chat':'studio-planning-main'} style={!document?{left:expanded?240:48}:undefined}>
        <Header
          title={t('设计与策划', 'Design and Planning')}
          onShare={() => setSharing(true)} onPanel={()=>document?setDocument(null):setExpanded(!expanded)}
        />
        <ChatPanel concise wide={!document} onDocument={type=>{setDocument(type);setPage(0);}}/>
      </div>
      {document&&preview}

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
            <img src={`${withBasePath('/assets/')}skill-${file}.webp`} alt="" />
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
    [note, setNote] = useState(false),[action,setAction]=useState(''),[applied,setApplied]=useState('');
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
        <ChatPanel concise onDocument={setDocument} />
      </div>
      <section
        className={`studio-canvas-workspace ${document==='ppt'?'is-ppt-open':''}`}
        data-ui-block="canvas-workspace"
      >
        <header className="studio-canvas-tabs"><div role="tablist" aria-label={t('画布与文件','Canvas and file')}><button role="tab" aria-selected={!document} onClick={()=>setDocument(null)}>{t('画布','Canvas')}</button><button role="tab" aria-selected={document==='ppt'} onClick={()=>setDocument('ppt')}>{t('项目策划汇报','Project proposal')}.ppt</button></div><IconButton icon={BookOpen} name="panel" label={t('切换技能栏','Toggle skills')} onClick={()=>setShowSkills(!showSkills)}/></header>
        <Toolbar
          vertical
          onTool={(tool) => {
            if (tool === 'template') setShowSkills(!showSkills);
            else setAction(tool);
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
              if (tool === 'template') setShowSkills(!showSkills);
            else setAction(tool);
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
            src={applied==='edit'?art.interior:art.landscape}
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
            placeholder={t(
              '在这里记录你的设计想法…',
              'Capture your design ideas here…',
            )}
          />
        )}
        {action&&<InlinePanel title={t(({edit:'编辑图片',mark:'标记修改',migrate:'迁移',enhance:'图像增强',upscale:'图像放大',video:'图生视频',more:'更多操作',image:'图片生成',upload:'上传图片',history:'生成记录',connect:'关联资源',camera:'截图引用',group:'分组'} as Record<string,string>)[action]||'图片工具',({edit:'Edit image',mark:'Mark and edit',migrate:'Transfer',enhance:'Enhance image',upscale:'Upscale image',video:'Image to video',more:'More actions',image:'Generate image',upload:'Upload image',history:'Generated records',connect:'Linked resources',camera:'Capture viewport',group:'Group'} as Record<string,string>)[action]||'Image tools')} onClose={()=>setAction('')}>
          <img src={art.landscape} alt={t('当前图片','Current image')}/>
          {action==='upscale'?<label>{t('放大倍数','Scale')}<select aria-label={t('放大倍数','Scale')}><option>2×</option><option>4×</option></select></label>:action==='upload'?<input type="file" accept="image/*" aria-label={t('上传图片','Upload image')} onChange={e=>setApplied(e.target.files?.[0]?.name||'')}/>:<textarea aria-label={t('操作说明','Instructions')} placeholder={t('描述想要修改的内容…','Describe the change you want…')}/>}
          <button className="studio-dark-button" onClick={()=>{setApplied(action);setAction('');}}>{t('应用到演示','Apply to demo')}</button><small>{t('交互示例，未调用设计服务','Interactive example; no design service is connected')}</small>
        </InlinePanel>}
        {applied&&<span className="studio-canvas-feedback" role="status">{t('已应用演示操作','Demo action applied')} · {applied}</span>}
        <CanvasFooter zoom={zoom} onZoom={setZoom} onReset={()=>{setApplied('');setAction('');}} />
        <div className="studio-canvas-ppt" hidden={document!=='ppt'}><PresentationBlock embedded onCanvas={()=>setDocument(null)}/></div>
      </section>
      {document==='doc' && (
        <DocumentPreview type={document} onClose={() => setDocument(null)} />
      )}{' '}
      {sharing && <Sharing onClose={() => setSharing(false)} />}
    </Artboard>
  );
}
export function GenerationBlock() {
  const {t}=useLanguage();const [prompt,setPrompt]=useState(''),[generated,setGenerated]=useState(false),[zoom,setZoom]=useState(200),[ratio,setRatio]=useState('16:9'),[resolution,setResolution]=useState('2K'),[count,setCount]=useState('2'),[reference,setReference]=useState(''),[saved,setSaved]=useState<string[]>([]),[notice,setNotice]=useState(''),[templates,setTemplates]=useState(false);
  const file=useRef<HTMLInputElement>(null);
  const samplePrompts=[t('自然光下的社区咖啡厅，木饰面与浅色石材，入口连接绿意中庭。','A neighborhood café in natural light, timber and pale stone, opening onto a planted atrium.'),t('开放式社区书店，柔和均匀照明，玻璃隔断与吸音顶面，安静的阅读角。','An open neighborhood bookstore with soft, even lighting, glazing, an acoustic ceiling and quiet reading corners.')];
  const reset=()=>{setGenerated(false);setNotice('');};
  const execute=()=>{if(!prompt.trim())return;setGenerated(true);setNotice(t('已显示示例结果；未调用生成服务。','Showing example results; no generation service is connected.'));};
  return <Artboard id="design-generation" label={t('图像生成界面','Image generation interface')}><Sidebar active="canvas"/><section className="studio-generation"><Header title={t('画布　商业空间设计','Canvas　Commercial space design')}/><Toolbar vertical onTool={tool=>{if(tool==='upload')file.current?.click();else if(tool==='note')setPrompt(samplePrompts[0]);else setTemplates(v=>!v);}}/>
  <img className="studio-generation-source" src={art.landscape} alt={t('原始图片','Source image')}/>
  <div className="studio-generation-result" style={{transform:`scale(${zoom/200})`}}><div className="studio-generation-settings">
    <select aria-label={t('画面比例','Aspect ratio')} value={ratio} onChange={e=>{setRatio(e.target.value);reset();}}>{['Auto','1:1','4:3','3:2','16:9','9:16'].map(v=><option key={v}>{v}</option>)}</select>
    <select aria-label={t('分辨率','Resolution')} value={resolution} onChange={e=>{setResolution(e.target.value);reset();}}>{['1K','2K','4K'].map(v=><option key={v}>{v}</option>)}</select><span>{t('图像生成','Image generation')}</span>
  </div><small><Icon name="image" fallback={ImageIcon}/>{generated?t('示例结果','Example results'):t('图片生成','Generate image')} · {ratio} · {resolution}</small><div className={`studio-generation-placeholder ${generated?'has-results':''}`}>
  {generated?Array.from({length:Number(count)},(_,i)=><div key={i} style={{aspectRatio:ratio==='Auto'?'16/9':ratio.replace(':','/')}}><img src={i%2?art.garden:art.interior} alt={`${t('设计示例','Design example')} ${i+1}`}/><small>{i+1} · {resolution}</small></div>):<Icon name="image" fallback={ImageIcon} size={32}/>}</div></div>
  <form className="studio-generation-prompt arco-generation-composer" onSubmit={e=>{e.preventDefault();execute();}}><div className="studio-prompt-reference-row"><button type="button" title={t('添加参考图片','Add reference image')} onClick={()=>file.current?.click()}>{reference?<img src={reference} alt={t('参考图片','Reference image')}/>:<Icon name="plus" fallback={Plus}/>}</button>{reference&&<button type="button" aria-label={t('移除参考图片','Remove reference image')} onClick={()=>setReference('')}><Icon name="close" fallback={X}/></button>}<span>{t('添加参考图片，或直接描述设计','Add a reference or describe your design')}</span></div>
  <input ref={file} hidden type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0];if(f){const reader=new FileReader();reader.onload=()=>setReference(String(reader.result));reader.readAsDataURL(f);}e.target.value='';}}/>
  <textarea value={prompt} onChange={e=>{setPrompt(e.target.value);reset();}} aria-label={t('生成描述','Generation prompt')} placeholder={t('描述你想生成的商业空间…','Describe the commercial space you want to create…')} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.nativeEvent.isComposing){e.preventDefault();execute();}}}/>
  <div className="studio-generation-actions">
    <IconButton icon={SlidersHorizontal} name="settings" label={t('提示词模板','Prompt templates')} active={templates} onClick={()=>setTemplates(!templates)}/>
    <IconButton icon={Sparkles} name="optimize" label={t('优化提示词','Optimize prompt')} disabled={!prompt.trim()} onClick={()=>{setPrompt(v=>v+t('，自然采光，清晰的空间层次，真实材料纹理，建筑摄影。',', natural daylight, clear spatial layers, realistic material textures, architectural photography.'));setNotice(t('已应用示例优化','Example refinement applied'));}}/>
    <IconButton icon={Bookmark} name="save" label={t('保存提示词模板','Save prompt template')} disabled={!prompt.trim()} onClick={()=>{setSaved(v=>v.includes(prompt)?v:[...v,prompt]);setNotice(t('已保存到本次演示的模板','Saved to templates for this demo'));}}/>
    <select aria-label={t('生成数量','Output count')} value={count} onChange={e=>{setCount(e.target.value);reset();}}>{['1','2','3','4'].map(v=><option key={v}>{v}</option>)}</select>
    <button className="studio-send" type="submit" disabled={!prompt.trim()} title={t('生成 · Enter','Generate · Enter')} aria-label={t('预览生成效果','Preview generation')}><Icon name="send" fallback={ArrowUp}/></button>
  </div><small className="studio-local-result" role="status">{notice||t('交互演示','Interactive demo')}</small></form>
  {templates&&<div className="studio-template-picker"><header>{t('提示词模板','Prompt templates')}<IconButton icon={X} name="close" label={t('关闭','Close')} onClick={()=>setTemplates(false)}/></header>{[...samplePrompts,...saved].map((v,i)=><button key={i} onClick={()=>{setPrompt(v);setTemplates(false);reset();}}>{v}</button>)}</div>}
  <CanvasFooter zoom={zoom} onZoom={setZoom} onReset={reset}/></section></Artboard>;
}

export function WorkflowBlock(){
  const {t}=useLanguage();const [share,setShare]=useState(true),[copied,setCopied]=useState(false),[workflowPrompt,setWorkflowPrompt]=useState(''),[generated,setGenerated]=useState(false),[workflowZoom,setWorkflowZoom]=useState(50);
  return <Artboard id="design-workflow" label={t('创作流分享','Share creative workflow')}><Sidebar/><div className="workflow-header"><Header title={t('设计与策划','Design and Planning')} onPanel={()=>setShare(v=>!v)}><button className="workflow-share-trigger" onClick={()=>setShare(v=>!v)}>{t('分享','Share')}</button></Header></div><Toolbar vertical onTool={()=>setShare(false)}/>
    <svg className="workflow-connections" viewBox="0 0 1440 800" aria-hidden="true"><path d="M520 397 C565 397 545 215 585 215"/><path d="M520 397 C558 397 545 494 585 494"/><path d="M520 397 C710 397 800 470 960 395"/></svg>
    <figure className="workflow-source"><small>{t('图片','Image')}</small><img src={art.landscape} alt={t('景观设计原图','Landscape source image')}/></figure>
    <figure className="workflow-video"><small>{t('视频','Video')}</small><img src={art.landscape} alt={t('创作流视频预览','Workflow video preview')}/><button aria-label={t('查看创作说明','View workflow details')} onClick={()=>setShare(true)}><Icon name="play" fallback={Play}/></button></figure>
    <div className="workflow-prompt"><small>{t('提示词','Prompt')}</small><p>{t('保留石质建筑与花海的空间关系。以缓慢推进的镜头表现自然光、植物层次与真实材质，营造宁静而有生命力的场所。','Preserve the relationship between the stone architecture and the meadow. A slow camera movement reveals natural light, layers of planting and tactile materials, creating a calm, living place.')}</p></div>
    <div className="workflow-output" style={{transform:`scale(${workflowZoom/50})`,transformOrigin:'center'}}><div className="workflow-generation-options"><CompactSelect icon="ratio" label={t('画幅','Aspect ratio')} options={[t('自动','Auto'),'16:9','1:1']}/><CompactSelect icon="hd" label={t('分辨率','Resolution')} options={['1K','2K','4K']}/><CompactSelect icon="image" label={t('模型版本','Model version')} options={['V2','V1']}/></div><small>{t('图片','Image')}</small><div className="workflow-generated">{generated?<img src={art.garden} alt={t('生成示例','Generated example')}/>:<img className="workflow-empty-symbol" src={withBasePath("/assets/arco-icons/generation-empty.svg")} alt=""/>}</div><form className="workflow-generator" onSubmit={e=>{e.preventDefault();if(workflowPrompt.trim())setGenerated(true);}}><div className="workflow-filter-row"><ArrowLeft size={10}/>{[[t('渲染风格','Render style'),t('写实','Realistic'),t('手绘','Sketch')],[t('设计风格','Design style'),t('极简','Minimal'),t('自然','Natural')],[t('人物','People'),t('无','None'),t('少量','Few')],[t('车辆','Vehicles'),t('无','None')],[t('天气','Weather'),t('晴天','Sunny'),t('阴天','Overcast')]].map(([label,...options])=><CompactSelect key={label} label={label} options={[label,...options]}/>)}</div><label className="workflow-reference"><Icon name="empty" fallback={ImageIcon}/><input type="file" accept="image/*" aria-label={t('参考图片','Reference image')}/></label><textarea value={workflowPrompt} onChange={e=>setWorkflowPrompt(e.target.value)} aria-label={t('创作流提示词','Workflow prompt')} placeholder={t('描述更多细节…','Describe more details…')}/><div className="workflow-generator-actions"><IconButton name="prompttemplate" icon={SlidersHorizontal} label={t('参数设置','Settings')} onClick={()=>setWorkflowPrompt(v=>v+t('，清晰的空间层次',', clear spatial layers'))}/><IconButton name="optimize" icon={Sparkles} label={t('优化提示词','Refine prompt')} onClick={()=>setWorkflowPrompt(v=>v+t('，自然采光，真实材质',', natural lighting, realistic materials'))}/><IconButton name="save" icon={Bookmark} label={t('保存提示词','Save prompt')} onClick={()=>{sessionStorage.setItem('arco-workflow-prompt',workflowPrompt);}}/><CompactSelect icon="image" label={t('生成数量','Output count')} options={['2','1','4']}/><button className="studio-send" type="submit" disabled={!workflowPrompt.trim()} aria-label={t('生成示例','Generate example')}><Icon name="send" fallback={ArrowUp}/></button></div>{generated&&<small role="status">{t('示例效果','Example result')}</small>}</form></div>
    {share&&<aside className="workflow-share"><h3>{t('分享画布','Share canvas')}</h3><p>{t('分享你的创作过程与画布内容','Share your creative process and canvas')}</p><a className="workflow-share-link" href="https://pre.d5arco.cn/share/canvas/xKE8sUcq5FvT61tebpilWpZz" target="_blank" rel="noopener noreferrer"><img src={art.landscape} alt=""/><span>{t('我在 Arco 的创作','My creation in Arco')}<small>{t('快来看看','Take a look')}</small></span></a><footer><button onClick={async()=>{try{await navigator.clipboard.writeText(JSON.stringify({title:t('我的 Arco 创作流','My Arco workflow'),image:art.landscape,steps:['Image','Prompt','Generate']},null,2));setCopied(true);}catch{setCopied(false);}}}>{t('＋ 复制创作流','＋ Copy workflow')}</button></footer>{copied&&<small role="status">{t('演示已复制，未创建公开链接','Demo copied; no public link created')}</small>}</aside>}
    <CanvasFooter zoom={workflowZoom} onZoom={setWorkflowZoom} onReset={()=>{setShare(true);setCopied(false);}}/>
  </Artboard>;
}
