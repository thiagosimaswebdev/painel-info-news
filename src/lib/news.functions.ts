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
  article_id?: string | null;
  title?: string | null;
  description?: string | null;
  content?: string | null;
  link?: string | null;
  image_url?: string | null;
  pubDate?: string | null;
  source_name?: string | null;
  source_id?: string | null;
};

const PAID_ONLY = /ONLY AVAILABLE/i;
const CACHE_MS = 10 * 60 * 1000;
const cache = new Map<string, { at: number; data: Article[] }>();

function normalize(list: RawArticle[]): Article[] {
  const seen = new Set<string>();
  return list
    .filter((a) => a?.title && a.link)
    .filter((a) => {
      const key = (a.title as string).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((a) => ({
      id: a.article_id ?? (a.link as string),
      title: a.title as string,
      description: a.description && !PAID_ONLY.test(a.description) ? a.description : null,
      content: a.content && !PAID_ONLY.test(a.content) ? a.content : null,
      url: a.link as string,
      image: a.image_url ?? null,
      source: a.source_name ?? a.source_id ?? "Fonte desconhecida",
      publishedAt: a.pubDate ? `${a.pubDate.replace(" ", "T")}Z` : null,
    }));
}

export const fetchNews = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<Article[]> => {
    const apiKey = process.env["NEWSDATA_KEY"];
    if (!apiKey) throw new Error("Chave da NewsData.io não configurada.");

    const q = data.q.trim();
    const cacheKey = `${data.category}|${q.toLowerCase()}`;
    const hit = cache.get(cacheKey);
    if (hit && Date.now() - hit.at < CACHE_MS) return hit.data;

    const params = new URLSearchParams({
      apikey: apiKey,
      country: "br",
      language: "pt",
      category: data.category,
    });
    if (q) params.set("q", q);

    const res = await fetch(`https://newsdata.io/api/1/latest?${params}`);
    const json = (await res.json()) as {
      status?: string;
      results?: RawArticle[] | { message?: string };
    };
    if (!res.ok || json.status !== "success" || !Array.isArray(json.results)) {
      const msg = !Array.isArray(json.results) ? json.results?.message : undefined;
      throw new Error(msg || "Não foi possível carregar as notícias.");
    }

    const articles = normalize(json.results);
    cache.set(cacheKey, { at: Date.now(), data: articles });
    return articles;
  });
