# Pede Pizza Já — Projeto Integrador (Desenvolvimento Móvel)

Protótipo acadêmico desenvolvido na Universidade Positivo, 2º semestre de 2026.
Tema: *Violência contra a Mulher — App de Apoio Camuflado*.

> ⚠️ Este é um protótipo acadêmico. **NÃO substitui** atendimento policial,
> jurídico, psicológico ou de saúde. Todos os dados de teste são **fictícios**.

## Canais de ajuda

| Canal | Número | Descrição |
|---|---|---|
| Ligue 180 | **180** | Central de Atendimento à Mulher, 24h |
| Polícia Militar | **190** | Emergências |

## Sobre o projeto

O aplicativo apresenta uma interface de pizzaria, permitindo visualizar o cardápio, selecionar pizzas, adicionar produtos ao carrinho e simular a finalização de pedidos. Por trás dessa interface existe uma área de apoio destinada à demonstração de recursos de segurança e acesso discreto a canais de ajuda. A área de apoio possui canais oficiais de ajuda, uma rede de contatos de confiança e um botão SOS que envia alertas de demonstração para um painel de monitoramento.

## Tecnologias

- **Mobile:** React Native + Expo
- **Linguagem:** JavaScript
- **API:** Node.js + Express
- **Armazenamento de dados:** Arquivos JSON
- **Painel de monitoramento:** HTML, CSS e JavaScript

## Funcionalidades

- [x] Fachada: cardápio, detalhes, carrinho e finalização de pedido
- [x] Acesso à área de apoio via atalho oculto + PIN
- [x] Tela de apoio com Ligue 180 e 190
- [x] Saída rápida
- [x] CRUD de Rede de Apoio (contatos de confiança e prioridade)
- [x] Integração com a API
- [x] Painel de monitoramento com atualização automática dos alertas
- [x] Atualização do status dos alertas no painel

## Como executar

Instale as dependências do projeto:

npm install

Inicie a API em um terminal:

node api/server.js

A API será executada na porta 3333.

Para consultar os contatos cadastrados, acesse:

http://localhost:3333/contatos

Em outro terminal, inicie o aplicativo:

npx expo start --web

O aplicativo será aberto no navegador.

Para utilizar o Expo Go em um celular, o computador e o dispositivo devem estar na mesma rede Wi-Fi, e o endereço da API deve estar configurado para ser acessível pelo celular.

Acesso à área de apoio:

Abra o Cardápio.

Pressione a pizza Rúcula Especial por aproximadamente 1,5 segundo.

Informe o PIN de demonstração 1234 na versão web.

Painel de monitoramento:

Com a API funcionando, abra o arquivo painel/index.html no navegador.

O painel apresenta os alertas SOS registrados e atualiza as informações automaticamente a cada cinco segundos.

## Estrutura do repositório

- `src/` — código do app (`screens`, `components`, `context`, `data`, `utils`)
- `assets/` — imagens
- `docs/` — matriz de papéis e protótipos de tela
- `api/` — back-end Node.js com Express e armazenamento em JSON
- `painel/` — painel web de monitoramento dos alertas SOS
- `App.js` — navegação principal do aplicativo
- `index.js` — inicialização do aplicativo
- `USO_IA.md` — documentação do uso de Inteligência Artificial

## Documentos

- Kanban - https://trello.com/b/drFd5boT/projeto-integrador-app-de-pizzaria
- [Uso de IA](USO_IA.md)
- [Matriz de papéis](docs/matriz-papeis.md)

## Autoria

- NÁTALY LARA MORAES DA SILVA — Desenvolvimento Móvel
