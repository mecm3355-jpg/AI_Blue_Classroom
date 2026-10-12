# AI 챔피언 강의실

BLUE 6개·GREEN 5개 강의실을 탐색하는 3D 행성 로비와 학습 화면입니다.
질문·계산 결과·주의사항 자막, 과목별 Python 예제, 분석 결과, 검색 가능한 학습 자료를 제공합니다.

## 실행 및 화면 배포

다음 4개 파일을 같은 디렉터리에 유지합니다. 화면 실행에 Python 패키지 설치나 분석 재실행은 필요하지 않습니다.

- `index.html`: 화면, 스타일, 재생·검색·탭 동작
- `galaxy-webgl.js`: 3D 로비와 강의실 전환
- `lesson-content.js`: 미리 검산한 강의·분석 데이터
- `lesson-renderer.js`: 자막과 칠판 렌더링

로컬 HTTP 서버 예시:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

브라우저에서 `http://127.0.0.1:4173`을 엽니다. 정적 호스팅에는 위 4개 파일만 있으면 됩니다.
GitHub Pages를 사용한다면 저장소 설정에서 지정된 브랜치/폴더의 게시 여부를 별도로 확인하세요.
이 업데이트는 호스팅 설정을 새로 만들거나 변경하지 않습니다.

## 기능 범위

- 행성 선택, 강의실 입장·로비 복귀, 직접 강의실 주소와 브라우저 기록 이동
- 과목 선택, 재생·일시정지·배속, 마우스·키보드 진행바 조작
- 공통 분석 결과에 연결된 자막·칠판·요약 수치·학습 자료
- 질문의 키워드로 현재 강의실의 준비된 답변과 해설 검색
- 모바일 화면 대응, 동작 줄이기 설정, WebGL 미지원 시 대체 강의실 목록

강의는 미리 작성된 설명을 재생하는 화면입니다. 실제 동영상·음성 강의, 실시간 AI 생성,
브라우저 Python 실행, 자동 재분석·외부 배포 기능은 포함하지 않습니다.

## 분석 데이터 갱신

개발·유지보수용 파일:

- `lesson_sources.py`: 독립 실행 분석 예제
- `lesson_result_schema.py`: 계산값 추출 및 설명 문장 정의
- `lesson_pipeline.py`: 원본 복사본 분석, 결과 검증 및 저장
- `lesson-results.json`: 검산된 결과와 입력 파일·분석 환경의 지문
- `lesson_catalog.py`: 과목·요약 수치·분석 결과 구성
- `build_lesson_content.py`: 검증된 결과를 화면 데이터로 생성
- `refresh_lesson_content.py`: 재분석과 화면 데이터 갱신

원본 `연습/`, `실전/` 자료는 이 공개 저장소에 포함하지 않습니다.
재분석이나 아래 Python 테스트에는 별도로 제공받은 원본 자료를 프로젝트 루트의 동일한 폴더 구조에 배치해야 합니다.
원본 없이 화면을 사용하는 것은 가능하지만 결과를 다시 생성할 수는 없습니다.

```powershell
python -m pip install -r requirements-analysis.txt
python -X utf8 refresh_lesson_content.py
```

갱신 후 `index.html`과 생성된 `lesson-content.js`를 함께 반영하고 새로고침합니다.
원본·분석 코드·실행 환경이 바뀌면 기존 결과로 화면을 다시 빌드하지 못하도록 검사합니다.
결과 숫자를 JSON이나 JS에서 직접 수정하지 마세요.

## 검증

원본 자료가 있는 개발 환경에서:

```powershell
python -X utf8 -m unittest test_lesson_pipeline -v
python -X utf8 test_lesson_sources.py
```

브라우저 자동 검증은 로컬 서버 4173과 별도 테스트 Chrome의 DevTools 포트 9223을 준비한 뒤 실행합니다.
평소 쓰는 브라우저 프로필 대신 별도 테스트 프로필을 사용하세요.

```powershell
node audit-lesson-browser.mjs
```

검증 시점: 2026-10-12. 로컬 Chrome에서 11개 강의실·33개 과목·117개 자막 구간과 분석 결과를 검증했습니다.
배포 전 발견한 분석 카드 넘침 및 학습 자료 제목·화자 불일치를 수정했습니다.
모바일 7개 화면 크기 검사는 데스크톱 Chrome 모사이며, 실제 배포 URL·실물 기기·다른 브라우저 검증을 대신하지 않습니다.

원본 자료, 생성된 검증 캡처, 임시 파일, 되돌리기 백업은 업로드 대상에서 제외합니다.
