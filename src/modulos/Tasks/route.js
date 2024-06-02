const express = require('express');

const response = require('../../red/respuestas')
const controller = require('./controller')

const router = express.Router();

router.post('/', createTask);
router.post('/assignTask', assignTask);
router.get('/', getTasks);
router.get('/:id', getTask)
router.get('/getByCard/:card', getTasksByCard)
router.put('/', updateTask)
router.delete('/:id', deleteTask)

async function createTask(req, res, next){
    try {
        const item = await controller.createTask(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function assignTask(req, res, next){
    try {
        const item = await controller.assignTask(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getTasks(req, res, next){
    try {
        const items = await controller.getTasks()
        response.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function getTask(req, res, next){
    try {
        const item = await controller.getTask(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getTasksByCard(req, res, next){
    try {
        const items = await controller.getTasksByCard(req.params)
        response.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function updateTask(req, res, next){
    try {
        const item = await controller.updateTask(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}


async function deleteTask(req, res, next){
    try {
        const item = await controller.deleteTask(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

module.exports= router