const { DataTypes, Model } = require("sequelize");
const sequelize = require("./database"); // Arquivo de configuração da conexão com o banco de dados

class DisciplinaCurso extends Model {}

DisciplinaCurso.init(
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
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Curso",
        key: "id_curso",
      },
    },
  },
  {
    sequelize,
    modelName: "DisciplinaCurso",
    tableName: "disciplina_curso",
    timestamps: true,
  }
);

async function sincronizarDisciplinaCurso() {
  try {
    await DisciplinaCurso.sync({ force: true });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

 module.exports = DisciplinaCurso;
