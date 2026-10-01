import type { Article } from "@/lib/news.functions";
import { Button } from "@/components/ui/button";

export function NewsCard({
  article,
  onOpen,
}: {
  article: Article;
  onOpen: (a: Article) => void;
}) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-card-hover">
      <div className="aspect-[16/9] overflow-hidden bg-muted">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            className="size-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
            Sem imagem
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          {article.source}
        </span>
        <h3 className="font-display text-lg font-bold leading-snug text-foreground">
          {article.title}
        </h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {article.description ?? "Resumo não disponível."}
        </p>
        <Button
          onClick={() => onOpen(article)}
          className="mt-auto self-start"
        >
          Ler mais
        </Button>
      </div>
    </article>
  );
}
