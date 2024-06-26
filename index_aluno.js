require("dotenv").config({ path: "./.env" });

const express = require("express");
const bodyParser = require("body-parser"); // Importe o bodyParser apenas uma vez
const app = express();
const port = 4000;
const connection = require("./database/database");
const { Aluno } = require("./database/Aluno"); // Importando o modelo Aluno
const { Coordenador } = require("./database/Coordenador");
const DisciplinaCurso = require("./database/DisciplinaCurso");
const DisciplinaCursoVW = require("./database/DisciplinaCursoVW");
const Disciplina = require("./database/Disciplina");
const { Forma_Pag } = require("./database/Forma_Pag"); 
const { Pagamento } = require("./database/Pagamento");
const { Professor } = require("./database/Professor"); 
const { Responsavel } = require("./database/Responsavel");
const { Tipo_Desc } = require("./database/Tipo_Desc");
const { Aluno_Curso } = require("./database/Aluno_Curso"); // Importando o modelo Aluno_Curso
const Curso = require("./database/Curso"); // Importando o modelo Curso


// Configuração da view engine para EJS
app.set("view engine", "ejs");

const port = process.env.PORT || 4000;
// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Testando a conexão
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco de dados!");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

//ROTA ALUNO
// Rota para renderizar a página de alunos
app.get('/alunos', async (req, res) => {
  try {
    const alunos = await Aluno.findAll({
      raw: true,
      order: [["id_aluno", "DESC"]],
    });
    res.render('cad_alunos', { alunos: alunos });
  } catch (error) {
    console.error("Erro ao carregar alunos:", error);
    res.status(500).json({ error: "Erro ao carregar alunos." });
  }
});

// Rota para inserir ou alterar dados na tabela de alunos
app.post("/editar_aluno", async (req, res) => {
  try {
    const { nome_aluno, data_nascimento, genero, email, tipo_logradouro, logradouro, numero, bairro, cidade, estado, id_responsavel, action, id_aluno } = req.body;

    if (action === "incluir") {
      await Aluno.create({
        nome_aluno,
        data_nascimento,
        genero,
        email,
        tipo_logradouro,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        id_responsavel,
      });
    } else if (action === "alterar") {
      const aluno = await Aluno.findByPk(id_aluno);
      if (!aluno) {
        return res.status(404).json({
          error: `Aluno não encontrado na tabela de alunos - ID: ${id_aluno}.`,
        });
      }
      aluno.nome_aluno = nome_aluno;
      aluno.data_nascimento = data_nascimento;
      aluno.genero = genero;
      aluno.email = email;
      aluno.tipo_logradouro = tipo_logradouro;
      aluno.logradouro = logradouro;
      aluno.numero = numero;
      aluno.bairro = bairro;
      aluno.cidade = cidade;
      aluno.estado = estado;
      aluno.id_responsavel = id_responsavel;
      await aluno.save();
    } else {
      return res.status(400).json({ error: "Ação inválida." });
    }

    // Redireciona após operação bem-sucedida
    res.redirect("/alunos");
  } catch (error) {
    console.error("Erro ao editar aluno:", error);
    res.status(500).json({ error: "Erro ao editar aluno." });
  }
});

// Rota para excluir dados da tabela de alunos
app.post("/excluir_aluno/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const aluno = await Aluno.findByPk(id);
    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado." });
    }
    // Exclui o aluno com a chave informada
    await Aluno.destroy({
      where: {
        id_aluno: id,
      },
    });
    res.redirect("/alunos");
  } catch (error) {
    console.error("Erro ao excluir aluno:", error);
    res.status(500).json({ error: "Erro ao excluir aluno." });
  }
});

//ROTA COORDENADOR
app.get("/coordenador", async (req, res) => {
  try {
    const coordenadores = await Coordenador.findAll({
      raw: true,
      order: [["id_coordenador", "DESC"]],
    });
    res.render("cad_coordenador", { coordenadores: coordenadores });
  } catch (error) {
    console.error("Erro ao carregar coordenadores:", error);
    res.status(500).json({ error: "Erro ao carregar coordenadores." });
  }
});

