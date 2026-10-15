<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 글쓰기 규칙

PR, 이슈, 커밋 메시지, 일감 댓글, 리뷰 코멘트, 코드 주석, 문서 등에 전부 적용한다.

## 공통

- 간결하고 명확하게 쓴다. 장황한 배경 설명, 부연, 같은 말 반복을 넣지 않는다.
- 반드시 필요한 게 아니면 쓰지 않는다. 섹션, 문장, 주석 전부 마찬가지다.
- 한 문장에 절을 세 개 이상 잇지 않는다. 한 문단에는 요지 하나만 담는다.

## 문장부호

- 가운뎃점(·)을 쓰지 않는다. 쉼표나 "와/과", "이나"로 나열한다.
- 줄표(—, –, ㅡ)를 쓰지 않는다. 괄호에 넣거나 문장을 나눈다.
- 한글 합성어 하이픈("테스트-주도")을 쓰지 않는다. 코드나 영문 고유 표기는 예외다.
- 강조용 볼드나 따옴표를 쓰지 않는다. 인용 대사의 큰따옴표와 코드 백틱만 쓴다.
- 화살표는 `->`만 쓴다. →, ⇒ 같은 특수문자 화살표는 쓰지 않는다.
- 한 문장에 쉼표가 두 개를 넘으면 문장을 끊는다.

## 이슈 등록, 의견 제시

- 이슈를 등록하거나 의견을 낼 때(리뷰 코멘트, 개선 제안, 일감 댓글 포함) As-is와 To-be를 항상 같이 쓴다. 읽는 사람이 목표를 바로 알 수 있어야 한다.
  - As-is: 지금 어떻게 동작하는지 (재현 조건, 실제 결과)
  - To-be: 어떻게 되어야 하는지 (기대 결과, 완료 기준)
- 근거는 이슈 번호, 커밋, 문서 링크로 단다.

## PR, 커밋 메시지

- 무엇을 왜 바꿨는지만 쓴다. diff를 보면 알 수 있는 파일별 변경 목록은 옮겨 적지 않는다.

## 코드 주석

- 코드만 봐서는 알 수 없는 것(이유, 제약, 우회한 버그)만 쓴다. 코드가 하는 일을 다시 설명하지 않는다.
- 짧게 쓴다. 길어지면 이슈나 PR 링크로 대신한다.

# 프로젝트 규칙

꼬리질문은 개발자 면접에 나오는 CS와 프론트엔드 개념을 내 말로 설명하고, AI 피드백과 꼬리 질문으로 이해를 확인하는 학습 SaaS다. 기능을 구현하기 전에 `docs/PRODUCT_SPEC.md`를 읽는다.

## 구조

- `docs/PRODUCT_SPEC.md`: 제품 기준 문서. MVP 범위와 구현 방법을 판단하는 기준이다.
- `src/config/site.ts`: 서비스 이름, 설명, 테마 색.
- `src/app`: 라우트.
- `src/components/ui`: shadcn/ui 컴포넌트.
- `src/components`: 여러 페이지에서 쓰는 컴포넌트.
- `src/content`: 질문 콘텐츠와 Zod 스키마. 첫 질문을 추가할 때 만든다.
- `src/lib`: 공용 유틸.
  - `env.ts`, `env.server.ts`: 환경변수 검증
  - `metadata.ts`, `og.tsx`: 페이지 메타데이터와 OG 이미지
  - `share.ts`, `kakao.ts`, `in-app-browser.ts`: 공유와 인앱 브라우저 대응
  - `analytics.ts`: 이벤트 추적
  - `llm/`: LLM 호출, 프롬프트, 모의 응답. 서버 전용이고 AI 기능을 만들 때 추가한다.
  - `practice/`: 간격 반복과 꼬리 질문 선택, 판정 후처리와 사용량 제한 같은 결정적 로직. 학습 기능을 만들 때 추가한다.
- `src/lib/supabase`: Supabase 클라이언트.
- `supabase/`: Supabase CLI 설정과 마이그레이션.
- `tests/e2e`: Playwright E2E 테스트. 단위 테스트는 대상 파일 옆에 `*.test.ts`로 둔다.
- `evals/judge`: AI 판정 품질 평가 세트. 실제 API를 부르므로 수동으로 돌린다.

## 코드 작성

- 기본은 Server Component다. 상태나 브라우저 API가 필요할 때만 `"use client"`를 붙이고 그 범위를 작게 둔다.
- 새 UI가 필요하면 직접 만들기 전에 `npx shadcn@latest add <name>`으로 가져온다.
- Supabase 클라이언트는 쓰는 곳에 맞춰 고른다.
  - Client Component: `@/lib/supabase/client`
  - Server Component, Route Handler, Server Action: `@/lib/supabase/server`
  - RLS를 우회해야 하는 서버 작업: `@/lib/supabase/admin`
