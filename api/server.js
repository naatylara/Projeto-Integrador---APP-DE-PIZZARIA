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

// Inicia o servidor na porta 3333.
app.listen(PORTA, () => {
  console.log(`API funcionando na porta ${PORTA}`);
});