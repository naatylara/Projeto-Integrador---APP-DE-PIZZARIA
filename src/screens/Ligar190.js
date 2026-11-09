// ============================================================
// TELA 12 do protótipo da Entrega 1: "Ligar 190".
//
// Mostra o canal oficial (Central de Atendimento à Mulher) e o botão
// "LIGAR AGORA", que abre o discador do celular já com o número 190.
// ============================================================


import React from 'react';
import { View, Text, TouchableOpacity, Linking, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme';
import Cabecalho from '../components/Cabecalho';

export default function Ligar190({ navigation }) {
  function ligar() {
    Linking.openURL('tel:190').catch(() => {
      Alert.alert('Não foi possível ligar', 'Disque 190 no seu telefone.');
    });
  }

  return (
    <SafeAreaView style={estilos.tela}>
      <Cabecalho titulo="Ligar 190" navigation={navigation} />

      <View style={estilos.conteudo}>
        <Ionicons name="shield" size={120} color={cores.vermelho} />
        <Text style={estilos.disque}>DISQUE 190</Text>
        <Text style={estilos.central}>Polícia Militar</Text>
        <Text style={estilos.info}>Emergências, atendimento 24 horas</Text>

        <TouchableOpacity style={estilos.botaoLigar} onPress={ligar}>
          <Text style={estilos.botaoLigarTexto}>LIGAR AGORA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.botaoVoltar} onPress={() => navigation.goBack()}>
          <Text style={estilos.botaoVoltarTexto}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { flex: 1, alignItems: 'center', paddingHorizontal: 24, paddingTop: 30 },
  disque: { fontSize: 26, fontWeight: '900', color: cores.vermelho, marginTop: 16 },
  central: { fontSize: 15, fontWeight: 'bold', marginTop: 20, textAlign: 'center' },
  info: { fontSize: 13, color: cores.cinza, textAlign: 'center', marginTop: 12 },
  botaoLigar: {
    backgroundColor: cores.vermelho,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },
  botaoLigarTexto: { color: cores.branco, fontSize: 17, fontWeight: 'bold' },
  botaoVoltar: {
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.cinzaClaro,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 14,
  },
  botaoVoltarTexto: { color: cores.vermelho, fontSize: 17, fontWeight: 'bold' },
});