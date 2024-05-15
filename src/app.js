const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const config = require('./config.js');

const auth = require('./modulos/auth/rutas.js');
const members = require('./modulos/members/route.js');
const clubs = require('./modulos/Clubs/route.js');
const error = require('./red/errors');

const app = express();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//#region Configuración

app.set('port', config.app.port);

module.exports = app;

//#endregion

//#region Rutas
app.use('/api/auth', auth)
app.use('/api/members', members)
app.use('/api/clubs', clubs)
app.use(error)  

//endregion

