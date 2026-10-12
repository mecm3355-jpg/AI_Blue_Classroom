"""Presentation bindings: all observations come from lesson-results.json."""
ROOMS = {
 'set1':('청렴윤리모니터링',['보도자료 분석','청렴지수·부패위험 분석','사건·교육 요약 자동화']),
 'set2':('자치행정협력사업',['협력사업 예산 분석','시민참여 라벨 분석','신청서 폴더 분류']),
 'set3':('가상기본법조항',['외부 법령 인용 분석','자원봉사 청소년 분류','법 조항 검색']),
 'set4':('안내매뉴얼연락처',['생활안전 사례 집계','공공시설 노쇼 분석','안내서비스 자동분류']),
 'set5':('안전점검보고서일관성',['보고서 사실 대조','승강기 최근 고장 분석','장별 키워드 검색']),
 'set7':('자원봉사·체육시설·모집공고',['자원봉사 우수사례','체육시설 폐업 분석','모집공고 자동분류']),
 'green1':('청렴윤리모니터링',['보도자료 분류','주민등록 인구','보도자료 웹 구조']),
 'green2':('자치행정협력사업',['협력사업 보고서','시군구 인구 집계','신청 승인 판정']),
 'green3':('가상기본법조항',['본칙 조항 목록','자원봉사 프로그램','법 조항 검색']),
 'green4':('안내매뉴얼연락처',['생활안전 캠페인','공공시설 예약','안내서비스 검색']),
 'green5':('안전점검보고서일관성',['보고서 사실유형 대조','승강기 고장 집계','장별 검색 뷰어'])
}
# (subject, example, label, value template, description template).
KPI_BINDINGS = {
 'set1':[(1,0,'1과목 담당부서','{departments}개 부서','보도자료 {documents}건의 메타 헤더'),
         (2,0,'2과목 정제','{clean}행','{merged}행에서 결측 {null_removed}행·IQR {iqr_removed}행 제외'),
         (2,1,'2과목 평균 청렴지수 1위','{highest}','기관유형별 평균 기준'),
         (3,0,'3과목 요약 CSV','{files}개','사건 {incidents}건과 교육 {education}기관 집계')],
 'set2':[(1,0,'1과목 예산 1위','{project}','{budget}억원 · 협력지자체 {partners}곳'),
         (2,0,'2과목 정제','{clean}행','시도코드 zfill(2) 후 결합·정제'),
         (2,0,'2과목 정제 전 평균 1위','{before_name}','정제 후 1위는 {after_name}'),
         (3,0,'3과목 지자체','{regions}개','MD 신청서 복사 분류')],
 'set3':[(1,0,'1과목 인용 법령','{kinds}종','{name} {count}회'),
         (2,0,'2과목 정제','{clean:,}행','청소년 포함 {teen:,}건'),
         (2,1,'2과목 최고 Macro F1','{best_score:.4f}','동일 설정 재학습 · {best_model}'),
         (3,0,'3과목 조항','{items}개','본칙·부칙 전체 검색')],
 'set4':[(1,0,'1과목 우수사례','{cases}개','선정 사례 참여합 {participants:,}명'),
         (2,0,'2과목 정제','{clean:,}행','예약대기일 결측·음수 제외'),
         (2,0,'2과목 노쇼율 1위','{highest}','결합 후 시설유형별 노쇼 비율'),
         (3,0,'3과목 분류 CSV','{files}개','안내서비스 {rows}건')],
 'set5':[(1,0,'1과목 값 쌍','{pairs}개 사실유형','시험의 두 값 출현 기준 · 문맥 구분 필요'),
         (2,0,'2과목 결합','{merged:,}행','테스트 최근 고장 {test}행'),
         (2,0,'2과목 기존 F1 기록','재현 미확인','학습 설정 근거 부족 · 현재 분석 결과와 별도 기록'),
         (3,0,'3과목 Sheets','외부 미검증','장 데이터 {items}개 · 원격 연결 별도 검증 필요')],
 'set7':[(1,0,'1과목 누적 참여','{participants:,}명','최다 표창 {award} {count}/{cases}건'),
         (2,0,'2과목 정제','{clean:,}행','연면적 결측·0 이하 {removed}행 제외'),
         (2,0,'2과목 폐업률 1위','{highest} {rate:.2f}%','관측 비율 · 예측 확률 아님'),
         (3,0,'3과목 모집공고','{rows}건 / {people:,}명','분야별 CSV {files}개')],
 'green1':[(1,0,'1과목 분류','{documents}건 / {departments}개 부서','{distribution}'),
           (2,0,'2과목 최대 인구','{name} {population:,}명','전국 행 제외 · {regions}개 시도'),
           (3,0,'3과목 보도자료','{documents}건 / {sections}개 섹션','{department} · 인사교류/채용제도')],
 'green2':[(1,0,'1과목 예산 1위','{project} · {budget}억원','{name}'),
           (2,0,'2과목 시군구 최다','{top_name} {top_count}개','전체 {rows}개 · 서울 {seoul}개'),
           (3,0,'3과목 자동 판정','신청 {items}건','승인 {approved}건 · 반려 {rejected}건')],
 'green3':[(1,0,'1과목 본칙','{count}개 조항','부칙 제외'),
           (2,0,'2과목 최다 분야','{top_name} {top_count:,}건','전체 {clean:,}건 중 {top_percent:.2f}%'),
           (3,0,'3과목 검색 조항','{items}개','제목·본문 기준')],
 'green4':[(1,0,'1과목 캠페인','{cases}건 / 연간 {annual:,}명','선정 사례 참여합은 {participants:,}명'),
           (2,0,'2과목 원본 기준','{rows:,}건 / 노쇼 {noshow}건','문항 1·2 정답'),
           (2,0,'2과목 추가 정제','{clean:,}건 / 노쇼 {clean_noshow}건','원본 정답과 별도 참고 통계')],
 'green5':[(1,0,'1과목 값 쌍','{pairs}개 사실유형','시험상 값 대조와 문맥 판단 구분'),
           (2,0,'2과목 고장 데이터','{rows:,}행','{first_year}~{last_year}년'),
           (2,0,'2과목 고장 최다','{top_name} {top_count}건','2020년 이상 {recent:,}건')]
}
# Each metric binds to (example, fact key, label template, value template).
CHART_BINDINGS = {
 'set1':[('청렴지수 정제 결과',[(0,'merged','결합 데이터','{value}행'),(0,'clean','정제 데이터','{value}행'),(1,'mean','라벨 1 평균 청렴지수','{value:.4f}')]),
         ('사건·교육 요약 산출물',[(0,'incidents','사건 원본','{value}건'),(0,'education','교육 기관','{value}개'),(0,'files','요약 CSV','{value}개')])],
 'set2':[('시민참여 데이터 처리 결과',[(0,'clean','유효 데이터','{value}행'),(0,'before_mean','정제 전 평균 1위','{before_name} {value:.4f}억원'),(0,'after_mean','정제 후 평균 1위','{after_name} {value:.4f}억원')]),
         ('신청서 자동분류',[(0,'applications','신청서','{value}건'),(0,'regions','지자체 폴더','{value}개'),(0,'files','분류 현황 CSV','{value}개')])],
 'set3':[('자원봉사 분류 모델 Macro F1','scores'),
         ('법 조항 검색 산출물',[(0,'items','조항 데이터','{value}개'),(0,'found','과태료 검색 결과','{value}개')])],
 'set4':[('공공시설 노쇼 분석',[(0,'clean','정제 데이터','{value:,}행'),(0,'test','테스트 노쇼','{value}행'),(0,'wait','노쇼 집단 평균 대기일','{value}일')]),
         ('안내서비스 자동분류',[(0,'rows','원본 서비스','{value}건'),(0,'files','분류 CSV','{value}개')])],
 'set5':[('승강기 최근 고장 분석',[(0,'merged','결합 데이터','{value:,}행'),(0,'test','테스트 최근 고장','{value}행'),(0,'length','최근 건물명 평균 길이','{value}자')]),
         ('안전보고서 검색',[(0,'items','장 데이터','{value}개'),(0,'found','점검 검색 결과','{value}개'),(0,'person_found','권혁수 검색 결과','{value}개')])],
 'set7':[('체육시설 폐업 분석',[(0,'clean','정제 데이터','{value:,}행'),(0,'closed_area','폐업 집단 평균 연면적','{value:,}㎡'),(0,'all_area','전체 평균 연면적','{value:,}㎡'),(1,'test','테스트 폐업','{value}행')]),
         ('모집공고 자동분류',[(0,'people','모집 인원','{value:,}명'),(0,'rows','모집공고','{value}건'),(0,'files','분야별 CSV','{value}개')])],
 'green1':[('주민등록 인구 집계',[(0,'regions','분석 시도','{value}개'),(0,'population','최대 인구','{name} {value:,}명')]),
           ('인사교류 보도자료 웹 구조',[(0,'documents','보도자료','{value}건'),(0,'sections','내용 섹션','{value}개'),(0,'department','담당부서','{value}')])],
 'green2':[('시군구 인구 집계',[(0,'rows','전체 시군구','{value}개'),(0,'gyeonggi','경기도','{value}개'),(0,'seoul','서울특별시','{value}개')]),
           ('신청 승인 판정',[(0,'items','신청 목록','{value}건'),(0,'approved','승인','{value}건'),(0,'rejected','반려','{value}건')])],
 'green3':[('자원봉사 프로그램 집계',[(0,'clean','전체 프로그램','{value:,}건'),(0,'teen','청소년 포함','{value:,}건'),(0,'top_count','{top_name}','{value:,}건')]),
           ('법 조항 검색',[(0,'items','검색 조항','{value}개'),(0,'found','개인정보 검색 결과','{value}개')])],
 'green4':[('원본 정답과 추가 정제 비교',[(0,'rows','원본 예약','{value:,}건'),(0,'noshow','원본 노쇼','{value}건'),(0,'clean','추가 정제 예약','{value:,}건'),(0,'clean_noshow','추가 정제 노쇼','{value}건')]),
           ('안내서비스 검색',[(0,'items','원본 서비스','{value}건'),(0,'found','안내 검색 결과','{value}건')])],
 'green5':[('승강기 고장 집계',[(0,'rows','전체 데이터','{value:,}행'),(0,'recent','2020년 이상','{value:,}건'),(0,'top_count','{top_name}','{value}건')]),
           ('장별 검색',[(0,'items','장 데이터','{value}개'),(0,'found','점검 검색 결과','{value}개')])]
}

