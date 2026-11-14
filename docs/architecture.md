# RF360 - Fullstack Architecture Document

**Versão:** 1.0
**Data:** 22/01/2026
**Autor:** Winston (Architect)
**Status:** Draft para Revisão

---

## 1. Introduction

Este documento define a arquitetura fullstack completa para o RF360 - Marketplace de Técnicos de Eletrônica. Ele serve como fonte única de verdade para o desenvolvimento, garantindo consistência em toda a stack tecnológica.

A arquitetura foi projetada para suportar:
- Atendimento automatizado via WhatsApp
- Dashboard web para técnicos, atendentes e administradores
- Sistema de gamificação e reputação
- Matching inteligente entre clientes e técnicos
- Escalabilidade para milhares de usuários simultâneos

### 1.1 Starter Template

**N/A - Greenfield project**

O projeto será iniciado do zero utilizando as melhores práticas e ferramentas modernas definidas neste documento.

### 1.2 Change Log

| Data | Versão | Descrição | Autor |
|------|--------|-----------|-------|
| 22/01/2026 | 1.0 | Criação inicial da arquitetura | Winston (Architect) |

---

## 2. High Level Architecture

### 2.1 Technical Summary

O RF360 utiliza uma arquitetura **Monolith Modular** com **Next.js 14+** como framework fullstack, combinando Server Components, API Routes e Server Actions. O backend é complementado pelo **Supabase** como Backend-as-a-Service, fornecendo PostgreSQL, autenticação, realtime e storage. A automação de WhatsApp é gerenciada pelo **n8n Cloud**, que orquestra webhooks e notificações.

A infraestrutura é hospedada na **Vercel** (frontend + API) com **Supabase Cloud** (banco de dados + serviços), oferecendo escalabilidade automática, deploy contínuo e custo otimizado para MVP. Esta arquitetura permite desenvolvimento rápido enquanto mantém caminho claro para escala.

### 2.2 Platform and Infrastructure Choice

**Platform:** Vercel + Supabase + n8n Cloud

**Key Services:**
- **Vercel:** Hosting, Edge Functions, Preview Deployments, Analytics
- **Supabase:** PostgreSQL, Auth, Realtime, Storage, Edge Functions
- **n8n Cloud:** Workflow automation, WhatsApp integration
- **Upstash:** Redis para rate limiting e cache (opcional)

**Deployment Regions:**
- **Primary:** São Paulo (GRU) - Vercel + Supabase
- **CDN:** Global Edge Network (Vercel)

### 2.3 Repository Structure

**Structure:** Monorepo
**Tool:** Turborepo
**Package Organization:** Apps + Packages compartilhados

```
RF360/
├── apps/
│   └── web/              # Next.js application (frontend + API)
├── packages/
│   ├── database/         # Prisma schema + client
│   ├── ui/               # Shared UI components
│   └── shared/           # Types, utils, constants
├── infrastructure/       # IaC (se necessário)
└── docs/                 # Documentation
```

### 2.4 High Level Architecture Diagram

```mermaid
graph TB
    subgraph "Clients"
        WA[WhatsApp Users]
        WEB[Web Users]
    end

    subgraph "Edge Layer"
        VERCEL[Vercel Edge Network]
        CDN[CDN / Static Assets]
    end

    subgraph "Application Layer"
        NEXT[Next.js App]
        API[API Routes]
        RSC[React Server Components]
        SA[Server Actions]
    end

    subgraph "External Services"
        N8N[n8n Cloud]
        WAPI[WhatsApp Cloud API]
        STRIPE[Stripe Payments]
    end

    subgraph "Supabase"
        AUTH[Supabase Auth]
        PG[(PostgreSQL)]
        RT[Realtime]
        STORAGE[Storage]
        EDGE[Edge Functions]
    end

    subgraph "Optional"
        REDIS[(Upstash Redis)]
    end

    WA -->|Messages| WAPI
    WAPI -->|Webhook| N8N
    N8N -->|API Calls| API
    N8N -->|Send Messages| WAPI

    WEB --> VERCEL
    VERCEL --> CDN
    VERCEL --> NEXT

    NEXT --> RSC
    NEXT --> API
    NEXT --> SA

    API --> AUTH
    API --> PG
    API --> RT
    API --> STORAGE
    SA --> PG

    API -.-> REDIS
    API --> STRIPE
```

### 2.5 Architectural Patterns

- **Server-First Architecture:** Utilização de React Server Components e Server Actions para minimizar JavaScript no cliente, melhor SEO e performance inicial. _Rationale:_ Next.js 14+ oferece este paradigma nativamente, reduzindo bundle size e melhorando Core Web Vitals.

- **Repository Pattern:** Abstração da camada de acesso a dados via Prisma Client encapsulado em services. _Rationale:_ Facilita testes, manutenção e eventual migração de banco de dados.

- **Event-Driven Notifications:** Sistema de eventos para notificações WhatsApp via n8n, desacoplando lógica de negócio de delivery. _Rationale:_ Permite retry, logging e evolução independente do canal de notificação.

- **Optimistic UI:** Updates otimistas no frontend com rollback em caso de erro. _Rationale:_ Melhora percepção de performance para ações do usuário.

- **BFF Pattern (Backend for Frontend):** API Routes do Next.js atuam como BFF, agregando dados e formatando para necessidades específicas do frontend. _Rationale:_ Reduz over-fetching e simplifica lógica do cliente.

- **Feature-Based Organization:** Código organizado por feature/domínio ao invés de tipo técnico. _Rationale:_ Facilita manutenção, onboarding e isolamento de mudanças.

---

## 3. Tech Stack

### 3.1 Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|------------|---------|---------|-----------|
| Frontend Language | TypeScript | 5.3+ | Type safety | Reduz bugs, melhor DX, autocomplete |
| Frontend Framework | Next.js | 14.1+ | Fullstack React | SSR, RSC, API Routes, melhor ecossistema |
| UI Component Library | Shadcn/ui | Latest | Componentes base | Acessível, customizável, não é dependência |
| CSS Framework | TailwindCSS | 3.4+ | Styling | Produtividade, consistência, purge automático |
| State Management | Zustand | 4.5+ | Client state | Simples, performático, TypeScript nativo |
| Server State | TanStack Query | 5.0+ | Data fetching | Cache, mutations, devtools |
| Backend Language | TypeScript | 5.3+ | Type safety | Compartilhar tipos com frontend |
| Backend Framework | Next.js API Routes | 14.1+ | REST API | Integrado, serverless-ready |
| ORM | Prisma | 5.9+ | Database access | Type-safe, migrations, studio |
| Database | PostgreSQL | 15+ | Primary database | Relacional, robusto, Supabase |
| Realtime | Supabase Realtime | Latest | WebSocket | Chat, notifications, status updates |
| Cache | Upstash Redis | Latest | Rate limiting, sessions | Serverless-friendly, pay-per-use |
| File Storage | Supabase Storage | Latest | Images, documents | Integrado, CDN, transformations |
| Authentication | Supabase Auth | Latest | User auth | JWT, OAuth, Row Level Security |
| Payments | Stripe | Latest | Subscriptions | Confiável, boa documentação |
| Frontend Testing | Vitest + Testing Library | Latest | Unit/Integration | Rápido, compatível com Jest |
| E2E Testing | Playwright | Latest | End-to-end | Cross-browser, confiável |
| Build Tool | Turborepo | Latest | Monorepo | Cache, parallel tasks |
| Bundler | Next.js (Turbopack) | 14.1+ | Build | Integrado, rápido |
| CI/CD | GitHub Actions | Latest | Automation | Integrado com Vercel |
| Monitoring | Vercel Analytics | Latest | Performance | Integrado, Core Web Vitals |
| Error Tracking | Sentry | Latest | Error monitoring | Stack traces, breadcrumbs |
| Logging | Axiom | Latest | Structured logs | Serverless-friendly |
| WhatsApp | Meta Cloud API | v18+ | Messaging | Oficial, confiável |
| Automation | n8n Cloud | Latest | Workflows | Visual, extensível |

