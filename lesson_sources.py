"""Authoring source for independently runnable classroom examples.

Every example runs from its subject folder (or its attachment folder), reads
original inputs, and writes only to 학습출력. See test_lesson_sources.py.
"""
from textwrap import dedent

LESSONS = {}

HEADER = '''from pathlib import Path
import json, re
from collections import Counter
import pandas as pd

BASE = Path.cwd()
def source(name):
    paths = [p for p in BASE.rglob(name) if '학습출력' not in p.parts]
    if len(paths) != 1:
        raise ValueError(f'{name}: 해당 과목 폴더에서 실행하세요 ({len(paths)}개 발견)')
    return paths[0]

OUT = BASE / '학습출력'
OUT.mkdir(exist_ok=True)
'''

def lesson(key, question, answer, code, tip, expected=(), status='원본 검산'):
    # Historical reference text is a fixture only; live answers are rendered
    # from computed facts by lesson_result_schema.py.
    LESSONS.setdefault(key, []).append(dict(question=question, reference_answer=answer,
        code=HEADER+'\n'+dedent(code).strip()+'\n', tip=tip,
        expected=list(expected), status=status))

PRESS = r'''
rows = []
for path in sorted(BASE.rglob('*.md')):
    if '학습출력' in path.parts or '보도자료' not in path.parts:
        continue
    text = path.read_text(encoding='utf-8-sig')
    meta = re.search(r'<!--.*?-->', text, flags=re.S)
    if not meta:
        continue
    department = re.search(r'부서:\s*([^|]+)', meta[0])[1].strip()
    date = re.search(r'발표일:\s*(\d{4}-\d{2}-\d{2})', meta[0])[1]
    code = re.search(r'코드:\s*([^|]+)', meta[0])[1].strip()
    body = text.replace(meta[0], '').strip()
    title = re.search(r'^#\s+(.+)$', body, flags=re.M)[1]
    rows.append(dict(담당부서=department, 발표일=date, 코드=code,
                     제목=title, 본문=body, 본문길이=len(body), 청렴횟수=body.count('청렴')))
df = pd.DataFrame(rows)
assert len(df) == 5
'''
lesson('set1_1과목','메타 헤더에서 부서 종류와 가장 긴 문서의 담당부서를 찾아줘',
       '2개 부서 · 공무원행동강령과 · 최대 850자',PRESS+'''
print('부서 종류:', df['담당부서'].nunique())
longest = df.loc[df['본문길이'].idxmax()]
print('최대 문서:', longest['담당부서'], longest['본문길이'])
print('가장 빠른 발표:', df.sort_values('발표일').iloc[0]['담당부서'])
''','메타 주석을 제외한 본문 길이를 파일별로 비교합니다. 부서별 합계와 혼동하지 않습니다.',('부서 종류: 2','공무원행동강령과 850'))
lesson('set1_1과목','본문 금액·개수와 부서별 자료 수를 계산해 CSV로 저장해줘',
       '금액 합계 76억원 · 최대 243개 · 부서별 3건/2건 · 청렴 37회/7회',PRESS+r'''
text = '\n'.join(df['본문'])
amounts = [float(v.replace(',', '')) for v in re.findall(r'([\d,]+(?:\.\d+)?)\s*억\s*원', text)]
counts = [int(v.replace(',', '')) for v in re.findall(r'(\d[\d,]*)\s*개', text)]
print('금액 합계(억원):', round(sum(amounts)))
print('개수 최댓값:', max(counts))
summary = df.groupby('담당부서').agg(자료수=('본문','size'), 청렴횟수합=('청렴횟수','sum'), 평균본문길이=('본문길이','mean'))
summary['평균본문길이'] = summary['평균본문길이'].round().astype(int)
summary.sort_values('자료수',ascending=False).reset_index().to_csv(OUT/'부서별_자료수.csv',index=False,encoding='utf-8-sig')
print(summary.to_string())
''','실제 본문을 계산해 요구된 CSV 헤더로 저장합니다. 숫자를 상수로 대신 입력하지 않습니다.',('공직자윤리과','37'))
lesson('green1_1과목','보도자료 5건의 코드·발표일·담당부서·제목을 분류해줘',
       '5건 · 공무원행동강령과 3건/공직자윤리과 2건',PRESS+'''
df[['코드','발표일','담당부서','제목']].to_csv(OUT/'보도자료 분류표.csv',index=False,encoding='utf-8-sig')
print(df['담당부서'].value_counts().to_string())
''','파일별 메타 헤더를 읽고 표로 만듭니다.',('공무원행동강령과','공직자윤리과'))

