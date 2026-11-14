# RF360 - Frontend Specification

**Versão:** 1.0
**Data:** 22/01/2026
**Autor:** UX Expert
**Status:** Draft para Revisão

---

## 1. Overview

Este documento define a especificação de interface do usuário para o RF360 - Marketplace de Técnicos de Eletrônica. Inclui wireframes, componentes, fluxos de navegação e guidelines de design.

### 1.1 Design System

**Framework:** Shadcn/ui + TailwindCSS
**Tipografia:** Inter (Google Fonts)
**Ícones:** Lucide React

### 1.2 Color Palette

```css
/* Primary */
--primary: #2563EB;        /* Blue 600 */
--primary-hover: #1D4ED8;  /* Blue 700 */
--primary-light: #DBEAFE;  /* Blue 100 */

/* Secondary */
--secondary: #64748B;      /* Slate 500 */
--secondary-hover: #475569;/* Slate 600 */

/* Status */
--success: #10B981;        /* Emerald 500 */
--warning: #F59E0B;        /* Amber 500 */
--error: #EF4444;          /* Red 500 */
--info: #3B82F6;           /* Blue 500 */

/* Neutral */
--background: #FFFFFF;
--foreground: #0F172A;     /* Slate 900 */
--muted: #F1F5F9;          /* Slate 100 */
--muted-foreground: #64748B;/* Slate 500 */
--border: #E2E8F0;         /* Slate 200 */

/* OS Status Colors */
--status-recebido: #3B82F6;      /* Blue */
--status-diagnostico: #8B5CF6;   /* Violet */
--status-orcamento: #F59E0B;     /* Amber */
--status-aprovado: #10B981;      /* Green */
--status-reparo: #6366F1;        /* Indigo */
--status-concluido: #22C55E;     /* Green 500 */
--status-entregue: #14B8A6;      /* Teal */
--status-recusado: #EF4444;      /* Red */
```

### 1.3 Typography Scale

```css
/* Headings */
--h1: 2.25rem (36px) / 700
--h2: 1.875rem (30px) / 600
--h3: 1.5rem (24px) / 600
--h4: 1.25rem (20px) / 600

/* Body */
--body-lg: 1.125rem (18px) / 400
--body: 1rem (16px) / 400
--body-sm: 0.875rem (14px) / 400
--body-xs: 0.75rem (12px) / 400
```

### 1.4 Spacing Scale

```css
--space-1: 0.25rem (4px)
--space-2: 0.5rem (8px)
--space-3: 0.75rem (12px)
--space-4: 1rem (16px)
--space-5: 1.25rem (20px)
--space-6: 1.5rem (24px)
--space-8: 2rem (32px)
--space-10: 2.5rem (40px)
--space-12: 3rem (48px)
```

---

## 2. Layout Structure

### 2.1 Dashboard Layout

```
┌────────────────────────────────────────────────────────────────┐
│ HEADER                                              64px       │
│ ┌────────┐                          ┌────┐ ┌────┐ ┌──────────┐│
│ │ Logo   │  [Search...]             │Bell│ │Help│ │ Avatar ▼ ││
│ └────────┘                          └────┘ └────┘ └──────────┘│
├────────────┬───────────────────────────────────────────────────┤
│  SIDEBAR   │                                                   │
│   240px    │              MAIN CONTENT                         │
│            │                                                   │
│ Dashboard  │    ┌─────────────────────────────────────────┐   │
│ Ordens     │    │                                         │   │
│ Perfil     │    │         Page Content Area               │   │
│ Serviços   │    │                                         │   │
│ Relatórios │    │         max-width: 1280px               │   │
│ Config     │    │         padding: 24px                   │   │
│            │    │                                         │   │
│            │    └─────────────────────────────────────────┘   │
│            │                                                   │
└────────────┴───────────────────────────────────────────────────┘
```

### 2.2 Mobile Layout

