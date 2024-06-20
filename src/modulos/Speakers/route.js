const express = require('express');

const response = require('../../red/respuestas')
const controller = require('./controller');

const router = express.Router();

router.post('/', createSpeaker);
router.get('/', getSpeakers);
router.get('/assign/:card', getTalksOfSpeaker)
router.get('/:card', getSpeaker)
router.put('/', updateSpeaker)
router.delete('/:card', deleteSpeaker)

async function createSpeaker(req, res, next){
    try {
        const item = await controller.createSpeaker(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getSpeakers(req, res, next){
    try {
        const items = await controller.getSpeakers()
        response.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function getSpeaker(req, res, next){
    try {
        const item = await controller.getSpeaker(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function updateSpeaker(req, res, next){
    try {
        const item = await controller.updateSpeaker(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}


async function deleteSpeaker(req, res, next){
    try {
        const item = await controller.deleteSpeaker(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getTalksOfSpeaker(req, res, next){
    try {
        const item = await controller.getTalksOfSpeaker(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

module.exports= router