INTEGRITY = '''
import numpy as np
from sklearn.model_selection import train_test_split
a = pd.read_csv(source('부패신고_현황.csv'))
b = pd.read_csv(source('청렴지수_현황.csv'))
merged = a.merge(b,on='기관코드',how='inner')
clean = merged.dropna().copy()
mask = pd.Series(True,index=clean.index)
for col in ['설문인원','평균처리일수']:
    q1,q3 = clean[col].quantile([.25,.75])
    mask &= clean[col].between(q1-1.5*(q3-q1),q3+1.5*(q3-q1))
clean = clean.loc[mask].copy()
risk = -.45*clean['청렴지수']+.08*clean['신고건수']-.012*clean['처리율']+.04*clean['평균처리일수']
noise = np.random.default_rng(251).normal(0,.5,len(clean))
clean['label'] = (((risk-risk.mean())/risk.std()+noise)>.1).astype(int)
'''
lesson('set1_2과목','기관코드 결합 후 결측치와 IQR 이상치를 정제해줘',
       '175행 → 141행',INTEGRITY+'''
print('결합:',len(merged),'정제:',len(clean))
clean.to_csv(OUT/'정제데이터_부패위험.csv',index=False,encoding='utf-8-sig')
''','IQR 경계는 결측 제거 데이터에서 두 열 각각 계산한 뒤 동시에 적용합니다.',('결합: 175 정제: 141',))
lesson('set1_2과목','기관유형별 평균 청렴지수와 라벨 1 평균을 계산해줘',
       '광역지자체 · 라벨 1 평균 7.2066 → 7 · 테스트 13행',INTEGRITY+'''
print('평균 청렴지수 1위 유형:',clean.groupby('기관유형')['청렴지수'].mean().idxmax())
avg = clean.loc[clean.label==1,'청렴지수'].mean()
print(f'라벨 1 평균: {avg:.4f} / 반올림: {round(avg)}')
_,test = train_test_split(clean,test_size=.2,random_state=42,stratify=clean.label)
print('테스트 라벨 1:',int(test.label.sum()))
''','광역지자체는 기관유형입니다. 평균 청렴지수 순위는 개별 기관의 부패위험 순위가 아닙니다.',('광역지자체','7.2066','테스트 라벨 1: 13'))

PROJECTS = "df = pd.read_csv(source('2026_자치행정사업.csv'))\ntop = df.loc[df['예산_억원'].idxmax()]\n"
lesson('set2_1과목','예산 1위 사업과 협력지자체 수를 확인해줘',
       'L26-018 · 협력거버넌스 · 359억원 · 9곳 · 전체 예산 2,285억원',PROJECTS+'''
print(top[['사업번호','분야','예산_억원','협력지자체수']].to_string())
print('협력지자체 10곳 이상인 사업:',int((df['협력지자체수']>=10).sum()))
print('담당부서 종류:',df['담당부서'].nunique())
print('전체 예산:',int(df['예산_억원'].sum()))
summary = df.groupby('분야').agg(사업수=('사업번호','size'),예산합계_억원=('예산_억원','sum'))
summary.sort_values('예산합계_억원',ascending=False).reset_index().to_csv(OUT/'분야별집계.csv',index=False,encoding='utf-8-sig')
''','9는 1위 사업의 협력지자체 수, 7은 협력지자체 10곳 이상인 사업의 개수입니다.',('L26-018','359','전체 예산: 2285'))
lesson('green2_1과목','협력사업 보고서에서 예산 1위 사업을 찾아줘',
       'L26-018 · 관계기관 협의체 · 359억원',r'''
text = source('2026_자치행정사업_보고서.md').read_text(encoding='utf-8-sig')
projects = []
for block in re.split(r'(?m)^### ',text)[1:]:
    heading = re.match(r'(L26-\d+)\s*—\s*(.+)',block)
    budget = re.search(r'예산:\s*(?:\*\*)?(\d[\d,]*)억원',block)
    if heading and budget:
        projects.append((heading[1],heading[2],int(budget[1].replace(',',''))))
top = max(projects,key=lambda row:row[2])
print('예산 1위:',*top)
(OUT/'카드뉴스_문안.md').write_text(f'# 예산 1위 사업\n{top[0]} {top[1]}: {top[2]}억원\n',encoding='utf-8')
''','보고서는 상위 5건 요약입니다. 전체 20건 집계와 요약 보고서의 범위를 구별합니다.',('L26-018 관계기관 협의체 359',))

LOCAL_PROJECTS = '''
from sklearn.model_selection import train_test_split
a = pd.read_csv(source('자치행정사업.csv'),dtype={'시도코드':str})
b = pd.read_csv(source('자치단체_마스터.csv'),dtype={'시도코드':str})
for frame in [a,b]:
    frame['시도코드'] = frame['시도코드'].str.zfill(2)
merged = a.merge(b,on='시도코드',how='inner')
before = merged.groupby('시도명')['총사업비_억원'].mean()
clean = merged.dropna(subset=['총사업비_억원','시민참여수'],how='all').copy()
for col in ['총사업비_억원','시민참여수']:
    clean[col] = clean[col].fillna(clean[col].mean())
clean = clean[clean['총사업비_억원']<=200].copy()
clean['label'] = (clean['시민참여수']>=clean['시민참여수'].median()).astype(int)
'''
lesson('set2_2과목','결합 직후와 정제 후의 총사업비 평균 1위를 비교해줘',
       '정제 전 서울특별시 · 정제 후 전라남도 · 정제 240행',LOCAL_PROJECTS+'''
after = clean.groupby('시도명')['총사업비_억원'].mean()
print('정제 전:',before.idxmax(),round(before.max(),4))
print('정제 후:',after.idxmax(),round(after.max(),4))
print('정제 행 수:',len(clean))
''','문제 문항 2는 정제 전 결과를 묻습니다. 시민참여 라벨은 사업 중단 여부가 아닙니다.',('정제 전: 서울특별시 166.8','정제 후: 전라남도','정제 행 수: 240'))
lesson('set2_2과목','시민참여 라벨을 만들고 테스트셋과 지표.csv를 산출해줘',
       '라벨 1 평균 사업비 반올림 99 · 테스트 라벨 1 24행',LOCAL_PROJECTS+'''
print('라벨 1 평균 사업비:',round(clean.loc[clean.label==1,'총사업비_억원'].mean()))
_,test = train_test_split(clean,test_size=.2,random_state=42,stratify=clean.label)
print('테스트 라벨 1:',int(test.label.sum()))
summary = clean.groupby('시도명').label.agg(사업수='size',라벨1수='sum',라벨1비율='mean')
summary = summary.reindex(b['시도명'].drop_duplicates(),fill_value=0)
summary.sort_values('라벨1비율',ascending=False).reset_index().to_csv(OUT/'지표.csv',index=False,encoding='utf-8-sig')
''','두 값이 모두 결측인 행만 제거하고, 한쪽 결측은 평균으로 채운 뒤 200억원 초과 행을 제거합니다.',('사업비: 99','테스트 라벨 1: 24'))

