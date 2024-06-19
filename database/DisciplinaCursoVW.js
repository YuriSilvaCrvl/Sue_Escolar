const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database"); // Arquivo de configuração da conexão com o banco de dados

class DisciplinaCursoVW extends Model {}

DisciplinaCursoVW.init(
  {
    id_disciplina: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Disciplina",
        key: "id_disciplina",
      },
    },
    nome_disciplina: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Curso",
        key: "id_curso",
      },
    },
    nome_curso: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: false,
    },
  },
  {
    sequelize,
    modelName: "DisciplinaCursoVW",
    tableName: "curso_disciplinavw",
    timestamps: false,
  },
);

async function sincronizarDisciplinaCursoVW() {
  try {
    await DisciplinaCursoVW.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

DisciplinaCursoVW.sync({ force: false }).then(() => {});
module.exports = DisciplinaCursoVW;
