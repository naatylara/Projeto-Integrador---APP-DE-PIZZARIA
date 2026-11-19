
// ============================================================
// REDE DE APOIO
//
// Tela responsável pelo gerenciamento dos contatos de confiança
// cadastrados na Área de Apoio.
//
// Permite consultar, cadastrar, editar e excluir contatos
// por meio da integração com a API Node.js/Express.
//
// Os contatos são organizados por prioridade e possuem
// informações de nome, telefone e relação com a usuária.
// 
// ============================================================

import React, { useState, useEffect } from 'react';

import {  View,  Text,  TextInput,  TouchableOpacity,  FlatList,  Alert,  StyleSheet,  Platform,  Linking, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme';


// Endereço da API
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
  // 43999999999 -> (43)9.9999-9999
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
  // GET - CONSULTAR CONTATOS NA API
  //
  // Ao abrir a tela, os contatos são carregados do servidor.
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
  // ORDENAÇÃO AUTOMÁTICA DOS CONTATOS
  //
  // A prioridade é usada apenas internamente.
  // Quanto menor o número, mais acima o contato aparece.
  // ============================================================

  const contatosOrdenados = [...contatos].sort((a, b) => {
    const diferenca =
      Number(a.prioridade) - Number(b.prioridade);

    if (diferenca !== 0) {
      return diferenca;
    }

    return Number(a.id) - Number(b.id);
  });

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
  // Navegador: window.alert
  // Celular: Alert.alert
  // ============================================================

  function mostrarAviso(titulo, mensagem) {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n${mensagem}`);
    } else {
      Alert.alert(titulo, mensagem);
    }
  }

  // ============================================================
  // POST E PUT - CADASTRAR OU EDITAR CONTATO
  //
  // Quando editandoId é null, cadastra um novo contato.
  // Quando existe editandoId, atualiza o contato na API.
  // ============================================================

  async function salvarContato() {

    // Verifica se todos os campos foram preenchidos.
    if (
      !nome.trim() ||
      !telefone.trim() ||
      !relacao.trim() ||
      !prioridade.trim()
    ) {
      mostrarAviso(
        'Atenção',
        'Preencha todos os campos.'
      );
      return;
    }

    // A prioridade precisa ser um número inteiro positivo.
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

    // Remove a máscara antes de enviar o telefone para a API.
    const telefoneNumeros = telefone.replace(/\D/g, '');

    if (telefoneNumeros.length !== 11) {
      mostrarAviso(
        'Atenção',
        'Informe um telefone com DDD e 11 números.'
      );
      return;
    }

    // Dados enviados ao servidor.
    const dados = {
      nome: nome.trim(),
      telefone: telefoneNumeros,
      relacao: relacao.trim(),
      prioridade: numeroPrioridade,
      usuarioId: 1, // Usuário fictício de teste.
    };

    // ==========================================================
    // PUT - ATUALIZAR CONTATO EXISTENTE
    // ==========================================================

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

        if (!resposta.ok) {
          throw new Error('Não foi possível editar o contato.');
        }

        const contatoAtualizado = await resposta.json();

        // Atualiza o contato na lista sem recarregar a tela.
        setContatos((anteriores) =>
          anteriores.map((contato) =>
            contato.id === editandoId
              ? contatoAtualizado
              : contato
          )
        );

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

    // ==========================================================
    // POST - CADASTRAR NOVO CONTATO
    // ==========================================================

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

      const novoContato = await resposta.json();

      // Inclui o novo contato na lista.
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
        'Não foi possível salvar o contato. Verifique se o servidor está funcionando.'
      );
    }
  }

  // ============================================================
  // EDITAR CONTATO
  //
  // Preenche o formulário com os dados do contato selecionado.
  // ============================================================

  function editarContato(contato) {
    setEditandoId(contato.id);
    setNome(contato.nome);
    setTelefone(formatarTelefone(contato.telefone));
    setRelacao(contato.relacao);
    setPrioridade(String(contato.prioridade));
  }

  // ============================================================
  // DELETE - EXCLUIR CONTATO NA API
  //
  // A exclusão acontece somente após a confirmação.
  // ============================================================

  function excluirContato(id) {

    async function confirmarExclusao() {
      try {
        const resposta = await fetch(
          `${API_URL}/contatos/${id}`,
          {
            method: 'DELETE',
          }
        );

        if (!resposta.ok) {
          throw new Error('Não foi possível excluir o contato.');
        }

        // Remove da lista após a confirmação do servidor.
        setContatos((anteriores) =>
          anteriores.filter(
            (contato) => contato.id !== id
          )
        );

        if (editandoId === id) {
          limparFormulario();
        }

        mostrarAviso(
          'Sucesso',
          'Contato excluído com sucesso da API!'
        );

      } catch (erro) {
        console.error('Erro ao excluir contato:', erro);

        mostrarAviso(
          'Erro',
          'Não foi possível excluir o contato. Verifique se a API está funcionando.'
        );
      }
    }

    // Confirmação no navegador.
    if (Platform.OS === 'web') {
      const confirmou = window.confirm(
        'Deseja realmente excluir este contato?'
      );

      if (confirmou) {
        confirmarExclusao();
      }

    } else {
      // Confirmação no celular.
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
  // LIGAR PARA O CONTATO
  //
  // Utiliza Linking para abrir o discador do celular.
  // O número é preenchido automaticamente.
  // A ligação não é iniciada sem confirmação.
  // ============================================================

  async function ligarContato(numero) {
    const telefoneLimpo = String(numero || '')
      .replace(/\D/g, '');

    if (!telefoneLimpo) {
      mostrarAviso(
        'Atenção',
        'Este contato não possui telefone válido.'
      );
      return;
    }

    try {
      await Linking.openURL(`tel:${telefoneLimpo}`);

    } catch (erro) {
      console.error('Erro ao abrir o discador:', erro);

      mostrarAviso(
        'Não foi possível ligar',
        'Abra esta opção em um celular com discador disponível.'
      );
    }
  }

  // ============================================================
  // NAVEGAÇÃO
  //
  // Seta vermelha: retorna para a Área de Apoio.
  // SAIR RÁPIDO: retorna para a tela inicial da pizzaria.
  // ============================================================

  function voltar() {
    navigation.navigate('Apoio');
  }

  function sairRapido() {
    navigation.popToTop();
  }

  // ============================================================
  // CARTÃO DE CADA CONTATO
  //
  // Cada cartão mostra:
  // - Prioridade
  // - Nome
  // - Relação
  // - Telefone
  // - Botão Ligar
  // - Botões Editar e Excluir
  // ============================================================

  function renderizarContato({ item }) {
    return (
      <View style={estilos.cartao}>

        <Ionicons
          name="person-circle-outline"
          size={34}
          color={cores.vermelho}
          style={estilos.iconeContato}
        />

        <Text
          style={estilos.nomeContato}
          numberOfLines={2}
        >
          {item.nome}
        </Text>

        <Text
          style={estilos.detalhe}
          numberOfLines={2}
        >
          {item.relacao}
        </Text>

        <Text
          style={estilos.telefoneContato}
          numberOfLines={2}
        >
          {formatarTelefone(item.telefone)}
        </Text>

        {/* BOTÃO PARA LIGAR */}
        <TouchableOpacity
          style={estilos.botaoLigar}
          onPress={() => ligarContato(item.telefone)}
          accessibilityLabel={`Ligar para ${item.nome}`}
        >
          <Ionicons
            name="call-outline"
            size={17}
            color={cores.branco}
          />

          <Text style={estilos.textoBotao}>
            Ligar
          </Text>
        </TouchableOpacity>

        {/* BOTÕES EDITAR E EXCLUIR */}
        <View style={estilos.acoes}>

          <TouchableOpacity
            style={estilos.botaoEditar}
            onPress={() => editarContato(item)}
          >
            <Ionicons
              name="create-outline"
              size={15}
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
              size={15}
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
  // INTERFACE PRINCIPAL
  //
  // O FlatList apresenta os contatos em duas colunas.
  // ListHeaderComponent contém o cabeçalho.
  // ListFooterComponent contém o formulário e SAIR RÁPIDO.
  // ============================================================

  return (
    <SafeAreaView style={estilos.tela}>

      <FlatList
        data={contatosOrdenados}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderizarContato}
        numColumns={2}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={estilos.conteudo}
        columnWrapperStyle={estilos.linhaContatos}

        // ========================================================
        // CABEÇALHO E TÍTULO DOS CONTATOS
        // ========================================================

        ListHeaderComponent={
          <View>

            <View style={estilos.cabecalho}>
              <TouchableOpacity onPress={voltar}>
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
              Pessoas de confiança que você pode contatar rapidamente.
            </Text>

            <Text style={estilos.subtitulo}>
              Meus contatos de confiança
            </Text>

          </View>
        }

        // ========================================================
        // MENSAGEM QUANDO NÃO EXISTEM CONTATOS
        // ========================================================

        ListEmptyComponent={
          <Text style={estilos.vazio}>
            Nenhum contato cadastrado.
          </Text>
        }

        // ========================================================
        // FORMULÁRIO ABAIXO DOS CONTATOS
        // ========================================================

        ListFooterComponent={
          <View>

            <View style={estilos.separador} />

            <Text style={estilos.subtituloFormulario}>
              {editandoId !== null
                ? 'Editar contato'
                : 'Cadastrar novo contato'}
            </Text>

            {/* CAMPO NOME */}
            <TextInput
              style={estilos.campo}
              placeholder="Nome do contato"
              value={nome}
              onChangeText={setNome}
            />

            {/* CAMPO TELEFONE COM MÁSCARA */}
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

            {/* CAMPO RELAÇÃO */}
            <TextInput
              style={estilos.campo}
              placeholder="Relação (mãe, irmã, amiga...)"
              value={relacao}
              onChangeText={setRelacao}
            />

            {/* CAMPO PRIORIDADE */}
            <TextInput
              style={estilos.campo}
              placeholder="Prioridade (1, 2, 3...)"
              value={prioridade}
              onChangeText={setPrioridade}
              keyboardType="number-pad"
            />

            {/* BOTÃO MENOR E CENTRALIZADO */}
            <View style={estilos.areaBotaoCadastrar}>

              <TouchableOpacity
                style={estilos.botaoCadastrar}
                onPress={salvarContato}
              >
                <Ionicons
                  name={
                    editandoId !== null
                      ? 'save-outline'
                      : 'person-add-outline'
                  }
                  size={17}
                  color={cores.branco}
                />

                <Text style={estilos.textoBotao}>
                  {editandoId !== null
                    ? 'Salvar alterações'
                    : 'Cadastrar contato'}
                </Text>
              </TouchableOpacity>

            </View>

            {/* CANCELAR EDIÇÃO */}
            {editandoId !== null && (
              <TouchableOpacity onPress={limparFormulario}>
                <Text style={estilos.cancelar}>
                  Cancelar edição
                </Text>
              </TouchableOpacity>
            )}

            {/* BOTÃO SAIR RÁPIDO */}
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

          </View>
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

  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 15,
  },

  // Organiza os cartões lado a lado.
  linhaContatos: {
    justifyContent: 'space-between',
    gap: 10,
  },

  cartao: {
    flex: 1,
    minWidth: 0,
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: cores.cinzaClaro,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    alignItems: 'center',
  },

  
  iconeContato: {
    marginBottom: 4,
  },

  nomeContato: {
    fontSize: 15,
    fontWeight: 'bold',
    color: cores.vermelho,
    textAlign: 'center',
    marginBottom: 5,
  },

  detalhe: {
    fontSize: 12,
    color: cores.texto,
    textAlign: 'center',
    marginBottom: 5,
  },

  telefoneContato: {
    fontSize: 11,
    color: cores.texto,
    textAlign: 'center',
    marginBottom: 10,
  },

  botaoLigar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: cores.vermelho,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'stretch',
  },

  acoes: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },

  botaoEditar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderWidth: 1,
    borderColor: cores.vermelho,
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 8,
  },

  textoEditar: {
    color: cores.vermelho,
    fontWeight: 'bold',
    fontSize: 12,
  },

  botaoExcluir: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: cores.vermelho,
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 8,
  },

  textoBotao: {
    color: cores.branco,
    fontWeight: 'bold',
    fontSize: 13,
  },

  separador: {
    borderTopWidth: 1,
    borderTopColor: cores.cinzaClaro,
    marginTop: 15,
    marginBottom: 20,
  },

  subtituloFormulario: {
    fontSize: 18,
    fontWeight: 'bold',
    color: cores.texto,
    marginBottom: 15,
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

  areaBotaoCadastrar: {
    alignItems: 'center',
    marginTop: 4,
  },

  botaoCadastrar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: cores.vermelho,
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  cancelar: {
    textAlign: 'center',
    color: cores.vermelho,
    marginTop: 12,
  },

  vazio: {
    textAlign: 'center',
    color: cores.cinza,
    marginBottom: 20,
  },

  // Botão grande para retornar rapidamente à pizzaria.
  botaoSair: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: cores.vermelho,
    padding: 15,
    borderRadius: 12,
    marginTop: 28,
  },

});