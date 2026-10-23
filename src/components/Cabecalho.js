// ============================================================
// COMPONENTE: cabeçalho padrão das telas (seta de voltar + título).
//
// Props: "titulo" (texto), "navigation" (para o goBack) e "direita"
// (um elemento opcional no canto direito, como o ícone do carrinho).
// ============================================================

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme';

export default function Cabecalho({ titulo, navigation, direita }) {
  return (
    <View style={estilos.cabecalho}>
      <View style={estilos.lado}>
        {/* goBack() volta para a tela anterior da pilha. */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color={cores.vermelho} />
        </TouchableOpacity>
        <Text style={estilos.titulo}>{titulo}</Text>
      </View>
      {/* Elemento extra opcional, enviado pela tela que usa o cabeçalho. */}
      {direita}
    </View>
  );
}

const estilos = StyleSheet.create({
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
  },
  lado: { flexDirection: 'row', alignItems: 'center' },
  titulo: {
    fontSize: 20,
    fontWeight: '900',
    color: cores.vermelho,
    marginLeft: 14,
  },
});