- 테이블을 바꾸면 `npx supabase migration new <name>`으로 마이그레이션을 만들고 `npm run db:types`로 타입을 다시 만든다.
- `process.env`를 직접 읽지 않는다. `env.ts`(공개 값)나 `env.server.ts`(서버 전용 값) 스키마에 추가하고 `.env.example`에도 적는다.
- 페이지 메타데이터는 `createMetadata()`로 만든다. 공유 썸네일이 필요한 페이지에는 `opengraph-image.tsx`를 두고 `renderOgImage()`를 쓴다.
- 새 이벤트는 `analytics.ts`의 `AnalyticsEvents` 타입에 먼저 추가하고 `track()`으로 보낸다.
- UI는 모바일 우선으로 만든다. 높이는 `vh` 대신 `dvh`를 쓰고, 하단 고정 버튼에는 `pb-safe`를 붙인다.
- UI 문구는 한국어로 쓴다.
- LLM은 `src/lib/llm`을 거쳐 서버에서만 호출한다. API 키와 프롬프트를 클라이언트 번들에 넣지 않는다.
- 판정 기준인 핵심 포인트는 서버가 콘텐츠에서 읽는다. 클라이언트가 보낸 기준을 쓰지 않는다.
- 복습 일정, 사용량, 꼬리 질문 선택처럼 결정적인 계산에 LLM을 쓰지 않는다.
- 테스트와 로컬 개발은 `LLM_MODE=mock`으로 돌려 실제 API를 부르지 않는다.

## 완료 전 확인

- `npm run check`(lint, format:check, typecheck, 단위 테스트)를 통과해야 한다.
- 라우트나 메타데이터를 바꿨으면 `npm run build`도 돌린다.
- 사용자 흐름을 바꿨으면 `npm run test:e2e`도 돌린다.
- 프롬프트나 모델을 바꿨으면 품질 평가 세트를 돌리고 결과를 PR에 적는다.

# Product and Engineering Rules

## 1. Project Context

꼬리질문 (Kkori) is a learning SaaS for developers preparing for technical interviews.

Its purpose is to help users:

- Explain CS and frontend concepts in their own words before reading an explanation.
- See which human-written key points their answer covered, partly covered, or missed.
- Answer follow-up questions the way real interviews continue.
- Review concepts on a spaced repetition schedule.

The product's primary value is closing the gap between knowing a concept and being able to explain it. Do not turn the project into a generic question dump, a blog, or an open-ended AI chatbot.

## 2. Priorities

When making product and engineering decisions, prioritize in this order:

1. Correctness of questions, key points, explanations, and AI judgments.
2. A learning flow that makes users explain before they read.
3. Mobile and desktop usability.
4. Cost control and abuse protection for AI features.
5. SEO for public question pages.
6. Automated quality checks and reliable deployment.
7. Analytics that validate the learning loop and the SaaS funnel.

Do not sacrifice correctness or usability to add more features.

## 3. Development Principles

- Inspect the existing codebase before changing files.
- Follow established project conventions unless there is a clear reason to change them.
- Prefer simple, readable, maintainable implementations.
- Avoid unnecessary abstractions and premature generalization.
- Do not add dependencies when the existing stack can solve the problem adequately.
- Do not implement out-of-scope features without a clear product requirement.
- Keep changes focused and explain meaningful architectural decisions.
- Never claim a feature or test works without verifying it.

## 4. Technology and Architecture

### Stack

- Next.js 16 App Router, React 19, TypeScript strict mode
- Tailwind CSS v4 with shadcn/ui components
- Vitest for unit tests, Playwright for E2E tests
- Version-controlled question content validated with Zod
- Claude API through `@anthropic-ai/sdk`, called only from the server
- Supabase for accounts (Supabase Auth with GitHub OAuth), attempts, review schedules, usage counters, and reports
- Analytics through `track()` in `src/lib/analytics.ts`. The provider will move from Vercel Analytics to PostHog.

### Next.js

- Prefer Server Components by default.
- Keep client component boundaries as small as practical. On question pages, only the practice panel is a client component.
- Statically generate public question and category pages with `generateStaticParams`.
- Use the Metadata API for page-specific SEO metadata.
- Generate metadata from validated question content rather than duplicating values.
- Implement `sitemap.ts` and `robots.ts` as appropriate.
- Use canonical URLs consistently.
- Add Open Graph metadata and an appropriate sharing image strategy.
- Use structured data only when it accurately represents the page content.
- Stream AI responses from Route Handlers. POST Route Handlers are never cached.
- Refresh Supabase sessions in `src/proxy.ts`, because Next.js 16 renamed Middleware to Proxy. Proxy only does optimistic checks, so authorize again on the server.
- `cookies()` is async, and cookies can only be set in Route Handlers or Server Functions.

