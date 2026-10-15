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
            // Atalho oculto: toque longo na pizza especial abre a tela de PIN
            onLongPress={item.especial ? () => navigation.navigate('Pin') : undefined}
          />
        )}
      />

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