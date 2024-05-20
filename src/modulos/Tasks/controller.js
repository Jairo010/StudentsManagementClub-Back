const model = require('./model')

exports.createTask =(data) =>{
    if(!data.name) return 'name not provided'
    if(!data.idProject) return 'idProject not provided'
    return model.createTask(data)
}

exports.getTasks = () =>{
    return model.getTasks()
}

exports.getTask =(data) =>{
    if(!data.id) return 'id not provided'
    return model.getTask(data.id)
}

exports.updateTask =(data) =>{
    if(!data.id) return 'id not provided'
    if(!data.name) return 'name not provided'
    if(!data.idProject) return 'idProject not provided'
    return model.updateTask(data)
}

exports.deleteTask = (data) => {
    if(!data.id) return 'id not provided'
    return model.deleteTask(data.id)
}