// Rota para inserir ou alterar dados na tabela de coordenadores
app.post("/editar_coordenador", async (req, res) => {
  try {
    const { nome_coordenador, data_nascimento, genero, email, tipo_logradouro, logradouro, numero, bairro, cidade, estado, action, id_coordenador } = req.body;

    if (action === "incluir") {
      await Coordenador.create({
        nome_coordenador,
        data_nascimento,
        genero,
        email,
        tipo_logradouro,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
      });
    } else if (action === "alterar") {
      const coordenador = await Coordenador.findByPk(id_coordenador);
      if (!coordenador) {
        return res.status(404).json({
          error: `Coordenador não encontrado na tabela de coordenadores - ID: ${id_coordenador}.`,
        });
      }
      coordenador.nome_coordenador = nome_coordenador;
      coordenador.data_nascimento = data_nascimento;
      coordenador.genero = genero;
      coordenador.email = email;
      coordenador.tipo_logradouro = tipo_logradouro;
      coordenador.logradouro = logradouro;
      coordenador.numero = numero;
      coordenador.bairro = bairro;
      coordenador.cidade = cidade;
      coordenador.estado = estado;
      await coordenador.save();
    } else {
      return res.status(400).json({ error: "Ação inválida." });
    }

    // Redireciona após operação bem-sucedida
    res.redirect("/coordenador");
  } catch (error) {
    console.error("Erro ao editar coordenador:", error);
    res.status(500).json({ error: "Erro ao editar coordenador." });
  }
});

// Rota para excluir dados da tabela de coordenadores
app.post("/excluir_coordenador/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const coordenador = await Coordenador.findByPk(id);
    if (!coordenador) {
      return res.status(404).json({ error: "Coordenador não encontrado." });
    }
    // Exclui o coordenador com a chave informada
    await Coordenador.destroy({
      where: {
        id_coordenador: id,
      },
    });
    res.redirect("/coordenador");
  } catch (error) {
    console.error("Erro ao excluir coordenador:", error);
    res.status(500).json({ error: "Erro ao excluir coordenador." });
  }
});

app.get('/alunos', async (req, res) => {
  try {
    const alunos = await Aluno.findAll({
      raw: true,
      order: [["id_aluno", "DESC"]],
    });
    res.render('cad_alunos', { alunos: alunos });
  } catch (error) {
    console.error("Erro ao carregar alunos:", error);
    res.status(500).json({ error: "Erro ao carregar alunos." });
  }
});

// Rota para inserir ou alterar dados na tabela de alunos
app.post("/editar_aluno", async (req, res) => {
  try {
    const { nome_aluno, data_nascimento, genero, email, tipo_logradouro, logradouro, numero, bairro, cidade, estado, id_responsavel, action, id_aluno } = req.body;

    if (action === "incluir") {
      await Aluno.create({
        nome_aluno,
        data_nascimento,
        genero,
        email,
        tipo_logradouro,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
        id_responsavel,
      });
    } else if (action === "alterar") {
      const aluno = await Aluno.findByPk(id_aluno);
      if (!aluno) {
        return res.status(404).json({
          error: `Aluno não encontrado na tabela de alunos - ID: ${id_aluno}.`,
        });
      }
      aluno.nome_aluno = nome_aluno;
      aluno.data_nascimento = data_nascimento;
      aluno.genero = genero;
      aluno.email = email;
      aluno.tipo_logradouro = tipo_logradouro;
      aluno.logradouro = logradouro;
      aluno.numero = numero;
      aluno.bairro = bairro;
      aluno.cidade = cidade;
      aluno.estado = estado;
      aluno.id_responsavel = id_responsavel;
      await aluno.save();
    } else {
      return res.status(400).json({ error: "Ação inválida." });
    }

    // Redireciona após operação bem-sucedida
    res.redirect("/alunos");
  } catch (error) {
    console.error("Erro ao editar aluno:", error);
    res.status(500).json({ error: "Erro ao editar aluno." });
  }
});

