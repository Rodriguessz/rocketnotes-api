const knex = require("../../database/knex/index");
const AppError = require("../../utils/appError");

class TagsController {
  async index(request, response) {
    const user_id = request.user.id;

    //Recupera as tags referentes ao usuário, agrupando por nome para evitar o retorno de tags duplicadas;
    const tags = await knex("tags").where({ user_id }).groupBy("name");
    
    return response.status(200).json(tags);
  }
}

module.exports = TagsController;