```
┌──────────────────────┐
│ HEADER          64px │
│ ┌────┐    ┌────────┐ │
│ │ ☰  │    │ Avatar │ │
│ └────┘    └────────┘ │
├──────────────────────┤
│                      │
│   MAIN CONTENT       │
│                      │
│   padding: 16px      │
│                      │
│                      │
├──────────────────────┤
│ BOTTOM NAV      64px │
│ ┌──┐ ┌──┐ ┌──┐ ┌──┐  │
│ │🏠│ │📋│ │👤│ │⚙️│  │
│ └──┘ └──┘ └──┘ └──┘  │
└──────────────────────┘
```

---

## 3. Core Components

### 3.1 Buttons

```
┌─────────────────────────────────────────────────────┐
│ PRIMARY BUTTON                                      │
│ ┌─────────────────┐                                │
│ │   Salvar OS     │  bg: primary, text: white      │
│ └─────────────────┘  height: 40px, radius: 6px     │
│                                                     │
│ SECONDARY BUTTON                                    │
│ ┌─────────────────┐                                │
│ │   Cancelar      │  bg: transparent, border       │
│ └─────────────────┘                                │
│                                                     │
│ DESTRUCTIVE BUTTON                                  │
│ ┌─────────────────┐                                │
│ │   Excluir       │  bg: error, text: white        │
│ └─────────────────┘                                │
│                                                     │
│ GHOST BUTTON                                        │
│ ┌─────────────────┐                                │
│ │   Ver mais      │  bg: transparent, no border    │
│ └─────────────────┘                                │
└─────────────────────────────────────────────────────┘
```

### 3.2 Cards

```
┌─────────────────────────────────────────────────────┐
│ STAT CARD                                           │
│ ┌─────────────────────────────────────┐            │
│ │ 📱 12                               │            │
│ │ OS Abertas                          │            │
│ │ ▲ +3 vs ontem                      │            │
│ └─────────────────────────────────────┘            │
│                                                     │
│ ORDEM CARD                                          │
│ ┌─────────────────────────────────────┐            │
│ │ RF-20260122-0001        [RECEBIDO] │            │
│ │─────────────────────────────────────│            │
│ │ Apple iPhone 13                     │            │
│ │ Tela quebrada                       │            │
│ │─────────────────────────────────────│            │
│ │ 22/01/2026              R$ 380,00  │            │
│ └─────────────────────────────────────┘            │
│                                                     │
│ TECNICO CARD                                        │
│ ┌─────────────────────────────────────┐            │
│ │ ┌────┐ Carlos Silva      ⭐ 4.9    │            │
│ │ │    │ Especialista               │            │
│ │ │ 📷 │ 342 atendimentos           │            │
│ │ │    │ 📍 São Paulo - SP          │            │
│ │ └────┘ [PRO] [⚡ Rápido]          │            │
│ │                                     │            │
│ │ [Troca Tela] [Bateria] [Placa]     │            │
│ │                                     │            │
│ │ [ Solicitar Orçamento ]             │            │
│ └─────────────────────────────────────┘            │
└─────────────────────────────────────────────────────┘
```

### 3.3 Status Badges

```
┌─────────────────────────────────────────────────────┐
│ STATUS BADGES                                       │
│                                                     │
│ ┌──────────┐  RECEBIDO     - Blue                  │
│ └──────────┘                                        │
│ ┌──────────┐  DIAGNÓSTICO  - Violet                │
│ └──────────┘                                        │
│ ┌──────────┐  ORÇAMENTO    - Amber                 │
│ └──────────┘                                        │
│ ┌──────────┐  APROVADO     - Green                 │
│ └──────────┘                                        │
│ ┌──────────┐  EM REPARO    - Indigo                │
│ └──────────┘                                        │
│ ┌──────────┐  CONCLUÍDO    - Emerald               │
│ └──────────┘                                        │
│ ┌──────────┐  ENTREGUE     - Teal                  │
│ └──────────┘                                        │
│ ┌──────────┐  RECUSADO     - Red                   │
│ └──────────┘                                        │
│                                                     │
│ PLANO BADGES                                        │
│ ┌──────────┐  GRATUITO     - Gray                  │
│ └──────────┘                                        │
│ ┌──────────┐  PRO          - Blue                  │
│ └──────────┘                                        │
│ ┌──────────┐  PREMIUM      - Gold/Amber            │
│ └──────────┘                                        │
└─────────────────────────────────────────────────────┘
```

