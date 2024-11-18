const knex = require("../database/knex")
const AppError = require("../utils/appError")

//Importando o provider de DiskStorage para auxilio na manipulação dos arquivos em nossa aplicação.
const DiskStorage = require("../providers/DiskStorage")
const diskStorage = new DiskStorage();

class UserAvatarController {

    async update(request, response){

        //Péga o id do usuário recuperado pelo middleware de autenticação.
        const user_id = request.user.id;

        //Recupera o nome do arquivo enviado pelo usuário após passar pelo middleware do multer;
        const avatarFileName = request.file.filename

        const user = await knex("users").where({ id: user_id}).first();
        if(!user) throw new AppError("Somente usuários autenticados podem alterar a foto de perfil.", 401);

        //Verifica se o usuário já tem uma foto de pefil, caso tenha, remova da pasta de uploads;
        if(user.avatar){
            await diskStorage.delete(user.avatar);
        }

        //Move o arquivo que está na pasta temporaria para a pasta de uploads, retornando o nome do arquivo com o hash gerado pelo multer;
        const fileName = await diskStorage.save(avatarFileName);
        
        //Insere no objeto de usuário a nova imagem;
        user.avatar = fileName;

        //Atualiza o registro no banco de dados
        await knex("users").update(user).where({ id: user_id});

        return response.status(200).json({message: "Foto de perfil atualizada com sucesso!", user});   
    }

}

module.exports = UserAvatarController;