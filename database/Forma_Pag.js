const { DataTypes, Sequelize } = require("sequelize");
const connection = require("./database");

// Definição do modelo (MODEL) que corresponde à uma tabela do banco de dados.
const Forma_pagamento = connection.define(
  "Forma_pagamento",
  {
    id_pagamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    desc_pagamento: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
  },
  {
    timestamps: true, // Habilita a criação automática de campos de timestamp
    tableName: "Forma_pagamento", // Nome da tabela no banco de dados
  }
);

async function sincronizarForma_pagamento() {
  try {
    await Forma_pagamento.sync({ force: false });
  } catch (error) {
    console.error("Erro ao sincronizar a tabela: ", error);
  } finally {
    await connection.close();
    console.log("Conexão fechada.");
  }
}

//Disciplina.sync({ force: false }).then(() => {});

module.exports = {
  Forma_Pag: Forma_pagamento,
  sincronizarForma_pagamento: sincronizarForma_pagamento
};