---

## 4. Data Models

### 4.1 User

**Purpose:** Base para todos os tipos de usuários do sistema.

**Key Attributes:**
- `id`: UUID - Identificador único
- `email`: String - Email único
- `role`: Enum - CLIENTE, TECNICO, ATENDENTE, ADMIN
- `createdAt`: DateTime - Data de criação

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  avatarUrl: string | null;
  role: 'CLIENTE' | 'TECNICO' | 'ATENDENTE' | 'ADMIN';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

**Relationships:**
- Has one Tecnico (if role = TECNICO)
- Has one Cliente (if role = CLIENTE)
- Has many Conversas (as atendente)

### 4.2 Tecnico

**Purpose:** Perfil estendido para técnicos da plataforma.

```typescript
interface Tecnico {
  id: string;
  userId: string;
  slug: string; // URL-friendly unique identifier
  bio: string | null;
  documento: string; // CPF ou CNPJ
  documentoVerificado: boolean;

  // Localização
  cep: string;
  cidade: string;
  estado: string;
  endereco: string | null;
  latitude: number | null;
  longitude: number | null;
  raioAtendimentoKm: number;
  atendeEmDomicilio: boolean;

  // Status
  status: 'PENDENTE' | 'APROVADO' | 'SUSPENSO' | 'REJEITADO';
  plano: 'GRATUITO' | 'PRO' | 'PREMIUM';
  planoExpiraEm: Date | null;

  // Métricas (desnormalizadas para performance)
  avaliacaoMedia: number;
  totalAvaliacoes: number;
  totalAtendimentos: number;

  createdAt: Date;
  updatedAt: Date;
}
```

**Relationships:**
- Belongs to User
- Has many TecnicoServico
- Has many TecnicoBadge
- Has many OrdemServico
- Has many Avaliacao

### 4.3 Cliente

**Purpose:** Perfil de clientes que solicitam serviços.

```typescript
interface Cliente {
  id: string;
  userId: string;
  cpf: string | null;

  // Localização
  cep: string | null;
  cidade: string | null;
  estado: string | null;

  // Preferências
  optInMarketing: boolean;
  codigoIndicacao: string; // Código único para indicações
  indicadoPor: string | null; // clienteId que indicou

  createdAt: Date;
  updatedAt: Date;
}
```

**Relationships:**
- Belongs to User
- Has many OrdemServico
- Has many Avaliacao

### 4.4 CatalogoServico

**Purpose:** Catálogo base de serviços com preços de referência.

```typescript
interface CatalogoServico {
  id: string;
  nome: string;
  descricao: string | null;
  categoria: string; // Ex: "TELA", "BATERIA", "PLACA"

  // Filtros
  marcas: string[]; // ["APPLE", "SAMSUNG", "XIAOMI", "MOTOROLA", "OUTRO"]

  // Preços de referência
  precoMinimo: number;
  precoMaximo: number;
  tempoEstimadoHoras: number;

  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.5 TecnicoServico

**Purpose:** Serviços oferecidos por cada técnico com preços personalizados.

```typescript
interface TecnicoServico {
  id: string;
  tecnicoId: string;
  catalogoServicoId: string;

  // Preço personalizado (ou usa o do catálogo)
  precoPersonalizado: number | null;
  tempoPersonalizadoHoras: number | null;
  observacoes: string | null;

  isActive: boolean;
  ordem: number; // Para ordenação no perfil

  createdAt: Date;
  updatedAt: Date;
}
```

### 4.6 OrdemServico

**Purpose:** Ordem de serviço completa com todo o ciclo de vida.

```typescript
interface OrdemServico {
  id: string;
  numero: string; // RF-YYYYMMDD-XXXX

  // Relacionamentos
  clienteId: string;
  tecnicoId: string;

  // Aparelho
  marca: string;
  modelo: string;
  imei: string | null;
  cor: string | null;

  // Defeito
  defeitoRelatado: string;
  defeitoEncontrado: string | null;

  // Status
  status: OSStatus;

  // Valores
  valorOrcado: number | null;
  valorFinal: number | null;

  // Datas
  dataEntrada: Date;
  dataPrevisao: Date | null;
  dataAprovacao: Date | null;
  dataConclusao: Date | null;
  dataEntrega: Date | null;

  // Garantia
  garantiaDias: number;
  garantiaAte: Date | null;

  // Observações
  observacoesInternas: string | null;
  observacoesCliente: string | null;

  createdAt: Date;
  updatedAt: Date;
}

type OSStatus =
  | 'RECEBIDO'
  | 'DIAGNOSTICO'
  | 'ORCAMENTO_ENVIADO'
  | 'APROVADO'
  | 'RECUSADO'
  | 'EM_REPARO'
  | 'CONCLUIDO'
  | 'ENTREGUE'
  | 'DEVOLVIDO';
```

### 4.7 OSEvento

**Purpose:** Histórico de eventos/mudanças de status da OS.

```typescript
interface OSEvento {
  id: string;
  ordemServicoId: string;

  statusAnterior: OSStatus | null;
  statusNovo: OSStatus;

  observacao: string | null;
  usuarioId: string; // Quem fez a mudança

  createdAt: Date;
}
```

### 4.8 Avaliacao

**Purpose:** Avaliações de clientes sobre técnicos.

```typescript
interface Avaliacao {
  id: string;
  ordemServicoId: string;
  clienteId: string;
  tecnicoId: string;

  nota: number; // 1-5
  comentario: string | null;

  // Moderação
  isAprovada: boolean;
  motivoRejeicao: string | null;

  createdAt: Date;
}
```

### 4.9 Badge

**Purpose:** Definição de badges disponíveis no sistema.

```typescript
interface Badge {
  id: string;
  codigo: string; // Ex: "EXPERT_100", "CINCO_ESTRELAS"
  nome: string;
  descricao: string;
  icone: string; // URL ou emoji

  // Critérios (JSON para flexibilidade)
  criterios: BadgeCriterio;

  isActive: boolean;
  ordem: number;

  createdAt: Date;
}

interface BadgeCriterio {
  tipo: 'ATENDIMENTOS' | 'AVALIACAO' | 'ESPECIALIDADE' | 'TEMPO_RESPOSTA';
  minimo: number;
  especialidade?: string;
}
```

### 4.10 TecnicoBadge

**Purpose:** Badges conquistados por cada técnico.

```typescript
interface TecnicoBadge {
  id: string;
  tecnicoId: string;
  badgeId: string;

  conquistadoEm: Date;
}
```

### 4.11 Conversa

**Purpose:** Estado e contexto de conversas WhatsApp.

```typescript
interface Conversa {
  id: string;

  telefone: string; // E.164 format
  clienteId: string | null; // Pode não ter cliente ainda

  // Estado da máquina de estados
  estado: ConversaEstado;
  contexto: Record<string, any>; // JSON com dados do fluxo atual

  // Atendimento humano
  botAtivo: boolean;
  atendenteId: string | null;

  ultimaMensagemEm: Date;
  createdAt: Date;
  updatedAt: Date;
}

type ConversaEstado =
  | 'INICIO'
  | 'MENU'
  | 'ORCAMENTO_MARCA'
  | 'ORCAMENTO_MODELO'
  | 'ORCAMENTO_PROBLEMA'
  | 'ORCAMENTO_RESULTADO'
  | 'ACOMPANHAMENTO'
  | 'ATENDIMENTO_HUMANO';
```

### 4.12 Mensagem

**Purpose:** Histórico de mensagens das conversas.

```typescript
interface Mensagem {
  id: string;
  conversaId: string;

  direcao: 'IN' | 'OUT';
  tipo: 'TEXT' | 'IMAGE' | 'BUTTON' | 'LIST' | 'TEMPLATE';
  conteudo: string;

  // WhatsApp metadata
  waMessageId: string | null;
  waStatus: 'SENT' | 'DELIVERED' | 'READ' | 'FAILED' | null;

