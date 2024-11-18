exports.up = (knex) => {
  //Schema - Propriedade utilizada para alterar a estrutura do banco de dados
  return knex.schema.createTable("notes", (table) => {
    //Increments - Cria uma coluna auto incremntável e que pode ser utilizada como chave primária
    table.increments("id");

    //Text - Cria uma coluna do tipo texto
    table.text("title");
    table.text("description");

    //Integer - Cria uma coluna do tipo inteiro
    //References - Indica que a coluna que está sendo criada faz referencia a uma coluna de uma tabela estrangeira
    //inTable - Indica qual é a tabela de referencia
    table.integer("user_id").references("id").inTable("users");

    //Timestamp - Cria uma tabela do tipo timestamp
    //default - Inicia o registro com um valor padrão
    //knex.fn.now() - Função do knex que recupera o timestamp atual
    table.timestamp("crated_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());

    //O argumento presente indica o nome das colunas que estão sendo criadas!
  });
};

exports.down = (knex) => {
  //Deleta a tabela notes do banco de dados
  return knex.schema.dropTable("notes");
};
