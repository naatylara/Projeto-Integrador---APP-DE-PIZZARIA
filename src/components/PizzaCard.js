// ============================================================
// COMPONENTE PIZZA CARD
//
// Exibe as informações de cada pizza no cardápio,
// incluindo imagem, nome, descrição, preço e botão Adicionar.
//
// Recebe as propriedades:
// pizza: dados da pizza.
// onAdicionar: adiciona a pizza ao carrinho.
// onPress: executa a ação do toque curto.
// onLongPress: executa a ação do toque prolongado.
//
// As ações são controladas pela tela do Cardápio.
// ============================================================


import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { cores } from '../theme';
import { formatarPreco } from '../data/pizzas';

export default function PizzaCard({ pizza, onAdicionar, onPress, onLongPress }) {
  return (
    <TouchableOpacity
      style={estilos.card}
      onPress={onPress}
      // Toque longo: só faz algo na pizza especial (atalho oculto).
      // delayLongPress define quanto tempo segurar: 1500 ms = 1,5 s.
      onLongPress={onLongPress}
      delayLongPress={1500}
      activeOpacity={0.8}
    >
      <Image source={pizza.imagem} style={estilos.imagem} />
      <View style={estilos.info}>
        <Text style={estilos.nome}>
          {/* A estrela só aparece se a pizza tiver especial: true. */}
          {pizza.nome} {pizza.especial ? '⭐' : ''}
        </Text>
        <Text style={estilos.descricao}>{pizza.descricao}</Text>
        <View style={estilos.rodape}>
          <Text style={estilos.preco}>{formatarPreco(pizza.preco)}</Text>
          <TouchableOpacity style={estilos.botao} onPress={onAdicionar}>
            <Text style={estilos.botaoTexto}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: cores.rosaClaro,
  },
  imagem: { width: 90, height: 90, borderRadius: 10 },
  info: { flex: 1, marginLeft: 12 },
  nome: { fontSize: 16, fontWeight: 'bold', color: cores.texto },
  descricao: { fontSize: 12, color: cores.cinza, marginTop: 2 },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  preco: { fontSize: 15, fontWeight: 'bold', color: cores.texto },
  botao: {
    backgroundColor: cores.vermelho,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 14,
  },
  botaoTexto: { color: cores.branco, fontSize: 12, fontWeight: 'bold' },
});