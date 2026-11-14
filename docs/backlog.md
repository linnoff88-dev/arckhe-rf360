# RF360 - Backlog Refinado e Priorizado

**Versão:** 1.0
**Data:** 22/01/2026
**Autor:** Sarah (Product Owner)
**Status:** Aprovado para Desenvolvimento

---

## 1. Visão Geral do Backlog

### 1.1 Metodologia de Priorização

A priorização segue o framework **MoSCoW** combinado com análise de dependências:

- **Must Have (M):** Funcionalidades essenciais para o MVP funcionar
- **Should Have (S):** Importantes mas MVP funciona sem elas
- **Could Have (C):** Desejáveis se houver tempo
- **Won't Have (W):** Fora do escopo do MVP

### 1.2 Estimativa de Esforço

Story Points usando escala Fibonacci: 1, 2, 3, 5, 8, 13

| Points | Complexidade | Referência |
|--------|--------------|------------|
| 1 | Trivial | Config, ajuste de UI |
| 2 | Simples | CRUD básico |
| 3 | Médio | Feature com lógica moderada |
| 5 | Complexo | Integração, lógica de negócio |
| 8 | Muito Complexo | Múltiplas integrações |
| 13 | Épico | Deve ser quebrado |

### 1.3 Resumo do MVP

| Métrica | Valor |
|---------|-------|
| Total de Epics | 8 |
| Total de Stories | 24 |
| Stories MVP (Must/Should) | 18 |
| Story Points MVP | 89 |
| Sprints Estimadas (velocity 20) | 4-5 sprints |

---

## 2. Roadmap de Sprints

### Sprint 1: Fundação (20 pts)
- Story 1.1: Setup do Projeto (5 pts) - **MUST**
- Story 1.2: Schema do Banco (5 pts) - **MUST**
- Story 1.3: Autenticação (5 pts) - **MUST**
- Story 1.4: Layout Base (5 pts) - **MUST**

### Sprint 2: Módulo Técnico Core (21 pts)
- Story 2.1: Cadastro de Técnico (8 pts) - **MUST**
- Story 2.2: Perfil Público (5 pts) - **MUST**
- Story 2.3: Dashboard Técnico (5 pts) - **MUST**
- Story 2.4: Gestão de Serviços (3 pts) - **SHOULD**

### Sprint 3: OS e Cliente (21 pts)
- Story 4.1: Criação de OS (5 pts) - **MUST**
- Story 4.2: Gestão de Status (5 pts) - **MUST**
- Story 4.3: Detalhe da OS (3 pts) - **MUST**
- Story 4.4: Lista de OS (3 pts) - **MUST**
- Story 3.3: Cadastro Cliente (5 pts) - **SHOULD**

### Sprint 4: WhatsApp Core (18 pts)
- Story 5.1: Webhook WhatsApp (5 pts) - **MUST**
- Story 5.2: Máquina de Estados (5 pts) - **MUST**
- Story 5.4: Acompanhamento OS (3 pts) - **MUST**
- Story 5.5: Notificações (5 pts) - **MUST**

### Sprint 5: Matching e Orçamento (15 pts)
- Story 3.1: Busca de Técnicos (5 pts) - **SHOULD**
- Story 3.2: Matching Inteligente (5 pts) - **SHOULD**
- Story 5.3: Orçamento Automático (5 pts) - **SHOULD**

### Sprint 6+: Pós-MVP
- Epic 6: Avaliações e Gamificação
- Epic 7: Chat de Atendimento
- Epic 8: Administração e Monetização

---

## 3. Backlog Detalhado por Epic

---

### Epic 1: Fundação e Autenticação

**Prioridade:** 🔴 Crítica (Bloqueia tudo)
**Total Story Points:** 20
**Sprint Target:** Sprint 1

---

#### Story 1.1: Setup do Projeto e Infraestrutura

| Atributo | Valor |
|----------|-------|
| ID | RF360-001 |
| Prioridade | **MUST HAVE** |
| Story Points | 5 |
| Sprint | 1 |
| Dependências | Nenhuma |
| Riscos | Config Supabase pode exigir ajustes |

**User Story:**
> Como desenvolvedor, quero ter o projeto configurado com todas as ferramentas necessárias, para que eu possa começar a desenvolver funcionalidades.

**Acceptance Criteria:**

- [ ] AC1: Repositório Git com estrutura monorepo Turborepo
- [ ] AC2: Next.js 14+ com App Router e TypeScript strict
- [ ] AC3: TailwindCSS + Shadcn/ui instalados e tema configurado
- [ ] AC4: Prisma com conexão Supabase PostgreSQL funcionando
- [ ] AC5: ESLint + Prettier com regras do projeto
- [ ] AC6: `.env.example` documentado com todas variáveis
- [ ] AC7: README com instruções de setup local
- [ ] AC8: Deploy Vercel com página placeholder funcionando

**Definition of Done:**
- Todos os ACs passando
- PR aprovado com code review
- Deploy em staging funcionando
- Documentação atualizada

**Notas Técnicas:**
- Usar `pnpm` como package manager
- Estrutura: `/apps/web`, `/packages/ui`, `/packages/database`
- Configurar absolute imports com `@/`

