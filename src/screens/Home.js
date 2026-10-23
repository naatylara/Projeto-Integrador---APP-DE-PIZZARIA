// ============================================================
// TELA 1 do protótipo da Entrega 1: "Tela Inicial" da fachada.
//
// Mostra a marca "Pede Pizza Já", o mascote e o botão "Ver Cardápio".
// É a primeira tela registrada no Stack (App.js), então é a que abre
// junto com o app. Também é a tela para onde a saída rápida volta.
// ============================================================

import React from 'react';
import {  View,  Text,  Image,  TouchableOpacity,  StyleSheet,} from 'react-native';
import { cores } from '../theme';

export default function Home({ navigation }) {
  return (
    <View style={estilos.tela}>
      {/* Foto ancorada no rodapé, com a proporção original (2:3) */}
      <Image
        source={require('../../assets/fundo-inicial.png')}
        style={estilos.fundo}
        resizeMode="cover"
      />

      <View style={estilos.camada}>
        <View style={estilos.faixa}>
          <Text style={estilos.marca}>Pede Pizza Já</Text>
        </View>

        <Image
          source={require('../../assets/mascote.png')}
          style={estilos.mascote}
          resizeMode="contain"
        />

        <Text style={estilos.slogan}>Sabor em cada fatia</Text>
        <Text style={estilos.frase}>
          As melhores pizzas,{'\n'}no conforto da sua casa!
        </Text>

        <TouchableOpacity
          style={estilos.botao}
          onPress={() => navigation.navigate('Cardapio')}
        >
          <Text style={estilos.botaoTexto}>Ver Cardápio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  // Cor igual à da madeira do topo da foto, para fundir com a imagem
  tela: { flex: 1, backgroundColor: '#17110e', overflow: 'hidden' },
  fundo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    aspectRatio: 2 / 3,
  },
  camada: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  faixa: {
    backgroundColor: cores.vermelho,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    transform: [{ rotate: '-4deg' }],
  },
  marca: { color: cores.rosaClaro, fontSize: 34, fontWeight: '900' },
  mascote: { width: 150, height: 150, marginTop: 16 },
  slogan: {
    color: cores.branco,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  frase: {
    color: cores.branco,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
  },
  botao: {
    backgroundColor: cores.vermelho,
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 14,
    marginTop: 28,
  },
  botaoTexto: { color: cores.branco, fontSize: 18, fontWeight: 'bold' },
});