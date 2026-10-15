import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
      <h1 className="text-3xl font-bold">{siteConfig.name}</h1>
      <p className="text-muted-foreground">
        개념을 내 말로 설명하고 꼬리 질문까지 답해 보세요
      </p>
    </main>
  );
}
