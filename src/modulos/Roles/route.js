const express = require('express');

const response = require('../../red/respuestas')
const controller = require('./controller')

const router = express.Router();

router.get('/', getRoles);
router.get('/:id', getRol);

async function getRoles(req, res, next){
    try {
        const items = await controller.getRoles()
        response.success(req,res, items, 200);
    } catch (error) {
        next(error)
    }
}

async function getRol(req, res, next){
    try {
        const item = await controller.getRol(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

module.exports= router