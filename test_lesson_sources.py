"""Execute every displayed lesson example on isolated copies, never originals."""
from pathlib import Path
from contextlib import contextmanager
import json, shutil, subprocess, sys, hashlib, os, uuid
from lesson_sources import LESSONS

ROOT=Path(__file__).resolve().parent

@contextmanager
def isolated_directory():
    directory=(ROOT/('.lesson-check-'+uuid.uuid4().hex)).resolve()
    assert directory.parent==ROOT and directory.name.startswith('.lesson-check-')
    directory.mkdir()
    try:
        yield directory
    finally:
        # Only this run's exact, validated temporary directory is removed.
        assert directory.parent==ROOT and directory.name.startswith('.lesson-check-')
        shutil.rmtree(directory)

def subject_dir(key):
    room,subject=key.split('_')
    if room=='set7': return next((ROOT/'실전').glob(f'7세트_{subject}*'))
    grade='그린' if room.startswith('green') else '블루'
    n=room.replace('green','').replace('set','')
    return next((ROOT/'연습'/grade).glob(f'{n}세트*/{subject}*'))

def fingerprints():
    return {str(p.relative_to(ROOT)):hashlib.sha256(p.read_bytes()).hexdigest()
            for directory in ['연습','실전'] for p in (ROOT/directory).rglob('*') if p.is_file()}

before=fingerprints()
results=[]
for key,units in LESSONS.items():
    for i,unit in enumerate(units):
        with isolated_directory() as temporary:
            workspace=Path(temporary)/'subject'
            shutil.copytree(subject_dir(key),workspace,ignore=lambda directory,names:[
                name for name in names if (Path(directory)/name).is_file()
                and Path(name).suffix.lower() not in {'.csv','.md','.json','.html'}])
            # Supply code on stdin, exactly as displayed, with UTF-8 console output.
            run=subprocess.run([sys.executable,'-X','utf8','-'],input=unit['code'],
                cwd=workspace,text=True,encoding='utf-8',capture_output=True,timeout=90,
                env={**os.environ,'MPLCONFIGDIR':str(Path(temporary)/'mpl')})
            missing=[s for s in unit['expected'] if s not in run.stdout]
            record={'key':key,'unit':i,'code_sha256':hashlib.sha256(unit['code'].encode()).hexdigest(),
                    'exit':run.returncode,'stdout':run.stdout,'stderr':run.stderr,'missing':missing}
            results.append(record)
            print(('PASS' if run.returncode==0 and not missing else 'FAIL'),key,i,flush=True)
            if run.returncode or missing:
                print(run.stderr,missing,run.stdout,flush=True)
            if key=='set3_2과목' and i==1 and run.returncode==0:
                # Corrected artifacts are separate from the historical supplied submission.
                corrected=ROOT/'verified-artifacts'/'blue3'
                corrected.mkdir(parents=True,exist_ok=True)
                for name in ['f1_macro_comparison.csv','f1_macro_comparison.png']:
                    shutil.copy2(workspace/'학습출력'/name,corrected/name)

unchanged=before==fingerprints()
report={'subjects':len(LESSONS),'examples':len(results),'originals_unchanged':unchanged,'results':results}
(ROOT/'audit-lesson-repair-results.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
assert unchanged,'Original source files changed!'
assert all(r['exit']==0 and not r['missing'] for r in results),'Lesson failures; see audit-lesson-repair-results.json'
print('ALL PASS; originals unchanged')
