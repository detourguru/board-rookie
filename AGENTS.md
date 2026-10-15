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

BoardRookie는 보드게임 카페 입문자가 게임을 고르고 규칙을 익혀 첫 판을 시작하도록 돕는 모바일 우선 웹앱이다. 기능을 구현하기 전에 `docs/PRODUCT_SPEC.md`를 읽는다.

## 구조

- `docs/PRODUCT_SPEC.md`: 제품 기준 문서. MVP 범위를 판단하는 기준이다.
- `src/config/site.ts`: 서비스 이름, 설명, 테마 색.
- `src/app`: 라우트.
- `src/components/ui`: shadcn/ui 컴포넌트.
- `src/components`: 여러 페이지에서 쓰는 컴포넌트.
- `src/lib`: 공용 유틸.
  - `env.ts`, `env.server.ts`: 환경변수 검증
  - `metadata.ts`, `og.tsx`: 페이지 메타데이터와 OG 이미지
  - `share.ts`, `kakao.ts`, `in-app-browser.ts`: 공유와 인앱 브라우저 대응
  - `analytics.ts`: 이벤트 추적
- `src/lib/supabase`: Supabase 클라이언트.
- `supabase/`: Supabase CLI 설정과 마이그레이션.
- `tests/e2e`: Playwright E2E 테스트. 단위 테스트는 대상 파일 옆에 `*.test.ts`로 둔다.

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

## 완료 전 확인

- `npm run check`(lint, format:check, typecheck, 단위 테스트)를 통과해야 한다.
- 라우트나 메타데이터를 바꿨으면 `npm run build`도 돌린다.
- 사용자 흐름을 바꿨으면 `npm run test:e2e`도 돌린다.

# Product and Engineering Rules

## 1. Project Context

BoardRookie is a mobile-first web app for board-game beginners visiting board-game cafes.

Its purpose is to help users:

- Find games suitable for their group size, available time, experience, and preferred atmosphere.
- Understand why a game is recommended.
- Learn the essential rules in a clear, step-by-step format.
- Start playing without struggling through a long or confusing rulebook.

The product's primary value is helping beginners move from game discovery to starting their first game. Do not turn the project into a generic board-game database or an AI chatbot.

## 2. Priorities

When making product and engineering decisions, prioritize in this order:

1. Correctness of game information and rules.
2. Clear beginner-friendly UX.
3. Mobile usability.
4. SEO for useful public pages.
5. Automated quality checks and reliable deployment.
6. Analytics that help validate the product.
7. Optional AI features.

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
- Supabase for dynamic data such as feedback, introduced only when a feature needs it
- Analytics through `track()` in `src/lib/analytics.ts`. The provider will move from Vercel Analytics to PostHog.

### Next.js

- Prefer Server Components by default.
- Keep client component boundaries as small as practical.
- Use server rendering or static generation appropriately for public game pages.
- Use the Metadata API for page-specific SEO metadata.
- Generate metadata from validated game data rather than duplicating values.
- Implement `sitemap.ts` and `robots.ts` as appropriate.
- Use canonical URLs consistently.
- Add Open Graph metadata and an appropriate sharing image strategy.
- Use structured data only when it accurately represents the page content.

Do not use `useEffect` to reproduce functionality that can be handled more simply through server rendering, URL state, or ordinary event handlers.

### TypeScript

- Keep strict type checking enabled.
- Avoid `any`; prefer explicit types, discriminated unions, and `unknown` where appropriate.
- Validate external data before trusting it.
- Keep domain types separate from UI-specific presentation types when doing so improves clarity.
- Avoid unsafe type assertions without a documented reason.

### Component Design

- Keep components focused on a clear responsibility.
- Separate recommendation logic from presentation.
- Separate rule content from rule rendering.
- Extract reusable components when there is genuine reuse.
- Avoid building a large design system before the product needs one.
- Ensure all interactive elements have clear labels, focus states, and appropriate keyboard behavior.

## 5. Domain and Data Rules

### Game Data

Game information is product-critical.

- Never invent player counts, playing times, age recommendations, or rules.
- Record sources and verification dates for important factual data.
- Distinguish official playing time from estimated teaching time.
- Distinguish verified information from estimates.
- Do not claim that a game is available at a specific cafe unless that information has been verified.
- Handle missing data explicitly.
- Do not silently substitute fabricated defaults for unknown values.
- Use a consistent slug for each game's public URL.

### Rules Content

Rules must be understandable to beginners.

Use a consistent content structure where appropriate:

- Game objective
- Setup
- Turn sequence
- Available actions
- Scoring and end conditions
- Common beginner mistakes

Write original explanatory text based on appropriately sourced information.

Do not copy entire rulebooks or reproduce protected images without permission.

When rule details differ by edition, record the relevant edition and make the limitation clear.

AI-generated rule explanations must not be treated as verified facts without review.

### Initial Data Source

Prefer a small, curated catalog (about 10 games at launch, growing to 15 to 30) over a large, unreliable dataset.

Keep initial public catalog data static and version-controlled unless there is a concrete reason to introduce a database.

