const express = require('express');

const response = require('../../red/respuestas')
const controller = require('./controller')

const router = express.Router();

router.get('/', getMajors);
router.get('/:id', getMajor);

async function getMajors(req, res, next){
    try {
        const items = await controller.getMajors()
        response.success(req,res, items, 200);
    } catch (error) {
        next(error)
    }
}

async function getMajor(req, res, next){
    try {
        const item = await controller.getMajor(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

module.exports= router