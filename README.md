# Pede Pizza Já — Projeto Integrador (Desenvolvimento Móvel)

Protótipo acadêmico desenvolvido na Universidade Positivo, 2º semestre de 2026.
Tema: *Violência contra a Mulher — App de Apoio Camuflado*.

> ⚠️ Este é um protótipo acadêmico. **NÃO substitui** atendimento policial,
> jurídico, psicológico ou de saúde. Todos os dados de teste são **fictícios**.

## Canais de ajuda

| Ligue 180 | **180** | Central de Atendimento à Mulher — 24h |
| Polícia Militar | **190** | Emergências |

## Sobre o projeto

O aplicativo se apresenta como um app comum de pedidos de pizzaria. Um item do
cardápio (toque longo) funciona como atalho oculto que leva a uma área de apoio
protegida por PIN, com canais oficiais de ajuda e uma rede de contatos de
confiança. O botão **Sair Rápido** volta imediatamente à fachada.

## Tecnologias

- **Mobile:** React Native + Expo
- **API:** Node.js + Express
- **Banco de dados:** PostgreSQL

## Funcionalidades

- [x] Fachada: cardápio, detalhes, carrinho e finalização de pedido
- [x] Acesso à área de apoio via atalho oculto + PIN
- [x] Tela de apoio com Ligue 180 e 190
- [x] Saída rápida
- [ ] CRUD de Rede de Apoio (contatos de confiança e prioridade)
- [ ] Integração com a API

## Como executar

```bash
npm install
npx expo start
```

Escaneie o QR code com o app Expo Go (celular e computador na mesma rede Wi-Fi)
ou pressione `w` para abrir no navegador.

## Estrutura do repositório

- `src/` — código do app (`screens`, `components`, `context`, `data`, `utils`)
- `assets/` — imagens
- `docs/` — matriz de papéis e protótipos de tela
- `api/` — back-end (será criado na Entrega 4)

## Documentos

- Kanban - https://trello.com/b/drFd5boT/projeto-integrador-app-de-pizzaria
- [Uso de IA](USO_IA.md)
- [Matriz de papéis](docs/matriz-papeis.md)

## Autoria

- NÁTALY LARA MORAES DA SILVA — Desenvolvimento Móvel
