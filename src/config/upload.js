const path = require('path');

// Biblioteca para manipulação de upload de arquivos
const multer = require('multer');

const crypto = require('crypto');

// TMP_FOLDER - Diretório temporário para armazenar os arquivos de upload provisoriamente.
// Os arquivos são salvos aqui até que o back-end processe e decida o que fazer com eles (por exemplo, movê-los ou excluí-los).
const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");

// UPLOADS_FOLDER - Diretório para armazenamento definitivo dos arquivos de upload.
// Após o processamento pelo back-end, os arquivos serão movidos para essa pasta de forma permanente.
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

// MULTER - Configurações da biblioteca multer para lidar com o armazenamento dos arquivos de upload.
const MULTER = {

    // storage - Define como o multer armazena os arquivos.
    // multer.diskStorage - Configura o armazenamento no disco, usando um objeto de opções.
    storage: multer.diskStorage({

        // destination - Define o diretório onde os arquivos serão armazenados temporariamente.
        destination: TMP_FOLDER,

        // filename (request, file, callback) - Gera o nome final do arquivo antes de salvá-lo.
        // O nome gerado é único para evitar conflitos com outros arquivos que tenham o mesmo nome.
        filename(request, file, callback) {

            // Gera um hash aleatório hexadecimal para garantir um nome único ao arquivo.
            const fileHash = crypto.randomBytes(10).toString('hex');

            // Cria o nome final do arquivo no formato: hash-nomeOriginal.extensao.
            // O campo correto para o nome original é file.originalname (tudo minúsculo).
            const filename = `${fileHash}-${file.originalname}`;

            // Retorna o nome gerado para o callback, continuando o processo de upload.
            return callback(null, filename);
        }
    })
};

module.exports = {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER
};