  createdAt: Date;
}
```

### 4.13 Plano

**Purpose:** Definição de planos de assinatura.

```typescript
interface Plano {
  id: string;
  codigo: 'GRATUITO' | 'PRO' | 'PREMIUM';
  nome: string;
  descricao: string;

  precoMensal: number; // 0 para gratuito
  comissaoPercent: number; // 15%, 8%, 5%

  // Features
  atendimentosMes: number | null; // null = ilimitado
  destaqueNaBusca: boolean;
  suportePrioritario: boolean;

  stripeProductId: string | null;
  stripePriceId: string | null;

  isActive: boolean;
  ordem: number;

  createdAt: Date;
}
```

---

## 5. API Specification

### 5.1 REST API Overview

A API segue convenções REST com endpoints organizados por domínio. Autenticação via JWT (Supabase Auth).

### 5.2 OpenAPI Specification

```yaml
openapi: 3.0.0
info:
  title: RF360 API
  version: 1.0.0
  description: API do Marketplace de Técnicos de Eletrônica

servers:
  - url: https://rf360.vercel.app/api
    description: Production
  - url: http://localhost:3000/api
    description: Development

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:
    Error:
      type: object
      properties:
        error:
          type: object
          properties:
            code:
              type: string
            message:
              type: string
            details:
              type: object

paths:
  # Auth
  /auth/signup:
    post:
      summary: Registrar novo usuário
      tags: [Auth]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                password:
                  type: string
                name:
                  type: string
                phone:
                  type: string
                role:
                  type: string
                  enum: [CLIENTE, TECNICO]

  # Técnicos
  /tecnicos:
    get:
      summary: Listar técnicos
      tags: [Tecnicos]
      parameters:
        - name: especialidade
          in: query
          schema:
            type: string
        - name: cidade
          in: query
          schema:
            type: string
        - name: avaliacaoMinima
          in: query
          schema:
            type: number
        - name: page
          in: query
          schema:
            type: integer
        - name: limit
          in: query
          schema:
            type: integer

  /tecnicos/{slug}:
    get:
      summary: Perfil público do técnico
      tags: [Tecnicos]
      parameters:
        - name: slug
          in: path
          required: true
          schema:
            type: string

  /tecnicos/me:
    get:
      summary: Meu perfil de técnico
      tags: [Tecnicos]
      security:
        - bearerAuth: []
    patch:
      summary: Atualizar meu perfil
      tags: [Tecnicos]
      security:
        - bearerAuth: []

  /tecnicos/me/servicos:
    get:
      summary: Meus serviços
      tags: [Tecnicos]
      security:
        - bearerAuth: []
    post:
      summary: Adicionar serviço
      tags: [Tecnicos]
      security:
        - bearerAuth: []
    patch:
      summary: Atualizar serviço
      tags: [Tecnicos]
      security:
        - bearerAuth: []

  # Ordens de Serviço
  /ordens:
    get:
      summary: Listar minhas OS
      tags: [Ordens]
      security:
        - bearerAuth: []
      parameters:
        - name: status
          in: query
          schema:
            type: string
        - name: page
          in: query
          schema:
            type: integer
    post:
      summary: Criar nova OS
      tags: [Ordens]
      security:
        - bearerAuth: []

  /ordens/{id}:
    get:
      summary: Detalhes da OS
      tags: [Ordens]
      security:
        - bearerAuth: []
    patch:
      summary: Atualizar OS
      tags: [Ordens]
      security:
        - bearerAuth: []

  /ordens/{id}/status:
    post:
      summary: Atualizar status da OS
      tags: [Ordens]
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                status:
                  type: string
                observacao:
                  type: string

  # Avaliações
  /avaliacoes:
    post:
      summary: Criar avaliação
      tags: [Avaliacoes]
      security:
        - bearerAuth: []

  /tecnicos/{tecnicoId}/avaliacoes:
    get:
      summary: Listar avaliações do técnico
      tags: [Avaliacoes]

  # Matching
  /matching:
    post:
      summary: Encontrar técnicos recomendados
      tags: [Matching]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                problema:
                  type: string
                marca:
                  type: string
                modelo:
                  type: string
                cep:
                  type: string

  # Catálogo
  /catalogo/servicos:
    get:
      summary: Listar serviços do catálogo
      tags: [Catalogo]
      parameters:
        - name: marca
          in: query
          schema:
            type: string
        - name: categoria
          in: query
          schema:
            type: string

  # Webhooks (n8n)
  /webhooks/whatsapp:
    post:
      summary: Webhook do WhatsApp
      tags: [Webhooks]
      description: Recebe mensagens do WhatsApp via n8n

  /webhooks/stripe:
    post:
      summary: Webhook do Stripe
      tags: [Webhooks]
      description: Recebe eventos de pagamento

  # Admin
  /admin/tecnicos:
    get:
      summary: Listar técnicos (admin)
      tags: [Admin]
      security:
        - bearerAuth: []

  /admin/tecnicos/{id}/aprovar:
    post:
      summary: Aprovar técnico
      tags: [Admin]
      security:
        - bearerAuth: []

  /admin/tecnicos/{id}/suspender:
    post:
      summary: Suspender técnico
      tags: [Admin]
      security:
        - bearerAuth: []

  /admin/dashboard:
    get:
      summary: Métricas do dashboard
      tags: [Admin]
      security:
        - bearerAuth: []
```

---

## 6. Components

### 6.1 Web Application (Next.js)

**Responsibility:** Interface web para todos os tipos de usuários (técnicos, clientes, atendentes, admins).

**Key Interfaces:**
- React Server Components para páginas
- API Routes para endpoints REST
- Server Actions para mutations
- Middleware para auth e redirects

**Dependencies:** Supabase, Prisma, TanStack Query

**Technology Stack:** Next.js 14+, React 18+, TypeScript

### 6.2 Authentication Service

**Responsibility:** Gerenciamento de autenticação e autorização.

**Key Interfaces:**
- Supabase Auth para login/signup
- JWT tokens para API
- Row Level Security no Postgres
- Middleware de proteção de rotas

**Dependencies:** Supabase Auth

### 6.3 Database Service

**Responsibility:** Acesso e manipulação de dados.

**Key Interfaces:**
- Prisma Client para queries
- Supabase Realtime para subscriptions
- Connection pooling via Supabase

**Dependencies:** PostgreSQL (Supabase)

### 6.4 WhatsApp Integration Service

**Responsibility:** Comunicação bidirecional via WhatsApp.

**Key Interfaces:**
- n8n workflows para processamento
- Webhooks para receber mensagens
- Templates para envio de notificações
- FSM para controle de estado

**Dependencies:** n8n Cloud, WhatsApp Cloud API

### 6.5 Storage Service

**Responsibility:** Armazenamento de arquivos (fotos, documentos).

**Key Interfaces:**
- Upload de imagens de perfil
- Upload de fotos de aparelhos
- Upload de documentos para verificação

**Dependencies:** Supabase Storage

### 6.6 Payment Service

**Responsibility:** Processamento de pagamentos e assinaturas.

**Key Interfaces:**
- Checkout de assinaturas
- Webhooks de eventos
- Portal do cliente

**Dependencies:** Stripe

### 6.7 Component Diagram

```mermaid
graph TB
    subgraph "Frontend Layer"
        PAGES[Pages/App Router]
        COMPONENTS[UI Components]
        HOOKS[Custom Hooks]
        STORES[Zustand Stores]
    end

    subgraph "API Layer"
        ROUTES[API Routes]
        ACTIONS[Server Actions]
        MIDDLEWARE[Middleware]
    end

    subgraph "Service Layer"
        AUTH_SVC[Auth Service]
        TECNICO_SVC[Tecnico Service]
        OS_SVC[OrdemServico Service]
        MATCH_SVC[Matching Service]
        NOTIF_SVC[Notification Service]
    end

    subgraph "Data Layer"
        PRISMA[Prisma Client]
        SUPABASE[Supabase Client]
    end

    subgraph "External"
        N8N[n8n Cloud]
        WA[WhatsApp API]
        STRIPE[Stripe]
    end

    PAGES --> COMPONENTS
    PAGES --> HOOKS
    HOOKS --> STORES
    HOOKS --> ROUTES
    PAGES --> ACTIONS

    ROUTES --> MIDDLEWARE
    MIDDLEWARE --> AUTH_SVC
    ROUTES --> TECNICO_SVC
    ROUTES --> OS_SVC
    ROUTES --> MATCH_SVC

    ACTIONS --> TECNICO_SVC
    ACTIONS --> OS_SVC

    TECNICO_SVC --> PRISMA
    OS_SVC --> PRISMA
    MATCH_SVC --> PRISMA
    AUTH_SVC --> SUPABASE

    NOTIF_SVC --> N8N
    N8N --> WA

    ROUTES --> STRIPE