### 3.4 Forms

```
┌─────────────────────────────────────────────────────┐
│ INPUT FIELD                                         │
│ ┌─────────────────────────────────────┐            │
│ │ Label                               │            │
│ │ ┌─────────────────────────────────┐ │            │
│ │ │ Placeholder text                │ │            │
│ │ └─────────────────────────────────┘ │            │
│ │ Helper text or error message        │            │
│ └─────────────────────────────────────┘            │
│                                                     │
│ SELECT FIELD                                        │
│ ┌─────────────────────────────────────┐            │
│ │ Marca                               │            │
│ │ ┌─────────────────────────────── ▼┐ │            │
│ │ │ Selecione uma marca             │ │            │
│ │ └─────────────────────────────────┘ │            │
│ └─────────────────────────────────────┘            │
│                                                     │
│ TEXTAREA                                            │
│ ┌─────────────────────────────────────┐            │
│ │ Defeito Relatado                    │            │
│ │ ┌─────────────────────────────────┐ │            │
│ │ │                                 │ │            │
│ │ │                                 │ │            │
│ │ │                                 │ │            │
│ │ └─────────────────────────────────┘ │            │
│ └─────────────────────────────────────┘            │
└─────────────────────────────────────────────────────┘
```

---

## 4. Page Specifications

### 4.1 Login Page

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                    ┌─────────┐                      │
│                    │  LOGO   │                      │
│                    │  RF360  │                      │
│                    └─────────┘                      │
│                                                     │
│              Acesse sua conta                       │
│                                                     │
│    ┌─────────────────────────────────────┐         │
│    │ Email                               │         │
│    │ ┌─────────────────────────────────┐ │         │
│    │ │ seu@email.com                   │ │         │
│    │ └─────────────────────────────────┘ │         │
│    │                                     │         │
│    │ Senha                               │         │
│    │ ┌─────────────────────────────────┐ │         │
│    │ │ ••••••••                        │ │         │
│    │ └─────────────────────────────────┘ │         │
│    │                                     │         │
│    │ ┌─────────────────────────────────┐ │         │
│    │ │          ENTRAR                 │ │         │
│    │ └─────────────────────────────────┘ │         │
│    │                                     │         │
│    │         Esqueceu a senha?           │         │
│    │                                     │         │
│    │ ─────────── ou ───────────          │         │
│    │                                     │         │
│    │ ┌─────────────────────────────────┐ │         │
│    │ │  🔵 Continuar com Google        │ │         │
│    │ └─────────────────────────────────┘ │         │
│    │                                     │         │
│    │    Não tem conta? Cadastre-se       │         │
│    └─────────────────────────────────────┘         │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 4.2 Dashboard (Técnico)

```
┌────────────────────────────────────────────────────────────────┐
│ HEADER                                                         │
├────────────┬───────────────────────────────────────────────────┤
│  SIDEBAR   │                                                   │
│            │  Olá, Carlos! 👋                                  │
│ ● Dashboard│                                                   │
│   Ordens   │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│   Perfil   │  │ 📱 12   │ │ 🔧 8    │ │ ✅ 47   │ │ ⭐ 4.9  │ │
│   Serviços │  │ Abertas │ │Em Reparo│ │Concluídas│ │ Aval.   │ │
│   Relatórios │ │ Hoje    │ │ Agora   │ │ Este Mês │ │ Média   │ │
│   Config   │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ │
│            │                                                   │
│            │  ┌─────────────────────────────────────────────┐ │
│            │  │ ÚLTIMAS ORDENS                    [Ver todas]│ │
│            │  │─────────────────────────────────────────────│ │
│            │  │ RF-0001  iPhone 13    Tela    [RECEBIDO]    │ │
│            │  │ RF-0002  Samsung S23  Bat.    [EM REPARO]   │ │
│            │  │ RF-0003  Xiaomi 12    Placa   [CONCLUÍDO]   │ │
│            │  └─────────────────────────────────────────────┘ │
│            │                                                   │
│            │  ┌────────────────────┐ ┌────────────────────┐   │
│            │  │ FATURAMENTO        │ │ AGENDAMENTOS HOJE  │   │
│            │  │    ▄               │ │ 09:00 Maria - Orç. │   │
│            │  │  ▄ █ ▄             │ │ 14:00 João - Ret.  │   │
│            │  │▄ █ █ █ ▄           │ │ 16:00 Ana - Ent.   │   │
│            │  │R$ 12.450           │ │                    │   │
│            │  └────────────────────┘ └────────────────────┘   │
└────────────┴───────────────────────────────────────────────────┘
```

