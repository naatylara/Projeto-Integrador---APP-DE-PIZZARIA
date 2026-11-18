# Uso de Inteligência Artificial

## Ferramentas utilizadas

| Ferramenta | Para que uso |
|---|---|
| Claude  | Planejamento, explicações e sugestões de código |
| ChatGPT | Apoio no desenvolvimento, revisão de código, integração com API, correção de erros, testes e documentação final|

## Regras que sigo

1. Só uso código gerado por IA que eu consiga explicar.
2. Testo tudo antes de fazer commit.
3. Nenhum dado real de vítimas; os dados de teste são fictícios.
4. Registro aqui cada uso relevante.
5. Comparo as sugestões da IA com os conteúdos e exemplos apresentados pelo professor.
6. Reviso e adapto as sugestões antes de incluí-las no projeto.

## Registro de usos

| Data | Ferramenta | Como foi usada | Parte do projeto | Como revisei |
|---|---|---|---|---|
| 28/09/2026 | Claude | Plano de trabalho e checklist do projeto | Kanban e planejamento (`docs/`) | Comparei com o PDF do professor e ajustei ao meu escopo |
| 28/09/2026 | Claude | Estrutura de pastas do projeto | Organização do repositório | Conferi com o que o professor pede |
| 12/10/2026 | Claude | Organização das pastas do app (`screens`, `components`, `context`, `data`, `utils`) e do arquivo de cores (`theme.js`) | `src/` | Entendi a função de cada pasta e adaptei os nomes à minha estrutura |
| 12/10/2026 | Claude | Código das telas da fachada com base no protótipo do Canva: Home, Cardápio, Detalhes da Pizza, Carrinho, Finalizar Pedido e Pedido Confirmado | `src/screens/` | Testei o fluxo completo no navegador e comparei cada tela com o protótipo da Entrega 1 |
| 12/10/2026 | Claude | Carrinho compartilhado entre as telas usando Context API (adicionar, alterar quantidade, remover, calcular total) | `src/context/CarrinhoContext.js` | Testei adicionar, remover e alterar itens, conferi os valores com o protótipo |
| 12/10/2026 | Claude | Componentes reutilizáveis: cabeçalho, barra inferior e card de pizza | `src/components/` | Conferi que aparecem iguais em todas as telas |
| 12/10/2026 | Claude | Área de apoio: tela de PIN, Área de Apoio, Ligar 180 e botão Sair Rápido | `src/screens/` | Testei o caminho oculto completo e o retorno à fachada |
| 12/10/2026 | Claude | Mecanismo de acesso oculto: toque longo na pizza especial leva à tela de PIN | `Cardapio.js` e `PizzaCard.js` | Testei o toque longo e a validação do PIN |
| 12/10/2026 | Claude | Ajuste das imagens: redução e proporção da foto de fundo, mascote com fundo transparente | `assets/` e `Home.js` | Conferi o resultado na tela e ajustei o tamanho do mascote |
| 12/10/2026 | Claude | Novos sabores no cardápio (portuguesa, quatro queijos, banana com canela, chocolate) e organização das categorias | `src/data/pizzas.js` | Conferi os filtros do cardápio e defini os preços e categorias |
| 12/10/2026 | Claude | Correção de erros: extensão `.JS` em maiúsculo, pasta `assets` fora do lugar, pacote `@expo/vector-icons` não instalado | Projeto Expo | Li as mensagens do terminal e corrigi até o app abrir |
| 12/10/2026 | Claude | Configuração do Git e resolução de conflito de merge com o repositório antigo | Repositório GitHub | Mantive as versões novas das telas e confirmei o histórico no GitHub |
| 12/10/2026 | Claude | Tela de PIN (`Pin.js`) criada por completo pela IA, a partir do protótipo da Entrega 1 (tela 9): teclado numérico, bolinhas do PIN, botão de confirmar e atalho vindo do toque longo no Cardápio | `src/screens/Pin.js` | Testei o toque longo, o PIN correto e o incorreto, e estudei cada função para conseguir explicar |
| 12/10/2026 | Claude | Ajuste visual da tela de PIN: remoção do cadeado do topo e teclado adaptado à altura da tela, porque a tela aparecia cortada | `src/screens/Pin.js` | Conferi no navegador e no celular se o teclado e o botão verde aparecem inteiros |
| 19/10/2026 | Claude | Correção da tela de PIN: ramo do PIN errado (aviso "PIN incorreto"), limpeza dos dígitos ao entrar e remoção de recursos que não foram vistos em aula | `src/screens/Pin.js` | Testei PIN certo e errado e a volta ao cardápio |
| 23/10/2026 | Claude | Comentários explicativos escritos em todas as telas e componentes | `src/` | Li os comentários e ajustei o que não correspondia ao código |
| 09/11/2026 | ChatGPT | Apoio na revisão das telas, componentes e funcionalidades do aplicativo | `src/screens/`, `src/components/` e `App.js` | Comparei as alterações com a estrutura existente e revisei a navegação |
| 09/11/2026 | ChatGPT | Revisão da tela de PIN e da funcionalidade Ligar 190 | `Pin.js` e tela Ligar 190 | Conferi a navegação e as funcionalidades |
| 16/11/2026 | ChatGPT | Apoio na construção da tela Rede de Apoio e organização dos contatos | `src/screens/RedeContatos.js` | Conferi os campos e a apresentação da tela |
| 16/11/2026 | ChatGPT | Apoio na implementação do CRUD da Rede de Apoio | Rede de Apoio | Revisei as operações de cadastro, consulta, edição e exclusão |
| 16/11/2026 | ChatGPT | Apoio na criação da estrutura da API e dos arquivos JSON | `api/server.js` e arquivos JSON | Conferi a organização do servidor e o armazenamento dos dados |
| 16/11/2026 | ChatGPT | Apoio na implementação das rotas POST, GET por ID, PUT e DELETE de contatos | `api/server.js` | Conferi os endpoints e as respostas do servidor |
| 16/11/2026 | ChatGPT | Revisão dos comentários das telas novas | `src/screens/` | Conferi as explicações e sua correspondência com o código |
| 17/11/2026 | ChatGPT | Integração das operações POST, PUT e DELETE de contatos com a API | Rede de Apoio e API REST | Testei as operações e a atualização dos contatos |
| 17/11/2026 | ChatGPT | Correção da máscara de telefone e do retorno da Rede de Apoio para a Área de Apoio | Tela Rede de Apoio | Testei a digitação e a navegação |
| 17/11/2026 | ChatGPT | Organização visual da tela de contatos | Rede de Apoio | Conferi os campos, botões e apresentação |
| 17/11/2026 | ChatGPT | Apoio na implementação da API de alertas SOS, incluindo cadastro, consulta e atualização de status | `api/server.js` | Conferi as rotas e os registros dos alertas |
| 17/11/2026 | ChatGPT | Apoio na criação do painel SOS com pesquisa e gerenciamento dos alertas | `painel/index.html` | Conferi a listagem, a pesquisa e a atualização dos status |
| 17/11/2026 | ChatGPT | Integração do alerta SOS com a API e o dashboard | Área de Apoio, API e painel | Testei o envio dos alertas e a apresentação no painel |
| 17/11/2026 | ChatGPT | Revisão e atualização dos comentários do aplicativo | `src/screens/` e `src/components/` | Conferi os comentários e preservei as funcionalidades |
| 18/11/2026 | ChatGPT | Revisão dos comentários e ajustes finais nos componentes e arquivos do projeto | `src/`, `api/` e arquivos de configuração | Comparei as descrições com o código e mantive a estrutura existente |
| 18/11/2026 | ChatGPT | Organização das pizzas por categorias e ordem alfabética | `src/data/pizzas.js` | Conferi os nomes, preços, imagens e mantive o acesso oculto na Rúcula Especial |
| 18/11/2026 | ChatGPT | Apoio na conferência dos requisitos da entrega final e revisão da documentação | Projeto Integrador | Comparei os requisitos com o documento orientador |
| 18/11/2026 | ChatGPT | Atualização do README com funcionalidades, tecnologias e instruções de execução | `README.md` | Mantive o padrão original e conferi as informações do projeto |
| 18/11/2026 | ChatGPT | Atualização do registro de uso de Inteligência Artificial com base no histórico de commits | `USO_IA.md` | Comparei as atividades com as datas registradas no Git |


## Observações

A IA ajudou a gerar a estrutura e o código inicial das telas a partir do meu protótipo.
O que foi feito por mim: o protótipo no Canva, a escolha do disfarce, a criação das
imagens dos sabores, os preços e categorias, os testes de cada tela e a organização do
repositório e do Kanban.
O projeto foi desenvolvido individualmente, utilizando as ferramentas de IA como apoio ao aprendizado e à resolução de problemas.
As sugestões foram analisadas e adaptadas conforme os conteúdos apresentados na disciplina de Desenvolvimento de Aplicativos Móveis.

Pontos de atenção:

- PIN 1234 é fixo na versão web de demonstração e não representa um mecanismo de autenticação seguro para uso real.
- Os pedidos realizados no aplicativo são fictícios e não geram compras ou pagamentos reais.
- Os alertas SOS são registrados na API e apresentados no painel acadêmico, sem acionamento automático da polícia.
- Os dados utilizados para testes são fictícios e armazenados localmente.
- O projeto utiliza arquivos JSON para persistência dos dados da API.
- O aplicativo foi desenvolvido exclusivamente para fins acadêmicos e de conscientização sobre a violência contra a mulher.