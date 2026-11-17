// ============================================================
// TELA 10 do protótipo da Entrega 1: "Área de Apoio".
//
// É a área real do app, escondida atrás da fachada de pizzaria.
// Traz os canais oficiais obrigatórios (Ligue 180 e 190), a rede
// de contatos de confiança, o envio de localização e o botão
// "Sair Rápido". Mostra também o aviso de que o app é um
// protótipo acadêmico, como exige o documento do projeto.
//
// A Rede de Contatos possui um CRUD funcional da Entrega 3,
// com dados temporários. A Localização ainda mostra um aviso.
// ============================================================


import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme';
import * as Location from 'expo-location';

export default function AreaApoio({ navigation }) {
  // Mensagem exibida quando se toca em um recurso que ainda não existe.
  const [aviso, setAviso] = useState('');
  const [enviandoSOS, setEnviandoSOS] = useState(false);

// Endereço da API para teste no computador.
// No celular físico, precisaremos usar o IP do computador.
const API_URL = 'http://localhost:3333';

async function enviarSOS() {
  if (enviandoSOS) return;

  setEnviandoSOS(true);

  try {
    const permissao =
      await Location.requestForegroundPermissionsAsync();

    if (permissao.status !== 'granted') {
      setAviso('Permissão de localização não autorizada.');
      return;
    }

    const localizacao =
      await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

    const resposta = await fetch(`${API_URL}/alertas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usuarioId: 1,
        latitude: localizacao.coords.latitude,
        longitude: localizacao.coords.longitude,
      }),
    });

    if (!resposta.ok) {
      throw new Error('Falha ao registrar SOS.');
    }

    const alerta = await resposta.json();

    setAviso(
      `Alerta SOS #${alerta.id} enviado com sucesso para a central de monitoramento.`
    );

  } catch (erro) {
    console.log('Erro SOS:', erro);
    setAviso('Não foi possível enviar o SOS. Verifique a API.');
  } finally {
    setEnviandoSOS(false);
  }
}
function confirmarSOS() {
  const mensagem = 'Deseja enviar um alerta SOS com sua localização para a central de monitoramento?';

  if (Platform.OS === 'web') {
    if (window.confirm(mensagem)) {
      enviarSOS();
    }
    return;
  }

  Alert.alert(
    'Confirmar alerta SOS',
    mensagem,
    [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Enviar alerta', onPress: enviarSOS },
    ]
  );
}

  // SAÍDA RÁPIDA: popToTop() fecha todas as telas empilhadas e volta direto
  // para a primeira tela do Stack (a fachada), sem passar pelo PIN.
   function sairRapido() {
    navigation.popToTop();
  }
  // Cartões da área de apoio. A lista é desenhada com .map() mais abaixo e
  // cada cartão tem um onPress próprio.
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
      onPress: () => navigation.navigate('Ligar190'),
    },
    {
      titulo: 'Rede de Contatos',
      texto: 'Pessoas de confiança',
      icone: 'people-outline',
      onPress: () => navigation.navigate('RedeApoio'),
    },
    {
       titulo: 'Enviar Alerta SOS',
      texto: 'Enviar sua localização para a central de monitoramento',
      icone: 'location',
      onPress: () => confirmarSOS(),  
    },
  ];

  return (
    <SafeAreaView style={estilos.tela}>
      <View style={estilos.cabecalho}>
        {/* A seta também usa popToTop: voltar uma tela levaria de novo ao PIN,
        o que revelaria a área restrita. */}
        <TouchableOpacity onPress={() => navigation.popToTop()}>
          <Ionicons name="arrow-back" size={26} color={cores.vermelho} />
        </TouchableOpacity>
        <Text style={estilos.titulo}>Área de Apoio</Text>
      </View>

      <View style={estilos.conteudo}>
        <View style={estilos.boasVindas}>
          <View style={estilos.boasVindasTexto}>
            <Text style={estilos.destaque}>Você não está sozinha</Text>
            <Text style={estilos.texto}>
              Aqui você encontra ajuda, orientações e canais de apoio.{'\n'}
              Sua segurança importa !!
            </Text>
          </View>
          <Image
            source={require('../../assets/mascote-apoio.png')}
            style={estilos.mascote}
            resizeMode="contain"
          />
        </View>

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

        <Text style={estilos.rodape}>
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
  boasVindas: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  boasVindasTexto: { flex: 1, paddingRight: 10 },
  mascote: { width: 90, height: 80 },
  destaque: { fontSize: 18, fontWeight: 'bold' },
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
  rodape: { fontSize: 10, color: cores.cinza, textAlign: 'center', marginTop: 16 },
});