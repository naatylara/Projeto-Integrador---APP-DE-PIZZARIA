//============================================================
//  LIGAR 190
//
// Tela responsável por apresentar o canal de emergência
// da Polícia Militar, disponibilizando informações sobre
// o serviço e um botão para abrir o discador com o número 190.
//
// A chamada depende dos recursos disponíveis no dispositivo.
// Inclui o botão SAIR RÁPIDO, fixo no rodapé, que retorna
// diretamente à fachada da pizzaria.
// ============================================================

import React from 'react';  
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme';
import Cabecalho from '../components/Cabecalho';

export default function Ligar190({ navigation }) {

  // Abre o discador do dispositivo com o número 190.
  function ligar() {
    Linking.openURL('tel:190').catch(() => {
      Alert.alert(
        'Não foi possível ligar',
        'Disque 190 no seu telefone.'
      );
    });
  }

  // Retorna diretamente à fachada da pizzaria.
  function sairRapido() {
    navigation.popToTop();
  }

  return (
    <SafeAreaView style={estilos.tela}>
      <Cabecalho
        titulo="Ligar 190"
        navigation={navigation}
      />

      <ScrollView
        style={estilos.rolagem}
        contentContainerStyle={estilos.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <Ionicons
          name="shield"
          size={120}
          color={cores.vermelho}
        />

        <Text style={estilos.disque}>
          DISQUE 190
        </Text>

        <Text style={estilos.central}>
          Polícia Militar
        </Text>

        <Text style={estilos.info}>
          Emergências, atendimento 24 horas
        </Text>

        <TouchableOpacity
          style={estilos.botaoLigar}
          onPress={ligar}
        >
          <Text style={estilos.botaoLigarTexto}>
            LIGAR AGORA
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilos.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={estilos.botaoVoltarTexto}>
            Voltar
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* SAÍDA RÁPIDA FIXA NO RODAPÉ */}
      <View style={estilos.rodape}>
        <TouchableOpacity
          style={estilos.botaoSair}
          onPress={sairRapido}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Sair rapidamente para a pizzaria"
        >
          <Ionicons
            name="exit-outline"
            size={22}
            color={cores.branco}
          />

          <Text style={estilos.botaoSairTexto}>
            SAIR RÁPIDO
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },

  rolagem: {
    flex: 1,
  },

  conteudo: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 24,
  },

  disque: {
    fontSize: 26,
    fontWeight: '900',
    color: cores.vermelho,
    marginTop: 16,
  },

  central: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },

  info: {
    fontSize: 13,
    color: cores.cinza,
    textAlign: 'center',
    marginTop: 12,
  },

  botaoLigar: {
    backgroundColor: cores.vermelho,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },

  botaoLigarTexto: {
    color: cores.branco,
    fontSize: 17,
    fontWeight: 'bold',
  },

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

  botaoVoltarTexto: {
    color: cores.vermelho,
    fontSize: 17,
    fontWeight: 'bold',
  },

  rodape: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: cores.fundo,
  },

  botaoSair: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: cores.vermelho,
    paddingVertical: 14,
    borderRadius: 12,
  },

  botaoSairTexto: {
    color: cores.branco,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
