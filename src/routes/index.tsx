import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Main } from "@/components/Main/Main";
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
  const [page, setPage] = useState(1);

  const getNews = useServerFn(fetchNews);
  const { data, isPending, error } = useQuery({
    queryKey: ["news", category, query],
    queryFn: () => getNews({ data: { category, q: query } }),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        category={category}
        onCategoryChange={(c) => {
          setCategory(c);
          setSelected(null);
          setPage(1);
        }}
        query={query}
        onSearch={(q) => {
          setQuery(q);
          setSelected(null);
          setPage(1);
        }}
      />

      <Main
        articles={data}
        isPending={isPending}
        error={error}
        selected={selected}
        onSelect={setSelected}
        page={page}
        onPageChange={setPage}
      />

      <Footer />
    </div>
  );
}
