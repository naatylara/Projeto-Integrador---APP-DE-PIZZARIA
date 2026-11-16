// ============================================================
// TELA: "Rede de Contatos".
//
// Faz parte da Área de Apoio, escondida atrás da fachada de
// pizzaria. Permite cadastrar, visualizar, editar e excluir
// contatos de confiança, informando nome, telefone, relação
// e prioridade.
//
// Utiliza useState para controlar os dados e o formulário,
// além de permitir a saída rápida para a tela inicial.
//
// Na Entrega 3, os dados são temporários. Na Entrega 4,
// serão integrados à API para armazenamento permanente.
// ============================================================




import React, { useState, useEffect } from 'react';
import {   View,   Text,  TextInput,  TouchableOpacity,  FlatList,  Alert,  StyleSheet,  Platform,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme';

export default function RedeApoio({ navigation }) {
  const [contatos, setContatos] = useState([]);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [relacao, setRelacao] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    // Entrega 3: dados temporários em useState.
    // Entrega 4: aqui consultaremos a API real.
  }, []);

  function limparFormulario() {
    setNome('');
    setTelefone('');
    setRelacao('');
    setPrioridade('');
    setEditandoId(null);
  }

  function salvarContato() {
    if (
      !nome.trim() ||
      !telefone.trim() ||
      !relacao.trim() ||
      !prioridade.trim()
    ) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    const numeroPrioridade = Number(prioridade);

    if (
      !Number.isInteger(numeroPrioridade) ||
      numeroPrioridade < 1
    ) {
      Alert.alert(
        'Atenção',
        'A prioridade deve ser um número inteiro maior que zero.'
      );
      return;
    }

    const dados = {
      nome: nome.trim(),
      telefone: telefone.trim(),
      relacao: relacao.trim(),
      prioridade: numeroPrioridade,
    };

    if (editandoId !== null) {
      setContatos((anteriores) =>
        anteriores.map((contato) =>
          contato.id === editandoId
            ? { ...contato, ...dados }
            : contato
        )
      );

      Alert.alert('Sucesso', 'Contato atualizado!');
    } else {
      const novoContato = {
        id: `${Date.now()}-${Math.random()}`,
        ...dados,
      };

      setContatos((anteriores) => [
        ...anteriores,
        novoContato,
      ]);

      Alert.alert('Sucesso', 'Contato cadastrado!');
    }

    limparFormulario();
  }

  function editarContato(contato) {
    setEditandoId(contato.id);
    setNome(contato.nome);
    setTelefone(contato.telefone);
    setRelacao(contato.relacao);
    setPrioridade(String(contato.prioridade));
  }

  