---

#### Story 1.2: Schema do Banco de Dados

| Atributo | Valor |
|----------|-------|
| ID | RF360-002 |
| Prioridade | **MUST HAVE** |
| Story Points | 5 |
| Sprint | 1 |
| Dependências | RF360-001 |
| Riscos | Schema pode precisar ajustes durante desenvolvimento |

**User Story:**
> Como desenvolvedor, quero ter o schema do banco de dados definido e migrado, para que as entidades principais estejam prontas para uso.

**Acceptance Criteria:**

- [ ] AC1: Schema Prisma com entidades: User, Tecnico, Cliente, OrdemServico, Avaliacao, Conversa, Mensagem, Badge, Plano, CatalogoServico
- [ ] AC2: Relacionamentos corretos (1:N, N:N com tabelas pivot)
- [ ] AC3: Índices em: `email`, `telefone`, `cep`, `status`, `createdAt`
- [ ] AC4: Enums: UserRole, OSStatus, ConversaEstado, BadgeTipo
- [ ] AC5: Migration executada no Supabase sem erros
- [ ] AC6: Script `prisma/seed.ts` com dados de teste
- [ ] AC7: Tipos TypeScript exportados de `@/packages/database`

**Definition of Done:**
- Migration aplicada em dev e staging
- Seed executando sem erros
- Tipos TypeScript disponíveis no frontend

**Notas Técnicas:**
- Usar `uuid` para PKs
- Campos de auditoria: `createdAt`, `updatedAt`, `deletedAt` (soft delete)
- RLS policies do Supabase para segurança adicional

---

#### Story 1.3: Autenticação e Autorização

| Atributo | Valor |
|----------|-------|
| ID | RF360-003 |
| Prioridade | **MUST HAVE** |
| Story Points | 5 |
| Sprint | 1 |
| Dependências | RF360-002 |
| Riscos | Integração Supabase Auth pode ter edge cases |

**User Story:**
> Como usuário, quero fazer login de forma segura, para que eu possa acessar minha área restrita.

**Acceptance Criteria:**

- [ ] AC1: Supabase Auth configurado com email/senha
- [ ] AC2: Página `/login` funcional com validação
- [ ] AC3: Página `/register` com campos: nome, email, senha, role
- [ ] AC4: Página `/forgot-password` funcional
- [ ] AC5: Middleware protegendo rotas `/dashboard/*`, `/admin/*`
- [ ] AC6: Roles funcionando: `cliente`, `tecnico`, `atendente`, `admin`
- [ ] AC7: Hook `useAuth()` disponível globalmente
- [ ] AC8: Logout limpando sessão corretamente
- [ ] AC9: Refresh token funcionando (sessão persiste)

**Definition of Done:**
- Fluxo completo testado manualmente
- Testes E2E para login/logout
- Segurança revisada (sem exposição de tokens)

**Notas Técnicas:**
- Usar Supabase `@supabase/auth-helpers-nextjs`
- Armazenar role no `user_metadata`
- Criar trigger para sincronizar `auth.users` com tabela `User`

---

#### Story 1.4: Layout Base e Navegação

| Atributo | Valor |
|----------|-------|
| ID | RF360-004 |
| Prioridade | **MUST HAVE** |
| Story Points | 5 |
| Sprint | 1 |
| Dependências | RF360-003 |
| Riscos | Baixo |

**User Story:**
> Como usuário, quero uma interface consistente e navegável, para que eu possa acessar as diferentes áreas do sistema.

**Acceptance Criteria:**

- [ ] AC1: Layout com header (logo, user menu) e sidebar colapsável
- [ ] AC2: Sidebar com navegação condicional por role
- [ ] AC3: Componente `<Loading />` global com spinner
- [ ] AC4: Página `/404` customizada com design system
- [ ] AC5: Página `/error` para erros genéricos
- [ ] AC6: Breadcrumbs automáticos baseado na rota
- [ ] AC7: Menu hamburger funcional em mobile
- [ ] AC8: Tema claro aplicado consistentemente

**Definition of Done:**
- Layout responsivo testado em mobile/tablet/desktop
- Navegação funcionando para todas as roles
- Componentes documentados no Storybook (opcional)

**Notas Técnicas:**
- Usar Shadcn/ui `<Sidebar>`, `<Sheet>` para mobile
- Zustand para estado de sidebar collapsed
- Implementar `<RoleGuard>` para proteção visual

---

### Epic 2: Módulo de Técnicos

**Prioridade:** 🔴 Crítica
**Total Story Points:** 21
**Sprint Target:** Sprint 2

---

#### Story 2.1: Cadastro de Técnico

| Atributo | Valor |
|----------|-------|
| ID | RF360-005 |
| Prioridade | **MUST HAVE** |
| Story Points | 8 |
| Sprint | 2 |
| Dependências | RF360-004 |
| Riscos | Upload de documentos requer Storage config |

**User Story:**
> Como técnico, quero me cadastrar na plataforma, para que eu possa oferecer meus serviços.

**Acceptance Criteria:**

