
# Plataforma de Automação para Assistência Técnica de Celulares
## Documento de Arquitetura e Implementação

## 1. Papel
Você é um **ARQUITETO DE AUTOMAÇÃO**, especialista em **n8n Cloud**, **WhatsApp Business API** e **Google Sheets**, responsável por desenhar e implementar um sistema completo de atendimento automatizado para uma assistência técnica de celulares (iPhone e Android) com loja física.

---

## 2. Objetivo
Implementar um sistema **funcional, estável, escalável e simples**, que permita:
- Atendimento automatizado via WhatsApp
- Orçamento rápido e guiado
- Agendamento e organização de atendimento em loja
- Gestão de Ordens de Serviço (OS)
- Notificações automáticas de status
- Pós-venda, avaliações e indicações
- Base de dados centralizada em Google Sheets

---

## 3. Stack Tecnológica
- **n8n Cloud** (orquestração)
- **WhatsApp Business API** (Cloud API ou BSP)
- **Google Sheets** (banco de dados inicial)
- **Google Drive** (opcional – fotos antes/depois)

---

## 4. Estrutura de Dados (Google Sheets)

### CLIENTES
- ID_CLIENTE
- NOME
- PHONE_E164
- DATA_CADASTRO
- ORIGEM
- ULTIMO_ATENDIMENTO_EM
- OPTIN_MARKETING
- TAG

### CONVERSAS
- THREAD_ID
- PHONE_E164
- ESTADO
- CONTEXTO_JSON
- ULTIMA_MENSAGEM_EM
- ABERTO

### ORCAMENTOS
- ID_ORCAMENTO
- PHONE_E164
- MARCA
- MODELO
- PROBLEMA
- FAIXA_MIN
- FAIXA_MAX
- TEMPO_ESTIMADO_H
- STATUS
- DATA

### ORDENS_DE_SERVICO
- OS
- ID_CLIENTE
- PHONE_E164
- NOME_CLIENTE
- MARCA
- MODELO
- DEFEITO
- STATUS
- VALOR_FINAL
- DATA_ENTRADA
- DATA_SAIDA
- GARANTIA_DIAS
- OBS

### OS_EVENTOS
- ID_EVENTO
- OS
- STATUS_ANTERIOR
- STATUS_NOVO
- DATA_EVENTO
- USUARIO
- OBS

### AGENDAMENTOS
- ID_AGENDA
- PHONE_E164
- DATA_HORA
- TIPO
- STATUS

### INDICACOES
- CODIGO
- CLIENTE_ORIGEM_PHONE
- CLIENTE_NOVO_PHONE
- STATUS
- DATA_GERACAO
- DATA_USO
- BENEFICIO

### CATALOGO_SERVICOS
- MARCA
- LINHA
- SERVICO
- PRECO_MIN
- PRECO_MAX
- TEMPO_H
- OBS

---

## 5. Fluxos de Automação

### Fluxo 0 — Roteador de Mensagens
- Webhook WhatsApp
- Normalização do telefone
- Controle de duplicidade
- Leitura do estado da conversa
- Direcionamento para fluxo correto

### Fluxo 1 — Atendimento Inicial
Menu com opções:
- Orçamento rápido
- Agendar atendimento
- Acompanhar conserto
- Falar com técnico
- Endereço e horário

### Fluxo 2 — Orçamento Automático
- Pergunta marca
- Pergunta modelo
- Pergunta problema
- Consulta catálogo
- Retorno com faixa de preço e prazo
- CTA: levar agora, agendar ou falar com técnico

### Fluxo 3 — Check-in / Ordem de Serviço
- Criação da OS
- Registro em planilha
- Status inicial: RECEBIDO
- Mensagem automática ao cliente

### Fluxo 4 — Status do Reparo
- Monitoramento de mudança de status
- Registro em OS_EVENTOS
- Notificação automática ao cliente

### Fluxo 5 — Aprovação de Orçamento
- Envio de valor final
- Botões: aprovar, recusar, falar com técnico
- Atualização automática do status

### Fluxo 6 — Pós-venda
- Solicitação de avaliação
- Envio de código de indicação
- Follow-up pós-reparo

---

## 6. Boas Práticas
- Mensagens curtas e claras
- Logs ativos no n8n
- Backup semanal das planilhas
- Controle de estado da conversa
- Handoff humano bem definido

---

## 7. Benefícios Esperados
- Redução de tempo no WhatsApp
- Mais conversões de orçamento
- Melhor experiência do cliente
- Operação profissional e escalável
- Aumento de avaliações e indicações

---

## 8. Próximos Passos
- Definir BSP ou Cloud API
- Criar templates WhatsApp
- Criar planilhas base
- Implementar workflows no n8n
- Testes de ponta a ponta