## 6. Filtering and Recommendation Logic

Keep filtering and recommendation logic deterministic in the initial MVP.

- A game must satisfy the applicable player-count constraints.
- A game must satisfy the selected duration constraint according to the documented filtering policy.
- Beginner suitability must use explicit, documented criteria.
- Mood and genre preferences should influence ranking only when the corresponding data is available.
- Missing data must not silently qualify a game as a match.
- Empty results must produce a useful message and allow users to relax constraints.
- Recommendation reasons must correspond to actual game data and applied criteria.

Document any assumptions used to compare duration ranges or recommended player counts.

Do not call an LLM for ordinary filtering or deterministic calculations.

## 7. URL and SEO Rules

- Public game pages must have stable, readable URLs.
- Filter state should be represented in URL search parameters where appropriate.
- Refreshing or sharing a filtered URL should preserve the intended state.
- Parse and validate query parameters.
- Do not generate duplicate metadata across different game pages.
- Ensure titles and descriptions accurately describe the page.
- Use absolute canonical and Open Graph URLs derived from `siteConfig.url`.
- Do not expose staging or preview URLs as production canonicals.
- Do not index every possible filter combination automatically.
- Include only appropriate public URLs in the sitemap.
- Avoid adding structured data that does not match visible page content.

SEO implementation does not guarantee indexing or search rankings.

## 8. Accessibility and Responsive UX

The primary environment is a smartphone used inside a board-game cafe.

- Make primary actions easy to tap.
- Use semantic HTML.
- Provide visible keyboard focus.
- Support keyboard navigation.
- Associate form controls with labels.
- Do not communicate selected states through color alone.
- Use appropriate contrast and readable text sizes.
- Avoid unnecessary animations.
- Ensure rule sections are easy to navigate while playing.
- Provide useful loading, empty, error, and unavailable-data states.
- Use progressive enhancement where practical.

## 9. Analytics and Privacy

Analytics should measure the product funnel, not collect unnecessary personal information.

Core events include:

- `landing_view`
- `filter_applied`
- `game_detail_viewed`
- `rules_started`
- `rules_section_viewed`
- `game_started_feedback`
- `feedback_submitted`

Additional events may be introduced when there is a specific product question to answer.

- Use consistent event names and documented properties.
- Avoid firing duplicate events during rerenders.
- Do not include sensitive personal information in event properties.
- Do not send secrets or private user content to analytics.
- Follow the analytics provider's consent and privacy requirements.
- Keep analytics optional when its configuration is missing.
- Never fabricate analytics data or claim that a conversion occurred without evidence.
- Prefer simple descriptive events over collecting every possible interaction.

## 10. Testing Requirements

Testing is part of feature development, not a final cleanup task.

### Unit Tests

Add or update tests for meaningful domain logic, including:

- Player-count filtering
- Duration filtering
- Beginner suitability
- Recommendation ranking
- Empty results
- Invalid query parameters
- Missing game data
- Rule content transformations

Tests should be deterministic and independent of external APIs.

### Playwright E2E

Cover the primary user journey:

1. Open the home page.
2. Select group conditions.
3. View matching recommendations.
4. Open a game detail page.
5. Navigate to its rules.
6. View a rule section.
7. Submit feedback if that feature is implemented.
8. Refresh or revisit a shared filtered URL and verify its state.

Also test important empty and error states.

Prefer accessible selectors such as roles and labels over brittle CSS selectors.

Do not make E2E tests depend on live third-party APIs.

### CI

GitHub Actions runs lint, format check, typecheck, unit tests, production build, and Playwright E2E on every pull request and on pushes to `main`.

A feature is not complete when it only works locally; the relevant automated checks must pass.

If a check cannot be run, clearly report why instead of claiming success.

## 11. Security and Configuration

- Never commit secrets, access tokens, or private keys.
- Keep `.env.example` limited to required variable names and safe placeholders.
- Keep server-only credentials out of client components and public bundles.
- Use server-side authorization for protected operations.
- Do not rely on client-side checks as the only access control.
- Validate user-submitted feedback.
- Add reasonable protections against spam and abuse where necessary.
- Do not introduce authentication without a product requirement.

## 12. Optional AI Features

AI functionality is not required for the initial MVP.

If AI is introduced later:

- Use verified game-rule content as the grounding source.
- Make it clear when an answer may be uncertain.
- Do not present unsupported rule interpretations as authoritative.
- Stream responses only when streaming improves the user experience.
- Handle cancellation, errors, timeouts, and rate limits.
- Enforce usage limits on the server.
- Never expose API keys in client code.
- Add tests for failure states.
- Keep deterministic rule navigation available when AI is unavailable.

Do not introduce subscriptions or payment flows solely to increase technical complexity.

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
- Loading, empty, and error states are handled.
- Accessibility basics are satisfied.
- SEO metadata is correct for affected public pages.
- Relevant tests are added or updated.
- Lint, typecheck, tests, and build pass where applicable.
- Documentation reflects the actual behavior.
- No unsupported factual claims or fabricated game data are introduced.

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
