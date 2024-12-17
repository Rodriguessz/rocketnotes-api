const AppError = require('../../utils/appError');

const UserCreateService = require('./UserCreateService');

//Utiliza o repository in memory para simular a criação de um usuário sem depdender de recursos externos;
const UserRepositoryInMemory = require('../../repositories/user/UserRepositoryInMemory');




//Describe - Utilizado para agrupar um conjunto de testes

describe('UserCreateService', () => {

    //Inicializa as variaveis de servico e repository;
    let userRepositoryInMemory = null;
    let userCreateService = null;

    //Antes de cada teste iniciar, executa a função presente no callback:
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        userCreateService = new UserCreateService(userRepositoryInMemory);
    })

    it('User must be created successfuly', async () => {

        const user = {
            name: "Teste",
            email: "user@test.com",
            password: "123",
        }

        const userCreated = await userCreateService.execute(user);

        expect(userCreated).toHaveProperty('id');
    });


    it('User must not be created with an existing email', async () => {

        const user1 = {
            name: "User Test 1",
            email: "user@test.com",
            password: "123",
        };

        const user2 = {
            name: "User Test 2",
            email: "user@test.com",
            password: "123",
        };

        await userCreateService.execute(user1);

        //Verifica se o tipo da excessão gerada pelo cadastro do seguundo usuário com o mesmo email é igual  ao AppError.
        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("O Email já está sendo utilizado!"));

    })

});




