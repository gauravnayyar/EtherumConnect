var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const log4js = require('log4js');

var logger = log4js.getLogger('app');
log4js.configure({
    appenders: { app: { type: 'file', filename: './logs/app.log' } },
    categories: { default: { appenders: ['app'], level: 'all' } }
  });
  
  

 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ethereumMethods = require('./routes/ethereumMethods')
var deployContracts= require('./routes/deployContracts');
var ethereumMiner =require('./routes/miner');
var app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
logger.info('welcome to loggesr')
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/ethereum', ethereumMethods);
app.use('/api/deployContracts',deployContracts)
app.use('/api/miner/',ethereumMiner);
module.exports = app;
