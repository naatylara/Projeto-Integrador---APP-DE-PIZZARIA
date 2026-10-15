import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme';

const abas = [
  { nome: 'Início', rota: 'Inicio', icone: 'home-outline' },
  { nome: 'Cardápio', rota: 'Cardapio', icone: 'restaurant-outline' },
  { nome: 'Pedidos', rota: 'Carrinho', icone: 'receipt-outline' },
];

export default function BarraInferior({ navigation, ativa }) {
  return (
    <View style={estilos.barra}>
      {abas.map((aba) => (
        <TouchableOpacity
          key={aba.rota}
          style={estilos.aba}
          onPress={() => navigation.navigate(aba.rota)}
        >
          <Ionicons name={aba.icone} size={26} color={cores.vermelho} />
          <Text style={[estilos.texto, ativa === aba.rota && estilos.textoAtivo]}>
            {aba.nome}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const estilos = StyleSheet.create({
  barra: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: cores.rosaClaro,
    backgroundColor: cores.fundo,
  },
  aba: { alignItems: 'center' },
  texto: { fontSize: 11, color: cores.vermelho, marginTop: 2 },
  textoAtivo: { fontWeight: 'bold' },
});