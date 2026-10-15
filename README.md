# 꼬리질문

[![CI](https://github.com/detourguru/kkori/actions/workflows/ci.yml/badge.svg)](https://github.com/detourguru/kkori/actions/workflows/ci.yml)

개념을 내 말로 설명하고, 꼬리 질문까지 답해 보는 개발자 면접 연습.

개발자 면접에 나오는 CS와 프론트엔드 개념을 내 말로 설명하면, AI가 빠진 핵심 포인트를 짚고 꼬리 질문으로 이해를 확인하는 학습 서비스입니다. 다시 풀 날짜는 간격 반복으로 잡아 줍니다.

상태: MVP 개발 중

## Why

- 면접 준비를 질문과 모범 답안을 읽는 방식으로 하면 직접 설명하는 연습이 빠집니다.
- 정리 글은 많지만 내 설명에서 무엇이 빠졌는지는 알려주지 않습니다.
- 실제 면접은 꼬리 질문으로 이어지는데 혼자서는 그 연습을 하기 어렵습니다.
- 공부한 개념을 언제 다시 볼지 관리하기 어렵습니다.

## Core Features

체크박스는 구현 상태를 나타냅니다. 체크되지 않은 기능은 아직 제공되지 않습니다.

### Practice

- [ ] 해설을 보기 전에 내 말로 답하기
- [ ] 핵심 포인트별 충족 여부와 근거 문장 판정
- [ ] 피드백 스트리밍
- [ ] 사람이 쓴 후보에서 고른 꼬리 질문
- [ ] AI 없이도 끝까지 가는 자가 점검 모드
- [ ] 간격 반복 복습

### Content

- [ ] 브라우저, JavaScript, React 질문
- [ ] 네트워크, 운영체제, 자료구조, 데이터베이스 질문
- [ ] 질문마다 직접 쓴 해설과 출처, 확인일
- [ ] AI 판정 신고

### SaaS

- [ ] GitHub 로그인과 학습 기록 저장
- [ ] 대시보드
- [ ] 요금제별 AI 사용량 제한
- [ ] Pro 대기 신청
- [ ] 결제 테스트 모드

### SEO and Public Pages

- [ ] 질문별 공개 페이지
- [ ] 카테고리 페이지
- [ ] 페이지별 metadata, canonical, Open Graph
- [ ] sitemap.xml 및 robots.txt

### Quality and Analytics

- [x] GitHub Actions CI (lint, format, typecheck, unit test, build, E2E)
- [ ] 핵심 학습 흐름 Playwright E2E
- [ ] 품질 평가 세트로 AI 판정 검증
- [ ] 학습 퍼널과 SaaS 퍼널 계측
- [ ] AI 비용 기록과 킬 스위치

## How It Works

1. 질문 페이지에서 해설을 보기 전에 답을 씁니다.
2. AI가 질문마다 사람이 정해 둔 핵심 포인트를 기준으로 충족 여부를 판정합니다.
3. 피드백을 읽고 꼬리 질문에 답합니다.
4. 핵심 포인트와 해설, 출처를 확인합니다.
5. 이해도를 고르면 다음 복습 날짜가 정해집니다.

AI는 핵심 포인트와 해설 밖의 사실을 단정하지 않습니다. 질문과 핵심 포인트, 해설은 사람이 쓰고 출처를 답니다.

## Product Scope

MVP는 일곱 개 카테고리에서 질문 21개 이상으로 공개하고 30개까지 늘립니다. 질문 수보다 해설과 판정의 정확성을 우선합니다.

요금제는 비회원, Free, Pro로 나눕니다. MVP의 Pro는 대기 신청만 받고, 결제는 테스트 모드로 이후에 붙입니다. 자세한 범위와 일정은 [기획 문서](docs/PRODUCT_SPEC.md)에 있습니다.

## Tech Stack

| Area          | Technology                                   |
| ------------- | -------------------------------------------- |
| Framework     | Next.js 16 (App Router)                      |
| Language      | TypeScript (strict)                          |
| UI            | React 19, shadcn/ui                          |
| Styling       | Tailwind CSS v4, Pretendard                  |
| Content       | 버전 관리되는 질문 파일, Zod 검증            |
| AI            | Claude API, `@anthropic-ai/sdk` (도입 예정)  |
| Data and Auth | Supabase Postgres, Supabase Auth (도입 예정) |
| Testing       | Vitest, Playwright                           |
| CI            | GitHub Actions, Dependabot                   |
| Deployment    | Vercel                                       |
| Analytics     | PostHog (도입 예정)                          |

정확한 패키지와 버전은 `package.json`을 기준으로 관리합니다. 프로젝트는 개인 보일러플레이트 [detourguru/boilerplate](https://github.com/detourguru/boilerplate)에서 시작했습니다.

## Getting Started

### Requirements

- Node.js 22 (`.nvmrc`)
- npm
- Git

### Installation

```bash
git clone https://github.com/detourguru/kkori.git
cd kkori
npm install
cp .env.example .env.local
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다.

### Environment Variables

| Name                            | 필요한 시점                                    |
| ------------------------------- | ---------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | canonical, Open Graph, sitemap의 절대 URL      |
| `NEXT_PUBLIC_SUPABASE_URL`      | 로그인과 학습 기록 저장부터                    |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 로그인과 학습 기록 저장부터                    |
| `SUPABASE_SERVICE_ROLE_KEY`     | RLS를 우회하는 서버 작업이 생길 때 (서버 전용) |
| `NEXT_PUBLIC_KAKAO_JS_KEY`      | 카카오톡 공유를 쓸 때                          |

`NEXT_PUBLIC_SITE_URL`을 비워 두면 Vercel 프로덕션 도메인을 씁니다. 로컬에서는 `http://localhost:3000`이 기본값입니다.

AI 기능에 필요한 변수는 [기획 문서의 추가할 환경변수](docs/PRODUCT_SPEC.md#163-추가할-환경변수)에 있습니다. 구현할 때 `.env.example`에 추가합니다.

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
├── docs/             # 기획 문서
├── src/
│   ├── app/          # App Router 라우트, OG 이미지, sitemap, robots
│   ├── components/   # 공용 컴포넌트, shadcn/ui
│   ├── config/       # 서비스 이름, 설명, 테마 색
│   ├── lib/          # 환경변수, 메타데이터, 공유, 분석, Supabase
│   └── types/
├── supabase/         # Supabase CLI 설정과 마이그레이션
└── tests/e2e/        # Playwright
```

질문 콘텐츠는 `src/content/`, AI 호출은 `src/lib/llm/`, 학습 로직은 `src/lib/practice/`에 구현하면서 추가합니다.

## SEO Strategy

공개 질문 페이지를 검색 유입의 기본 단위로 설계합니다.

- 질문마다 고유한 제목과 설명
- 페이지별 canonical URL과 Open Graph
- 카테고리 랜딩 페이지
- XML sitemap과 크롤링 정책
- 화면 내용과 맞는 구조화 데이터

대시보드와 로그인, API 경로는 색인하지 않습니다. 검색 노출과 순위는 보장되지 않으므로 실제 운영 데이터로 확인합니다.

## Data and Content Policy

- 질문과 핵심 포인트, 해설은 직접 씁니다. 다른 글의 문장을 옮기지 않습니다.
- 출처는 공식 문서와 표준을 우선하고 확인일을 기록합니다.
- AI가 만든 질문이나 해설은 검수 없이 공개하지 않습니다.
- 비회원의 답변 원문과 IP 원문은 저장하지 않습니다.
- 답변 원문과 이메일은 분석 이벤트에 싣지 않습니다.

## Testing Strategy

### Unit Tests

- 콘텐츠 스키마와 공개 기준
- 판정 결과 후처리와 근거 문장 검증
- 꼬리 질문 선택 규칙
- 간격 반복 계산과 날짜 경계
- 사용량 제한과 예산 상한
- 프롬프트 조립과 답변 속 지시문 격리

### End to End Tests

LLM은 모의 모드로 돌려서 실제 API를 부르지 않습니다.

- 질문 상세에서 답변 제출부터 판정과 피드백까지
- 꼬리 질문 답변과 자가 평가
- AI 오류 때 자가 점검 전환
- 사용량 소진 안내
- 모바일 핵심 흐름

AI 판정 품질은 실제 API를 부르는 품질 평가 세트로 따로 검증합니다. 프롬프트나 모델을 바꿀 때 수동으로 돌립니다.

## Analytics

학습 퍼널은 다음과 같습니다.

`question_viewed` -> `answer_submitted` -> `verdict_shown` -> `feedback_completed` -> `self_rated`

SaaS 퍼널은 다음과 같습니다.

`landing_view` -> 첫 `answer_submitted` -> `signup_completed` -> `review_started` -> `pricing_viewed` -> `pro_waitlist_joined`

페이지 조회만으로 제품의 성공을 판단하지 않습니다. 학습자가 다시 돌아와 복습하는지와 AI 판정을 믿고 쓰는지를 함께 봅니다.

이벤트는 `src/lib/analytics.ts`의 `track()` 한 곳으로 보냅니다. 지금 연결된 Vercel Analytics는 커스텀 이벤트를 Pro 플랜부터 집계해서 퍼널 계측 작업에서 PostHog로 교체합니다.

## Roadmap

- [ ] Phase 1: 콘텐츠 스키마, 공개 질문 페이지, 자가 점검 연습, AI 없는 1차 공개
- [ ] Phase 2: AI 판정, 피드백 스트리밍, 꼬리 질문, 사용량 제한
- [ ] Phase 3: 계정, 대시보드, 요금제, MVP 공개
- [ ] Phase 4: 결제 테스트 모드, A/B 실험, 사용자 피드백 반영

## Deployment Checklist

- [ ] Vercel 프로젝트 연결과 환경변수 등록
- [ ] GitHub 저장소 설정에서 Dependabot alerts와 security updates 켜기
- [ ] `main` 브랜치에 CI 통과를 머지 조건으로 설정
- [ ] Supabase 프로젝트 생성과 `npx supabase link`
- [ ] Supabase Auth에 GitHub OAuth 앱 연결
- [ ] Claude API 키 발급과 사용량 알림 설정
- [ ] 카카오톡 공유를 쓴다면 Kakao Developers 앱에 사이트 도메인 등록

## Notes

- OG 이미지 폰트는 용량 제한 때문에 Pretendard KS X 1001 서브셋을 씁니다. 서브셋에 없는 드문 한글 음절은 빈 칸으로 나옵니다.

## Documentation

- [Product Specification](docs/PRODUCT_SPEC.md): 제품 목표, MVP 범위, AI 설계, 데이터 모델, 일정
- [Agent Instructions](AGENTS.md): 코딩 에이전트를 위한 프로젝트 규칙

## License

라이선스는 프로젝트에 포함되는 코드와 콘텐츠의 권리 관계를 확인한 뒤 결정합니다.

별도 라이선스가 명시되기 전까지 질문 해설과 콘텐츠를 자유롭게 재사용할 수 있다는 의미는 아닙니다.
