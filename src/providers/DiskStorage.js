const path = require('path');

//Módulo File System nativo do node.js. Permite a manipulação dos arquivos em nossa aplicação.
const fs = require("fs");

//Configurações de upload definidas no arquivo uploads.js
const uploadConfigs = require('../config/upload')

class DiskStorage{

    //Save - Salva os arquivos de upload, armazenando-os na pasta de uploads
    async save(file){
        //rename (currentPath, newPath) - Método utilizado para mover um arquivo entre pastas ou renomeá-lo no mesmo diretório.
        //Move o arquivo da presente na pasta temporaria para a pasta de armazenamento definitivo ( uploads ).
        await fs.promises.rename(
            path.resolve(uploadConfigs.TMP_FOLDER, file),
            path.resolve(uploadConfigs.UPLOADS_FOLDER, file)
        )

        //Retorna as informações do arquivo
        return file;
    }

    // Delete - Deleta o arquivo da pasta de uploads
    async delete(file){

        //Recupera o caminho do arquivo que será deletado. 
        const filePath = path.resolve(uploadConfigs.UPLOADS_FOLDER, file)

        try{
            //stat - Utilizado para obter informações sobre um arquivo ou diretorio especifico.
            //Caso não encontre o arquivo ou algo inesperado aconteça, dispara um erro. 
            const fileInformations = await fs.promises.stat(filePath)
        
        }catch{
            return console.log("Erro ao deletar arquivo!")
        }

        //Unlink - Deleta o arquivo.s
        await fs.promises.unlink(filePath)
        
    }
}


module.exports = DiskStorage;