### 4.3 Lista de Ordens

```
┌────────────────────────────────────────────────────────────────┐
│ HEADER                                                         │
├────────────┬───────────────────────────────────────────────────┤
│  SIDEBAR   │                                                   │
│            │  Ordens de Serviço                                │
│   Dashboard│                                                   │
│ ● Ordens   │  ┌─────────────────────────────────────────────┐ │
│   Perfil   │  │ [🔍 Buscar...]   [Status ▼] [Período ▼]     │ │
│   Serviços │  │                                    [+ Nova] │ │
│            │  └─────────────────────────────────────────────┘ │
│            │                                                   │
│            │  ┌─────────────────────────────────────────────┐ │
│            │  │ 📊 Abertas: 12 │ Em Reparo: 8 │ Concluídas: 5│ │
│            │  └─────────────────────────────────────────────┘ │
│            │                                                   │
│            │  ┌─────────────────────────────────────────────┐ │
│            │  │ # Número    │ Cliente  │ Aparelho │ Status  │ │
│            │  │─────────────────────────────────────────────│ │
│            │  │ RF-0001     │ Maria S. │ iPhone 13│RECEBIDO │ │
│            │  │ RF-0002     │ João P.  │ Samsung  │EM REPARO│ │
│            │  │ RF-0003     │ Ana C.   │ Xiaomi   │CONCLUÍDO│ │
│            │  │ RF-0004     │ Pedro L. │ iPhone 14│ENTREGUE │ │
│            │  │ RF-0005     │ Carla M. │ Moto G   │DIAGNÓST.│ │
│            │  │─────────────────────────────────────────────│ │
│            │  │          ◀ 1 2 3 ... 10 ▶                   │ │
│            │  └─────────────────────────────────────────────┘ │
└────────────┴───────────────────────────────────────────────────┘
```

### 4.4 Detalhe da OS

```
┌────────────────────────────────────────────────────────────────┐
│ HEADER                                                         │
├────────────┬───────────────────────────────────────────────────┤
│  SIDEBAR   │                                                   │
│            │  ← Voltar                                         │
│            │                                                   │
│            │  ┌─────────────────────────────────────────────┐ │
│            │  │ RF-20260122-0001              [EM REPARO]   │ │
│            │  │─────────────────────────────────────────────│ │
│            │  │                                             │ │
│            │  │ CLIENTE                     APARELHO        │ │
│            │  │ Maria Silva                 Apple iPhone 13 │ │
│            │  │ (11) 99999-9999             IMEI: xxx       │ │
│            │  │ [💬 WhatsApp]               Cor: Preto      │ │
│            │  │                                             │ │
│            │  │─────────────────────────────────────────────│ │
│            │  │                                             │ │
│            │  │ DEFEITO RELATADO                            │ │
│            │  │ Tela quebrada, touch não funciona           │ │
│            │  │                                             │ │
│            │  │ DEFEITO ENCONTRADO                          │ │
│            │  │ Display LCD danificado, necessita troca     │ │
│            │  │                                             │ │
│            │  │─────────────────────────────────────────────│ │
│            │  │                                             │ │
│            │  │ VALORES                                     │ │
│            │  │ Orçado: R$ 350,00    Final: R$ 380,00      │ │
│            │  │                                             │ │
│            │  │ DATAS                                       │ │
│            │  │ Entrada: 22/01   Previsão: 23/01           │ │
│            │  │                                             │ │
│            │  └─────────────────────────────────────────────┘ │
│            │                                                   │
│            │  ┌─────────────────────────────────────────────┐ │
│            │  │ TIMELINE                                    │ │
│            │  │ ● 22/01 10:00 - Recebido                   │ │
│            │  │ ● 22/01 11:30 - Diagnóstico iniciado       │ │
│            │  │ ● 22/01 14:00 - Orçamento enviado          │ │
│            │  │ ● 22/01 15:00 - Cliente aprovou            │ │
│            │  │ ● 22/01 15:30 - Em reparo                  │ │
│            │  └─────────────────────────────────────────────┘ │
│            │                                                   │
│            │  ┌─────────────────────────────────────────────┐ │
│            │  │ [Marcar Concluído] [Editar] [Imprimir]     │ │
│            │  └─────────────────────────────────────────────┘ │
└────────────┴───────────────────────────────────────────────────┘
```

