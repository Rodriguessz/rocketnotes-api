const knex = require("../../database/knex")
const AppError = require("../../utils/appError");

const { compare } = require("bcryptjs")
const { sign } = require('jsonwebtoken')
const auth = require("../../config/auth")



class SessionsController {

    //Método responsável por criar uma sessão para o usuário
    async create(request, response){
        const { email , password } = request.body;

        //Recupera o usuário do banco de acordo com o email enviado via requisição;
        const user = await knex("users").where("email", email).first();
    
        //Valida se existe algum usuário com esse email no banco de dados; 
        if(!user) throw new AppError("E-mail e/ou senha iconrreta", 401)
        
        //Valida se a senha digita confere com a senha cadastrada no banco;
        const passwordMatched = await compare(password, user.password)
        if(!passwordMatched) throw new AppError("E-mail e/ou senha iconrreta", 401);
        
        //Gera o token de autenticação do usuário
        // Sign (PAYLOAD, SECRET , OPTIONS)
        const { secret, expiresIn } = auth.jwt; 
        const token =  sign({}, secret, {
            subject: String(user.id),
            expiresIn: expiresIn
        } )

        return response.status(200).json({user, token})
    }

}


module.exports = SessionsController;