// Rota para excluir dados da tabela de alunos
app.post("/excluir_aluno/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const aluno = await Aluno.findByPk(id);
    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado." });
    }
    // Exclui o aluno com a chave informada
    await Aluno.destroy({
      where: {
        id_aluno: id,
      },
    });
    res.redirect("/alunos");
  } catch (error) {
    console.error("Erro ao excluir aluno:", error);
    res.status(500).json({ error: "Erro ao excluir aluno." });
  }
});
/*app.get("/disciplina_curso", async (req, res) => {
  try {
    const disciplinasCursos = await DisciplinaCurso.findAll({ raw: true });
    res.render("cad_disciplina_curso", { disciplinasCursos: disciplinasCursos });
  } catch (error) {
    console.error("Erro ao buscar relações Disciplina-Curso:", error);
    res.status(500).json({ error: "Erro ao buscar relações Disciplina-Curso." });
  }
});*/

//ROTA DISCIPLINA CURSO
// Rota para inserir ou alterar dados na tabela DisciplinaCurso
/*app.post("/editar_disciplina_curso", async (req, res) => {
  try {
    const { id_disciplina, id_curso, action } = req.body;

    // Verifica se a ação é para incluir
    if (action === "incluir") {
      await DisciplinaCurso.create({
        id_disciplina,
        id_curso,
      });
    }
    // Verifica se a ação é para alterar
    else if (action === "alterar") {
      const disciplinaCurso = await DisciplinaCurso.findOne({
        where: { id_disciplina, id_curso },
      });
      if (!disciplinaCurso) {
        return res.status(404).json({
          error: `Relação Disciplina-Curso não encontrada - ID Disciplina: ${id_disciplina}, ID Curso: ${id_curso}.`,
        });
      }
      // Pode-se adicionar código aqui para alterar os campos, se necessário
      await disciplinaCurso.save();
    } else {
      return res.status(400).json({ error: "Ação inválida." });
    }

    // Redireciona após operação bem-sucedida
    res.redirect("/disciplina_curso");
  } catch (error) {
    console.error("Erro ao editar relação Disciplina-Curso:", error);
    res.status(500).json({ error: "Erro ao editar relação Disciplina-Curso." });
  }
});

// Rota para excluir dados da tabela DisciplinaCurso
app.post("/excluir_disciplina_curso/:id_disciplina/:id_curso", async (req, res) => {
  try {
    const { id_disciplina, id_curso } = req.params;
    const disciplinaCurso = await DisciplinaCurso.findOne({
      where: { id_disciplina, id_curso },
    });
    if (!disciplinaCurso) {
      return res.status(404).json({ error: "Relação Disciplina-Curso não encontrada." });
    }
    // Exclui a relação Disciplina-Curso com as chaves informadas
    await DisciplinaCurso.destroy({
      where: { id_disciplina, id_curso },
    });
    res.redirect("/disciplina_curso");
  } catch (error) {
    console.error("Erro ao excluir relação Disciplina-Curso:", error);
    res.status(500).json({ error: "Erro ao excluir relação Disciplina-Curso." });
  }
});*/


app.get("/disciplinas", (req, res) => {
  Disciplina.findAll({
    raw: true,
    order: [
      ["id_disciplina", "DESC"], // ASC = Crescente || DESC = Decrescente
    ],
  }).then((disciplinas) => {
    res.render("cad_disciplinas", {
      disciplinas: disciplinas,
    });
  });
});

// Dados da matriz de pessoas
/*var pessoas = [
{
    nome: "Daniel Costa",
    idade: 18,
},
{
    nome: "Yuri Silva",
    idade: 20,
},
{
    nome: "Arthur Gonzaga",
    idade: 24,
},
{
    nome: "Cleisson Silva",
    idade: 24,
},
{
    nome: "Marcos Jr.",
    idade: 24,
},
]*/



