"""Data-flow and stale-result tests; changes only disposable source copies."""
import copy
import json
import os
import subprocess
import sys
import unittest
from unittest.mock import patch
import shutil
import runpy
from types import SimpleNamespace
from lesson_sources import LESSONS
from lesson_result_schema import SPECS
from lesson_catalog import build_catalog
from lesson_pipeline import (ROOT,load_results,resolved_lessons,signature,subject_dir,
                             isolated_directory,export_code,generate_results,RESULT_PATH)

class PipelineTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.snapshot=load_results()

    def test_all_examples_and_historical_regression_checks(self):
        self.assertEqual(len(self.snapshot['results']),39)
        lessons=resolved_lessons(self.snapshot)
        self.assertEqual(len(lessons),33)
        for key,units in LESSONS.items():
            for index,unit in enumerate(units):
                result=self.snapshot['results'][f'{key}/{index}']
                for expected in unit['expected']:
                    self.assertIn(expected,result['stdout'],result['id'])
                self.assertNotIn('reference_answer',lessons[key][index])
                self.assertNotIn('expected',lessons[key][index])

    def test_every_ui_binding_matches_result_snapshot(self):
        lessons=resolved_lessons(self.snapshot)
        rooms,charts=build_catalog(self.snapshot,lessons)
        self.assertEqual(len(rooms),11)
        self.assertEqual(sum(map(len,charts.values())),22)
        for room,data in rooms.items():
            self.assertEqual(len(data['kpis']),4)
            for row in data['matrix']:
                unit=lessons[f"{room}_{row['subject']}"][row['unit']]
                self.assertEqual(row['ans'],unit['answer'])
                self.assertEqual(row['resultId'],unit['resultId'])
            for kpi in data['kpis']:
                if 'resultId' in kpi:
                    self.assertIn(kpi['resultId'],self.snapshot['results'])
            for chart in charts[room]:
                self.assertEqual(chart['resultVersion'],self.snapshot['resultVersion'])
                self.assertTrue(chart['metrics'])
                for result_id in chart['resultIds']:
                    self.assertIn(result_id,self.snapshot['results'])
        self.assertEqual(charts['set3'][0]['metrics'][2][1],.7249)

    def test_source_or_code_or_environment_change_blocks_stale_build(self):
        for section in ['sources','authors','environment']:
            changed=copy.deepcopy(self.snapshot['inputs'])
            changed[section]['test-change']='different'
            with patch('lesson_pipeline.signature',return_value=changed):
                with self.assertRaisesRegex(ValueError,'Stale results'):
                    load_results()

    def test_missing_and_tampered_snapshot_are_rejected(self):
        with isolated_directory() as temporary:
            target=temporary/'results.json'
            with patch('lesson_pipeline.RESULT_PATH',target):
                with self.assertRaisesRegex(ValueError,'Missing results'):
                    load_results()
                # Write fixture data, never the real result snapshot.
                broken=copy.deepcopy(self.snapshot)
                broken['results']['green1_2과목/0']['facts']['population']+=1
                target.write_text(json.dumps(broken,ensure_ascii=False),encoding='utf-8')
                with self.assertRaisesRegex(ValueError,'modified'):
                    load_results()

    def test_failed_analysis_retains_previous_snapshot(self):
        before=RESULT_PATH.read_bytes()
        with patch('lesson_pipeline.subprocess.run',return_value=SimpleNamespace(returncode=1,stderr='test failure')):
            with self.assertRaisesRegex(RuntimeError,'analysis failed'):
                generate_results()
        self.assertEqual(before,RESULT_PATH.read_bytes())

    def test_stale_build_retains_previous_browser_files(self):
        files=[ROOT/'lesson-content.js',ROOT/'index.html']
        before=[p.read_bytes() for p in files]
        with patch('lesson_pipeline.signature',return_value={}):
            with self.assertRaisesRegex(ValueError,'Stale results'):
                runpy.run_path(str(ROOT/'build_lesson_content.py'))
        self.assertEqual(before,[p.read_bytes() for p in files])

    def test_changed_csv_propagates_to_subtitle_kpi_and_chart(self):
        before=signature()
        key='green1_2과목'
        with isolated_directory() as temporary:
            workspace=temporary/'subject'
            shutil.copytree(subject_dir(key),workspace)
            # A real CSV input mutation in an isolated copy, not a forged result.
            run_code='''
from pathlib import Path
import pandas as pd
path=next(Path.cwd().rglob('주민등록_인구현황_2025.csv'))
frame=pd.read_csv(path)
mask=frame['행정구역'].str.startswith('경기도')
assert mask.sum()==1
frame.loc[mask,'2025년_총인구수']='14,000,000'
frame.to_csv(path,index=False,encoding='utf-8-sig')
'''
            run=subprocess.run([sys.executable,'-X','utf8','-'],
                input=run_code+LESSONS[key][0]['code']+export_code(SPECS[(key,0)]),
                cwd=workspace,text=True,encoding='utf-8',capture_output=True,timeout=60)
            self.assertEqual(run.returncode,0,run.stderr)
            facts=json.loads((workspace/'학습출력'/'lesson-facts.json').read_text(encoding='utf-8'))
            changed=copy.deepcopy(self.snapshot)
            changed['results'][f'{key}/0']['facts']=facts
            lessons=resolved_lessons(changed)
            rooms,charts=build_catalog(changed,lessons)
            self.assertIn('14,000,000',lessons[key][0]['answer'])
            self.assertIn('14,000,000',rooms['green1']['kpis'][2]['val'])
            self.assertEqual(charts['green1'][0]['metrics'][1][1],14000000)
            self.assertIn('14,000,000',charts['green1'][0]['metrics'][1][2])
            self.assertIn('14,000,000',rooms['green1']['topics'][1]['tag'])
            self.assertIn('14,000,000',next(row for row in rooms['green1']['matrix'] if row['subject']=='2과목')['ans'])
        self.assertEqual(before,signature(),'Original data changed')

if __name__=='__main__':
    unittest.main(verbosity=2)
