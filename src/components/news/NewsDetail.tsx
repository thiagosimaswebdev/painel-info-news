import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Article } from "@/lib/news.functions";

export function NewsDetail({
  article,
  onBack,
}: {
  article: Article;
  onBack: () => void;
}) {
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <article className="mx-auto max-w-3xl">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Voltar para a lista
      </button>

      <span className="text-xs font-semibold uppercase tracking-wider text-primary">
        {article.source}
        {date ? ` · ${date}` : ""}
      </span>

      <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
        {article.title}
      </h1>

      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className="mt-6 w-full rounded-xl border border-border object-cover"
        />
      )}

      <p className="mt-6 text-lg leading-relaxed text-foreground">
        {article.description ?? ""}
      </p>
      {article.content && (
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {article.content.replace(/\[\+\d+ chars\]$/, "…")}
        </p>
      )}

      <a
        href={article.url}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
      >
        Ler na fonte original <ExternalLink className="size-4" />
      </a>
    </article>
  );
}