// Rota para inserir ou alterar dados na tabela
app.post("/editar_disciplina", async (req, res) => {
  try {
    const { nome_disciplina, carga_horaria, descricao_disciplina, action, id_disciplina } = req.body;

    // Verifica se a ação é para incluir
    if (action === "incluir") {
      await Disciplina.create({
        nome_disciplina,
        carga_horaria,
        descricao_disciplina,
      });
    } 
    // Verifica se a ação é para alterar
    else if (action === "alterar") {
      const disciplina = await Disciplina.findByPk(id_disciplina);
      if (!disciplina) {
        return res.status(404).json({
          error: `Disciplina não encontrada na tabela de disciplinas - ID: ${id_disciplina}.`,
        });
      }
      disciplina.nome_disciplina = nome_disciplina;
      disciplina.carga_horaria = carga_horaria;
      disciplina.descricao_disciplina = descricao_disciplina;
      await disciplina.save();
    } else {
      return res.status(400).json({ error: "Ação inválida." });
    }
    
    // Redireciona após operação bem-sucedida
    res.redirect("/disciplinas");
  } catch (error) {
    console.error("Erro ao editar disciplina:", error);
    res.status(500).json({ error: "Erro ao editar disciplina." });
  }
});

// Rota para excluir dados da tabela
app.post("/excluir_disciplina/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const disciplina = await Disciplina.findByPk(id);
    if (!disciplina) {
      return res.status(404).json({ error: "Disciplina não encontrada." });
    }
    // Exclui a disciplina com a chave informada
    await Disciplina.destroy({
      where: {
        id_disciplina: id,
      },
    });
    res.redirect("/disciplinas");
  } catch (error) {
    console.error("Erro ao excluir disciplina:", error);
    res.status(500).json({ error: "Erro ao excluir disciplina." });
  }
});

// Define a rota para renderizar a página

// Rota para exibir todas as associações entre disciplinas e cursos
app.get("/disciplina_curso", async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    const disciplinas = await Disciplina.findAll();
    const disciplinaCursos = await DisciplinaCurso.findAll();
    const disciplinaCursosVW = await DisciplinaCursoVW.findAll();
    res.render("cad_disciplina_curso.ejs", {
      disciplinaCursos,
      cursos,
      disciplinas,
      disciplinaCursosVW,
    });
  } catch (error) {
    console.error("Erro ao buscar associações de disciplinas e cursos:", error);
    res.status(500).send("Erro ao buscar associações de disciplinas e cursos.");
  }
});

// Rota para inserir ou editar uma associação entre disciplina e curso
app.post("/editar_disciplina_curso", async (req, res) => {
  try {
    const { curso, disciplina, action } = req.body;

    if (action === "incluir") {
      await DisciplinaCurso.create({
        id_curso: curso,
        id_disciplina: disciplina,
      });
      res.redirect("/disciplina_curso");
    } else if (action === "alterar") {
      const id_disciplina_curso = req.body.id_disciplina_curso;
      await DisciplinaCurso.update(
        { id_curso: curso, id_disciplina: disciplina },
        { where: { id_disciplina_curso } }
      );
      res.redirect("/disciplina_curso");
    } else {
      res.status(400).send("Ação inválida.");
    }
  } catch (error) {
    console.error(
      "Erro ao inserir ou editar associação entre disciplina e curso:",
      error
    );
    res
      .status(500)
      .send("Erro ao inserir ou editar associação entre disciplina e curso.");
  }
});

// Rota para excluir uma associação entre disciplina e curso
app.post(
  "/excluir_disciplina_curso/:id_curso/:id_disciplina",
  async (req, res) => {
    try {
      const id_curso = req.params.id_curso;
      const id_disciplina = req.params.id_disciplina;
      await DisciplinaCurso.destroy({
        where: { id_curso: id_curso, id_disciplina: id_disciplina },
      });
      res.redirect("/disciplina_curso");
    } catch (error) {
      console.error(
        "Erro ao excluir associação entre disciplina e curso:",
        error
      );
      res
        .status(500)
        .send("Erro ao excluir associação entre disciplina e curso.");
    }
  }
);

/*app.get("/DisciplinaCurso", (req, res) => {
  res.render("DisciplinaCurso", { DisciplinaCurso: DisciplinaCurso });
});*/
app.get('/formas_pagamento', async (req, res) => {
  try {
    const formas_pagamento = await Forma_Pag.findAll({
      raw: true,
      order: [["id_pagamento", "DESC"]],
    });
    res.render('cad_forma_pagamento', { formas_pagamento: formas_pagamento });
  } catch (error) {
    console.error("Erro ao carregar formas de pagamento:", error);
    res.status(500).json({ error: "Erro ao carregar formas de pagamento." });
  }
});

