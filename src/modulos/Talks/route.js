const express = require('express');

const response = require('../../red/respuestas')
const controller = require('./controller');

const router = express.Router();

router.post('/', createTalk);
router.post('/assign', assignTalk);
router.get('/', getTalks);
router.get('/:id', getTalk)
router.get('/assign/:idTalk', getSpeakersByTalk);
router.put('/', updateTalk)
router.delete('/:id', deleteTalk)
router.delete('/assign/:idTalk/:card', deleteAssignedTalk)

async function createTalk(req, res, next){
    try {
        const item = await controller.createTalk(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getTalks(req, res, next){
    try {
        const items = await controller.getTalks()
        response.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function getTalk(req, res, next){
    try {
        const item = await controller.getTalk(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function updateTalk(req, res, next){
    try {
        const item = await controller.updateTalk(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}


async function deleteTalk(req, res, next){
    try {
        const item = await controller.deleteTalk(req.params)
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

async function deleteAssignedTalk(req, res, next){
    try {
        const item = await controller.deleteAssignedTalk(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getSpeakersByTalk(req, res, next){
    try {
        const item = await controller.getSpeakersByTalk(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

module.exports= router