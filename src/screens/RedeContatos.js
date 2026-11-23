
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
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { cores } from '../theme';

// API Node.js / Express
const API_URL = 'http://localhost:3333';

export default function RedeApoio({ navigation }) {
  const [contatos, setContatos] = useState([]);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [relacao, setRelacao] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  // Estados dos modais personalizados
  const [modalAviso, setModalAviso] = useState({
    visivel: false,
    titulo: '',
    mensagem: '',
  });
  const [contatoParaExcluir, setContatoParaExcluir] = useState(null);
  const [excluindo, setExcluindo] = useState(false);

  // =====================================================
  // FORMATAÇÃO DO TELEFONE
  // =====================================================

  function formatarTelefone(valor) {
    const numeros = String(valor || '')
      .replace(/\D/g, '')
      .slice(0, 11);

    if (!numeros.length) return '';
    if (numeros.length <= 2) return `(${numeros}`;

    if (numeros.length <= 3) {
      return `(${numeros.slice(0, 2)})${numeros.slice(2)}`;
    }

    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)})${numeros.slice(2, 3)}.${numeros.slice(3)}`;
    }

    return `(${numeros.slice(0, 2)})${numeros.slice(2, 3)}.${numeros.slice(3, 7)}-${numeros.slice(7)}`;
  }

  // =====================================================
  // GET - CONSULTAR CONTATOS
  // =====================================================

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

  // =====================================================
  // ORDENAÇÃO DOS CONTATOS
  // =====================================================

  const contatosOrdenados = [...contatos].sort((a, b) => {
    const diferenca =
      Number(a.prioridade) - Number(b.prioridade);

    if (diferenca !== 0) return diferenca;

    return Number(a.id) - Number(b.id);
  });

  // =====================================================
  // LIMPAR FORMULÁRIO
  // =====================================================

  function limparFormulario() {
    setNome('');
    setTelefone('');
    setRelacao('');
    setPrioridade('');
    setEditandoId(null);
  }

  // =====================================================
  // MODAL PERSONALIZADO DE AVISOS
  // =====================================================

  function mostrarAviso(titulo, mensagem) {
    setModalAviso({
      visivel: true,
      titulo,
      mensagem,
    });
  }

  function fecharAviso() {
    setModalAviso({
      visivel: false,
      titulo: '',
      mensagem: '',
    });
  }

  // =====================================================
  // POST E PUT - CADASTRAR OU EDITAR
  // =====================================================

  async function salvarContato() {
    if (
      !nome.trim() ||
      !telefone.trim() ||
      !relacao.trim() ||
      !prioridade.trim()
    ) {
      mostrarAviso('Atenção', 'Preencha todos os campos.');
      return;
    }

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
      usuarioId: 1,
    };

    // PUT - ATUALIZAR CONTATO
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
          'Contato atualizado!'
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

    // POST - CADASTRAR CONTATO
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

  // =====================================================
  // EDITAR CONTATO
  // =====================================================

  function editarContato(contato) {
    setEditandoId(contato.id);
    setNome(contato.nome);
    setTelefone(formatarTelefone(contato.telefone));
    setRelacao(contato.relacao);
    setPrioridade(String(contato.prioridade));
  }

  // =====================================================
  // DELETE - EXCLUIR CONTATO
  // =====================================================

  function excluirContato(id) {
    setContatoParaExcluir(id);
  }

  async function confirmarExclusao() {
    const id = contatoParaExcluir;

    if (id === null || excluindo) return;

    setExcluindo(true);

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

      setContatos((anteriores) =>
        anteriores.filter((contato) => contato.id !== id)
      );

      if (editandoId === id) {
        limparFormulario();
      }

      setContatoParaExcluir(null);

      mostrarAviso(
        'Sucesso',
        'Contato excluído com sucesso!'
      );
    } catch (erro) {
      setContatoParaExcluir(null);

      console.error('Erro ao excluir contato:', erro);

      mostrarAviso(
        'Erro',
        'Não foi possível excluir o contato. Verifique se a API está funcionando.'
      );
    } finally {
      setExcluindo(false);
    }
  }

  // =====================================================
  // LIGAR PARA CONTATO
  // =====================================================

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

  // =====================================================
  // NAVEGAÇÃO
  // =====================================================

  function voltar() {
    navigation.navigate('Apoio');
  }

  function sairRapido() {
    navigation.popToTop();
  }

  // =====================================================
  // CARTÃO DE CONTATO
  // =====================================================

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

  // =====================================================
  // INTERFACE PRINCIPAL
  // =====================================================

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

        ListEmptyComponent={
          <Text style={estilos.vazio}>
            Nenhum contato cadastrado.
          </Text>
        }

        ListFooterComponent={
          <View>
            <View style={estilos.separador} />

            <Text style={estilos.subtituloFormulario}>
              {editandoId !== null
                ? 'Editar contato'
                : 'Cadastrar novo contato'}
            </Text>

            {/* NOME */}
            <TextInput
              style={estilos.campo}
              placeholder="Nome do contato"
              value={nome}
              onChangeText={setNome}
            />

            {/* TELEFONE */}
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

            {/* CADASTRAR OU SALVAR */}
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

            {/* SAÍDA RÁPIDA */}
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

      {/* ===============================================
          MODAL DE SUCESSO, ERRO OU ATENÇÃO
          =============================================== */}

      <Modal
        visible={modalAviso.visivel}
        transparent
        animationType="fade"
        onRequestClose={fecharAviso}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={estilos.modalFundo}
          onPress={fecharAviso}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={estilos.modalCaixa}
            onPress={() => {}}
          >
            <Ionicons
              name={
                modalAviso.titulo === 'Sucesso'
                  ? 'checkmark-circle-outline'
                  : 'alert-circle-outline'
              }
              size={54}
              color={cores.vermelho}
            />

            <Text style={estilos.modalTitulo}>
              {modalAviso.titulo}
            </Text>

            <Text style={estilos.modalMensagem}>
              {modalAviso.mensagem}
            </Text>

            <TouchableOpacity
              style={estilos.modalBotao}
              onPress={fecharAviso}
            >
              <Text style={estilos.modalBotaoTexto}>
                OK
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* ===============================================
          MODAL DE CONFIRMAÇÃO DA EXCLUSÃO
          =============================================== */}

      <Modal
        visible={contatoParaExcluir !== null}
        transparent
        animationType="fade"
        onRequestClose={() => {
          if (!excluindo) setContatoParaExcluir(null);
        }}
      >
        <View style={estilos.modalFundo}>
          <View style={estilos.modalCaixa}>
            <Ionicons
              name="trash-outline"
              size={50}
              color={cores.vermelho}
            />

            <Text style={estilos.modalTitulo}>
              Excluir contato?
            </Text>

            <Text style={estilos.modalMensagem}>
              Deseja realmente excluir este contato?
            </Text>

            <View style={estilos.modalBotoesLinha}>
              <TouchableOpacity
                style={estilos.modalBotaoCancelar}
                disabled={excluindo}
                onPress={() => setContatoParaExcluir(null)}
              >
                <Text style={estilos.modalCancelarTexto}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={estilos.modalBotao}
                disabled={excluindo}
                onPress={confirmarExclusao}
              >
                <Text style={estilos.modalBotaoTexto}>
                  {excluindo ? 'Excluindo...' : 'Excluir'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// =====================================================
// ESTILOS
// =====================================================

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

  // =====================================================
  // ESTILOS DOS MODAIS
  // =====================================================

  modalFundo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  modalCaixa: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: cores.fundo,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: cores.vermelho,
  },

  modalTitulo: {
    color: cores.vermelho,
    fontSize: 21,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },

  modalMensagem: {
    color: cores.texto,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 22,
    lineHeight: 22,
  },

  modalBotao: {
    backgroundColor: cores.vermelho,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 26,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
  },

  modalBotaoTexto: {
    color: cores.branco,
    fontWeight: 'bold',
    fontSize: 14,
  },

  modalBotoesLinha: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },

  modalBotaoCancelar: {
    borderWidth: 1,
    borderColor: cores.vermelho,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
  },

  modalCancelarTexto: {
    color: cores.vermelho,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
