const express = require('express');

const response = require('../../red/respuestas')
const controller = require('./controller');

const router = express.Router();

router.post('/', createCompetition);
router.post('/assign', assignCompetition);
router.get('/', getCompetitions);
router.get('/:id', getCompetition)
router.get('/assign/:idCompetition', getGroupsByCompetition);
router.put('/', updateCompetition)
router.delete('/:id', deleteCompetition)
router.delete('/assign/:idCompetition/:idGroup', deleteAssignedCompetition)

async function createCompetition(req, res, next){
    try {
        const item = await controller.createCompetition(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getCompetitions(req, res, next){
    try {
        const items = await controller.getCompetitions()
        response.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function getCompetition(req, res, next){
    try {
        const item = await controller.getCompetition(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function updateCompetition(req, res, next){
    try {
        const item = await controller.updateCompetition(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}


async function deleteCompetition(req, res, next){
    try {
        const item = await controller.deleteCompetition(req.params)
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

async function deleteAssignedCompetition(req, res, next){
    try {
        const item = await controller.deleteAssignedCompetition(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getGroupsByCompetition(req, res, next){
    try {
        const item = await controller.getGroupsByCompetition(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

module.exports= router