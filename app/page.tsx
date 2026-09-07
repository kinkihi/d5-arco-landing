'use client';
/* oxlint-disable next/no-img-element -- Local Figma assets retain their native dimensions inside scaled artboards. */
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { LanguageProvider, LanguageButtons, useLanguage } from './Language';
import { Hero, Downloads } from './Hero';
import { DesignGallery } from './DesignGallery';
import {
  PlanningBlock,
  PresentationBlock,
  CanvasBlock,
  GenerationBlock,
} from './ui-blocks/DesignBlocks';
import {
  RenderBlock,
  ResourcesBlock,
  TransferBlock,
} from './ui-blocks/ConnectionBlocks';
import { CollaborationBlock, EcosystemCards } from './ui-blocks/TeamBlocks';
const footerGroups = [
  [
    ['产品', 'Product'],
    ['为什么选择 D5', 'Why D5'],
    ['最新动态', 'What’s New'],
    ['价格', 'Pricing'],
    ['下载', 'Download'],
    ['D5 团队版', 'D5 for Teams'],
    ['D5 教育版', 'D5 for Education'],
    ['开发路线图', 'Roadmap'],
    ['素材库', 'Asset Library'],
  ],
  [
    ['支持', 'Support'],
    ['帮助中心', 'Help Center'],
    ['系统要求', 'System Requirements'],
    ['我的空间', 'My Space'],
  ],
  [
    ['学习', 'Learn'],
    ['教程', 'Tutorials'],
    ['示例场景', 'Sample Scene'],
    ['作品展示', 'Gallery'],
    ['博客', 'Blog'],
    ['线上研讨会', 'Webinars'],
    ['认证', 'Certification'],
    ['D5 讲师', 'D5 Instructor'],
  ],
  [
    ['社区', 'Community'],
    ['论坛', 'Forum'],
    ['D5 大奖', 'D5 Awards'],
    ['创作者计划', 'Champion Program'],
    ['校园大使', 'Campus Ambassador'],
    ['用户社群', 'User Group'],
    ['赢取 D5 Pro', 'Win D5 Pro'],
  ],
  [
    ['商务合作', 'For Business'],
    ['成为经销商', 'Become a Reseller'],
    ['寻找经销商', 'Find a Reseller'],
    ['推广合作', 'Affiliate Program'],
    ['技术合作伙伴', 'Technology Partners'],
    ['品牌资源', 'Brand Kit'],
    ['公司', 'Company'],
    ['关于我们', 'About Us'],
    ['加入我们', 'Career'],
  ],
];
function Brand() {
  return (
    <a href="#overview" className="brand">
      <img src="/assets/brand.webp" alt="" />
      <span>D5</span>
    </a>
  );
}
function Page() {
  const { lang, t } = useLanguage();
  const [modal, setModal] = useState('');
  const panels = [
    {
      id: 'planning',
      label: t('聊天策划', 'Chat planning'),
      content: <PlanningBlock />,
    },
    {
      id: 'presentation',
      label: t('演示文稿', 'Presentation'),
      content: <PresentationBlock />,
    },
    {
      id: 'canvas',
      label: t('画布编辑', 'Canvas editing'),
      content: <CanvasBlock />,
    },
    {
      id: 'generation',
      label: t('图像生成', 'Image generation'),
      content: <GenerationBlock />,
    },
  ];
  const connections = [
    {
      id: 'render',
      label: t('Render 联动', 'Render connection'),
      content: <RenderBlock />,
    },
    {
      id: 'resources',
      label: t('云资源引用', 'Cloud resources'),
      content: <ResourcesBlock />,
    },
    {
      id: 'transfer',
      label: t('场景迁移与批量操作', 'Scene transfer and batch operations'),
      content: <TransferBlock />,
    },
  ];
  const modalTitle =
    modal === 'sales'
      ? t('联系销售', 'Contact Sales')
      : modal === 'newsletter'
        ? t('邮件订阅', 'Newsletter')
        : modal === 'Windows' || modal === 'macOS'
          ? `${t('下载', 'Download')} ${modal}`
          : footerGroups.flat().find((pair) => pair[1] === modal)?.[
              lang === 'zh' ? 0 : 1
            ] || modal;
  return (
    <>
      <header className="global-nav">
        <Brand />
        <LanguageButtons />
      </header>
      <main>
        <Hero onDownload={setModal} />
        <DesignGallery
          id="canvas"
          title={t('和 Arco 一起设计', 'Design with Arco')}
          description={t(
            '从第一个想法，到一次完整表达。',
            'From your first idea to a complete expression.',
          )}
          panels={panels}
        />
        <div className="connection-section">
          <DesignGallery
            id="chat"
            title={t('Arco 链接 D5', 'Arco connects to D5')}
            description={t(
              '让设计语境，在每个工具之间流动。',
              'Keep your design context flowing between tools.',
            )}
            panels={connections}
          />
          <EcosystemCards onMore={setModal} />
        </div>
        <section id="connection" className="reference-collaboration">
          <header className="reference-heading">
            <h2>{t('用 Arco 协作', 'Collaborate with Arco')}</h2>
            <p>
              {t(
                '把团队的灵感、项目与资源，连接在一起。',
                'Bring your team’s ideas, projects and resources together.',
              )}
            </p>
          </header>
          <CollaborationBlock onSales={() => setModal('sales')} />
        </section>
        <section className="closing" id="start">
          <img src="/assets/brand.webp" alt="D5 Arco" />
          <h2>
            {t('你的设计，', 'Where will your design')}
            <br />
            {t('下一站在哪里？', 'take you next?')}
          </h2>
          <p>
            {t(
              '从 D5 工作流开始，让创作走进你的工作室。',
              'Start with D5 Workflow — or bring D5 to your studio.',
            )}
          </p>
          <Downloads onDownload={setModal} />
        </section>
      </main>
      <footer className="reference-footer">
        <div className="footer-columns">
          {footerGroups.map(([title, ...items]) => (
            <div key={title[1]}>
              <h3>{t(title[0], title[1])}</h3>
              {items.map((item) =>
                item[1] === 'Company' ? (
                  <h3 key={item[1]} className="company-heading">
                    {t(item[0], item[1])}
                  </h3>
                ) : (
                  <button key={item[1]} onClick={() => setModal(item[1])}>
                    {t(item[0], item[1])}
                  </button>
                ),
              )}
            </div>
          ))}
          <div className="footer-subscribe">
            <h3>{t('订阅动态', 'Hear from us')}</h3>
            <p>
              {t(
                '获取最新消息、文章、资源和设计灵感。',
                'Subscribe to get the latest news, articles, resources and inspiration.',
              )}
            </p>
            <button
              className="newsletter-placeholder"
              onClick={() => setModal('newsletter')}
            >
              <span>{t('输入邮箱', 'Enter your email')}</span>
              <strong>{t('下一步', 'Next step')}</strong>
            </button>
            <h3>{t('关注我们', 'Follow us')}</h3>
            <span className="social-labels">D5　Discord　Instagram</span>
          </div>
        </div>
        <div className="footer-legal">
          <span>
            Dimension 5 Techs. © {new Date().getFullYear()} Dimension 5.{' '}
            {t('保留所有权利。', 'All rights reserved.')}
          </span>
          <span>
            {t(
              '隐私政策　 服务协议　 加入我们',
              'Privacy Policy　 Service Agreement　 Join Us',
            )}
          </span>
          <LanguageButtons />
        </div>
      </footer>
      <Dialog open={!!modal} onOpenChange={(open) => !open && setModal('')}>
        <DialogContent className="entry-dialog">
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>
            {modal === 'Windows' || modal === 'macOS'
              ? t(
                  '安装包地址尚未接入，准备好后将在这里提供下载。',
                  'The installer link is not connected yet.',
                )
              : t(
                  '此入口暂未接入正式地址。',
                  'This destination is not connected in the preview yet.',
                )}
          </DialogDescription>
          <button className="pill" onClick={() => setModal('')}>
            {t('关闭', 'Close')}
          </button>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default function Home() {
  return (
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  );
}
