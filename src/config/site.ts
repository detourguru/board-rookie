import { env } from "@/lib/env";

export const siteConfig = {
  name: "꼬리질문",
  description:
    "CS와 프론트엔드 면접 개념을 내 말로 설명하면, AI가 빠진 핵심 포인트를 짚고 꼬리 질문으로 이해를 확인해 줍니다.",
  url: env.NEXT_PUBLIC_SITE_URL,
  locale: "ko_KR",
  themeColor: "#ffffff",
} as const;
