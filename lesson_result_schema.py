"""Bindings evaluated only by the local, trusted Python analysis runner.

Expressions read the namespace of each completed teaching example. No UI value
is inferred from prose or copied from historical expected answers.
"""
SPECS = {}

def spec(key, unit, answer, **facts):
    SPECS[(key, unit)] = dict(answer=answer, facts=facts)

spec('set1_1과목',0,'{departments}개 부서 · {longest_department} · 최대 {longest_length}자',
     departments="df['담당부서'].nunique()", documents='len(df)',
     longest_department="longest['담당부서']",longest_length="longest['본문길이']")
spec('set1_1과목',1,'금액 합계 {amount}억원 · 최대 {count}개 · 부서별 {department_counts} · 청렴 {integrity_counts}',
     amount='round(sum(amounts))',count='max(counts)',
     department_counts="'/'.join(str(v)+'건' for v in summary.sort_values('자료수',ascending=False)['자료수'])",
     integrity_counts="'/'.join(str(v)+'회' for v in summary.sort_values('자료수',ascending=False)['청렴횟수합'])")
spec('green1_1과목',0,'{documents}건 · {distribution}',documents='len(df)',departments="df['담당부서'].nunique()",
     distribution="'/'.join(str(k)+' '+str(v)+'건' for k,v in df['담당부서'].value_counts().items())")
spec('set1_2과목',0,'{merged}행 → {clean}행',merged='len(merged)',clean='len(clean)',
     null_removed='len(merged)-len(merged.dropna())',iqr_removed='len(merged.dropna())-len(clean)')
spec('set1_2과목',1,'{highest} · 라벨 1 평균 {mean:.4f} → {rounded} · 테스트 {test}행',
     highest="clean.groupby('기관유형')['청렴지수'].mean().idxmax()",mean='avg',rounded='round(avg)',test='int(test.label.sum())')
spec('set2_1과목',0,'{project} · {field} · {budget}억원 · {partners}곳 · 전체 예산 {total:,}억원',
     project="top['사업번호']",field="top['분야']",budget="int(top['예산_억원'])",partners="int(top['협력지자체수'])",total="int(df['예산_억원'].sum())")
spec('green2_1과목',0,'{project} · {name} · {budget}억원',project='top[0]',name='top[1]',budget='top[2]')
spec('set2_2과목',0,'정제 전 {before_name} · 정제 후 {after_name} · 정제 {clean}행',
     before_name='before.idxmax()',after_name='after.idxmax()',before_mean='float(before.max())',after_mean='float(after.max())',clean='len(clean)')
spec('set2_2과목',1,'라벨 1 평균 사업비 반올림 {mean} · 테스트 라벨 1 {test}행',
     mean="round(clean.loc[clean.label==1,'총사업비_억원'].mean())",test='int(test.label.sum())')
spec('set3_1과목',0,'{kinds}종 · {name} {count}회',kinds='len(counts)',name='counts.most_common(1)[0][0]',count='counts.most_common(1)[0][1]')
spec('green3_1과목',0,'{first}~{last} · {count}개',first="table.iloc[0]['조항번호']",last="table.iloc[-1]['조항번호']",count='len(table)')
spec('set3_2과목',0,'{clean:,}행 · 청소년 {teen:,}건 · {highest} · 라벨 1 등록기관 평균 {agencies} · 테스트 {test}행',
     clean='len(clean)',teen='int(clean.label.sum())',highest="groups.loc[groups['size']>=30,'mean'].idxmax()",
     agencies="round(clean.loc[clean.label==1,'등록기관수'].mean())",test='int(test.label.sum())')
spec('set3_2과목',1,'{best_model} · Macro F1 {best_score:.4f}',
     best_model="table.loc[table.Macro_F1.idxmax(),'Model']",best_score='float(table.Macro_F1.max())',scores='results')
for key in ['set4_1과목','green4_1과목']:
    spec(key,0,'{cases}사례 · 선정 사례 {participants:,}명 · {award} {awards}건 · 연간 누적 {annual:,}명',
         cases='len(cases)',participants='total',award='awards.most_common(1)[0][0]',awards='awards.most_common(1)[0][1]',annual='annual')