```

---

## 7. External APIs

### 7.1 WhatsApp Cloud API

- **Purpose:** Envio e recebimento de mensagens WhatsApp
- **Documentation:** https://developers.facebook.com/docs/whatsapp/cloud-api
- **Base URL:** https://graph.facebook.com/v18.0
- **Authentication:** Bearer Token (System User Token)
- **Rate Limits:** 80 messages/second (tier dependent)

**Key Endpoints Used:**
- `POST /{phone-number-id}/messages` - Enviar mensagem
- `GET /{phone-number-id}` - Info do número
- `POST /{waba-id}/message_templates` - Criar template

**Integration Notes:** Integração via n8n Cloud para simplificar webhooks e retry logic.

### 7.2 Stripe API

- **Purpose:** Processamento de pagamentos e assinaturas
- **Documentation:** https://stripe.com/docs/api
- **Base URL:** https://api.stripe.com
- **Authentication:** API Key (Secret Key)
- **Rate Limits:** 100 requests/second

**Key Endpoints Used:**
- `POST /v1/customers` - Criar cliente
- `POST /v1/subscriptions` - Criar assinatura
- `POST /v1/billing_portal/sessions` - Portal do cliente

### 7.3 Google Maps Geocoding API (Opcional)

- **Purpose:** Converter CEP em coordenadas para cálculo de distância
- **Documentation:** https://developers.google.com/maps/documentation/geocoding
- **Authentication:** API Key
- **Rate Limits:** 50 requests/second

---

## 8. Core Workflows

### 8.1 Fluxo de Orçamento via WhatsApp

```mermaid
sequenceDiagram
    participant C as Cliente
    participant WA as WhatsApp
    participant N8N as n8n
    participant API as Next.js API
    participant DB as PostgreSQL

    C->>WA: "Oi, preciso de orçamento"
    WA->>N8N: Webhook (message received)
    N8N->>API: POST /api/webhooks/whatsapp
    API->>DB: Buscar/criar conversa
    API->>DB: Atualizar estado: MENU
    API-->>N8N: Resposta com menu
    N8N->>WA: Enviar menu de opções
    WA->>C: [Orçamento] [Acompanhar] [Falar]

    C->>WA: Clica em "Orçamento"
    WA->>N8N: Webhook (button click)
    N8N->>API: POST /api/webhooks/whatsapp
    API->>DB: Estado: ORCAMENTO_MARCA
    N8N->>WA: "Qual a marca?"
    WA->>C: [Apple] [Samsung] [Xiaomi]

    C->>WA: Clica em "Apple"
    WA->>N8N: Webhook
    N8N->>API: POST /api/webhooks/whatsapp
    API->>DB: Salvar marca, Estado: ORCAMENTO_MODELO
    N8N->>WA: "Qual o modelo?"
    WA->>C: Campo de texto

    C->>WA: "iPhone 13"
    WA->>N8N: Webhook
    N8N->>API: POST /api/webhooks/whatsapp
    API->>DB: Salvar modelo, Estado: ORCAMENTO_PROBLEMA
    N8N->>WA: "Qual o problema?"
    WA->>C: [Tela] [Bateria] [Não Liga] [Outro]

    C->>WA: Clica em "Tela"
    WA->>N8N: Webhook
    N8N->>API: POST /api/webhooks/whatsapp
    API->>DB: Consultar catálogo
    API->>DB: Criar orçamento, Estado: ORCAMENTO_RESULTADO
    N8N->>WA: "Troca de Tela iPhone 13: R$350-450, 2-4h"
    WA->>C: [Agendar] [Ver Técnicos] [Falar]
```

### 8.2 Fluxo de Criação de OS

```mermaid
sequenceDiagram
    participant T as Técnico
    participant FE as Frontend
    participant API as API Route
    participant DB as PostgreSQL
    participant N8N as n8n
    participant C as Cliente

    T->>FE: Clica "Nova OS"
    FE->>FE: Abre modal de criação
    T->>FE: Preenche dados (cliente, aparelho, defeito)
    FE->>API: POST /api/ordens
    API->>DB: Criar OrdemServico (status: RECEBIDO)
    API->>DB: Criar OSEvento
    API->>N8N: Trigger notificação
    N8N->>C: WhatsApp: "Sua OS #RF-xxx foi criada!"
    API-->>FE: OS criada
    FE->>FE: Redireciona para detalhe da OS
```

### 8.3 Fluxo de Atualização de Status

```mermaid
sequenceDiagram
    participant T as Técnico
    participant FE as Frontend
    participant API as API Route
    participant DB as PostgreSQL
    participant RT as Supabase Realtime
    participant N8N as n8n
    participant C as Cliente

    T->>FE: Clica "Marcar como Concluído"
    FE->>API: POST /api/ordens/{id}/status
    API->>API: Validar transição de status
    API->>DB: Atualizar OrdemServico.status
    API->>DB: Criar OSEvento
    DB->>RT: Broadcast change
    RT->>FE: Realtime update
    API->>N8N: Trigger notificação
    N8N->>C: WhatsApp: "Seu aparelho está pronto! Retirada: [endereço]"
    API-->>FE: Status atualizado
    FE->>FE: Atualiza UI (optimistic já aplicado)