// Rota para inserir ou alterar dados na tabela de formas de pagamento
app.post("/editar_forma_pagamento", async (req, res) => {
  try {
    const { desc_pagamento, action, id_pagamento } = req.body;

    if (action === "incluir") {
      await Forma_Pag.create({
        desc_pagamento,
      });
    } else if (action === "alterar") {
      const forma_pagamento = await Forma_Pag.findByPk(id_pagamento);
      if (!forma_pagamento) {
        return res.status(404).json({
          error: `Forma de pagamento não encontrada na tabela de formas de pagamento - ID: ${id_pagamento}.`,
        });
      }
      forma_pagamento.desc_pagamento = desc_pagamento;
      await forma_pagamento.save();
    } else {
      return res.status(400).json({ error: "Ação inválida." });
    }

    // Redireciona após operação bem-sucedida
    res.redirect("/formas_pagamento");
  } catch (error) {
    console.error("Erro ao editar forma de pagamento:", error);
    res.status(500).json({ error: "Erro ao editar forma de pagamento." });
  }
});

// Rota para excluir dados da tabela de formas de pagamento
app.post("/excluir_forma_pagamento/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const forma_pagamento = await Forma_Pag.findByPk(id);
    if (!forma_pagamento) {
      return res.status(404).json({ error: "Forma de pagamento não encontrada." });
    }
    // Exclui a forma de pagamento com a chave informada
    await Forma_Pag.destroy({
      where: {
        id_pagamento: id,
      },
    });
    res.redirect("/formas_pagamento");
  } catch (error) {
    console.error("Erro ao excluir forma de pagamento:", error);
    res.status(500).json({ error: "Erro ao excluir forma de pagamento." });
  }
});
app.get('/pagamentos', async (req, res) => {
  try {
    const pagamentos = await Pagamento.findAll({
      raw: true,
      order: [["id_pagamento", "DESC"]],
    });
    res.render('cad_pagamento', { pagamentos: pagamentos });
  } catch (error) {
    console.error("Erro ao carregar pagamentos:", error);
    res.status(500).json({ error: "Erro ao carregar pagamentos." });
  }
});

// Rota para inserir ou alterar dados na tabela de pagamentos
app.post("/editar_pagamento", async (req, res) => {
  try {
    const { id_aluno, id_responsavel, valor_pago, valor_devido, data_pagamento, data_vencimento, id_fpagamento, tipo_desconto_id, action, id_pagamento } = req.body;

    if (action === "incluir") {
      await Pagamento.create({
        id_aluno,
        id_responsavel,
        valor_pago,
        valor_devido,
        data_pagamento,
        data_vencimento,
        id_fpagamento,
        tipo_desconto_id,
      });
    } else if (action === "alterar") {
      const pagamento = await Pagamento.findByPk(id_pagamento);
      if (!pagamento) {
        return res.status(404).json({
          error: `Pagamento não encontrado na tabela de pagamentos - ID: ${id_pagamento}.`,
        });
      }
      pagamento.id_aluno = id_aluno;
      pagamento.id_responsavel = id_responsavel;
      pagamento.valor_pago = valor_pago;
      pagamento.valor_devido = valor_devido;
      pagamento.data_pagamento = data_pagamento;
      pagamento.data_vencimento = data_vencimento;
      pagamento.id_fpagamento = id_fpagamento;
      pagamento.tipo_desconto_id = tipo_desconto_id;
      await pagamento.save();
    } else {
      return res.status(400).json({ error: "Ação inválida." });
    }

    // Redireciona após operação bem-sucedida
    res.redirect("/pagamentos");
  } catch (error) {
    console.error("Erro ao editar pagamento:", error);
    res.status(500).json({ error: "Erro ao editar pagamento." });
  }
});

