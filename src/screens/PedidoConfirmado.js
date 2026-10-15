import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme';
import BarraInferior from '../components/BarraInferior';

export default function PedidoConfirmado({ route, navigation }) {
   const { codigo } = route.params;

  return (
    <SafeAreaView style={estilos.tela}>
      <View style={estilos.cabecalho}>
        <Text style={estilos.titulo}>Pedido Confirmado</Text>
      </View>

      <View style={estilos.conteudo}>
        <Ionicons name="checkmark-circle" size={150} color={cores.vermelho} />
        <Text style={estilos.confirmado}>PEDIDO CONFIRMADO!</Text>
        <Text style={estilos.mensagem}>
          Seu pedido foi recebido e{'\n'}já está sendo preparado.
        </Text>

        <View style={estilos.caixa}>
          <Text style={estilos.caixaTitulo}>Código do pedido</Text>
          <Text style={estilos.caixaTitulo}>#{codigo}</Text>
          <Text style={[estilos.caixaTitulo, { marginTop: 12 }]}>Previsão de entrega</Text>
          <Text style={estilos.caixaTitulo}>45 minutos</Text>
        </View>
      </View>

      <BarraInferior navigation={navigation} ativa="Inicio" />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  cabecalho: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 12 },
  titulo: { fontSize: 20, fontWeight: '900', color: cores.vermelho },
  conteudo: { flex: 1, alignItems: 'center', paddingHorizontal: 20, paddingTop: 30 },
  confirmado: { fontSize: 20, fontWeight: 'bold', marginTop: 16 },
  mensagem: { fontSize: 14, color: cores.cinza, textAlign: 'center', marginTop: 12 },
  caixa: {
    backgroundColor: cores.vermelho,
    borderRadius: 12,
    padding: 20,
    marginTop: 30,
    width: '85%',
    alignItems: 'center',
  },
  caixaTitulo: { color: cores.branco, fontSize: 17, fontWeight: 'bold' },
});