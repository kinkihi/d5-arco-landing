'use client';
import { withBasePath } from '@/lib/base-path';
/* oxlint-disable next/no-img-element -- Local Figma assets retain their native dimensions inside scaled artboards. */
import { useState } from 'react';
import {
  Image as ImageIcon,
  MousePointer2,
  PanelRight,
  Check,
  ChevronDown,
} from 'lucide-react';
import {DropdownMenu,DropdownMenuTrigger,DropdownMenuContent,DropdownMenuItem} from '@/components/ui/dropdown-menu';
import { useLanguage } from '../Language';
import {
  Artboard,
  Icon,
  Composer,
  Toolbar,
  CanvasFooter,
  IconButton,
  Sharing,
  InlinePanel,
  art,
} from './Primitives';
export function CollaborativeCanvas() {
  const { t } = useLanguage();
  const [sharing, setSharing] = useState(false),
    [zoom, setZoom] = useState(200),
    [comment, setComment] = useState(false),
    [note, setNote] = useState('');
  return (
    <section
      className="studio-collaborative-canvas"
      data-ui-block="collaborative-canvas"
    >
      <header>
        <strong>{t('协作', 'Collaborate')}</strong>
        <ChevronDown size={14} />
        <div className="studio-spacer" />
        <div className="studio-avatars">
          <span>U</span>
          <span>J</span>
          <span>Y</span>
        </div>
        <button className="studio-dark-button" onClick={() => setSharing(true)}>
          {t('分享', 'Share')}
        </button>
        <IconButton
          icon={PanelRight}
          name="panel"
          label={t('查看评论', 'Show comments')}
          onClick={() => setComment(!comment)}
        />
      </header>
      <Toolbar
        vertical
        onTool={(tool) => {
          if (tool === 'note') setComment(!comment);
        }}
      />
      <div
        className="studio-team-image"
        style={{ transform: `scale(${zoom / 200})` }}
      >
        <small>
          <ImageIcon size={12} />
          {t('图片', 'Image')}
        </small>
        <img
          src={art.landscape}
          alt={t(
            '团队共享画布中的景观设计',
            'Landscape design on the shared canvas',
          )}
        />
      </div>
      <div className="studio-collaborator cursor-yellow">
        <MousePointer2 size={30} fill="currentColor" />
        <span>U</span>
      </div>
      <div className="studio-collaborator cursor-purple">
        <MousePointer2 size={30} fill="currentColor" />
      </div>
      <div className="studio-collaborator cursor-green">
        <MousePointer2 size={30} fill="currentColor" />
      </div>
      <button
        className="studio-comment-bubble"
        onClick={() => setComment(!comment)}
      >
        {t(
          '试试保留这组植物的层次？',
          'Could we keep this planting arrangement?',
        )}
      </button>
      {comment&&<div className="studio-comment-editor"><Composer onSend={message=>{setNote(message);setComment(false);}}/></div>}
      {note && !comment && <span className="studio-comment-reply">{note}</span>}
      <CanvasFooter zoom={zoom} onZoom={setZoom} />
      {sharing && <Sharing onClose={() => setSharing(false)} />}
    </section>
  );
}
export function TeamProjects() {
  const { t } = useLanguage();
  const [tab, setTab] = useState(0),
    [project, setProject] = useState(-1);
  const titles = [
    t('酒店', 'Hotel'),
    t('别墅设计', 'Villa Design'),
    t('花园', 'Garden'),
  ];
  return (
    <section className="studio-team-projects" data-ui-block="team-projects">
      <nav>
        {[t('个人', 'Personal'), t('团队', 'Team')].map((title, i) => (
          <button
            key={i}
            aria-pressed={tab === i}
            onClick={() => {
              setTab(i);
              setProject(-1);
            }}
          >
            {title}
          </button>
        ))}
      </nav>
      <div className="studio-project-folders">
        {titles.map((title, i) => (
          <div className="studio-folder" key={i}>
            <button className="studio-folder-cover" aria-label={`${t('打开项目','Open project')} ${title}`} onClick={()=>setProject(i)}>
              <span className="studio-folder-back"/><span className="studio-folder-sheet"/><img className="studio-folder-file" src={`${withBasePath('/assets/')}ui/team-imgFile${i||''}.webp`} alt=""/>
              <span className="studio-folder-front" aria-hidden="true"><img src={`${withBasePath('/assets/')}ui/team-imgFile${i||''}.webp`} alt=""/></span>
              <strong>{title}</strong><small className="studio-folder-date">{t('最后更新','Last updated')}<br/>{['Jan 26, 2026','Feb 14, 2026','Mar 3, 2026'][i]}</small>
            </button>
            <DropdownMenu><DropdownMenuTrigger className="studio-folder-more" aria-label={`${title} ${t('更多操作','more actions')}`}><Icon name="more" fallback={ChevronDown}/></DropdownMenuTrigger><DropdownMenuContent className="arco-menu"><DropdownMenuItem onClick={()=>setProject(i)}>{t('打开项目','Open project')}</DropdownMenuItem><DropdownMenuItem onClick={()=>setProject(i)}>{t('查看项目文件','View project files')}</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
          </div>
        ))}
      </div>
      {project>=0&&<InlinePanel title={titles[project]} onClose={()=>setProject(-1)}><small>{tab?t('团队项目','Team project'):t('个人项目','Personal project')}</small><img src={`${withBasePath('/assets/')}ui/team-imgFile${project||''}.webp`} alt={titles[project]}/><p>{t('项目资料 · 概念方案 · 参考图片','Project brief · Concept design · Reference images')}</p></InlinePanel>}
    </section>
  );
}
export function TeamMembers() {
  const { t } = useLanguage();
  const [member, setMember] = useState<number | null>(null),
    [credits, setCredits] = useState([1200, 1000]);
  return (
    <section
      className="studio-team-members"
      data-ui-block="team-member-management"
    >
      <h3>{t('团队管理', 'Team management')}</h3>
      <div className="studio-table-scroll">
        <table aria-label={t('团队成员使用情况', 'Team member usage')}>
          <thead>
            <tr>
              {[
                t('成员', 'Member'),
                t('时长', 'Time'),
                t('图片', 'Image'),
                t('视频', 'Video'),
                t('积分', 'Credits'),
              ].map((label) => (
                <th key={label}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {['Jing', 'Leo'].map((name, i) => (
              <tr key={name}>
                <td>
                  <button
                    aria-label={`${t('管理成员', 'Manage member')} ${name}`}
                    onClick={() => setMember(i)}
                  >
                    <span className="studio-member-avatar">{name[0]}</span>
                    <span>
                      {name}
                      <small>{t('团队成员', 'Team member')}</small>
                    </span>
                  </button>
                </td>
                <td>8{t('小时', 'h')}</td>
                <td>23</td>
                <td>4</td>
                <td>
                  <button
                    aria-label={`${t('管理成员', 'Manage member')} ${name}`}
                    onClick={() => setMember(i)}
                  >
                    {credits[i]}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {member !== null && (
        <InlinePanel
          title={t('成员积分分配', 'Member credit allocation')}
          onClose={() => setMember(null)}
        >
          <p>{member === 0 ? 'Jing' : 'Leo'}</p>
          <label>
            {t('分配积分', 'Allocated credits')}
            <input
              type="number"
              min="0"
              max="100000"
              value={credits[member]}
              onChange={(e) =>
                setCredits((v) =>
                  v.map((n, i) =>
                    i === member
                      ? Math.max(0, Math.min(100000, Number(e.target.value)))
                      : n,
                  ),
                )
              }
            />
          </label>
          <small>
            {t('仅修改本地预览数据', 'Updates local preview data only')}
          </small>
        </InlinePanel>
      )}
    </section>
  );
}
export function TeamSales({ onSales }: { onSales: () => void }) {
  const { t } = useLanguage();
  return (
    <section className="studio-team-sales" data-ui-block="team-sales">
      <h3>
        {t('为你的团队，开启更多可能。', 'More possibilities for your team.')}
      </h3>
      <p>
        {t(
          '聊聊适合你的团队协作方案。',
          'Let’s find the right collaboration plan for your studio.',
        )}
      </p>
      <button className="pill" onClick={onSales}>
        {t('联系销售', 'Contact Sales')}
      </button>
    </section>
  );
}
export function CollaborationBlock({ onSales }: { onSales: () => void }) {
  const { t } = useLanguage();
  return (
    <Artboard
      id="team-collaboration"
      label={t('团队协作界面', 'Team collaboration interface')}
      className="studio-team-frame"
    >
      <div className="studio-team-grid">
        <CollaborativeCanvas />
        <div className="studio-team-right">
          <TeamProjects />
          <TeamMembers />
          <TeamSales onSales={onSales} />
        </div>
      </div>
    </Artboard>
  );
}
export function EcosystemCards({
  onMore,
}: {
  onMore: (product: string) => void;
}) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(-1);
  return (
    <div className="reference-ecosystem">
      <article className="studio-ecosystem-card" data-ui-block="d5-lite">
        <div>
          <h3>D5 Lite</h3>
          <p>
            {t(
              '让模型中的灵感，延续到 Arco。',
              'Bring ideas from your model into Arco.',
            )}
          </p>
          <button className="pill" onClick={() => onMore('D5 Lite')}>
            {t('了解更多', 'Learn more')}
          </button>
        </div>
        <div className="studio-lite-art">
          <img
            src={art.lite}
            alt={t('D5 Lite 建筑模型', 'D5 Lite building model')}
          />
          <button onClick={() => onMore('D5 Lite')}>
            <img src={withBasePath("/assets/brand.webp")} alt="" />
            {t('发送到 Arco', 'Send to Arco')}
          </button>
        </div>
      </article>
      <article
        className="studio-ecosystem-card studio-works-card"
        data-ui-block="d5-works"
      >
        <div>
          <h3>D5 Works</h3>
          <p>
            {t(
              '连接创作所需的模型、材质与搭配。',
              'Find the models and materials for your next idea.',
            )}
          </p>
          <button className="pill" onClick={() => onMore('D5 Works')}>
            {t('了解更多', 'Learn more')}
          </button>
        </div>
        <div className="studio-works-assets" data-ui-block="works-asset-grid">
          {Array.from({ length: 24 }, (_, i) => (
            <button
              key={i}
              aria-label={`${t('素材', 'Asset')} ${i + 1}`}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
              style={{
                backgroundImage: `url(${withBasePath("/assets/ui/ecosystem-img1.webp")})`,
                backgroundSize: '600% 400%',
                backgroundPosition: `${(i % 6) * 20}% ${(Math.floor(i / 6) * 100) / 3}%`,
              }}
            />
          ))}
        </div>
      </article>
    </div>
  );
}