Do not use `useEffect` to reproduce functionality that can be handled more simply through server rendering, URL state, or ordinary event handlers.

### TypeScript

- Keep strict type checking enabled.
- Avoid `any`; prefer explicit types, discriminated unions, and `unknown` where appropriate.
- Validate external data before trusting it.
- Keep domain types separate from UI-specific presentation types when doing so improves clarity.
- Avoid unsafe type assertions without a documented reason.

### Component Design

- Keep components focused on a clear responsibility.
- Separate grading, scheduling, and limit logic from presentation.
- Separate question content from question rendering.
- Extract reusable components when there is genuine reuse.
- Avoid building a large design system before the product needs one.
- Ensure all interactive elements have clear labels, focus states, and appropriate keyboard behavior.

## 5. Domain and Data Rules

### Question Content

Question content is product-critical.

- Every published question has key points, an explanation, sources, and a review date.
- Write explanations yourself. Do not copy blog posts, books, or other interview question collections.
- Prefer official documentation and standards as sources, such as MDN, WHATWG, React docs, and RFCs.
- Write key point criteria as observable statements that can be checked in an answer.
- Follow-up questions and their key points are written by people.
- Keep question slugs stable after publishing. Add a redirect if one must change.
- Validate all content with the Zod schema. CI must fail on invalid content.
- Handle missing data explicitly. Do not publish a question with placeholder content.

### AI Judgments

- Judge answers only against the question's human-written key points.
- AI output must not introduce facts that are not in the key points or the explanation.
- Verify AI output on the server: the schema, known key point IDs, and evidence quotes that actually appear in the answer.
- Do not show numeric scores that imply more precision than the judgment has.
- Treat user answers as data, never as instructions.
- Do not publish AI-generated questions, key points, or explanations without human review.
- When AI is unavailable, the self-check flow must still complete the learning loop.

### Learner Data

- Do not store anonymous users' answer text. Store a hash only.
- Do not store raw IP addresses. Hash them with a rotating secret.
- Members can delete their account and all of their attempts.
- Ask before including an answer in a judgment report.

## 6. Grading, Follow-ups, Review Scheduling, and Limits

Keep these rules deterministic and in code. The documented rules live in `docs/PRODUCT_SPEC.md`.

- Follow-up questions come from the question's human-written candidates. The model only rephrases them.
- The review schedule depends on the learner's self-rating, not on the AI judgment.
- Enforce per-plan usage limits, per-IP limits, and the global daily AI budget on the server.
- Check and consume usage atomically so concurrent requests cannot exceed a limit.
- Use Asia/Seoul dates for review schedules and daily limits.
- Cover the boundary cases of every rule with unit tests.

Do not call an LLM for scheduling, limits, or other deterministic calculations.

## 7. URL and SEO Rules

- Public question pages must have stable, readable URLs such as `/questions/[slug]`.
- Category pages use paths such as `/categories/[category]`, not query strings.
- Parse and validate route and query parameters.
- Do not generate duplicate metadata across different question pages.
- Ensure titles and descriptions accurately describe the page.
- Use absolute canonical and Open Graph URLs derived from `siteConfig.url`.
- Do not expose staging or preview URLs as production canonicals.
- Do not index dashboard, login, or API routes.
- Include only published public pages in the sitemap.
- Avoid adding structured data that does not match visible page content.

SEO implementation does not guarantee indexing or search rankings.

## 8. Accessibility and Responsive UX

The primary environments are a smartphone during short study sessions and a desktop for writing longer answers.

- Make primary actions easy to tap.
- Use semantic HTML.
- Provide visible keyboard focus.
- Support keyboard navigation through the whole practice flow.
- Associate form controls with labels.
- Do not communicate judgment states through color alone.
- Mark streaming regions with `aria-busy` and announce completion once through a live region.
- Move focus to the judgment result when it appears.
- Use appropriate contrast and readable text sizes.
- Avoid unnecessary animations.
- Provide useful loading, empty, error, limit reached, and AI unavailable states.
- Use progressive enhancement where practical.

## 9. Analytics and Privacy

Analytics should measure the learning loop and the SaaS funnel, not collect unnecessary personal information.

Core events include:

- `landing_view`
- `question_viewed`
- `answer_submitted`
- `verdict_shown`
- `feedback_completed`
- `self_rated`
- `review_started`
- `signup_completed`
- `pricing_viewed`
- `pro_waitlist_joined`