### 4.5 Nova OS (Modal/Page)

```
┌─────────────────────────────────────────────────────┐
│ Nova Ordem de Serviço                         [X]   │
├─────────────────────────────────────────────────────┤
│                                                     │
│ DADOS DO CLIENTE                                    │
│ ┌─────────────────────────────────────────────────┐│
│ │ Nome *                                          ││
│ │ ┌─────────────────────────────────────────────┐││
│ │ │                                             │││
│ │ └─────────────────────────────────────────────┘││
│ │ Telefone (WhatsApp) *                          ││
│ │ ┌─────────────────────────────────────────────┐││
│ │ │ (11) 99999-9999                             │││
│ │ └─────────────────────────────────────────────┘││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ DADOS DO APARELHO                                   │
│ ┌─────────────────────────────────────────────────┐│
│ │ Marca *              Modelo *                   ││
│ │ ┌──────────── ▼┐    ┌─────────────────────────┐││
│ │ │ Apple        │    │ iPhone 13               │││
│ │ └──────────────┘    └─────────────────────────┘││
│ │                                                 ││
│ │ IMEI (opcional)      Cor (opcional)            ││
│ │ ┌──────────────┐    ┌─────────────────────────┐││
│ │ │              │    │ Preto                   │││
│ │ └──────────────┘    └─────────────────────────┘││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ DEFEITO                                             │
│ ┌─────────────────────────────────────────────────┐│
│ │ Defeito Relatado *                              ││
│ │ ┌─────────────────────────────────────────────┐││
│ │ │ Descreva o problema relatado pelo cliente   │││
│ │ │                                             │││
│ │ └─────────────────────────────────────────────┘││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│ FOTOS (opcional)                                    │
│ ┌─────────────────────────────────────────────────┐│
│ │  ┌─────┐  ┌─────┐  ┌─────┐                     ││
│ │  │  +  │  │ 📷  │  │ 📷  │                     ││
│ │  │     │  │     │  │     │                     ││
│ │  └─────┘  └─────┘  └─────┘                     ││
│ └─────────────────────────────────────────────────┘│
│                                                     │
│            [ Cancelar ]  [ Criar OS ]               │
└─────────────────────────────────────────────────────┘
```