```

---

## 9. Database Schema

### 9.1 Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// Enums
enum UserRole {
  CLIENTE
  TECNICO
  ATENDENTE
  ADMIN
}

enum TecnicoStatus {
  PENDENTE
  APROVADO
  SUSPENSO
  REJEITADO
}

enum PlanoTipo {
  GRATUITO
  PRO
  PREMIUM
}

enum OSStatus {
  RECEBIDO
  DIAGNOSTICO
  ORCAMENTO_ENVIADO
  APROVADO
  RECUSADO
  EM_REPARO
  CONCLUIDO
  ENTREGUE
  DEVOLVIDO
}

enum ConversaEstado {
  INICIO
  MENU
  ORCAMENTO_MARCA
  ORCAMENTO_MODELO
  ORCAMENTO_PROBLEMA
  ORCAMENTO_RESULTADO
  ACOMPANHAMENTO
  ATENDIMENTO_HUMANO
}

enum MensagemDirecao {
  IN
  OUT
}

enum MensagemTipo {
  TEXT
  IMAGE
  BUTTON
  LIST
  TEMPLATE
}

// Models
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  phone     String?
  avatarUrl String?
  role      UserRole @default(CLIENTE)
  isActive  Boolean  @default(true)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  tecnico   Tecnico?
  cliente   Cliente?

  conversasAtendidas Conversa[] @relation("Atendente")
  osEventos          OSEvento[]

  @@index([email])
  @@index([phone])
  @@index([role])
}

model Tecnico {
  id     String @id @default(uuid())
  userId String @unique
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  slug String @unique
  bio  String?

  documento           String
  documentoVerificado Boolean @default(false)

  // Localização
  cep                String
  cidade             String
  estado             String
  endereco           String?
  latitude           Float?
  longitude          Float?
  raioAtendimentoKm  Int     @default(10)
  atendeEmDomicilio  Boolean @default(false)

  // Status e Plano
  status        TecnicoStatus @default(PENDENTE)
  plano         PlanoTipo     @default(GRATUITO)
  planoExpiraEm DateTime?

  // Métricas desnormalizadas
  avaliacaoMedia     Float @default(0)
  totalAvaliacoes    Int   @default(0)
  totalAtendimentos  Int   @default(0)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  servicos   TecnicoServico[]
  badges     TecnicoBadge[]
  ordens     OrdemServico[]
  avaliacoes Avaliacao[]

  @@index([slug])
  @@index([cidade, estado])
  @@index([status])
  @@index([plano])
  @@index([avaliacaoMedia])
}

model Cliente {
  id     String @id @default(uuid())
  userId String @unique
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  cpf String?

  cep    String?
  cidade String?
  estado String?

  optInMarketing   Boolean @default(false)
  codigoIndicacao  String  @unique @default(uuid())
  indicadoPorId    String?
  indicadoPor      Cliente? @relation("Indicacoes", fields: [indicadoPorId], references: [id])
  indicados        Cliente[] @relation("Indicacoes")

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  ordens     OrdemServico[]
  avaliacoes Avaliacao[]
  conversas  Conversa[]

  @@index([codigoIndicacao])
}

model CatalogoServico {
  id        String @id @default(uuid())
  nome      String
  descricao String?
  categoria String

  marcas String[] // APPLE, SAMSUNG, XIAOMI, MOTOROLA, OUTRO

  precoMinimo        Float
  precoMaximo        Float
  tempoEstimadoHoras Float

  isActive Boolean @default(true)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  tecnicoServicos TecnicoServico[]

  @@index([categoria])
  @@index([isActive])
}

model TecnicoServico {
  id         String @id @default(uuid())
  tecnicoId  String
  tecnico    Tecnico @relation(fields: [tecnicoId], references: [id], onDelete: Cascade)

  catalogoServicoId String
  catalogoServico   CatalogoServico @relation(fields: [catalogoServicoId], references: [id])

  precoPersonalizado      Float?
  tempoPersonalizadoHoras Float?
  observacoes             String?

  isActive Boolean @default(true)
  ordem    Int     @default(0)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([tecnicoId, catalogoServicoId])
  @@index([tecnicoId])
}

model OrdemServico {
  id     String @id @default(uuid())
  numero String @unique

  clienteId String
  cliente   Cliente @relation(fields: [clienteId], references: [id])

  tecnicoId String
  tecnico   Tecnico @relation(fields: [tecnicoId], references: [id])

  // Aparelho
  marca  String
  modelo String
  imei   String?
  cor    String?

  // Defeito
  defeitoRelatado   String
  defeitoEncontrado String?

  // Status
  status OSStatus @default(RECEBIDO)

  // Valores
  valorOrcado Float?
  valorFinal  Float?

  // Datas
  dataEntrada   DateTime  @default(now())
  dataPrevisao  DateTime?
  dataAprovacao DateTime?
  dataConclusao DateTime?
  dataEntrega   DateTime?

  // Garantia
  garantiaDias Int       @default(90)
  garantiaAte  DateTime?

  // Observações
  observacoesInternas String?
  observacoesCliente  String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  eventos   OSEvento[]
  avaliacao Avaliacao?
  fotos     OSFoto[]

  @@index([numero])
  @@index([clienteId])
  @@index([tecnicoId])
  @@index([status])
  @@index([dataEntrada])
}

model OSEvento {
  id             String @id @default(uuid())
  ordemServicoId String
  ordemServico   OrdemServico @relation(fields: [ordemServicoId], references: [id], onDelete: Cascade)

  statusAnterior OSStatus?
  statusNovo     OSStatus

  observacao String?

  usuarioId String
  usuario   User   @relation(fields: [usuarioId], references: [id])

  createdAt DateTime @default(now())

  @@index([ordemServicoId])
  @@index([createdAt])
}

model OSFoto {
  id             String @id @default(uuid())
  ordemServicoId String
  ordemServico   OrdemServico @relation(fields: [ordemServicoId], references: [id], onDelete: Cascade)

  url       String
  tipo      String // ANTES, DEPOIS
  descricao String?

  createdAt DateTime @default(now())

  @@index([ordemServicoId])
}

model Avaliacao {
  id             String @id @default(uuid())
  ordemServicoId String @unique
  ordemServico   OrdemServico @relation(fields: [ordemServicoId], references: [id])

  clienteId String
  cliente   Cliente @relation(fields: [clienteId], references: [id])

  tecnicoId String
  tecnico   Tecnico @relation(fields: [tecnicoId], references: [id])

  nota       Int // 1-5
  comentario String?

  isAprovada     Boolean @default(true)
  motivoRejeicao String?

  createdAt DateTime @default(now())

  @@index([tecnicoId])
  @@index([clienteId])
  @@index([nota])
}

model Badge {
  id        String @id @default(uuid())
  codigo    String @unique
  nome      String
  descricao String
  icone     String

  criterios Json // BadgeCriterio

  isActive Boolean @default(true)
  ordem    Int     @default(0)

  createdAt DateTime @default(now())

  tecnicos TecnicoBadge[]

  @@index([codigo])
  @@index([isActive])
}

model TecnicoBadge {
  id        String @id @default(uuid())
  tecnicoId String
  tecnico   Tecnico @relation(fields: [tecnicoId], references: [id], onDelete: Cascade)

  badgeId String
  badge   Badge  @relation(fields: [badgeId], references: [id])

  conquistadoEm DateTime @default(now())

  @@unique([tecnicoId, badgeId])
  @@index([tecnicoId])
}

model Conversa {
  id String @id @default(uuid())

  telefone  String
  clienteId String?
  cliente   Cliente? @relation(fields: [clienteId], references: [id])

  estado   ConversaEstado @default(INICIO)
  contexto Json           @default("{}")

  botAtivo    Boolean @default(true)
  atendenteId String?
  atendente   User?   @relation("Atendente", fields: [atendenteId], references: [id])

  ultimaMensagemEm DateTime @default(now())

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  mensagens Mensagem[]

  @@index([telefone])
  @@index([estado])
  @@index([botAtivo])
  @@index([atendenteId])
}

model Mensagem {
  id         String @id @default(uuid())
  conversaId String
  conversa   Conversa @relation(fields: [conversaId], references: [id], onDelete: Cascade)

  direcao  MensagemDirecao
  tipo     MensagemTipo    @default(TEXT)
  conteudo String

  waMessageId String?
  waStatus    String?

  createdAt DateTime @default(now())

  @@index([conversaId])
  @@index([createdAt])
}

model Plano {
  id     String    @id @default(uuid())
  codigo PlanoTipo @unique
  nome   String
  descricao String

  precoMensal     Float
  comissaoPercent Float

  atendimentosMes     Int?
  destaqueNaBusca     Boolean @default(false)
  suportePrioritario  Boolean @default(false)

  stripeProductId String?
  stripePriceId   String?

  isActive Boolean @default(true)
  ordem    Int     @default(0)

  createdAt DateTime @default(now())

  @@index([codigo])
}
```

---

## 10. Frontend Architecture

### 10.1 Component Organization

```
apps/web/src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth layout group
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/              # Dashboard layout group
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Dashboard home
│   │   ├── ordens/
│   │   │   ├── page.tsx          # Lista de OS
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx      # Detalhe da OS
│   │   │   └── nova/
│   │   │       └── page.tsx      # Nova OS
│   │   ├── perfil/
│   │   ├── servicos/
│   │   ├── relatorios/
│   │   └── configuracoes/
│   ├── (admin)/                  # Admin layout group
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── tecnicos/
│   │   ├── catalogo/
│   │   └── relatorios/
│   ├── (chat)/                   # Chat layout group
│   │   └── atendimento/
│   ├── tecnico/
│   │   └── [slug]/
│   │       └── page.tsx          # Perfil público
│   ├── api/                      # API Routes
│   │   ├── auth/
│   │   ├── tecnicos/
│   │   ├── ordens/
│   │   ├── webhooks/
│   │   └── admin/
│   ├── layout.tsx
│   └── page.tsx                  # Landing page
├── components/
│   ├── ui/                       # Shadcn components
│   ├── forms/                    # Form components
│   ├── tables/                   # Table components
│   ├── charts/                   # Chart components
│   └── layout/                   # Layout components
├── hooks/
│   ├── use-auth.ts
│   ├── use-ordens.ts
│   └── use-realtime.ts
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── prisma.ts
│   └── utils.ts
├── services/
│   ├── tecnico.service.ts
│   ├── ordem.service.ts
│   └── matching.service.ts
└── stores/
    ├── auth.store.ts
    └── ui.store.ts
```

