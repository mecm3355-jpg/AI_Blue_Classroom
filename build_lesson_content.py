"""Generate synchronized UI content and mechanically replace obsolete data blocks.

Does not touch style blocks, source attachments, galaxy-webgl.js, or deployment.
"""
from pathlib import Path
import json,re,hashlib
from lesson_pipeline import load_results, resolved_lessons
from lesson_catalog import build_catalog

ROOT=Path(__file__).resolve().parent
snapshot=load_results()
LESSONS=resolved_lessons(snapshot)
data,charts=build_catalog(snapshot,LESSONS)
def js(value): return json.dumps(value,ensure_ascii=False,indent=2).replace('</script','<\\/script')

bundle='// Generated from lesson-results.json; never edit observed values here.\n'
bundle+='window.LESSON_RESULT_META = '+js({k:snapshot[k] for k in ['schemaVersion','generatedAt','resultVersion']})+';\n'
bundle+='window.MULTI_SET_DATA = '+js(data)+';\n'
bundle+='window.ANALYTICS_CHARTS = '+js(charts)+';\n'
bundle+='window.LESSON_EXAMPLES = '+js(LESSONS)+';\n'
(ROOT/'lesson-content.js').write_text(bundle,encoding='utf-8')

page=ROOT/'index.html'
html=page.read_text(encoding='utf-8')
styles=re.findall(r'<style\b[^>]*>.*?</style>',html,flags=re.S)
html=re.sub(r'(lesson-(?:content|renderer)\.js\?v=)[^"\s]+',lambda m:m[1]+snapshot['resultVersion'],html)
if 'window.MULTI_SET_DATA =' in html:
    start=html.index('window.MULTI_SET_DATA =')
    escape_start=html.index('function escapeHtml',start)
    html=html[:start]+html[escape_start:]
    start=html.index('window.ANALYTICS_CHARTS =')
    end=html.index('function renderMetricChart',start)
    html=html[:start]+html[end:]
    start=html.index('function greenTip(')
    end=html.index('class CollectorAgent',start)
    html=html[:start]+html[end:]
    start=html.index('this.allVideoScripts = {')
    end=html.index('  setCurrentSet(setKey)',start)
    html=html[:start]+'''this.allVideoScripts = buildVerifiedLessonScripts();
  }

'''+html[end:]
    html=html.replace("    if (setKey && setKey.startsWith('green') && !this.allVideoScripts[`${setKey}_1과목`]) this.buildGreenScripts();",'')
    marker='  <script src="./galaxy-webgl.js?v=mobile-layout-20261012"></script>'
    assert marker in html
    html=html.replace(marker,'''  <script src="./lesson-content.js?v=source-verified-20261012"></script>
  <script src="./lesson-renderer.js?v=source-verified-20261012"></script>
'''+marker)

# Update the existing static room descriptions without changing card structure/style.
for room,d in data.items():
    pattern=r'(<[^>]+class="[^"]*room-card[^"]*"[^>]*data-enter-set="'+room+r'"[^>]*>)(.*?)(?=<[^>]+class="[^"]*room-card|<script|\Z)'
    # Attribute order varies; use each room opening tag followed by its first description.
    pattern=r'(<[^>]*data-enter-set="'+room+r'"[^>]*>[\s\S]*?<p class="room-desc">)(.*?)(</p>)'
    html,count=re.subn(pattern,lambda m:m[1]+d['lobbyDescription']+m[3],html,count=1,flags=re.S)
    # Descriptions for JS-created GREEN cards are updated in lesson-renderer before WebGL initialization.

html=html.replace("${r.time || '10:00 KST'}","${escapeHtml(r.time || '검증 기록 없음')}")
html=html.replace("${r.status || 'PASS'}","${escapeHtml(r.status || '미검증')}")
html=html.replace('실시간 자막 동기화 세부 평가표','학습 예제 대조표')
assert styles==re.findall(r'<style\b[^>]*>.*?</style>',html,flags=re.S),'Design changed!'
page.write_text(html,encoding='utf-8')
print(f'Built {len(data)} rooms / {len(LESSONS)} subjects / {sum(map(len,LESSONS.values()))} examples; CSS unchanged')
