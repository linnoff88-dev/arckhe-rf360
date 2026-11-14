# RF360 - Marketplace de TÃ©cnicos de EletrÃ´nica

Plataforma que conecta clientes a tÃ©cnicos especializados em reparo de eletrÃ´nicos (celulares, notebooks, TVs, videogames, tablets, computadores e mais). Inclui orÃ§amento automÃ¡tico via WhatsApp, dashboard para tÃ©cnicos, sistema de avaliaÃ§Ãµes e gamificaÃ§Ã£o.

## Stack TecnolÃ³gico

- **Frontend:** Next.js 14+ (App Router), React 18, TypeScript
- **Styling:** TailwindCSS, Shadcn/ui
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL (Supabase)
- **Auth:** Supabase Auth
- **Realtime:** Supabase Realtime
- **Storage:** Supabase Storage
- **AutomaÃ§Ã£o:** n8n Cloud (WhatsApp)
- **Deploy:** Vercel

## Estrutura do Projeto

```
RF360/
â”œâ”€â”€ apps/
â”‚   â””â”€â”€ web/                 # Next.js frontend
â”‚       â”œâ”€â”€ app/             # App Router pages
â”‚       â”œâ”€â”€ components/      # Componentes React
â”‚       â””â”€â”€ lib/             # UtilitÃ¡rios
â”œâ”€â”€ packages/
â”‚   â”œâ”€â”€ database/            # Prisma schema e client
â”‚   â””â”€â”€ ui/                  # Componentes UI compartilhados
â”œâ”€â”€ docs/                    # DocumentaÃ§Ã£o do projeto
â”‚   â”œâ”€â”€ prd.md               # Product Requirements Document
â”‚   â”œâ”€â”€ architecture.md      # Arquitetura tÃ©cnica
â”‚   â”œâ”€â”€ front-end-spec.md    # EspecificaÃ§Ã£o de UI
â”‚   â””â”€â”€ backlog.md           # Backlog priorizado
â””â”€â”€ doc/                     # Documentos originais
```

## PrÃ©-requisitos

- Node.js 20+
- npm 10+ ou pnpm
- Conta Supabase (gratuita)
- (Opcional) Conta n8n Cloud

## Setup Local

### 1. Clone o repositÃ³rio

```bash
git clone git@github.com:inematds/RF360.git
cd RF360
```

### 2. Instale as dependÃªncias

```bash
npm install
```

### 3. Configure as variÃ¡veis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais do Supabase:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL`
- `DIRECT_URL`

### 4. Configure o banco de dados

```bash
# Gerar o Prisma Client
npm run db:generate

# Aplicar o schema no banco (push)
npm run db:push

# Rodar seed com dados iniciais
npm run db:seed
```

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Scripts DisponÃ­veis

| Comando | DescriÃ§Ã£o |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera build de produÃ§Ã£o |
| `npm run lint` | Executa o linter |
| `npm run type-check` | Verifica tipos TypeScript |
| `npm run db:generate` | Gera Prisma Client |
| `npm run db:push` | Aplica schema no banco |
| `npm run db:seed` | Popula banco com dados iniciais |

## ConfiguraÃ§Ã£o do Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Habilite Row Level Security (RLS) nas tabelas
3. Configure Storage buckets: `avatars` (pÃºblico), `documentos` (privado), `os-fotos` (privado)
4. Configure Authentication providers conforme necessÃ¡rio

## DocumentaÃ§Ã£o

- [PRD - Requisitos do Produto](./docs/prd.md)
- [Arquitetura TÃ©cnica](./docs/architecture.md)
- [EspecificaÃ§Ã£o de UI](./docs/front-end-spec.md)
- [Backlog Priorizado](./docs/backlog.md)

## Roadmap MVP

1. **Sprint 1:** FundaÃ§Ã£o (Setup, Schema, Auth, Layout)
2. **Sprint 2:** MÃ³dulo TÃ©cnico (Cadastro, Perfil, Dashboard)
3. **Sprint 3:** Ordens de ServiÃ§o (CRUD, Status, Timeline)
4. **Sprint 4:** WhatsApp Core (Webhook, FSM, NotificaÃ§Ãµes)
5. **Sprint 5:** Matching e OrÃ§amento AutomÃ¡tico

## LicenÃ§a

ProprietÃ¡rio - Todos os direitos reservados.

---

Desenvolvido com [BMAD Method](https://github.com/bmadcode/bmad-method)

---

Projeto adaptado da comunidade INEMA TDS - Marca Arckhe