### 10.2 Component Template

```typescript
// components/ordens/ordem-card.tsx
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OrdemServico } from '@/lib/types';
import { formatDate, formatCurrency } from '@/lib/utils';

interface OrdemCardProps {
  ordem: OrdemServico;
  onClick?: () => void;
}

export function OrdemCard({ ordem, onClick }: OrdemCardProps) {
  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <span className="font-mono text-sm">{ordem.numero}</span>
        <Badge variant={getStatusVariant(ordem.status)}>
          {ordem.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="font-medium">{ordem.marca} {ordem.modelo}</p>
        <p className="text-sm text-muted-foreground">{ordem.defeitoRelatado}</p>
        <div className="flex justify-between mt-2 text-sm">
          <span>{formatDate(ordem.dataEntrada)}</span>
          {ordem.valorFinal && (
            <span className="font-medium">{formatCurrency(ordem.valorFinal)}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
```

### 10.3 State Management

```typescript
// stores/auth.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Tecnico } from '@/lib/types';

interface AuthState {
  user: User | null;
  tecnico: Tecnico | null;
  isLoading: boolean;

  setUser: (user: User | null) => void;
  setTecnico: (tecnico: Tecnico | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tecnico: null,
      isLoading: true,

      setUser: (user) => set({ user }),
      setTecnico: (tecnico) => set({ tecnico }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, tecnico: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
```

### 10.4 Route Organization

```
/                           # Landing page (público)
/login                      # Login
/signup                     # Cadastro (cliente ou técnico)
/signup/tecnico             # Cadastro específico de técnico

# Dashboard Técnico
/dashboard                  # Home do técnico
/dashboard/ordens           # Lista de OS
/dashboard/ordens/[id]      # Detalhe da OS
/dashboard/ordens/nova      # Nova OS
/dashboard/perfil           # Meu perfil
/dashboard/servicos         # Meus serviços
/dashboard/relatorios       # Relatórios
/dashboard/plano            # Gestão do plano

# Admin
/admin                      # Dashboard admin
/admin/tecnicos             # Gestão de técnicos
/admin/tecnicos/[id]        # Detalhe do técnico
/admin/catalogo             # Catálogo de serviços
/admin/relatorios           # Relatórios globais

# Chat/Atendimento
/atendimento                # Interface de chat

# Público
/tecnico/[slug]             # Perfil público do técnico
/buscar                     # Busca de técnicos
```

### 10.5 Protected Route Pattern

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/login', '/signup', '/tecnico'];
const technicianRoutes = ['/dashboard'];
const adminRoutes = ['/admin'];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  const path = req.nextUrl.pathname;

  // Check public routes
  if (publicRoutes.some(route => path.startsWith(route))) {
    return res;
  }

  // Require auth for all other routes
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Check role-based access
  const userRole = session.user.user_metadata?.role;

  if (adminRoutes.some(route => path.startsWith(route)) && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

### 10.6 API Client Setup

```typescript
// lib/api-client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const API_BASE = '/api';

class ApiClient {
  private getAuthHeader = async () => {
    const supabase = createClientComponentClient();
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token
      ? { Authorization: `Bearer ${session.access_token}` }
      : {};
  };

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const authHeader = await this.getAuthHeader();

    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...authHeader,
        ...options.headers,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new ApiError(error.error?.message || 'Request failed', res.status);
    }

    return res.json();
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint);
  }

  post<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  patch<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient();

class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = 'ApiError';
  }
}
```

---

## 11. Backend Architecture

### 11.1 Service Architecture

```
apps/web/src/
├── app/api/
│   ├── auth/
│   │   └── [...supabase]/route.ts
│   ├── tecnicos/
│   │   ├── route.ts              # GET (list), POST (create)
│   │   ├── [slug]/route.ts       # GET (detail)
│   │   └── me/
│   │       ├── route.ts          # GET, PATCH (my profile)
│   │       └── servicos/route.ts # GET, POST, PATCH
│   ├── ordens/
│   │   ├── route.ts              # GET, POST
│   │   ├── [id]/
│   │   │   ├── route.ts          # GET, PATCH
│   │   │   └── status/route.ts   # POST
│   ├── matching/route.ts         # POST
│   ├── webhooks/
│   │   ├── whatsapp/route.ts
│   │   └── stripe/route.ts
│   └── admin/
│       ├── tecnicos/route.ts
│       └── dashboard/route.ts
├── services/
│   ├── tecnico.service.ts
│   ├── ordem.service.ts
│   ├── matching.service.ts
│   ├── badge.service.ts
│   └── notification.service.ts
└── lib/
    ├── prisma.ts
    └── auth.ts
```

### 11.2 API Route Template

```typescript
// app/api/ordens/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { ordemService } from '@/services/ordem.service';
import { CreateOrdemSchema } from '@/lib/validations/ordem';
import { handleApiError, requireAuth, requireRole } from '@/lib/api-utils';

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(req.url);

    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const ordens = await ordemService.list({
      tecnicoId: user.tecnicoId,
      status: status || undefined,
      page,
      limit,
    });

    return NextResponse.json(ordens);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    await requireRole(user, ['TECNICO']);

    const body = await req.json();
    const validated = CreateOrdemSchema.parse(body);

    const ordem = await ordemService.create({
      ...validated,
      tecnicoId: user.tecnicoId!,
    });

    return NextResponse.json(ordem, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
```

### 11.3 Service Layer Template

```typescript
// services/ordem.service.ts
import { prisma } from '@/lib/prisma';
import { notificationService } from './notification.service';
import { OSStatus } from '@prisma/client';

export const ordemService = {
  async list(params: {
    tecnicoId?: string;
    clienteId?: string;
    status?: string;
    page: number;
    limit: number;
  }) {
    const where = {
      ...(params.tecnicoId && { tecnicoId: params.tecnicoId }),
      ...(params.clienteId && { clienteId: params.clienteId }),
      ...(params.status && { status: params.status as OSStatus }),
    };

    const [ordens, total] = await Promise.all([
      prisma.ordemServico.findMany({
        where,
        include: {
          cliente: { include: { user: true } },
          tecnico: { include: { user: true } },
        },
        orderBy: { dataEntrada: 'desc' },
        skip: (params.page - 1) * params.limit,
        take: params.limit,
      }),
      prisma.ordemServico.count({ where }),
    ]);

    return {
      data: ordens,
      meta: {
        total,
        page: params.page,
        limit: params.limit,
        totalPages: Math.ceil(total / params.limit),
      },
    };
  },

  async create(data: CreateOrdemInput) {
    const numero = await this.generateNumero();

    const ordem = await prisma.ordemServico.create({
      data: {
        ...data,
        numero,
        status: 'RECEBIDO',
      },
      include: {
        cliente: { include: { user: true } },
        tecnico: { include: { user: true } },
      },
    });

    // Criar evento inicial
    await prisma.oSEvento.create({
      data: {
        ordemServicoId: ordem.id,
        statusNovo: 'RECEBIDO',
        usuarioId: ordem.tecnico.userId,
      },
    });

    // Notificar cliente
    await notificationService.notifyOSCreated(ordem);

    return ordem;
  },

  async updateStatus(
    id: string,
    newStatus: OSStatus,
    userId: string,
    observacao?: string
  ) {
    const ordem = await prisma.ordemServico.findUnique({
      where: { id },
      include: { cliente: { include: { user: true } } },
    });

    if (!ordem) throw new NotFoundError('Ordem não encontrada');

    // Validar transição de status
    this.validateStatusTransition(ordem.status, newStatus);

    const updated = await prisma.$transaction(async (tx) => {
      // Atualizar OS
      const updatedOrdem = await tx.ordemServico.update({
        where: { id },
        data: {
          status: newStatus,
          ...(newStatus === 'CONCLUIDO' && { dataConclusao: new Date() }),
          ...(newStatus === 'ENTREGUE' && { dataEntrega: new Date() }),
        },
      });

      // Criar evento
      await tx.oSEvento.create({
        data: {
          ordemServicoId: id,
          statusAnterior: ordem.status,
          statusNovo: newStatus,
          observacao,
          usuarioId: userId,
        },
      });

      return updatedOrdem;
    });

    // Notificar cliente
    await notificationService.notifyOSStatusChanged(updated, newStatus);

    return updated;
  },

  validateStatusTransition(current: OSStatus, next: OSStatus) {
    const transitions: Record<OSStatus, OSStatus[]> = {
      RECEBIDO: ['DIAGNOSTICO'],
      DIAGNOSTICO: ['ORCAMENTO_ENVIADO'],
      ORCAMENTO_ENVIADO: ['APROVADO', 'RECUSADO'],
      APROVADO: ['EM_REPARO'],
      RECUSADO: ['DEVOLVIDO'],
      EM_REPARO: ['CONCLUIDO'],
      CONCLUIDO: ['ENTREGUE'],
      ENTREGUE: [],
      DEVOLVIDO: [],
    };

    if (!transitions[current].includes(next)) {
      throw new ValidationError(
        `Transição inválida: ${current} -> ${next}`
      );
    }
  },

  async generateNumero() {
    const today = new Date();
    const prefix = `RF-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;

    const lastOrdem = await prisma.ordemServico.findFirst({
      where: { numero: { startsWith: prefix } },
      orderBy: { numero: 'desc' },
    });

    const sequence = lastOrdem
      ? parseInt(lastOrdem.numero.split('-')[2]) + 1
      : 1;

    return `${prefix}-${String(sequence).padStart(4, '0')}`;
  },
};
```

### 11.4 Authentication Middleware

```typescript
// lib/auth.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { prisma } from './prisma';
import { UserRole } from '@prisma/client';

