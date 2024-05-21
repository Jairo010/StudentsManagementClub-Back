const express = require('express');

const response = require('../../red/respuestas')
const controller = require('./controller')

const router = express.Router();

router.get('/', getMembers);
router.get('/:id', getMember);
router.get('/getByCard/:card', getMembersByCard);
router.post('/', updateMember);
router.delete('/:id', deleteMember);

async function getMembers(req, res, next){
    try {
        const items = await controller.getMembers()
        //response.success(req,res, items, 200)
        return res.status(200).json( {data:items});
    } catch (error) {
        next(error)
    }
}

async function getMember(req, res, next){
    try {
        const item = await controller.getMember(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function updateMember(req, res, next){
    try {
        const item = await controller.updateMember(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function deleteMember(req, res, next){
    try{
        const item = await controller.deleteMember(req.params)
        response.success(req,res, item, 200)
    } catch (error){
        next(error)
    }
}

async function getMembersByCard(req, res, next){
    try {
        const items = await controller.getMembersByCard(req.params)
        response.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

module.exports= router
