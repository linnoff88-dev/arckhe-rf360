# RF360 - Marketplace de Técnicos de Eletrônica
## Product Requirements Document (PRD)

**Versão:** 1.0
**Data:** 22/01/2026
**Autor:** Mary (Business Analyst) + Stakeholder
**Status:** Draft para Revisão

---

## 1. Goals and Background Context

### 1.1 Goals

- **G1:** Criar uma plataforma que conecte clientes a técnicos especializados em reparo de celulares de forma rápida e confiável
- **G2:** Permitir que técnicos independentes se cadastrem, construam reputação e expandam sua base de clientes
- **G3:** Oferecer atendimento automatizado via WhatsApp com orçamento instantâneo e acompanhamento de OS
- **G4:** Fornecer dashboard de gestão para técnicos e administradores com métricas em tempo real
- **G5:** Estabelecer sistema de gamificação que incentive qualidade e fidelização (badges, rankings, avaliações públicas)
- **G6:** Diferenciar-se de plataformas genéricas (GetNinjas) com foco especializado e modelo de comissão justo

### 1.2 Background Context

O mercado brasileiro possui mais de 251 milhões de celulares ativos, com 99% tendo WhatsApp instalado. O setor de assistência técnica de celulares está fragmentado entre lojas físicas sem presença digital e plataformas genéricas como GetNinjas, onde técnicos pagam por leads que frequentemente não convertem.

Existe uma oportunidade clara para uma plataforma especializada que:
1. Conecte clientes a técnicos verificados por especialidade e localização
2. Ofereça transparência total com avaliações e histórico público
3. Automatize o atendimento inicial via WhatsApp (canal preferido dos brasileiros)
4. Cobre comissão apenas sobre serviços efetivamente realizados

A evolução tecnológica (smartphones dobráveis, componentes miniaturizados, certificações IP) aumenta a demanda por técnicos especializados e certificados.

### 1.3 Change Log

| Data | Versão | Descrição | Autor |
|------|--------|-----------|-------|
| 22/01/2026 | 1.0 | Criação inicial do PRD | Mary (BA) |

---

## 2. Requirements

### 2.1 Functional Requirements

#### Módulo Cliente (WhatsApp + Web)

- **FR1:** O sistema deve permitir que clientes solicitem orçamento via WhatsApp informando marca, modelo e problema do celular
- **FR2:** O sistema deve retornar orçamento automático com faixa de preço e prazo estimado baseado no catálogo de serviços
- **FR3:** O sistema deve permitir que clientes busquem técnicos por especialidade, localização e avaliação
- **FR4:** O sistema deve exibir perfil público do técnico com: foto, especialidades, avaliações, badges, número de atendimentos e área de atuação
- **FR5:** O sistema deve permitir que clientes acompanhem o status da Ordem de Serviço em tempo real via WhatsApp
- **FR6:** O sistema deve enviar notificações automáticas ao cliente quando o status da OS mudar
- **FR7:** O sistema deve permitir que clientes avaliem técnicos após conclusão do serviço (1-5 estrelas + comentário)
- **FR8:** O sistema deve gerar código de indicação único para cada cliente após serviço concluído
- **FR9:** O sistema deve permitir handoff para atendimento humano a qualquer momento da conversa

#### Módulo Técnico (Web App)

- **FR10:** O sistema deve permitir cadastro de técnicos com: dados pessoais, especialidades, certificações, área de atuação e fotos
- **FR11:** O sistema deve exigir validação de documento (CPF/CNPJ) para ativação do perfil do técnico
- **FR12:** O sistema deve permitir que técnicos definam seus serviços oferecidos com preços personalizados
- **FR13:** O sistema deve permitir que técnicos aceitem ou recusem solicitações de orçamento
- **FR14:** O sistema deve fornecer dashboard ao técnico com: OS em andamento, histórico, faturamento e avaliações
- **FR15:** O sistema deve permitir que técnicos atualizem o status da OS (Recebido → Diagnóstico → Orçamento → Aprovado → Em Reparo → Concluído → Entregue)
- **FR16:** O sistema deve exibir ranking do técnico comparado a outros da mesma região
- **FR17:** O sistema deve conceder badges automaticamente baseado em critérios definidos
- **FR18:** O sistema deve permitir que técnicos escolham plano de assinatura (Gratuito, Pro, Premium)

#### Módulo Administrativo (Dashboard)

