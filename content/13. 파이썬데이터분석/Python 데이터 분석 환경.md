---
title: Python 데이터 분석 환경
aliases:
  - 파이썬 데이터 분석 환경
subject: 파이썬데이터분석
type: code
level: basic
status: growing
tags:
  - Python
  - 개발환경
created: 2026-08-27
updated: 2026-08-27
publish: true
draft: false
---

# Python 데이터 분석 환경

> [!summary] 한눈에 보기
> Python 데이터 분석 환경은 Python 인터프리터, 코드 편집 도구, 패키지, 가상환경으로 구성된다. 분석을 재현하려면 코드뿐 아니라 사용한 Python과 패키지 버전도 함께 관리해야 한다.

## 왜 배우는가

같은 코드라도 Python이나 라이브러리 버전이 다르면 실행 결과나 사용 가능한 기능이 달라질 수 있다. 프로젝트마다 패키지를 분리하면 서로 다른 프로젝트의 의존성 충돌을 줄일 수 있다.

## 핵심 구성 요소

- **Python 인터프리터:** 코드를 읽고 실행한다.
- **편집기·IDE:** 코드를 작성하고 실행을 관리한다.
- **Jupyter Notebook:** 코드, 설명, 그래프를 셀 단위로 기록한다.
- **패키지:** NumPy, pandas처럼 추가 기능을 제공한다.
- **가상환경:** 프로젝트별 Python 패키지를 분리한다.

## 실행 방식

Python 파일은 일반적으로 `.py` 확장자를 사용한다.

```python
message = "데이터 분석 시작"
print(message)
```

터미널에서는 환경에 따라 다음처럼 실행한다.

```bash
python analysis.py
```

또는 다음 명령이 필요할 수 있다.

```bash
python3 analysis.py
```

명령 이름은 운영체제와 설치 방식에 따라 다르므로 실제 환경에서 확인한다.

## 가상환경의 직관

가상환경은 프로젝트마다 별도의 도구 상자를 두는 것과 같다. 프로젝트 A가 특정 pandas 버전을 요구하고 프로젝트 B가 다른 버전을 요구하더라도 서로 영향을 덜 받는다.

표준 라이브러리 `venv`를 사용하는 기본 예시는 다음과 같다.

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install pandas matplotlib
```

Windows의 활성화 명령은 셸에 따라 다르다. 패키지 설치 명령은 네트워크와 설치 권한이 필요하며, 실제 설치 여부는 실행 환경에서 확인해야 한다.

## 첫 데이터 분석 코드

```python
import pandas as pd

scores = pd.DataFrame({
    "student": ["A", "B", "C"],
    "score": [80, 95, 85],
})

mean_score = scores["score"].mean()

print(scores)
print("평균:", mean_score)
```

입력은 세 학생의 이름과 점수다. `pd.DataFrame()`은 표 형태의 데이터를 만들고, `mean()`은 `score` 열의 평균을 계산한다. 이 데이터의 평균은 손계산으로 $(80+95+85)/3=260/3$이며, 코드 결과와 비교해 검산할 수 있다.

## Notebook 사용 시 주의점

Jupyter Notebook은 셀을 임의 순서로 실행할 수 있다. 위쪽 셀을 실행하지 않았는데 아래쪽 셀이 과거 상태를 이용하면 전체 실행 시 오류가 발생할 수 있다.

재현성을 확인하려면 커널을 다시 시작한 뒤 첫 셀부터 순서대로 실행한다.

## 권장 프로젝트 구조

```text
project/
├── data/
├── notebooks/
├── src/
├── outputs/
├── requirements.txt
└── README.md
```

원자료와 생성 결과를 분리하고, 코드에서 절대경로보다 프로젝트 기준의 상대경로를 사용하면 다른 환경으로 이동하기 쉽다. 개인정보나 비공개 데이터는 공개 저장소에 포함하지 않는다.

## 자주 하는 실수

- 여러 프로젝트의 패키지를 하나의 전역 환경에 모두 설치한다.
- Notebook 셀을 뒤섞어 실행한 상태를 최종 결과로 저장한다.
- 입력 데이터 없이 코드 일부만 기록한다.
- 실행하지 않은 출력을 실행 결과처럼 작성한다.
- API 키와 비밀번호를 코드에 직접 입력한다.

## 관련 개념

- [[Python 변수와 자료형]]
- [[Python 모듈]]
- [[pandas DataFrame]]
- [[재현 가능한 분석]]
- [[파이썬데이터분석 목차]]

## 연습문제

가상환경이 필요한 이유를 패키지 버전 충돌과 재현성이라는 두 단어를 사용해 설명하라.

## 정답과 해설

> [!check]- 정답
> 프로젝트별 가상환경은 서로 다른 패키지 버전의 충돌을 줄이고, 분석에 사용한 의존성을 기록하여 다른 환경에서도 결과를 재현하기 쉽게 한다.

