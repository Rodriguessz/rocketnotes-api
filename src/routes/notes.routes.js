const { Router } = require("express");
const notesRoutes = Router();

//Importando o controller de notes
const NotesController = require("../controllers/Notes/NotesController");
const notesController = new NotesController();

//Importando o middleware de autenticação
const ensureAuthentication = require("../middleware/ensureAuthentication");

//Aplicando o middleware para todas as rotas do recurso de notas
notesRoutes.use(ensureAuthentication)

notesRoutes.get("/", notesController.index);

notesRoutes.post("/create", notesController.create);

notesRoutes.get("/:note_id", notesController.show);

notesRoutes.delete("/delete/:note_id", notesController.delete);

module.exports = notesRoutes;