- **FR19:** O sistema deve fornecer dashboard administrativo com métricas globais da plataforma
- **FR20:** O sistema deve permitir aprovação/rejeição de cadastros de novos técnicos
- **FR21:** O sistema deve permitir gerenciamento do catálogo base de serviços e preços de referência
- **FR22:** O sistema deve gerar relatórios de faturamento, comissões e performance
- **FR23:** O sistema deve permitir moderação de avaliações e resolução de disputas
- **FR24:** O sistema deve enviar alertas sobre técnicos com avaliações baixas ou reclamações

#### Módulo de Chat (Atendimento)

- **FR25:** O sistema deve fornecer interface de chat para atendentes visualizarem conversas ativas
- **FR26:** O sistema deve permitir que atendentes assumam conversas do bot
- **FR27:** O sistema deve exibir histórico completo do cliente e OS anteriores durante o atendimento
- **FR28:** O sistema deve fornecer ações rápidas: criar OS, enviar orçamento, agendar
- **FR29:** O sistema deve permitir transferência de conversa entre atendentes

#### Módulo de Matching

- **FR30:** O sistema deve fazer matching inteligente entre cliente e técnicos baseado em: especialidade requerida, localização, disponibilidade, avaliação e preço
- **FR31:** O sistema deve apresentar até 3 técnicos recomendados para o cliente escolher
- **FR32:** O sistema deve considerar o plano do técnico no algoritmo de destaque (Premium > Pro > Gratuito)

### 2.2 Non-Functional Requirements

#### Performance

- **NFR1:** O sistema deve responder mensagens WhatsApp em menos de 3 segundos
- **NFR2:** O dashboard deve carregar em menos de 2 segundos
- **NFR3:** O sistema deve suportar 10.000 usuários simultâneos no MVP

#### Segurança

- **NFR4:** Todos os dados sensíveis devem ser criptografados em trânsito (HTTPS) e em repouso
- **NFR5:** Autenticação deve usar tokens JWT com refresh token
- **NFR6:** O sistema deve implementar rate limiting para prevenir abuso da API
- **NFR7:** Senhas devem seguir política de complexidade mínima (8 caracteres, maiúscula, número)

#### Disponibilidade

- **NFR8:** O sistema deve ter disponibilidade de 99.5% (downtime máximo de ~43 min/mês)
- **NFR9:** Backups automáticos devem ocorrer a cada 24 horas

#### Escalabilidade

- **NFR10:** A arquitetura deve permitir escala horizontal sem refatoração
- **NFR11:** O sistema deve usar filas para processamento de webhooks WhatsApp

#### Compliance

- **NFR12:** O sistema deve estar em conformidade com a LGPD
- **NFR13:** Usuários devem consentir explicitamente com termos de uso e política de privacidade
- **NFR14:** Dados de clientes que solicitarem exclusão devem ser anonimizados em até 30 dias

#### Usabilidade

- **NFR15:** Interface web deve ser responsiva (mobile-first)
- **NFR16:** Fluxos críticos devem ser completáveis em no máximo 3 cliques/taps

---

## 3. User Interface Design Goals

### 3.1 Overall UX Vision

Uma interface limpa, moderna e profissional que transmita confiança. O design deve ser mobile-first dado que a maioria dos técnicos acessará via celular. Cores que remetem a tecnologia e confiabilidade (azul, branco, toques de verde para sucesso). Experiência fluida entre WhatsApp e plataforma web.

### 3.2 Key Interaction Paradigms

- **Conversational UI:** Interação principal via WhatsApp com linguagem natural e botões interativos
- **Dashboard-centric:** Visão consolidada de métricas e ações para técnicos e admins
- **Card-based:** Perfis de técnicos e OS apresentados em cards com informações essenciais
- **Progressive Disclosure:** Informações detalhadas reveladas sob demanda
- **Real-time Updates:** Status e notificações atualizados em tempo real via WebSocket

### 3.3 Core Screens and Views

#### Cliente (WhatsApp)
- Menu inicial com opções principais
- Fluxo de orçamento guiado
- Lista de técnicos recomendados
- Acompanhamento de OS
- Avaliação pós-serviço

#### Cliente (Web - Opcional)
- Busca de técnicos com filtros
- Perfil detalhado do técnico
- Histórico de serviços
- Gerenciamento de perfil

#### Técnico (Web App)
- Dashboard principal com KPIs
- Lista de OS com status e filtros
- Detalhe da OS com timeline
- Perfil público (preview)
- Configuração de serviços e preços
- Relatórios de performance
- Gestão de assinatura

#### Atendente (Web App)
- Lista de conversas ativas
- Interface de chat
- Painel lateral com info do cliente
- Ações rápidas

#### Administrador (Web App)
- Dashboard global
- Gestão de técnicos
- Catálogo de serviços
- Relatórios financeiros
- Moderação

