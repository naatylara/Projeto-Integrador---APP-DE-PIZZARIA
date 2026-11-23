// ============================================================
// COMPONENTE CABEÇALHO
//
// Exibe o cabeçalho das telas com botão de voltar e título.
//
// Recebe as propriedades:
// titulo: texto exibido no cabeçalho.
// navigation: permite retornar à tela anterior.
// direita: elemento opcional exibido no lado direito.
//
// Componente reutilizável nas telas do aplicativo.
// ============================================================

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme';

// mostrarVoltar permite esconder a seta em telas específicas.
// Por padrão, a seta continua aparecendo nas outras telas.
export default function Cabecalho({
  titulo,
  navigation,
  direita,
  mostrarVoltar = true,
}) {
  return (
    <View style={estilos.cabecalho}>
      <View style={estilos.lado}>
        {mostrarVoltar && navigation && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back"
              size={26}
              color={cores.vermelho}
            />
          </TouchableOpacity>
        )}

        <Text
          style={[
            estilos.titulo,
            !mostrarVoltar && estilos.tituloSemSeta,
          ]}
        >
          {titulo}
        </Text>
      </View>

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
  lado: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: '900',
    color: cores.vermelho,
    marginLeft: 14,
  },
  tituloSemSeta: {
    marginLeft: 0,
  },
});
