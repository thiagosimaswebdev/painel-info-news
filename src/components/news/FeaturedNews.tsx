import { ArrowRight, CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Article } from "@/lib/news.functions";

export function FeaturedNews({
  article,
  onOpen,
}: {
  article: Article | undefined;
  onOpen: (article: Article) => void;
}) {
  if (!article) return null;

  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <section aria-labelledby="featured-title" className="border-b border-border pb-10">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px w-8 bg-primary" aria-hidden="true" />
        <p className="text-xs font-bold uppercase tracking-wider text-primary">Em destaque</p>
      </div>

      <article className="grid overflow-hidden rounded-lg border border-border bg-card shadow-card md:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
        <div className="aspect-[16/10] min-h-64 overflow-hidden bg-muted md:aspect-auto">
          {article.image ? (
            <img
              src={article.image}
              alt={article.title}
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
              Sem imagem
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <span>{article.source}</span>
            {date ? (
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <CalendarDays className="size-3.5" />
                {date}
              </span>
            ) : null}
          </div>

          <h1
            id="featured-title"
            className="mt-4 font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl"
          >
            {article.title}
          </h1>
          <p className="mt-4 line-clamp-4 leading-relaxed text-muted-foreground">
            {article.description ?? "Resumo não disponível."}
          </p>
          <Button className="mt-6 w-fit" size="lg" onClick={() => onOpen(article)}>
            Ler mais
            <ArrowRight />
          </Button>
        </div>
      </article>
    </section>
  );
}