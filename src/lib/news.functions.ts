import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type Article = {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  url: string;
  image: string | null;
  source: string;
  publishedAt: string | null;
};

const inputSchema = z.object({
  category: z.string().default("technology"),
  q: z.string().default(""),
});

type RawArticle = {
  title?: string | null;
  description?: string | null;
  content?: string | null;
  url?: string | null;
  urlToImage?: string | null;
  publishedAt?: string | null;
  source?: { name?: string | null } | null;
};

function normalize(list: RawArticle[]): Article[] {
  return list
    .filter((a) => a?.title && a.title !== "[Removed]" && a.url)
    .map((a) => ({
      id: a.url as string,
      title: a.title as string,
      description: a.description ?? null,
      content: a.content ?? null,
      url: a.url as string,
      image: a.urlToImage ?? null,
      source: a.source?.name ?? "Fonte desconhecida",
      publishedAt: a.publishedAt ?? null,
    }));
}

export const fetchNews = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<Article[]> => {
    const apiKey = process.env["NEWSAPI_KEY"];
    if (!apiKey) throw new Error("Chave da NewsAPI não configurada.");

    const call = async (url: string) => {
      const res = await fetch(url, { headers: { "X-Api-Key": apiKey } });
      const json = (await res.json()) as {
        status?: string;
        message?: string;
        articles?: RawArticle[];
      };
      if (!res.ok || json.status !== "ok") {
        throw new Error(json.message || "Não foi possível carregar as notícias.");
      }
      return normalize(json.articles ?? []);
    };

    const params = new URLSearchParams({ pageSize: "24", language: "pt" });
    if (data.q.trim()) params.set("q", data.q.trim());

    const headlines = new URLSearchParams(params);
    headlines.delete("language");
    headlines.set("country", "br");
    headlines.set("category", data.category);

    let articles = await call(`https://newsapi.org/v2/top-headlines?${headlines}`);

    if (articles.length === 0) {
      const everything = new URLSearchParams(params);
      everything.set("sortBy", "publishedAt");
      if (!everything.get("q")) everything.set("q", data.category);
      articles = await call(`https://newsapi.org/v2/everything?${everything}`);
    }

    return articles;
  });
