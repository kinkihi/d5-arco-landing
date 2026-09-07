'use client';
/* oxlint-disable next/no-img-element -- Local Figma assets retain their native dimensions inside scaled artboards. */
import { useEffect, useRef } from 'react';

import ShaderLensBlur, { DARK_COLORS } from './ShaderLensBlur';
import { useLanguage } from './Language';
export function Downloads({
  onDownload,
}: {
  onDownload: (os: string) => void;
}) {
  const { t } = useLanguage();
  return (
    <div className="download-options">
      <button className="pill primary" onClick={() => onDownload('Windows')}>
        {t('下载 Windows 版', 'Download Windows')}
      </button>
      <button className="pill secondary" onClick={() => onDownload('macOS')}>
        {t('下载 macOS 版', 'Download macOS')}
      </button>
    </div>
  );
}
const skillCards = [
  ['storyboard', '故事板', 'Storyboard', 16.4, 15, 7.3, 11, -130, -35, 130],
  [
    'art_style_transfer',
    '风格迁移',
    'Art Style Transfer',
    25.5,
    21,
    7.3,
    11,
    -95,
    -20,
    85,
  ],
  ['aerial_view', '鸟瞰视角', 'Aerial view', 10, 31, 7.3, 11, -200, 50, 180],
  ['architecture', '建筑设计', 'Architecture', 64.5, 4, 7.3, 11, 90, -70, 140],
  ['time_shift', '时间变化', 'Time Shift', 82.5, 14, 7.3, 11, 180, -20, 170],
  [
    'seasonal_migration',
    '季节变换',
    'Seasonal Migration',
    66.5,
    33,
    7.3,
    11,
    120,
    45,
    200,
  ],
] as const;
export function Hero({ onDownload }: { onDownload: (os: string) => void }) {
  const { t } = useLanguage();
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let pointerX = 0,
      pointerY = 0,
      targetX = 0,
      targetY = 0;
    let hovering = false;
    const cards = Array.from(
      el.querySelectorAll<HTMLElement>('.float-card'),
    ).map((card) => ({
      card,
      x: parseFloat(card.style.getPropertyValue('--dx')) || 0,
      y: parseFloat(card.style.getPropertyValue('--dy')) || 0,
      z: parseFloat(card.style.getPropertyValue('--dz')) || 0,
    }));
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const p = media.matches
        ? 0
        : Math.min(1, Math.max(0, -rect.top / (rect.height * 0.8)));
      pointerX += (targetX - pointerX) * 0.12;
      pointerY += (targetY - pointerY) * 0.12;
      el.style.setProperty('--hero-progress', String(p));
      el.style.setProperty(
        '--hero-fade',
        String(media.matches ? 1 : Math.max(0, 1 - Math.max(0, p - 0.5) * 1.6)),
      );
      el.style.setProperty('--pointer-x', `${50 + pointerX * 32}%`);
      el.style.setProperty('--pointer-y', `${45 + pointerY * 32}%`);
      el.style.setProperty(
        '--pointer-visible',
        hovering && !media.matches ? '1' : '0',
      );
      for (const { card, x, y, z } of cards) {
        const factor = z / 12;
        card.style.transform = media.matches
          ? 'none'
          : `translate3d(${x * p + pointerX * factor}px,${y * p + pointerY * factor}px,${z * p}px) scale(${1 + (p * z) / 1600})`;
      }
      if (Math.abs(targetX - pointerX) + Math.abs(targetY - pointerY) > 0.002)
        schedule();
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const move = (e: PointerEvent) => {
      if (media.matches || e.pointerType === 'touch') return;
      const r = el.getBoundingClientRect();
      targetX = ((e.clientX - r.left) / r.width) * 2 - 1;
      targetY = ((e.clientY - r.top) / r.height) * 2 - 1;
      hovering = true;
      schedule();
    };
    const leave = () => {
      targetX = 0;
      targetY = 0;
      hovering = false;
      schedule();
    };
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    el.addEventListener('pointermove', move, { passive: true });
    el.addEventListener('pointerleave', leave);
    media.addEventListener('change', schedule);
    update();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      media.removeEventListener('change', schedule);
    };
  }, []);
  const depth = (x: number, y: number, z: number) =>
    ({
      '--dx': `${x}px`,
      '--dy': `${y}px`,
      '--dz': `${z}px`,
    }) as React.CSSProperties;
  return (
    <section id="overview" className="hero" ref={root}>
      <div className="login-background">
        <img src="/assets/login-bg.jpg" alt="" />
        <div />
      </div>
      <ShaderLensBlur className="login-shader" colors={DARK_COLORS} />
      <div className="hero-pointer-glow" aria-hidden="true" />
      <div className="hero-copy">
        <h1>{t('认识 D5 Arco', 'Meet D5 Arco')}</h1>
        <p>
          {t(
            '统一工作流，连接设计的每个阶段。',
            'A unified workflow connecting every stage of design.',
          )}
        </p>
        <Downloads onDownload={onDownload} />
      </div>
      <div
        className="constellation"
        aria-label={t('Arco 创作画布', 'Arco creative canvas')}
      >
        {[
          ['imgFrame1', 8, 39, 14, 21, -180, 50, 60],
          ['imgFrame4', 69.5, 6, 10.7, 46, 140, -20, 30],
          ['imgFrame3', 25.7, 54.8, 14, 21, -80, 90, 40],
          ['imgFrame2', 79.3, 56.7, 14, 21, 140, 130, 80],
          ['imgFrame', 60.2, 71.8, 15.7, 23, 70, 190, 90],
        ].map(([img, x, y, w, h, dx, dy, dz]) => (
          <div
            key={String(img)}
            className="float-card ambient-card"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: `${w}%`,
              height: `${h}%`,
              ...depth(Number(dx), Number(dy), Number(dz)),
            }}
          >
            <img src={`/assets/${img}.jpg`} alt="" />
          </div>
        ))}
        <div
          className="float-card hero-art"
          style={{
            left: '34.4%',
            top: '19.6%',
            width: '31.25%',
            height: '40%',
            ...depth(0, 10, 95),
          }}
        >
          <img
            src="/assets/imgImageFrame.jpg"
            alt={t(
              '花海中的石质建筑概念',
              'Stone architecture surrounded by wildflowers',
            )}
            fetchPriority="high"
          />
        </div>
        {skillCards.map(([img, zh, en, x, y, w, h, dx, dy, dz]) => (
          <a
            key={img}
            className="float-card skill-tile"
            href="#canvas"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: `${w}%`,
              height: `${h}%`,
              ...depth(dx, dy, dz),
            }}
          >
            <img src={`/assets/skill-${img}.webp`} alt="" />
            <span>{t(zh, en)}</span>
          </a>
        ))}
        <a
          className="float-card project-card project-plan"
          href="#canvas"
          style={{
            left: '26%',
            top: '30%',
            width: '11%',
            ...depth(-70, 20, 90),
          }}
        >
          <img
            src="/assets/imgImgVillaGarden3.jpg"
            alt={t('设计平面图', 'Design floor plan')}
          />
          <span>{t('平面方案', 'View Plan')}</span>
        </a>
        <a
          className="float-card project-card"
          href="#canvas"
          style={{
            left: '17%',
            top: '39%',
            width: '13.4%',
            ...depth(-190, 100, 170),
          }}
        >
          <img
            src="/assets/imgImgVillaGarden4.jpg"
            alt={t('自然采光的室内设计', 'Daylit interior design')}
          />
          <div>
            <small>{t('室内设计', 'Interior Design')}</small>
            <span>
              {t('雅居公寓', 'Graceful Apartments')} <b>↗</b>
            </span>
          </div>
        </a>
        <a
          className="float-card project-card"
          href="#chat"
          style={{
            left: '75%',
            top: '31.3%',
            width: '13.4%',
            ...depth(200, 90, 190),
          }}
        >
          <img
            src="/assets/figma147/hero-garden.webp"
            alt={t('别墅花园', 'Villa garden')}
          />
          <div>
            <small>{t('景观设计', 'Landscape')}</small>
            <span>
              {t('别墅花园', 'Villa Garden')} <b>↗</b>
            </span>
          </div>
        </a>
        <a
          className="float-card hero-prompt"
          href="#canvas"
          style={{
            left: '34.4%',
            top: '72%',
            width: '31.25%',
            ...depth(0, 170, 130),
          }}
        >
          <div>
            <span>/{t('演示文稿', 'Slides')}</span>{' '}
            {t(
              '生成一份设计策划演示稿',
              'Generate a design planning presentation',
            )}
          </div>
          <footer>
            <span>＋</span>
            <span>↑</span>
          </footer>
        </a>
        <div
          className="float-card prompt-card"
          style={{
            left: '54.5%',
            top: '53%',
            width: '16.7%',
            ...depth(90, 125, 210),
          }}
        >
          <strong>{t('提示词', 'Prompt')}</strong>
          <p>
            {t(
              '将鸟瞰效果图转化为专业建筑总平面图，保留建筑体量、场地道路、水体与植被。以清晰的层次，呈现完整设计意图。',
              'Please convert the bird’s-eye view rendering into a professional architectural master plan. Represent buildings with simplified roof outlines, preserve green spaces, pathways and water features, and use clear layers to communicate the design.',
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
