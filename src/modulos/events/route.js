const express = require('express');

const response = require('../../red/respuestas')
const controller = require('./controller')

const router = express.Router();

router.post('/', createEvent);
router.get('/', getEvents);
router.get('/:id', getEvent)
router.put('/', updateEvent)
router.delete('/:id', deleteEvent)

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

module.exports= router