LAW = "text = source('가상_행정정보통합관리법.md').read_text(encoding='utf-8-sig')\n"
lesson('set3_1과목','법 본문에서 외부 법령 인용 종류와 빈도를 집계해줘',
       '6종 · 개인정보 보호법 3회',LAW+r'''
counts = Counter(re.findall(r'「([^」]+)」',text))
print('인용 법령 종류:',len(counts))
print('최다 인용:',*counts.most_common(1)[0])
pd.DataFrame(counts.most_common(),columns=['법령명','등장횟수']).to_csv(OUT/'외부법령_빈도.csv',index=False,encoding='utf-8-sig')
''','닫는 괄호까지 추출하면 법/법률로 끝나는 이름을 모두 보존합니다.',('법령 종류: 6','개인정보 보호법 3'))
lesson('green3_1과목','부칙을 제외하고 본칙 조항 14개를 목록으로 만들어줘',
       '제1조~제14조 · 14개',LAW+r'''
main = re.split(r'부\s*칙',text,maxsplit=1)[0]
articles = re.findall(r'(?ms)^(제\d+조)(\(.*?)(?=^제\d+조|^\s*제\d+장|\Z)',main)
table = pd.DataFrame([(i+1,n,body.strip()) for i,(n,body) in enumerate(articles)],columns=['순번','조항번호','조항내용'])
table.to_csv(OUT/'본칙조항목록.csv',index=False,encoding='utf-8-sig')
print('본칙 조항:',len(table))
''','제1조(목적)처럼 조 번호와 괄호 사이 공백이 없는 원문 형식에 맞춥니다.',('본칙 조항: 14',))

VOLUNTEERS = '''
from sklearn.model_selection import train_test_split
a = pd.read_csv(source('자원봉사프로그램.csv'))
b = pd.read_csv(source('모집분야_지표.csv'))
clean = a.merge(b,on='모집분야',how='inner').dropna(subset=['위도','경도']).copy()
clean['label'] = clean['모집대상'].str.contains('청소년',na=False).astype(int)
'''
lesson('set3_2과목','모집분야로 결합해 청소년 포함 프로그램을 분석해줘',
       '3,213행 · 청소년 1,224건 · 환경ㆍ생태계보호 · 라벨 1 등록기관 평균 486 · 테스트 245행',VOLUNTEERS+'''
print('정제:',len(clean),'청소년:',int(clean.label.sum()))
groups = clean.groupby('모집분야').label.agg(['size','mean'])
print('30건 이상 중 최고:',groups.loc[groups['size']>=30,'mean'].idxmax())
print('라벨 1 등록기관수 평균 반올림:',round(clean.loc[clean.label==1,'등록기관수'].mean()))
_,test = train_test_split(clean,test_size=.2,random_state=42,stratify=clean.label)
print('테스트 라벨 1:',int(test.label.sum()))
clean.to_csv(OUT/'처리완료_데이터.csv',index=False,encoding='utf-8-sig')
''','모집대상으로 라벨을 만들고 위도·경도 결측만 제거합니다.',('정제: 3213 청소년: 1224','테스트 라벨 1: 245'))
lesson('set3_2과목','동일 분할로 4개 모델의 Macro F1을 비교해줘',
       'Random Forest · Macro F1 0.7249',VOLUNTEERS+'''
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.metrics import f1_score
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
num = ['위도','경도','등록기관수','프로그램수','청소년포함비율','비대면비율']
cat = ['모집분야','활동유형']
xt,xv,yt,yv = train_test_split(clean[num+cat],clean.label,test_size=.2,random_state=42,stratify=clean.label)
models = {
    'Logistic Regression':LogisticRegression(random_state=42,max_iter=1000),
    'Decision Tree':DecisionTreeClassifier(random_state=42,max_depth=5),
    'Random Forest':RandomForestClassifier(random_state=42,n_estimators=100),
    'Gradient Boosting':GradientBoostingClassifier(random_state=42,n_estimators=100)
}
results = []
for name,model in models.items():
    prep = ColumnTransformer([('num',StandardScaler(),num),('cat',OneHotEncoder(handle_unknown='ignore'),cat)])
    pipe = Pipeline([('preprocess',prep),('model',model)]).fit(xt,yt)
    score = f1_score(yv,pipe.predict(xv),average='macro')
    results.append({'Model':name,'Macro_F1':round(score,4)})
table = pd.DataFrame(results)
table.to_csv(OUT/'f1_macro_comparison.csv',index=False,encoding='utf-8-sig')
print(table.to_string(index=False))
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
table.plot.bar(x='Model',y='Macro_F1',legend=False,ylim=(0,1))
plt.tight_layout()
plt.savefig(OUT/'f1_macro_comparison.png')
plt.close()
''','average="macro"를 명시합니다. 이전 기록의 0.6479는 binary F1으로 다른 지표입니다.',('0.5469','0.5614','0.7249','0.6322'))

