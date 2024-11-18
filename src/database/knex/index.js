//Importando o arquivo de configurações do Knex.js gerado e configurado na raiz do projeto
const configs = require("../../../knexfile");
//Importando o knex.js
const knex = require("knex");

//Criando uma instaância do Knex que servirá como um cliente para acessarmos nosso banco de dados
//Argumento - Configurações que serão utilizadas para fazer a conexão (Knexfile.js)
const knexConnection = knex(configs.development);

//Exportando a instância do Knex
module.exports = knexConnection;
