import "./Main.css";
import { Loader2 } from "lucide-react";

import { FeaturedNews } from "@/components/FeaturedNews/FeaturedNews";
import { NewsList } from "@/components/NewsList/NewsList";
import { NewsDetail } from "@/components/NewsDetail/NewsDetail";
import type { Article } from "@/lib/news.functions";

type Props = {
  articles: Article[] | undefined;
  isPending: boolean;
  error: unknown;
  selected: Article | null;
  onSelect: (article: Article | null) => void;
  page: number;
  onPageChange: (page: number) => void;
};

export function Main({ articles, isPending, error, selected, onSelect, page, onPageChange }: Props) {
  return (
    <main className="main">
      {selected ? (
        <NewsDetail article={selected} onBack={() => onSelect(null)} />
      ) : isPending ? (
        <div className="flex flex-col items-center gap-3 py-24 text-muted-foreground">
          <Loader2 className="main__spinner size-8" />
          <p className="text-sm">Carregando notícias...</p>
        </div>
      ) : error ? (
        <p className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center text-sm text-destructive">
          Não foi possível carregar as notícias. Tente novamente em instantes.
        </p>
      ) : !articles || articles.length === 0 ? (
        <p className="py-24 text-center text-muted-foreground">
          Nenhuma notícia encontrada para essa busca.
        </p>
      ) : (
        <>
          <FeaturedNews article={articles[0]} onOpen={onSelect} />
          {articles.length > 1 ? (
            <NewsList
              articles={articles.slice(1)}
              onOpen={onSelect}
              page={page}
              onPageChange={onPageChange}
            />
          ) : null}
        </>
      )}
    </main>
  );
}
