'use client';
import { useEffect, useRef, useState } from 'react';
import {DemoResetBoundary} from './ui-blocks/Primitives';
import { useLanguage } from './Language';
export function DesignGallery({
  id,
  title,
  description,
  panels,
}: {
  id: string;
  title: string;
  description: string;
  panels: { id: string; label: string; content: React.ReactNode }[];
}) {
  const root = useRef<HTMLElement>(null),
    view = useRef<HTMLDivElement>(null),
    track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const enabled = useRef(false);
  const last = useRef(0);
  const { t } = useLanguage();
  useEffect(() => {
    const el = root.current,
      v = view.current,
      tr = track.current;
    if (!el || !v || !tr) return;
    const media = matchMedia(
      '(min-width: 901px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)',
    );
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!enabled.current) return;
      const rect = el.getBoundingClientRect();
      const distance = el.offsetHeight - innerHeight + 64;
      const p = Math.min(
        1,
        Math.max(0, (64 - rect.top) / Math.max(1, distance)),
      );
      const step = v.clientWidth + 24;
      tr.style.transform = `translate3d(${-p * (panels.length - 1) * step}px,0,0)`;
      const index = Math.round(p * (panels.length - 1));
      if (index !== last.current) {
        last.current = index;
        setActive(index);
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const setup = () => {
      enabled.current = media.matches;
      tr.style.transform = '';
      v.scrollLeft = 0;
      update();
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(v);
    media.addEventListener('change', setup);
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    setup();
    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      media.removeEventListener('change', setup);
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
    };
  }, [panels.length]);
  const move = (index: number) => {
    const el = root.current,
      v = view.current;
    if (!el || !v) return;
    const i = Math.max(0, Math.min(panels.length - 1, index));
    const behavior = matchMedia('(prefers-reduced-motion:reduce)').matches
      ? 'instant'
      : 'smooth';
    if (enabled.current) {
      const top = el.getBoundingClientRect().top + scrollY;
      scrollTo({
        top:
          top -
          64 +
          (i / (panels.length - 1)) * (el.offsetHeight - innerHeight + 64),
        behavior,
      });
    } else v.scrollTo({ left: i * (v.clientWidth + 24), behavior });
  };
  return (
    <section
      className="design-gallery"
      id={id}
      ref={root}
      style={{ '--count': panels.length } as React.CSSProperties}
    >
      <div className="gallery-sticky">
        <header className="reference-heading">
          <h2>{title}</h2>
          <p>{description}</p>
        </header>
        <div
          className="gallery-viewport"
          ref={view}
          onScroll={() => {
            if (!enabled.current && view.current)
              setActive(
                Math.round(
                  view.current.scrollLeft / (view.current.clientWidth + 24),
                ),
              );
          }}
        >
          <div className="gallery-track" ref={track}>
            {panels.map((im, i) => (
              <figure key={im.id} aria-label={im.label} inert={i !== active}>
                <DemoResetBoundary>{im.content}</DemoResetBoundary>
              </figure>
            ))}
          </div>
        </div>
        <div
          className="gallery-controls"
          aria-label={t('横向浏览', 'Horizontal browsing')}
        >
          <button
            onClick={() => move(active - 1)}
            disabled={active === 0}
            aria-label={t('上一画面', 'Previous screen')}
          >
            ←
          </button>
          {panels.map((im, i) => (
            <button
              key={im.id}
              onClick={() => move(i)}
              aria-pressed={active === i}
              aria-label={im.label}
            >
              <span />
            </button>
          ))}
          <button
            onClick={() => move(active + 1)}
            disabled={active === panels.length - 1}
            aria-label={t('下一画面', 'Next screen')}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
