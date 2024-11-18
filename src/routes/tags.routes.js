const { Router } = require("express");
const tagsRoutes = Router();

//Importandno o controller de tags da minha aplicação
const TagsController = require("../controllers/Tags/TagsController");
const tagsController = new TagsController();

//Importando o middleware de autenticação
const ensureAuthentication = require("../middleware/ensureAuthentication")

//EnsureAuthentication - Middleware de autenticação de usuário;
tagsRoutes.get("/", ensureAuthentication,  tagsController.index);

module.exports = tagsRoutes;

