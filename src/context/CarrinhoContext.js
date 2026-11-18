// ============================================================
// CONTEXTO DO CARRINHO
//
// Gerencia e compartilha os dados do carrinho entre as telas
// do aplicativo utilizando Context API e useState.
//
// Permite adicionar pizzas, alterar quantidades, remover
// itens e limpar o carrinho.
//
// Calcula automaticamente a quantidade de itens,
// o subtotal e o valor total com a taxa de entrega.
//
// Os pedidos são fictícios e os dados do carrinho
// permanecem armazenados temporariamente na memória.
// ============================================================


import React, { createContext, useContext, useState } from 'react';
import { precoUnitario, taxaEntrega } from '../data/pizzas';

// Cria o contexto responsável por compartilhar os dados do carrinho.
const CarrinhoContext = createContext();

// Componente que guarda o estado e o entrega a todos os filhos (children).
export function CarrinhoProvider({ children }) {
  // Lista de itens do carrinho. Começa vazia.
  const [itens, setItens] = useState([]);

  // Adiciona uma pizza. Se já existe um item igual (mesma pizza e mesmo
  // tamanho), só soma a quantidade; senão cria um item novo no final.
  function adicionar(pizza, tamanho = 'Média', quantidade = 1) {
    setItens((atual) => {
      const indice = atual.findIndex(
        (i) => i.pizza.id === pizza.id && i.tamanho === tamanho
      );
      if (indice >= 0) {
        return atual.map((i, k) =>
          k === indice ? { ...i, quantidade: i.quantidade + quantidade } : i
        );
      }
      return [...atual, { pizza, tamanho, quantidade }];
    });
  }
  // Soma ou subtrai (delta) a quantidade do item da posição "indice".
  // Math.max(1, ...) impede que a quantidade fique menor que 1.
  function alterarQuantidade(indice, delta) {
    setItens((atual) =>
      atual.map((i, k) =>
        k === indice
          ? { ...i, quantidade: Math.max(1, i.quantidade + delta) }
          : i
      )
    );
  }
  // Remove o item da posição "indice": .filter() mantém todos os outros.
  function remover(indice) {
    setItens((atual) => atual.filter((_, k) => k !== indice));
  }
  // Esvazia o carrinho (usado na lixeira do topo e ao confirmar o pedido).
  function limpar() {
    setItens([]);
  }
  // Valores calculados a partir da lista: .reduce() vai somando os itens.
  // totalItens: quantidade de pizzas (bolinha do ícone do carrinho).
  // subtotal: soma de preço x quantidade. total: subtotal + taxa de entrega.
  const totalItens = itens.reduce((soma, i) => soma + i.quantidade, 0);
  const subtotal = itens.reduce(
    (soma, i) => soma + precoUnitario(i.pizza, i.tamanho) * i.quantidade,
    0
  );
  const total = itens.length > 0 ? subtotal + taxaEntrega : 0;
  // Tudo o que está em "value" fica disponível para as telas.
  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionar,
        alterarQuantidade,
        remover,
        limpar,
        totalItens,
        subtotal,
        total,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
// Atalho para as telas usarem: const { itens, adicionar } = useCarrinho();
export const useCarrinho = () => useContext(CarrinhoContext);