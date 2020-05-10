const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //lidar com requisições no padrão urlencoded //facilita envio de arquivos
app.use(morgan('dev')); //Ter acesso ao log de requisições

app.use(require('./routes'));

app.listen(3000);