- [ ] AC1: Formulário multi-step com 4 etapas: Dados → Especialidades → Documentos → Confirmação
- [ ] AC2: Upload de foto de perfil (max 2MB, jpg/png)
- [ ] AC3: Upload de documento CPF/CNPJ (max 5MB, pdf/jpg)
- [ ] AC4: Seleção múltipla de especialidades com checkboxes
- [ ] AC5: Definição de área: CEP base + raio (5/10/15/20km) ou lista de bairros
- [ ] AC6: Toggle "Atendo em domicílio"
- [ ] AC7: Validação de todos campos obrigatórios
- [ ] AC8: Perfil criado com `status: PENDENTE_APROVACAO`
- [ ] AC9: Email de confirmação enviado ao técnico

**Definition of Done:**
- Fluxo completo funcional
- Arquivos sendo salvos no Supabase Storage
- Email disparando corretamente

**Notas Técnicas:**
- Usar React Hook Form + Zod para validação
- Supabase Storage bucket `documentos` (privado) e `avatars` (público)
- Componente stepper reutilizável

**Subtasks:**
1. [ ] Criar componente `<MultiStepForm>`
2. [ ] Implementar step 1: Dados pessoais
3. [ ] Implementar step 2: Especialidades
4. [ ] Implementar step 3: Upload de documentos
5. [ ] Implementar step 4: Revisão e confirmação
6. [ ] Configurar Supabase Storage
7. [ ] Criar endpoint de cadastro
8. [ ] Configurar envio de email

---

#### Story 2.2: Perfil Público do Técnico

| Atributo | Valor |
|----------|-------|
| ID | RF360-006 |
| Prioridade | **MUST HAVE** |
| Story Points | 5 |
| Sprint | 2 |
| Dependências | RF360-005 |
| Riscos | SEO requer SSR correto |

**User Story:**
> Como cliente, quero visualizar o perfil completo de um técnico, para que eu possa decidir se quero solicitar orçamento.

**Acceptance Criteria:**

- [ ] AC1: Rota pública `/tecnico/[slug]` acessível sem login
- [ ] AC2: Exibir: foto, nome, bio, especialidades, área de atuação
- [ ] AC3: Estatísticas: avaliação média, total atendimentos, tempo na plataforma
- [ ] AC4: Lista de badges conquistados com ícones
- [ ] AC5: Avaliações recentes (últimas 5) com paginação "ver mais"
- [ ] AC6: Gráfico de pizza: distribuição de serviços por categoria
- [ ] AC7: Botão CTA "Solicitar Orçamento" → link WhatsApp ou modal
- [ ] AC8: Meta tags SEO + Open Graph para compartilhamento

**Definition of Done:**
- Página renderizando corretamente com SSR
- Lighthouse SEO score > 90
- Compartilhamento social funcionando

**Notas Técnicas:**
- Usar `generateMetadata` do Next.js para SEO dinâmico
- ISR com revalidate de 1 hora para performance
- Fallback loading state durante geração

---

#### Story 2.3: Dashboard do Técnico

| Atributo | Valor |
|----------|-------|
| ID | RF360-007 |
| Prioridade | **MUST HAVE** |
| Story Points | 5 |
| Sprint | 2 |
| Dependências | RF360-005, RF360-011 |
| Riscos | Baixo |

**User Story:**
> Como técnico, quero visualizar meu dashboard, para que eu possa acompanhar meu desempenho.

**Acceptance Criteria:**

- [ ] AC1: Cards KPI: OS abertas, em andamento, concluídas (mês), faturamento (mês)
- [ ] AC2: Gráfico de linha: faturamento últimos 6 meses
- [ ] AC3: Lista das últimas 5 OS com status e link para detalhe
- [ ] AC4: Card de avaliação média com ícone de tendência (↑↓)
- [ ] AC5: Lista de próximos agendamentos do dia (se houver)
- [ ] AC6: Contador de notificações/alertas pendentes
- [ ] AC7: Quick actions: "Nova OS", "Ver Perfil", "Configurações"

**Definition of Done:**
- Dashboard carregando em < 2s
- Dados atualizando em tempo real (opcional: polling 30s)
- Responsivo em todos breakpoints

**Notas Técnicas:**
- Usar Recharts ou Chart.js para gráficos
- React Query para cache e revalidation
- Skeleton loading para melhor UX

---

#### Story 2.4: Gestão de Serviços do Técnico

| Atributo | Valor |
|----------|-------|
| ID | RF360-008 |
| Prioridade | **SHOULD HAVE** |
| Story Points | 3 |
| Sprint | 2 |
| Dependências | RF360-005 |
| Riscos | Baixo |

**User Story:**
> Como técnico, quero configurar os serviços que ofereço, para que clientes vejam meus preços e especialidades.

**Acceptance Criteria:**

- [ ] AC1: Lista de serviços do catálogo base com toggle ativar/desativar
- [ ] AC2: Campo para preço personalizado (ou usar referência)
- [ ] AC3: Campo para tempo estimado em horas
- [ ] AC4: Campo de observações por serviço
- [ ] AC5: Drag-and-drop para ordenar prioridade de exibição
- [ ] AC6: Preview de como aparece no perfil público

