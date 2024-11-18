//Importando os modulos sqlite3 e sqlite
const sqlite3 = require("sqlite3");

const sqlite = require("sqlite");

//Importa o modulo path do node para lidar com endereços em diferentes SO
const path = require("path");

//Função para configruar a conexão com o BD e gerar o arquivo .db

async function sqliteConnection() {
  //Abre uma conexão com o banco de dados e recebe como argumento um objeto de configruação
  const database = await sqlite.open({
    //Filename props - Indica o local e o nome do arquivo .db que será criado
    //Modulo Path - Utilizado para tratar endereços corretamente, independente do SO
    filename: path.resolve(__dirname, "..", "database.db"),
    //Driver props - Indica qual o driver para estabelecer a conexão com o bd será utilizado ( sqlite3)
    driver: sqlite3.Database,
  });

  //Retorna a instância do BD que acabamos de conectar
  return database;
}

module.exports = sqliteConnection;
