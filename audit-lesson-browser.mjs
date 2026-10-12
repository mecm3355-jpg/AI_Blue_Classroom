import fs from 'node:fs';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const html=fs.readFileSync('index.html','utf8');
for(const m of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi))if(m[1].trim())new vm.Script(m[1]);
const target=await fetch('http://127.0.0.1:9223/json/new?about:blank',{method:'PUT'}).then(r=>r.json());
const ws=new WebSocket(target.webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener('open',r,{once:true}));
let id=0;const pending=new Map();const report={errors:[],httpErrors:[],rooms:[],viewports:[]};
ws.addEventListener('message',e=>{const m=JSON.parse(e.data);
 if(pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}
 if(m.method==='Runtime.exceptionThrown')report.errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);
 if(m.method==='Network.responseReceived' && m.params.response.status>=400)report.httpErrors.push(m.params.response.url);
});
function cdp(method,params={}){const n=++id;ws.send(JSON.stringify({id:n,method,params}));return new Promise((resolve,reject)=>pending.set(n,{resolve,reject}));}
async function ev(expression){const r=await cdp('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description);return r.result.value;}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function wait(expression){for(let i=0;i<100;i++){if(await ev(expression))return;await sleep(100);}throw Error('Timeout '+expression);}
try{
 await cdp('Page.enable');await cdp('Runtime.enable');await cdp('Network.enable');
 await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await cdp('Page.navigate',{url:'http://127.0.0.1:4173/?lesson-repair'});
 await wait("document.readyState==='complete' && !!window.collector");
 const snapshot=JSON.parse(fs.readFileSync('lesson-results.json','utf8'));
 report.resultVersion=await ev('LESSON_RESULT_META.resultVersion');
 assert.equal(report.resultVersion,snapshot.resultVersion,'browser uses the computed result snapshot');
 report.rooms=await ev(`(async()=>{
 const out=[];const delay=ms=>new Promise(r=>setTimeout(r,ms));
 for(const [room,data] of Object.entries(MULTI_SET_DATA)){
   enterClassroom(room,false);await delay(50);
   const result={room,subjects:[],answers:[],charts:[],bindingFailures:[]};
   const cards=[...document.querySelectorAll('.kpi-card')];
   data.kpis.filter(k=>k.label!=='등급').slice(0,cards.length).forEach((k,i)=>{
     const value=cards[i].querySelector('.kpi-info .val') || cards[i].querySelector('h3');
     if(value.textContent!==k.val)result.bindingFailures.push('kpi '+i);
   });
   for(let i=0;i<3;i++){
     document.querySelectorAll('.topic-btn')[i].click();
     const script=collector.getSubjectScript(data.topics[i].id);
     const failures=[];
     for(const chapter of script.chapters){
       if(chapter.resultVersion!==LESSON_RESULT_META.resultVersion || !chapter.resultId)failures.push('result provenance');
       const bar=document.querySelector('#video-progress-bg'),r=bar.getBoundingClientRect();
       const t=(chapter.timeRange[0]+chapter.timeRange[1])/2;
       bar.dispatchEvent(new MouseEvent('click',{clientX:r.left+r.width*t/script.duration,clientY:r.top+2,bubbles:true}));
       if(document.querySelector('#board-overlay-content').getAttribute('data-last-html')!==chapter.screenHtml)failures.push('board');
       if(document.querySelector('#caption-live-text').textContent!==chapter.caption)failures.push('caption');
     }
     result.subjects.push({id:data.topics[i].id,chapters:script.chapters.length,failures});
     for(const row of data.matrix.filter(r=>r.subject===(i+1)+'과목')){
       const input=document.querySelector('#question-input');input.value=row.q;input.dispatchEvent(new Event('input',{bubbles:true}));
       document.querySelector('#question-submit').click();
       result.answers.push({q:row.q,pass:document.querySelector('#question-answer').textContent.includes(row.ans)});
     }
   }
   document.querySelector('#tab-btn-analytics').click();
   result.charts=[...document.querySelectorAll('#analytics-tab .metric-summary')].map(e=>e.textContent);
   [...document.querySelectorAll('#analytics-tab .metric-summary')].forEach((element,i)=>{
     const visible=[...element.querySelectorAll('dd')].map(e=>e.textContent);
     const expected=ANALYTICS_CHARTS[room][i].metrics.map(m=>m[2]);
     if(JSON.stringify(visible)!==JSON.stringify(expected))result.bindingFailures.push('chart '+i);
   });
   document.querySelector('#tab-btn-table').click();
   result.tableRows=document.querySelectorAll('#table-body tr').length;
   result.expectedRows=data.matrix.length;
   document.querySelector('#tab-btn-chat').click();out.push(result);
 }
 return out;
})()`);
 for(const room of report.rooms){
   assert.equal(room.subjects.length,3);assert.ok(room.subjects.every(s=>s.failures.length===0),room.room+' seeking');
   assert.ok(room.answers.every(a=>a.pass),room.room+' answers');
   assert.equal(room.tableRows,room.expectedRows);assert.equal(room.charts.length,2);
   assert.deepEqual(room.bindingFailures,[],room.room+' computed values rendered');
   console.log('PASS',room.room,room.subjects.length+' subjects',room.answers.length+' answers');
 }
 const data=await ev('({rooms:MULTI_SET_DATA,charts:ANALYTICS_CHARTS})');
 assert.equal(data.charts.set3[1].metrics[0][1],15);
 assert.equal(data.charts.set3[0].metrics[2][1],.7249);
 assert.equal(data.charts.green4[0].metrics[1][1],790);
 assert.equal(data.charts.green1[1].metrics[0][1],1);
 assert.ok(data.rooms.set5.kpis.some(k=>k.val==='재현 미확인'));
 for(const [name,width,height] of [['portrait',360,744],['landscape',800,280],['desktop',1440,1000]]){
   await cdp('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width!==1440});
   await ev("enterClassroom('set3',false);document.querySelectorAll('.topic-btn')[1].click()");
   await sleep(150);
   // Show the longest repaired lesson (4-model training), not a short sample.
   await ev(`(()=>{const bar=document.querySelector('#video-progress-bg'),r=bar.getBoundingClientRect();bar.dispatchEvent(new MouseEvent('click',{clientX:r.left+r.width*.8,clientY:r.top+1,bubbles:true}));})()`);
   const state=await ev(`(()=>{const e=document.querySelector('#board-overlay-content'),r=e.getBoundingClientRect();return {width:innerWidth,scrollWidth:document.documentElement.scrollWidth,board:r.toJSON(),hasMacro:e.textContent.includes("average='macro'"),preScroll:e.querySelector('pre').scrollWidth,preWidth:e.querySelector('pre').clientWidth};})()`);
   assert.ok(state.scrollWidth<=width+1,name+' overflow');assert.ok(state.hasMacro,name+' wrong code');
   report.viewports.push({name,...state});
   const shot=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});
   fs.writeFileSync('audit-lesson-'+name+'.png',Buffer.from(shot.data,'base64'));
 }
 assert.deepEqual(report.errors,[]);assert.deepEqual(report.httpErrors,[]);
 report.pass=true;
}finally{
 fs.writeFileSync('audit-lesson-browser-results.json',JSON.stringify(report,null,2));
 await cdp('Page.close').catch(()=>{});ws.close();
}