**Definition of Done:**
- CRUD completo funcionando
- Alterações refletindo no perfil público

**Notas Técnicas:**
- Usar `@dnd-kit` para drag-and-drop
- Salvar ordem no campo `ordem` do relacionamento

---

### Epic 3: Módulo de Clientes e Matching

**Prioridade:** 🟡 Alta
**Total Story Points:** 15
**Sprint Target:** Sprint 3 e 5

---

#### Story 3.1: Busca de Técnicos

| Atributo | Valor |
|----------|-------|
| ID | RF360-009 |
| Prioridade | **SHOULD HAVE** |
| Story Points | 5 |
| Sprint | 5 |
| Dependências | RF360-006 |
| Riscos | Performance de busca com muitos técnicos |

**User Story:**
> Como cliente, quero buscar técnicos por especialidade e localização, para que eu encontre o profissional ideal.

**Acceptance Criteria:**

- [ ] AC1: Página `/buscar` com filtros: especialidade, localização, avaliação mínima
- [ ] AC2: Campo de busca por nome ou serviço
- [ ] AC3: Resultados em cards com: foto, nome, avaliação, especialidades, distância
- [ ] AC4: Ordenação: relevância, avaliação, preço, distância
- [ ] AC5: Infinite scroll ou paginação
- [ ] AC6: Badge "Online" para técnicos ativos
- [ ] AC7: Destaque visual para técnicos Premium/Pro (borda dourada)
- [ ] AC8: Estado vazio com sugestão de ajustar filtros

**Definition of Done:**
- Busca retornando resultados em < 500ms
- Filtros funcionando corretamente
- SEO para página de busca

**Notas Técnicas:**
- Usar PostGIS ou cálculo de distância por CEP
- Índice GIN para busca full-text
- Debounce no campo de busca

---

#### Story 3.2: Sistema de Matching Inteligente

| Atributo | Valor |
|----------|-------|
| ID | RF360-010 |
| Prioridade | **SHOULD HAVE** |
| Story Points | 5 |
| Sprint | 5 |
| Dependências | RF360-009 |
| Riscos | Algoritmo pode precisar ajustes com feedback |

**User Story:**
> Como cliente, quero receber sugestões de técnicos adequados, para que eu não precise buscar manualmente.

**Acceptance Criteria:**

- [ ] AC1: Algoritmo considera: especialidade, distância, avaliação, disponibilidade
- [ ] AC2: Peso para plano: Premium (1.5x) > Pro (1.2x) > Gratuito (1.0x)
- [ ] AC3: Retorna top 3 técnicos ordenados por score
- [ ] AC4: Endpoint `POST /api/matching` aceita: problema, marca, modelo, cep
- [ ] AC5: Cache de resultados por 5 minutos (mesmo input)
- [ ] AC6: Fallback para busca manual se < 3 resultados
- [ ] AC7: Log de matchings para análise e melhoria

**Definition of Done:**
- Algoritmo documentado
- Resultados relevantes em testes manuais
- Logs sendo coletados

**Notas Técnicas:**
```
score = (avaliacao * 0.4) + (proximidade * 0.3) + (disponibilidade * 0.2) + (plano_boost * 0.1)
```

---

#### Story 3.3: Cadastro Simplificado de Cliente

| Atributo | Valor |
|----------|-------|
| ID | RF360-011 |
| Prioridade | **SHOULD HAVE** |
| Story Points | 5 |
| Sprint | 3 |
| Dependências | RF360-003 |
| Riscos | Integração com WhatsApp para auto-cadastro |

**User Story:**
> Como cliente, quero me cadastrar rapidamente, para que eu possa acompanhar meus serviços.

**Acceptance Criteria:**

- [ ] AC1: Formulário com: nome, telefone (WhatsApp), email, CEP
- [ ] AC2: Validação de telefone brasileiro (DDD + 9 dígitos)
- [ ] AC3: Checkbox opt-in marketing (default: false)
- [ ] AC4: Link para termos de uso e privacidade com aceite obrigatório
- [ ] AC5: Login social com Google (opcional)
- [ ] AC6: Cliente criado automaticamente ao iniciar conversa WhatsApp
- [ ] AC7: Tela "Completar cadastro" para usuários vindos do WhatsApp

**Definition of Done:**
- Cadastro web funcionando
- Integração WhatsApp criando cliente automaticamente

**Notas Técnicas:**
- Normalizar telefone para E.164 (+55...)
- Usar mask input para telefone e CEP

---

### Epic 4: Ordens de Serviço

**Prioridade:** 🔴 Crítica
**Total Story Points:** 16
**Sprint Target:** Sprint 3

---

#### Story 4.1: Criação de Ordem de Serviço

| Atributo | Valor |
|----------|-------|
| ID | RF360-012 |
| Prioridade | **MUST HAVE** |
| Story Points | 5 |
| Sprint | 3 |
| Dependências | RF360-005, RF360-011 |
| Riscos | Fluxo de notificação WhatsApp |

**User Story:**
> Como técnico, quero criar uma OS para um cliente, para que eu possa registrar e acompanhar o serviço.

**Acceptance Criteria:**

