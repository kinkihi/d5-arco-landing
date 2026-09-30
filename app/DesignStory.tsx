'use client';
import {useEffect,useRef,useState,createContext,useContext,type ReactNode,type CSSProperties} from 'react';
import {DemoResetBoundary} from './ui-blocks/Primitives';
import {useLanguage} from './Language';
import {storyPosition,storyScrollTarget} from './story-scroll';

const StorySceneActive=createContext(true);
export const useStorySceneActive=()=>useContext(StorySceneActive);
const StoryNavigation=createContext<(index:number)=>void>(()=>{});
export const useStoryNavigation=()=>useContext(StoryNavigation);
export function DesignStory({id,title,description,panels}:{id:string;title:string;description:string;panels:{id:string;label:string;description:string;content:ReactNode}[]}) {
  const root=useRef<HTMLElement>(null),enabled=useRef(false);
  const [active,setActive]=useState(0),[visible,setVisible]=useState(false);
  const frame=useRef<HTMLDivElement>(null);
  useEffect(()=>{const node=frame.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting&&entry.intersectionRatio>=.35),{threshold:[0,.35]});observer.observe(node);return()=>observer.disconnect();},[]);
  const {t}=useLanguage();
  useEffect(()=>{
    const el=root.current;if(!el)return;
    const media=matchMedia('(min-width:901px) and (min-height:700px)');
    const reduced=matchMedia('(prefers-reduced-motion:reduce)');
    let raf=0;
    const update=()=>{
      raf=0;if(!enabled.current)return;
      const distance=el.offsetHeight-innerHeight+64;
      const progress=Math.max(0,Math.min(1,(64-el.getBoundingClientRect().top)/Math.max(1,distance)));
      const position=storyPosition(progress,panels.length);
      const index=Math.round(position);
      el.style.setProperty('--story-position',String(reduced.matches?index:position));
      setActive(previous=>previous===index?previous:index);
    };
    const schedule=()=>{if(!raf)raf=requestAnimationFrame(update);};
    const setup=()=>{
      enabled.current=media.matches;
      el.dataset.scrollBound=String(media.matches);
      if(media.matches)update();
      else{el.style.setProperty('--story-position','0');setActive(0);}
    };
    const resize=new ResizeObserver(schedule);resize.observe(el);
    media.addEventListener('change',setup);reduced.addEventListener('change',schedule);
    addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);setup();
    return()=>{cancelAnimationFrame(raf);resize.disconnect();media.removeEventListener('change',setup);reduced.removeEventListener('change',schedule);removeEventListener('scroll',schedule);removeEventListener('resize',schedule);};
  },[panels.length]);
  const move=(index:number)=>{
    const i=Math.max(0,Math.min(panels.length-1,index)),el=root.current;
    if(enabled.current&&el){const distance=el.offsetHeight-innerHeight+64;scrollTo({top:storyScrollTarget(el.getBoundingClientRect().top+scrollY,distance,i,panels.length),behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});}
    else {el?.style.setProperty('--story-position',String(i));setActive(i);}
  };
  return <section id={id} ref={root} className="design-story" style={{'--count':panels.length} as CSSProperties}>
    <div className="story-sticky">
      <header className="reference-heading story-heading"><div><h2>{title}</h2><p>{description}</p></div>
        <nav className="gallery-controls story-controls" aria-label={t('浏览设计场景','Browse design scenes')}>
          <button aria-label={t('上一画面','Previous screen')} disabled={active===0} onClick={()=>move(active-1)}>←</button>
          {panels.map((panel,i)=><button key={panel.id} aria-label={panel.label} aria-pressed={active===i} onClick={()=>move(i)}><span/></button>)}
          <button aria-label={t('下一画面','Next screen')} disabled={active===panels.length-1} onClick={()=>move(active+1)}>→</button>
        </nav>
      </header>
      <div className="story-frame" ref={frame} aria-label={title}>
        {panels.map((panel,i)=><div className="story-scene" key={panel.id} inert={i!==active} aria-hidden={i!==active} style={{'--scene-index':i} as CSSProperties}><StorySceneActive.Provider value={visible&&i===active}><StoryNavigation.Provider value={move}><DemoResetBoundary>{panel.content}</DemoResetBoundary></StoryNavigation.Provider></StorySceneActive.Provider></div>)}
      </div>
      <div className="story-caption" aria-live="polite" aria-atomic="true"><h3>{panels[active].label}</h3><p>{panels[active].description}</p></div>
    </div>
  </section>;
}
