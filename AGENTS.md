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