def build_catalog(snapshot=None, lessons=None):
    from lesson_pipeline import load_results, resolved_lessons
    snapshot = snapshot if snapshot is not None else load_results()
    lessons = lessons if lessons is not None else resolved_lessons(snapshot)
    data,charts = {},{}
    for room,(name,titles) in ROOMS.items():
        def rid(s,u=0): return f'{room}_{s}과목/{u}'
        def facts(s,u=0): return snapshot['results'][rid(s,u)]['facts']
        grade='GREEN' if room.startswith('green') else 'BLUE'
        kpis=[dict(label='등급',val=grade,desc='기초 문제 풀이')] if grade=='GREEN' else []
        for s,u,label,value,description in KPI_BINDINGS[room]:
            values=facts(s,u)
            kpis.append(dict(label=label,val=value.format_map(values),desc=description.format_map(values),resultId=rid(s,u)))
        topics,matrix=[],[]
        for s,title in enumerate(titles,1):
            key=f'{room}_{s}과목'
            topics.append(dict(id=f'{s}과목_{title.replace(" ","_")}',name=f'{s}과목_{title}',tag=lessons[key][0]['answer']))
            for i,unit in enumerate(lessons[key]):
                matrix.append(dict(subject=f'{s}과목',q=unit['question'],ans=unit['answer'],detail=unit['tip'],
                    time='로컬 실행',status='결과 연동',unit=i,resultId=unit['resultId']))
        number=room.replace('green','').replace('set','')
        data[room]=dict(setName=f'{grade} {number}세트: {name}',topics=topics,kpis=kpis,matrix=matrix,
                       resultVersion=snapshot['resultVersion'],
                       lobbyDescription=' · '.join(f'{i+1}과목 {t}' for i,t in enumerate(titles)))
        charts[room]=[]
        for i,(title,bindings) in enumerate(CHART_BINDINGS[room]):
            s=i+2
            if bindings=='scores':
                metrics=[[r['Model'],r['Macro_F1'],f"{r['Macro_F1']:.4f}"] for r in facts(s,1)['scores']]
                ids=[rid(s,1)]
            else:
                metrics=[];ids=[]
                for u,field,label,display in bindings:
                    values=facts(s,u)
                    metrics.append([label.format_map(values),values[field],display.format(value=values[field],**values)])
                    ids.append(rid(s,u))
            charts[room].append(dict(title=f'{["📊 2과목","🔎 3과목"][i]} {title}',color=['#38BDF8','#A78BFA'][i],
                                     metrics=metrics,resultIds=sorted(set(ids)),resultVersion=snapshot['resultVersion']))
    return data,charts
