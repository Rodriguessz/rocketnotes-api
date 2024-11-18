const sqliteDb = require("../../sqlite");
const createTableUsesrQuery = require("../migrations/createUsers");

async function migrationsRun() {
  try {
    //Une as querys do array em uma única string para ser utilizada posteriomente na função exec
    const schemas = [createTableUsesrQuery].join("");
    //Cria uma conexão com o banco de dados e retorna uma instância do mesmo
    const database = await sqliteDb();
    //Executa as queries de schemas
    await database.exec(schemas);
  } catch (error) {
    console.log(`Não foi possivel criar a migration! ${error}`);
  }
}

module.exports = migrationsRun;
