const AppError = require("../utils/appError");

//Repositoy de usuáros - Lida com a lógica do banco de dados referente aos usuários
const UserRepository = require("../repositories/UserRepository");
const userRepository = new UserRepository();


class UserController {
  async create(request, response) {
    const { name, email, password } = request.body;

    //Importando o serviço de criação de usuários - Cuida de toda regra de negocio para criação de usuários;
    const UserCreateService = require("../services/user/UserCreateService");
    const userCreateService = new UserCreateService(userRepository);


    await userCreateService.execute({ name, email, password });

    response.status(201).json({ message: "Usuário criado com sucesso!" });
  }

  async update(request, response) {
    //Recuperando informações do body
    const { name, email, password, oldPassword } = request.body;

    //Recuperando id através do objeto user vindo do middleware de autenticação.
    const user_id = request.user.id;

    //Recuperando todos os campos da tabela users onde o userid for igual ao recuperado
    const user = await userRepository.findeById(user_id);

    //Verifica se o usuário existe no banco de dados
    if (!user) throw new AppError("Usuário não encontrado");

    //Recupera o usuário que contenha o email pelo usuário
    const userEmailIsInUse = await userRepository.findByEmail(email || user.email);

    //Verifica o email enviado pelo usuário e certifica de que é possivel fazer a alteração
    //Caso o email enviado exista no banco e não pertença ao usuário em questão, não é possivel alterar.
    //Para isso, comparamos o id do usuário recuperado pelo id enviado no route params com o usuário recuperado do email enviado pelo usuário.
    if (userEmailIsInUse && user.id !== userEmailIsInUse.id) {
      throw new AppError("O email já está sendo utilizado!");
    }

    //Verifica se a senha antiga foi digitada!
    if (password && !oldPassword) {
      throw new AppError(
        "A senha antiga deve ser informada para a mudança de senha!",
      );
    }

    //Verifica se as duas senhas foram digitadas
    if (password && oldPassword) {
      //Compara se a senha anterior bate com a enviada pelo usuário
      //Utilizamos o método compare da biblioteca bcryptjs
      //ela transforma a senha enviada pelo usuário em hash e compara com o hash anterior do banco de dados
      const oldPasswordMatches = await compare(oldPassword, user.password);

      //Verifica se a senha antiga é igual a senha cadastrada no banco
      if (!oldPasswordMatches) {
        throw new AppError(
          "A senha atual não confere. Por favor, digite a senha novamente!",
        );
      }

      const hashPassword = await hash(password, 8);
      user.password = hashPassword;
    }

    //Verificando a informação recuperada da request possui valor ou não
    //Caso não possua, pegue o valor que já esta cadastrado no banco de dados
    user.name = name ?? user.name;
    user.email = email ?? user.email;

    userRepository.update(user_id, user);

    //Atualiza as informações do usuário em questão
    await userRepository.update(user_id, user);

    return response
      .status(201)
      .json({ message: "Usuário atualizado com sucesso!" });
  }
}

module.exports = UserController;