CAMPAIGN = r'''
text = source('생활안전_캠페인_사례집.md').read_text(encoding='utf-8-sig')
cases = re.findall(r'^### 사례 \d+\.',text,flags=re.M)
total = sum(int(v.replace(',','')) for v in re.findall(r'참여인원:\s*([\d,]+)',text))
awards = Counter(re.findall(r'표창등급:\s*(\S+)',text))
print('우수사례:',len(cases),'선정 사례 참여합:',total)
print('최다 표창:',*awards.most_common(1)[0])
annual = int(re.search(r'누적 참여 인원은\s*(?:\*\*)?(\d[\d,]*)명',text)[1].replace(',',''))
print('연간 누적 참여:',annual)
'''
for key in ['set4_1과목','green4_1과목']:
    lesson(key,'선정 사례 수·참여합·최다 표창을 집계하고 요약해줘',
           '12사례 · 선정 사례 94,300명 · 시장표창 5건 · 연간 누적 234만 명',CAMPAIGN+'''
summary = f'# 생활안전 캠페인\\n선정 {len(cases)}사례 참여합 {total:,}명\\n최다 표창: {awards.most_common(1)[0][0]}\\n연간 누적 참여: {annual:,}명\\n'
(OUT/'정책브리핑.md').write_text(summary,encoding='utf-8')
''','선정 사례의 합계와 전국 연간 누적 인원을 구별합니다.',('우수사례: 12 선정 사례 참여합: 94300','시장표창 5'))

RESERVATIONS = '''
from sklearn.model_selection import train_test_split
a = pd.read_csv(source('공공시설_예약현황.csv'))
b = pd.read_csv(source('시설유형_통계.csv'))
merged = a.merge(b,on='시설유형',how='inner')
merged['label'] = (merged['노쇼여부']=='노쇼').astype(int)
clean = merged[merged['예약대기일'].notna() & (merged['예약대기일']>=0)].copy()
'''
lesson('set4_2과목','시설유형 결합·정제 후 노쇼 비율과 평균 대기일을 계산해줘',
       '1,496행 · 회의실 · 노쇼 평균 18일 · 테스트 158행',RESERVATIONS+'''
print('정제:',len(clean))
print('결합 후 노쇼율 1위:',merged.groupby('시설유형').label.mean().idxmax())
print('노쇼 집단 평균 대기일:',round(clean.loc[clean.label==1,'예약대기일'].mean()))
print('전체 평균 대기일:',round(clean['예약대기일'].mean()))
_,test = train_test_split(clean,test_size=.2,random_state=42,stratify=clean.label)
print('테스트 라벨 1:',int(test.label.sum()))
clean.to_csv(OUT/'처리완료_데이터.csv',index=False,encoding='utf-8-sig')
''','노쇼 라벨을 먼저 만듭니다. 노쇼 집단 평균 18일과 전체 평균 15일은 다릅니다.',('정제: 1496','노쇼 집단 평균 대기일: 18','테스트 라벨 1: 158'))

ELEVATOR = '''
from sklearn.model_selection import train_test_split
a = pd.read_csv(source('승강기_중대한고장_샘플.csv'))
a = a.dropna(subset=['고장발생일','주소']).copy()
a['시도'] = a['주소'].str.split().str[0]
a['시군구'] = a['주소'].str.split().str[1]
a['연도'] = a['고장발생일'].str[:4].astype(int)
a['최근_여부'] = (a['연도']>=2020).astype(int)
clean = a.merge(pd.read_csv(source('시도_고장지표.csv')),on='시도',how='inner')
'''
lesson('set5_2과목','시도 결합 후 최근 고장 비율·건물명 길이·테스트 수를 계산해줘',
       '3,000행 · 세종특별자치시 · 9자 · 테스트 472행',ELEVATOR+'''
print('결합:',len(clean))
groups = clean.groupby('시도')['최근_여부'].agg(['size','mean'])
print('30건 이상 최고:',groups.loc[groups['size']>=30,'mean'].idxmax())
print('최근 고장 건물명 길이:',round(clean.loc[clean['최근_여부']==1,'건물명'].str.len().mean()))
_,test = train_test_split(clean,test_size=.2,random_state=42,stratify=clean['최근_여부'])
print('테스트 최근 고장:',int(test['최근_여부'].sum()))
clean.to_csv(OUT/'처리결과_승강기_고장데이터.csv',index=False,encoding='utf-8-sig')
''','발생 연도와 최근_여부 열도 함께 저장합니다. 기존 F1 0.5753은 학습 설정 부족으로 재현 미확인입니다.',('결합: 3000','세종특별자치시','테스트 최근 고장: 472'))

