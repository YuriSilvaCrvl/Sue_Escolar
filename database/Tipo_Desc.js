const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Tipo_Desconto = connection.define(
  "Tipo_Desconto",
  {
    id_desconto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo_desconto: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "Tipo_Desconto", // Nome da tabela no banco de dados
  }
);

async function sincronizarTipo_Desconto() {
  try {
    await Tipo_Desconto.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//Disciplina.sync({ force: false }).then(() => {});


module.exports = {
  Tipo_Desc: Tipo_Desconto,
    sincronizarTipo_Desconto: sincronizarTipo_Desconto
};