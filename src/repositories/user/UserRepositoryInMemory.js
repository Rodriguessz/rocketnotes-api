class UserRepositoryInMemory {
    users = [];

    async insert({name, email , password}){

        //Simula a criação de um usuário com as informações passadas;
        const user = {
            id: Math.floor(Math.random() * 1000) + 1,
            email,
            name, 
            password,
        }
        
        this.users.push(user);

        return user;
    };

    async findByEmail(email){

        const user = this.users.find(user => user.email == email);

        return user;
    };

    async findById(id){
            
            const user = this.users.find(user => user.id == id);
    
            return
    };

}


module.exports = UserRepositoryInMemory;