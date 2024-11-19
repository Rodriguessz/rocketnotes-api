//Roteador principal - Centraliza as rotas da aplicação

//Funcionalidade Router permite definir rotas de forma modular
const { Router, response } = require("express");

//Inicializa uma instância de Router
const router = Router();

//Importando os roteador espeficios
const userRouter = require("./user.routes");
const notesRouter = require("./notes.routes");
const tagsRouter = require("./tags.routes");
const sessionsRouter = require("./sessions.routes")

//Declarando rotas mães para recursos especificos - Callback será o carregamento do router especifico
/* router.use("/", (request, response) => response.json({message: "Server on!"})) */
router.use("/users", userRouter);
router.use("/notes", notesRouter);
router.use("/tags", tagsRouter);
router.use("/sessions", sessionsRouter);

//Exportando nosso router
module.exports = router;
