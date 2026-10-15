# BoardRookie

[![CI](https://github.com/detourguru/board-rookie/actions/workflows/ci.yml/badge.svg)](https://github.com/detourguru/board-rookie/actions/workflows/ci.yml)

보드게임 루키를 첫 판까지.

보드게임 카페에서 게임을 고르고, 쉽게 배우고, 바로 시작할 수 있도록 돕는 웹앱입니다. 게임 이름을 몰라도 우리 일행에 맞는 게임을 찾고 첫 판에 필요한 규칙을 단계별로 확인할 수 있어요.

상태: MVP 개발 중

## Why BoardRookie?

보드게임 카페에 가면 게임이 너무 많아 무엇을 해야 할지 결정하기 어렵습니다.

- 몇 명이서 할 수 있는 게임인지 알기 어렵습니다.
- 플레이 시간과 난이도를 비교하기 어렵습니다.
- 새로운 게임을 골라도 규칙이 복잡하면 시작하기 전에 포기하게 됩니다.
- 결국 이미 알고 있는 익숙한 게임만 반복하게 됩니다.

BoardRookie는 보드게임 입문자가 게임을 발견하고 규칙을 이해하는 과정의 어려움을 줄이는 것을 목표로 합니다.

## Core Features

체크박스는 구현 상태를 나타냅니다. 체크되지 않은 기능은 아직 제공되지 않습니다.

### Game Discovery

- [ ] 인원수별 게임 탐색
- [ ] 플레이 시간별 필터링
- [ ] 난이도와 경험 수준별 탐색
- [ ] 파티, 전략, 협력 등 분위기별 필터링
- [ ] 조건에 맞는 게임과 추천 이유 표시

### Beginner Friendly Rules

- [ ] 게임 목표와 핵심 규칙 요약
- [ ] 게임 준비 단계
- [ ] 내 차례에 할 수 있는 행동
- [ ] 승리 및 종료 조건
- [ ] 초보자가 헷갈리는 규칙
- [ ] 규칙 오류 제보

### SEO and Public Pages

- [ ] 게임별 공개 상세 페이지
- [ ] 규칙 안내 페이지
- [ ] 페이지별 metadata와 Open Graph
- [ ] sitemap.xml 및 robots.txt
- [ ] 적절한 구조화 데이터

### Quality and Analytics

- [ ] GitHub Actions CI (lint, format, typecheck, unit test, build, E2E)
- [ ] 핵심 사용자 흐름 Playwright E2E
- [ ] 핵심 사용자 퍼널 계측
- [ ] 실제 사용자 피드백을 바탕으로 개선

## Product Scope

초기 MVP는 국내에서 구하기 쉽고 한국어 규칙을 확인할 수 있는 게임을 대상으로 합니다. 출시 시점에는 약 10개로 시작하고 15~30개로 늘립니다.

대규모 게임 데이터베이스보다 정확한 기본 정보와 이해하기 쉬운 규칙 설명을 우선합니다. 모바일에서 편리한 탐색 경험도 함께 챙깁니다.

## Primary User Flow

1. 인원수와 플레이 시간, 경험 수준과 원하는 분위기 선택
2. 조건에 맞는 게임 후보 확인
3. 게임 상세 정보와 추천 이유 확인
4. 쉬운 규칙 안내 확인
5. 실제 게임 시작 여부에 대한 피드백 제출

## Tech Stack

| Area       | Technology                                          |
| ---------- | --------------------------------------------------- |
| Framework  | Next.js 16 (App Router)                             |
| Language   | TypeScript (strict)                                 |
| UI         | React 19, shadcn/ui                                 |
| Styling    | Tailwind CSS v4, Pretendard                         |
| Data       | 버전 관리되는 정적 카탈로그, 피드백 저장은 Supabase |
| Testing    | Vitest, Playwright                                  |
| CI         | GitHub Actions, Dependabot                          |
| Deployment | Vercel                                              |
| Analytics  | PostHog (도입 예정)                                 |

정확한 패키지와 버전은 `package.json`을 기준으로 관리합니다. 프로젝트는 개인 보일러플레이트 [detourguru/boilerplate](https://github.com/detourguru/boilerplate)에서 시작했습니다.

## Getting Started

### Requirements

- Node.js 22 (`.nvmrc`)
- npm
- Git

### Installation

```bash
git clone https://github.com/detourguru/board-rookie.git
cd board-rookie
npm install
cp .env.example .env.local
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다.

### Environment Variables

| Name                            | 필요한 시점                                    |
| ------------------------------- | ---------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | canonical, Open Graph, sitemap의 절대 URL      |
| `NEXT_PUBLIC_SUPABASE_URL`      | 피드백 저장 기능부터                           |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 피드백 저장 기능부터                           |
| `SUPABASE_SERVICE_ROLE_KEY`     | RLS를 우회하는 서버 작업이 생길 때 (서버 전용) |
| `NEXT_PUBLIC_KAKAO_JS_KEY`      | 카카오톡 공유를 쓸 때                          |

`NEXT_PUBLIC_SITE_URL`을 비워 두면 Vercel 프로덕션 도메인을 씁니다. 로컬에서는 `http://localhost:3000`이 기본값입니다.

## Scripts

| Command             | Description                                |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | 개발 서버                                  |
| `npm run build`     | 프로덕션 빌드                              |
| `npm run check`     | lint, format:check, typecheck, 단위 테스트 |
| `npm run lint`      | ESLint 검사                                |
| `npm run format`    | Prettier 전체 포맷                         |
| `npm run typecheck` | 라우트 타입 생성 후 TypeScript 검사        |
| `npm test`          | Vitest 단위 테스트                         |
| `npm run test:e2e`  | Playwright E2E (모바일, 데스크톱 뷰포트)   |
| `npm run db:types`  | 연결된 Supabase 프로젝트에서 DB 타입 생성  |

E2E를 처음 실행하기 전에 `npx playwright install chromium`으로 브라우저를 설치합니다.

CI는 모든 Pull Request와 `main` push에서 lint, format, typecheck, 단위 테스트, 빌드, E2E를 차례로 실행합니다.

## Project Structure

```text
.
├── .github/          # CI, Dependabot
├── docs/             # 제품 명세
├── src/
│   ├── app/          # App Router 라우트, OG 이미지, sitemap, robots
│   ├── components/   # 공용 컴포넌트, shadcn/ui
│   ├── config/       # 서비스 이름, 설명, 테마 색
│   ├── lib/          # 환경변수, 메타데이터, 공유, 분석, Supabase
│   └── types/
├── supabase/         # Supabase CLI 설정과 마이그레이션
└── tests/e2e/        # Playwright
```

게임 데이터와 추천 로직은 구현하면서 `src/data/`와 `src/features/`에 추가합니다.

## SEO Strategy

공개 게임 상세 페이지를 검색 유입의 기본 단위로 설계합니다.

- 고유한 페이지 제목과 설명
- 페이지별 canonical URL
- Open Graph metadata
- XML sitemap
- 크롤링 정책
- 콘텐츠에 적합한 구조화 데이터

검색 노출과 순위는 보장되지 않습니다. 검색 유입과 인덱싱 상태는 실제 운영 데이터로 확인합니다.

## Data and Content Policy

- 게임 기본 정보는 확인 가능한 출처를 기준으로 작성합니다.
- 규칙 설명은 초보자가 이해할 수 있도록 독립적으로 작성합니다.
- 원본 규칙서와 이미지의 재사용 권한을 확인합니다.
- 게임 판본과 규칙 정보의 검토일을 관리합니다.
- 확인되지 않은 카페별 보유 정보는 사실처럼 표시하지 않습니다.

## Testing Strategy

### Unit Tests

- 필터링 조건
- 추천 결과 계산
- 빈 결과 및 잘못된 입력 처리
- 규칙 데이터 렌더링에 필요한 변환 로직

### End to End Tests

- 조건 선택부터 추천 결과 확인까지
- 상세 페이지 및 규칙 페이지 이동
- URL 필터 상태 복원
- 피드백 제출
- 모바일 핵심 사용자 흐름

## Analytics

핵심 퍼널은 다음과 같습니다.

`landing_view` -> `filter_applied` -> `game_detail_viewed` -> `rules_started` -> `game_started_feedback`

페이지 조회만으로 제품의 성공을 판단하지 않습니다. 추천된 게임을 실제로 시작했는지와 규칙 설명이 도움이 되었는지를 함께 봅니다.

이벤트는 `src/lib/analytics.ts`의 `track()` 한 곳으로 보냅니다. 지금 연결된 Vercel Analytics는 커스텀 이벤트를 Pro 플랜부터 집계해서 퍼널 계측 작업에서 PostHog로 교체합니다.

## Roadmap

- [ ] Phase 1: 프로젝트 기반, 데이터 모델, CI
- [ ] Phase 2: 게임 탐색과 필터링
- [ ] Phase 3: 상세 페이지와 규칙 안내
- [ ] Phase 4: SEO와 사용자 계측
- [ ] Phase 5: Playwright, 접근성, 모바일 QA
- [ ] Phase 6: 공개 배포와 사용자 피드백 반영

## Deployment Checklist

- [ ] Vercel 프로젝트 연결과 환경변수 등록
- [ ] GitHub 저장소 설정에서 Dependabot alerts와 security updates 켜기
- [ ] `main` 브랜치에 CI 통과를 머지 조건으로 설정
- [ ] 피드백 기능 작업 시 Supabase 프로젝트 생성과 `npx supabase link`
- [ ] 카카오톡 공유를 쓴다면 Kakao Developers 앱에 사이트 도메인 등록

## Notes

- OG 이미지 폰트는 용량 제한 때문에 Pretendard KS X 1001 서브셋을 씁니다. 서브셋에 없는 드문 한글 음절은 빈 칸으로 나옵니다.

## Documentation

- [Product Specification](docs/PRODUCT_SPEC.md): 제품 목표, MVP 범위, 사용자 여정 및 지표
- [Agent Instructions](AGENTS.md): 코딩 에이전트를 위한 프로젝트 규칙

## License

라이선스는 프로젝트에 포함되는 코드와 콘텐츠의 권리 관계를 확인한 뒤 결정합니다.

별도 라이선스가 명시되기 전까지 게임 규칙 설명, 이미지 및 외부 데이터가 자유롭게 재사용 가능하다는 의미는 아닙니다.
