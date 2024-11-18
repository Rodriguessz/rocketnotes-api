exports.up = (knex) => {
  return knex.schema.createTable("links", (table) => {
    table.increments("id");
    table.text("url");
    table
      .integer("note_id")
      .references("id")
      .inTable("notes")
      //OnDelete(Cascade) - Se por acaso a nota em que esse link estiver vinculado for deletada, automaticamente deleta o link do banco de dados.
      .onDelete("cascade");
    table.timestamp("created_at").default(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("links");
};