- [ ] AC1: Formulário: cliente (busca/cadastro rápido), aparelho (marca/modelo/IMEI)
- [ ] AC2: Campo: defeito relatado (texto livre)
- [ ] AC3: Geração automática: número `RF-YYYYMMDD-XXXX`
- [ ] AC4: Status inicial: `RECEBIDO`, data entrada automática
- [ ] AC5: Campo: previsão de entrega (date picker ou "X dias úteis")
- [ ] AC6: Campo: observações internas (não visível ao cliente)
- [ ] AC7: Upload de até 5 fotos do aparelho (estado inicial)
- [ ] AC8: Notificação WhatsApp ao cliente após criação
- [ ] AC9: OS aparece no dashboard do técnico imediatamente

**Definition of Done:**
- OS sendo criada e persistida
- Notificação WhatsApp chegando
- Fotos sendo salvas

**Notas Técnicas:**
- Trigger n8n para notificação WhatsApp
- Supabase Storage bucket `os-fotos`

---

#### Story 4.2: Gestão de Status da OS

| Atributo | Valor |
|----------|-------|
| ID | RF360-013 |
| Prioridade | **MUST HAVE** |
| Story Points | 5 |
| Sprint | 3 |
| Dependências | RF360-012 |
| Riscos | Consistência de estados |

**User Story:**
> Como técnico, quero atualizar o status da OS, para que o cliente acompanhe o andamento.

**Acceptance Criteria:**

- [ ] AC1: Fluxo: RECEBIDO → DIAGNOSTICO → ORCAMENTO_ENVIADO → APROVADO/RECUSADO → EM_REPARO → CONCLUIDO → ENTREGUE
- [ ] AC2: Botões de ação contextual mostrando apenas próximo status válido
- [ ] AC3: Registro em tabela `OrdemServicoEvento` com: status, timestamp, usuário, observação
- [ ] AC4: Campo opcional de observação em cada mudança
- [ ] AC5: Notificação automática ao cliente em cada mudança
- [ ] AC6: Impedir retrocesso de status (exceto admin com justificativa)
- [ ] AC7: Status `RECUSADO` permite fluxo alternativo → `DEVOLVIDO`

**Definition of Done:**
- Transições funcionando corretamente
- Histórico sendo registrado
- Notificações disparando

**Notas Técnicas:**
- Implementar state machine para validar transições
- Usar Prisma transaction para atomicidade

---

#### Story 4.3: Tela de Detalhe da OS

| Atributo | Valor |
|----------|-------|
| ID | RF360-014 |
| Prioridade | **MUST HAVE** |
| Story Points | 3 |
| Sprint | 3 |
| Dependências | RF360-012, RF360-013 |
| Riscos | Baixo |

**User Story:**
> Como técnico, quero ver todos os detalhes de uma OS, para que eu possa gerenciar o serviço.

**Acceptance Criteria:**

- [ ] AC1: Header: número OS, status atual (badge colorido), nome cliente
- [ ] AC2: Seção Aparelho: marca, modelo, IMEI, cor
- [ ] AC3: Seção Defeito: relatado (cliente) + encontrado (técnico, editável)
- [ ] AC4: Timeline vertical de eventos com datas e observações
- [ ] AC5: Galeria de fotos antes/depois com lightbox
- [ ] AC6: Seção Valores: orçado, aprovado, final, desconto
- [ ] AC7: Botões: atualizar status, editar OS, enviar mensagem WhatsApp
- [ ] AC8: Botão: imprimir comprovante/recibo (PDF)

**Definition of Done:**
- Todas informações exibidas corretamente
- Ações funcionando
- PDF gerando corretamente

**Notas Técnicas:**
- Usar `@react-pdf/renderer` para geração de PDF
- Timeline com componente vertical do Shadcn

---

#### Story 4.4: Lista de OS do Técnico

| Atributo | Valor |
|----------|-------|
| ID | RF360-015 |
| Prioridade | **MUST HAVE** |
| Story Points | 3 |
| Sprint | 3 |
| Dependências | RF360-012 |
| Riscos | Baixo |

**User Story:**
> Como técnico, quero ver todas minhas OS, para que eu possa gerenciar meu trabalho.

**Acceptance Criteria:**

- [ ] AC1: Tabela com colunas: número, cliente, aparelho, status, data entrada
- [ ] AC2: Filtros: status (multi-select), período (date range), busca texto
- [ ] AC3: Ordenação clicando no header da coluna
- [ ] AC4: Linha em vermelho se atrasada (passou previsão)
- [ ] AC5: Ações rápidas na linha: ver detalhes, atualizar status
- [ ] AC6: Contadores por status no topo (tabs ou badges)
- [ ] AC7: Paginação com 20 itens por página

**Definition of Done:**
- Lista carregando performaticamente
- Filtros funcionando
- Responsivo (cards em mobile)

**Notas Técnicas:**
- Usar TanStack Table para tabela avançada
- View diferente em mobile (cards ao invés de tabela)

---

### Epic 5: Integração WhatsApp

**Prioridade:** 🔴 Crítica
**Total Story Points:** 23
**Sprint Target:** Sprint 4-5

---

#### Story 5.1: Configuração do Webhook WhatsApp

