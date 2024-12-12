const knex = require('../database/knex/index');
const AppError = require('../utils/appError');


class UserRepository {

    async findByEmail(email) {
        try {
            const user = await knex('users').where({ email }).first();
            return user;

        } catch (err) {
            return err;
        }
    }


    async insert(name, email, hashPassword) {
        try {
            if (!name || !email || !hashPassword) throw new AppError('Argumentos faltando');

            const userInfos = {
                name,
                email,
                password: hashPassword
            }
            
            const [createdId] = await knex('users').insert(userInfos);


            return { id: createdId};
        
        } catch (err) {
            return err;
        }
    }

}


module.exports = UserRepository;