export async function requireAuth() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    throw new UnauthorizedError('Não autenticado');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      tecnico: true,
      cliente: true,
    },
  });

  if (!user || !user.isActive) {
    throw new UnauthorizedError('Usuário inativo');
  }

  return {
    ...user,
    tecnicoId: user.tecnico?.id,
    clienteId: user.cliente?.id,
  };
}

export async function requireRole(
  user: Awaited<ReturnType<typeof requireAuth>>,
  allowedRoles: UserRole[]
) {
  if (!allowedRoles.includes(user.role)) {
    throw new ForbiddenError('Acesso negado');
  }
}
```

---

## 12. Unified Project Structure

```plaintext
RF360/
├── .github/
│   └── workflows/
│       ├── ci.yml                # Lint, type-check, test
│       └── deploy.yml            # Preview + Production deploys
├── apps/
│   └── web/                      # Next.js 14+ Application
│       ├── src/
│       │   ├── app/              # App Router
│       │   │   ├── (auth)/
│       │   │   ├── (dashboard)/
│       │   │   ├── (admin)/
│       │   │   ├── (chat)/
│       │   │   ├── api/
│       │   │   ├── tecnico/
│       │   │   ├── layout.tsx
│       │   │   └── page.tsx
│       │   ├── components/
│       │   │   ├── ui/           # Shadcn components
│       │   │   ├── forms/
│       │   │   ├── tables/
│       │   │   ├── charts/
│       │   │   └── layout/
│       │   ├── hooks/
│       │   ├── lib/
│       │   │   ├── supabase/
│       │   │   ├── prisma.ts
│       │   │   ├── utils.ts
│       │   │   └── validations/
│       │   ├── services/
│       │   ├── stores/
│       │   └── styles/
│       │       └── globals.css
│       ├── public/
│       ├── tests/
│       │   ├── unit/
│       │   ├── integration/
│       │   └── e2e/
│       ├── next.config.js
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       └── package.json
├── packages/
│   ├── database/                 # Prisma package
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   ├── src/
│   │   │   └── index.ts          # Export Prisma client
│   │   └── package.json
│   ├── shared/                   # Shared types and utils
│   │   ├── src/
│   │   │   ├── types/
│   │   │   ├── constants/
│   │   │   └── utils/
│   │   └── package.json
│   └── ui/                       # Shared UI (optional)
│       ├── src/
│       └── package.json
├── docs/
│   ├── prd.md
│   ├── architecture.md
│   └── api/
├── scripts/
│   ├── setup.sh
│   └── seed.ts
├── .env.example
├── .gitignore
├── package.json
├── turbo.json
├── pnpm-workspace.yaml
└── README.md
```

---

## 13. Development Workflow

### 13.1 Prerequisites

```bash
# Required
node >= 20.0.0
pnpm >= 8.0.0

# Accounts needed
- Supabase account (free tier)
- Vercel account (free tier)
- WhatsApp Business Account (for production)
- n8n Cloud account (free tier)
```

### 13.2 Initial Setup

```bash
# Clone repository
git clone https://github.com/inematds/RF360.git
cd RF360

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Setup database
pnpm db:push
pnpm db:seed

# Start development
pnpm dev
```

### 13.3 Development Commands

```bash
# Start all services
pnpm dev

# Start specific app
pnpm dev --filter=web

# Run tests
pnpm test              # All tests
pnpm test:unit         # Unit tests only
pnpm test:e2e          # E2E tests

# Database
pnpm db:push           # Push schema changes
pnpm db:migrate        # Run migrations
pnpm db:studio         # Open Prisma Studio
pnpm db:seed           # Seed database

# Build
pnpm build             # Build all
pnpm build --filter=web

# Lint and format
pnpm lint
pnpm format
pnpm typecheck
```

### 13.4 Environment Variables

```bash
# apps/web/.env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Database (Supabase)
DATABASE_URL=postgresql://postgres:xxx@db.xxx.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:xxx@db.xxx.supabase.co:5432/postgres

# WhatsApp (Meta Cloud API)
WHATSAPP_PHONE_NUMBER_ID=xxx
WHATSAPP_ACCESS_TOKEN=xxx
WHATSAPP_VERIFY_TOKEN=xxx

# Stripe
STRIPE_SECRET_KEY=sk_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx

# n8n
N8N_WEBHOOK_URL=https://xxx.app.n8n.cloud/webhook/xxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 14. Deployment Architecture

### 14.1 Deployment Strategy

**Frontend Deployment:**
- **Platform:** Vercel
- **Build Command:** `pnpm build --filter=web`
- **Output Directory:** `apps/web/.next`
- **CDN:** Vercel Edge Network (global)

**Backend Deployment:**
- **Platform:** Vercel (Serverless Functions)
- **Build:** Automático com Next.js API Routes
- **Regions:** São Paulo (GRU) primary

**Database:**
- **Platform:** Supabase Cloud
- **Region:** São Paulo
- **Backups:** Automático diário

### 14.2 CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm typecheck

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test

  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