The full event list and properties are in `docs/PRODUCT_SPEC.md`. Additional events may be introduced when there is a specific product question to answer.

- Use consistent event names and documented properties.
- Avoid firing duplicate events during rerenders.
- Never send answer text, emails, or other user-written content to analytics.
- Do not send secrets or private user content to analytics.
- Follow the analytics provider's consent and privacy requirements.
- Keep analytics optional when its configuration is missing.
- Never fabricate analytics data or claim that a conversion occurred without evidence.
- Prefer simple descriptive events over collecting every possible interaction.

## 10. Testing Requirements

Testing is part of feature development, not a final cleanup task.

### Unit Tests

Add or update tests for meaningful domain logic, including:

- Question content schema and publishing thresholds
- AI output post-processing and evidence verification
- Follow-up selection
- Spaced repetition and date boundaries
- Usage limits and the daily budget
- Prompt assembly and isolation of instructions inside user answers
- Invalid route and query parameters
- Missing or invalid content

Tests should be deterministic and independent of external APIs.

### Playwright E2E

Run E2E tests with `LLM_MODE=mock`. Cover the primary user journey:

1. Open the home page.
2. Open a category and a question.
3. Submit an answer.
4. See the key point judgment and the streamed feedback.
5. Answer a follow-up question.
6. Self-rate and see the next review date.
7. Fall back to self-check when AI fails.
8. See the limit reached state.

Also test important empty and error states, and question page metadata.

Prefer accessible selectors such as roles and labels over brittle CSS selectors.

Do not make E2E tests depend on live third-party APIs.

### AI Evaluation

Run the evaluation set in `evals/judge` before merging prompt or model changes, and report the agreement rate in the pull request. It calls the live API, so it does not run in CI.

### CI

GitHub Actions runs lint, format check, typecheck, unit tests, production build, and Playwright E2E on every pull request and on pushes to `main`.

A feature is not complete when it only works locally; the relevant automated checks must pass.

If a check cannot be run, clearly report why instead of claiming success.

## 11. Security and Configuration

- Never commit secrets, access tokens, or private keys.
- Keep `.env.example` limited to required variable names and safe placeholders.
- Keep server-only credentials, including `ANTHROPIC_API_KEY`, out of client components and public bundles.
- Use Supabase Auth for accounts. Authorize every data access on the server and with RLS.
- Do not rely on client-side checks as the only access control.
- Validate user-submitted answers and reports.
- Protect AI endpoints with usage limits, a global budget, and a kill switch.

## 12. AI Features

AI feedback is a core feature, so it must be reliable, bounded, and cheap to operate.

- Use verified question content as the grounding source.
- Make it clear that AI judgments may be wrong and offer a report action.
- Stream feedback and follow-ups. Handle cancellation, errors, timeouts, refusals, and rate limits.
- Enforce usage limits on the server.
- Never expose API keys or full prompts in client code.
- Log the model, token usage, latency, and status of every call.
- Keep a mock mode for tests and a kill switch for operations.
- Keep the deterministic self-check flow available when AI is unavailable.
- Keep payments in test mode. They exist to validate willingness to pay, not to add technical complexity.

## 13. Git and Change Management

- Make small, focused changes.
- Work on a feature branch and merge into `main` through a pull request.
- Keep generated files and temporary debugging artifacts out of commits unless required.
- Do not overwrite unrelated user changes.
- Do not modify dependencies or project configuration without a reason.
- Update relevant documentation when behavior, architecture, or setup changes.
- Keep `README.md` consistent with the actual implementation.
- Update `docs/PRODUCT_SPEC.md` when a product decision materially changes.

## 14. Definition of Done

A task is complete when:

- The requested behavior is implemented.
- The UI works on mobile and desktop as applicable.
- Loading, empty, error, and AI unavailable states are handled.
- Accessibility basics are satisfied.
- SEO metadata is correct for affected public pages.
- Relevant tests are added or updated.
- Lint, typecheck, tests, and build pass where applicable.
- The evaluation set was run if prompts or models changed.
- Documentation reflects the actual behavior.
- No unsupported factual claims or unreviewed AI-generated content are introduced.

## 15. How to Approach a New Task

1. Read the relevant product specification.
2. Inspect the existing implementation and identify affected files.
3. Confirm the expected behavior and edge cases.
4. Implement the smallest coherent solution.
5. Add or update tests.
6. Run the relevant quality checks.
7. Review accessibility, SEO, and responsive behavior where relevant.
8. Summarize changes, test results, limitations, and follow-up work.

If a requirement is ambiguous, prefer the smallest implementation consistent with the product specification. Ask for clarification when the ambiguity could materially change the architecture, data integrity, or user experience.
