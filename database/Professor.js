const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Professor = connection.define(
  "Professor",
  {
    id_professor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_professor: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    data_nascimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    tipo_logradouro: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
    logradouro: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  numero: {
    type: DataTypes.INTEGER(10),
    allowNull: false,
  },
  bairro: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "professor", // Nome da tabela no banco de dados
  }
);

async function sincronizarProfessor() {
  try {
    await Professor.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//Disciplina.sync({ force: false }).then(() => {});

module.exports = {
   Professor: Professor,
    sincronizarProfessor: sincronizarProfessor
};