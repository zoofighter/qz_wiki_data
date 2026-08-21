---
title: Quartz 게시 가이드
type: reference
status: growing
created: 2026-08-21
updated: 2026-08-21
publish: true
draft: false
---

# Quartz 게시 가이드

Quartz는 Markdown 기반 지식 위키를 정적 웹사이트로 만드는 도구입니다. 이 볼트는 형제 폴더 `qz_wiki_data`의 Quartz 5 프로젝트와 연결되어 있습니다.

## 현재 구성

- Quartz 프로젝트: `qz_wiki_data/`
- Obsidian 원본 볼트: `wiki_data/`
- 콘텐츠 연결: `npm run sync-content`로 공개 노트만 `qz_wiki_data/content`에 복사
- 홈페이지: `wiki_data/index.md`
- 공개 조건: `publish: true`와 `draft: false`
- 제외 폴더: `10. Raw 자료/`, `90. 템플릿/`, `99. 초안/`
- 디자인: 좌측 탐색, 중앙 본문, 우측 목차와 역링크를 사용하는 순수 Wiki 스타일

## 권장 공개 흐름

1. 현재 Obsidian 볼트를 원본 지식 저장소로 유지합니다.
2. 별도 `qz_wiki_data` 폴더에서 Quartz 코드와 설정을 관리합니다.
3. `npm run sync-content`로 `publish: true`, `draft: false`인 노트만 배포 저장소에 복사합니다.
4. 로컬 빌드에서 링크, 수식, callout, 이미지를 확인합니다.
5. GitHub Pages, Cloudflare Pages 또는 다른 정적 호스팅에 배포합니다.

## 공개 속성

```yaml
publish: true
draft: false
```

> [!warning] 공개 필터
> 위 속성을 적는 것만으로 파일이 자동 보호된다고 가정하지 마세요. Quartz 설정에서 실제 필터 규칙을 구현하고 빌드 결과를 확인해야 합니다.

## 공개하지 않을 내용

- 개인정보와 학번
- API 키와 비밀번호
- 비공개 수업 자료
- 재배포 권한이 없는 데이터와 이미지
- 대용량 원본 데이터와 모델 가중치
- 로컬 컴퓨터의 개인 경로

## 배포 전 체크리스트

- [ ] 공개 대상과 비공개 대상을 분리했는가?
- [ ] `[[내부 링크]]`가 정상적으로 연결되는가?
- [ ] 수식과 표가 정상적으로 보이는가?
- [ ] 이미지가 누락되지 않았는가?
- [ ] 잘못된 frontmatter가 없는가?
- [ ] 출처와 라이선스를 확인했는가?
- [ ] 모바일 화면에서도 읽기 쉬운가?
- [ ] 로컬 Quartz 빌드가 성공하는가?

## 로컬 확인

볼트 변경 내용을 Quartz 프로젝트에 반영합니다.

```bash
cd ../qz_wiki_data
npm run sync-content
```

그다음 로컬 서버를 실행합니다.

```bash
node quartz/bootstrap-cli.mjs build --serve --port 8081 --wsPort 3002
```

정적 파일만 다시 생성하려면 다음 명령을 사용합니다.

```bash
node quartz/bootstrap-cli.mjs build
```

현재 배포 주소는 `zoofighter.github.io/qz_wiki_data/`로 설정되어 있습니다. `zoofighter/qz_wiki_data` 저장소의 `main` 브랜치에 푸시하면 GitHub Actions가 Quartz를 빌드하고 GitHub Pages에 배포합니다.

## GitHub Pages 배포 순서

1. Obsidian에서 공개 노트를 수정합니다.
2. `qz_wiki_data`에서 `npm run sync-content`를 실행합니다.
3. `node quartz/bootstrap-cli.mjs build`로 빌드를 확인합니다.
4. 변경 내용을 Git에 커밋하고 `main` 브랜치에 푸시합니다.
5. GitHub 저장소의 `Settings → Pages → Source`를 `GitHub Actions`로 설정합니다.
6. Actions의 `Deploy Quartz Wiki to GitHub Pages` 작업이 완료됐는지 확인합니다.

> [!warning] 공개 저장소 보안
> `qz_wiki_data/content`에는 공개 속성이 확인된 노트만 복사됩니다. Raw 자료, 학습일지, 템플릿과 초안은 GitHub 저장소에 넣지 않습니다.

## 시작 페이지

공개 홈페이지는 [[데이터 분석 학습 위키]]를 중심으로 구성하고, [[데이터 분석 학습 로드맵]]과 과목별 목차로 연결합니다.
