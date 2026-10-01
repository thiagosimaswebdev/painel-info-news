export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-5 py-8 text-center text-sm text-muted-foreground">
        <p className="font-display text-base font-semibold text-foreground">
          Painel Interativo de Notícias
        </p>
        <p className="mt-1">Dados fornecidos pela NewsAPI · {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
