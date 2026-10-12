import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cores } from '../theme';
import { taxaEntrega } from '../data/pizzas';
import { useCarrinho } from '../context/CarrinhoContext';
import { formatarPreco } from '../utils/formatar';
import Cabecalho from '../components/Cabecalho';
import BarraInferior from '../components/BarraInferior';

const formasPagamento = ['Cartão de Crédito', 'Pix', 'Dinheiro'];

export default function FinalizarPedido({ navigation }) {
  const { itens, subtotal, total, limpar } = useCarrinho();
  const [endereco, setEndereco] = useState('Rua das Flores, nº 23\nJardim Rosa - Londrina/PR');
  const [editando, setEditando] = useState(false);
  const [pagamento, setPagamento] = useState('Cartão de Crédito');
  const [observacao, setObservacao] = useState('');

  function confirmar() {
    const codigo = Math.floor(1000 + Math.random() * 9000);
    navigation.replace('Confirmado', { codigo });
    limpar();
  }

  return (
    <SafeAreaView style={estilos.tela}>
      <Cabecalho titulo="Finalizar Pedido" navigation={navigation} />

      <ScrollView contentContainerStyle={estilos.conteudo}>
        <Text style={estilos.rotulo}>Endereço de entrega:</Text>
        <View style={estilos.linhaEndereco}>
          {editando ? (
            <TextInput
              style={estilos.inputEndereco}
              value={endereco}
              onChangeText={setEndereco}
              multiline
            />
          ) : (
            <Text style={estilos.endereco}>{endereco}</Text>
          )}
          <TouchableOpacity onPress={() => setEditando(!editando)}>
            <Text style={estilos.alterar}>{editando ? 'Salvar' : 'Alterar'}</Text>
          </TouchableOpacity>
        </View>

        <View style={estilos.divisor} />

        <Text style={estilos.rotulo}>Forma de Pagamento:</Text>
        {formasPagamento.map((forma) => (
          <TouchableOpacity
            key={forma}
            style={estilos.opcao}
            onPress={() => setPagamento(forma)}
          >
            <View style={estilos.radio}>
              {pagamento === forma && <View style={estilos.radioMarcado} />}
            </View>
            <Text style={estilos.opcaoTexto}>{forma}</Text>
          </TouchableOpacity>
        ))}

        <View style={estilos.divisor} />

        <Text style={estilos.rotulo}>Observação:</Text>
        <TextInput
          style={estilos.observacao}
          placeholder="Ex: sem cebola, por favor"
          placeholderTextColor={cores.cinza}
          value={observacao}
          onChangeText={setObservacao}
          multiline
        />

        <View style={estilos.divisor} />

        <View style={estilos.linhaResumo}>
          <Text>Subtotal</Text>
          <Text>{formatarPreco(subtotal)}</Text>
        </View>
        <View style={estilos.linhaResumo}>
          <Text>Taxa de entrega</Text>
          <Text>{formatarPreco(itens.length > 0 ? taxaEntrega : 0)}</Text>
        </View>
        <View style={[estilos.linhaResumo, { marginTop: 6 }]}>
          <Text style={estilos.totalTexto}>TOTAL</Text>
          <Text style={estilos.totalTexto}>{formatarPreco(total)}</Text>
        </View>

        <TouchableOpacity
          style={[estilos.botaoPrincipal, itens.length === 0 && { opacity: 0.5 }]}
          disabled={itens.length === 0}
          onPress={confirmar}
        >
          <Text style={estilos.botaoPrincipalTexto}>Confirmar Pedido</Text>
        </TouchableOpacity>
      </ScrollView>

      <BarraInferior navigation={navigation} ativa="Carrinho" />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { paddingHorizontal: 20, paddingBottom: 20 },
  rotulo: { fontSize: 14, fontWeight: 'bold', marginTop: 6, marginBottom: 6 },
  linhaEndereco: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  endereco: { flex: 1, fontSize: 13, color: cores.cinza },
  inputEndereco: {
    flex: 1,
    fontSize: 13,
    borderWidth: 1,
    borderColor: cores.cinzaClaro,
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
    backgroundColor: cores.branco,
  },
  alterar: { color: cores.vermelho, fontWeight: 'bold', fontSize: 13 },
  divisor: { height: 1, backgroundColor: cores.rosaClaro, marginVertical: 12 },
  opcao: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: cores.texto,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioMarcado: { width: 10, height: 10, borderRadius: 5, backgroundColor: cores.texto },
  opcaoTexto: { marginLeft: 10, fontSize: 14 },
  observacao: {
    height: 80,
    borderWidth: 1,
    borderColor: cores.cinzaClaro,
    borderRadius: 10,
    padding: 10,
    backgroundColor: cores.branco,
    textAlignVertical: 'top',
  },
  linhaResumo: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 },
  totalTexto: { fontSize: 16, fontWeight: 'bold' },
  botaoPrincipal: {
    backgroundColor: cores.vermelho,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  botaoPrincipalTexto: { color: cores.branco, fontSize: 16, fontWeight: 'bold' },
});