// Rota para excluir dados da tabela de pagamentos
app.post("/excluir_pagamento/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const pagamento = await Pagamento.findByPk(id);
    if (!pagamento) {
      return res.status(404).json({ error: "Pagamento não encontrado." });
    }
    // Exclui o pagamento com a chave informada
    await Pagamento.destroy({
      where: {
        id_pagamento: id,
      },
    });
    res.redirect("/pagamentos");
  } catch (error) {
    console.error("Erro ao excluir pagamento:", error);
    res.status(500).json({ error: "Erro ao excluir pagamento." });
  }
});
app.get('/professores', async (req, res) => {
  try {
    const professores = await Professor.findAll({
      raw: true,
      order: [["id_professor", "DESC"]],
    });
    res.render('cad_professor', { professores: professores });
  } catch (error) {
    console.error("Erro ao carregar professores:", error);
    res.status(500).json({ error: "Erro ao carregar professores." });
  }
});

// Rota para inserir ou alterar dados na tabela de professores
app.post("/editar_professor", async (req, res) => {
  try {
    const { nome_professor, data_nascimento, genero, email, tipo_logradouro, logradouro, numero, bairro, cidade, estado, action, id_professor } = req.body;

    if (action === "incluir") {
      await Professor.create({
        nome_professor,
        data_nascimento,
        genero,
        email,
        tipo_logradouro,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
      });
    } else if (action === "alterar") {
      const professor = await Professor.findByPk(id_professor);
      if (!professor) {
        return res.status(404).json({
          error: `Professor não encontrado na tabela de professores - ID: ${id_professor}.`,
        });
      }
      professor.nome_professor = nome_professor;
      professor.data_nascimento = data_nascimento;
      professor.genero = genero;
      professor.email = email;
      professor.tipo_logradouro = tipo_logradouro;
      professor.logradouro = logradouro;
      professor.numero = numero;
      professor.bairro = bairro;
      professor.cidade = cidade;
      professor.estado = estado;
      await professor.save();
    } else {
      return res.status(400).json({ error: "Ação inválida." });
    }

    // Redireciona após operação bem-sucedida
    res.redirect("/professores");
  } catch (error) {
    console.error("Erro ao editar professor:", error);
    res.status(500).json({ error: "Erro ao editar professor." });
  }
});

// Rota para excluir dados da tabela de professores
app.post("/excluir_professor/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const professor = await Professor.findByPk(id);
    if (!professor) {
      return res.status(404).json({ error: "Professor não encontrado." });
    }
    // Exclui o professor com a chave informada
    await Professor.destroy({
      where: {
        id_professor: id,
      },
    });
    res.redirect("/professores");
  } catch (error) {
    console.error("Erro ao excluir professor:", error);
    res.status(500).json({ error: "Erro ao excluir professor." });
  }
});
app.get('/responsaveis', async (req, res) => {
  try {
    const responsaveis = await Responsavel.findAll({
      raw: true,
      order: [["id_responsavel", "DESC"]],
    });
    res.render('cad_responsavel', { responsaveis: responsaveis });
  } catch (error) {
    console.error("Erro ao carregar responsáveis:", error);
    res.status(500).json({ error: "Erro ao carregar responsáveis." });
  }
});

// Rota para inserir ou alterar dados na tabela de responsáveis
app.post("/editar_responsavel", async (req, res) => {
  try {
    const { nome_responsavel, email, tipo_logradouro, logradouro, numero, bairro, cidade, estado, action, id_responsavel } = req.body;

    if (action === "incluir") {
      await Responsavel.create({
        nome_responsavel,
        email,
        tipo_logradouro,
        logradouro,
        numero,
        bairro,
        cidade,
        estado,
      });
    } else if (action === "alterar") {
      const responsavel = await Responsavel.findByPk(id_responsavel);
      if (!responsavel) {
        return res.status(404).json({
          error: `Responsável não encontrado na tabela de responsáveis - ID: ${id_responsavel}.`,
        });
      }
      responsavel.nome_responsavel = nome_responsavel;
      responsavel.email = email;
      responsavel.tipo_logradouro = tipo_logradouro;
      responsavel.logradouro = logradouro;
      responsavel.numero = numero;
      responsavel.bairro = bairro;
      responsavel.cidade = cidade;
      responsavel.estado = estado;
      await responsavel.save();
    } else {
      return res.status(400).json({ error: "Ação inválida." });
    }

    // Redireciona após operação bem-sucedida
    res.redirect("/responsaveis");
  } catch (error) {
    console.error("Erro ao editar responsável:", error);
    res.status(500).json({ error: "Erro ao editar responsável." });
  }
});

