const express = require('express');

const response = require('../../red/respuestas')
const controller = require('./controller')

const router = express.Router();

router.post('/', createParticipant);
router.get('/', getParticipants);
router.get('/:card', getParticipant)
router.put('/', updateParticipant)
router.delete('/:card', deleteParticipant)

async function createParticipant(req, res, next){
    try {
        const item = await controller.createParticipant(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getParticipants(req, res, next){
    try {
        const items = await controller.getParticipants()
        response.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function getParticipant(req, res, next){
    try {
        const item = await controller.getParticipant(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function updateParticipant(req, res, next){
    try {
        const item = await controller.updateParticipant(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}


async function deleteParticipant(req, res, next){
    try {
        const item = await controller.deleteParticipant(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

module.exports= router