import type { Article } from "@/lib/news.functions";
import { NewsCard } from "./NewsCard";

export function NewsList({
  articles,
  onOpen,
}: {
  articles: Article[];
  onOpen: (a: Article) => void;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((a) => (
        <NewsCard key={a.id} article={a} onOpen={onOpen} />
      ))}
    </div>
  );
}