```

### 14.3 Environments

| Environment | Frontend URL | API URL | Purpose |
|-------------|-------------|---------|---------|
| Development | http://localhost:3000 | http://localhost:3000/api | Local development |
| Preview | https://rf360-xxx.vercel.app | Same | PR previews |
| Staging | https://staging.rf360.com.br | Same | Pre-production |
| Production | https://rf360.com.br | Same | Live |

---

## 15. Security and Performance

### 15.1 Security Requirements

**Frontend Security:**
- CSP Headers: Configurado via next.config.js
- XSS Prevention: React sanitiza por padrão + DOMPurify para HTML dinâmico
- Secure Storage: Tokens em httpOnly cookies (Supabase Auth)

**Backend Security:**
- Input Validation: Zod schemas em todos os endpoints
- Rate Limiting: Upstash Redis rate limiter
- CORS Policy: Apenas domínios permitidos

**Authentication Security:**
- Token Storage: httpOnly cookies (Supabase)
- Session Management: Supabase Auth com refresh tokens
- Password Policy: Mínimo 8 caracteres, 1 maiúscula, 1 número

### 15.2 Performance Optimization

**Frontend Performance:**
- Bundle Size Target: < 200KB (First Load JS)
- Loading Strategy: React Server Components, streaming
- Caching Strategy: SWR/React Query cache, Vercel Edge Cache

**Backend Performance:**
- Response Time Target: < 200ms (p95)
- Database Optimization: Índices, connection pooling
- Caching Strategy: Redis para queries frequentes

---

## 16. Testing Strategy

### 16.1 Testing Pyramid

```
        E2E Tests (Playwright)
       /                      \
      /   Integration Tests    \
     /    (API + Components)    \
    /                            \
   /   Unit Tests (Functions)     \
  /________________________________\
```

### 16.2 Test Organization

```
apps/web/tests/
├── unit/
│   ├── utils/
│   │   └── format.test.ts
│   ├── hooks/
│   │   └── use-auth.test.ts
│   └── services/
│       └── ordem.service.test.ts
├── integration/
│   ├── api/
│   │   ├── ordens.test.ts
│   │   └── tecnicos.test.ts
│   └── components/
│       └── ordem-form.test.tsx
└── e2e/
    ├── auth.spec.ts
    ├── ordem-flow.spec.ts
    └── tecnico-onboarding.spec.ts
```

### 16.3 Test Examples

**Unit Test:**
```typescript
// tests/unit/services/ordem.service.test.ts
import { describe, it, expect, vi } from 'vitest';
import { ordemService } from '@/services/ordem.service';

describe('ordemService', () => {
  describe('validateStatusTransition', () => {
    it('should allow valid transition RECEBIDO -> DIAGNOSTICO', () => {
      expect(() =>
        ordemService.validateStatusTransition('RECEBIDO', 'DIAGNOSTICO')
      ).not.toThrow();
    });

    it('should reject invalid transition RECEBIDO -> CONCLUIDO', () => {
      expect(() =>
        ordemService.validateStatusTransition('RECEBIDO', 'CONCLUIDO')
      ).toThrow('Transição inválida');
    });
  });

  describe('generateNumero', () => {
    it('should generate number in correct format', async () => {
      const numero = await ordemService.generateNumero();
      expect(numero).toMatch(/^RF-\d{8}-\d{4}$/);
    });
  });
});
```

**Integration Test:**
```typescript
// tests/integration/api/ordens.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { createMocks } from 'node-mocks-http';
import { GET, POST } from '@/app/api/ordens/route';

describe('/api/ordens', () => {
  describe('GET', () => {
    it('should return list of ordens for authenticated user', async () => {
      const { req } = createMocks({
        method: 'GET',
        headers: { Authorization: 'Bearer valid-token' },
      });

      const response = await GET(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('data');
      expect(data).toHaveProperty('meta');
    });

    it('should return 401 for unauthenticated request', async () => {
      const { req } = createMocks({ method: 'GET' });

      const response = await GET(req);

      expect(response.status).toBe(401);
    });
  });
});
```

**E2E Test:**
```typescript
// tests/e2e/ordem-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Ordem de Serviço Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"]', 'tecnico@test.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should create new ordem de serviço', async ({ page }) => {
    await page.click('text=Nova OS');
    await expect(page).toHaveURL('/dashboard/ordens/nova');

    // Fill form
    await page.fill('[name="clienteNome"]', 'Maria Silva');
    await page.fill('[name="clienteTelefone"]', '11999999999');
    await page.selectOption('[name="marca"]', 'APPLE');
    await page.fill('[name="modelo"]', 'iPhone 13');
    await page.fill('[name="defeitoRelatado"]', 'Tela quebrada');

    await page.click('button[type="submit"]');

    // Should redirect to OS detail
    await expect(page).toHaveURL(/\/dashboard\/ordens\/RF-/);
    await expect(page.locator('text=RECEBIDO')).toBeVisible();
  });
});
```

---

## 17. Coding Standards

### 17.1 Critical Rules

- **Type Sharing:** Sempre definir tipos em `packages/shared` e importar de lá
- **API Calls:** Nunca fazer fetch direto - usar service layer ou TanStack Query
- **Environment Variables:** Acessar apenas via objetos de config, nunca `process.env` direto
- **Error Handling:** Todos API routes devem usar `handleApiError`
- **State Updates:** Nunca mutar estado diretamente - usar immer ou spread
- **Imports:** Usar path aliases (`@/`) ao invés de imports relativos longos
- **Server Components:** Preferir Server Components por padrão, usar 'use client' apenas quando necessário

### 17.2 Naming Conventions

| Element | Frontend | Backend | Example |
|---------|----------|---------|---------|
| Components | PascalCase | - | `OrdemCard.tsx` |
| Hooks | camelCase com 'use' | - | `useOrdens.ts` |
| Services | camelCase | camelCase | `ordem.service.ts` |
| API Routes | - | kebab-case | `/api/ordens/[id]/status` |
| Database Tables | - | snake_case | `ordem_servico` |
| Types/Interfaces | PascalCase | PascalCase | `OrdemServico` |
| Constants | SCREAMING_SNAKE | SCREAMING_SNAKE | `MAX_FILE_SIZE` |

---

## 18. Error Handling Strategy

### 18.1 Error Response Format

```typescript
interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: string;
    requestId: string;
  };
}
```

### 18.2 Frontend Error Handling

```typescript
// lib/api-error-handler.ts
import { toast } from 'sonner';

export function handleError(error: unknown) {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401:
        // Redirect to login
        window.location.href = '/login';
        break;
      case 403:
        toast.error('Você não tem permissão para esta ação');
        break;
      case 404:
        toast.error('Recurso não encontrado');
        break;
      case 422:
        toast.error(error.message);
        break;
      default:
        toast.error('Ocorreu um erro. Tente novamente.');
    }
  } else {
    toast.error('Erro de conexão. Verifique sua internet.');
  }
}
```

### 18.3 Backend Error Handling

```typescript
// lib/api-utils.ts
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { v4 as uuid } from 'uuid';

export function handleApiError(error: unknown) {
  const requestId = uuid();
  const timestamp = new Date().toISOString();

  if (error instanceof ZodError) {
    return NextResponse.json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Dados inválidos',
        details: error.flatten(),
        timestamp,
        requestId,
      },
    }, { status: 422 });
  }

  if (error instanceof UnauthorizedError) {
    return NextResponse.json({
      error: {
        code: 'UNAUTHORIZED',
        message: error.message,
        timestamp,
        requestId,
      },
    }, { status: 401 });
  }

  if (error instanceof NotFoundError) {
    return NextResponse.json({
      error: {
        code: 'NOT_FOUND',
        message: error.message,
        timestamp,
        requestId,
      },
    }, { status: 404 });
  }

  // Log unexpected errors
  console.error('Unexpected error:', error);

  return NextResponse.json({
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Erro interno do servidor',
      timestamp,
      requestId,
    },
  }, { status: 500 });
}
```

---

## 19. Monitoring and Observability

### 19.1 Monitoring Stack

- **Frontend Monitoring:** Vercel Analytics + Web Vitals
- **Backend Monitoring:** Vercel Functions Logs
- **Error Tracking:** Sentry
- **Performance Monitoring:** Vercel Speed Insights

### 19.2 Key Metrics

**Frontend Metrics:**
- Core Web Vitals (LCP, FID, CLS)
- JavaScript errors
- API response times
- User interactions

**Backend Metrics:**
- Request rate
- Error rate (4xx, 5xx)
- Response time (p50, p95, p99)
- Database query performance

---

## 20. Checklist Results Report

*A ser preenchido após execução do architect-checklist*

---

*Documento gerado com BMAD Method - Fullstack Architecture Template v2*
