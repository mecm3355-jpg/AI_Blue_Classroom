// Generated from lesson-results.json; never edit observed values here.
window.LESSON_RESULT_META = {
  "schemaVersion": 1,
  "generatedAt": "2026-10-12T06:38:25.803584+00:00",
  "resultVersion": "c7031853b1e1c31f"
};
window.MULTI_SET_DATA = {
  "set1": {
    "setName": "BLUE 1세트: 청렴윤리모니터링",
    "topics": [
      {
        "id": "1과목_보도자료_분석",
        "name": "1과목_보도자료 분석",
        "tag": "2개 부서 · 공무원행동강령과 · 최대 850자"
      },
      {
        "id": "2과목_청렴지수·부패위험_분석",
        "name": "2과목_청렴지수·부패위험 분석",
        "tag": "175행 → 141행"
      },
      {
        "id": "3과목_사건·교육_요약_자동화",
        "name": "3과목_사건·교육 요약 자동화",
        "tag": "사건 500건 · 교육 120기관 · 요약 CSV 1개"
      }
    ],
    "kpis": [
      {
        "label": "1과목 담당부서",
        "val": "2개 부서",
        "desc": "보도자료 5건의 메타 헤더",
        "resultId": "set1_1과목/0"
      },
      {
        "label": "2과목 정제",
        "val": "141행",
        "desc": "175행에서 결측 27행·IQR 7행 제외",
        "resultId": "set1_2과목/0"
      },
      {
        "label": "2과목 평균 청렴지수 1위",
        "val": "광역지자체",
        "desc": "기관유형별 평균 기준",
        "resultId": "set1_2과목/1"
      },
      {
        "label": "3과목 요약 CSV",
        "val": "1개",
        "desc": "사건 500건과 교육 120기관 집계",
        "resultId": "set1_3과목/0"
      }
    ],
    "matrix": [
      {
        "subject": "1과목",
        "q": "메타 헤더에서 부서 종류와 가장 긴 문서의 담당부서를 찾아줘",
        "ans": "2개 부서 · 공무원행동강령과 · 최대 850자",
        "detail": "메타 주석을 제외한 본문 길이를 파일별로 비교합니다. 부서별 합계와 혼동하지 않습니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "set1_1과목/0"
      },
      {
        "subject": "1과목",
        "q": "본문 금액·개수와 부서별 자료 수를 계산해 CSV로 저장해줘",
        "ans": "금액 합계 76억원 · 최대 243개 · 부서별 3건/2건 · 청렴 37회/7회",
        "detail": "실제 본문을 계산해 요구된 CSV 헤더로 저장합니다. 숫자를 상수로 대신 입력하지 않습니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 1,
        "resultId": "set1_1과목/1"
      },
      {
        "subject": "2과목",
        "q": "기관코드 결합 후 결측치와 IQR 이상치를 정제해줘",
        "ans": "175행 → 141행",
        "detail": "IQR 경계는 결측 제거 데이터에서 두 열 각각 계산한 뒤 동시에 적용합니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "set1_2과목/0"
      },
      {
        "subject": "2과목",
        "q": "기관유형별 평균 청렴지수와 라벨 1 평균을 계산해줘",
        "ans": "광역지자체 · 라벨 1 평균 7.2066 → 7 · 테스트 13행",
        "detail": "광역지자체는 기관유형입니다. 평균 청렴지수 순위는 개별 기관의 부패위험 순위가 아닙니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 1,
        "resultId": "set1_2과목/1"
      },
      {
        "subject": "3과목",
        "q": "사건·교육 원본을 읽어 요약 CSV를 생성해줘",
        "ans": "사건 500건 · 교육 120기관 · 요약 CSV 1개",
        "detail": "원본 solution.py의 과제는 여러 CSV로 분리하는 것이 아니라 두 원본을 집계하는 것입니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "set1_3과목/0"
      }
    ],
    "resultVersion": "c7031853b1e1c31f",
    "lobbyDescription": "1과목 보도자료 분석 · 2과목 청렴지수·부패위험 분석 · 3과목 사건·교육 요약 자동화"
  },
  "set2": {
    "setName": "BLUE 2세트: 자치행정협력사업",
    "topics": [
      {
        "id": "1과목_협력사업_예산_분석",
        "name": "1과목_협력사업 예산 분석",
        "tag": "L26-018 · 협력거버넌스 · 359억원 · 9곳 · 전체 예산 2,285억원"
      },
      {
        "id": "2과목_시민참여_라벨_분석",
        "name": "2과목_시민참여 라벨 분석",
        "tag": "정제 전 서울특별시 · 정제 후 전라남도 · 정제 240행"
      },
      {
        "id": "3과목_신청서_폴더_분류",
        "name": "3과목_신청서 폴더 분류",
        "tag": "신청서 10건 · 지자체 10개"
      }
    ],
    "kpis": [
      {
        "label": "1과목 예산 1위",
        "val": "L26-018",
        "desc": "359억원 · 협력지자체 9곳",
        "resultId": "set2_1과목/0"
      },
      {
        "label": "2과목 정제",
        "val": "240행",
        "desc": "시도코드 zfill(2) 후 결합·정제",
        "resultId": "set2_2과목/0"
      },
      {
        "label": "2과목 정제 전 평균 1위",
        "val": "서울특별시",
        "desc": "정제 후 1위는 전라남도",
        "resultId": "set2_2과목/0"
      },
      {
        "label": "3과목 지자체",
        "val": "10개",
        "desc": "MD 신청서 복사 분류",
        "resultId": "set2_3과목/0"
      }
    ],
    "matrix": [
      {
        "subject": "1과목",
        "q": "예산 1위 사업과 협력지자체 수를 확인해줘",
        "ans": "L26-018 · 협력거버넌스 · 359억원 · 9곳 · 전체 예산 2,285억원",
        "detail": "1위 사업의 협력지자체 수와 협력지자체 10곳 이상인 사업의 개수는 서로 다른 지표입니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "set2_1과목/0"
      },
      {
        "subject": "2과목",
        "q": "결합 직후와 정제 후의 총사업비 평균 1위를 비교해줘",
        "ans": "정제 전 서울특별시 · 정제 후 전라남도 · 정제 240행",
        "detail": "문제 문항 2는 정제 전 결과를 묻습니다. 시민참여 라벨은 사업 중단 여부가 아닙니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "set2_2과목/0"
      },
      {
        "subject": "2과목",
        "q": "시민참여 라벨을 만들고 테스트셋과 지표.csv를 산출해줘",
        "ans": "라벨 1 평균 사업비 반올림 99 · 테스트 라벨 1 24행",
        "detail": "두 값이 모두 결측인 행만 제거하고, 한쪽 결측은 평균으로 채운 뒤 200억원 초과 행을 제거합니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 1,
        "resultId": "set2_2과목/1"
      },
      {
        "subject": "3과목",
        "q": "신청서 MD를 지자체별 폴더에 복사하고 분류표를 만들어줘",
        "ans": "신청서 10건 · 지자체 10개",
        "detail": "원본 MD 파일은 이동·삭제하지 않고 복사합니다. 출력 경로는 학습출력 아래로 제한합니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "set2_3과목/0"
      }
    ],
    "resultVersion": "c7031853b1e1c31f",
    "lobbyDescription": "1과목 협력사업 예산 분석 · 2과목 시민참여 라벨 분석 · 3과목 신청서 폴더 분류"
  },
  "set3": {
    "setName": "BLUE 3세트: 가상기본법조항",
    "topics": [
      {
        "id": "1과목_외부_법령_인용_분석",
        "name": "1과목_외부 법령 인용 분석",
        "tag": "6종 · 개인정보 보호법 3회"
      },
      {
        "id": "2과목_자원봉사_청소년_분류",
        "name": "2과목_자원봉사 청소년 분류",
        "tag": "3,213행 · 청소년 1,224건 · 환경ㆍ생태계보호 · 라벨 1 등록기관 평균 486 · 테스트 245행"
      },
      {
        "id": "3과목_법_조항_검색",
        "name": "3과목_법 조항 검색",
        "tag": "전체 15개 · 과태료 검색 1개"
      }
    ],
    "kpis": [
      {
        "label": "1과목 인용 법령",
        "val": "6종",
        "desc": "개인정보 보호법 3회",
        "resultId": "set3_1과목/0"
      },
      {
        "label": "2과목 정제",
        "val": "3,213행",
        "desc": "청소년 포함 1,224건",
        "resultId": "set3_2과목/0"
      },
      {
        "label": "2과목 최고 Macro F1",
        "val": "0.7249",
        "desc": "동일 설정 재학습 · Random Forest",
        "resultId": "set3_2과목/1"
      },
      {
        "label": "3과목 조항",
        "val": "15개",
        "desc": "본칙·부칙 전체 검색",
        "resultId": "set3_3과목/0"
      }
    ],
    "matrix": [
      {
        "subject": "1과목",
        "q": "법 본문에서 외부 법령 인용 종류와 빈도를 집계해줘",
        "ans": "6종 · 개인정보 보호법 3회",
        "detail": "닫는 괄호까지 추출하면 법/법률로 끝나는 이름을 모두 보존합니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "set3_1과목/0"
      },
      {
        "subject": "2과목",
        "q": "모집분야로 결합해 청소년 포함 프로그램을 분석해줘",
        "ans": "3,213행 · 청소년 1,224건 · 환경ㆍ생태계보호 · 라벨 1 등록기관 평균 486 · 테스트 245행",
        "detail": "모집대상으로 라벨을 만들고 위도·경도 결측만 제거합니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "set3_2과목/0"
      },
      {
        "subject": "2과목",
        "q": "동일 분할로 4개 모델의 Macro F1을 비교해줘",
        "ans": "Random Forest · Macro F1 0.7249",
        "detail": "average=\"macro\"를 명시합니다. 이전 기록의 0.6479는 binary F1으로 다른 지표입니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 1,
        "resultId": "set3_2과목/1"
      },
      {
        "subject": "3과목",
        "q": "조항 JSON에서 과태료 조항을 제목·본문으로 검색해 저장해줘",
        "ans": "전체 15개 · 과태료 검색 1개",
        "detail": "JSON 키는 장이 아니라 조입니다. 본칙과 부칙을 합쳐 15개를 검색합니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "set3_3과목/0"
      }
    ],
    "resultVersion": "c7031853b1e1c31f",
    "lobbyDescription": "1과목 외부 법령 인용 분석 · 2과목 자원봉사 청소년 분류 · 3과목 법 조항 검색"
  },
  "set4": {
    "setName": "BLUE 4세트: 안내매뉴얼연락처",
    "topics": [
      {
        "id": "1과목_생활안전_사례_집계",
        "name": "1과목_생활안전 사례 집계",
        "tag": "12사례 · 선정 사례 94,300명 · 시장표창 5건 · 연간 누적 2,340,000명"
      },
      {
        "id": "2과목_공공시설_노쇼_분석",
        "name": "2과목_공공시설 노쇼 분석",
        "tag": "1,496행 · 회의실 · 노쇼 평균 18일 · 테스트 158행"
      },
      {
        "id": "3과목_안내서비스_자동분류",
        "name": "3과목_안내서비스 자동분류",
        "tag": "24건 · 카테고리 CSV 7개"
      }
    ],
    "kpis": [
      {
        "label": "1과목 우수사례",
        "val": "12개",
        "desc": "선정 사례 참여합 94,300명",
        "resultId": "set4_1과목/0"
      },
      {
        "label": "2과목 정제",
        "val": "1,496행",
        "desc": "예약대기일 결측·음수 제외",
        "resultId": "set4_2과목/0"
      },
      {
        "label": "2과목 노쇼율 1위",
        "val": "회의실",
        "desc": "결합 후 시설유형별 노쇼 비율",
        "resultId": "set4_2과목/0"
      },
      {
        "label": "3과목 분류 CSV",
        "val": "7개",
        "desc": "안내서비스 24건",
        "resultId": "set4_3과목/0"
      }
    ],
    "matrix": [
      {
        "subject": "1과목",
        "q": "선정 사례 수·참여합·최다 표창을 집계하고 요약해줘",
        "ans": "12사례 · 선정 사례 94,300명 · 시장표창 5건 · 연간 누적 2,340,000명",
        "detail": "선정 사례의 합계와 전국 연간 누적 인원을 구별합니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "set4_1과목/0"
      },
      {
        "subject": "2과목",
        "q": "시설유형 결합·정제 후 노쇼 비율과 평균 대기일을 계산해줘",
        "ans": "1,496행 · 회의실 · 노쇼 평균 18일 · 테스트 158행",
        "detail": "노쇼 라벨을 먼저 만듭니다. 노쇼 집단 평균 18일과 전체 평균 15일은 다릅니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "set4_2과목/0"
      },
      {
        "subject": "3과목",
        "q": "안내서비스를 카테고리별 CSV로 분리해줘",
        "ans": "24건 · 카테고리 CSV 7개",
        "detail": "append 대신 그룹별로 덮어써서 예제를 다시 실행해도 행이 중복되지 않습니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "set4_3과목/0"
      }
    ],
    "resultVersion": "c7031853b1e1c31f",
    "lobbyDescription": "1과목 생활안전 사례 집계 · 2과목 공공시설 노쇼 분석 · 3과목 안내서비스 자동분류"
  },
  "set5": {
    "setName": "BLUE 5세트: 안전점검보고서일관성",
    "topics": [
      {
        "id": "1과목_보고서_사실_대조",
        "name": "1과목_보고서 사실 대조",
        "tag": "시험 규칙상 5개 값 쌍 · 점검건수 차이 10건"
      },
      {
        "id": "2과목_승강기_최근_고장_분석",
        "name": "2과목_승강기 최근 고장 분석",
        "tag": "3,000행 · 세종특별자치시 · 9자 · 테스트 472행"
      },
      {
        "id": "3과목_장별_키워드_검색",
        "name": "3과목_장별 키워드 검색",
        "tag": "전체 5개 · 점검 검색 5개"
      }
    ],
    "kpis": [
      {
        "label": "1과목 값 쌍",
        "val": "5개 사실유형",
        "desc": "시험의 두 값 출현 기준 · 문맥 구분 필요",
        "resultId": "set5_1과목/0"
      },
      {
        "label": "2과목 결합",
        "val": "3,000행",
        "desc": "테스트 최근 고장 472행",
        "resultId": "set5_2과목/0"
      },
      {
        "label": "2과목 기존 F1 기록",
        "val": "재현 미확인",
        "desc": "학습 설정 근거 부족 · 현재 분석 결과와 별도 기록",
        "resultId": "set5_2과목/0"
      },
      {
        "label": "3과목 Sheets",
        "val": "외부 미검증",
        "desc": "장 데이터 5개 · 원격 연결 별도 검증 필요",
        "resultId": "set5_3과목/0"
      }
    ],
    "matrix": [
      {
        "subject": "1과목",
        "q": "보고서의 5개 사실유형별 값과 출현 횟수를 대조해줘",
        "ans": "시험 규칙상 5개 값 쌍 · 점검건수 차이 10건",
        "detail": "이 정규식은 제공된 가상 보고서 전용입니다. 두 값 출현 시 Y라는 시험 규칙과 실제 문맥상 모순 판정은 구별합니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "set5_1과목/0"
      },
      {
        "subject": "2과목",
        "q": "시도 결합 후 최근 고장 비율·건물명 길이·테스트 수를 계산해줘",
        "ans": "3,000행 · 세종특별자치시 · 9자 · 테스트 472행",
        "detail": "발생 연도와 최근_여부 열도 함께 저장합니다. 기존 F1 0.5753은 학습 설정 부족으로 재현 미확인입니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "set5_2과목/0"
      },
      {
        "subject": "3과목",
        "q": "장 데이터의 제목·본문에서 점검 키워드를 찾아줘",
        "ans": "전체 5개 · 점검 검색 5개",
        "detail": "CSV 저장과 외부 Sheets 연결은 별개의 작업입니다. Sheets 원격 로드는 미검증입니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "set5_3과목/0"
      }
    ],
    "resultVersion": "c7031853b1e1c31f",
    "lobbyDescription": "1과목 보고서 사실 대조 · 2과목 승강기 최근 고장 분석 · 3과목 장별 키워드 검색"
  },
  "set7": {
    "setName": "BLUE 7세트: 자원봉사·체육시설·모집공고",
    "topics": [
      {
        "id": "1과목_자원봉사_우수사례",
        "name": "1과목_자원봉사 우수사례",
        "tag": "1,248,000명 · 구청장표창 5건/41.67%"
      },
      {
        "id": "2과목_체육시설_폐업_분석",
        "name": "2과목_체육시설 폐업 분석",
        "tag": "1,965행 · 도봉구 91.67% · 폐업 1,279㎡/전체 1,533㎡"
      },
      {
        "id": "3과목_모집공고_자동분류",
        "name": "3과목_모집공고 자동분류",
        "tag": "40공고 · 모집인원 1,295명 · CSV 7개"
      }
    ],
    "kpis": [
      {
        "label": "1과목 누적 참여",
        "val": "1,248,000명",
        "desc": "최다 표창 구청장표창 5/12건",
        "resultId": "set7_1과목/0"
      },
      {
        "label": "2과목 정제",
        "val": "1,965행",
        "desc": "연면적 결측·0 이하 35행 제외",
        "resultId": "set7_2과목/0"
      },
      {
        "label": "2과목 폐업률 1위",
        "val": "도봉구 91.67%",
        "desc": "관측 비율 · 예측 확률 아님",
        "resultId": "set7_2과목/0"
      },
      {
        "label": "3과목 모집공고",
        "val": "40건 / 1,295명",
        "desc": "분야별 CSV 7개",
        "resultId": "set7_3과목/0"
      }
    ],
    "matrix": [
      {
        "subject": "1과목",
        "q": "사례집의 누적 참여자와 최다 표창을 추출해줘",
        "ans": "1,248,000명 · 구청장표창 5건/41.67%",
        "detail": "사례별 참여합이 아니라 본문에 명시된 연간 누적값을 읽습니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "set7_1과목/0"
      },
      {
        "subject": "1과목",
        "q": "참고 통계와 회의록에서 등록 봉사자·시상 분야·절차를 찾아줘",
        "ans": "2024년 1,486만 명 · 5개 분야 · 4단계",
        "detail": "Markdown 표에서 2024년 열을 선택하고 쉼표를 제거합니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 1,
        "resultId": "set7_1과목/1"
      },
      {
        "subject": "2과목",
        "q": "체육시설을 정제하고 폐업률·집단별 평균 연면적을 계산해줘",
        "ans": "1,965행 · 도봉구 91.67% · 폐업 1,279㎡/전체 1,533㎡",
        "detail": "반올림에는 round를 사용합니다. int는 버림이며, 전체 평균과 폐업 집단 평균도 다릅니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "set7_2과목/0"
      },
      {
        "subject": "2과목",
        "q": "층화 80:20 분할 후 RandomForest 변수 중요도를 계산해줘",
        "ans": "테스트 폐업 214행 · 연면적 37.03% · 사업체수 21.66%",
        "detail": "이 코드는 층화 홀드아웃 분할입니다. 여러 fold를 반복하는 교차검증이 아닙니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 1,
        "resultId": "set7_2과목/1"
      },
      {
        "subject": "3과목",
        "q": "모집공고를 분야별 CSV로 분리하고 모집인원을 합산해줘",
        "ans": "40공고 · 모집인원 1,295명 · CSV 7개",
        "detail": "공고 수와 모집인원 합계를 구분합니다. 외부 배포는 이 코드에서 수행하지 않습니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "set7_3과목/0"
      }
    ],
    "resultVersion": "c7031853b1e1c31f",
    "lobbyDescription": "1과목 자원봉사 우수사례 · 2과목 체육시설 폐업 분석 · 3과목 모집공고 자동분류"
  },
  "green1": {
    "setName": "GREEN 1세트: 청렴윤리모니터링",
    "topics": [
      {
        "id": "1과목_보도자료_분류",
        "name": "1과목_보도자료 분류",
        "tag": "5건 · 공무원행동강령과 3건/공직자윤리과 2건"
      },
      {
        "id": "2과목_주민등록_인구",
        "name": "2과목_주민등록 인구",
        "tag": "17개 시도 · 경기도 13,730,135명"
      },
      {
        "id": "3과목_보도자료_웹_구조",
        "name": "3과목_보도자료 웹 구조",
        "tag": "보도자료 1건 · 인사 인센티브/채용제도 개선 2개 섹션"
      }
    ],
    "kpis": [
      {
        "label": "등급",
        "val": "GREEN",
        "desc": "기초 문제 풀이"
      },
      {
        "label": "1과목 분류",
        "val": "5건 / 2개 부서",
        "desc": "공무원행동강령과 3건/공직자윤리과 2건",
        "resultId": "green1_1과목/0"
      },
      {
        "label": "2과목 최대 인구",
        "val": "경기도 13,730,135명",
        "desc": "전국 행 제외 · 17개 시도",
        "resultId": "green1_2과목/0"
      },
      {
        "label": "3과목 보도자료",
        "val": "1건 / 2개 섹션",
        "desc": "지방인사제도과 · 인사교류/채용제도",
        "resultId": "green1_3과목/0"
      }
    ],
    "matrix": [
      {
        "subject": "1과목",
        "q": "보도자료 5건의 코드·발표일·담당부서·제목을 분류해줘",
        "ans": "5건 · 공무원행동강령과 3건/공직자윤리과 2건",
        "detail": "파일별 메타 헤더를 읽고 표로 만듭니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "green1_1과목/0"
      },
      {
        "subject": "2과목",
        "q": "전국 행을 제외한 시도 인구를 정리해줘",
        "ans": "17개 시도 · 경기도 13,730,135명",
        "detail": "원본 열 이름 2025년_총인구수와 행정구역을 사용합니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "green1_2과목/0"
      },
      {
        "subject": "3과목",
        "q": "보도자료를 HTML로 만들고 제목·섹션·목록·인용구를 확인해줘",
        "ans": "보도자료 1건 · 인사 인센티브/채용제도 개선 2개 섹션",
        "detail": "제공된 보도자료 형식 전용 변환 예제입니다. 일반 Markdown 전체를 지원하는 변환기는 아닙니다. 저장 후 실제 배포·접속 확인은 별도로 해야 합니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "green1_3과목/0"
      }
    ],
    "resultVersion": "c7031853b1e1c31f",
    "lobbyDescription": "1과목 보도자료 분류 · 2과목 주민등록 인구 · 3과목 보도자료 웹 구조"
  },
  "green2": {
    "setName": "GREEN 2세트: 자치행정협력사업",
    "topics": [
      {
        "id": "1과목_협력사업_보고서",
        "name": "1과목_협력사업 보고서",
        "tag": "L26-018 · 관계기관 협의체 · 359억원"
      },
      {
        "id": "2과목_시군구_인구_집계",
        "name": "2과목_시군구 인구 집계",
        "tag": "100행 · 경기도 27개 · 서울 18개 · 인구 1위 노원구"
      },
      {
        "id": "3과목_신청_승인_판정",
        "name": "3과목_신청 승인 판정",
        "tag": "10건 · 한도 이하 승인/초과 반려"
      }
    ],
    "kpis": [
      {
        "label": "등급",
        "val": "GREEN",
        "desc": "기초 문제 풀이"
      },
      {
        "label": "1과목 예산 1위",
        "val": "L26-018 · 359억원",
        "desc": "관계기관 협의체",
        "resultId": "green2_1과목/0"
      },
      {
        "label": "2과목 시군구 최다",
        "val": "경기도 27개",
        "desc": "전체 100개 · 서울 18개",
        "resultId": "green2_2과목/0"
      },
      {
        "label": "3과목 자동 판정",
        "val": "신청 10건",
        "desc": "승인 7건 · 반려 3건",
        "resultId": "green2_3과목/0"
      }
    ],
    "matrix": [
      {
        "subject": "1과목",
        "q": "협력사업 보고서에서 예산 1위 사업을 찾아줘",
        "ans": "L26-018 · 관계기관 협의체 · 359억원",
        "detail": "보고서는 상위 5건 요약입니다. 전체 20건 집계와 요약 보고서의 범위를 구별합니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "green2_1과목/0"
      },
      {
        "subject": "2과목",
        "q": "시도별 시군구 수와 인구를 집계해줘",
        "ans": "100행 · 경기도 27개 · 서울 18개 · 인구 1위 노원구",
        "detail": "원본 열은 시도/시군구입니다. 이름이 비슷해도 다른 열 이름으로 접근할 수 없습니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "green2_2과목/0"
      },
      {
        "subject": "3과목",
        "q": "신청목록의 인구수×10 한도로 승인/반려를 판정해줘",
        "ans": "10건 · 한도 이하 승인/초과 반려",
        "detail": "한도와 같은 금액은 승인입니다. 이 예제는 판정 로직이며 웹 배포 완료를 뜻하지 않습니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "green2_3과목/0"
      }
    ],
    "resultVersion": "c7031853b1e1c31f",
    "lobbyDescription": "1과목 협력사업 보고서 · 2과목 시군구 인구 집계 · 3과목 신청 승인 판정"
  },
  "green3": {
    "setName": "GREEN 3세트: 가상기본법조항",
    "topics": [
      {
        "id": "1과목_본칙_조항_목록",
        "name": "1과목_본칙 조항 목록",
        "tag": "제1조~제14조 · 14개"
      },
      {
        "id": "2과목_자원봉사_프로그램",
        "name": "2과목_자원봉사 프로그램",
        "tag": "3,621건 · 22분야 · 3유형 · 청소년 1,435건"
      },
      {
        "id": "3과목_법_조항_검색",
        "name": "3과목_법 조항 검색",
        "tag": "전체 15개 · 개인정보 검색 3개"
      }
    ],
    "kpis": [
      {
        "label": "등급",
        "val": "GREEN",
        "desc": "기초 문제 풀이"
      },
      {
        "label": "1과목 본칙",
        "val": "14개 조항",
        "desc": "부칙 제외",
        "resultId": "green3_1과목/0"
      },
      {
        "label": "2과목 최다 분야",
        "val": "생활편의 1,245건",
        "desc": "전체 3,621건 중 34.38%",
        "resultId": "green3_2과목/0"
      },
      {
        "label": "3과목 검색 조항",
        "val": "15개",
        "desc": "제목·본문 기준",
        "resultId": "green3_3과목/0"
      }
    ],
    "matrix": [
      {
        "subject": "1과목",
        "q": "부칙을 제외한 본칙 조항을 목록으로 만들어줘",
        "ans": "제1조~제14조 · 14개",
        "detail": "제1조(목적)처럼 조 번호와 괄호 사이 공백이 없는 원문 형식에 맞춥니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "green3_1과목/0"
      },
      {
        "subject": "2과목",
        "q": "봉사분야·봉사자유형 결측 기준으로 정제하고 집계해줘",
        "ans": "3,621건 · 22분야 · 3유형 · 청소년 1,435건",
        "detail": "필수 두 열의 결측은 0건이며 위도/경도는 각각 408/408건 결측입니다. 임의 중복 제거를 추가하지 않습니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "green3_2과목/0"
      },
      {
        "subject": "3과목",
        "q": "조항에서 제목·본문 키워드를 검색해줘",
        "ans": "전체 15개 · 개인정보 검색 3개",
        "detail": "내용이라는 키는 없습니다. 원본의 제목·본문을 사용합니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "green3_3과목/0"
      }
    ],
    "resultVersion": "c7031853b1e1c31f",
    "lobbyDescription": "1과목 본칙 조항 목록 · 2과목 자원봉사 프로그램 · 3과목 법 조항 검색"
  },
  "green4": {
    "setName": "GREEN 4세트: 안내매뉴얼연락처",
    "topics": [
      {
        "id": "1과목_생활안전_캠페인",
        "name": "1과목_생활안전 캠페인",
        "tag": "12사례 · 선정 사례 94,300명 · 시장표창 5건 · 연간 누적 2,340,000명"
      },
      {
        "id": "2과목_공공시설_예약",
        "name": "2과목_공공시설 예약",
        "tag": "원본 1,500건/노쇼 790건 · 정제 1,476건/774건"
      },
      {
        "id": "3과목_안내서비스_검색",
        "name": "3과목_안내서비스 검색",
        "tag": "24개 서비스 · 안내 검색 24개"
      }
    ],
    "kpis": [
      {
        "label": "등급",
        "val": "GREEN",
        "desc": "기초 문제 풀이"
      },
      {
        "label": "1과목 캠페인",
        "val": "12건 / 연간 2,340,000명",
        "desc": "선정 사례 참여합은 94,300명",
        "resultId": "green4_1과목/0"
      },
      {
        "label": "2과목 원본 기준",
        "val": "1,500건 / 노쇼 790건",
        "desc": "문항 1·2 정답",
        "resultId": "green4_2과목/0"
      },
      {
        "label": "2과목 추가 정제",
        "val": "1,476건 / 노쇼 774건",
        "desc": "원본 정답과 별도 참고 통계",
        "resultId": "green4_2과목/0"
      }
    ],
    "matrix": [
      {
        "subject": "1과목",
        "q": "선정 사례 수·참여합·최다 표창을 집계하고 요약해줘",
        "ans": "12사례 · 선정 사례 94,300명 · 시장표창 5건 · 연간 누적 2,340,000명",
        "detail": "선정 사례의 합계와 전국 연간 누적 인원을 구별합니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "green4_1과목/0"
      },
      {
        "subject": "2과목",
        "q": "문제지 원본 기준 정답과 추가 정제 통계를 구분해줘",
        "ans": "원본 1,500건/노쇼 790건 · 정제 1,476건/774건",
        "detail": "문항 1·2는 원본 기준입니다. 노쇼 문자열을 sum하지 않고 eq(\"노쇼\")의 참 개수를 셉니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "green4_2과목/0"
      },
      {
        "subject": "3과목",
        "q": "안내서비스 목록을 서비스명·안내분야로 검색해줘",
        "ans": "24개 서비스 · 안내 검색 24개",
        "detail": "웹 UI의 필터와 같은 필드로 검색합니다. 검색과 분야 선택을 함께 쓰면 조건을 모두 만족해야 합니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "green4_3과목/0"
      }
    ],
    "resultVersion": "c7031853b1e1c31f",
    "lobbyDescription": "1과목 생활안전 캠페인 · 2과목 공공시설 예약 · 3과목 안내서비스 검색"
  },
  "green5": {
    "setName": "GREEN 5세트: 안전점검보고서일관성",
    "topics": [
      {
        "id": "1과목_보고서_사실유형_대조",
        "name": "1과목_보고서 사실유형 대조",
        "tag": "시험 규칙상 5개 값 쌍 · 점검건수 차이 10건"
      },
      {
        "id": "2과목_승강기_고장_집계",
        "name": "2과목_승강기 고장 집계",
        "tag": "3,000행 · 경기도 652건 · 2020년 이상 2,358건"
      },
      {
        "id": "3과목_장별_검색_뷰어",
        "name": "3과목_장별 검색 뷰어",
        "tag": "전체 5개 · 점검 검색 5개"
      }
    ],
    "kpis": [
      {
        "label": "등급",
        "val": "GREEN",
        "desc": "기초 문제 풀이"
      },
      {
        "label": "1과목 값 쌍",
        "val": "5개 사실유형",
        "desc": "시험상 값 대조와 문맥 판단 구분",
        "resultId": "green5_1과목/0"
      },
      {
        "label": "2과목 고장 데이터",
        "val": "3,000행",
        "desc": "2008~2025년",
        "resultId": "green5_2과목/0"
      },
      {
        "label": "2과목 고장 최다",
        "val": "경기도 652건",
        "desc": "2020년 이상 2,358건",
        "resultId": "green5_2과목/0"
      }
    ],
    "matrix": [
      {
        "subject": "1과목",
        "q": "보고서의 5개 사실유형별 값과 출현 횟수를 대조해줘",
        "ans": "시험 규칙상 5개 값 쌍 · 점검건수 차이 10건",
        "detail": "이 정규식은 제공된 가상 보고서 전용입니다. 두 값 출현 시 Y라는 시험 규칙과 실제 문맥상 모순 판정은 구별합니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "green5_1과목/0"
      },
      {
        "subject": "2과목",
        "q": "고장일·주소에서 시도와 연도를 추출해줘",
        "ans": "3,000행 · 경기도 652건 · 2020년 이상 2,358건",
        "detail": "약식/정식 주소를 임의 통합하지 않습니다. 첫 단어 기준 시도명은 31종입니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "green5_2과목/0"
      },
      {
        "subject": "3과목",
        "q": "장 데이터의 제목·본문에서 점검 키워드를 찾아줘",
        "ans": "전체 5개 · 점검 검색 5개",
        "detail": "CSV 저장과 외부 Sheets 연결은 별개의 작업입니다. Sheets 원격 로드는 미검증입니다.",
        "time": "로컬 실행",
        "status": "결과 연동",
        "unit": 0,
        "resultId": "green5_3과목/0"
      }
    ],
    "resultVersion": "c7031853b1e1c31f",
    "lobbyDescription": "1과목 보고서 사실유형 대조 · 2과목 승강기 고장 집계 · 3과목 장별 검색 뷰어"
  }
};
window.ANALYTICS_CHARTS = {
  "set1": [
    {
      "title": "📊 2과목 청렴지수 정제 결과",
      "color": "#38BDF8",
      "metrics": [
        [
          "결합 데이터",
          175,
          "175행"
        ],
        [
          "정제 데이터",
          141,
          "141행"
        ],
        [
          "라벨 1 평균 청렴지수",
          7.206612903225807,
          "7.2066"
        ]
      ],
      "resultIds": [
        "set1_2과목/0",
        "set1_2과목/1"
      ],
      "resultVersion": "c7031853b1e1c31f"
    },
    {
      "title": "🔎 3과목 사건·교육 요약 산출물",
      "color": "#A78BFA",
      "metrics": [
        [
          "사건 원본",
          500,
          "500건"
        ],
        [
          "교육 기관",
          120,
          "120개"
        ],
        [
          "요약 CSV",
          1,
          "1개"
        ]
      ],
      "resultIds": [
        "set1_3과목/0"
      ],
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set2": [
    {
      "title": "📊 2과목 시민참여 데이터 처리 결과",
      "color": "#38BDF8",
      "metrics": [
        [
          "유효 데이터",
          240,
          "240행"
        ],
        [
          "정제 전 평균 1위",
          166.8,
          "서울특별시 166.8000억원"
        ],
        [
          "정제 후 평균 1위",
          122.1735655737705,
          "전라남도 122.1736억원"
        ]
      ],
      "resultIds": [
        "set2_2과목/0"
      ],
      "resultVersion": "c7031853b1e1c31f"
    },
    {
      "title": "🔎 3과목 신청서 자동분류",
      "color": "#A78BFA",
      "metrics": [
        [
          "신청서",
          10,
          "10건"
        ],
        [
          "지자체 폴더",
          10,
          "10개"
        ],
        [
          "분류 현황 CSV",
          1,
          "1개"
        ]
      ],
      "resultIds": [
        "set2_3과목/0"
      ],
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set3": [
    {
      "title": "📊 2과목 자원봉사 분류 모델 Macro F1",
      "color": "#38BDF8",
      "metrics": [
        [
          "Logistic Regression",
          0.5469,
          "0.5469"
        ],
        [
          "Decision Tree",
          0.5614,
          "0.5614"
        ],
        [
          "Random Forest",
          0.7249,
          "0.7249"
        ],
        [
          "Gradient Boosting",
          0.6322,
          "0.6322"
        ]
      ],
      "resultIds": [
        "set3_2과목/1"
      ],
      "resultVersion": "c7031853b1e1c31f"
    },
    {
      "title": "🔎 3과목 법 조항 검색 산출물",
      "color": "#A78BFA",
      "metrics": [
        [
          "조항 데이터",
          15,
          "15개"
        ],
        [
          "과태료 검색 결과",
          1,
          "1개"
        ]
      ],
      "resultIds": [
        "set3_3과목/0"
      ],
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set4": [
    {
      "title": "📊 2과목 공공시설 노쇼 분석",
      "color": "#38BDF8",
      "metrics": [
        [
          "정제 데이터",
          1496,
          "1,496행"
        ],
        [
          "테스트 노쇼",
          158,
          "158행"
        ],
        [
          "노쇼 집단 평균 대기일",
          18,
          "18일"
        ]
      ],
      "resultIds": [
        "set4_2과목/0"
      ],
      "resultVersion": "c7031853b1e1c31f"
    },
    {
      "title": "🔎 3과목 안내서비스 자동분류",
      "color": "#A78BFA",
      "metrics": [
        [
          "원본 서비스",
          24,
          "24건"
        ],
        [
          "분류 CSV",
          7,
          "7개"
        ]
      ],
      "resultIds": [
        "set4_3과목/0"
      ],
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set5": [
    {
      "title": "📊 2과목 승강기 최근 고장 분석",
      "color": "#38BDF8",
      "metrics": [
        [
          "결합 데이터",
          3000,
          "3,000행"
        ],
        [
          "테스트 최근 고장",
          472,
          "472행"
        ],
        [
          "최근 건물명 평균 길이",
          9,
          "9자"
        ]
      ],
      "resultIds": [
        "set5_2과목/0"
      ],
      "resultVersion": "c7031853b1e1c31f"
    },
    {
      "title": "🔎 3과목 안전보고서 검색",
      "color": "#A78BFA",
      "metrics": [
        [
          "장 데이터",
          5,
          "5개"
        ],
        [
          "점검 검색 결과",
          5,
          "5개"
        ],
        [
          "권혁수 검색 결과",
          2,
          "2개"
        ]
      ],
      "resultIds": [
        "set5_3과목/0"
      ],
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set7": [
    {
      "title": "📊 2과목 체육시설 폐업 분석",
      "color": "#38BDF8",
      "metrics": [
        [
          "정제 데이터",
          1965,
          "1,965행"
        ],
        [
          "폐업 집단 평균 연면적",
          1279,
          "1,279㎡"
        ],
        [
          "전체 평균 연면적",
          1533,
          "1,533㎡"
        ],
        [
          "테스트 폐업",
          214,
          "214행"
        ]
      ],
      "resultIds": [
        "set7_2과목/0",
        "set7_2과목/1"
      ],
      "resultVersion": "c7031853b1e1c31f"
    },
    {
      "title": "🔎 3과목 모집공고 자동분류",
      "color": "#A78BFA",
      "metrics": [
        [
          "모집 인원",
          1295,
          "1,295명"
        ],
        [
          "모집공고",
          40,
          "40건"
        ],
        [
          "분야별 CSV",
          7,
          "7개"
        ]
      ],
      "resultIds": [
        "set7_3과목/0"
      ],
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "green1": [
    {
      "title": "📊 2과목 주민등록 인구 집계",
      "color": "#38BDF8",
      "metrics": [
        [
          "분석 시도",
          17,
          "17개"
        ],
        [
          "최대 인구",
          13730135,
          "경기도 13,730,135명"
        ]
      ],
      "resultIds": [
        "green1_2과목/0"
      ],
      "resultVersion": "c7031853b1e1c31f"
    },
    {
      "title": "🔎 3과목 인사교류 보도자료 웹 구조",
      "color": "#A78BFA",
      "metrics": [
        [
          "보도자료",
          1,
          "1건"
        ],
        [
          "내용 섹션",
          2,
          "2개"
        ],
        [
          "담당부서",
          "지방인사제도과",
          "지방인사제도과"
        ]
      ],
      "resultIds": [
        "green1_3과목/0"
      ],
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "green2": [
    {
      "title": "📊 2과목 시군구 인구 집계",
      "color": "#38BDF8",
      "metrics": [
        [
          "전체 시군구",
          100,
          "100개"
        ],
        [
          "경기도",
          27,
          "27개"
        ],
        [
          "서울특별시",
          18,
          "18개"
        ]
      ],
      "resultIds": [
        "green2_2과목/0"
      ],
      "resultVersion": "c7031853b1e1c31f"
    },
    {
      "title": "🔎 3과목 신청 승인 판정",
      "color": "#A78BFA",
      "metrics": [
        [
          "신청 목록",
          10,
          "10건"
        ],
        [
          "승인",
          7,
          "7건"
        ],
        [
          "반려",
          3,
          "3건"
        ]
      ],
      "resultIds": [
        "green2_3과목/0"
      ],
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "green3": [
    {
      "title": "📊 2과목 자원봉사 프로그램 집계",
      "color": "#38BDF8",
      "metrics": [
        [
          "전체 프로그램",
          3621,
          "3,621건"
        ],
        [
          "청소년 포함",
          1435,
          "1,435건"
        ],
        [
          "생활편의",
          1245,
          "1,245건"
        ]
      ],
      "resultIds": [
        "green3_2과목/0"
      ],
      "resultVersion": "c7031853b1e1c31f"
    },
    {
      "title": "🔎 3과목 법 조항 검색",
      "color": "#A78BFA",
      "metrics": [
        [
          "검색 조항",
          15,
          "15개"
        ],
        [
          "개인정보 검색 결과",
          3,
          "3개"
        ]
      ],
      "resultIds": [
        "green3_3과목/0"
      ],
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "green4": [
    {
      "title": "📊 2과목 원본 정답과 추가 정제 비교",
      "color": "#38BDF8",
      "metrics": [
        [
          "원본 예약",
          1500,
          "1,500건"
        ],
        [
          "원본 노쇼",
          790,
          "790건"
        ],
        [
          "추가 정제 예약",
          1476,
          "1,476건"
        ],
        [
          "추가 정제 노쇼",
          774,
          "774건"
        ]
      ],
      "resultIds": [
        "green4_2과목/0"
      ],
      "resultVersion": "c7031853b1e1c31f"
    },
    {
      "title": "🔎 3과목 안내서비스 검색",
      "color": "#A78BFA",
      "metrics": [
        [
          "원본 서비스",
          24,
          "24건"
        ],
        [
          "안내 검색 결과",
          24,
          "24건"
        ]
      ],
      "resultIds": [
        "green4_3과목/0"
      ],
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "green5": [
    {
      "title": "📊 2과목 승강기 고장 집계",
      "color": "#38BDF8",
      "metrics": [
        [
          "전체 데이터",
          3000,
          "3,000행"
        ],
        [
          "2020년 이상",
          2358,
          "2,358건"
        ],
        [
          "경기도",
          652,
          "652건"
        ]
      ],
      "resultIds": [
        "green5_2과목/0"
      ],
      "resultVersion": "c7031853b1e1c31f"
    },
    {
      "title": "🔎 3과목 장별 검색",
      "color": "#A78BFA",
      "metrics": [
        [
          "장 데이터",
          5,
          "5개"
        ],
        [
          "점검 검색 결과",
          5,
          "5개"
        ]
      ],
      "resultIds": [
        "green5_3과목/0"
      ],
      "resultVersion": "c7031853b1e1c31f"
    }
  ]
};
window.LESSON_EXAMPLES = {
  "set1_1과목": [
    {
      "question": "메타 헤더에서 부서 종류와 가장 긴 문서의 담당부서를 찾아줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nrows = []\nfor path in sorted(BASE.rglob('*.md')):\n    if '학습출력' in path.parts or '보도자료' not in path.parts:\n        continue\n    text = path.read_text(encoding='utf-8-sig')\n    meta = re.search(r'<!--.*?-->', text, flags=re.S)\n    if not meta:\n        continue\n    department = re.search(r'부서:\\s*([^|]+)', meta[0])[1].strip()\n    date = re.search(r'발표일:\\s*(\\d{4}-\\d{2}-\\d{2})', meta[0])[1]\n    code = re.search(r'코드:\\s*([^|]+)', meta[0])[1].strip()\n    body = text.replace(meta[0], '').strip()\n    title = re.search(r'^#\\s+(.+)$', body, flags=re.M)[1]\n    rows.append(dict(담당부서=department, 발표일=date, 코드=code,\n                     제목=title, 본문=body, 본문길이=len(body), 청렴횟수=body.count('청렴')))\ndf = pd.DataFrame(rows)\nassert len(df) == 5\n\nprint('부서 종류:', df['담당부서'].nunique())\nlongest = df.loc[df['본문길이'].idxmax()]\nprint('최대 문서:', longest['담당부서'], longest['본문길이'])\nprint('가장 빠른 발표:', df.sort_values('발표일').iloc[0]['담당부서'])\n",
      "tip": "메타 주석을 제외한 본문 길이를 파일별로 비교합니다. 부서별 합계와 혼동하지 않습니다.",
      "status": "로컬 실행 결과",
      "answer": "2개 부서 · 공무원행동강령과 · 최대 850자",
      "resultId": "set1_1과목/0",
      "resultVersion": "c7031853b1e1c31f"
    },
    {
      "question": "본문 금액·개수와 부서별 자료 수를 계산해 CSV로 저장해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nrows = []\nfor path in sorted(BASE.rglob('*.md')):\n    if '학습출력' in path.parts or '보도자료' not in path.parts:\n        continue\n    text = path.read_text(encoding='utf-8-sig')\n    meta = re.search(r'<!--.*?-->', text, flags=re.S)\n    if not meta:\n        continue\n    department = re.search(r'부서:\\s*([^|]+)', meta[0])[1].strip()\n    date = re.search(r'발표일:\\s*(\\d{4}-\\d{2}-\\d{2})', meta[0])[1]\n    code = re.search(r'코드:\\s*([^|]+)', meta[0])[1].strip()\n    body = text.replace(meta[0], '').strip()\n    title = re.search(r'^#\\s+(.+)$', body, flags=re.M)[1]\n    rows.append(dict(담당부서=department, 발표일=date, 코드=code,\n                     제목=title, 본문=body, 본문길이=len(body), 청렴횟수=body.count('청렴')))\ndf = pd.DataFrame(rows)\nassert len(df) == 5\n\ntext = '\\n'.join(df['본문'])\namounts = [float(v.replace(',', '')) for v in re.findall(r'([\\d,]+(?:\\.\\d+)?)\\s*억\\s*원', text)]\ncounts = [int(v.replace(',', '')) for v in re.findall(r'(\\d[\\d,]*)\\s*개', text)]\nprint('금액 합계(억원):', round(sum(amounts)))\nprint('개수 최댓값:', max(counts))\nsummary = df.groupby('담당부서').agg(자료수=('본문','size'), 청렴횟수합=('청렴횟수','sum'), 평균본문길이=('본문길이','mean'))\nsummary['평균본문길이'] = summary['평균본문길이'].round().astype(int)\nsummary.sort_values('자료수',ascending=False).reset_index().to_csv(OUT/'부서별_자료수.csv',index=False,encoding='utf-8-sig')\nprint(summary.to_string())\n",
      "tip": "실제 본문을 계산해 요구된 CSV 헤더로 저장합니다. 숫자를 상수로 대신 입력하지 않습니다.",
      "status": "로컬 실행 결과",
      "answer": "금액 합계 76억원 · 최대 243개 · 부서별 3건/2건 · 청렴 37회/7회",
      "resultId": "set1_1과목/1",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "green1_1과목": [
    {
      "question": "보도자료 5건의 코드·발표일·담당부서·제목을 분류해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nrows = []\nfor path in sorted(BASE.rglob('*.md')):\n    if '학습출력' in path.parts or '보도자료' not in path.parts:\n        continue\n    text = path.read_text(encoding='utf-8-sig')\n    meta = re.search(r'<!--.*?-->', text, flags=re.S)\n    if not meta:\n        continue\n    department = re.search(r'부서:\\s*([^|]+)', meta[0])[1].strip()\n    date = re.search(r'발표일:\\s*(\\d{4}-\\d{2}-\\d{2})', meta[0])[1]\n    code = re.search(r'코드:\\s*([^|]+)', meta[0])[1].strip()\n    body = text.replace(meta[0], '').strip()\n    title = re.search(r'^#\\s+(.+)$', body, flags=re.M)[1]\n    rows.append(dict(담당부서=department, 발표일=date, 코드=code,\n                     제목=title, 본문=body, 본문길이=len(body), 청렴횟수=body.count('청렴')))\ndf = pd.DataFrame(rows)\nassert len(df) == 5\n\ndf[['코드','발표일','담당부서','제목']].to_csv(OUT/'보도자료 분류표.csv',index=False,encoding='utf-8-sig')\nprint(df['담당부서'].value_counts().to_string())\n",
      "tip": "파일별 메타 헤더를 읽고 표로 만듭니다.",
      "status": "로컬 실행 결과",
      "answer": "5건 · 공무원행동강령과 3건/공직자윤리과 2건",
      "resultId": "green1_1과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set1_2과목": [
    {
      "question": "기관코드 결합 후 결측치와 IQR 이상치를 정제해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\na = pd.read_csv(source('부패신고_현황.csv'))\nb = pd.read_csv(source('청렴지수_현황.csv'))\nmerged = a.merge(b,on='기관코드',how='inner')\nclean = merged.dropna().copy()\nmask = pd.Series(True,index=clean.index)\nfor col in ['설문인원','평균처리일수']:\n    q1,q3 = clean[col].quantile([.25,.75])\n    mask &= clean[col].between(q1-1.5*(q3-q1),q3+1.5*(q3-q1))\nclean = clean.loc[mask].copy()\nrisk = -.45*clean['청렴지수']+.08*clean['신고건수']-.012*clean['처리율']+.04*clean['평균처리일수']\nnoise = np.random.default_rng(251).normal(0,.5,len(clean))\nclean['label'] = (((risk-risk.mean())/risk.std()+noise)>.1).astype(int)\n\nprint('결합:',len(merged),'정제:',len(clean))\nclean.to_csv(OUT/'정제데이터_부패위험.csv',index=False,encoding='utf-8-sig')\n",
      "tip": "IQR 경계는 결측 제거 데이터에서 두 열 각각 계산한 뒤 동시에 적용합니다.",
      "status": "로컬 실행 결과",
      "answer": "175행 → 141행",
      "resultId": "set1_2과목/0",
      "resultVersion": "c7031853b1e1c31f"
    },
    {
      "question": "기관유형별 평균 청렴지수와 라벨 1 평균을 계산해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nimport numpy as np\nfrom sklearn.model_selection import train_test_split\na = pd.read_csv(source('부패신고_현황.csv'))\nb = pd.read_csv(source('청렴지수_현황.csv'))\nmerged = a.merge(b,on='기관코드',how='inner')\nclean = merged.dropna().copy()\nmask = pd.Series(True,index=clean.index)\nfor col in ['설문인원','평균처리일수']:\n    q1,q3 = clean[col].quantile([.25,.75])\n    mask &= clean[col].between(q1-1.5*(q3-q1),q3+1.5*(q3-q1))\nclean = clean.loc[mask].copy()\nrisk = -.45*clean['청렴지수']+.08*clean['신고건수']-.012*clean['처리율']+.04*clean['평균처리일수']\nnoise = np.random.default_rng(251).normal(0,.5,len(clean))\nclean['label'] = (((risk-risk.mean())/risk.std()+noise)>.1).astype(int)\n\nprint('평균 청렴지수 1위 유형:',clean.groupby('기관유형')['청렴지수'].mean().idxmax())\navg = clean.loc[clean.label==1,'청렴지수'].mean()\nprint(f'라벨 1 평균: {avg:.4f} / 반올림: {round(avg)}')\n_,test = train_test_split(clean,test_size=.2,random_state=42,stratify=clean.label)\nprint('테스트 라벨 1:',int(test.label.sum()))\n",
      "tip": "광역지자체는 기관유형입니다. 평균 청렴지수 순위는 개별 기관의 부패위험 순위가 아닙니다.",
      "status": "로컬 실행 결과",
      "answer": "광역지자체 · 라벨 1 평균 7.2066 → 7 · 테스트 13행",
      "resultId": "set1_2과목/1",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set2_1과목": [
    {
      "question": "예산 1위 사업과 협력지자체 수를 확인해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\ndf = pd.read_csv(source('2026_자치행정사업.csv'))\ntop = df.loc[df['예산_억원'].idxmax()]\n\nprint(top[['사업번호','분야','예산_억원','협력지자체수']].to_string())\nprint('협력지자체 10곳 이상인 사업:',int((df['협력지자체수']>=10).sum()))\nprint('담당부서 종류:',df['담당부서'].nunique())\nprint('전체 예산:',int(df['예산_억원'].sum()))\nsummary = df.groupby('분야').agg(사업수=('사업번호','size'),예산합계_억원=('예산_억원','sum'))\nsummary.sort_values('예산합계_억원',ascending=False).reset_index().to_csv(OUT/'분야별집계.csv',index=False,encoding='utf-8-sig')\n",
      "tip": "1위 사업의 협력지자체 수와 협력지자체 10곳 이상인 사업의 개수는 서로 다른 지표입니다.",
      "status": "로컬 실행 결과",
      "answer": "L26-018 · 협력거버넌스 · 359억원 · 9곳 · 전체 예산 2,285억원",
      "resultId": "set2_1과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "green2_1과목": [
    {
      "question": "협력사업 보고서에서 예산 1위 사업을 찾아줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\ntext = source('2026_자치행정사업_보고서.md').read_text(encoding='utf-8-sig')\nprojects = []\nfor block in re.split(r'(?m)^### ',text)[1:]:\n    heading = re.match(r'(L26-\\d+)\\s*—\\s*(.+)',block)\n    budget = re.search(r'예산:\\s*(?:\\*\\*)?(\\d[\\d,]*)억원',block)\n    if heading and budget:\n        projects.append((heading[1],heading[2],int(budget[1].replace(',',''))))\ntop = max(projects,key=lambda row:row[2])\nprint('예산 1위:',*top)\n(OUT/'카드뉴스_문안.md').write_text(f'# 예산 1위 사업\\n{top[0]} {top[1]}: {top[2]}억원\\n',encoding='utf-8')\n",
      "tip": "보고서는 상위 5건 요약입니다. 전체 20건 집계와 요약 보고서의 범위를 구별합니다.",
      "status": "로컬 실행 결과",
      "answer": "L26-018 · 관계기관 협의체 · 359억원",
      "resultId": "green2_1과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set2_2과목": [
    {
      "question": "결합 직후와 정제 후의 총사업비 평균 1위를 비교해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nfrom sklearn.model_selection import train_test_split\na = pd.read_csv(source('자치행정사업.csv'),dtype={'시도코드':str})\nb = pd.read_csv(source('자치단체_마스터.csv'),dtype={'시도코드':str})\nfor frame in [a,b]:\n    frame['시도코드'] = frame['시도코드'].str.zfill(2)\nmerged = a.merge(b,on='시도코드',how='inner')\nbefore = merged.groupby('시도명')['총사업비_억원'].mean()\nclean = merged.dropna(subset=['총사업비_억원','시민참여수'],how='all').copy()\nfor col in ['총사업비_억원','시민참여수']:\n    clean[col] = clean[col].fillna(clean[col].mean())\nclean = clean[clean['총사업비_억원']<=200].copy()\nclean['label'] = (clean['시민참여수']>=clean['시민참여수'].median()).astype(int)\n\nafter = clean.groupby('시도명')['총사업비_억원'].mean()\nprint('정제 전:',before.idxmax(),round(before.max(),4))\nprint('정제 후:',after.idxmax(),round(after.max(),4))\nprint('정제 행 수:',len(clean))\n",
      "tip": "문제 문항 2는 정제 전 결과를 묻습니다. 시민참여 라벨은 사업 중단 여부가 아닙니다.",
      "status": "로컬 실행 결과",
      "answer": "정제 전 서울특별시 · 정제 후 전라남도 · 정제 240행",
      "resultId": "set2_2과목/0",
      "resultVersion": "c7031853b1e1c31f"
    },
    {
      "question": "시민참여 라벨을 만들고 테스트셋과 지표.csv를 산출해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nfrom sklearn.model_selection import train_test_split\na = pd.read_csv(source('자치행정사업.csv'),dtype={'시도코드':str})\nb = pd.read_csv(source('자치단체_마스터.csv'),dtype={'시도코드':str})\nfor frame in [a,b]:\n    frame['시도코드'] = frame['시도코드'].str.zfill(2)\nmerged = a.merge(b,on='시도코드',how='inner')\nbefore = merged.groupby('시도명')['총사업비_억원'].mean()\nclean = merged.dropna(subset=['총사업비_억원','시민참여수'],how='all').copy()\nfor col in ['총사업비_억원','시민참여수']:\n    clean[col] = clean[col].fillna(clean[col].mean())\nclean = clean[clean['총사업비_억원']<=200].copy()\nclean['label'] = (clean['시민참여수']>=clean['시민참여수'].median()).astype(int)\n\nprint('라벨 1 평균 사업비:',round(clean.loc[clean.label==1,'총사업비_억원'].mean()))\n_,test = train_test_split(clean,test_size=.2,random_state=42,stratify=clean.label)\nprint('테스트 라벨 1:',int(test.label.sum()))\nsummary = clean.groupby('시도명').label.agg(사업수='size',라벨1수='sum',라벨1비율='mean')\nsummary = summary.reindex(b['시도명'].drop_duplicates(),fill_value=0)\nsummary.sort_values('라벨1비율',ascending=False).reset_index().to_csv(OUT/'지표.csv',index=False,encoding='utf-8-sig')\n",
      "tip": "두 값이 모두 결측인 행만 제거하고, 한쪽 결측은 평균으로 채운 뒤 200억원 초과 행을 제거합니다.",
      "status": "로컬 실행 결과",
      "answer": "라벨 1 평균 사업비 반올림 99 · 테스트 라벨 1 24행",
      "resultId": "set2_2과목/1",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set3_1과목": [
    {
      "question": "법 본문에서 외부 법령 인용 종류와 빈도를 집계해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\ntext = source('가상_행정정보통합관리법.md').read_text(encoding='utf-8-sig')\n\ncounts = Counter(re.findall(r'「([^」]+)」',text))\nprint('인용 법령 종류:',len(counts))\nprint('최다 인용:',*counts.most_common(1)[0])\npd.DataFrame(counts.most_common(),columns=['법령명','등장횟수']).to_csv(OUT/'외부법령_빈도.csv',index=False,encoding='utf-8-sig')\n",
      "tip": "닫는 괄호까지 추출하면 법/법률로 끝나는 이름을 모두 보존합니다.",
      "status": "로컬 실행 결과",
      "answer": "6종 · 개인정보 보호법 3회",
      "resultId": "set3_1과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "green3_1과목": [
    {
      "question": "부칙을 제외한 본칙 조항을 목록으로 만들어줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\ntext = source('가상_행정정보통합관리법.md').read_text(encoding='utf-8-sig')\n\nmain = re.split(r'부\\s*칙',text,maxsplit=1)[0]\narticles = re.findall(r'(?ms)^(제\\d+조)(\\(.*?)(?=^제\\d+조|^\\s*제\\d+장|\\Z)',main)\ntable = pd.DataFrame([(i+1,n,body.strip()) for i,(n,body) in enumerate(articles)],columns=['순번','조항번호','조항내용'])\ntable.to_csv(OUT/'본칙조항목록.csv',index=False,encoding='utf-8-sig')\nprint('본칙 조항:',len(table))\n",
      "tip": "제1조(목적)처럼 조 번호와 괄호 사이 공백이 없는 원문 형식에 맞춥니다.",
      "status": "로컬 실행 결과",
      "answer": "제1조~제14조 · 14개",
      "resultId": "green3_1과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set3_2과목": [
    {
      "question": "모집분야로 결합해 청소년 포함 프로그램을 분석해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nfrom sklearn.model_selection import train_test_split\na = pd.read_csv(source('자원봉사프로그램.csv'))\nb = pd.read_csv(source('모집분야_지표.csv'))\nclean = a.merge(b,on='모집분야',how='inner').dropna(subset=['위도','경도']).copy()\nclean['label'] = clean['모집대상'].str.contains('청소년',na=False).astype(int)\n\nprint('정제:',len(clean),'청소년:',int(clean.label.sum()))\ngroups = clean.groupby('모집분야').label.agg(['size','mean'])\nprint('30건 이상 중 최고:',groups.loc[groups['size']>=30,'mean'].idxmax())\nprint('라벨 1 등록기관수 평균 반올림:',round(clean.loc[clean.label==1,'등록기관수'].mean()))\n_,test = train_test_split(clean,test_size=.2,random_state=42,stratify=clean.label)\nprint('테스트 라벨 1:',int(test.label.sum()))\nclean.to_csv(OUT/'처리완료_데이터.csv',index=False,encoding='utf-8-sig')\n",
      "tip": "모집대상으로 라벨을 만들고 위도·경도 결측만 제거합니다.",
      "status": "로컬 실행 결과",
      "answer": "3,213행 · 청소년 1,224건 · 환경ㆍ생태계보호 · 라벨 1 등록기관 평균 486 · 테스트 245행",
      "resultId": "set3_2과목/0",
      "resultVersion": "c7031853b1e1c31f"
    },
    {
      "question": "동일 분할로 4개 모델의 Macro F1을 비교해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nfrom sklearn.model_selection import train_test_split\na = pd.read_csv(source('자원봉사프로그램.csv'))\nb = pd.read_csv(source('모집분야_지표.csv'))\nclean = a.merge(b,on='모집분야',how='inner').dropna(subset=['위도','경도']).copy()\nclean['label'] = clean['모집대상'].str.contains('청소년',na=False).astype(int)\n\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.metrics import f1_score\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier\nnum = ['위도','경도','등록기관수','프로그램수','청소년포함비율','비대면비율']\ncat = ['모집분야','활동유형']\nxt,xv,yt,yv = train_test_split(clean[num+cat],clean.label,test_size=.2,random_state=42,stratify=clean.label)\nmodels = {\n    'Logistic Regression':LogisticRegression(random_state=42,max_iter=1000),\n    'Decision Tree':DecisionTreeClassifier(random_state=42,max_depth=5),\n    'Random Forest':RandomForestClassifier(random_state=42,n_estimators=100),\n    'Gradient Boosting':GradientBoostingClassifier(random_state=42,n_estimators=100)\n}\nresults = []\nfor name,model in models.items():\n    prep = ColumnTransformer([('num',StandardScaler(),num),('cat',OneHotEncoder(handle_unknown='ignore'),cat)])\n    pipe = Pipeline([('preprocess',prep),('model',model)]).fit(xt,yt)\n    score = f1_score(yv,pipe.predict(xv),average='macro')\n    results.append({'Model':name,'Macro_F1':round(score,4)})\ntable = pd.DataFrame(results)\ntable.to_csv(OUT/'f1_macro_comparison.csv',index=False,encoding='utf-8-sig')\nprint(table.to_string(index=False))\nimport matplotlib\nmatplotlib.use('Agg')\nimport matplotlib.pyplot as plt\ntable.plot.bar(x='Model',y='Macro_F1',legend=False,ylim=(0,1))\nplt.tight_layout()\nplt.savefig(OUT/'f1_macro_comparison.png')\nplt.close()\n",
      "tip": "average=\"macro\"를 명시합니다. 이전 기록의 0.6479는 binary F1으로 다른 지표입니다.",
      "status": "로컬 실행 결과",
      "answer": "Random Forest · Macro F1 0.7249",
      "resultId": "set3_2과목/1",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set4_1과목": [
    {
      "question": "선정 사례 수·참여합·최다 표창을 집계하고 요약해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\ntext = source('생활안전_캠페인_사례집.md').read_text(encoding='utf-8-sig')\ncases = re.findall(r'^### 사례 \\d+\\.',text,flags=re.M)\ntotal = sum(int(v.replace(',','')) for v in re.findall(r'참여인원:\\s*([\\d,]+)',text))\nawards = Counter(re.findall(r'표창등급:\\s*(\\S+)',text))\nprint('우수사례:',len(cases),'선정 사례 참여합:',total)\nprint('최다 표창:',*awards.most_common(1)[0])\nannual = int(re.search(r'누적 참여 인원은\\s*(?:\\*\\*)?(\\d[\\d,]*)명',text)[1].replace(',',''))\nprint('연간 누적 참여:',annual)\n\nsummary = f'# 생활안전 캠페인\\n선정 {len(cases)}사례 참여합 {total:,}명\\n최다 표창: {awards.most_common(1)[0][0]}\\n연간 누적 참여: {annual:,}명\\n'\n(OUT/'정책브리핑.md').write_text(summary,encoding='utf-8')\n",
      "tip": "선정 사례의 합계와 전국 연간 누적 인원을 구별합니다.",
      "status": "로컬 실행 결과",
      "answer": "12사례 · 선정 사례 94,300명 · 시장표창 5건 · 연간 누적 2,340,000명",
      "resultId": "set4_1과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "green4_1과목": [
    {
      "question": "선정 사례 수·참여합·최다 표창을 집계하고 요약해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\ntext = source('생활안전_캠페인_사례집.md').read_text(encoding='utf-8-sig')\ncases = re.findall(r'^### 사례 \\d+\\.',text,flags=re.M)\ntotal = sum(int(v.replace(',','')) for v in re.findall(r'참여인원:\\s*([\\d,]+)',text))\nawards = Counter(re.findall(r'표창등급:\\s*(\\S+)',text))\nprint('우수사례:',len(cases),'선정 사례 참여합:',total)\nprint('최다 표창:',*awards.most_common(1)[0])\nannual = int(re.search(r'누적 참여 인원은\\s*(?:\\*\\*)?(\\d[\\d,]*)명',text)[1].replace(',',''))\nprint('연간 누적 참여:',annual)\n\nsummary = f'# 생활안전 캠페인\\n선정 {len(cases)}사례 참여합 {total:,}명\\n최다 표창: {awards.most_common(1)[0][0]}\\n연간 누적 참여: {annual:,}명\\n'\n(OUT/'정책브리핑.md').write_text(summary,encoding='utf-8')\n",
      "tip": "선정 사례의 합계와 전국 연간 누적 인원을 구별합니다.",
      "status": "로컬 실행 결과",
      "answer": "12사례 · 선정 사례 94,300명 · 시장표창 5건 · 연간 누적 2,340,000명",
      "resultId": "green4_1과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set4_2과목": [
    {
      "question": "시설유형 결합·정제 후 노쇼 비율과 평균 대기일을 계산해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nfrom sklearn.model_selection import train_test_split\na = pd.read_csv(source('공공시설_예약현황.csv'))\nb = pd.read_csv(source('시설유형_통계.csv'))\nmerged = a.merge(b,on='시설유형',how='inner')\nmerged['label'] = (merged['노쇼여부']=='노쇼').astype(int)\nclean = merged[merged['예약대기일'].notna() & (merged['예약대기일']>=0)].copy()\n\nprint('정제:',len(clean))\nprint('결합 후 노쇼율 1위:',merged.groupby('시설유형').label.mean().idxmax())\nprint('노쇼 집단 평균 대기일:',round(clean.loc[clean.label==1,'예약대기일'].mean()))\nprint('전체 평균 대기일:',round(clean['예약대기일'].mean()))\n_,test = train_test_split(clean,test_size=.2,random_state=42,stratify=clean.label)\nprint('테스트 라벨 1:',int(test.label.sum()))\nclean.to_csv(OUT/'처리완료_데이터.csv',index=False,encoding='utf-8-sig')\n",
      "tip": "노쇼 라벨을 먼저 만듭니다. 노쇼 집단 평균 18일과 전체 평균 15일은 다릅니다.",
      "status": "로컬 실행 결과",
      "answer": "1,496행 · 회의실 · 노쇼 평균 18일 · 테스트 158행",
      "resultId": "set4_2과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set5_2과목": [
    {
      "question": "시도 결합 후 최근 고장 비율·건물명 길이·테스트 수를 계산해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nfrom sklearn.model_selection import train_test_split\na = pd.read_csv(source('승강기_중대한고장_샘플.csv'))\na = a.dropna(subset=['고장발생일','주소']).copy()\na['시도'] = a['주소'].str.split().str[0]\na['시군구'] = a['주소'].str.split().str[1]\na['연도'] = a['고장발생일'].str[:4].astype(int)\na['최근_여부'] = (a['연도']>=2020).astype(int)\nclean = a.merge(pd.read_csv(source('시도_고장지표.csv')),on='시도',how='inner')\n\nprint('결합:',len(clean))\ngroups = clean.groupby('시도')['최근_여부'].agg(['size','mean'])\nprint('30건 이상 최고:',groups.loc[groups['size']>=30,'mean'].idxmax())\nprint('최근 고장 건물명 길이:',round(clean.loc[clean['최근_여부']==1,'건물명'].str.len().mean()))\n_,test = train_test_split(clean,test_size=.2,random_state=42,stratify=clean['최근_여부'])\nprint('테스트 최근 고장:',int(test['최근_여부'].sum()))\nclean.to_csv(OUT/'처리결과_승강기_고장데이터.csv',index=False,encoding='utf-8-sig')\n",
      "tip": "발생 연도와 최근_여부 열도 함께 저장합니다. 기존 F1 0.5753은 학습 설정 부족으로 재현 미확인입니다.",
      "status": "로컬 실행 결과",
      "answer": "3,000행 · 세종특별자치시 · 9자 · 테스트 472행",
      "resultId": "set5_2과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set5_1과목": [
    {
      "question": "보고서의 5개 사실유형별 값과 출현 횟수를 대조해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\ntext = source('2026_안전점검_보고서.md').read_text(encoding='utf-8-sig')\npatterns = {\n    '총점검건수':r'(?:450|440)(?=건)',\n    '지적사항수':r'(?:120|115)(?=건)',\n    '시정완료율':r'(?:85|82)(?=%)',\n    '예산집행률':r'(?:92|90)(?=%)',\n    '총괄책임자':r'권혁[수주]'\n}\nrows = []\nfor name,pattern in patterns.items():\n    counts = Counter(re.findall(pattern,text))\n    values = counts.most_common()\n    rows.append([name,values[0][0],values[1][0],values[0][1],values[1][1],'Y' if len(values)>1 else 'N'])\ntable = pd.DataFrame(rows,columns=['사실명','다수값','소수값','다수값_등장수','소수값_등장수','불일치여부'])\nprint(table.to_string(index=False))\nprint('두 값이 출현한 사실유형:',int((table['불일치여부']=='Y').sum()))\ntable.to_csv(OUT/'정합성표.csv',index=False,encoding='utf-8-sig')\n",
      "tip": "이 정규식은 제공된 가상 보고서 전용입니다. 두 값 출현 시 Y라는 시험 규칙과 실제 문맥상 모순 판정은 구별합니다.",
      "status": "로컬 실행 결과",
      "answer": "시험 규칙상 5개 값 쌍 · 점검건수 차이 10건",
      "resultId": "set5_1과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "green5_1과목": [
    {
      "question": "보고서의 5개 사실유형별 값과 출현 횟수를 대조해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\ntext = source('2026_안전점검_보고서.md').read_text(encoding='utf-8-sig')\npatterns = {\n    '총점검건수':r'(?:450|440)(?=건)',\n    '지적사항수':r'(?:120|115)(?=건)',\n    '시정완료율':r'(?:85|82)(?=%)',\n    '예산집행률':r'(?:92|90)(?=%)',\n    '총괄책임자':r'권혁[수주]'\n}\nrows = []\nfor name,pattern in patterns.items():\n    counts = Counter(re.findall(pattern,text))\n    values = counts.most_common()\n    rows.append([name,values[0][0],values[1][0],values[0][1],values[1][1],'Y' if len(values)>1 else 'N'])\ntable = pd.DataFrame(rows,columns=['사실명','다수값','소수값','다수값_등장수','소수값_등장수','불일치여부'])\nprint(table.to_string(index=False))\nprint('두 값이 출현한 사실유형:',int((table['불일치여부']=='Y').sum()))\ntable.to_csv(OUT/'정합성표.csv',index=False,encoding='utf-8-sig')\n",
      "tip": "이 정규식은 제공된 가상 보고서 전용입니다. 두 값 출현 시 Y라는 시험 규칙과 실제 문맥상 모순 판정은 구별합니다.",
      "status": "로컬 실행 결과",
      "answer": "시험 규칙상 5개 값 쌍 · 점검건수 차이 10건",
      "resultId": "green5_1과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "green1_2과목": [
    {
      "question": "전국 행을 제외한 시도 인구를 정리해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\ndf = pd.read_csv(source('주민등록_인구현황_2025.csv'))\ndf['행정구역'] = df['행정구역'].str.replace(r'\\s*\\(.*\\)','',regex=True).str.strip()\ndf['총인구수'] = df['2025년_총인구수'].astype(str).str.replace(',','').astype(int)\nprint('전국 인구:',int(df.loc[df['행정구역']=='전국','총인구수'].iloc[0]))\nregions = df[df['행정구역']!='전국'][['행정구역','총인구수']].sort_values('총인구수',ascending=False)\nprint('시도 수:',len(regions))\nprint('최대 인구:',regions.iloc[0]['행정구역'],int(regions.iloc[0]['총인구수']))\nprint('200만 미만:',int((regions['총인구수']<2000000).sum()))\nprint('광역시:',int(regions['행정구역'].str.contains('광역시').sum()))\nprint('시도 평균:',round(regions['총인구수'].mean()))\nregions.to_csv(OUT/'인구표.csv',index=False,encoding='utf-8-sig')\n",
      "tip": "원본 열 이름 2025년_총인구수와 행정구역을 사용합니다.",
      "status": "로컬 실행 결과",
      "answer": "17개 시도 · 경기도 13,730,135명",
      "resultId": "green1_2과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "green2_2과목": [
    {
      "question": "시도별 시군구 수와 인구를 집계해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\ndf = pd.read_csv(source('가상_시군구_인구현황.csv'))\ncounts = df.groupby('시도').size().sort_values(ascending=False).rename('시군구수')\nprint('전체:',len(df))\nprint(counts.to_string())\nprint('인구 1위:',df.loc[df['인구'].idxmax(),'시군구'])\nprint('30만 이상:',int((df['인구']>=300000).sum()))\ncounts.reset_index().to_csv(OUT/'시도별_시군구수.csv',index=False,encoding='utf-8-sig')\n",
      "tip": "원본 열은 시도/시군구입니다. 이름이 비슷해도 다른 열 이름으로 접근할 수 없습니다.",
      "status": "로컬 실행 결과",
      "answer": "100행 · 경기도 27개 · 서울 18개 · 인구 1위 노원구",
      "resultId": "green2_2과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "green3_2과목": [
    {
      "question": "봉사분야·봉사자유형 결측 기준으로 정제하고 집계해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\ndf = pd.read_csv(source('자원봉사프로그램.csv'))\nclean = df.dropna(subset=['봉사분야','봉사자유형'])\nprint('정제:',len(clean),'분야:',clean['봉사분야'].nunique(),'유형:',clean['봉사자유형'].nunique())\nprint('청소년:',int(clean['봉사자유형'].str.contains('청소년',na=False).sum()))\ncounts = clean['봉사분야'].value_counts()\nprint('최다 분야:',counts.index[0],int(counts.iloc[0]))\nprint('위도·경도 결측:',df[['위도','경도']].isna().sum().to_dict())\ncounts.rename_axis('봉사분야').reset_index(name='프로그램수').to_csv(OUT/'통계표.csv',index=False,encoding='utf-8-sig')\n",
      "tip": "필수 두 열의 결측은 0건이며 위도/경도는 각각 408/408건 결측입니다. 임의 중복 제거를 추가하지 않습니다.",
      "status": "로컬 실행 결과",
      "answer": "3,621건 · 22분야 · 3유형 · 청소년 1,435건",
      "resultId": "green3_2과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "green4_2과목": [
    {
      "question": "문제지 원본 기준 정답과 추가 정제 통계를 구분해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\ndf = pd.read_csv(source('공공시설_예약현황.csv'))\nprint('원본:',len(df),'노쇼:',int(df['노쇼여부'].eq('노쇼').sum()))\nprint('최다 시설:',df['시설유형'].value_counts().idxmax())\nprint('음수 제외 평균 대기일:',round(df.loc[df['예약대기일']>=0,'예약대기일'].mean()))\nprint('결측 제외 평균 이용인원:',round(df['이용인원'].mean()))\nextra = df.dropna()\nextra = extra[extra['예약대기일']>=0]\nprint('추가 정제:',len(extra),'노쇼:',int(extra['노쇼여부'].eq('노쇼').sum()))\nextra.to_csv(OUT/'추가정제_참고통계.csv',index=False,encoding='utf-8-sig')\n",
      "tip": "문항 1·2는 원본 기준입니다. 노쇼 문자열을 sum하지 않고 eq(\"노쇼\")의 참 개수를 셉니다.",
      "status": "로컬 실행 결과",
      "answer": "원본 1,500건/노쇼 790건 · 정제 1,476건/774건",
      "resultId": "green4_2과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "green5_2과목": [
    {
      "question": "고장일·주소에서 시도와 연도를 추출해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\ndf = pd.read_csv(source('승강기_중대한고장_샘플.csv'))\ndf = df.dropna(subset=['고장발생일','주소']).copy()\ndf['시도명'] = df['주소'].str.split().str[0]\ndf['연도'] = df['고장발생일'].str[:4].astype(int)\ncounts = df['시도명'].value_counts()\nprint('행수:',len(df),'시도명 종류:',df['시도명'].nunique(),'연도 종류:',df['연도'].nunique())\nprint('최다:',counts.index[0],int(counts.iloc[0]))\nprint('2020년 이상:',int((df['연도']>=2020).sum()))\ndf.to_csv(OUT/'승강기_정제.csv',index=False,encoding='utf-8-sig')\n",
      "tip": "약식/정식 주소를 임의 통합하지 않습니다. 첫 단어 기준 시도명은 31종입니다.",
      "status": "로컬 실행 결과",
      "answer": "3,000행 · 경기도 652건 · 2020년 이상 2,358건",
      "resultId": "green5_2과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set7_1과목": [
    {
      "question": "사례집의 누적 참여자와 최다 표창을 추출해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\ntext = source('자원봉사_우수사례집.md').read_text(encoding='utf-8-sig')\ntotal = int(re.search(r'누적 자원봉사 참여자는\\s*\\*\\*([\\d,]+)명',text)[1].replace(',',''))\nawards = Counter(re.findall(r'표창등급:\\s*(\\S+)',text))\ntop,count = awards.most_common(1)[0]\nprint('누적 참여자:',total)\nprint('최다 표창:',top,count,f'{count/sum(awards.values())*100:.2f}%')\n",
      "tip": "사례별 참여합이 아니라 본문에 명시된 연간 누적값을 읽습니다.",
      "status": "로컬 실행 결과",
      "answer": "1,248,000명 · 구청장표창 5건/41.67%",
      "resultId": "set7_1과목/0",
      "resultVersion": "c7031853b1e1c31f"
    },
    {
      "question": "참고 통계와 회의록에서 등록 봉사자·시상 분야·절차를 찾아줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nstats = source('참고1_2024_자원봉사_통계.md').read_text(encoding='utf-8-sig')\nrow = next(line for line in stats.splitlines() if line.startswith('| 등록 자원봉사자 수 |'))\nvalue_2024 = row.split('|')[3].strip()\nprint('2024 등록(만 명):',int(re.search(r'[\\d,]+',value_2024)[0].replace(',','')))\nminutes = source('참고3_자원봉사시상식_회의록.md').read_text(encoding='utf-8-sig')\nfields = int(re.search(r'시상 분야\\s*:\\s*(\\d+)개',minutes)[1])\nsteps = int(re.search(r'우수기관 선정 절차\\s*(\\d+)단계',minutes)[1])\nprint('시상 분야:',fields,'선정 절차:',steps)\n",
      "tip": "Markdown 표에서 2024년 열을 선택하고 쉼표를 제거합니다.",
      "status": "로컬 실행 결과",
      "answer": "2024년 1,486만 명 · 5개 분야 · 4단계",
      "resultId": "set7_1과목/1",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set7_2과목": [
    {
      "question": "체육시설을 정제하고 폐업률·집단별 평균 연면적을 계산해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nfrom sklearn.model_selection import train_test_split\na = pd.read_csv(source('체육시설_인허가현황.csv'))\nb = pd.read_csv(source('자치구_상권통계.csv'))\nmerged = a.merge(b,on='자치구',how='inner')\nclean = merged[merged['연면적'].notna() & (merged['연면적']>0)].copy()\nclean['label'] = clean['영업상태'].eq('폐업').astype(int)\n\nrates = clean.groupby('자치구').label.mean()\nprint('정제:',len(clean))\nprint('폐업률 1위:',rates.idxmax(),f'{rates.max()*100:.2f}%')\nprint('폐업 집단 평균:',round(clean.loc[clean.label==1,'연면적'].mean()))\nprint('전체 평균:',round(clean['연면적'].mean()))\nclean.to_csv(OUT/'processed_data.csv',index=False,encoding='utf-8-sig')\n",
      "tip": "반올림에는 round를 사용합니다. int는 버림이며, 전체 평균과 폐업 집단 평균도 다릅니다.",
      "status": "로컬 실행 결과",
      "answer": "1,965행 · 도봉구 91.67% · 폐업 1,279㎡/전체 1,533㎡",
      "resultId": "set7_2과목/0",
      "resultVersion": "c7031853b1e1c31f"
    },
    {
      "question": "층화 80:20 분할 후 RandomForest 변수 중요도를 계산해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nfrom sklearn.model_selection import train_test_split\na = pd.read_csv(source('체육시설_인허가현황.csv'))\nb = pd.read_csv(source('자치구_상권통계.csv'))\nmerged = a.merge(b,on='자치구',how='inner')\nclean = merged[merged['연면적'].notna() & (merged['연면적']>0)].copy()\nclean['label'] = clean['영업상태'].eq('폐업').astype(int)\n\nfrom sklearn.ensemble import RandomForestClassifier\ncols = ['연면적','인허가연도','임대료지수','사업체수']\nxt,xv,yt,yv = train_test_split(clean[cols],clean.label,test_size=.2,random_state=42,stratify=clean.label)\nprint('테스트 폐업:',int(yv.sum()))\nmodel = RandomForestClassifier(n_estimators=100,random_state=42).fit(xt,yt)\nfor col,importance in zip(cols,model.feature_importances_):\n    print(col,f'{importance*100:.2f}%')\n",
      "tip": "이 코드는 층화 홀드아웃 분할입니다. 여러 fold를 반복하는 교차검증이 아닙니다.",
      "status": "로컬 실행 결과",
      "answer": "테스트 폐업 214행 · 연면적 37.03% · 사업체수 21.66%",
      "resultId": "set7_2과목/1",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set1_3과목": [
    {
      "question": "사건·교육 원본을 읽어 요약 CSV를 생성해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nincidents = pd.read_csv(source('청렴신고_사건데이터.csv'))\neducation = pd.read_csv(source('청렴교육_현황.csv'))\nrows = [\n    ['기본통계','총 신고 사건 수',len(incidents)],\n    ['기본통계','처리 완료 사건 수',int(incidents['처리상태'].eq('처리완료').sum())],\n    ['기본통계','평균 처리기간(일)',round(incidents['처리기간_일'].mean())]\n]\nrows += [['신고유형별 사건 수',name,int(count)] for name,count in incidents['신고유형'].value_counts().items()]\nrows += [['기관유형별 평균 이수율',name,round(value,2)] for name,value in education.groupby('기관유형')['교육이수율'].mean().items()]\npd.DataFrame(rows,columns=['구분','항목','값']).to_csv(OUT/'결과_요약.csv',index=False,encoding='utf-8-sig')\nprint('사건:',len(incidents),'교육:',len(education),'요약 CSV: 1')\n",
      "tip": "원본 solution.py의 과제는 여러 CSV로 분리하는 것이 아니라 두 원본을 집계하는 것입니다.",
      "status": "로컬 실행 결과",
      "answer": "사건 500건 · 교육 120기관 · 요약 CSV 1개",
      "resultId": "set1_3과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set2_3과목": [
    {
      "question": "신청서 MD를 지자체별 폴더에 복사하고 분류표를 만들어줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nimport shutil\napplications = next(BASE.rglob('신청서'))\ncounts = Counter()\nfor path in sorted(applications.glob('*.md')):\n    text = path.read_text(encoding='utf-8-sig')\n    match = re.search(r'<!--\\s*지자체\\s*:\\s*(.*?)\\s*-->',text)\n    if not match:\n        match = re.search(r'-\\s*지자체\\s*:\\s*(.+)',text)\n    name = match[1].strip()\n    if not re.fullmatch(r'[가-힣A-Za-z0-9 _-]+',name):\n        raise ValueError('허용하지 않는 지자체 경로')\n    destination = OUT/'출력_지자체별'/name\n    destination.mkdir(parents=True,exist_ok=True)\n    shutil.copy2(path,destination/path.name)\n    counts[name] += 1\npd.DataFrame(counts.items(),columns=['지자체명','파일수']).to_csv(OUT/'결과_분류현황.csv',index=False,encoding='utf-8-sig')\nprint('신청서:',sum(counts.values()),'지자체:',len(counts))\n",
      "tip": "원본 MD 파일은 이동·삭제하지 않고 복사합니다. 출력 경로는 학습출력 아래로 제한합니다.",
      "status": "로컬 실행 결과",
      "answer": "신청서 10건 · 지자체 10개",
      "resultId": "set2_3과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set3_3과목": [
    {
      "question": "조항 JSON에서 과태료 조항을 제목·본문으로 검색해 저장해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nitems = json.loads(source('조항데이터.json').read_text(encoding='utf-8-sig'))\nkeyword = '과태료'\nfiltered = [item for item in items if keyword in item['제목'] or keyword in item['본문']]\nprint('전체:',len(items),'검색:',len(filtered))\npd.DataFrame(filtered,columns=['조', '제목', '본문']).to_csv(OUT/'결과_과태료.csv',index=False,encoding='utf-8-sig')\n",
      "tip": "JSON 키는 장이 아니라 조입니다. 본칙과 부칙을 합쳐 15개를 검색합니다.",
      "status": "로컬 실행 결과",
      "answer": "전체 15개 · 과태료 검색 1개",
      "resultId": "set3_3과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "green3_3과목": [
    {
      "question": "조항에서 제목·본문 키워드를 검색해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nitems = json.loads(source('조항데이터.json').read_text(encoding='utf-8-sig'))\nkeyword = '개인정보'\nfiltered = [item for item in items if keyword in item['제목'] or keyword in item['본문']]\nprint('전체:',len(items),'검색:',len(filtered))\npd.DataFrame(filtered,columns=['조', '제목', '본문']).to_csv(OUT/'검색결과.csv',index=False,encoding='utf-8-sig')\n",
      "tip": "내용이라는 키는 없습니다. 원본의 제목·본문을 사용합니다.",
      "status": "로컬 실행 결과",
      "answer": "전체 15개 · 개인정보 검색 3개",
      "resultId": "green3_3과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set5_3과목": [
    {
      "question": "장 데이터의 제목·본문에서 점검 키워드를 찾아줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nitems = json.loads(source('장데이터.json').read_text(encoding='utf-8-sig'))\nkeyword = '점검'\nfiltered = [item for item in items if keyword in item['제목'] or keyword in item['본문']]\nprint('전체:',len(items),'검색:',len(filtered))\npd.DataFrame(filtered,columns=['장', '제목', '본문']).to_csv(OUT/'결과_점검.csv',index=False,encoding='utf-8-sig')\n",
      "tip": "CSV 저장과 외부 Sheets 연결은 별개의 작업입니다. Sheets 원격 로드는 미검증입니다.",
      "status": "로컬 실행 결과",
      "answer": "전체 5개 · 점검 검색 5개",
      "resultId": "set5_3과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "green5_3과목": [
    {
      "question": "장 데이터의 제목·본문에서 점검 키워드를 찾아줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nitems = json.loads(source('장데이터.json').read_text(encoding='utf-8-sig'))\nkeyword = '점검'\nfiltered = [item for item in items if keyword in item['제목'] or keyword in item['본문']]\nprint('전체:',len(items),'검색:',len(filtered))\npd.DataFrame(filtered,columns=['장', '제목', '본문']).to_csv(OUT/'결과_점검.csv',index=False,encoding='utf-8-sig')\n",
      "tip": "CSV 저장과 외부 Sheets 연결은 별개의 작업입니다. Sheets 원격 로드는 미검증입니다.",
      "status": "로컬 실행 결과",
      "answer": "전체 5개 · 점검 검색 5개",
      "resultId": "green5_3과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set4_3과목": [
    {
      "question": "안내서비스를 카테고리별 CSV로 분리해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\ndf = pd.read_csv(source('안내서비스.csv'))\nfolder = OUT/'출력_카테고리별'\nfolder.mkdir(exist_ok=True)\nfor name,group in df.groupby('카테고리'):\n    if not re.fullmatch(r'[가-힣A-Za-z0-9 _-]+',str(name)):\n        raise ValueError('허용하지 않는 분류 경로')\n    group.to_csv(folder/f'{name}.csv',index=False,encoding='utf-8-sig')\nprint('원본 행:',len(df),'분류 CSV:',df['카테고리'].nunique())\n",
      "tip": "append 대신 그룹별로 덮어써서 예제를 다시 실행해도 행이 중복되지 않습니다.",
      "status": "로컬 실행 결과",
      "answer": "24건 · 카테고리 CSV 7개",
      "resultId": "set4_3과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "set7_3과목": [
    {
      "question": "모집공고를 분야별 CSV로 분리하고 모집인원을 합산해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\ndf = pd.read_csv(source('모집공고.csv'))\nfolder = OUT/'출력_분야별'\nfolder.mkdir(exist_ok=True)\nfor name,group in df.groupby('분야'):\n    if not re.fullmatch(r'[가-힣A-Za-z0-9 _-]+',str(name)):\n        raise ValueError('허용하지 않는 분류 경로')\n    group.to_csv(folder/f'{name}.csv',index=False,encoding='utf-8-sig')\nprint('원본 행:',len(df),'분류 CSV:',df['분야'].nunique())\nprint('모집인원 합:',int(df['모집인원'].sum()))\n",
      "tip": "공고 수와 모집인원 합계를 구분합니다. 외부 배포는 이 코드에서 수행하지 않습니다.",
      "status": "로컬 실행 결과",
      "answer": "40공고 · 모집인원 1,295명 · CSV 7개",
      "resultId": "set7_3과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "green2_3과목": [
    {
      "question": "신청목록의 인구수×10 한도로 승인/반려를 판정해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nitems = json.loads(source('신청목록.json').read_text(encoding='utf-8-sig'))\nfor item in items:\n    item['한도액'] = item['인구수']*10\n    item['판정'] = '승인' if item['신청액']<=item['한도액'] else '반려'\nprint('판정 완료:',len(items))\nprint(pd.DataFrame(items).to_string(index=False))\n(OUT/'판정결과.json').write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf-8')\n",
      "tip": "한도와 같은 금액은 승인입니다. 이 예제는 판정 로직이며 웹 배포 완료를 뜻하지 않습니다.",
      "status": "로컬 실행 결과",
      "answer": "10건 · 한도 이하 승인/초과 반려",
      "resultId": "green2_3과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "green4_3과목": [
    {
      "question": "안내서비스 목록을 서비스명·안내분야로 검색해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nitems = json.loads(source('안내서비스_목록.json').read_text(encoding='utf-8-sig'))\nkeyword = '안내'\nresults = [item for item in items if keyword in item['서비스명'] or keyword in item['안내분야']]\nprint('전체 서비스:',len(items),'검색 결과:',len(results))\n(OUT/'검색결과.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')\n",
      "tip": "웹 UI의 필터와 같은 필드로 검색합니다. 검색과 분야 선택을 함께 쓰면 조건을 모두 만족해야 합니다.",
      "status": "로컬 실행 결과",
      "answer": "24개 서비스 · 안내 검색 24개",
      "resultId": "green4_3과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ],
  "green1_3과목": [
    {
      "question": "보도자료를 HTML로 만들고 제목·섹션·목록·인용구를 확인해줘",
      "code": "from pathlib import Path\nimport json, re\nfrom collections import Counter\nimport pandas as pd\n\nBASE = Path.cwd()\ndef source(name):\n    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]\n    if len(paths) != 1:\n        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')\n    return paths[0]\n\nOUT = BASE / '학습출력'\nOUT.mkdir(exist_ok=True)\n\nfrom html import escape\nfrom html.parser import HTMLParser\nclass Structure(HTMLParser):\n    def __init__(self):\n        super().__init__()\n        self.tags = Counter()\n    def handle_starttag(self,tag,attrs):\n        self.tags[tag] += 1\nraw = source('보도자료_125874.md').read_text(encoding='utf-8-sig')\ntitle = re.search(r'^#\\s+(.+)',raw,re.M)[1]\n# Provided source uses escaped >> section headings, not standard Markdown ##.\nblocks = re.split(r'(?m)^\\\\?>>\\s*',raw)\nassert len(blocks)==4\nsections = []\nfor label,block in zip(['인사 인센티브','채용제도 개선'],blocks[1:3]):\n    bullets = re.findall(r'(?m)^\\*\\*(.+?)\\*\\*:\\s*(.+)$',block)\n    items = ''.join(f'<li><strong>{escape(a)}</strong>: {escape(b)}</li>' for a,b in bullets)\n    sections.append(f'<section><h2>{label}</h2><ul>{items}</ul></section>')\nquote = next(line for line in raw.splitlines() if line.startswith('윤호중 행정안전부 장관은'))\nhtml = ('<!doctype html><html lang=\"ko\"><head><meta charset=\"utf-8\">'\n        '<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">'\n        f'<title>{escape(title)}</title>'\n        '<style>body{max-width:850px;margin:auto;padding:24px;font:16px/1.8 sans-serif;overflow-wrap:anywhere}li{margin:12px 0}blockquote{border-left:4px solid #2563eb;padding-left:18px}</style>'\n        f'</head><body><h1>{escape(title)}</h1>'+''.join(sections)\n        +f'<blockquote>{escape(quote)}</blockquote></body></html>')\n(OUT/'index.html').write_text(html,encoding='utf-8')\nparser = Structure()\nparser.feed(html)\nfor tag in ['title','h1','section','ul','blockquote']:\n    assert parser.tags[tag]>0, f'{tag} 누락'\nassert '인사교류' in html and '채용제도' in html\nassert '지방인사제도과' in raw\nprint('보도자료: 1 / 내용 섹션:',parser.tags['section'])\nprint('제목·H1·목록·인용구 확인')\n",
      "tip": "제공된 보도자료 형식 전용 변환 예제입니다. 일반 Markdown 전체를 지원하는 변환기는 아닙니다. 저장 후 실제 배포·접속 확인은 별도로 해야 합니다.",
      "status": "로컬 실행 결과",
      "answer": "보도자료 1건 · 인사 인센티브/채용제도 개선 2개 섹션",
      "resultId": "green1_3과목/0",
      "resultVersion": "c7031853b1e1c31f"
    }
  ]
};
