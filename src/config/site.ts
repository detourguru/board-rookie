import { env } from "@/lib/env";

export const siteConfig = {
  name: "BoardRookie",
  description:
    "보드게임 카페에서 우리 일행에 맞는 게임을 고르고, 쉬운 규칙 안내로 첫 판을 시작하세요.",
  url: env.NEXT_PUBLIC_SITE_URL,
  locale: "ko_KR",
  themeColor: "#ffffff",
} as const;
