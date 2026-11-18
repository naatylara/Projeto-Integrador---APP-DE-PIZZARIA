// ============================================================
// API REST
//
// Servidor desenvolvido com Node.js e Express.
//
// Responsável pelo gerenciamento dos usuários, contatos
// de apoio e alertas SOS do aplicativo.
//
// Os dados são armazenados em arquivos JSON.
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
const ARQUIVO_ALERTAS = path.join(__dirname, 'dados', 'alertas.json');


 // ============================================================
 // FUNÇÕES DE PERSISTÊNCIA DOS DADOS
 //
 // Lê e grava informações nos arquivos JSON, 
 // permitindo que o app funcione mesmo após ser fechado.
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
    mensagem: 'API Pede Pizza Já funcionando!'
  });
});


 // ============================================================
 // GET /usuarios: consultar os usuários cadastrados.
 //
 // Lê o arquivo usuarios.json e retorna os usuários fictícios.
 // Os contatos são vinculados aos usuários pelo usuarioId.
 // ============================================================

app.get('/usuarios', (req, res) => {
  try {
    const usuarios = lerDados(ARQUIVO_USUARIOS);

    // Retorna somente informações não sensíveis.
    const usuariosPublicos = usuarios.map((usuario) => ({
      id: usuario.id,
      nome: usuario.nome
    }));

    return res.json(usuariosPublicos);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({
      erro: 'Não foi possível consultar os usuários.'
    });
  }
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

 // ============================================================
 // GET /contatos/:id: consultar um contato específico.
 //
 // Recebe o ID pela URL, procura o contato no arquivo JSON
 // e retorna seus dados. Se não existir, retorna erro 404.
 // ============================================================

app.get('/contatos/:id', (req, res) => {
  try {
    const id = Number(req.params.id);

    // Verifica se o ID informado é válido.
    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        erro: 'ID inválido.'
      });
    }

    // Consulta os contatos cadastrados.
    const contatos = lerDados(ARQUIVO_CONTATOS);

    // Procura o contato pelo ID.
    const contato = contatos.find(
      (item) => item.id === id
    );

    if (!contato) {
      return res.status(404).json({
        erro: 'Contato não encontrado.'
      });
    }

    return res.json(contato);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({
      erro: 'Não foi possível consultar o contato.'
    });
  }
});


 // ============================================================
 // PUT /contatos/:id: editar um contato de apoio.
 //
 // Recebe o ID pela URL e os novos dados pelo corpo da
 // requisição. Valida os campos e o vínculo com o usuário
 // antes de atualizar o arquivo contatos.json.
 // ============================================================

app.put('/contatos/:id', (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        erro: 'ID inválido.'
      });
    }

    const contatos = lerDados(ARQUIVO_CONTATOS);
    const indice = contatos.findIndex(
      (contato) => contato.id === id
    );

    if (indice === -1) {
      return res.status(404).json({
        erro: 'Contato não encontrado.'
      });
    }

    const { nome, telefone, relacao, prioridade, usuarioId } = req.body;

    // Verifica se os novos dados são válidos.
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

    // Verifica se o usuário relacionado existe.
    const usuarios = lerDados(ARQUIVO_USUARIOS);
    const usuarioExiste = usuarios.some(
      (usuario) => usuario.id === usuarioId
    );

    if (!usuarioExiste) {
      return res.status(400).json({
        erro: 'O usuário informado não existe.'
      });
    }

    // Atualiza o contato mantendo o ID original.
    const contatoAtualizado = {
      id,
      nome: nome.trim(),
      telefone: telefone.trim(),
      relacao: relacao.trim(),
      prioridade,
      usuarioId
    };

    contatos[indice] = contatoAtualizado;
    salvarDados(ARQUIVO_CONTATOS, contatos);

    return res.json(contatoAtualizado);
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({
      erro: 'Não foi possível atualizar o contato.'
    });
  }
});

 // ============================================================
 // DELETE /contatos/:id: excluir um contato de apoio.
 //
 // Recebe o ID pela URL, verifica se o contato existe e
 // remove o registro do arquivo contatos.json.
 // Retorna erro 404 caso o contato não seja encontrado.
 // ============================================================

app.delete('/contatos/:id', (req, res) => {
  try {
    const id = Number(req.params.id);

    // Verifica se o ID informado é válido.
    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        erro: 'ID inválido.'
      });
    }

    // Consulta os contatos cadastrados.
    const contatos = lerDados(ARQUIVO_CONTATOS);

    // Procura o contato pelo ID.
    const contato = contatos.find(
      (item) => item.id === id
    );

    if (!contato) {
      return res.status(404).json({
        erro: 'Contato não encontrado.'
      });
    }

    // Remove o contato da lista.
    const contatosAtualizados = contatos.filter(
      (item) => item.id !== id
    );

    // Salva a lista atualizada no arquivo JSON.
    salvarDados(ARQUIVO_CONTATOS, contatosAtualizados);

    return res.json({
      mensagem: 'Contato excluído com sucesso.',
      contatoExcluido: contato
    });
  } catch (erro) {
    console.error(erro);
    return res.status(500).json({
      erro: 'Não foi possível excluir o contato.'
    });
  }
});

 // ============================================================
  // POST /alertas: registra um alerta SOS.
  // GET /alertas: consulta os alertas cadastrados.
  // PUT /alertas/:id: atualiza o status de um alerta.
  //
  // Cada alerta está vinculado a um usuário cadastrado.
  // Os registros são armazenados no arquivo alertas.json.
 // ============================================================


