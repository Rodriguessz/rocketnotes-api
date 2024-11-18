const { verify } = require("jsonwebtoken");
const auth = require("../config/auth");

const AppError = require("../utils/appError")


function ensureAuthentication(request, response, next) {

    //Recuperando o token enviado no cabeçalho da requisição.
    const authenticationHeader = request.headers.authorization

    //Verifica se o token foi informado 
    if (!authenticationHeader) throw new AppError("Token não informado", 401)

    //Formato do token recuperado -  "Bearer xxxxxxx"
    //Tranforma a string retornada em um array e armazena o valor da segunda posição na váriavel token.
    const [, token] = authenticationHeader.split(" ");

    // Utiliza a função verify da biblioteca jsonwebtoken para validar o token enviado no cabeçalho da requisição.
    // A função verifica a integridade e autenticidade do token, utilizando a chave secreta (SECRET) que foi usada na sua geração.

    try {

        // Caso o token seja válido, desestrutura a propriedade 'sub' do objeto retornado, que contém o ID do usuário que foi fornecido durante a geração do token.
        // Além disso, utiliza-se um alias para renomear a propriedade 'sub' como 'user_id', tornando o código mais semântico e intuitivo.
        const { sub: user_id } = verify(token, auth.jwt.secret);
        
        // Cria uma propriedade no objeto 'request' para armazenar o ID do usuário recuperado do token.
        // Essa propriedade pode ser acessada posteriormente no controller através de 'request.user'.
        request.user = {
            id: Number(user_id)
        }

        //Chama o proximo middleware ou método na fila.
        return next();

    } catch {
        throw new AppError("Token inválido", 401);
    }


}


module.exports = ensureAuthentication;