// Rota para excluir dados da tabela de responsáveis
app.post("/excluir_responsavel/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const responsavel = await Responsavel.findByPk(id);
    if (!responsavel) {
      return res.status(404).json({ error: "Responsável não encontrado." });
    }
    // Exclui o responsável com a chave informada
    await Responsavel.destroy({
      where: {
        id_responsavel: id,
      },
    });
    res.redirect("/responsaveis");
  } catch (error) {
    console.error("Erro ao excluir responsável:", error);
    res.status(500).json({ error: "Erro ao excluir responsável." });
  }
});
app.get('/tipos_desconto', async (req, res) => {
  try {
    const tipos_desconto = await Tipo_Desc.findAll({ // Corrigir a chamada para findAll
      raw: true,
      order: [["id_desconto", "DESC"]],
    });
    res.render('cad_tipo_desconto', { tipos_desconto: tipos_desconto });
  } catch (error) {
    console.error("Erro ao carregar tipos de desconto:", error);
    res.status(500).json({ error: "Erro ao carregar tipos de desconto." });
  }
});

// Rota para inserir ou alterar dados na tabela de tipos de desconto
app.post("/editar_tipo_desconto", async (req, res) => {
  try {
    const { tipo_desconto, action, id_tipo_desconto } = req.body;

    if (action === "incluir") {
      await Tipo_Desc.create({
        tipo_desconto,
      });
    } else if (action === "alterar") {
      const tipo_desc = await Tipo_Desc.findByPk(id_tipo_desconto);
      if (!tipo_desc) {
        return res.status(404).json({
          error: `Tipo de desconto não encontrado na tabela de tipos de desconto - ID: ${id_tipo_desconto}.`,
        });
      }
      tipo_desc.tipo_desconto = tipo_desconto;
      await tipo_desc.save();
    } else {
      return res.status(400).json({ error: "Ação inválida." });
    }

    // Redireciona após operação bem-sucedida
    res.redirect("/tipos_desconto");
  } catch (error) {
    console.error("Erro ao editar tipo de desconto:", error);
    res.status(500).json({ error: "Erro ao editar tipo de desconto." });
  }
});

// Rota para excluir dados da tabela de tipos de desconto
app.post("/excluir_tipo_desconto/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const tipo_desc = await Tipo_Desc.findByPk(id);
    if (!tipo_desc) {
      return res.status(404).json({ error: "Tipo de desconto não encontrado." });
    }
    // Exclui o tipo de desconto com a chave informada
    await Tipo_Desc.destroy({
      where: {
        id_desconto: id,
      },
    });
    res.redirect("/tipos_desconto");
  } catch (error) {
    console.error("Erro ao excluir tipo de desconto:", error);
    res.status(500).json({ error: "Erro ao excluir tipo de desconto." });
  }
});

app.get('/alunos_cursos', async (req, res) => {
  try {
    const alunosCursos = await Aluno_Curso.findAll({
      raw: true,
      order: [["id_aluno", "DESC"]],
    });
    res.render('cad_alunos_cursos', { alunosCursos: alunosCursos });
  } catch (error) {
    console.error("Erro ao carregar relações aluno-curso:", error);
    res.status(500).json({ error: "Erro ao carregar relações aluno-curso." });
  }
});

