const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Curso_Disciplina = connection.define(
  "Curso_Disciplina",
  {
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_disciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "curso_disciplina", // Nome da tabela no banco de dados
  }
);

async function sincronizarCurso_Disciplina() {
  try {
    await Curso_Disciplina.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//Disciplina.sync({ force: false }).then(() => {});

module.exports = {
  Curso_Disciplina: Curso_Disciplina,
    sincronizarCurso_Disciplina: sincronizarCurso_Disciplina
};