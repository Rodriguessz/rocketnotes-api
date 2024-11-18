exports.seed = async (knex) => {
  const data = [
    {
      title: "Knex.js - Método Select",
      description: `O método insert no Knex.js é utilizado para inserir um ou mais registros em uma tabela especifica.
                    Ele recebe como argumento um objeto ou array de objetos, onde cada propriedade do objeto refere-se a
                    uma coluna da tabela e os valores, as informações que serão inseridas. Cuidados: Caso a tabela indicada
                    no argumento possua alguma coluna obrigatória, é necessário que o objeto possua a propriedade referente a coluna.
                    Retorno: O método insert devolve o id(PK) gerado do último item inserido na tabela.
                    `,
      user_id: "1",
    },

    {
      title: "Knex.js - Método Where",
      description: `O método where no Knex.js é utilizado para definir condições que filtram os registros retornados do banco de dados.
                    Ele recebe dois argumentos: O primeiro é a coluna a ser comparada e segundo representa o valor de comparação.
                    Exemplo: Preciso trazer todos os dados do meu usuário que tem o identificador (1).
                    Sintaxe: knex("tabela").where(coluna, valor_comparação)
                    `,
      user_id: "2",
    },
  ];
  // Deletes ALL existing entries
  await knex("notes").del();
  await knex("notes").insert(data);
};