// Rota para inserir ou alterar dados na tabela de alunos_cursos
app.post("/editar_aluno_curso", async (req, res) => {
  try {
    const { id_aluno, id_curso, action } = req.body;

    if (action === "incluir") {
      await Aluno_Curso.create({
        id_aluno,
        id_curso,
      });
    } else if (action === "alterar") {
      const alunoCurso = await Aluno_Curso.findOne({
        where: { id_aluno, id_curso },
      });
      if (!alunoCurso) {
        return res.status(404).json({
          error: `Relação Aluno-Curso não encontrada - Aluno ID: ${id_aluno}, Curso ID: ${id_curso}.`,
        });
      }
      alunoCurso.id_curso = id_curso;
      await alunoCurso.save();
    } else {
      return res.status(400).json({ error: "Ação inválida." });
    }

    // Redireciona após operação bem-sucedida
    res.redirect("/alunos_cursos");
  } catch (error) {
    console.error("Erro ao editar relação aluno-curso:", error);
    res.status(500).json({ error: "Erro ao editar relação aluno-curso." });
  }
});

// Rota para excluir dados da tabela de alunos_cursos
app.post("/excluir_aluno_curso/:id_aluno/:id_curso", async (req, res) => {
  try {
    const { id_aluno, id_curso } = req.params;
    const alunoCurso = await Aluno_Curso.findOne({
      where: { id_aluno, id_curso },
    });
    if (!alunoCurso) {
      return res.status(404).json({ error: "Relação Aluno-Curso não encontrada." });
    }
    // Exclui a relação aluno-curso com a chave informada
    await Aluno_Curso.destroy({
      where: {
        id_aluno,
        id_curso,
      },
    });
    res.redirect("/alunos_cursos");
  } catch (error) {
    console.error("Erro ao excluir relação aluno-curso:", error);
    res.status(500).json({ error: "Erro ao excluir relação aluno-curso." });
  }
});



// Rota para renderizar a página de cursos
app.get('/cursos', async (req, res) => {
  try {
    const cursos = await Curso.findAll({
      raw: true,
      order: [["id_curso", "DESC"]],
    });
    res.render('cad_cursos', { cursos: cursos });
  } catch (error) {
    console.error("Erro ao carregar cursos:", error);
    res.status(500).json({ error: "Erro ao carregar cursos." });
  }
});

app.post("/editar_cursos", async (req, res) => {
  try {
    const { nome_curso, descricao_curso, carga_horaria_total, periodo, id_coordenador, action, id_curso } = req.body;

    if (action === "incluir") {
      await Curso.create({
        nome_curso,
        descricao_curso,
        carga_horaria_total,
        periodo,
        id_coordenador,
      });
    } else if (action === "alterar") {
      const curso = await Curso.findByPk(id_curso);
      if (!curso) {
        return res.status(404).json({
          error: `Curso não encontrado na tabela de cursos - ID: ${id_curso}.`,
        });
      }
      curso.nome_curso = nome_curso;
      curso.descricao_curso = descricao_curso;
      curso.carga_horaria_total = carga_horaria_total;
      curso.periodo = periodo;
      curso.id_coordenador = id_coordenador;
      await curso.save();
    } else {
      return res.status(400).json({ error: "Ação inválida." });
    }

    res.redirect("/cursos");
  } catch (error) {
    console.error("Erro ao editar curso:", error);
    res.status(500).json({ error: "Erro ao editar curso." });
  }
});

// Rota para exibir os cursos (para renderizar o EJS)
app.get('/cursos', async (req, res) => {
  const cursos = await Curso.findAll();
  res.render('index', { cursos });
});
// Rota para excluir dados da tabela de cursos
app.post("/excluir_cursos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const curso = await Curso.findByPk(id);
    if (!curso) {
      return res.status(404).json({ error: "Curso não encontrado." });
    }
    // Exclui o curso com a chave informada
    await Curso.destroy({
      where: {
        id_curso: id,
      },
    });
    res.redirect("/cursos");
  } catch (error) {
    console.error("Erro ao excluir curso:", error);
    res.status(500).json({ error: "Erro ao excluir curso." });
  }
});



app.listen(port, (erro) => {
  if (erro) {
    console.log("Um erro ocorreu na tentativa de inicializar o servidor");
  } else {
    console.log(`O servidor Express foi inicializado com sucesso na porta http://127.0.0.1:${port}`);
    console.log(`Example app listening on port ${port}`);
  }
});
