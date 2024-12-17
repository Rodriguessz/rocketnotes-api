//Importando a função hash da biblioteca bcryptjs
const { hash, compare } = require("bcryptjs");

const AppError = require("../../utils/appError");

class UserCreateService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({name, email , password}){

        if (!email) {
            throw new AppError("O campo de email é obrigatorio!");
        }
    
        // Hash - Faz a criptografia da senha com base no valor de SALT ( Fator de complexidade)
        const hashPassword = await hash(password, 8);
    
        //Executa a query em questão e retorna a primeira linha de registro, caso encontrado.
        const emailAlreadyExisits = await this.userRepository.findByEmail(email);
    
        
        //Verifica se o email enviado na request está presente em nosso BD
        if (emailAlreadyExisits) {
            //Retorna um erro indicando que o email já foi cadastrado
            throw new AppError("O Email já está sendo utilizado!");
        }
    
        //Inserindo o usuário no banco de dados, caso o email não seja encontrado
        const user = await this.userRepository.insert({name, email, password: hashPassword});
        
        return user;
    }


}

module.exports = UserCreateService;