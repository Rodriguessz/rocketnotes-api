const path = require("path");

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db"),
    },
    pool: {
      afterCreate: (connection, callback) => {
        return connection.run("PRAGMA foreign_keys = ON", callback);
      },
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations",
      ),
    },

    seeds: {
      directory: path.resolve(__dirname, "src", "database", "knex", "seeds"),
    },
    useNullAsDefault: true,
  },
};
