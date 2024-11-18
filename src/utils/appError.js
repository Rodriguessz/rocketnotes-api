//Classe para padronizar mensagens de erro e tratar excessões
//Por padrão, será utilizada tratar para erros de cliente
class AppError {
  message;
  statusCode;

  //Inicia as props assim que uma instância da classe for chamada
  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
