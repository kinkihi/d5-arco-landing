'use client';
import {useEffect,useRef,useState} from 'react';
import {useStorySceneActive} from './DesignStory';
/** Elapsed time advances only while the scene is visible and the visitor has not taken over. */
export function useDemoTimeline(duration:number){
  const active=useStorySceneActive();
  const [elapsed,setElapsed]=useState(0),[manual,setManual]=useState(false);
  const clock=useRef(0);
  useEffect(()=>{
    if(!active||manual)return;
    const reduced=matchMedia('(prefers-reduced-motion:reduce)');
    let raf=0,last=0,published=0;
    const tick=(now:number)=>{
      if(document.hidden||reduced.matches){last=0;raf=requestAnimationFrame(tick);return;}
      if(last)clock.current=Math.min(duration,clock.current+Math.min(now-last,100));
      last=now;
      if(now-published>=40||clock.current===duration){setElapsed(clock.current);published=now;}
      if(clock.current<duration)raf=requestAnimationFrame(tick);
    };
    raf=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(raf);
  },[active,manual,duration]);
  return {elapsed,active,manual,takeOver:()=>setManual(true)};
}
