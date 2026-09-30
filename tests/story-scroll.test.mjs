import test from 'node:test';
import assert from 'node:assert/strict';
import {storyPosition,storyScrollTarget} from '../app/story-scroll.ts';

test('scene positions stay continuous, bounded and reversible across the entire section',()=>{
  for(const count of [1,2,3,5]){
    let previous=0;
    for(let step=0;step<=10000;step++){
      const p=step/10000,current=storyPosition(p,count);
      assert.ok(current>=previous&&current<=count-1);
      assert.ok(current-previous<0.002);
      assert.ok(Math.abs(current+storyPosition(1-p,count)-(count-1))<1e-10);
      previous=current;
    }
    assert.equal(storyPosition(-1,count),0);
    assert.equal(storyPosition(2,count),count-1);
  }
});
test('manual navigation lands on the same scenes as native scroll in either section',()=>{
  for(const top of [1200,4800])for(const distance of [840,1300,1600]){
    for(let index=0;index<3;index++){
      const target=storyScrollTarget(top,distance,index,3);
      assert.equal(storyPosition((target-top+64)/distance,3),index);
    }
  }
  assert.equal(storyScrollTarget(1200,0,0,1),1136);
});
