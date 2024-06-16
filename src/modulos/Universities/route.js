const express = require('express');

const response = require('../../red/respuestas')
const controller = require('./controller')

const router = express.Router();

router.post('/', createUniversity);
router.get('/', getUniversities);
router.get('/:id', getUniversity)
router.put('/', updateUniversity)
router.delete('/:id', deleteUniversity)

async function createUniversity(req, res, next){
    try {
        const item = await controller.createUniversity(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getUniversities(req, res, next){
    try {
        const items = await controller.getUniversities()
        response.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function getUniversity(req, res, next){
    try {
        const item = await controller.getUniversity(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function updateUniversity(req, res, next){
    try {
        const item = await controller.updateUniversity(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}


async function deleteUniversity(req, res, next){
    try {
        const item = await controller.deleteUniversity(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

module.exports= router