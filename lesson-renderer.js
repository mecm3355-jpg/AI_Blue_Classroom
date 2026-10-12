/* UI-only renderer: no Python execution or remote deployment occurs in the browser. */
function buildVerifiedLessonScripts() {
  const meta = window.LESSON_RESULT_META;
  if (!meta?.resultVersion) throw new Error('분석 결과 정보가 없습니다. 학습 데이터를 다시 빌드하세요.');
  const escape = value => String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  const scripts = {};
  for (const [key, units] of Object.entries(window.LESSON_EXAMPLES)) {
    const room = key.split('_')[0];
    const subject = key.split('_')[1];
    const name = window.MULTI_SET_DATA[room].setName;
    if (window.MULTI_SET_DATA[room].resultVersion !== meta.resultVersion ||
        window.ANALYTICS_CHARTS[room].some(chart => chart.resultVersion !== meta.resultVersion)) {
      throw new Error('자막과 분석 결과의 버전이 다릅니다. 새로고침해 주세요.');
    }
    const chapters = [];
    units.forEach((unit,index) => {
      if (unit.resultVersion !== meta.resultVersion || !unit.resultId) {
        throw new Error('강의 예제와 분석 결과가 일치하지 않습니다.');
      }
      const phases = [
        ['👨‍🏫 강혁 교수님','💬 학습 질문',unit.question,'#16A34A'],
        ['👨‍🎓 민우 (수강생)','▶ 원본 검산 결과',unit.answer,'#0284C7'],
        ['👩‍🎓 지우 (수강생)','💡 기준·주의사항',unit.tip,'#B45309']
      ];
      phases.forEach(([speaker,label,text,color],phase) => {
        const start=index*90+phase*30;
        chapters.push({timeRange:[start,start+30],speaker,badgeBg:color,
          resultId:unit.resultId,resultVersion:meta.resultVersion,
          caption:`${label}: ${text}`,
          screenHtml:`<h3>🏛️ ${escape(name)} · ${escape(subject)} · 예제 ${index+1}</h3>
<p style="color:#93C5FD">${escape(unit.question)}</p>
<p style="color:#CBD5E1;font-size:.85rem">원본 분석 결과 연동 · ${escape(new Date(meta.generatedAt).toLocaleString('ko-KR'))} 생성 · 결과 ${escape(meta.resultVersion)}</p>
<p style="color:#CBD5E1;font-size:.85rem">독립 실행 Python 예제 · 해당 과목 폴더에서 실행 · 생성 파일은 학습출력/에 저장합니다. pandas가 필요하며 모델 예제는 numpy·scikit-learn·matplotlib도 사용합니다. 화면은 코드 설명이며 자동 실행하지 않습니다.</p>
<pre style="color:#86EFAC;background:rgba(15,23,42,.96);border:1px solid #22C55E;padding:1rem;white-space:pre;overflow-x:auto">${escape(unit.code)}</pre>
<p style="color:#E2E8F0">${escape(label)}: ${escape(text)}</p>`});
      });
    });
    scripts[key]={title:`${name} ${subject} · 원본 대조 예제`,duration:units.length*90,chapters};
  }
  return scripts;
}

// The legacy lobby contains both static BLUE cards and dynamically added GREEN cards.
// Keep their hover descriptions sourced from the same corrected catalog.
function syncLessonLobbyDescriptions() {
  for(const card of document.querySelectorAll('.room-card[data-enter-set]')) {
    const data=window.MULTI_SET_DATA[card.dataset.enterSet];
    if(!data)continue;
    const description=card.querySelector('.room-desc');
    if(description)description.textContent=data.lobbyDescription;
    const tags=card.querySelector('.room-subjects-tag');
    if(tags)tags.textContent=data.topics.map(topic=>topic.name).join(' · ');
  }
}
document.addEventListener('DOMContentLoaded',syncLessonLobbyDescriptions);
