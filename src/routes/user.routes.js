const { Router } = require("express");
const userRoutes = Router();

//Biblioteca utilizada para lidar com upload de arquivos
const uploadConfigs = require("../config/upload");
const multer = require('multer')

//Instância do multer com base nas configurações especificadas.
//uploadConfigs.MULTER - Contém as configurações para o armazenamento do arquivo recuperado através da requisição.
const upload = multer(uploadConfigs.MULTER)

//Middleware para autenticação de usuários
const ensureAuthentication = require("../middleware/ensureAuthentication");

//Importando o controller do recurso de usuários
const UserController = require("../controllers/UserController");
//Iniciando uma instância do meu controller
const userController = new UserController();


const UserAvatarController = require("../controllers/UserAvatarController")
const userAvatarController = new UserAvatarController();

//Criando uma rota POST para criação de usuários
userRoutes.post("/create", userController.create);

//Criando uma rota PUT para atualização de usuários
userRoutes.put("/", ensureAuthentication , userController.update);

// Criando uma rota PATCH para o upload da foto de perfil do usuário e atualização no banco de dados.
// O middleware 'upload.single("avatar")' é responsável por processar o arquivo enviado no campo 'avatar' da requisição.
userRoutes.patch("/avatar", ensureAuthentication, upload.single("avatar"), userAvatarController.update)


module.exports = userRoutes;