// ============================================================
// POST /alertas - CADASTRAR ALERTA SOS
// ============================================================

app.post('/alertas', (req, res) => {
  try {
    const { usuarioId, latitude, longitude } = req.body;

    // Verifica se o usuário e as coordenadas são válidos.
    if (
      !Number.isInteger(usuarioId) ||
      usuarioId < 1 ||
      typeof latitude !== 'number' ||
      !Number.isFinite(latitude) ||
      latitude < -90 ||
      latitude > 90 ||
      typeof longitude !== 'number' ||
      !Number.isFinite(longitude) ||
      longitude < -180 ||
      longitude > 180
    ) {
      return res.status(400).json({
        erro: 'Informe usuário e localização válidos.'
      });
    }

    // Confirma que o usuário existe.
    const usuarios = lerDados(ARQUIVO_USUARIOS);

    const usuario = usuarios.find(
      (item) => item.id === usuarioId
    );

    if (!usuario) {
      return res.status(404).json({
        erro: 'Usuário não encontrado.'
      });
    }

    // Consulta os alertas já cadastrados.
    const alertas = lerDados(ARQUIVO_ALERTAS);

    // Gera um ID único dentro do arquivo.
    const novoId = alertas.reduce(
      (maior, alerta) => Math.max(maior, alerta.id),
      0
    ) + 1;

    // Cria o alerta com data e hora automáticas.
    const novoAlerta = {
      id: novoId,
      usuarioId: usuario.id,
      nomeUsuario: usuario.nome,
      dataHora: new Date().toISOString(),
      latitude,
      longitude,
      status: 'Novo'
    };

    // Salva o alerta no arquivo JSON.
    alertas.push(novoAlerta);
    salvarDados(ARQUIVO_ALERTAS, alertas);

    return res.status(201).json(novoAlerta);

  } catch (erro) {
    console.error('Erro ao registrar SOS:', erro);

    return res.status(500).json({
      erro: 'Não foi possível registrar o alerta SOS.'
    });
  }
});


// ============================================================
// GET /alertas - LISTAR ALERTAS SOS
//
// Retorna os alertas mais recentes primeiro.
// Essa rota será utilizada pelo Dashboard da Delegacia.
// ============================================================

app.get('/alertas', (req, res) => {
  try {
    const alertas = lerDados(ARQUIVO_ALERTAS);

    // Exibe os alertas mais recentes no início da lista.
    const alertasOrdenados = [...alertas].sort(
      (a, b) => new Date(b.dataHora) - new Date(a.dataHora)
    );

    return res.json(alertasOrdenados);

  } catch (erro) {
    console.error('Erro ao consultar alertas:', erro);

    return res.status(500).json({
      erro: 'Não foi possível consultar os alertas SOS.'
    });
  }
});

// ============================================================
 // PUT /alertas/:id - ATUALIZAR STATUS DO ALERTA SOS
 //
 // Permite alterar o status de um alerta existente.
 // Status permitidos: Novo, Em atendimento e Concluído.
 // ============================================================

app.put('/alertas/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    // Verifica se o ID é válido.
    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        erro: 'ID do alerta inválido.'
      });
    }

    // Define os status aceitos pelo sistema.
    const statusPermitidos = [
      'Novo',
      'Em atendimento',
      'Concluído'
    ];

    if (!statusPermitidos.includes(status)) {
      return res.status(400).json({
        erro: 'Status inválido.'
      });
    }

    // Consulta os alertas cadastrados.
    const alertas = lerDados(ARQUIVO_ALERTAS);

    // Procura o alerta pelo ID.
    const indice = alertas.findIndex(
      (alerta) => alerta.id === id
    );

    if (indice === -1) {
      return res.status(404).json({
        erro: 'Alerta não encontrado.'
      });
    }

    // Atualiza somente o status.
    alertas[indice].status = status;

    // Salva a alteração no arquivo JSON.
    salvarDados(ARQUIVO_ALERTAS, alertas);

    return res.json({
      mensagem: 'Status atualizado com sucesso.',
      alerta: alertas[indice]
    });

  } catch (erro) {
    console.error('Erro ao atualizar alerta:', erro);

    return res.status(500).json({
      erro: 'Não foi possível atualizar o status.'
    });
  }
});

// Inicia o servidor na porta 3333.
app.listen(PORTA, () => {
  console.log(`API funcionando na porta ${PORTA}`);
});