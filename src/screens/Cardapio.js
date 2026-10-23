// ============================================================
// TELA 2 do protótipo da Entrega 1: "Cardápio".
//
// Lista as pizzas (dados simulados de data/pizzas.js) com filtro por
// categoria e ícone do carrinho com a quantidade de itens.
//
// ATALHO OCULTO (mecanismo de entrada do disfarce): o toque curto em
// uma pizza abre os Detalhes, como em qualquer app de pizzaria; o
// toque LONGO (1,5 segundos) na pizza com a estrela abre a tela de PIN, que
// leva à área de apoio. Nas demais pizzas, o toque longo não faz nada.
// ============================================================

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme';
import { pizzas, categorias } from '../data/pizzas';
import { useCarrinho } from '../context/CarrinhoContext';
import PizzaCard from '../components/PizzaCard';
import BarraInferior from '../components/BarraInferior';
import Cabecalho from '../components/Cabecalho';

export default function Cardapio({ navigation }) {
  // useState guarda o filtro ativo; ao mudar, a tela é redesenhada.
  const [categoria, setCategoria] = useState('Todas');
  const { adicionar, totalItens } = useCarrinho();

  const lista =
    categoria === 'Todas'
      ? pizzas
      : pizzas.filter((p) => p.categoria === categoria);

  const iconeCarrinho = (
    <TouchableOpacity onPress={() => navigation.navigate('Carrinho')}>
      <Ionicons name="cart-outline" size={28} color={cores.vermelho} />
      {totalItens > 0 && (
        <View style={estilos.badge}>
          <Text style={estilos.badgeTexto}>{totalItens}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={estilos.tela}>
      <Cabecalho titulo="Cardápio" navigation={navigation} direita={iconeCarrinho} />

      <View style={estilos.filtros}>
        {categorias.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => setCategoria(c)}
            style={[estilos.chip, categoria === c && estilos.chipAtivo]}
          >
            <Text style={[estilos.chipTexto, categoria === c && estilos.chipTextoAtivo]}>
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={lista}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ListEmptyComponent={
          <Text style={estilos.vazio}>Nenhum item nesta categoria ainda.</Text>
        }
        renderItem={({ item }) => (
          <PizzaCard
            pizza={item}
            onAdicionar={() => adicionar(item)}
            onPress={() => navigation.navigate('Detalhes', { pizza: item })}
            // Toque curto: abre os Detalhes e envia a pizza escolhida em { pizza }.
            // Toque longo: só existe se item.especial for true; nas outras pizzas
            // onLongPress é undefined e nada acontece (por isso o atalho não aparece).
            // Atalho oculto: toque longo na pizza especial abre a tela de PIN
            onLongPress={item.especial ? () => navigation.navigate('Pin') : undefined}
          />
        )}
      />
      {/* Barra com Início, Cardápio e Pedidos (aba atual: Cardápio). */}
      <BarraInferior navigation={navigation} ativa="Cardapio" />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  badge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: cores.vermelho,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeTexto: { color: cores.branco, fontSize: 11, fontWeight: 'bold' },
  filtros: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 8, gap: 8 },
  chip: {
    backgroundColor: cores.rosaClaro,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  chipAtivo: { backgroundColor: cores.vermelho },
  chipTexto: { fontSize: 12, fontWeight: 'bold', color: cores.texto },
  chipTextoAtivo: { color: cores.branco },
  vazio: { textAlign: 'center', color: cores.cinza, marginTop: 40 },
});