FACTS = r'''
text = source('2026_안전점검_보고서.md').read_text(encoding='utf-8-sig')
patterns = {
    '총점검건수':r'(?:450|440)(?=건)',
    '지적사항수':r'(?:120|115)(?=건)',
    '시정완료율':r'(?:85|82)(?=%)',
    '예산집행률':r'(?:92|90)(?=%)',
    '총괄책임자':r'권혁[수주]'
}
rows = []
for name,pattern in patterns.items():
    counts = Counter(re.findall(pattern,text))
    values = counts.most_common()
    rows.append([name,values[0][0],values[1][0],values[0][1],values[1][1],'Y' if len(values)>1 else 'N'])
table = pd.DataFrame(rows,columns=['사실명','다수값','소수값','다수값_등장수','소수값_등장수','불일치여부'])
print(table.to_string(index=False))
print('두 값이 출현한 사실유형:',int((table['불일치여부']=='Y').sum()))
table.to_csv(OUT/'정합성표.csv',index=False,encoding='utf-8-sig')
'''
for key in ['set5_1과목','green5_1과목']:
    lesson(key,'보고서의 5개 사실유형별 값과 출현 횟수를 대조해줘',
           '시험 규칙상 5개 값 쌍 · 점검건수 차이 10건',FACTS,
           '이 정규식은 제공된 가상 보고서 전용입니다. 두 값 출현 시 Y라는 시험 규칙과 실제 문맥상 모순 판정은 구별합니다.',('사실유형: 5','권혁수','권혁주'))

lesson('green1_2과목','전국 행을 제외한 시도 인구를 정리해줘',
       '17개 시도 · 경기도 13,730,135명',r'''
df = pd.read_csv(source('주민등록_인구현황_2025.csv'))
df['행정구역'] = df['행정구역'].str.replace(r'\s*\(.*\)','',regex=True).str.strip()
df['총인구수'] = df['2025년_총인구수'].astype(str).str.replace(',','').astype(int)
print('전국 인구:',int(df.loc[df['행정구역']=='전국','총인구수'].iloc[0]))
regions = df[df['행정구역']!='전국'][['행정구역','총인구수']].sort_values('총인구수',ascending=False)
print('시도 수:',len(regions))
print('최대 인구:',regions.iloc[0]['행정구역'],int(regions.iloc[0]['총인구수']))
print('200만 미만:',int((regions['총인구수']<2000000).sum()))
print('광역시:',int(regions['행정구역'].str.contains('광역시').sum()))
print('시도 평균:',round(regions['총인구수'].mean()))
regions.to_csv(OUT/'인구표.csv',index=False,encoding='utf-8-sig')
''','원본 열 이름 2025년_총인구수와 행정구역을 사용합니다.',('시도 수: 17','경기도 13730135'))
lesson('green2_2과목','시도별 시군구 수와 인구를 집계해줘',
       '100행 · 경기도 27개 · 서울 18개 · 인구 1위 노원구',r'''
df = pd.read_csv(source('가상_시군구_인구현황.csv'))
counts = df.groupby('시도').size().sort_values(ascending=False).rename('시군구수')
print('전체:',len(df))
print(counts.to_string())
print('인구 1위:',df.loc[df['인구'].idxmax(),'시군구'])
print('30만 이상:',int((df['인구']>=300000).sum()))
counts.reset_index().to_csv(OUT/'시도별_시군구수.csv',index=False,encoding='utf-8-sig')
''','원본 열은 시도/시군구입니다. 이름이 비슷해도 다른 열 이름으로 접근할 수 없습니다.',('전체: 100','노원구','30만 이상: 37'))
lesson('green3_2과목','봉사분야·봉사자유형 결측 기준으로 정제하고 집계해줘',
       '3,621건 · 22분야 · 3유형 · 청소년 1,435건',r'''
df = pd.read_csv(source('자원봉사프로그램.csv'))
clean = df.dropna(subset=['봉사분야','봉사자유형'])
print('정제:',len(clean),'분야:',clean['봉사분야'].nunique(),'유형:',clean['봉사자유형'].nunique())
print('청소년:',int(clean['봉사자유형'].str.contains('청소년',na=False).sum()))
counts = clean['봉사분야'].value_counts()
print('최다 분야:',counts.index[0],int(counts.iloc[0]))
print('위도·경도 결측:',df[['위도','경도']].isna().sum().to_dict())
counts.rename_axis('봉사분야').reset_index(name='프로그램수').to_csv(OUT/'통계표.csv',index=False,encoding='utf-8-sig')
''','필수 두 열의 결측은 0건이지만 위도/경도는 각각 408건 결측입니다. 임의 중복 제거를 추가하지 않습니다.',('정제: 3621 분야: 22 유형: 3','청소년: 1435','생활편의 1245'))
lesson('green4_2과목','문제지 원본 기준 정답과 추가 정제 통계를 구분해줘',
       '원본 1,500건/노쇼 790건 · 정제 1,476건/774건',r'''
df = pd.read_csv(source('공공시설_예약현황.csv'))
print('원본:',len(df),'노쇼:',int(df['노쇼여부'].eq('노쇼').sum()))
print('최다 시설:',df['시설유형'].value_counts().idxmax())
print('음수 제외 평균 대기일:',round(df.loc[df['예약대기일']>=0,'예약대기일'].mean()))
print('결측 제외 평균 이용인원:',round(df['이용인원'].mean()))
extra = df.dropna()
extra = extra[extra['예약대기일']>=0]
print('추가 정제:',len(extra),'노쇼:',int(extra['노쇼여부'].eq('노쇼').sum()))
extra.to_csv(OUT/'추가정제_참고통계.csv',index=False,encoding='utf-8-sig')
''','문항 1·2는 원본 기준입니다. 노쇼 문자열을 sum하지 않고 eq("노쇼")의 참 개수를 셉니다.',('원본: 1500 노쇼: 790','추가 정제: 1476 노쇼: 774'))
lesson('green5_2과목','고장일·주소에서 시도와 연도를 추출해줘',
       '3,000행 · 경기도 652건 · 2020년 이상 2,358건',r'''
df = pd.read_csv(source('승강기_중대한고장_샘플.csv'))
df = df.dropna(subset=['고장발생일','주소']).copy()
df['시도명'] = df['주소'].str.split().str[0]
df['연도'] = df['고장발생일'].str[:4].astype(int)
counts = df['시도명'].value_counts()
print('행수:',len(df),'시도명 종류:',df['시도명'].nunique(),'연도 종류:',df['연도'].nunique())
print('최다:',counts.index[0],int(counts.iloc[0]))
print('2020년 이상:',int((df['연도']>=2020).sum()))
df.to_csv(OUT/'승강기_정제.csv',index=False,encoding='utf-8-sig')
''','약식/정식 주소를 임의 통합하지 않습니다. 첫 단어 기준 시도명은 31종입니다.',('행수: 3000','경기도 652','이상: 2358'))

