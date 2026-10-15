import { env } from "@/lib/env";

export const siteConfig = {
  name: "웹토이",
  description: "웹토이 보일러플레이트로 시작한 프로젝트입니다.",
  url: env.NEXT_PUBLIC_SITE_URL,
  locale: "ko_KR",
  themeColor: "#ffffff",
} as const;
