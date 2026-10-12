import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme';
import { precoUnitario, pedacosDoTamanho, taxaEntrega } from '../data/pizzas';
import { useCarrinho } from '../context/CarrinhoContext';
import { formatarPreco } from '../utils/formatar';
import Cabecalho from '../components/Cabecalho';
import BarraInferior from '../components/BarraInferior';

export default function Carrinho({ navigation }) {
  const { itens, alterarQuantidade, remover, limpar, subtotal, total } = useCarrinho();

  const lixeira = (
    <TouchableOpacity onPress={limpar}>
      <Ionicons name="trash-outline" size={24} color={cores.vermelho} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={estilos.tela}>
      <Cabecalho titulo="Carrinho" navigation={navigation} direita={lixeira} />

      <ScrollView contentContainerStyle={estilos.conteudo}>
        {itens.length === 0 && (
          <Text style={estilos.vazio}>Seu carrinho está vazio.</Text>
        )}

        {itens.map((item, indice) => (
          <View key={`${item.pizza.id}-${item.tamanho}`} style={estilos.item}>
            <View style={estilos.linhaTopo}>
              <Image source={item.pizza.imagem} style={estilos.imagem} />
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={estilos.nome}>{item.pizza.nome}</Text>
                <Text style={estilos.detalhe}>
                  {item.tamanho} - {pedacosDoTamanho(item.tamanho)} pedaços
                </Text>
                <Text style={estilos.detalhe}>{item.quantidade} und</Text>
                <Text style={estilos.preco}>
                  {formatarPreco(precoUnitario(item.pizza, item.tamanho) * item.quantidade)}
                </Text>
              </View>
            </View>

            <View style={estilos.linhaQtd}>
              <TouchableOpacity style={estilos.botaoQtd} onPress={() => alterarQuantidade(indice, 1)}>
                <Text style={estilos.textoQtd}>+</Text>
              </TouchableOpacity>
              <View style={estilos.visorQtd}>
                <Text style={estilos.textoQtd}>{item.quantidade}</Text>
              </View>
              <TouchableOpacity style={estilos.botaoQtd} onPress={() => alterarQuantidade(indice, -1)}>
                <Text style={estilos.textoQtd}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => remover(indice)}>
                <Ionicons name="trash-outline" size={26} color={cores.vermelho} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={estilos.resumo}>
        <View style={estilos.linhaResumo}>
          <Text>Subtotal</Text>
          <Text>{formatarPreco(subtotal)}</Text>
        </View>
        <View style={estilos.linhaResumo}>
          <Text>Taxa de entrega</Text>
          <Text>{formatarPreco(itens.length > 0 ? taxaEntrega : 0)}</Text>
        </View>
        <View style={[estilos.linhaResumo, estilos.linhaTotal]}>
          <Text style={estilos.totalTexto}>TOTAL</Text>
          <Text style={estilos.totalTexto}>{formatarPreco(total)}</Text>
        </View>

        <TouchableOpacity
          style={[estilos.botaoPrincipal, itens.length === 0 && { opacity: 0.5 }]}
          disabled={itens.length === 0}
          onPress={() => navigation.navigate('Finalizar')}
        >
          <Text style={estilos.botaoPrincipalTexto}>Finalizar Pedido</Text>
        </TouchableOpacity>
      </View>

      <BarraInferior navigation={navigation} ativa="Carrinho" />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { paddingHorizontal: 16, paddingBottom: 10 },
  vazio: { textAlign: 'center', color: cores.cinza, marginTop: 40 },
  item: { borderBottomWidth: 1, borderBottomColor: cores.rosaClaro, paddingVertical: 12 },
  linhaTopo: { flexDirection: 'row' },
  imagem: { width: 80, height: 80, borderRadius: 10 },
  nome: { fontSize: 16, fontWeight: 'bold' },
  detalhe: { fontSize: 12, color: cores.cinza },
  preco: { fontSize: 15, fontWeight: 'bold', marginTop: 2 },
  linhaQtd: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  botaoQtd: {
    width: 44,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: cores.cinzaClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visorQtd: {
    width: 70,
    height: 34,
    borderRadius: 10,
    backgroundColor: cores.rosaClaro,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoQtd: { fontSize: 16, fontWeight: 'bold' },
  resumo: { paddingHorizontal: 16, paddingVertical: 10 },
  linhaResumo: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 },
  linhaTotal: { marginTop: 6 },
  totalTexto: { fontSize: 16, fontWeight: 'bold' },
  botaoPrincipal: {
    backgroundColor: cores.vermelho,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  botaoPrincipalTexto: { color: cores.branco, fontSize: 16, fontWeight: 'bold' },
});