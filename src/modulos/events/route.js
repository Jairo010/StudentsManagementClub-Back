const express = require('express');

const response = require('../../red/respuestas')
const controller = require('./controller');

const router = express.Router();

router.post('/', createEvent);
router.post('/competition', assignCompetition)
router.post('/talk', assignTalk)
router.get('/', getEvents);
router.get('/:id', getEvent)
router.get('/competition/:idEvent', getCompetitionsByEvent)
router.get('/talk/:idEvent', getTalksByEvent)
router.put('/', updateEvent)
router.delete('/:id', deleteEvent)
router.delete('/competition/:idEvent/:idCompetition', deleteAssignedCompetition)
router.delete('/talk/:idEvent/:idTalk', deleteAssignedTalk)

async function createEvent(req, res, next){
    try {
        const item = await controller.createEvent(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getEvents(req, res, next){
    try {
        const items = await controller.getEvents()
        response.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function getEvent(req, res, next){
    try {
        const item = await controller.getEvent(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function updateEvent(req, res, next){
    try {
        const item = await controller.updateEvent(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}


async function deleteEvent(req, res, next){
    try {
        const item = await controller.deleteEvent(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function assignCompetition(req, res, next){
    try {
        const item = await controller.assignCompetition(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function assignTalk(req, res, next){
    try {
        const item = await controller.assignTalk(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getCompetitionsByEvent(req, res, next){
    try {
        const item = await controller.getCompetitionsByEvent(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getTalksByEvent(req, res, next){
    try {
        const item = await controller.getTalksByEvent(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function deleteAssignedCompetition(req, res, next){
    try {
        const item = await controller.deleteAssignedCompetition(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function deleteAssignedTalk(req, res, next){
    try {
        const item = await controller.deleteAssignedTalk(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

module.exports= router