| Atributo | Valor |
|----------|-------|
| ID | RF360-016 |
| Prioridade | **MUST HAVE** |
| Story Points | 5 |
| Sprint | 4 |
| Dependências | RF360-002 |
| Riscos | Configuração Meta pode ser burocrática |

**User Story:**
> Como sistema, quero receber mensagens do WhatsApp, para que eu possa processá-las automaticamente.

**Acceptance Criteria:**

- [ ] AC1: Webhook n8n configurado e recebendo mensagens
- [ ] AC2: Validação de assinatura X-Hub-Signature-256
- [ ] AC3: Controle de idempotência por `message_id`
- [ ] AC4: Normalização de telefone para E.164
- [ ] AC5: Lookup de cliente existente ou criação de novo
- [ ] AC6: Registro de mensagem na tabela `Mensagem`
- [ ] AC7: Logs estruturados (JSON) para debugging
- [ ] AC8: Retry automático em caso de falha (3 tentativas)

**Definition of Done:**
- Mensagens sendo recebidas e processadas
- Sem mensagens duplicadas
- Logs disponíveis para análise

**Notas Técnicas:**
- n8n workflow: Webhook → Validate → Process → Respond
- Usar Supabase para persistência de estado

---

#### Story 5.2: Máquina de Estados da Conversa

| Atributo | Valor |
|----------|-------|
| ID | RF360-017 |
| Prioridade | **MUST HAVE** |
| Story Points | 5 |
| Sprint | 4 |
| Dependências | RF360-016 |
| Riscos | Complexidade de edge cases |

**User Story:**
> Como sistema, quero controlar o estado da conversa, para que o bot responda contextualmente.

**Acceptance Criteria:**

- [ ] AC1: Estados: INICIO, MENU, ORCAMENTO_MARCA, ORCAMENTO_MODELO, ORCAMENTO_PROBLEMA, ORCAMENTO_RESULTADO, ACOMPANHAMENTO, ATENDIMENTO_HUMANO
- [ ] AC2: Transições documentadas em diagrama
- [ ] AC3: Contexto da conversa persistido em JSON na tabela `Conversa`
- [ ] AC4: Timeout de 30min para reset automático ao INICIO
- [ ] AC5: Comando "menu" ou "0" sempre volta ao MENU
- [ ] AC6: Comando "humano" ou "atendente" escala para ATENDIMENTO_HUMANO
- [ ] AC7: Estado recuperável após restart do n8n

**Definition of Done:**
- FSM funcionando para todos estados
- Timeout implementado
- Escalação funcionando

**Notas Técnicas:**
```
Conversa.contexto = {
  estado: "ORCAMENTO_MODELO",
  dados: { marca: "Apple", modelo: null },
  ultimaInteracao: "2026-01-22T10:30:00Z"
}
```

---

#### Story 5.3: Fluxo de Orçamento Automático

| Atributo | Valor |
|----------|-------|
| ID | RF360-018 |
| Prioridade | **SHOULD HAVE** |
| Story Points | 5 |
| Sprint | 5 |
| Dependências | RF360-017 |
| Riscos | Catálogo de preços precisa estar populado |

**User Story:**
> Como cliente, quero receber orçamento via WhatsApp, para que eu saiba o preço antes de ir à loja.

**Acceptance Criteria:**

- [ ] AC1: Menu com botão "💰 Orçamento Rápido"
- [ ] AC2: Bot pergunta marca com botões interativos
- [ ] AC3: Bot pergunta modelo (lista ou texto livre)
- [ ] AC4: Bot pergunta problema (múltipla escolha)
- [ ] AC5: Consulta catálogo e retorna faixa de preço
- [ ] AC6: Mensagem formatada: serviço, preço mín-máx, prazo
- [ ] AC7: Botões CTA: "📅 Agendar", "💬 Falar com Técnico", "🔍 Ver Técnicos"
- [ ] AC8: Orçamento registrado com status COTADO

**Definition of Done:**
- Fluxo completo funcionando
- Preços sendo retornados corretamente
- CTAs funcionando

**Notas Técnicas:**
- Usar interactive list messages do WhatsApp
- Fallback para texto se modelo não encontrado

---

#### Story 5.4: Fluxo de Acompanhamento de OS

| Atributo | Valor |
|----------|-------|
| ID | RF360-019 |
| Prioridade | **MUST HAVE** |
| Story Points | 3 |
| Sprint | 4 |
| Dependências | RF360-017, RF360-012 |
| Riscos | Baixo |

**User Story:**
> Como cliente, quero consultar minha OS via WhatsApp, para que eu saiba o status do meu aparelho.

**Acceptance Criteria:**

- [ ] AC1: Menu com botão "📱 Acompanhar Conserto"
- [ ] AC2: Bot solicita número da OS ou busca automática por telefone
- [ ] AC3: Exibe status atual com descrição amigável (ex: "Em reparo - seu aparelho está sendo consertado")
- [ ] AC4: Exibe previsão de entrega
- [ ] AC5: Exibe valor aprovado (se houver)
- [ ] AC6: Botão "💬 Falar com técnico"
- [ ] AC7: Mensagem amigável se não encontrar OS

