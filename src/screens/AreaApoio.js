import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme';

export default function AreaApoio({ navigation }) {
  const [aviso, setAviso] = useState('');

  // Saída rápida: limpa a pilha e volta direto para a fachada
  function sairRapido() {
    navigation.reset({ index: 0, routes: [{ name: 'Inicio' }] });
  }

  const cartoes = [
    {
      titulo: 'LIGAR 180',
      texto: 'Denúncia de violência contra a mulher',
      icone: 'call',
      onPress: () => navigation.navigate('Ligar180'),
    },
    {
      titulo: 'LIGAR 190',
      texto: 'Polícia Militar (emergência)',
      icone: 'shield',
      onPress: () => Linking.openURL('tel:190'),
    },
    {
      titulo: 'Rede de Contatos',
      texto: 'Pessoas de confiança',
      icone: 'people-outline',
      onPress: () => setAviso('Rede de Contatos: será ligada à API nas próximas entregas.'),
    },
    {
      titulo: 'Localização',
      texto: 'Enviar sua localização para contatos seguros',
      icone: 'location',
      onPress: () => setAviso('Localização: será implementada nas próximas entregas.'),
    },
  ];

  return (
    <SafeAreaView style={estilos.tela}>
      <View style={estilos.cabecalho}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color={cores.vermelho} />
        </TouchableOpacity>
        <Text style={estilos.titulo}>Área de Apoio</Text>
        <Ionicons name="heart" size={40} color={cores.vermelho} style={{ marginLeft: 'auto' }} />
      </View>

      <View style={estilos.conteudo}>
        <Text style={estilos.destaque}>Você não está sozinha</Text>
        <Text style={estilos.texto}>
          Aqui você encontra ajuda, orientações e canais de apoio.{'\n'}Sua segurança importa !!
        </Text>

        <View style={estilos.grade}>
          {cartoes.map((c) => (
            <TouchableOpacity key={c.titulo} style={estilos.cartao} onPress={c.onPress}>
              <Ionicons name={c.icone} size={34} color={cores.vermelho} />
              <Text style={estilos.cartaoTitulo}>{c.titulo}</Text>
              <Text style={estilos.cartaoTexto}>{c.texto}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {aviso !== '' && <Text style={estilos.aviso}>{aviso}</Text>}

        <TouchableOpacity style={estilos.botaoSair} onPress={sairRapido}>
          <Ionicons name="exit-outline" size={22} color={cores.branco} />
          <Text style={estilos.botaoSairTexto}>SAIR RÁPIDO</Text>
        </TouchableOpacity>

        <Text style={estilos.protótipo}>
          Protótipo acadêmico. Não substitui atendimento policial, jurídico, psicológico ou de saúde real.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
  },
  titulo: { fontSize: 20, fontWeight: '900', color: cores.vermelho, marginLeft: 14 },
  conteudo: { flex: 1, paddingHorizontal: 20 },
  destaque: { fontSize: 18, fontWeight: 'bold', marginTop: 6 },
  texto: { fontSize: 13, fontWeight: 'bold', marginTop: 8, color: cores.texto },
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    rowGap: 12,
  },
  cartao: {
    width: '48%',
    borderWidth: 2,
    borderColor: cores.vermelho,
    borderRadius: 12,
    alignItems: 'center',
    padding: 12,
    minHeight: 130,
  },
  cartaoTitulo: { fontSize: 15, fontWeight: '900', color: cores.vermelho, marginTop: 4 },
  cartaoTexto: { fontSize: 11, color: cores.cinza, textAlign: 'center', marginTop: 2 },
  aviso: { fontSize: 12, color: cores.cinza, textAlign: 'center', marginTop: 12 },
  botaoSair: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: cores.vermelho,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 24,
  },
  botaoSairTexto: { color: cores.branco, fontSize: 16, fontWeight: 'bold' },
  protótipo: { fontSize: 10, color: cores.cinza, textAlign: 'center', marginTop: 16 },
});