<h1 align="center">🎮 SRFV Games</h1>

<p align="center">
  Jogue clássicos do PS1, assista filmes icônicos e baixe artes da comunidade — tudo grátis, direto no navegador.
</p>

<p align="center">
  <a href="https://testesitezin-app.vercel.app">🌐 Acesse o site</a> &nbsp;·&nbsp;
  <a href="https://discord.gg/jqpxr8RM">💬 Discord</a>
</p>

---

## Sobre

**SRFV Games** é uma plataforma web que reúne jogos retro (PS1/Arcade) jogáveis no navegador, filmes completos sobre games e cultura pop, e uma galeria de artes feitas pela comunidade. O projeto conta com autenticação de usuários, perfis personalizáveis com avatar e banner, e suporte a 4 idiomas.

## ✨ Funcionalidades

- 🕹️ **Jogos retro** — 12 jogos (Tekken 3, Crash, Resident Evil 3, Metal Slug, Final Fantasy VII, etc.) emulados via iframe
- 🎬 **Filmes** — 8 filmes (Donnie Darko, Resident Evil, Sonic 2, Super Mario Bros, etc.) via YouTube embed
- 🎨 **Galeria de Artes** — Artes da comunidade com download, ratings e contagem de views
- 🔐 **Autenticação** — Login, cadastro e gerenciamento de perfil com Supabase Auth
- 👤 **Perfil customizável** — Upload de avatar e banner, edição de nome, bio e senha
- 🌍 **Internacionalização (i18n)** — Português (BR), English, Español e 中文
- 🎨 **Design moderno** — Glass morphism, gradient accents, animações fade-in, noise grain overlay

## 🛠️ Tech Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Linguagem | [TypeScript](https://www.typescriptlang.org/) |
| UI | [React 18](https://react.dev/) + [Tailwind CSS 3.4](https://tailwindcss.com/) |
| Auth & Storage | [Supabase](https://supabase.com/) (Auth + Storage bucket) |
| i18n | [next-intl](https://next-intl-docs.vercel.app/) |
| Deploy | [Vercel](https://vercel.com/) |

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── api/upload/         # API de upload de avatar/banner (server-side)
│   ├── globals.css         # Estilos globais (glass morphism, gradients)
│   ├── layout.tsx          # Root layout
│   └── [locale]/           # Rotas com i18n
│       ├── page.tsx        # Home — hero, artes populares, jogos, filmes, serviços
│       ├── games1/         # Listagem de jogos
│       ├── movies1/        # Listagem de filmes
│       ├── art1/           # Galeria de artes da comunidade
│       ├── play/[slug]/    # Player embed (jogo ou filme)
│       ├── login/          # Página de login
│       ├── signup/         # Página de cadastro
│       └── update/         # Perfil do usuário (avatar, banner, bio, senha)
├── components/
│   ├── Header.tsx          # Header com glassmorphism e navegação
│   └── Footer.tsx          # Footer com link Discord
├── lib/
│   ├── AuthContext.tsx      # Context de autenticação (Supabase)
│   ├── supabase.ts          # Cliente Supabase
│   └── embeds.ts            # Catálogo de jogos e filmes
└── i18n/                    # Configuração next-intl
messages/
├── pt-BR.json               # Português (Brasil)
├── en.json                  # English
├── es.json                  # Español
└── zh.json                  # 中文
```

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- Conta no [Supabase](https://supabase.com/) (projeto com Auth e Storage habilitados)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/VictorLima96/SRFV_REDUX.git
cd SRFV_REDUX

# Instale as dependências
npm install
```

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
```

### Rodando localmente

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### Build de produção

```bash
npm run build
npm start
```

## 🌐 Deploy

O projeto está configurado para deploy na Vercel com detecção automática do framework Next.js (via `vercel.json`).

```bash
vercel --prod
```

**Variáveis de ambiente necessárias na Vercel:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 🔒 Segurança

- CSP headers configurados no `next.config.js`
- Service role key somente no servidor (variável de ambiente, nunca no client)
- Upload de arquivos validado server-side (tipo, tamanho, extensão)
- Bucket de storage com políticas de acesso via Supabase RLS

## 📝 Licença

Este projeto é de uso pessoal/educacional. © 2026 SRFV Games.
