
 // ============================================================
 // ÁREA DE APOIO
 //
 // Área acessada pelo mecanismo oculto do cardápio.
 //
 // O alerta SOS possui destaque visual e aparece primeiro.
 // Abaixo ficam os canais 180 e 190, a Rede de Contatos
 // e o botão de Saída Rápida.
 //
 // Os alertas SOS são SIMULADOS para fins acadêmicos.
 // São registrados pela API e exibidos no painel do projeto.
 // Não acionam serviços reais de emergência.
 // ============================================================

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme';
import * as Location from 'expo-location';

const API_URL = 'http://localhost:3333';

export default function AreaApoio({ navigation }) {
  const [aviso, setAviso] = useState('');
  const [enviandoSOS, setEnviandoSOS] = useState(false);
  const [modalSucesso, setModalSucesso] = useState(false);
  const [numeroAlerta, setNumeroAlerta] = useState(null);

  // ============================================================
  // ENVIO DO ALERTA SOS
  // Mantém a integração com a API e a localização.
  // ============================================================

  async function enviarSOS() {
    if (enviandoSOS) return;

    setEnviandoSOS(true);
    setAviso('');

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

      setNumeroAlerta(alerta.id);
      setModalSucesso(true);

    } catch (erro) {
      console.log('Erro SOS:', erro);
      setAviso('Não foi possível registrar o SOS. Verifique a API.');
    } finally {
      setEnviandoSOS(false);
    }
  }

  // Confirmação antes de registrar o alerta.
  function confirmarSOS() {
    if (enviandoSOS) return;

    const mensagem =
      'Deseja registrar um alerta SOS demonstrativo com sua localização?';

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
        { text: 'Registrar alerta', onPress: enviarSOS },
      ]
    );
  }

  // Retorna diretamente à fachada da pizzaria.
  function sairRapido() {
    navigation.popToTop();
  }

  const canais = [
    {
      titulo: 'LIGAR 180',
      texto: 'Orientação e denúncia',
      icone: 'call',
      onPress: () => navigation.navigate('Ligar180'),
    },
    {
      titulo: 'LIGAR 190',
      texto: 'Emergência policial',
      icone: 'shield',
      onPress: () => navigation.navigate('Ligar190'),
    },
  ];

  return (
    <SafeAreaView style={estilos.tela}>
      <View style={estilos.cabecalho}>
        <TouchableOpacity
          onPress={sairRapido}
          accessibilityLabel="Voltar à pizzaria"
        >
          <Ionicons
            name="arrow-back"
            size={26}
            color={cores.vermelho}
          />
        </TouchableOpacity>

        <Text style={estilos.titulo}>Área de Apoio</Text>
      </View>

      <ScrollView
        style={estilos.rolagem}
        contentContainerStyle={estilos.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* BOAS-VINDAS E MASCOTE */}
        <View style={estilos.boasVindas}>
          <View style={estilos.boasVindasTexto}>
            <Text style={estilos.destaque}>
              Você não está sozinha
            </Text>

            <Text style={estilos.texto}>
              Aqui você encontra orientações e canais de apoio.
              {'\n'}Sua segurança importa!
            </Text>
          </View>

          <Image
            source={require('../../assets/mascote-apoio.png')}
            style={estilos.mascote}
            resizeMode="contain"
          />
        </View>

        {/* SOS EM DESTAQUE — PRIMEIRO BOTÃO */}
        <TouchableOpacity
          style={[
            estilos.botaoSOS,
            enviandoSOS && estilos.botaoDesativado,
          ]}
          onPress={confirmarSOS}
          disabled={enviandoSOS}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Registrar alerta SOS demonstrativo"
        >
          <Ionicons
            name="alert-circle"
            size={38}
            color={cores.branco}
          />

          <Text style={estilos.sosTitulo}>
            {enviandoSOS
              ? 'REGISTRANDO ALERTA...'
              : 'ENVIAR ALERTA SOS'}
          </Text>

          <Text style={estilos.sosDescricao}>
            Registrar alerta com localização (simulação)
          </Text>
        </TouchableOpacity>

        {/* CANAIS DE ATENDIMENTO */}
        <View style={estilos.grade}>
          {canais.map((canal) => (
            <TouchableOpacity
              key={canal.titulo}
              style={estilos.cartao}
              onPress={canal.onPress}
              activeOpacity={0.8}
            >
              <Ionicons
                name={canal.icone}
                size={32}
                color={cores.vermelho}
              />

              <Text style={estilos.cartaoTitulo}>
                {canal.titulo}
              </Text>

              <Text style={estilos.cartaoTexto}>
                {canal.texto}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* REDE DE CONTATOS */}
        <TouchableOpacity
          style={estilos.cartaoRede}
          onPress={() => navigation.navigate('RedeApoio')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="people-outline"
            size={32}
            color={cores.vermelho}
          />

          <Text style={estilos.cartaoTitulo}>
            Rede de Contatos
          </Text>

          <Text style={estilos.cartaoTexto}>
            Pessoas de confiança
          </Text>
        </TouchableOpacity>

        {/* RETORNO SOBRE O ENVIO */}
        {aviso !== '' && (
          <Text
            style={estilos.aviso}
            accessibilityRole="alert"
          >
            {aviso}
          </Text>
        )}
      </ScrollView>

      {/* SAÍDA RÁPIDA SEMPRE VISÍVEL */}
      <View style={estilos.rodape}>
        <TouchableOpacity
          style={estilos.botaoSair}
          onPress={sairRapido}
          activeOpacity={0.8}
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
      {/* MODAL DE SUCESSO */}
      <Modal
        visible={modalSucesso}
        transparent
        animationType="fade"
        onRequestClose={() => setModalSucesso(false)}
      >
        <View style={estilos.modalFundo}>
          <View style={estilos.modalConteudo}>

            <Ionicons
              name="checkmark-circle"
              size={72}
              color="#16803D"
            />

            <Text style={estilos.modalTitulo}>
              Alerta registrado!
            </Text>

            <Text style={estilos.modalTexto}>
              Seu alerta SOS nº {numeroAlerta} foi registrado
              com sucesso no painel demonstrativo.
            </Text>

            <Text style={estilos.modalObservacao}>
              Este é um protótipo acadêmico.
              O alerta não aciona automaticamente
              serviços de emergência.
            </Text>

            <TouchableOpacity
              style={estilos.modalBotao}
              onPress={() => setModalSucesso(false)}
            >
              <Text style={estilos.modalBotaoTexto}>
                ENTENDI
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
  },

  titulo: {
    fontSize: 20,
    fontWeight: '900',
    color: cores.vermelho,
    marginLeft: 14,
  },

  rolagem: {
    flex: 1,
  },

  conteudo: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  boasVindas: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  boasVindasTexto: {
    flex: 1,
    paddingRight: 10,
  },

  mascote: {
    width: 90,
    height: 80,
  },

  destaque: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.texto,
  },

  texto: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 8,
    color: cores.texto,
  },

  // Botão SOS com destaque visual.
  botaoSOS: {
    width: '100%',
    backgroundColor: cores.vermelho,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 14,
    elevation: 4,
    shadowColor: '#85001D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 6,
  },

  botaoDesativado: {
    opacity: 0.65,
  },

  sosTitulo: {
    fontSize: 20,
    fontWeight: '900',
    color: cores.branco,
    marginTop: 6,
    textAlign: 'center',
  },

  sosDescricao: {
    fontSize: 12,
    color: cores.branco,
    textAlign: 'center',
    marginTop: 5,
  },

  // Ligar 180 e 190 lado a lado.
  grade: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 14,
  },

  cartao: {
    flex: 1,
    borderWidth: 2,
    borderColor: cores.vermelho,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    minHeight: 115,
  },

  cartaoTitulo: {
    fontSize: 15,
    fontWeight: '900',
    color: cores.vermelho,
    marginTop: 4,
    textAlign: 'center',
  },

  cartaoTexto: {
    fontSize: 11,
    color: cores.cinza,
    textAlign: 'center',
    marginTop: 3,
  },

  // Rede de Contatos ocupando toda a largura.
  cartaoRede: {
    width: '100%',
    borderWidth: 2,
    borderColor: cores.vermelho,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    minHeight: 110,
  },

  aviso: {
    fontSize: 12,
    color: cores.cinza,
    textAlign: 'center',
    marginTop: 14,
  },

  // Rodapé fixo para facilitar a saída rápida.
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
  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  modalConteudo: {
    backgroundColor: cores.fundo,
    width: '100%',
    maxWidth: 420,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    elevation: 10,
  },

  modalTitulo: {
    fontSize: 23,
    fontWeight: '900',
    color: '#16803D',
    marginTop: 12,
    textAlign: 'center',
  },

  modalTexto: {
    fontSize: 15,
    color: cores.texto,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 23,
  },

  modalObservacao: {
    fontSize: 12,
    color: cores.cinza,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 18,
  },

  modalBotao: {
    backgroundColor: cores.vermelho,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
  },

  modalBotaoTexto: {
    color: cores.branco,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