**Definition of Done:**
- Consulta funcionando por número e por telefone
- Mensagens amigáveis e claras

---

#### Story 5.5: Notificações Automáticas

| Atributo | Valor |
|----------|-------|
| ID | RF360-020 |
| Prioridade | **MUST HAVE** |
| Story Points | 5 |
| Sprint | 4 |
| Dependências | RF360-016, RF360-013 |
| Riscos | Templates precisam aprovação da Meta |

**User Story:**
> Como cliente, quero ser notificado sobre mudanças na minha OS, para que eu não precise ficar consultando.

**Acceptance Criteria:**

- [ ] AC1: Templates de mensagem para cada status (pré-aprovados Meta)
- [ ] AC2: Disparo automático via n8n quando status muda
- [ ] AC3: Throttling: máximo 1 mensagem a cada 5 minutos por cliente
- [ ] AC4: Mensagem de conclusão com endereço para retirada
- [ ] AC5: Lembrete automático se CONCLUIDO há 3+ dias sem retirada
- [ ] AC6: Log de todas notificações enviadas
- [ ] AC7: Retry em caso de falha (3x com backoff)

**Definition of Done:**
- Templates aprovados pela Meta
- Notificações disparando corretamente
- Logs completos

**Notas Técnicas:**
- Usar Message Templates do WhatsApp Business API
- n8n trigger: Supabase Database Change → Send WhatsApp

---

### Epic 6: Avaliações e Gamificação

**Prioridade:** 🟡 Alta (Pós-MVP)
**Total Story Points:** 16
**Sprint Target:** Sprint 6+

---

#### Story 6.1: Sistema de Avaliações

| Atributo | Valor |
|----------|-------|
| ID | RF360-021 |
| Prioridade | **COULD HAVE** |
| Story Points | 5 |
| Sprint | 6 |
| Dependências | RF360-013, RF360-020 |

**User Story:**
> Como cliente, quero avaliar o técnico após o serviço, para que outros clientes saibam da qualidade.

**Acceptance Criteria:**

- [ ] AC1: Solicitação enviada 24h após status ENTREGUE
- [ ] AC2: Avaliação 1-5 estrelas + comentário opcional
- [ ] AC3: Via WhatsApp (botões) ou link web
- [ ] AC4: Apenas 1 avaliação por OS
- [ ] AC5: Imutável após envio
- [ ] AC6: Aparece no perfil do técnico
- [ ] AC7: Média recalculada em tempo real
- [ ] AC8: Técnico notificado sobre nova avaliação

---

#### Story 6.2: Sistema de Badges

| Atributo | Valor |
|----------|-------|
| ID | RF360-022 |
| Prioridade | **COULD HAVE** |
| Story Points | 5 |
| Sprint | 6 |
| Dependências | RF360-021 |

**User Story:**
> Como técnico, quero conquistar badges, para que meu perfil se destaque.

**Acceptance Criteria:**

- [ ] AC1: Badges definidos: Novato, Confiável, Expert, Mestre, 5 Estrelas, Resposta Rápida, Especialista Apple/Samsung
- [ ] AC2: Verificação automática de critérios (cron job)
- [ ] AC3: Concessão automática
- [ ] AC4: Notificação ao técnico
- [ ] AC5: Exibição no perfil público
- [ ] AC6: Ordenação por relevância

---

#### Story 6.3: Ranking de Técnicos

| Atributo | Valor |
|----------|-------|
| ID | RF360-023 |
| Prioridade | **COULD HAVE** |
| Story Points | 6 |
| Sprint | 6 |
| Dependências | RF360-021 |

**User Story:**
> Como cliente, quero ver o ranking de técnicos, para que eu escolha os melhores.

**Acceptance Criteria:**

- [ ] AC1: Ranking regional (cidade/estado)
- [ ] AC2: Ranking por especialidade
- [ ] AC3: Fórmula documentada
- [ ] AC4: Atualização diária (cron)
- [ ] AC5: Posição no perfil ("Top 10 SP")
- [ ] AC6: Página pública de ranking
- [ ] AC7: Opção de ocultar posição

---

### Epic 7: Chat de Atendimento

**Prioridade:** 🟢 Média (Pós-MVP)
**Total Story Points:** 13
**Sprint Target:** Sprint 7+

---

#### Story 7.1: Lista de Conversas

| Atributo | Valor |
|----------|-------|
| ID | RF360-024 |
| Prioridade | **COULD HAVE** |
| Story Points | 5 |
| Sprint | 7 |
| Dependências | RF360-016 |

---

#### Story 7.2: Interface de Chat

| Atributo | Valor |
|----------|-------|
| ID | RF360-025 |
| Prioridade | **COULD HAVE** |
| Story Points | 5 |
| Sprint | 7 |
| Dependências | RF360-024 |

---

#### Story 7.3: Painel de Informações do Cliente

| Atributo | Valor |
|----------|-------|
| ID | RF360-026 |
| Prioridade | **COULD HAVE** |
| Story Points | 3 |
| Sprint | 7 |
| Dependências | RF360-025 |

---

### Epic 8: Administração e Monetização

