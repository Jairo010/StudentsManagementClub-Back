const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const config = require('./config.js');

const auth = require('./modulos/auth/rutas.js');
const members = require('./modulos/members/route.js');
const clubs = require('./modulos/Clubs/route.js');
const projects = require('./modulos/Projects/route.js');
const tasks = require('./modulos/Tasks/route.js');
const majors = require('./modulos/Majors/route.js')
const roles = require('./modulos/Roles/route.js')
const events = require('./modulos/events/route.js')
const participants = require('./modulos/Participants/route.js')
const universities = require('./modulos/Universities/route.js')
const groups = require('./modulos/Groups/route.js')
const speakers = require('./modulos/Speakers/route.js')
const talks = require('./modulos/Talks/route.js')
const competitions = require('./modulos/Competitions/route.js')
const transactions = require('./modulos/Transactions/route.js')
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
app.use('/api/projects', projects)
app.use('/api/tasks', tasks)
app.use('/api/majors', majors)
app.use('/api/roles', roles)
app.use('/api/events', events)
app.use('/api/participants', participants)
app.use('/api/universities', universities)
app.use('/api/groups', groups)
app.use('/api/speakers', speakers)
app.use('/api/talks', talks)
app.use('/api/competitions', competitions)
app.use('/api/transactions', transactions)

app.use(error)  
//endregion