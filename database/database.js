//Importando a biblioteca sequelize
const Sequelize = require("sequelize");

//criando uma instância do Sequelize
//Esta instância é uma conexão com o banco MYSQL
/*const connection = new Sequelize("sue", "root", "", {
    host: "localhost",
    dialect: "mysql",
});*/

const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT, // Adicione esta linha para especificar a porta
      dialect: "mysql",
      dialectOptions: {
        connectTimeout: 60000, // Aumenta o tempo de timeout para 60 segundos
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  );

module.exports = connection;

