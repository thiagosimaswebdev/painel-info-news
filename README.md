# Painel Interativo de Notícias

## Problemática
Acompanhar notícias atualizadas exige navegar por vários portais, com muitas distrações e pouca organização por tema. Falta uma forma simples e rápida de ver as principais manchetes por assunto e buscar temas específicos em um só lugar.

## Objetivo
Oferecer um painel limpo e responsivo que exibe notícias em tempo real, com filtro por categoria (Tecnologia, Esportes, Saúde), busca por palavra-chave e leitura detalhada de cada matéria com link para a fonte original.

## Tecnologias utilizadas
- **React 19** (componentes funcionais e hooks)
- **Vite 7** (build e servidor de desenvolvimento)
- **TanStack Start / Router** (roteamento e funções de servidor sobre Vite)
- **TanStack Query** (busca e cache de dados)
- **TypeScript**
- **Tailwind CSS v4** (estilos com tokens de design)
- **Zod** (validação de parâmetros)
- **Lucide React** (ícones)

## API utilizada
[NewsAPI](https://newsapi.org) — endpoint `https://newsapi.org/v2/top-headlines` (parâmetros `country=br`, `category`, `q`), com fallback para `/v2/everything` quando não há manchetes. A chamada é feita no servidor para proteger a chave e evitar bloqueios de CORS.

## Principais funcionalidades
- Notícia principal em destaque, já aberta na tela inicial, com botão **Ler mais**
- Filtro por categoria: Tecnologia, Esportes e Saúde
- Busca por palavra-chave (com botão para limpar)
- Lista de notícias em grid responsivo com paginação (Anterior, Próxima e números de página)
- Página de detalhes com título, imagem, conteúdo e link para a fonte original
- Indicador de carregamento e mensagens de erro / sem resultados
- Layout responsivo para celular, tablet e desktop

## Estrutura do projeto
```
src/
├── components/
│   ├── Header/       Header.tsx + Header.css
│   ├── Main/         Main.tsx + Main.css
│   ├── Footer/       Footer.tsx + Footer.css
│   ├── FeaturedNews/ FeaturedNews.tsx + FeaturedNews.css
│   ├── NewsList/     NewsList.tsx + NewsList.css
│   ├── NewsCard/     NewsCard.tsx + NewsCard.css
│   ├── NewsDetail/   NewsDetail.tsx + NewsDetail.css
│   └── ui/           componentes de interface reutilizáveis
├── lib/news.functions.ts   busca na NewsAPI (função de servidor)
├── routes/
│   ├── __root.tsx    layout raiz (equivalente ao main.jsx)
│   └── index.tsx     página principal (equivalente ao App.jsx)
└── styles.css        estilos globais (equivalente ao global.css)
```

## Como executar
Pré-requisitos: Node.js 20+ (ou Bun).

```sh
git clone <url-do-repositorio>
cd painel-interativo-de-noticias
npm install
```

Crie um arquivo `.env` na raiz com sua chave gratuita da NewsAPI:
```
NEWSAPI_KEY=sua_chave_aqui
```

Rode em desenvolvimento:
```sh
npm run dev
```
Acesse `http://localhost:8080`. Para gerar a versão de produção: `npm run build`.

## Aplicação publicada
🔗 _adicione aqui o link da aplicação publicada_

## Uso de Inteligência Artificial
Este projeto foi desenvolvido com apoio da plataforma **Lovable**, uma ferramenta de IA para criação de aplicações web. A IA foi utilizada para gerar a estrutura inicial, os componentes, a integração com a NewsAPI e os ajustes de layout (destaque e paginação), a partir de prompts escritos pelo autor. Todo o resultado foi revisado, testado e validado manualmente.