### 4.6 Perfil do Técnico (Público)

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER (público)                              [Login] [Cadastro]│
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                                                             ││
│  │  ┌────────┐   CARLOS SILVA                    🏆 TOP 10    ││
│  │  │        │   Técnico Especialista                         ││
│  │  │  📷    │   ─────────────────────────────────────────    ││
│  │  │        │   ⭐ 4.9 (127 avaliações)   📍 São Paulo - SP  ││
│  │  │        │   ✅ 342 atendimentos       📅 Desde Mar/2024  ││
│  │  └────────┘                                                 ││
│  │                                                             ││
│  │  🏅 BADGES                                                  ││
│  │  [⚡ Resposta Rápida] [🎯 100+ OS] [⭐ Nota 4.8+]          ││
│  │  [🍎 Expert Apple] [📱 Samsung Certificado]                ││
│  │                                                             ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 🔧 ESPECIALIDADES                                          │ │
│  │                                                            │ │
│  │ Troca de Tela     ████████████████████  89 serviços       │ │
│  │ Bateria           ██████████████░░░░░░  52 serviços       │ │
│  │ Placa-mãe         ██████████░░░░░░░░░░  34 serviços       │ │
│  │ Conector          ██████░░░░░░░░░░░░░░  21 serviços       │ │
│  │                                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 📍 ÁREA DE ATUAÇÃO                                         │ │
│  │                                                            │ │
│  │ • Atende em domicílio: Sim (até 15km)                      │ │
│  │ • Loja física: Rua Augusta, 1234 - Consolação              │ │
│  │ • Horário: Seg-Sex 9h-18h | Sáb 9h-13h                     │ │
│  │                                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ 💬 AVALIAÇÕES RECENTES                                     │ │
│  │                                                            │ │
│  │ ⭐⭐⭐⭐⭐ "Excelente! Trocou a tela do meu iPhone em 1h"   │ │
│  │ Maria S. - há 2 dias                                       │ │
│  │                                                            │ │
│  │ ⭐⭐⭐⭐⭐ "Muito profissional, recomendo!"                 │ │
│  │ João P. - há 5 dias                                        │ │
│  │                                                            │ │
│  │ ⭐⭐⭐⭐☆ "Bom serviço, só demorou um pouco mais"          │ │
│  │ Ana C. - há 1 semana                                       │ │
│  │                                                            │ │
│  │ [Ver todas as avaliações]                                  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│              [ 📞 SOLICITAR ORÇAMENTO ]                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.7 Chat de Atendimento

```
┌────────────────────────────────────────────────────────────────┐
│ HEADER                                                         │
├────────────┬───────────────────────────────────────────────────┤
│ CONVERSAS  │ CHAT                                              │
│ 240px      │                                                   │
│────────────│ Maria Silva                         [📞] [⋮]     │
│ 🔍 Buscar  │─────────────────────────────────────────────────  │
│            │                                                   │
│ AGUARDANDO │   👤 Oi, meu iPhone tá com a tela...            │
│ ┌─────────┐│                                        14:32     │
│ │🔴 Maria │││                                                   │
│ │  há 2min│││   🤖 Olá Maria! Entendi que você está         │
│ └─────────┘││      com problema na tela. Posso ajudar!       │
│ ┌─────────┐││                                        14:32     │
│ │🟡 João  │││                                                   │
│ │  bot    │││   👤 Quero falar com alguém                     │
│ └─────────┘││                                        14:35     │
│            ││                                                   │
│ MINHAS     ││   ─── Você assumiu a conversa ───              │
│ ┌─────────┐││                                                   │
│ │🟢 Ana   │││   👨‍💼 Olá Maria! Sou o Carlos,                 │
│ │resolvido│││       como posso ajudar?                       │
│ └─────────┘││                                        14:36     │
│            ││                                                   │
│            ││                                                   │
│────────────││─────────────────────────────────────────────────│
│ Fila: 3    ││ [Mensagem...]                        [Enviar]   │
│ Atend: 15  ││                                                   │
│            ││ AÇÕES RÁPIDAS                                    │
│            ││ [Criar OS] [Orçamento] [Agendar] [Devolver Bot] │
├────────────┼───────────────────────────────────────────────────┤
│            │ CLIENTE INFO                                      │
│            │ Maria Silva | (11) 99999-9999                     │
│            │ Cliente desde: 15/03/2024                         │
│            │ Última OS: #12340 - Concluída                     │
└────────────┴───────────────────────────────────────────────────┘
```

### 4.8 Dashboard Admin

