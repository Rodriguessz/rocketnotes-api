const AppError = require("../utils/appError");

const sqliteDb = require("../database/sqlite");

//Importando a função hash da biblioteca bcryptjs

const { hash, compare } = require("bcryptjs");

//Criando o controller de usuários
class UserController {
  async create(request, response) {
    const { name, email, password } = request.body;

    if (!email) {
      throw new AppError("O campo de email é obrigatorio!");
    }

    // Hash - Faz a criptografia da senha com base no valor de SALT ( Fator de complexidade)
    const hashPassword = await hash(password, 8);

    //Estabelece a conexão com o banco de dado
    const database = await sqliteDb();

    //Executa a query em questão e retorna a primeira linha de registro, caso encontrado.
    const emailAlreadyExisits = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email],
    );

    //Verifica se o email enviado na request está presente em nosso BD
    if (emailAlreadyExisits) {
      //Retorna um erro indicando que o email já foi cadastrado
      throw new AppError("O Email já está sendo utilizado!");
    }

    //Inserindo o usuário no banco de dados, caso o email não seja encontrado
    await database.run(
      `INSERT INTO users (name, email, password) VALUES (?, ? , ?) `,
      [name, email, hashPassword],
    );

    response.status(201).json({ message: "Usuário criado com sucesso!" });
  }

  async update(request, response) {
    //Recuperando informações do body
    const { name, email, password, oldPassword } = request.body;
    //Recuperando id através do objeto user vindo do middleware de autenticação.
    const user_id = request.user.id;

    //Abrindo a conexão com o banco
    const database = await sqliteDb();

    //Recuperando todos os campos da tabela users onde o userid for igual ao recuperado
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);
    //Verifica se o usuário existe no banco de dados
    if (!user) throw new AppError("Usuário não encontrado");

    //Recupera o usuário que contenha o email pelo usuário
    const userEmailIsInUse = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email],
    );

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

    //Atualiza as informações do usuário em questão
    await database.run(
      `
        UPDATE users SET
        name = (?),
        email = (?),
        password = (?),
        updated_at = DATETIME('now')
        WHERE id = (?)`,
      [user.name, user.email, user.password, user_id],
    );

    return response
      .status(201)
      .json({ message: "Usuário atualizado com sucesso!" });
  }
}

module.exports = UserController;
