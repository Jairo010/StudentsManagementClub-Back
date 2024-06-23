const express = require('express');

const response = require('../../red/respuestas')
const controller = require('./controller')

const router = express.Router();

router.post('/', createTransaction);
router.get('/', getTransactions);
router.get('/:id', getTransaction)
router.put('/', updateTransaction)
router.delete('/:id', deleteTransaction)

async function createTransaction(req, res, next){
    try {
        const item = await controller.createTransaction(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getTransactions(req, res, next){
    try {
        const items = await controller.getTransactions()
        response.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function updateTransaction(req, res, next){
    try {
        const item = await controller.updateTransaction(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getTransaction(req, res, next){
    try {
        const item = await controller.getTransaction(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function deleteTransaction(req, res, next){
    try {
        const item = await controller.deleteTransaction(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}
module.exports= router