**Prioridade:** 🟢 Média (Pós-MVP)
**Total Story Points:** 26
**Sprint Target:** Sprint 8+

---

#### Story 8.1: Dashboard Administrativo

| Atributo | Valor |
|----------|-------|
| ID | RF360-027 |
| Prioridade | **COULD HAVE** |
| Story Points | 5 |
| Sprint | 8 |
| Dependências | RF360-004 |

---

#### Story 8.2: Gestão de Técnicos (Admin)

| Atributo | Valor |
|----------|-------|
| ID | RF360-028 |
| Prioridade | **SHOULD HAVE** |
| Story Points | 5 |
| Sprint | 6 |
| Dependências | RF360-005 |

**Nota:** Priorizado para SHOULD pois admin precisa aprovar técnicos.

---

#### Story 8.3: Catálogo de Serviços (Admin)

| Atributo | Valor |
|----------|-------|
| ID | RF360-029 |
| Prioridade | **SHOULD HAVE** |
| Story Points | 5 |
| Sprint | 3 |
| Dependências | RF360-002 |

**Nota:** Priorizado para SHOULD pois orçamento automático depende do catálogo.

---

#### Story 8.4: Sistema de Planos e Assinaturas

| Atributo | Valor |
|----------|-------|
| ID | RF360-030 |
| Prioridade | **COULD HAVE** |
| Story Points | 8 |
| Sprint | 8 |
| Dependências | RF360-005 |

---

#### Story 8.5: Relatórios Financeiros

| Atributo | Valor |
|----------|-------|
| ID | RF360-031 |
| Prioridade | **COULD HAVE** |
| Story Points | 3 |
| Sprint | 8 |
| Dependências | RF360-027 |

---

## 4. Matriz de Dependências

```
RF360-001 (Setup)
    └── RF360-002 (Schema)
            └── RF360-003 (Auth)
                    └── RF360-004 (Layout)
                            ├── RF360-005 (Cadastro Técnico)
                            │       ├── RF360-006 (Perfil Público)
                            │       ├── RF360-007 (Dashboard Técnico)
                            │       ├── RF360-008 (Gestão Serviços)
                            │       └── RF360-012 (Criação OS)
                            │               ├── RF360-013 (Status OS)
                            │               │       ├── RF360-014 (Detalhe OS)
                            │               │       └── RF360-020 (Notificações)
                            │               └── RF360-015 (Lista OS)
                            │
                            └── RF360-011 (Cadastro Cliente)
                                    └── RF360-009 (Busca Técnicos)
                                            └── RF360-010 (Matching)

RF360-002 (Schema)
    └── RF360-016 (Webhook WhatsApp)
            └── RF360-017 (FSM Conversa)
                    ├── RF360-018 (Orçamento Auto)
                    └── RF360-019 (Acompanhamento OS)
```

---

## 5. Definition of Ready (DoR)

Uma Story está pronta para desenvolvimento quando:

- [ ] User Story escrita no formato "Como... Quero... Para que..."
- [ ] Acceptance Criteria definidos e verificáveis
- [ ] Story Points estimados pelo time
- [ ] Dependências identificadas e resolvidas
- [ ] Wireframes/mockups disponíveis (quando aplicável)
- [ ] Dados de teste definidos
- [ ] Critérios de performance definidos (quando aplicável)

---

## 6. Definition of Done (DoD)

Uma Story está concluída quando:

- [ ] Código implementado e funcionando
- [ ] Todos os Acceptance Criteria atendidos
- [ ] Code review aprovado (mínimo 1 reviewer)
- [ ] Testes unitários escritos (cobertura > 70% para código crítico)
- [ ] Testes de integração passando
- [ ] Sem erros de lint ou TypeScript
- [ ] Build de produção funcionando
- [ ] Deploy em staging sem erros
- [ ] Documentação atualizada (quando aplicável)
- [ ] Demo para PO aprovada

---

## 7. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Aprovação de templates WhatsApp demorada | Alta | Alto | Iniciar processo de aprovação na Sprint 1 |
| Complexidade da integração Supabase Auth | Média | Médio | Spike técnico na Sprint 1 |
| Performance de busca com crescimento | Baixa | Médio | Índices desde o início, monitoramento |
| Algoritmo de matching não relevante | Média | Médio | A/B testing, feedback loop |
| Escopo de MVP muito grande | Média | Alto | Priorização MoSCoW rigorosa |

---

## 8. Métricas de Sucesso do MVP

| Métrica | Target | Como Medir |
|---------|--------|------------|
| Técnicos cadastrados | 50 | Count na tabela |
| OS criadas/mês | 200 | Agregação mensal |
| Taxa de conversão WhatsApp | 30% | Orçamentos → OS |
| NPS técnicos | > 40 | Survey mensal |
| Tempo médio de atendimento | < 72h | Média RECEBIDO → ENTREGUE |
| Uptime | 99.5% | Monitoramento |

---

## Changelog

| Data | Versão | Descrição | Autor |
|------|--------|-----------|-------|
| 22/01/2026 | 1.0 | Criação do backlog refinado | Sarah (PO) |

---

*Documento gerado com BMAD Method - Backlog Template v1*
