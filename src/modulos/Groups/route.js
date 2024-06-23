const express = require('express');

const response = require('../../red/respuestas')
const controller = require('./controller');

const router = express.Router();

router.post('/', createGroup);
router.post('/assign', assignGroup);
router.get('/', getGroups);
router.get('/:id', getGroup)
router.get('/assign/:idGroup', getParticipantsByGroup);
router.get('/assign/competitions/:id', getCompetitionsOfGroup);
router.put('/', updateGroup)
router.delete('/:id', deleteGroup)
router.delete('/assign/:idGroup/:card', deleteAssignedGroup)

async function createGroup(req, res, next){
    try {
        const item = await controller.createGroup(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getGroups(req, res, next){
    try {
        const items = await controller.getGroups()
        response.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function getGroup(req, res, next){
    try {
        const item = await controller.getGroup(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function updateGroup(req, res, next){
    try {
        const item = await controller.updateGroup(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}


async function deleteGroup(req, res, next){
    try {
        const item = await controller.deleteGroup(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}


async function assignGroup(req, res, next){
    try {
        const item = await controller.assignGroup(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function deleteAssignedGroup(req, res, next){
    try {
        const item = await controller.deleteAssignedGroup(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getParticipantsByGroup(req, res, next){
    try {
        const item = await controller.getParticipantsByGroup(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getCompetitionsOfGroup(req, res, next){
    try {
        const item = await controller.getCompetitionsOfGroup(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

module.exports= router