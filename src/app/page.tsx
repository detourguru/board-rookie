import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
      <h1 className="text-3xl font-bold">{siteConfig.name}</h1>
      <p className="text-muted-foreground">보드게임 루키를 첫 판까지</p>
    </main>
  );
}
