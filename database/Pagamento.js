const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Pagamento = connection.define(
  "Pagamento",
  {
    id_pagamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    id_aluno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_responsavel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    valor_pago: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    valor_devido: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    data_pagamento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_vencimento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    id_fpagamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    tipo_desconto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },

  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "pagamento", // Nome da tabela no banco de dados
  }
);

async function sincronizarPagamento() {
  try {
    await Pagamento.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//Disciplina.sync({ force: false }).then(() => {});

module.exports = {
  Pagamento: Pagamento,
    sincronizarPagamento: sincronizarPagamento
};