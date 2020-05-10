const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'), //destino dos arquivos do upload
  storage: multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (req, file, callBack) => {
      //criando caracteres aleatórtios para o nome da imagem nunca (quase) ser igual
      crypto.randomBytes(16, (err, hash) => {
        if (err) callBack(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        callBack(null, fileName);
      });
    },
  }),
  //limites do arquivo exp: tamanho de 2mb
  limits: {
    fileSize: 2 * 1024 * 1024,
  },

  //Filtar opload de arquivos
  fileFilter: (req, file, callBack) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callBack(null, true);
    } else {
      callBack(new Error('Invalid file type'));
    }
  },
};
