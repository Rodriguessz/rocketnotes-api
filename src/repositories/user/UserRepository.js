const knex = require('../../database/knex/index');
const AppError = require('../../utils/appError');


class UserRepository {

    async findByEmail(email) {
        try {
            const user = await knex('users').where({ email }).first();
            return user;

        } catch (err) {
            return err;
        }
    }

    async findeById(id){
        try{
            const user = await knex('users').where({ id }).first();
            return user;

        }catch(err){
            return err;
        }
    }


    async insert({name, email, password}) {
        try {
            if (!name || !email || !password) throw new AppError('Argumentos faltando');

            const userInfos = {
                name,
                email,
                password
            }
            
            const [createdId] = await knex('users').insert(userInfos);


            return { id: createdId};
        
        } catch (err) {
            return err;
        }
    }

    async update(userId, userObject){

        const updated_at = (new Date()).toLocaleString('sv-SE', { 
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
         });

        const user = {...userObject, updated_at };
        
        try{
            await knex('users').update(user).where({id: userId});
       }catch(err){
            return err;
       }
    }

}


module.exports = UserRepository;