### 3.4 Accessibility

**WCAG AA** - O sistema deve atender aos critérios de acessibilidade WCAG 2.1 nível AA, incluindo:
- Contraste adequado de cores
- Navegação por teclado
- Textos alternativos para imagens
- Formulários com labels apropriados

### 3.5 Branding

- **Cores primárias:** Azul (#2563EB), Branco (#FFFFFF)
- **Cores secundárias:** Verde sucesso (#10B981), Amarelo warning (#F59E0B), Vermelho erro (#EF4444)
- **Tipografia:** Inter (sans-serif) para UI, system fonts como fallback
- **Estilo:** Clean, moderno, profissional, confiável
- **Logo:** RF360 com ícone de celular/engrenagem (a definir)

### 3.6 Target Device and Platforms

**Web Responsive** - Mobile-first design que funciona em:
- Smartphones (iOS e Android) - prioridade
- Tablets
- Desktop (Chrome, Firefox, Safari, Edge)

---

## 4. Technical Assumptions

### 4.1 Repository Structure

**Monorepo** usando Turborepo ou similar, contendo:
- `/apps/web` - Next.js frontend (dashboard técnico, admin, atendente)
- `/apps/api` - API routes (pode ser dentro do Next.js ou separado)
- `/packages/ui` - Componentes compartilhados
- `/packages/database` - Schema Prisma e tipos
- `/packages/config` - Configurações compartilhadas

### 4.2 Service Architecture

**Monolith Modular** com serviços externos:

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js Application                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Pages/    │  │    API      │  │   Server Actions    │  │
│  │   App       │  │   Routes    │  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
          │                │                    │
          ▼                ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                        Supabase                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  PostgreSQL │  │    Auth     │  │     Realtime        │  │
│  │   + Prisma  │  │             │  │    (WebSocket)      │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│  ┌─────────────┐  ┌─────────────┐                           │
│  │   Storage   │  │    Edge     │                           │
│  │   (Fotos)   │  │  Functions  │                           │
│  └─────────────┘  └─────────────┘                           │
└─────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│                      n8n Cloud                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │  Workflows WhatsApp (Bot, Notificações, Webhooks)       ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### 4.3 Tech Stack Detalhada

| Camada | Tecnologia | Justificativa |
|--------|------------|---------------|
| Frontend | Next.js 14+ (App Router) | SSR, RSC, melhor DX, ecossistema React |
| Styling | TailwindCSS + Shadcn/ui | Produtividade, consistência, acessibilidade |
| State | Zustand ou React Query | Simplicidade, performance |
| Backend | Next.js API Routes | Simplicidade do monolith, serverless-ready |
| ORM | Prisma | Type-safety, migrations, DX |
| Database | PostgreSQL (Supabase) | Relacional, robusto, gratuito no início |
| Auth | Supabase Auth | Integrado, OAuth, JWT |
| Realtime | Supabase Realtime | WebSocket nativo, integrado |
| Storage | Supabase Storage | Fotos de perfil, documentos |
| Automação | n8n Cloud | Workflows WhatsApp, integrações |
| WhatsApp | Cloud API (Meta) | Oficial, confiável |
| Hosting | Vercel | Deploy automático, edge, preview |
| Cache | Upstash Redis (opcional) | Rate limiting, sessões (se necessário) |

### 4.4 Testing Requirements

**Unit + Integration Tests**

- **Unit Tests:** Jest para funções utilitárias e hooks
- **Integration Tests:** Testing Library para componentes
- **E2E Tests:** Playwright para fluxos críticos (cadastro, orçamento, OS)
- **Cobertura mínima:** 70% para código crítico (auth, pagamentos, OS)

### 4.5 Additional Technical Assumptions

- WhatsApp Business API via Meta Cloud API (não BSP terceirizado)
- Mensagens WhatsApp template devem ser pré-aprovadas pela Meta
- Sistema de filas (Supabase Edge Functions ou n8n) para webhooks
- Logs estruturados para debugging e auditoria
- Feature flags para rollout gradual de funcionalidades
- CI/CD via GitHub Actions + Vercel
- Ambiente de staging para testes antes de produção

---

## 5. Epic List

### Epic 1: Fundação e Autenticação
Estabelecer infraestrutura do projeto, banco de dados, autenticação e estrutura base da aplicação.

### Epic 2: Módulo de Técnicos
Implementar cadastro, perfil, dashboard e gestão de serviços para técnicos.

### Epic 3: Módulo de Clientes e Matching
Implementar busca de técnicos, visualização de perfis e sistema de matching.

### Epic 4: Ordens de Serviço
Implementar ciclo completo de OS: criação, status, timeline e conclusão.

### Epic 5: Integração WhatsApp
Implementar bot conversacional, orçamento automático e notificações via WhatsApp.

### Epic 6: Avaliações e Gamificação
Implementar sistema de avaliações, badges, rankings e reputação.

### Epic 7: Chat de Atendimento
Implementar interface de chat para atendentes humanos.

### Epic 8: Administração e Monetização
Implementar dashboard admin, relatórios e sistema de planos/assinaturas.

---

## 6. Epic Details

---

### Epic 1: Fundação e Autenticação

**Objetivo:** Estabelecer a base técnica do projeto com infraestrutura, banco de dados, autenticação e estrutura inicial da aplicação, entregando uma página de login funcional.

#### Story 1.1: Setup do Projeto e Infraestrutura

**Como** desenvolvedor,
**Quero** ter o projeto configurado com todas as ferramentas necessárias,
**Para que** eu possa começar a desenvolver funcionalidades.

**Acceptance Criteria:**
1. Repositório Git inicializado com estrutura monorepo (Turborepo)
2. Next.js 14+ configurado com App Router e TypeScript
3. TailwindCSS e Shadcn/ui instalados e configurados
4. Prisma configurado com conexão ao Supabase PostgreSQL
5. ESLint e Prettier configurados com regras do projeto
6. Variáveis de ambiente configuradas (.env.example documentado)
7. README com instruções de setup local
8. Deploy inicial na Vercel funcionando (página "em construção")

#### Story 1.2: Schema do Banco de Dados

**Como** desenvolvedor,
**Quero** ter o schema do banco de dados definido e migrado,
**Para que** as entidades principais estejam prontas para uso.

**Acceptance Criteria:**
1. Schema Prisma definido com todas as entidades: User, Tecnico, Cliente, OrdemServico, Avaliacao, Conversa, Mensagem, Badge, Plano
2. Relacionamentos corretamente definidos (1:N, N:N)
3. Índices criados para campos de busca frequente
4. Enums definidos para status e tipos
5. Migration executada com sucesso no Supabase
6. Seed script com dados de exemplo para desenvolvimento
7. Tipos TypeScript gerados automaticamente pelo Prisma

#### Story 1.3: Autenticação e Autorização

**Como** usuário,
**Quero** fazer login de forma segura,
**Para que** eu possa acessar minha área restrita.

**Acceptance Criteria:**
1. Integração com Supabase Auth configurada
2. Página de login com email/senha funcionando
3. Página de registro com validação de campos
4. Fluxo de recuperação de senha implementado
5. Middleware de proteção de rotas autenticadas
6. Roles definidos: cliente, tecnico, atendente, admin
7. Contexto de autenticação disponível em toda aplicação
8. Logout funcionando corretamente
9. Sessão persistida com refresh token

#### Story 1.4: Layout Base e Navegação

**Como** usuário,
**Quero** uma interface consistente e navegável,
**Para que** eu possa acessar as diferentes áreas do sistema.

**Acceptance Criteria:**
1. Layout base responsivo com header e sidebar
2. Navegação condicional por role (técnico vê menu de técnico, admin vê menu admin)
3. Componente de loading global
4. Página 404 customizada
5. Página de erro genérica
6. Breadcrumbs funcionando
7. Mobile menu (hamburger) funcionando
8. Tema claro implementado (dark mode opcional futuro)

---

### Epic 2: Módulo de Técnicos

**Objetivo:** Permitir que técnicos se cadastrem na plataforma, configurem seu perfil e serviços, e visualizem seu dashboard.

#### Story 2.1: Cadastro de Técnico

**Como** técnico,
**Quero** me cadastrar na plataforma,
**Para que** eu possa oferecer meus serviços.

**Acceptance Criteria:**
1. Formulário de cadastro multi-step: dados pessoais → especialidades → documentos → confirmação
2. Upload de foto de perfil
3. Upload de documento (CPF/CNPJ) para validação
4. Seleção de especialidades (checkboxes com opções predefinidas)
5. Definição de área de atuação (CEP + raio ou bairros)
6. Indicação se atende em domicílio
7. Validação de campos obrigatórios
8. Perfil criado com status "pendente_aprovacao"
9. Email de confirmação enviado

#### Story 2.2: Perfil Público do Técnico

**Como** cliente,
**Quero** visualizar o perfil completo de um técnico,
**Para que** eu possa decidir se quero solicitar orçamento.

**Acceptance Criteria:**
1. Página pública /tecnico/[slug] acessível sem login
2. Exibição de: foto, nome, bio, especialidades, área de atuação
3. Exibição de estatísticas: avaliação média, total de atendimentos, tempo na plataforma
4. Lista de badges conquistados
5. Avaliações recentes com paginação
6. Gráfico de especialidades por volume
7. Botão "Solicitar Orçamento" (redireciona para WhatsApp ou formulário)
8. SEO otimizado (meta tags, Open Graph)

#### Story 2.3: Dashboard do Técnico

**Como** técnico,
**Quero** visualizar meu dashboard,
**Para que** eu possa acompanhar meu desempenho.

**Acceptance Criteria:**
1. Cards com KPIs: OS abertas, em andamento, concluídas (mês), faturamento (mês)
2. Gráfico de faturamento dos últimos 6 meses
3. Lista das últimas 5 OS com status
4. Avaliação média com evolução
5. Próximos agendamentos do dia
6. Alertas/notificações pendentes
7. Acesso rápido a ações: nova OS, ver perfil, configurações

#### Story 2.4: Gestão de Serviços do Técnico

**Como** técnico,
**Quero** configurar os serviços que ofereço,
**Para que** clientes vejam meus preços e especialidades.

**Acceptance Criteria:**
1. Lista de serviços do catálogo base disponíveis para ativação
2. Possibilidade de definir preço próprio (ou usar referência)
3. Possibilidade de definir tempo estimado
4. Ativar/desativar serviços individualmente
5. Adicionar observações por serviço
6. Ordenar serviços por prioridade de exibição
7. Preview de como aparece no perfil público

---

### Epic 3: Módulo de Clientes e Matching

**Objetivo:** Permitir que clientes busquem técnicos, visualizem perfis e solicitem orçamentos.

#### Story 3.1: Busca de Técnicos

**Como** cliente,
**Quero** buscar técnicos por especialidade e localização,
**Para que** eu encontre o profissional ideal.

**Acceptance Criteria:**
1. Página de busca com filtros: especialidade, localização (CEP/cidade), avaliação mínima
2. Campo de busca por nome ou serviço
3. Lista de resultados em cards com info resumida
4. Ordenação por: relevância, avaliação, preço, distância
5. Paginação ou infinite scroll
6. Indicador de técnicos online/disponíveis
7. Destaque visual para técnicos Premium/Pro
8. Estado vazio quando não há resultados

#### Story 3.2: Sistema de Matching Inteligente

**Como** cliente,
**Quero** receber sugestões de técnicos adequados,
**Para que** eu não precise buscar manualmente.

**Acceptance Criteria:**
1. Algoritmo considera: especialidade requerida, distância, avaliação, disponibilidade
2. Peso adicional para técnicos Premium > Pro > Gratuito
3. Retorna top 3 técnicos recomendados
4. Endpoint /api/matching aceita: problema, marca, modelo, cep
5. Cache de resultados por 5 minutos
6. Fallback para busca manual se matching não encontrar
7. Log de matchings para análise posterior

#### Story 3.3: Cadastro Simplificado de Cliente

**Como** cliente,
**Quero** me cadastrar rapidamente,
**Para que** eu possa acompanhar meus serviços.

**Acceptance Criteria:**
1. Cadastro com: nome, telefone (WhatsApp), email, CEP
2. Validação de telefone brasileiro
3. Opt-in para marketing (checkbox)
4. Termos de uso e privacidade com aceite obrigatório
5. Login social opcional (Google)
6. Perfil criado automaticamente ao iniciar conversa WhatsApp
7. Tela de "completar cadastro" para usuários vindos do WhatsApp

---

### Epic 4: Ordens de Serviço

**Objetivo:** Implementar o ciclo completo de Ordens de Serviço desde a criação até a entrega.

#### Story 4.1: Criação de Ordem de Serviço

**Como** técnico,
**Quero** criar uma OS para um cliente,
**Para que** eu possa registrar e acompanhar o serviço.

**Acceptance Criteria:**
1. Formulário de nova OS: cliente (busca/cadastro), aparelho (marca/modelo/IMEI), defeito relatado
2. Geração automática de número da OS (formato: RF-YYYYMMDD-XXXX)
3. Status inicial: RECEBIDO
4. Data de entrada automática
5. Previsão de entrega (calculada ou manual)
6. Observações internas
7. Upload de fotos do aparelho (antes)
8. Cliente notificado via WhatsApp sobre criação
9. OS aparece no dashboard do técnico

#### Story 4.2: Gestão de Status da OS

**Como** técnico,
**Quero** atualizar o status da OS,
**Para que** o cliente acompanhe o andamento.

**Acceptance Criteria:**
1. Fluxo de status: RECEBIDO → DIAGNOSTICO → ORCAMENTO_ENVIADO → APROVADO/RECUSADO → EM_REPARO → CONCLUIDO → ENTREGUE
2. Botões de ação contextual para próximo status
3. Registro de histórico de mudanças (OS_EVENTOS)
4. Timestamp de cada mudança
5. Possibilidade de adicionar observação em cada mudança
6. Notificação automática ao cliente em cada mudança de status
7. Impedir retrocesso de status (exceto admin)

#### Story 4.3: Tela de Detalhe da OS

**Como** técnico,
**Quero** ver todos os detalhes de uma OS,
**Para que** eu possa gerenciar o serviço.

**Acceptance Criteria:**
1. Header com número, status atual e cliente
2. Informações do aparelho (marca, modelo, IMEI)
3. Defeito relatado e defeito encontrado (editável)
4. Timeline de eventos com datas
5. Fotos antes/depois
6. Valor orçado e valor final
7. Botões de ação: atualizar status, editar, enviar mensagem
8. Link para conversa WhatsApp do cliente
9. Impressão de comprovante/recibo

#### Story 4.4: Lista de OS do Técnico

**Como** técnico,
**Quero** ver todas minhas OS,
**Para que** eu possa gerenciar meu trabalho.

**Acceptance Criteria:**
1. Tabela/lista com: número, cliente, aparelho, status, data entrada
2. Filtros: status, período, busca por número/cliente
3. Ordenação por data, status
4. Indicadores visuais de prioridade (atrasadas em vermelho)
5. Ações rápidas: ver detalhes, atualizar status
6. Contador por status no topo
7. Export para CSV (opcional)

---

### Epic 5: Integração WhatsApp

**Objetivo:** Implementar bot conversacional para atendimento automatizado, orçamento e notificações via WhatsApp.

#### Story 5.1: Configuração do Webhook WhatsApp

**Como** sistema,
**Quero** receber mensagens do WhatsApp,
**Para que** eu possa processá-las automaticamente.

**Acceptance Criteria:**
1. Webhook configurado no n8n para receber mensagens
2. Validação de assinatura do webhook (segurança)
3. Controle de idempotência (evitar processar mensagem duplicada)
4. Normalização do telefone para E.164
5. Identificação de cliente existente ou novo
6. Registro de todas mensagens recebidas no banco
7. Log estruturado para debugging
8. Tratamento de erros com retry

#### Story 5.2: Máquina de Estados da Conversa

**Como** sistema,
**Quero** controlar o estado da conversa,
**Para que** o bot responda contextualmente.

**Acceptance Criteria:**
1. Estados definidos: INICIO, MENU, ORCAMENTO_MARCA, ORCAMENTO_MODELO, ORCAMENTO_PROBLEMA, ORCAMENTO_RESULTADO, ACOMPANHAMENTO, ATENDIMENTO_HUMANO
2. Transições de estado documentadas
3. Contexto da conversa persistido (JSON)
4. Timeout de 30 minutos para reset automático
5. Comando "menu" ou "inicio" sempre volta ao menu principal
6. Comando "humano" ou "atendente" escala para atendimento
7. Estado recuperável após reinício do sistema

#### Story 5.3: Fluxo de Orçamento Automático

**Como** cliente,
**Quero** receber orçamento via WhatsApp,
**Para que** eu saiba o preço antes de ir à loja.

**Acceptance Criteria:**
1. Menu inicial com botão "Orçamento Rápido"
2. Bot pergunta marca (botões: Apple, Samsung, Xiaomi, Motorola, Outro)
3. Bot pergunta modelo (lista ou campo livre)
4. Bot pergunta problema (múltipla escolha)
5. Consulta catálogo de serviços e retorna faixa de preço
6. Mensagem com: serviço, faixa de preço, prazo estimado
7. Botões de CTA: "Agendar", "Falar com Técnico", "Ver Técnicos"
8. Orçamento registrado no banco com status COTADO

#### Story 5.4: Fluxo de Acompanhamento de OS

**Como** cliente,
**Quero** consultar minha OS via WhatsApp,
**Para que** eu saiba o status do meu aparelho.

**Acceptance Criteria:**
1. Menu inicial com botão "Acompanhar Conserto"
2. Bot solicita número da OS ou usa telefone para buscar
3. Exibe status atual com descrição amigável
4. Exibe previsão de entrega
5. Exibe valor (se aprovado)
6. Botão para falar com técnico responsável
7. Mensagem se não encontrar OS

#### Story 5.5: Notificações Automáticas

**Como** cliente,
**Quero** ser notificado sobre mudanças na minha OS,
**Para que** eu não precise ficar consultando.

**Acceptance Criteria:**
1. Template de mensagem para cada mudança de status
2. Mensagens enviadas automaticamente via n8n
3. Throttling para evitar spam (máx 1 msg a cada 5 min)
4. Mensagem de conclusão com instrução de retirada
5. Mensagem de lembrete se OS concluída há 3+ dias sem retirada
6. Log de todas notificações enviadas
7. Tratamento de falha de envio com retry

---

### Epic 6: Avaliações e Gamificação

**Objetivo:** Implementar sistema de avaliações, badges e rankings para incentivar qualidade.

#### Story 6.1: Sistema de Avaliações

**Como** cliente,
**Quero** avaliar o técnico após o serviço,
**Para que** outros clientes saibam da qualidade.

**Acceptance Criteria:**
1. Solicitação de avaliação enviada 24h após status ENTREGUE
2. Avaliação: 1-5 estrelas + comentário opcional
3. Avaliação via WhatsApp (botões) ou link web
4. Apenas 1 avaliação por OS
5. Avaliação não editável após envio
6. Avaliação aparece no perfil do técnico
7. Média recalculada em tempo real
8. Técnico notificado sobre nova avaliação

#### Story 6.2: Sistema de Badges

**Como** técnico,
**Quero** conquistar badges,
**Para que** meu perfil se destaque.

**Acceptance Criteria:**
1. Badges definidos com critérios claros:
   - "Novato": primeiro atendimento
   - "Confiável": 10+ atendimentos
   - "Expert": 50+ atendimentos
   - "Mestre": 100+ atendimentos
   - "5 Estrelas": média 4.8+ com 20+ avaliações
   - "Resposta Rápida": tempo médio de resposta < 30min
   - "Especialista Apple": 20+ serviços Apple
   - "Especialista Samsung": 20+ serviços Samsung
2. Verificação automática de critérios
3. Concessão automática quando critério atingido
4. Notificação ao técnico sobre nova badge
5. Badges exibidos no perfil público
6. Badges ordenados por relevância

#### Story 6.3: Ranking de Técnicos

**Como** cliente,
**Quero** ver o ranking de técnicos,
**Para que** eu escolha os melhores.

**Acceptance Criteria:**
1. Ranking regional (por cidade/estado)
2. Ranking por especialidade
3. Fórmula: (avaliação * 0.5) + (atendimentos * 0.3) + (taxa conclusão * 0.2)
4. Atualização diária
5. Posição exibida no perfil do técnico ("Top 10 SP")
6. Página pública de ranking com filtros
7. Técnicos podem ocultar posição (opcional)

---

### Epic 7: Chat de Atendimento

**Objetivo:** Implementar interface para atendentes humanos gerenciarem conversas.

#### Story 7.1: Lista de Conversas

**Como** atendente,
**Quero** ver todas conversas ativas,
**Para que** eu possa atender os clientes.

**Acceptance Criteria:**
1. Lista de conversas ordenada por última mensagem
2. Indicador de conversas aguardando atendimento humano
3. Preview da última mensagem
4. Tempo de espera visível
5. Filtros: minhas conversas, aguardando, todas
6. Busca por nome/telefone
7. Contador de não lidas
8. Atualização em tempo real (WebSocket)

#### Story 7.2: Interface de Chat

**Como** atendente,
**Quero** conversar com clientes,
**Para que** eu possa resolver suas dúvidas.

**Acceptance Criteria:**
1. Área de mensagens com histórico completo
2. Campo de input com envio por Enter
3. Suporte a envio de texto e imagens
4. Indicador de digitando
5. Status de entrega/leitura das mensagens
6. Botão para devolver ao bot
7. Templates de resposta rápida
8. Menção a mensagens anteriores

#### Story 7.3: Painel de Informações do Cliente

**Como** atendente,
**Quero** ver informações do cliente durante o chat,
**Para que** eu tenha contexto para atender.

**Acceptance Criteria:**
1. Painel lateral com: nome, telefone, email
2. Histórico de OS (últimas 5)
3. Status da OS atual (se houver)
4. Avaliações anteriores
5. Tags/observações do cliente
6. Ações rápidas: criar OS, enviar orçamento, agendar
7. Link para perfil completo

---

### Epic 8: Administração e Monetização

**Objetivo:** Implementar dashboard administrativo e sistema de planos/assinaturas.

#### Story 8.1: Dashboard Administrativo

**Como** administrador,
**Quero** ver métricas globais da plataforma,
**Para que** eu possa tomar decisões.

**Acceptance Criteria:**
1. KPIs: total técnicos, técnicos ativos, total clientes, OS do mês, faturamento
2. Gráfico de crescimento (usuários, OS, faturamento)
3. Mapa de calor de atendimentos por região
4. Lista de técnicos pendentes de aprovação
5. Alertas de técnicos com avaliação baixa
6. Conversas aguardando há muito tempo
7. Filtro por período

#### Story 8.2: Gestão de Técnicos (Admin)

**Como** administrador,
**Quero** gerenciar os técnicos cadastrados,
**Para que** eu mantenha a qualidade da plataforma.

**Acceptance Criteria:**
1. Lista de técnicos com filtros e busca
2. Detalhes do técnico com documentos
3. Aprovar/rejeitar cadastro pendente
4. Suspender/reativar técnico
5. Editar dados do técnico
6. Ver histórico de OS e avaliações
7. Adicionar observações internas
8. Exportar lista

#### Story 8.3: Catálogo de Serviços (Admin)

**Como** administrador,
**Quero** gerenciar o catálogo base de serviços,
**Para que** técnicos tenham referência de preços.

**Acceptance Criteria:**
1. CRUD de categorias de serviço
2. CRUD de serviços com: nome, descrição, preço mín/máx, tempo estimado
3. Vinculação serviço ↔ marca/modelo
4. Ativar/desativar serviços
5. Histórico de alterações de preço
6. Import/export CSV
7. Serviços usados como base para orçamento automático

#### Story 8.4: Sistema de Planos e Assinaturas

**Como** técnico,
**Quero** assinar um plano,
**Para que** eu tenha mais benefícios.

**Acceptance Criteria:**
1. Planos definidos: Gratuito, Pro (R$79/mês), Premium (R$149/mês)
2. Página de comparação de planos
3. Integração com gateway de pagamento (Stripe ou similar)
4. Assinatura recorrente mensal
5. Upgrade/downgrade de plano
6. Cancelamento com período de carência
7. Benefícios aplicados automaticamente (destaque, comissão)
8. Relatório de assinaturas para admin

#### Story 8.5: Relatórios Financeiros

**Como** administrador,
**Quero** ver relatórios financeiros,
**Para que** eu acompanhe a saúde do negócio.

**Acceptance Criteria:**
1. Relatório de faturamento por período
2. Relatório de comissões a receber
3. Relatório de assinaturas (MRR, churn)
4. Relatório por técnico (faturamento, comissão)
5. Export para Excel/CSV
6. Gráficos de tendência
7. Comparativo com período anterior

---

## 7. Checklist Results Report

*A ser preenchido após execução do pm-checklist*

---

## 8. Next Steps

### 8.1 UX Expert Prompt

> Olá UX Expert! Preciso que você crie a especificação de UI detalhada para o RF360 - Marketplace de Técnicos de Eletrônica. O PRD está disponível em `docs/prd.md`. Foque inicialmente nas telas críticas: perfil do técnico, dashboard do técnico, fluxo de busca de técnicos e interface de chat. Use o design system com Shadcn/ui e TailwindCSS.

### 8.2 Architect Prompt

> Olá Architect! Preciso que você crie a arquitetura técnica detalhada para o RF360 - Marketplace de Técnicos de Eletrônica. O PRD está disponível em `docs/prd.md`. A stack definida é: Next.js 14+, Supabase (PostgreSQL + Auth + Realtime), Prisma, TailwindCSS, Shadcn/ui, n8n Cloud para WhatsApp. Priorize escalabilidade e mantenha simplicidade para MVP.

---

## Anexos

### A. Modelo de Dados (Resumo)

```
User (base)
├── Tecnico (1:1)
│   ├── Servicos (1:N)
│   ├── Badges (N:N)
│   └── Avaliacoes (1:N)
├── Cliente (1:1)
│   └── OrdensServico (1:N)
└── Atendente (1:1)

OrdemServico
├── Cliente (N:1)
├── Tecnico (N:1)
├── Eventos (1:N)
└── Avaliacoes (1:1)

Conversa
├── Mensagens (1:N)
└── Cliente (N:1)

CatalogoServico (admin)
└── Servicos técnicos (referência)
```

### B. Estados da OS

```
RECEBIDO → DIAGNOSTICO → ORCAMENTO_ENVIADO → APROVADO → EM_REPARO → CONCLUIDO → ENTREGUE
                                           ↘ RECUSADO → DEVOLVIDO
```

### C. Estados da Conversa WhatsApp

```
INICIO → MENU → ORCAMENTO_* → RESULTADO
              → ACOMPANHAMENTO
              → ATENDIMENTO_HUMANO
```

---

*Documento gerado com BMAD Method - PRD Template v2*
