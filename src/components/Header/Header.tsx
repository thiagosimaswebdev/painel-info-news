import "./Header.css";
import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";

export const CATEGORIES = [
  { id: "technology", label: "Tecnologia" },
  { id: "sports", label: "Esportes" },
  { id: "health", label: "Saúde" },
] as const;

type Props = {
  category: string;
  onCategoryChange: (id: string) => void;
  query: string;
  onSearch: (q: string) => void;
};

export function Header({ category, onCategoryChange, query, onSearch }: Props) {
  const [draft, setDraft] = useState(query);

  function submit(e: FormEvent) {
    e.preventDefault();
    onSearch(draft);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card shadow-header">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
        <button
          onClick={() => {
            setDraft("");
            onSearch("");
          }}
          className="text-left font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl"
        >
          Painel de <span className="text-primary">Notícias</span>
        </button>

        <form onSubmit={submit} className="relative w-full md:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Buscar notícias..."
            aria-label="Buscar notícias"
            className="w-full rounded-full border border-border bg-background py-2.5 pl-9 pr-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
          />
        </form>
      </div>

      <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-5 pb-3">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => onCategoryChange(c.id)}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition ${
              category === c.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
          >
            {c.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
