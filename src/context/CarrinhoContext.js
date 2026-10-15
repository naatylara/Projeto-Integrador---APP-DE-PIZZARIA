import React, { createContext, useContext, useState } from 'react';
import { precoUnitario, taxaEntrega } from '../data/pizzas';

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);

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

  function alterarQuantidade(indice, delta) {
    setItens((atual) =>
      atual.map((i, k) =>
        k === indice
          ? { ...i, quantidade: Math.max(1, i.quantidade + delta) }
          : i
      )
    );
  }

  function remover(indice) {
    setItens((atual) => atual.filter((_, k) => k !== indice));
  }

  function limpar() {
    setItens([]);
  }

  const totalItens = itens.reduce((soma, i) => soma + i.quantidade, 0);
  const subtotal = itens.reduce(
    (soma, i) => soma + precoUnitario(i.pizza, i.tamanho) * i.quantidade,
    0
  );
  const total = itens.length > 0 ? subtotal + taxaEntrega : 0;

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

export const useCarrinho = () => useContext(CarrinhoContext);