```
┌────────────────────────────────────────────────────────────────┐
│ HEADER                                                         │
├────────────┬───────────────────────────────────────────────────┤
│  SIDEBAR   │                                                   │
│  (ADMIN)   │  Dashboard Administrativo                         │
│            │                                                   │
│ ● Dashboard│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│   Técnicos │  │ 👥 156  │ │ 👤 1.2k │ │ 📋 847  │ │💰 R$45k │ │
│   Catálogo │  │Técnicos │ │Clientes │ │OS Mês   │ │GMV Mês  │ │
│   Relatórios│ │ Ativos  │ │ Ativos  │ │         │ │         │ │
│            │  └─────────┘ └─────────┘ └─────────┘ └─────────┘ │
│            │                                                   │
│            │  ┌─────────────────────────────────────────────┐ │
│            │  │ TÉCNICOS PENDENTES DE APROVAÇÃO             │ │
│            │  │─────────────────────────────────────────────│ │
│            │  │ Carlos M.  │ São Paulo │ 22/01 │ [Ver] [✓][X]│ │
│            │  │ Ana S.     │ Rio       │ 21/01 │ [Ver] [✓][X]│ │
│            │  │ Pedro L.   │ Curitiba  │ 20/01 │ [Ver] [✓][X]│ │
│            │  └─────────────────────────────────────────────┘ │
│            │                                                   │
│            │  ┌────────────────────┐ ┌────────────────────┐   │
│            │  │ CRESCIMENTO        │ │ TOP TÉCNICOS       │   │
│            │  │    ▄               │ │ 1. Carlos S. ⭐4.9 │   │
│            │  │  ▄ █ ▄             │ │ 2. Maria L.  ⭐4.8 │   │
│            │  │▄ █ █ █ ▄           │ │ 3. João P.   ⭐4.8 │   │
│            │  │ Usuários/Mês       │ │                    │   │
│            │  └────────────────────┘ └────────────────────┘   │
└────────────┴───────────────────────────────────────────────────┘
```

---

## 5. Mobile Screens

### 5.1 Dashboard Mobile

```
┌──────────────────────┐
│ ☰   RF360      👤    │
├──────────────────────┤
│                      │
│ Olá, Carlos! 👋      │
│                      │
│ ┌────────┐ ┌────────┐│
│ │ 📱 12  │ │ 🔧 8   ││
│ │Abertas │ │Reparo  ││
│ └────────┘ └────────┘│
│ ┌────────┐ ┌────────┐│
│ │ ✅ 47  │ │ ⭐ 4.9 ││
│ │Mês     │ │Aval.   ││
│ └────────┘ └────────┘│
│                      │
│ Últimas Ordens       │
│ ┌──────────────────┐ │
│ │RF-0001  [RECEB.] │ │
│ │iPhone 13 - Tela  │ │
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │RF-0002  [REPARO] │ │
│ │Samsung - Bateria │ │
│ └──────────────────┘ │
│                      │
├──────────────────────┤
│ 🏠  📋  👤  ⚙️       │
└──────────────────────┘
```

### 5.2 Lista OS Mobile

```
┌──────────────────────┐
│ ← Ordens de Serviço  │
├──────────────────────┤
│ ┌──────────────────┐ │
│ │🔍 Buscar...      │ │
│ └──────────────────┘ │
│ [Todas▼] [Período▼]  │
│                      │
│ ┌──────────────────┐ │
│ │ RF-0001 [RECEB.] │ │
│ │ Maria S.         │ │
│ │ iPhone 13 - Tela │ │
│ │ 22/01    R$ 380  │ │
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │ RF-0002 [REPARO] │ │
│ │ João P.          │ │
│ │ Samsung - Bat.   │ │
│ │ 21/01    R$ 150  │ │
│ └──────────────────┘ │
│ ┌──────────────────┐ │
│ │ RF-0003 [CONCL.] │ │
│ │ Ana C.           │ │
│ │ Xiaomi - Placa   │ │
│ │ 20/01    R$ 450  │ │
│ └──────────────────┘ │
│                      │
│       [+ Nova OS]    │
│                      │
├──────────────────────┤
│ 🏠  📋  👤  ⚙️       │
└──────────────────────┘
```

---

## 6. WhatsApp Message Templates

### 6.1 Boas-vindas