REAL_CASE = r'''
text = source('자원봉사_우수사례집.md').read_text(encoding='utf-8-sig')
total = int(re.search(r'누적 자원봉사 참여자는\s*\*\*([\d,]+)명',text)[1].replace(',',''))
awards = Counter(re.findall(r'표창등급:\s*(\S+)',text))
top,count = awards.most_common(1)[0]
print('누적 참여자:',total)
print('최다 표창:',top,count,f'{count/sum(awards.values())*100:.2f}%')
'''
lesson('set7_1과목','사례집의 누적 참여자와 최다 표창을 추출해줘',
       '1,248,000명 · 구청장표창 5건/41.67%',REAL_CASE,
       '사례별 참여합이 아니라 본문에 명시된 연간 누적값을 읽습니다.',('누적 참여자: 1248000','구청장표창 5 41.67%'))
lesson('set7_1과목','참고 통계와 회의록에서 등록 봉사자·시상 분야·절차를 찾아줘',
       '2024년 1,486만 명 · 5개 분야 · 4단계',r'''
stats = source('참고1_2024_자원봉사_통계.md').read_text(encoding='utf-8-sig')
row = next(line for line in stats.splitlines() if line.startswith('| 등록 자원봉사자 수 |'))
value_2024 = row.split('|')[3].strip()
print('2024 등록(만 명):',int(re.search(r'[\d,]+',value_2024)[0].replace(',','')))
minutes = source('참고3_자원봉사시상식_회의록.md').read_text(encoding='utf-8-sig')
fields = int(re.search(r'시상 분야\s*:\s*(\d+)개',minutes)[1])
steps = int(re.search(r'우수기관 선정 절차\s*(\d+)단계',minutes)[1])
print('시상 분야:',fields,'선정 절차:',steps)
''','Markdown 표에서 2024년 열을 선택하고 쉼표를 제거합니다.',('2024 등록(만 명): 1486','시상 분야: 5 선정 절차: 4'))

FACILITY = '''
from sklearn.model_selection import train_test_split
a = pd.read_csv(source('체육시설_인허가현황.csv'))
b = pd.read_csv(source('자치구_상권통계.csv'))
merged = a.merge(b,on='자치구',how='inner')
clean = merged[merged['연면적'].notna() & (merged['연면적']>0)].copy()
clean['label'] = clean['영업상태'].eq('폐업').astype(int)
'''
lesson('set7_2과목','체육시설을 정제하고 폐업률·집단별 평균 연면적을 계산해줘',
       '1,965행 · 도봉구 91.67% · 폐업 1,279㎡/전체 1,533㎡',FACILITY+'''
rates = clean.groupby('자치구').label.mean()
print('정제:',len(clean))
print('폐업률 1위:',rates.idxmax(),f'{rates.max()*100:.2f}%')
print('폐업 집단 평균:',round(clean.loc[clean.label==1,'연면적'].mean()))
print('전체 평균:',round(clean['연면적'].mean()))
clean.to_csv(OUT/'processed_data.csv',index=False,encoding='utf-8-sig')
''','반올림에는 round를 사용합니다. int는 버림이며, 전체 평균과 폐업 집단 평균도 다릅니다.',('정제: 1965','도봉구 91.67%','폐업 집단 평균: 1279','전체 평균: 1533'))
lesson('set7_2과목','층화 80:20 분할 후 RandomForest 변수 중요도를 계산해줘',
       '테스트 폐업 214행 · 연면적 37.03% · 사업체수 21.66%',FACILITY+'''
from sklearn.ensemble import RandomForestClassifier
cols = ['연면적','인허가연도','임대료지수','사업체수']
xt,xv,yt,yv = train_test_split(clean[cols],clean.label,test_size=.2,random_state=42,stratify=clean.label)
print('테스트 폐업:',int(yv.sum()))
model = RandomForestClassifier(n_estimators=100,random_state=42).fit(xt,yt)
for col,importance in zip(cols,model.feature_importances_):
    print(col,f'{importance*100:.2f}%')
''','이 코드는 층화 홀드아웃 분할입니다. 여러 fold를 반복하는 교차검증이 아닙니다.',('테스트 폐업: 214','연면적 37.03%','사업체수 21.66%'))

