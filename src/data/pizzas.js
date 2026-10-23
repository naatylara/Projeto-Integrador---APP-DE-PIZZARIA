// ============================================================
// DADOS SIMULADOS do cardápio.
//
// Para entrega 2 os dados que está sendo usados são simulados. 
// A API e o banco de dados reais só entram na Entrega 4, quando esta lista passa a vir do servidor.
// As pizzas seguem a entidade PIZZA do DER da Entrega 1 (id, nome,
// descrição e preço); categoria, imagem e "especial" são extras só
// da tela.
//
// Também ficam aqui as regras de preço (taxa de entrega e acréscimo
// por tamanho) e a função que formata o preço em reais.
// ============================================================




export const categorias = ['Todas', '+ Pedidas', 'Especiais', 'Doces'];

export const taxaEntrega = 10;


export const tamanhos = [
  { nome: 'Média', pedacos: 8, acrescimo: 0 },
  { nome: 'Grande', pedacos: 12, acrescimo: 30 },
];

export function precoUnitario(pizza, nomeTamanho) {
  const t = tamanhos.find((x) => x.nome === nomeTamanho);
  return pizza.preco + (t ? t.acrescimo : 0);
}

export function pedacosDoTamanho(nomeTamanho) {
  const t = tamanhos.find((x) => x.nome === nomeTamanho);
  return t ? t.pedacos : 0;
}

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
    id: 4,
    nome: 'Rúcula Especial',
    descricao: 'Molho de tomate, mussarela, requeijão e pepperoni',
    preco: 55.9,
    categoria: 'Especiais',
    especial: true, // estrela no card + atalho oculto (toque longo)
    imagem: require('../../assets/pizzas/rucula.png'),
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
    id: 10,
    nome: 'Morango com Nutella',
    descricao: 'Morango com cobertura de Nutella',
    preco: 44.9,
    categoria: 'Doces',
    imagem: require('../../assets/pizzas/morangoenutella.jpg'),
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
    id: 12, 
    nome: 'Prestígio',
    descricao: 'Chocolate ao leite coberto com coco ralado',
    preco: 44.9,
    categoria: 'Doces',
    imagem: require('../../assets/pizzas/prestigio.jpg'),
  },
];  

export function formatarPreco(valor) {
  return 'R$' + valor.toFixed(2).replace('.', ',');
}