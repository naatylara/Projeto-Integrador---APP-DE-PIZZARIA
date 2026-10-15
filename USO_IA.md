# Uso de Inteligência Artificial

## Ferramentas utilizadas

| Ferramenta | Para que uso |
|---|---|
| Claude  | Planejamento, explicações e sugestões de código |
| ChatGPT | Apoio nas etapas iniciais do projeto |

## Regras que sigo

1. Só uso código gerado por IA que eu consiga explicar.
2. Testo tudo antes de fazer commit.
3. Nenhum dado real de vítimas; os dados de teste são fictícios.
4. Registro aqui cada uso relevante.

## Registro de usos

| Data | Ferramenta | Como foi usada | Parte do projeto | Como revisei |
|---|---|---|---|---|
| 28/09/2026 | Claude | Plano de trabalho e checklist do projeto | Kanban e planejamento (`docs/`) | Comparei com o PDF do professor e ajustei ao meu escopo |
|---|---|---|---|---|
| 28/09/2026 | Claude | Estrutura de pastas do projeto | Organização do repositório | Conferi com o que o professor pede |
|---|---|---|---|---|
| 12/10/2026 | Claude | Organização das pastas do app (`screens`, `components`, `context`, `data`, `utils`) e do arquivo de cores (`theme.js`) | `src/` | Entendi a função de cada pasta e adaptei os nomes à minha estrutura |
|---|---|---|---|---|
| 12/10/2026 | Claude | Código das telas da fachada com base no protótipo do Canva: Home, Cardápio, Detalhes da Pizza, Carrinho, Finalizar Pedido e Pedido Confirmado | `src/screens/` | Testei o fluxo completo no navegador e comparei cada tela com o protótipo da Entrega 1 |
|---|---|---|---|---|
| 12/10/2026 | Claude | Carrinho compartilhado entre as telas usando Context API (adicionar, alterar quantidade, remover, calcular total) | `src/context/CarrinhoContext.js` | Testei adicionar, remover e alterar itens, conferi os valores com o protótipo |
|---|---|---|---|---|
| 12/10/2026 | Claude | Componentes reutilizáveis: cabeçalho, barra inferior e card de pizza | `src/components/` | Conferi que aparecem iguais em todas as telas |
|---|---|---|---|---|
| 12/10/2026 | Claude | Área de apoio: tela de PIN, Área de Apoio, Ligar 180 e botão Sair Rápido | `src/screens/` | Testei o caminho oculto completo e o retorno à fachada |
|---|---|---|---|---|
| 12/10/2026 | Claude | Mecanismo de acesso oculto: toque longo na pizza especial leva à tela de PIN | `Cardapio.js` e `PizzaCard.js` | Testei o toque longo e a validação do PIN |
|---|---|---|---|---|
| 12/10/2026 | Claude | Ajuste das imagens: redução e proporção da foto de fundo, mascote com fundo transparente | `assets/` e `Home.js` | Conferi o resultado na tela e ajustei o tamanho do mascote |
|---|---|---|---|---|
| 12/10/2026 | Claude | Novos sabores no cardápio (portuguesa, quatro queijos, banana com canela, chocolate) e organização das categorias | `src/data/pizzas.js` | Conferi os filtros do cardápio e defini os preços e categorias |
|---|---|---|---|---|
| 12/10/2026 | Claude | Correção de erros: extensão `.JS` em maiúsculo, pasta `assets` fora do lugar, pacote `@expo/vector-icons` não instalado | Projeto Expo | Li as mensagens do terminal e corrigi até o app abrir |
|---|---|---|---|---|
| 12/10/2026 | Claude | Configuração do Git e resolução de conflito de merge com o repositório antigo | Repositório GitHub | Mantive as versões novas das telas e confirmei o histórico no GitHub |
|---|---|---|---|---|

## Observações

A IA ajudou a gerar a estrutura e o código inicial das telas a partir do meu protótipo.
O que foi feito por mim: o protótipo no Canva, a escolha do disfarce, a criação das
imagens dos sabores, os preços e categorias, os testes de cada tela e a organização do
repositório e do Kanban.

Pontos de atenção que já identifiquei:
- O PIN (`1234`) é fixo apenas na Entrega 2. Na Entrega 4 ele virá da tabela USUARIO, pela API.
- Os dados das pizzas são simulados e serão substituídos por chamadas à API.