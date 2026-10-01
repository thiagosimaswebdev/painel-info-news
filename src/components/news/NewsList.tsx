import type { Article } from "@/lib/news.functions";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NewsCard } from "./NewsCard";

export const NEWS_PER_PAGE = 6;

export function NewsList({
  articles,
  onOpen,
  page,
  onPageChange,
}: {
  articles: Article[];
  onOpen: (a: Article) => void;
  page: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(articles.length / NEWS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const firstItem = (safePage - 1) * NEWS_PER_PAGE;
  const visibleArticles = articles.slice(firstItem, firstItem + NEWS_PER_PAGE);

  const changePage = (nextPage: number) => {
    onPageChange(nextPage);
    window.requestAnimationFrame(() => {
      document.getElementById("latest-news")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section id="latest-news" aria-labelledby="latest-news-title" className="scroll-mt-40 pt-10">
      <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-primary">Últimas notícias</p>
          <h2 id="latest-news-title" className="mt-1 font-display text-2xl font-bold text-foreground">
            Mais para você
          </h2>
        </div>
        <p className="shrink-0 text-sm text-muted-foreground">
          Página {safePage} de {totalPages}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleArticles.map((article) => (
          <NewsCard key={article.id} article={article} onOpen={onOpen} />
        ))}
      </div>

      {totalPages > 1 ? (
        <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Paginação das notícias">
          <Button
            variant="outline"
            onClick={() => changePage(safePage - 1)}
            disabled={safePage === 1}
            aria-label="Voltar para a página anterior"
          >
            <ChevronLeft />
            <span className="hidden sm:inline">Anterior</span>
          </Button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <Button
              key={pageNumber}
              variant={pageNumber === safePage ? "default" : "ghost"}
              size="icon"
              onClick={() => changePage(pageNumber)}
              aria-label={`Ir para a página ${pageNumber}`}
              aria-current={pageNumber === safePage ? "page" : undefined}
            >
              {pageNumber}
            </Button>
          ))}

          <Button
            variant="outline"
            onClick={() => changePage(safePage + 1)}
            disabled={safePage === totalPages}
            aria-label="Avançar para a próxima página"
          >
            <span className="hidden sm:inline">Próxima</span>
            <ChevronRight />
          </Button>
        </nav>
      ) : null}
    </section>
  );
}
