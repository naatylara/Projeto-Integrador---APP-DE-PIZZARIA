// ============================================================
// DADOS DO CARDÁPIO
//
// Armazena as informações das pizzas exibidas no aplicativo,
// incluindo nome, descrição, preço, categoria e imagem.
//
// Define os tamanhos disponíveis, a taxa de entrega
// e as regras de cálculo dos preços.
//
// Contém também a função para formatar valores em reais.
//
// Os dados do cardápio são fictícios e armazenados localmente,
// sem necessidade de integração com a API.
// ============================================================



// Botões de filtro do Cardápio.
export const categorias = ['Todas', '+ Pedidas', 'Especiais', 'Doces'];

// Taxa de entrega fixa, somada ao subtotal do pedido.
export const taxaEntrega = 10;

// Tamanhos disponíveis. A Grande custa R$ 30 a mais que a Média.
export const tamanhos = [
  { nome: 'Média', pedacos: 8, acrescimo: 0 },
  { nome: 'Grande', pedacos: 12, acrescimo: 30 },
];

// Preço de UMA pizza no tamanho escolhido: preço base + acréscimo do tamanho.
// .find() procura na lista "tamanhos" o item com o nome recebido.
export function precoUnitario(pizza, nomeTamanho) {
  const t = tamanhos.find((x) => x.nome === nomeTamanho);
  return pizza.preco + (t ? t.acrescimo : 0);
}

// Quantos pedaços tem o tamanho escolhido (8 na Média, 12 na Grande).
export function pedacosDoTamanho(nomeTamanho) {
  const t = tamanhos.find((x) => x.nome === nomeTamanho);
  return t ? t.pedacos : 0;
}

// Lista de pizzas. Cada item contém os dados exibidos no cardápio.
// A propriedade "categoria: 'Especiais'" identifica as pizzas
// que recebem uma estrela visual no PizzaCard.
//
// A propriedade "especial: true" é exclusiva da Rúcula Especial
// e controla somente o acesso oculto por toque prolongado.
export const pizzas = [
  
  {
    id: 1,
    nome: 'Calabresa',
    descricao: 'Molho de tomate, mussarela e calabresa',
    preco: 45.9,
    categoria: '+ Pedidas',
    imagem: require('../../assets/pizzas/calabresa.png'),
  },
  {
    id: 2,
    nome: 'Mussarela',
    descricao: 'Molho de tomate, muita mussarela e tomate',
    preco: 40.9,
    categoria: '+ Pedidas',
    imagem: require('../../assets/pizzas/mussarela.png'),
  },
  {
    id: 3,
    nome: 'Pepperoni',
    descricao: 'Molho de tomate, mussarela, requeijão e pepperoni',
    preco: 55.9,
    categoria: '+ Pedidas',
    imagem: require('../../assets/pizzas/pepperoni.png'),
  },
  {
    id: 5,
    nome: 'Portuguesa',
    descricao: 'Molho de tomate, mussarela, presunto, ovo, cebola e azeitona',
    preco: 49.9,
    categoria: '+ Pedidas',
    imagem: require('../../assets/pizzas/portuguesa.png'),
  },
  {
    id: 6,
    nome: 'Quatro Queijos',
    descricao: 'Molho de tomate, mussarela, provolone, catupiry e gorgonzola',
    preco: 52.9,
    categoria: '+ Pedidas',
    imagem: require('../../assets/pizzas/quatroqueijos.png'),
  },
   {
    id: 4,
    nome: 'Rúcula Especial',
    descricao: 'Molho de tomate, mussarela, rúcula e requeijão',
    preco: 55.9,
    categoria: 'Especiais',
    especial: true, // Mantém o acesso oculto por toque longo.
    imagem: require('../../assets/pizzas/rucula.png'),
  },
  {
    id: 14,
    nome: 'Camarão Especial',
    descricao: 'Molho de tomate, mussarela, camarão, alho-poró e requeijão',
    preco: 75.9,
    categoria: 'Especiais',
    imagem: require('../../assets/pizzas/camarao.png'),
  },
  {
    id: 13,
    nome: 'Parma Especial',
    descricao: 'Molho de tomate, mussarela, presunto de parma, rúcula, tomate-cereja e parmesão',
    preco: 59.9,
    categoria: 'Especiais',
    imagem: require('../../assets/pizzas/parma.png'),
  },
  {
    id: 15,
    nome: 'Quatro Queijos Especial',
    descricao: 'Molho de tomate, mussarela, provolone, catupiry, gorgonzola, nozes e mel',
    preco: 75.9,
    categoria: 'Especiais',
    imagem: require('../../assets/pizzas/quatroqueijoespecial.png'),
  },
  {
    id: 7,
    nome: 'Banana com Canela',
    descricao: 'Mussarela, banana fatiada, açúcar e canela',
    preco: 42.9,
    categoria: 'Doces',
    imagem: require('../../assets/pizzas/bananaecanela.png'),
  },
  {
    id: 8,
    nome: 'Chocolate',
    descricao: 'Chocolate ao leite coberto com granulado',
    preco: 44.9,
    categoria: 'Doces',
    imagem: require('../../assets/pizzas/chocolate.png'),
  },
  {
    id: 9,
    nome: 'Churros',
    descricao: 'Churros fritos cobertos com açúcar e canela',
    preco: 44.9,
    categoria: 'Doces',
    imagem: require('../../assets/pizzas/churros.jpg'),
  },
  {
    id: 11,
    nome: 'M&M',
    descricao: 'Chocolate ao leite coberto com M&Ms',
    preco: 44.9,
    categoria: 'Doces',
    imagem: require('../../assets/pizzas/mem.jpg'),
  },
  {
    id: 10,
    nome: 'Morango com Nutella',
    descricao: 'Morango com cobertura de Nutella',
    preco: 44.9,
    categoria: 'Doces',
    imagem: require('../../assets/pizzas/morangoenutella.jpg'),
  },
  {
    id: 12,
    nome: 'Prestígio',
    descricao: 'Chocolate ao leite coberto com coco ralado',
    preco: 44.9,
    categoria: 'Doces',
    imagem: require('../../assets/pizzas/prestigio.jpg'),
  },

];  

// Transforma o número 45.9 no texto "R$45,90":
// toFixed(2) deixa duas casas decimais e replace troca o ponto pela vírgula.
export function formatarPreco(valor) {
  return 'R$' + valor.toFixed(2).replace('.', ',');
}