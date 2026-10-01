import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Header } from "@/components/news/Header";
import { Footer } from "@/components/news/Footer";
import { NewsList } from "@/components/news/NewsList";
import { NewsDetail } from "@/components/news/NewsDetail";
import { fetchNews, type Article } from "@/lib/news.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Painel Interativo de Notícias" },
      {
        name: "description",
        content:
          "Notícias em tempo real com busca por palavra-chave, filtro por categoria e leitura detalhada.",
      },
      { property: "og:title", content: "Painel Interativo de Notícias" },
      {
        property: "og:description",
        content: "Acompanhe manchetes de tecnologia, esportes e saúde em tempo real.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [category, setCategory] = useState("technology");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Article | null>(null);

  const getNews = useServerFn(fetchNews);
  const { data, isPending, error } = useQuery({
    queryKey: ["news", category, query],
    queryFn: () => getNews({ data: { category, q: query } }),
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        category={category}
        onCategoryChange={(c) => {
          setCategory(c);
          setSelected(null);
        }}
        query={query}
        onSearch={(q) => {
          setQuery(q);
          setSelected(null);
        }}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8">
        {selected ? (
          <NewsDetail article={selected} onBack={() => setSelected(null)} />
        ) : isPending ? (
          <div className="flex flex-col items-center gap-3 py-24 text-muted-foreground">
            <Loader2 className="size-8 animate-spin text-primary" />
            <p className="text-sm">Carregando notícias...</p>
          </div>
        ) : error ? (
          <p className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center text-sm text-destructive">
            Não foi possível carregar as notícias. Tente novamente em instantes.
          </p>
        ) : !data || data.length === 0 ? (
          <p className="py-24 text-center text-muted-foreground">
            Nenhuma notícia encontrada para essa busca.
          </p>
        ) : (
          <NewsList articles={data} onOpen={setSelected} />
        )}
      </main>

      <Footer />
    </div>
  );
}
