exports.up = (knex) => {
  return knex.schema.createTable("tags", (table) => {
    table.increments("id");
    table.text("name");
    //OnDelete(Cascade) - Caso a linha referencial da tabela estrangeira for deletada, apague minha tag automaticamente
    table
      .integer("note_id")
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("tags");
};
