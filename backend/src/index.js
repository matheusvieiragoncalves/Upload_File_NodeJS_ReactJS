const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

/**
 * Database setup
 */

mongoose.connect('mongodb://192.168.99.100:27017/upload', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //lidar com requisições no padrão urlencoded //facilita envio de arquivos
app.use(morgan('dev')); //Ter acesso ao log de requisições

app.use(require('./routes'));

app.listen(3000);
