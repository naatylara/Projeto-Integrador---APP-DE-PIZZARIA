import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cores } from '../theme';
import { tamanhos, precoUnitario } from '../data/pizzas';
import { useCarrinho } from '../context/CarrinhoContext';
import { formatarPreco } from '../utils/formatar';
import Cabecalho from '../components/Cabecalho';
import BarraInferior from '../components/BarraInferior';

export default function Pizza({ route, navigation }) {
  const { pizza } = route.params;
  const [tamanho, setTamanho] = useState('Média');
  const [quantidade, setQuantidade] = useState(1);
  const { adicionar } = useCarrinho();

  function adicionarAoCarrinho() {
    adicionar(pizza, tamanho, quantidade);
    navigation.navigate('Carrinho');
  }

  return (
    <SafeAreaView style={estilos.tela}>
      <Cabecalho titulo="Detalhes da Pizza" navigation={navigation} />

      <ScrollView contentContainerStyle={estilos.conteudo}>
        <Image source={pizza.imagem} style={estilos.imagem} />
        <Text style={estilos.nome}>{pizza.nome}</Text>
        <Text style={estilos.descricao}>{pizza.descricao}</Text>
        <Text style={estilos.preco}>{formatarPreco(precoUnitario(pizza, tamanho))}</Text>

        <Text style={estilos.rotulo}>Tamanho:</Text>
        <View style={estilos.linhaTamanhos}>
          {tamanhos.map((t) => {
            const ativo = tamanho === t.nome;
            return (
              <View key={t.nome} style={estilos.colunaTamanho}>
                <TouchableOpacity
                  style={[estilos.botaoTamanho, ativo && estilos.botaoTamanhoAtivo]}
                  onPress={() => setTamanho(t.nome)}
                >
                  <Text style={[estilos.textoTamanho, ativo && { color: cores.branco }]}>
                    {t.nome}
                  </Text>
                </TouchableOpacity>
                <Text style={estilos.pedacos}>{t.pedacos} pedaços</Text>
              </View>
            );
          })}
        </View>

        <Text style={estilos.rotulo}>Quantidade</Text>
        <View style={estilos.linhaQuantidade}>
          <TouchableOpacity
            style={estilos.botaoQtd}
            onPress={() => setQuantidade(quantidade + 1)}
          >
            <Text style={estilos.textoQtd}>+</Text>
          </TouchableOpacity>
          <View style={estilos.visorQtd}>
            <Text style={estilos.textoQtd}>{quantidade}</Text>
          </View>
          <TouchableOpacity
            style={estilos.botaoQtd}
            onPress={() => setQuantidade(Math.max(1, quantidade - 1))}
          >
            <Text style={estilos.textoQtd}>-</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={estilos.botaoPrincipal} onPress={adicionarAoCarrinho}>
          <Text style={estilos.botaoPrincipalTexto}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </ScrollView>

      <BarraInferior navigation={navigation} ativa="Cardapio" />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { paddingHorizontal: 20, paddingBottom: 20 },
  imagem: { width: '100%', height: 260, borderRadius: 20 },
  nome: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 14 },
  descricao: { fontSize: 13, color: cores.cinza, textAlign: 'center', marginTop: 4 },
  preco: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  rotulo: { fontSize: 14, color: cores.cinza, marginTop: 16, marginBottom: 6 },
  linhaTamanhos: { flexDirection: 'row', justifyContent: 'space-around' },
  colunaTamanho: { alignItems: 'center' },
  botaoTamanho: {
    backgroundColor: cores.rosaClaro,
    paddingVertical: 10,
    paddingHorizontal: 34,
    borderRadius: 10,
  },
  botaoTamanhoAtivo: { backgroundColor: cores.vermelho },
  textoTamanho: { fontSize: 16, fontWeight: 'bold', color: cores.texto },
  pedacos: { fontSize: 12, color: cores.cinza, marginTop: 4 },
  linhaQuantidade: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  botaoQtd: {
    width: 56,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cores.cinzaClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visorQtd: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    backgroundColor: cores.rosaClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoQtd: { fontSize: 18, fontWeight: 'bold' },
  botaoPrincipal: {
    backgroundColor: cores.vermelho,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoPrincipalTexto: { color: cores.branco, fontSize: 16, fontWeight: 'bold' },
});