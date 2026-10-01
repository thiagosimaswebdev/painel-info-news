import type { Article } from "@/lib/news.functions";

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
        <button
          onClick={() => onOpen(article)}
          className="mt-auto self-start rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 active:scale-95"
        >
          Ver mais
        </button>
      </div>
    </article>
  );
}
