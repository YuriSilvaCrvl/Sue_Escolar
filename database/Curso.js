// Importar os módulos necessários utilizados pelo SEQUELIZE
const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Curso = connection.define(
  "curso",
  {
    id_curso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_curso: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    descricao_curso: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    carga_horaria_total: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    periodo: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    id_coordenador: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "curso", // Nome da tabela no banco de dados
  }
);

async function sincronizarCurso() {
  try {
    await Curso.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

Curso.sync({ force: false }).then(() => {});

module.exports = Curso;

//module.exports = sincronizarCurso();

/*module.exports = {
    Curso: Curso,
    sincronizarCurso: sincronizarCurso
  };*/
