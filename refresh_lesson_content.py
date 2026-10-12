"""Recompute trusted examples, then rebuild static classroom content."""
from pathlib import Path
import subprocess
import sys

if __name__ == '__main__':
    root = Path(__file__).resolve().parent
    for script in ['lesson_pipeline.py','build_lesson_content.py']:
        subprocess.run([sys.executable,'-X','utf8',str(root/script)],cwd=root,check=True)
    print('강의 결과 갱신 완료. 브라우저를 새로고침하세요. (배포는 수행하지 않았습니다.)')
