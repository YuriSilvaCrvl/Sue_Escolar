const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Aluno_Curso = connection.define(
  "Aluno_Curso",
  {
    id_aluno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "Aluno_Curso", // Nome da tabela no banco de dados
  }
);

async function sincronizarAluno_Curso() {
  try {
    await Aluno_Curso.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//Disciplina.sync({ force: false }).then(() => {});

module.exports = {
  Aluno_Curso: Aluno_Curso,
    sincronizarAluno_Curso: sincronizarAluno_Curso
};