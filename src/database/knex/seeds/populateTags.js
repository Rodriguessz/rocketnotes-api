exports.seed = async function (knex) {
  const data = [
    { name: "select", note_id: "14", user_id: "1" },
    { name: "where", note_id: "15", user_id: "2" },
  ];
  // Deletes ALL existing entries
  await knex("tags").del();
  await knex("tags").insert(data);
};
