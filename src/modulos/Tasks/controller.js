const model = require('./model')

exports.createTask =(data) =>{
    if(!data.name) return 'name not provided'
    if(!data.idProject) return 'idProject not provided'
    return model.createTask(data)
}

exports.assignTask = (data) =>{
    if(!data.idTask) return 'idTask not provided'
    if(!data.card) return 'card not provided'
    return model.assignTask(data.idTask, data.card)
}

exports.getTasks = () =>{
    return model.getTasks()
}

exports.getTask =(data) =>{
    if(!data.id) return 'id not provided'
    return model.getTask(data.id)
}

exports.getTasksByCard = (data) =>{
    if(!data.card) return 'card not provided'
    return model.getTasksByCard(data.card)
}

exports.updateTask =(data) =>{
    if(!data.id) return 'id not provided'
    if(!data.name) return 'name not provided'
    if(!data.idProject) return 'idProject not provided'
    return model.updateTask(data)
}

exports.deleteAssignedTask = (data) =>{
    if(!data.idTask) return 'idTask not provided'
    if(!data.card) return 'card not provided'
    return model.deleteAssignedTask(data.idTask, data.card)
}

exports.deleteTask = (data) => {
    if(!data.id) return 'id not provided'
    return model.deleteTask(data.id)
}