lesson('set1_3과목','사건·교육 원본을 읽어 요약 CSV를 생성해줘',
       '사건 500건 · 교육 120기관 · 요약 CSV 1개',r'''
incidents = pd.read_csv(source('청렴신고_사건데이터.csv'))
education = pd.read_csv(source('청렴교육_현황.csv'))
rows = [
    ['기본통계','총 신고 사건 수',len(incidents)],
    ['기본통계','처리 완료 사건 수',int(incidents['처리상태'].eq('처리완료').sum())],
    ['기본통계','평균 처리기간(일)',round(incidents['처리기간_일'].mean())]
]
rows += [['신고유형별 사건 수',name,int(count)] for name,count in incidents['신고유형'].value_counts().items()]
rows += [['기관유형별 평균 이수율',name,round(value,2)] for name,value in education.groupby('기관유형')['교육이수율'].mean().items()]
pd.DataFrame(rows,columns=['구분','항목','값']).to_csv(OUT/'결과_요약.csv',index=False,encoding='utf-8-sig')
print('사건:',len(incidents),'교육:',len(education),'요약 CSV: 1')
''','원본 solution.py의 과제는 여러 CSV로 분리하는 것이 아니라 두 원본을 집계하는 것입니다.',('사건: 500 교육: 120 요약 CSV: 1',))
lesson('set2_3과목','신청서 MD를 지자체별 폴더에 복사하고 분류표를 만들어줘',
       '신청서 10건 · 지자체 10개',r'''
import shutil
applications = next(BASE.rglob('신청서'))
counts = Counter()
for path in sorted(applications.glob('*.md')):
    text = path.read_text(encoding='utf-8-sig')
    match = re.search(r'<!--\s*지자체\s*:\s*(.*?)\s*-->',text)
    if not match:
        match = re.search(r'-\s*지자체\s*:\s*(.+)',text)
    name = match[1].strip()
    if not re.fullmatch(r'[가-힣A-Za-z0-9 _-]+',name):
        raise ValueError('허용하지 않는 지자체 경로')
    destination = OUT/'출력_지자체별'/name
    destination.mkdir(parents=True,exist_ok=True)
    shutil.copy2(path,destination/path.name)
    counts[name] += 1
pd.DataFrame(counts.items(),columns=['지자체명','파일수']).to_csv(OUT/'결과_분류현황.csv',index=False,encoding='utf-8-sig')
print('신청서:',sum(counts.values()),'지자체:',len(counts))
''','원본 MD 파일은 이동·삭제하지 않고 복사합니다. 출력 경로는 학습출력 아래로 제한합니다.',('신청서: 10 지자체: 10',))

def filter_json(filename, keyword, id_field, output):
    return f'''
items = json.loads(source({filename!r}).read_text(encoding='utf-8-sig'))
keyword = {keyword!r}
filtered = [item for item in items if keyword in item['제목'] or keyword in item['본문']]
print('전체:',len(items),'검색:',len(filtered))
pd.DataFrame(filtered,columns={[id_field,'제목','본문']!r}).to_csv(OUT/{output!r},index=False,encoding='utf-8-sig')
'''
lesson('set3_3과목','조항 JSON에서 과태료 조항을 제목·본문으로 검색해 저장해줘',
       '전체 15개 · 과태료 1개',filter_json('조항데이터.json','과태료','조','결과_과태료.csv'),
       'JSON 키는 장이 아니라 조입니다. 본칙 14개와 부칙 1개를 합쳐 15개입니다.',('전체: 15 검색: 1',))
lesson('green3_3과목','조항 15개에서 제목·본문 키워드를 검색해줘',
       '조항 15개 · 제목/본문 검색',filter_json('조항데이터.json','개인정보','조','검색결과.csv'),
       '내용이라는 키는 없습니다. 원본의 제목·본문을 사용합니다.',('전체: 15',))
for key in ['set5_3과목','green5_3과목']:
    lesson(key,'장 데이터의 제목·본문에서 점검 키워드를 찾아줘',
           '5개 장 · 점검 검색 5개',filter_json('장데이터.json','점검','장','결과_점검.csv'),
           'CSV 저장과 외부 Sheets 연결은 별개의 작업입니다. Sheets 원격 로드는 미검증입니다.',('전체: 5 검색: 5',))

