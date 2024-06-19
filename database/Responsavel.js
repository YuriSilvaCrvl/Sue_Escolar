const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Responsavel = connection.define(
  "responsavelFin",
  {
    id_responsavel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_responsavel: {
      type: DataTypes.STRING(50),
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
    tableName: "Responsavel", // Nome da tabela no banco de dados
  }
);

async function sincronizarResponsavel() {
  try {
    await Responsavel.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//Disciplina.sync({ force: false }).then(() => {});

module.exports = {
  Responsavel: Responsavel,
    sincronizarResponsavel: sincronizarResponsavel
};