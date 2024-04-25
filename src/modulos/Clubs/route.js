const express = require('express');

const response = require('../../red/respuestas')
const controller = require('./controller')

const router = express.Router();

router.post('/createClub', createClub);

async function createClub(req, res, next){
    try {
        const items = await controller.createCLub(req.body)
        response.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

module.exports= router
