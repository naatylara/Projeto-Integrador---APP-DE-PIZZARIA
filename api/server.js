// ============================================================
// ENTREGA 4: API REST do aplicativo Pede Pizza Já.
//
// Utiliza Node.js e Express para receber requisições do app.
// Os dados serão armazenados em arquivos JSON, seguindo o
// modelo disponibilizado pelo professor (Hotel Aurora).
// ============================================================

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORTA = 3333;
// Caminhos dos arquivos utilizados para persistência.
const ARQUIVO_USUARIOS = path.join(__dirname, 'dados', 'usuarios.json');
const ARQUIVO_CONTATOS = path.join(__dirname, 'dados', 'contatos.json');


 // ============================================================
 // FUNÇÕES DE PERSISTÊNCIA DOS DADOS
 //
 // Lê e grava informações nos arquivos JSON, seguindo o
 // modelo utilizado na API Hotel Aurora do professor.
 // ============================================================

function lerDados(caminhoArquivo) {
  const conteudo = fs.readFileSync(caminhoArquivo, 'utf8');
  return JSON.parse(conteudo);
}

function salvarDados(caminhoArquivo, dados) {
  fs.writeFileSync(
    caminhoArquivo,
    JSON.stringify(dados, null, 2),
    'utf8'
  );
}

// Permite a comunicação com o aplicativo.
app.use(cors());

// Permite receber dados no formato JSON.
app.use(express.json());

// Rota de teste para verificar se a API está funcionando.
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API Pede Pizza Já funcionando!',
    entrega: 4
  });
});

// Lista todos os contatos cadastrados.
app.get('/contatos', (req, res) => {
  try {
    const contatos = lerDados(ARQUIVO_CONTATOS);
    res.json(contatos);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: 'Não foi possível consultar os contatos.'
    });
  }
});

 // ============================================================
 // POST /contatos: cadastrar um contato de apoio.
 //
 // Recebe nome, telefone, relação, prioridade e usuarioId.
 // Valida os campos e verifica se o usuário existe antes de
 // gravar o novo contato no arquivo contatos.json.
 // ============================================================

app.post('/contatos', (req, res) => {
  try {
    const { nome, telefone, relacao, prioridade, usuarioId } = req.body;

    // Verifica os campos obrigatórios.
    if (
      typeof nome !== 'string' || !nome.trim() ||
      typeof telefone !== 'string' || !telefone.trim() ||
      typeof relacao !== 'string' || !relacao.trim() ||
      !Number.isInteger(prioridade) || prioridade < 1 ||
      !Number.isInteger(usuarioId) || usuarioId < 1
    ) {
      return res.status(400).json({
        erro: 'Preencha todos os campos com valores válidos.'
      });
    }

    // Confirma que o usuário relacionado existe.
    const usuarios = lerDados(ARQUIVO_USUARIOS);

    const usuarioExiste = usuarios.some(
      (usuario) => usuario.id === usuarioId
    );

    if (!usuarioExiste) {
      return res.status(400).json({
        erro: 'O usuário informado não existe.'
      });
    }

    // Lê os contatos existentes e gera um novo ID.
    const contatos = lerDados(ARQUIVO_CONTATOS);

    const novoId = contatos.reduce(
      (maior, contato) => Math.max(maior, contato.id),
      0
    ) + 1;

    const novoContato = {
      id: novoId,
      nome: nome.trim(),
      telefone: telefone.trim(),
      relacao: relacao.trim(),
      prioridade,
      usuarioId
    };

    // Salva o novo contato permanentemente no arquivo JSON.
    contatos.push(novoContato);
    salvarDados(ARQUIVO_CONTATOS, contatos);

    return res.status(201).json(novoContato);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({
      erro: 'Não foi possível cadastrar o contato.'
    });
  }
});


// Inicia o servidor na porta 3333.
app.listen(PORTA, () => {
  console.log(`API funcionando na porta ${PORTA}`);
});