function excluirContato(id) {
  function confirmarExclusao() {
    setContatos((anteriores) =>
      anteriores.filter((contato) => contato.id !== id)
    );

    if (editandoId === id) {
      limparFormulario();
    }
  }

  if (Platform.OS === 'web') {
    const confirmou = window.confirm(
      'Deseja realmente excluir este contato?'
    );

    if (confirmou) {
      confirmarExclusao();
    }
  } else {
    Alert.alert(
      'Excluir contato',
      'Deseja realmente excluir este contato?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: confirmarExclusao,
        },
      ]
    );
  }
}

  function sairRapido() {
    navigation.popToTop();
  }

  function renderizarContato({ item }) {
    return (
      <View style={estilos.cartao}>
        <Text style={estilos.nomeContato}>
          {item.nome}
        </Text>

        <Text style={estilos.detalhe}>
          Telefone: {item.telefone}
        </Text>

        <Text style={estilos.detalhe}>
          Relação: {item.relacao}
        </Text>

        <Text style={estilos.detalhe}>
          Prioridade: {item.prioridade}
        </Text>

        <View style={estilos.acoes}>
          <TouchableOpacity
            style={estilos.botaoEditar}
            onPress={() => editarContato(item)}
          >
            <Ionicons
              name="create-outline"
              size={18}
              color={cores.vermelho}
            />
            <Text style={estilos.textoEditar}>
              Editar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={estilos.botaoExcluir}
            onPress={() => excluirContato(item.id)}
          >
            <Ionicons
              name="trash-outline"
              size={18}
              color={cores.branco}
            />
            <Text style={estilos.textoBotao}>
              Excluir
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={estilos.tela}>
      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id}
        renderItem={renderizarContato}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={estilos.conteudo}
        ListHeaderComponent={
          <View>
            <View style={estilos.cabecalho}>
              <TouchableOpacity
                onPress={sairRapido}
              >
                <Ionicons
                  name="arrow-back"
                  size={26}
                  color={cores.vermelho}
                />
              </TouchableOpacity>

              <Text style={estilos.titulo}>
                Rede de Apoio
              </Text>
            </View>

            <Text style={estilos.descricao}>
              Cadastre pessoas de confiança que
              poderão fazer parte da sua rede de apoio.
            </Text>

            <Text style={estilos.aviso}>
              Protótipo acadêmico: utilize apenas
              informações fictícias.
            </Text>

            <TextInput
              style={estilos.campo}
              placeholder="Nome do contato"
              value={nome}
              onChangeText={setNome}
            />

            <TextInput
              style={estilos.campo}
              placeholder="Telefone"
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
            />

            <TextInput
              style={estilos.campo}
              placeholder="Relação (mãe, irmã, amiga...)"
              value={relacao}
              onChangeText={setRelacao}
            />

            <TextInput
              style={estilos.campo}
              placeholder="Prioridade (1, 2, 3...)"
              value={prioridade}
              onChangeText={setPrioridade}
              keyboardType="number-pad"
            />

            <TouchableOpacity
              style={estilos.botaoPrincipal}
              onPress={salvarContato}
            >
              <Text style={estilos.textoBotao}>
                {editandoId !== null
                  ? 'Salvar alterações'
                  : 'Cadastrar contato'}
              </Text>
            </TouchableOpacity>

            {editandoId !== null && (
              <TouchableOpacity
                onPress={limparFormulario}
              >
                <Text style={estilos.cancelar}>
                  Cancelar edição
                </Text>
              </TouchableOpacity>
            )}

            <Text style={estilos.subtitulo}>
              Contatos cadastrados
            </Text>
          </View>
        }
        ListEmptyComponent={
          <Text style={estilos.vazio}>
            Nenhum contato cadastrado.
          </Text>
        }
        ListFooterComponent={
          <TouchableOpacity
            style={estilos.botaoSair}
            onPress={sairRapido}
          >
            <Ionicons
              name="exit-outline"
              size={22}
              color={cores.branco}
            />
            <Text style={estilos.textoBotao}>
              SAIR RÁPIDO
            </Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: 20,
    paddingBottom: 40,
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: cores.vermelho,
    marginLeft: 14,
  },
  descricao: {
    fontSize: 14,
    color: cores.texto,
    marginBottom: 10,
  },
  aviso: {
    fontSize: 12,
    color: cores.cinza,
    marginBottom: 20,
  },
  campo: {
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.cinzaClaro,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
  },
  botaoPrincipal: {
    backgroundColor: cores.vermelho,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: cores.branco,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.texto,
    marginTop: 25,
    marginBottom: 15,
  },
  vazio: {
    textAlign: 'center',
    color: cores.cinza,
    marginBottom: 20,
  },
  cartao: {
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.cinzaClaro,
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  nomeContato: {
    fontSize: 17,
    fontWeight: 'bold',
    color: cores.vermelho,
    marginBottom: 8,
  },
  detalhe: {
    fontSize: 13,
    color: cores.texto,
    marginBottom: 4,
  },
  acoes: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  botaoEditar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: cores.vermelho,
    borderRadius: 8,
    padding: 10,
  },
  textoEditar: {
    color: cores.vermelho,
    fontWeight: 'bold',
  },
  botaoExcluir: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: cores.vermelho,
    borderRadius: 8,
    padding: 10,
  },
  cancelar: {
    textAlign: 'center',
    color: cores.vermelho,
    marginTop: 12,
  },
  botaoSair: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: cores.vermelho,
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
});
