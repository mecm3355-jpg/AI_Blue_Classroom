"""Local analysis -> versioned result snapshot -> classroom views.

Run `python -X utf8 lesson_pipeline.py` after changing inputs or analysis code.
Only trusted repository examples execute, on disposable copies of attachments.
"""
from pathlib import Path
from contextlib import contextmanager
from datetime import datetime, timezone
import hashlib
import json
import os
import shutil
import subprocess
import sys
import uuid
from importlib.metadata import version
from lesson_sources import LESSONS
from lesson_result_schema import SPECS, render_unit

ROOT = Path(__file__).resolve().parent
RESULT_PATH = ROOT / 'lesson-results.json'
SCHEMA_VERSION = 1

def digest(data):
    return hashlib.sha256(data).hexdigest()

def source_fingerprints():
    return {p.relative_to(ROOT).as_posix(): digest(p.read_bytes())
            for folder in ['연습','실전'] for p in sorted((ROOT/folder).rglob('*'))
            if p.is_file() and '학습출력' not in p.parts}

def signature():
    sources = source_fingerprints()
    authors = {name: digest((ROOT/name).read_bytes()) for name in
               ['lesson_sources.py','lesson_result_schema.py','lesson_pipeline.py']}
    environment = {package:version(package) for package in ['pandas','numpy','scikit-learn','matplotlib']}
    environment['python'] = sys.version.split()[0]
    return dict(sources=sources, authors=authors, environment=environment)

def subject_dir(key):
    room, subject = key.split('_')
    if room == 'set7':
        matches = list((ROOT/'실전').glob(f'7세트_{subject}*'))
    else:
        grade = '그린' if room.startswith('green') else '블루'
        n = room.replace('green','').replace('set','')
        matches = list((ROOT/'연습'/grade).glob(f'{n}세트*/{subject}*'))
    if len(matches) != 1:
        raise ValueError(f'{key}: expected one source directory, found {len(matches)}')
    return matches[0]

@contextmanager
def isolated_directory():
    directory = (ROOT/('.lesson-check-'+uuid.uuid4().hex)).resolve()
    assert directory.parent == ROOT and directory.name.startswith('.lesson-check-')
    directory.mkdir()
    try:
        yield directory
    finally:
        assert directory.parent == ROOT and directory.name.startswith('.lesson-check-')
        shutil.rmtree(directory)

def export_code(definition):
    # These expressions are repository-owned, never supplied by browser input.
    expressions = ',\n'.join(f'{key!r}: ({value})' for key,value in definition['facts'].items())
    return '''
\n# Export the very same computed values used by the lesson UI.
def _json_scalar(value):
    if hasattr(value, 'item'):
        return value.item()
    raise TypeError(type(value).__name__)
_lesson_facts = {''' + expressions + '''}
(OUT/'lesson-facts.json').write_text(json.dumps(_lesson_facts, ensure_ascii=False,
    allow_nan=False, default=_json_scalar), encoding='utf-8')
'''

def generate_results():
    expected = {(key,i) for key,units in LESSONS.items() for i in range(len(units))}
    if expected != set(SPECS):
        raise ValueError('Every example must have exactly one result binding')
    inputs = signature()
    results = {}
    for key, units in LESSONS.items():
        for index,unit in enumerate(units):
            definition = SPECS[(key,index)]
            with isolated_directory() as temporary:
                workspace = temporary/'subject'
                shutil.copytree(subject_dir(key),workspace,ignore=lambda directory,names:[
                    name for name in names if name=='학습출력' or
                    ((Path(directory)/name).is_file() and Path(name).suffix.lower() not in {'.csv','.md','.json','.html'})])
                run = subprocess.run([sys.executable,'-X','utf8','-'],
                    input=unit['code']+export_code(definition),cwd=workspace,
                    text=True,encoding='utf-8',capture_output=True,timeout=120,
                    env={**os.environ,'MPLCONFIGDIR':str(temporary/'mpl')})
                if run.returncode:
                    raise RuntimeError(f'{key}/{index}: analysis failed\n{run.stderr}')
                facts = json.loads((workspace/'학습출력'/'lesson-facts.json').read_text(encoding='utf-8'))
                result_id = f'{key}/{index}'
                record = dict(id=result_id,facts=facts,stdout=run.stdout,
                              codeSha256=digest(unit['code'].encode()),
                              sourceDirectory=subject_dir(key).relative_to(ROOT).as_posix())
                render_unit(unit,record,definition)  # Fail before publishing broken templates.
                results[result_id] = record
                print('COMPUTED',result_id,flush=True)
    if inputs != signature():
        raise RuntimeError('Inputs changed during computation; previous snapshot retained')
    snapshot = dict(schemaVersion=SCHEMA_VERSION,generatedAt=datetime.now(timezone.utc).isoformat(),
                    inputs=inputs,results=results)
    snapshot['resultVersion'] = digest(json.dumps(snapshot,sort_keys=True,ensure_ascii=False).encode())[:16]
    temporary = RESULT_PATH.with_suffix('.json.tmp')
    temporary.write_text(json.dumps(snapshot,ensure_ascii=False,indent=2,allow_nan=False),encoding='utf-8')
    temporary.replace(RESULT_PATH)
    return snapshot

def load_results():
    if not RESULT_PATH.exists():
        raise ValueError('Missing results. Run: python -X utf8 lesson_pipeline.py')
    snapshot = json.loads(RESULT_PATH.read_text(encoding='utf-8'))
    if snapshot.get('schemaVersion') != SCHEMA_VERSION or snapshot.get('inputs') != signature():
        raise ValueError('Stale results: inputs/code changed. Run: python -X utf8 lesson_pipeline.py')
    payload = {k:v for k,v in snapshot.items() if k!='resultVersion'}
    if digest(json.dumps(payload,sort_keys=True,ensure_ascii=False).encode())[:16] != snapshot.get('resultVersion'):
        raise ValueError('Result snapshot was modified; regenerate instead of manually editing it')
    expected = {f'{key}/{i}' for key,units in LESSONS.items() for i in range(len(units))}
    if set(snapshot['results']) != expected:
        raise ValueError('Incomplete result snapshot')
    return snapshot

def resolved_lessons(snapshot):
    lessons = {}
    for key,units in LESSONS.items():
        lessons[key] = []
        for index,unit in enumerate(units):
            record = snapshot['results'][f'{key}/{index}']
            if record['codeSha256'] != digest(unit['code'].encode()):
                raise ValueError(f'{key}/{index}: code and result do not match')
            rendered = render_unit(unit,record,SPECS[(key,index)])
            # Expected answers are regression fixtures, never live UI data.
            rendered.pop('expected',None)
            rendered.pop('reference_answer',None)
            rendered['resultVersion'] = snapshot['resultVersion']
            lessons[key].append(rendered)
    return lessons

if __name__ == '__main__':
    result = generate_results()
    print(f"Published {len(result['results'])} computed examples: {result['resultVersion']}")