def split_csv(filename, column, outdir):
    return f'''
df = pd.read_csv(source({filename!r}))
folder = OUT/{outdir!r}
folder.mkdir(exist_ok=True)
for name,group in df.groupby({column!r}):
    if not re.fullmatch(r'[가-힣A-Za-z0-9 _-]+',str(name)):
        raise ValueError('허용하지 않는 분류 경로')
    group.to_csv(folder/f'{{name}}.csv',index=False,encoding='utf-8-sig')
print('원본 행:',len(df),'분류 CSV:',df[{column!r}].nunique())
'''
lesson('set4_3과목','안내서비스 24건을 카테고리별 CSV로 분리해줘',
       '24건 · 카테고리 CSV 7개',split_csv('안내서비스.csv','카테고리','출력_카테고리별'),
       'append 대신 그룹별로 덮어써서 예제를 다시 실행해도 행이 중복되지 않습니다.',('원본 행: 24 분류 CSV: 7',))
lesson('set7_3과목','모집공고를 분야별 CSV로 분리하고 모집인원을 합산해줘',
       '40공고 · 모집인원 1,295명 · CSV 7개',split_csv('모집공고.csv','분야','출력_분야별')+"print('모집인원 합:',int(df['모집인원'].sum()))\n",
       '공고 수와 모집인원 합계를 구분합니다. 외부 배포는 이 코드에서 수행하지 않습니다.',('원본 행: 40 분류 CSV: 7','모집인원 합: 1295'))

lesson('green2_3과목','신청목록의 인구수×10 한도로 승인/반려를 판정해줘',
       '10건 · 한도 이하 승인/초과 반려',r'''
items = json.loads(source('신청목록.json').read_text(encoding='utf-8-sig'))
for item in items:
    item['한도액'] = item['인구수']*10
    item['판정'] = '승인' if item['신청액']<=item['한도액'] else '반려'
print('판정 완료:',len(items))
print(pd.DataFrame(items).to_string(index=False))
(OUT/'판정결과.json').write_text(json.dumps(items,ensure_ascii=False,indent=2),encoding='utf-8')
''','한도와 같은 금액은 승인입니다. 이 예제는 판정 로직이며 웹 배포 완료를 뜻하지 않습니다.',('판정 완료: 10',))
lesson('green4_3과목','안내서비스 목록을 서비스명·안내분야로 검색해줘',
       '24개 서비스 · 두 필드 검색',r'''
items = json.loads(source('안내서비스_목록.json').read_text(encoding='utf-8-sig'))
keyword = '안내'
results = [item for item in items if keyword in item['서비스명'] or keyword in item['안내분야']]
print('전체 서비스:',len(items),'검색 결과:',len(results))
(OUT/'검색결과.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
''','웹 UI의 필터와 같은 필드로 검색합니다. 검색과 분야 선택을 함께 쓰면 조건을 모두 만족해야 합니다.',('전체 서비스: 24',))

lesson('green1_3과목','보도자료를 HTML로 만들고 제목·섹션·목록·인용구를 확인해줘',
       '보도자료 1건 · 인사 인센티브/채용제도 개선 2개 섹션',r'''
from html import escape
from html.parser import HTMLParser
class Structure(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = Counter()
    def handle_starttag(self,tag,attrs):
        self.tags[tag] += 1
raw = source('보도자료_125874.md').read_text(encoding='utf-8-sig')
title = re.search(r'^#\s+(.+)',raw,re.M)[1]
# Provided source uses escaped >> section headings, not standard Markdown ##.
blocks = re.split(r'(?m)^\\?>>\s*',raw)
assert len(blocks)==4
sections = []
for label,block in zip(['인사 인센티브','채용제도 개선'],blocks[1:3]):
    bullets = re.findall(r'(?m)^\*\*(.+?)\*\*:\s*(.+)$',block)
    items = ''.join(f'<li><strong>{escape(a)}</strong>: {escape(b)}</li>' for a,b in bullets)
    sections.append(f'<section><h2>{label}</h2><ul>{items}</ul></section>')
quote = next(line for line in raw.splitlines() if line.startswith('윤호중 행정안전부 장관은'))
html = ('<!doctype html><html lang="ko"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        f'<title>{escape(title)}</title>'
        '<style>body{max-width:850px;margin:auto;padding:24px;font:16px/1.8 sans-serif;overflow-wrap:anywhere}li{margin:12px 0}blockquote{border-left:4px solid #2563eb;padding-left:18px}</style>'
        f'</head><body><h1>{escape(title)}</h1>'+''.join(sections)
        +f'<blockquote>{escape(quote)}</blockquote></body></html>')
(OUT/'index.html').write_text(html,encoding='utf-8')
parser = Structure()
parser.feed(html)
for tag in ['title','h1','section','ul','blockquote']:
    assert parser.tags[tag]>0, f'{tag} 누락'
assert '인사교류' in html and '채용제도' in html
assert '지방인사제도과' in raw
print('보도자료: 1 / 내용 섹션:',parser.tags['section'])
print('제목·H1·목록·인용구 확인')
''','제공된 보도자료 형식 전용 변환 예제입니다. 일반 Markdown 전체를 지원하는 변환기는 아닙니다. 저장 후 실제 배포·접속 확인은 별도로 해야 합니다.',('보도자료: 1 / 내용 섹션: 2',))