spec('set4_2과목',0,'{clean:,}행 · {highest} · 노쇼 평균 {wait}일 · 테스트 {test}행',
     clean='len(clean)',highest="merged.groupby('시설유형').label.mean().idxmax()",
     wait="round(clean.loc[clean.label==1,'예약대기일'].mean())",all_wait="round(clean['예약대기일'].mean())",test='int(test.label.sum())')
spec('set5_2과목',0,'{merged:,}행 · {highest} · {length}자 · 테스트 {test}행',merged='len(clean)',
     highest="groups.loc[groups['size']>=30,'mean'].idxmax()",length="round(clean.loc[clean['최근_여부']==1,'건물명'].str.len().mean())",test="int(test['최근_여부'].sum())")
for key in ['set5_1과목','green5_1과목']:
    spec(key,0,'시험 규칙상 {pairs}개 값 쌍 · 점검건수 차이 {difference}건',pairs="int(table['불일치여부'].eq('Y').sum())",
         difference="abs(int(table.loc[table['사실명']=='총점검건수','다수값'].iloc[0])-int(table.loc[table['사실명']=='총점검건수','소수값'].iloc[0]))")
spec('green1_2과목',0,'{regions}개 시도 · {name} {population:,}명',regions='len(regions)',name="regions.iloc[0]['행정구역']",population="int(regions.iloc[0]['총인구수'])")
spec('green2_2과목',0,'{rows}행 · 경기도 {gyeonggi}개 · 서울 {seoul}개 · 인구 1위 {largest}',rows='len(df)',
     gyeonggi="int(counts.get('경기도',0))",seoul="int(counts.get('서울특별시',0))",largest="df.loc[df['인구'].idxmax(),'시군구']",top_name='counts.index[0]',top_count='int(counts.iloc[0])')
spec('green3_2과목',0,'{clean:,}건 · {fields}분야 · {types}유형 · 청소년 {teen:,}건',clean='len(clean)',
     fields="clean['봉사분야'].nunique()",types="clean['봉사자유형'].nunique()",teen="int(clean['봉사자유형'].str.contains('청소년',na=False).sum())",
     top_name='counts.index[0]',top_count='int(counts.iloc[0])',top_percent='float(counts.iloc[0]/len(clean)*100)',
     required_null="int(df[['봉사분야','봉사자유형']].isna().sum().sum())",lat_null="int(df['위도'].isna().sum())",lon_null="int(df['경도'].isna().sum())")
spec('green4_2과목',0,'원본 {rows:,}건/노쇼 {noshow}건 · 정제 {clean:,}건/{clean_noshow}건',rows='len(df)',
     noshow="int(df['노쇼여부'].eq('노쇼').sum())",clean='len(extra)',clean_noshow="int(extra['노쇼여부'].eq('노쇼').sum())")
spec('green5_2과목',0,'{rows:,}행 · {top_name} {top_count}건 · 2020년 이상 {recent:,}건',rows='len(df)',
     top_name='counts.index[0]',top_count='int(counts.iloc[0])',recent="int((df['연도']>=2020).sum())",regions="df['시도명'].nunique()",first_year="int(df['연도'].min())",last_year="int(df['연도'].max())")
spec('set7_1과목',0,'{participants:,}명 · {award} {count}건/{percent:.2f}%',participants='total',award='top',count='count',cases='sum(awards.values())',percent='count/sum(awards.values())*100')
spec('set7_1과목',1,'2024년 {registered:,}만 명 · {fields}개 분야 · {steps}단계',
     registered=r"int(re.search(r'[\d,]+',value_2024)[0].replace(',',''))",fields='fields',steps='steps')
spec('set7_2과목',0,'{clean:,}행 · {highest} {rate:.2f}% · 폐업 {closed_area:,}㎡/전체 {all_area:,}㎡',
     clean='len(clean)',removed='len(merged)-len(clean)',highest='rates.idxmax()',rate='float(rates.max()*100)',
     closed_area="round(clean.loc[clean.label==1,'연면적'].mean())",all_area="round(clean['연면적'].mean())")
