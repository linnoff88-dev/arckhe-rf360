
# Roadmap do Projeto  
## Plataforma de Automação para Assistência Técnica

Este documento define as **fases oficiais do projeto**, seus objetivos, entregáveis e critérios de avanço.  
Ele serve como **guia de execução**, **documento de alinhamento** e **base de decisão técnica**.

---

## Visão Geral

```
FASE 1 → Definição & Desenho
FASE 2 → Arquitetura da Estrutura
FASE 3 → UX & Experiência do Usuário
FASE 4 → Execução Técnica
FASE 5 → Implementação & Evolução
```

Cada fase resolve um problema específico e **não deve ser pulada**.

---

## 🟦 FASE 1 — Definição & Desenho (Produto)

### Objetivo
Definir **o que o sistema faz**, **quem participa**, **quais decisões existem** e **como os fluxos acontecem**, sem se preocupar com tecnologia.

### Perguntas-chave
- Quem são os atores do sistema?
- Quais fluxos existem?
- Onde existem decisões (Sim / Não)?
- Onde ocorre handoff humano?
- Onde o processo pode falhar?

### Entregáveis
- Diagramas BPMN / Swimlane dos fluxos principais
- Lista de fluxos secundários
- Regras de negócio documentadas
- Estados do sistema (conversa, orçamento, OS)

### Critério de Avanço
> O fluxo continua válido mesmo se mudarmos a tecnologia?

---

## 🟦 FASE 2 — Arquitetura da Estrutura (Sistema)

### Objetivo
Definir **como o sistema se sustenta**, como os dados fluem e como escalar sem retrabalho.

### Perguntas-chave
- Onde os dados vivem?
- Quem é a fonte da verdade?
- Como o estado é controlado?
- Onde entram logs, erros e retries?
- Como o sistema cresce?

### Entregáveis
- Diagrama de arquitetura
- Estrutura de dados (Google Sheets / futuro banco)
- FSM (máquina de estados) da conversa e da OS
- Estratégia de escalabilidade e resiliência

### Critério de Avanço
> Um terceiro consegue entender a arquitetura em poucos minutos?

---

## 🟦 FASE 3 — UX & Experiência do Usuário

### Objetivo
Garantir que **o cliente entenda, confie e avance**, e que **o operador consiga trabalhar sem atrito**.

### Perguntas-chave
- O cliente entende o próximo passo?
- Quantas interações até converter?
- Onde o cliente pode desistir?
- Quando chamar humano?
- Como tratar silêncio e erro?

### Entregáveis
- Roteiros de conversa (copy)
- Mensagens do bot
- Fluxos alternativos (erro, timeout, confusão)
- UX do operador (planilhas, formulários)

### Critério de Avanço
> Um cliente leigo consegue usar sem explicação?

---

## 🟦 FASE 4 — Execução Técnica (n8n)

### Objetivo
Implementar **exatamente o que foi definido**, sem decisões de produto nesta fase.

### Perguntas-chave
- Como dividir workflows?
- Quais subworkflows reutilizar?
- Onde garantir idempotência?
- Como tratar falhas e logs?

### Entregáveis
- Workflows do n8n organizados
- Subworkflows reutilizáveis
- Tratamento de erros
- Testes de ponta a ponta

### Critério de Avanço
> O sistema funciona isolado do WhatsApp?

---

## 🟦 FASE 5 — Implementação & Evolução

### Objetivo
Colocar em produção com segurança, medir resultados e evoluir continuamente.

### Perguntas-chave
- Como fazer o go-live?
- Como monitorar?
- Quais métricas acompanhar?
- Como iterar sem quebrar?

### Entregáveis
- Go-live controlado
- Monitoramento ativo
- KPIs definidos
- Backlog de melhorias

### KPIs sugeridos
- Conversão orçamento → OS
- Tempo médio de atendimento
- Avaliação pós-venda
- Taxa de indicação

---

## Observação Final
Seguir este roadmap evita:
- retrabalho,
- automação frágil,
- experiência ruim,
- decisões técnicas precipitadas.

Este documento é a **base oficial do projeto**.
