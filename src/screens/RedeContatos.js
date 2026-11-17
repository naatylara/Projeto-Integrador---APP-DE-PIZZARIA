
 // ============================================================
 // TELA: "Rede de Contatos".
 //
 // Faz parte da Área de Apoio, escondida atrás da fachada de
 // pizzaria. Permite cadastrar, visualizar, editar e excluir
 // contatos de confiança, informando nome, telefone, relação
 // e prioridade.
 //
 // ENTREGA 4:
 // Consulta os contatos cadastrados na API REST.
 // Cadastro, edição e exclusão ainda utilizam useState
 // até serem integrados às respectivas rotas da API.
 // ============================================================

import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme';

// ============================================================
// ENDEREÇO DA API REST
//
// Para os testes no navegador do computador.
// ============================================================
const API_URL = 'http://localhost:3333';

export default function RedeApoio({ navigation }) {

  // ============================================================
  // ESTADOS DA TELA
  // ============================================================
  const [contatos, setContatos] = useState([]);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [relacao, setRelacao] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  // ============================================================
  // MÁSCARA AUTOMÁTICA DO TELEFONE
  //
  // Exemplo: 43999999999
  // Resultado: (43)9.9999-9999
  //
  // Remove caracteres não numéricos e limita a 11 dígitos.
  // ============================================================
  function formatarTelefone(valor) {
    const numeros = String(valor || '')
      .replace(/\D/g, '')
      .slice(0, 11);

    if (numeros.length === 0) {
      return '';
    }

    if (numeros.length <= 2) {
      return `(${numeros}`;
    }

    if (numeros.length <= 3) {
      return `(${numeros.slice(0, 2)})${numeros.slice(2)}`;
    }

    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)})${numeros.slice(2, 3)}.${numeros.slice(3)}`;
    }

    return `(${numeros.slice(0, 2)})${numeros.slice(2, 3)}.${numeros.slice(3, 7)}-${numeros.slice(7)}`;
  }

  // ============================================================
  // ENTREGA 4: CONSULTAR CONTATOS NA API
  //
  // Quando a tela é aberta, consulta GET /contatos.
  // ============================================================
  useEffect(() => {
    let ativo = true;

    async function carregarContatos() {
      try {
        const resposta = await fetch(`${API_URL}/contatos`);

        if (!resposta.ok) {
          throw new Error('Erro ao consultar contatos.');
        }

        const dados = await resposta.json();

        if (ativo) {
          setContatos(dados);
        }

      } catch (erro) {
        console.error('Erro ao carregar contatos:', erro);
      }
    }

    carregarContatos();

    return () => {
      ativo = false;
    };
  }, []);

  // ============================================================
  // LIMPAR FORMULÁRIO
  // ============================================================
  function limparFormulario() {
    setNome('');
    setTelefone('');
    setRelacao('');
    setPrioridade('');
    setEditandoId(null);
  }

  // ============================================================
  // MENSAGENS DE AVISO
  //
  // No navegador utiliza window.alert.
  // No celular utiliza Alert.alert.
  // ============================================================
  function mostrarAviso(titulo, mensagem) {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n${mensagem}`);
    } else {
      Alert.alert(titulo, mensagem);
    }
  }

  
  // ============================================================
  // ENTREGA 4: CADASTRAR CONTATOS NA API REST
  //
  // POST /contatos: envia os dados para o servidor.
  // PUT /contatos/:id será integrado na próxima etapa.
  // ============================================================
  async function salvarContato() {

    // Verifica se todos os campos foram preenchidos.
    if (
      !nome.trim() ||
      !telefone.trim() ||
      !relacao.trim() ||
      !prioridade.trim()
    ) {
      mostrarAviso('Atenção', 'Preencha todos os campos.');
      return;
    }

    // Valida a prioridade.
    const numeroPrioridade = Number(prioridade);

    if (
      !Number.isInteger(numeroPrioridade) ||
      numeroPrioridade < 1
    ) {
      mostrarAviso(
        'Atenção',
        'A prioridade deve ser um número inteiro maior que zero.'
      );
      return;
    }

    // Remove a máscara para enviar somente os números.
    const telefoneNumeros = telefone.replace(/\D/g, '');

    if (telefoneNumeros.length !== 11) {
      mostrarAviso(
        'Atenção',
        'Informe um telefone com DDD e 11 números.'
      );
      return;
    }

    const dados = {
      nome: nome.trim(),
      telefone: telefoneNumeros,
      relacao: relacao.trim(),
      prioridade: numeroPrioridade,
      usuarioId: 1, // Usuário fictício cadastrado na API.
    };

    
    // ============================================================
    // ENTREGA 4: EDITAR CONTATO NA API REST
    //
    // PUT /contatos/:id
    // Envia os dados atualizados para o servidor e salva no JSON.
    // ============================================================
    if (editandoId !== null) {
      try {
        const resposta = await fetch(
          `${API_URL}/contatos/${editandoId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
          }
        );

        // Verifica se o servidor aceitou a alteração.
        if (!resposta.ok) {
          throw new Error('Não foi possível editar o contato.');
        }

        // Recebe o contato atualizado da API.
        const contatoAtualizado = await resposta.json();

        // Atualiza a lista na tela sem precisar recarregar.
        setContatos((anteriores) =>
          anteriores.map((contato) =>
            contato.id === editandoId
              ? contatoAtualizado
              : contato
          )
        );

        // Limpa os campos e sai do modo de edição.
        limparFormulario();

        mostrarAviso(
          'Sucesso',
          'Contato atualizado e salvo na API!'
        );

      } catch (erro) {
        console.error('Erro ao editar contato:', erro);

        mostrarAviso(
          'Erro',
          'Não foi possível atualizar o contato. Verifique se a API está funcionando.'
        );
      }

      return;
    }


    // Cadastro permanente utilizando a API.
    try {
      const resposta = await fetch(`${API_URL}/contatos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) {
        throw new Error('Não foi possível cadastrar o contato.');
      }

      // A API retorna o contato com seu ID numérico.
      const novoContato = await resposta.json();

      // Atualiza a lista na tela.
      setContatos((anteriores) => [
        ...anteriores,
        novoContato,
      ]);

      limparFormulario();

      mostrarAviso(
        'Sucesso',
        'Contato cadastrado com sucesso!'
      );

    } catch (erro) {
      console.error('Erro ao cadastrar contato:', erro);

      mostrarAviso(
        'Erro',
        'Não foi possível salvar o contato na API. Verifique se o servidor está funcionando.'
      );
    }
  }

  // ============================================================
  // EDITAR CONTATO
  //
  // Preenche o formulário com os dados do contato.
  // O telefone aparece com a máscara automática.
  // ============================================================
  function editarContato(contato) {
    setEditandoId(contato.id);
    setNome(contato.nome);
    setTelefone(formatarTelefone(contato.telefone));
    setRelacao(contato.relacao);
    setPrioridade(String(contato.prioridade));
  }

  // ============================================================
  // EXCLUIR CONTATO
  //
  // Solicita confirmação antes da exclusão local.
  // ============================================================
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

  // ============================================================
  // SETA VERMELHA: VOLTAR PARA ÁREA DE APOIO
  //
  // Não executa a função SAIR RÁPIDO.
  // ============================================================
  function voltar() {
    navigation.navigate('Apoio');
  }

  // ============================================================
  // SAIR RÁPIDO
  //
  // Retorna para a tela inicial da pizzaria.
  // ============================================================
  function sairRapido() {
    navigation.popToTop();
  }

  // ============================================================
  // EXIBIR CADA CONTATO CADASTRADO
  // ============================================================
  function renderizarContato({ item }) {

    return (
      <View style={estilos.cartao}>

        <Text style={estilos.nomeContato}>
          {item.nome}
        </Text>

        <Text style={estilos.detalhe}>
          Telefone: {formatarTelefone(item.telefone)}
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

  // ============================================================
  // INTERFACE DA TELA
  // ============================================================
  return (
    <SafeAreaView style={estilos.tela}>

      <FlatList
        data={contatos}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderizarContato}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={estilos.conteudo}

        ListHeaderComponent={
          <View>

            {/* CABEÇALHO */}
            <View style={estilos.cabecalho}>

              <TouchableOpacity
                onPress={voltar}
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

            {/* DESCRIÇÃO */}
            <Text style={estilos.descricao}>
              Cadastre pessoas de confiança que
              poderão fazer parte da sua rede de apoio.
            </Text>

            <Text style={estilos.aviso}>
              Protótipo acadêmico: utilize apenas
              informações fictícias.
            </Text>

            {/* NOME */}
            <TextInput
              style={estilos.campo}
              placeholder="Nome do contato"
              value={nome}
              onChangeText={setNome}
            />

            {/* TELEFONE: CAMPO ÚNICO COM MÁSCARA */}
            <TextInput
              style={estilos.campo}
              placeholder="Telefone"
              value={telefone}
              onChangeText={(texto) =>
                setTelefone(formatarTelefone(texto))
              }
              keyboardType="phone-pad"
              maxLength={15}
            />

            {/* RELAÇÃO */}
            <TextInput
              style={estilos.campo}
              placeholder="Relação (mãe, irmã, amiga...)"
              value={relacao}
              onChangeText={setRelacao}
            />

            {/* PRIORIDADE */}
            <TextInput
              style={estilos.campo}
              placeholder="Prioridade (1, 2, 3...)"
              value={prioridade}
              onChangeText={setPrioridade}
              keyboardType="number-pad"
            />

            {/* BOTÃO CADASTRAR / SALVAR */}
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

            {/* CANCELAR EDIÇÃO */}
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

// ============================================================
// ESTILOS ORIGINAIS DA TELA
// ============================================================
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