```
┌─────────────────────────────────────────┐
│ 📱 RF360                                │
│                                         │
│ Olá! Bem-vindo à RF360!                │
│                                         │
│ Somos uma plataforma que conecta        │
│ você aos melhores técnicos de           │
│ celular da sua região.                  │
│                                         │
│ O que você precisa hoje?                │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │        Orçamento Rápido             │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │        Acompanhar Conserto          │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │        Falar com Atendente          │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### 6.2 Orçamento

```
┌─────────────────────────────────────────┐
│ 💰 Seu orçamento está pronto!           │
│                                         │
│ 📱 iPhone 13                            │
│ 🔧 Troca de Tela                        │
│                                         │
│ 💵 Valor: R$ 350 - R$ 450              │
│ ⏱️ Prazo: 2-4 horas                    │
│                                         │
│ Este orçamento é uma estimativa.        │
│ O valor final será confirmado após      │
│ diagnóstico presencial.                 │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │         Agendar Agora               │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │        Ver Técnicos                 │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │        Falar com Técnico            │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### 6.3 OS Criada

```
┌─────────────────────────────────────────┐
│ ✅ Ordem de Serviço Criada!             │
│                                         │
│ 📋 OS: RF-20260122-0001                │
│ 📱 iPhone 13                            │
│ 🔧 Tela quebrada                        │
│                                         │
│ 👨‍🔧 Técnico: Carlos Silva              │
│ 📍 Rua Augusta, 1234 - SP              │
│                                         │
│ Você receberá atualizações              │
│ automáticas sobre o status.             │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │       Acompanhar Status             │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### 6.4 Status Atualizado

```
┌─────────────────────────────────────────┐
│ 🔔 Atualização da sua OS                │
│                                         │
│ 📋 OS: RF-20260122-0001                │
│ 📱 iPhone 13                            │
│                                         │
│ ────────────────────────────            │
│                                         │
│ Status: ✅ CONCLUÍDO                    │
│                                         │
│ Seu aparelho está pronto para           │
│ retirada!                               │
│                                         │
│ 💵 Valor Final: R$ 380,00              │
│                                         │
│ 📍 Retirada:                            │
│ Rua Augusta, 1234 - Consolação          │
│ Seg-Sex 9h-18h | Sáb 9h-13h            │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │      Ver Detalhes da OS             │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### 6.5 Avaliação

```
┌─────────────────────────────────────────┐
│ ⭐ Como foi sua experiência?            │
│                                         │
│ 📋 OS: RF-20260122-0001                │
│ 👨‍🔧 Técnico: Carlos Silva              │
│                                         │
│ Por favor, avalie o serviço:            │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │           ⭐⭐⭐⭐⭐                 │ │
│ │           Excelente                 │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │           ⭐⭐⭐⭐                   │ │
│ │              Bom                    │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │           ⭐⭐⭐                     │ │
│ │            Regular                  │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │           ⭐⭐                       │ │
│ │             Ruim                    │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

---

## 7. Interactions & Animations

### 7.1 Loading States

- **Skeleton:** Usado para cards e listas enquanto carrega
- **Spinner:** Usado para botões e ações
- **Progress:** Usado para uploads

### 7.2 Transitions

```css
/* Default transition */
transition: all 150ms ease;

/* Page transitions */
transition: opacity 200ms ease, transform 200ms ease;

/* Modal */
animation: fadeIn 200ms ease, slideUp 200ms ease;
```

### 7.3 Feedback

- **Toast notifications:** Sucesso, erro, info (canto superior direito)
- **Inline validation:** Erro abaixo do campo em vermelho
- **Optimistic updates:** UI atualiza imediatamente, reverte se erro

---

## 8. Accessibility

### 8.1 Requirements (WCAG AA)

- Contraste mínimo 4.5:1 para texto
- Todos elementos focáveis via teclado
- Labels em todos os campos de formulário
- Alt text em todas as imagens
- ARIA labels onde necessário
- Skip links para navegação

### 8.2 Focus Management

```css
/* Focus ring */
:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

---

## 9. Responsive Breakpoints

```css
/* Mobile first */
--sm: 640px;   /* Tablet portrait */
--md: 768px;   /* Tablet landscape */
--lg: 1024px;  /* Desktop */
--xl: 1280px;  /* Large desktop */
--2xl: 1536px; /* Extra large */
```

---

*Documento gerado com BMAD Method - Frontend Spec*
