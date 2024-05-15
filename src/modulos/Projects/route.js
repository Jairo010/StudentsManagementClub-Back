const express = require('express');

const response = require('../../red/respuestas')
const controller = require('./controller')

const router = express.Router();

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProject)
router.put('/', updateProject)
router.delete('/:id', deleteProject)

async function createProject(req, res, next){
    try {
        const item = await controller.createProject(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getProjects(req, res, next){
    try {
        const items = await controller.getProjects()
        response.success(req,res, items, 200)
    } catch (error) {
        next(error)
    }
}

async function updateProject(req, res, next){
    try {
        const item = await controller.updateProject(req.body)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function getProject(req, res, next){
    try {
        const item = await controller.getProject(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

async function deleteProject(req, res, next){
    try {
        const item = await controller.deleteProject(req.params)
        response.success(req,res, item, 200)
    } catch (error) {
        next(error)
    }
}

module.exports= router