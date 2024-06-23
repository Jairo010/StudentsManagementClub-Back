const express = require('express');

const response = require('../../red/respuestas')
const controller = require('./controller');

const router = express.Router();

router.post('/', createClub);
router.post('/members', assignMember)
router.get('/', getClubs);
router.get('/:id', getClub);
router.get('/members/:idClub', getMembersByClub)
router.put('/', updateClub);
router.delete('/:id', deleteClub);
router.delete('/members/:idClub/:card', deleteAssignedMember)

async function createClub(req, res, next){
    try {
        const item = await controller.createCLub(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getClubs(req, res, next){
    try {
        const items = await controller.getClubs()
        response.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function getClub(req, res, next){
    try {
        const item = await controller.getClub(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function updateClub(req, res, next){
    try {
        const item = await controller.updateClub(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function deleteClub(req, res, next){
    try {
        const item = await controller.deleteClub(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function assignMember(req, res, next){
    try {
        const item = await controller.assignMember(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getMembersByClub(req, res, next){
    try {
        const items = await controller.getMembersByClub(req.params)
        response.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function deleteAssignedMember(req, res, next){
    try {
        const item = await controller.deleteAssignedMember(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}



module.exports= router