spec('set7_2과목',1,'테스트 폐업 {test}행 · 연면적 {area_importance:.2f}% · 사업체수 {business_importance:.2f}%',
     test='int(yv.sum())',area_importance="float(dict(zip(cols,model.feature_importances_))['연면적']*100)",business_importance="float(dict(zip(cols,model.feature_importances_))['사업체수']*100)")
spec('set1_3과목',0,'사건 {incidents}건 · 교육 {education}기관 · 요약 CSV {files}개',incidents='len(incidents)',education='len(education)',files="len(list(OUT.glob('결과_요약.csv')))")
spec('set2_3과목',0,'신청서 {applications}건 · 지자체 {regions}개',applications='sum(counts.values())',regions='len(counts)',files="len(list(OUT.glob('결과_분류현황.csv')))")
for key in ['set3_3과목','green3_3과목','set5_3과목','green5_3과목']:
    spec(key,0,'전체 {items}개 · {keyword} 검색 {found}개',items='len(items)',keyword='keyword',found='len(filtered)',
         person_found="sum('권혁수' in item['제목'] or '권혁수' in item['본문'] for item in items)")
spec('set4_3과목',0,'{rows}건 · 카테고리 CSV {files}개',rows='len(df)',files="len(list(folder.glob('*.csv')))")
spec('set7_3과목',0,'{rows}공고 · 모집인원 {people:,}명 · CSV {files}개',rows='len(df)',people="int(df['모집인원'].sum())",files="len(list(folder.glob('*.csv')))")
spec('green2_3과목',0,'{items}건 · 한도 이하 승인/초과 반려',items='len(items)',approved="sum(i['판정']=='승인' for i in items)",rejected="sum(i['판정']=='반려' for i in items)")
spec('green4_3과목',0,'{items}개 서비스 · 안내 검색 {found}개',items='len(items)',found='len(results)')
spec('green1_3과목',0,'보도자료 {documents}건 · 인사 인센티브/채용제도 개선 {sections}개 섹션',
     documents="len(list(OUT.glob('index.html')))",sections="parser.tags['section']",department="re.search(r'지방인사제도과',raw)[0]")

# Any prose containing changing observations must use the same computed facts.
SPECS[('set4_2과목',0)]['tip'] = '노쇼 라벨을 먼저 만듭니다. 노쇼 집단 평균 {wait}일과 전체 평균 {all_wait}일은 다릅니다.'
SPECS[('set2_1과목',0)]['tip'] = '1위 사업의 협력지자체 수와 협력지자체 10곳 이상인 사업의 개수는 서로 다른 지표입니다.'
SPECS[('green3_2과목',0)]['tip'] = '필수 두 열의 결측은 {required_null}건이며 위도/경도는 각각 {lat_null}/{lon_null}건 결측입니다. 임의 중복 제거를 추가하지 않습니다.'
SPECS[('green5_2과목',0)]['tip'] = '약식/정식 주소를 임의 통합하지 않습니다. 첫 단어 기준 시도명은 {regions}종입니다.'
SPECS[('set3_3과목',0)]['tip'] = 'JSON 키는 장이 아니라 조입니다. 본칙과 부칙을 합쳐 {items}개를 검색합니다.'
for key, question in {
    'green3_1과목':'부칙을 제외한 본칙 조항을 목록으로 만들어줘',
    'green3_3과목':'조항에서 제목·본문 키워드를 검색해줘',
    'set4_3과목':'안내서비스를 카테고리별 CSV로 분리해줘',
}.items():
    SPECS[(key,0)]['question'] = question

def render_unit(unit, record, definition):
    return {**unit, 'answer': definition['answer'].format_map(record['facts']),
            'question': definition.get('question',unit['question']),
            'tip': definition.get('tip',unit['tip']).format_map(record['facts']),
            'resultId': record['id'], 'status':'로컬 실행 결과'}
