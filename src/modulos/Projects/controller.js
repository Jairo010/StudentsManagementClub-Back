const model = require('./model')

exports.createProject =(data) =>{
    if(!data.name) return 'name not provided'
    if(!data.idClub) return 'idClub not provided'
    return model.createProject(data)
}

exports.getProjects = () =>{
    return model.getProjects()
}

exports.getProject =(data) =>{
    if(!data.id) return 'id not provided'
    return model.getProject(data.id)
}

exports.updateProject =(data) =>{
    if(!data.id) return 'id not provided'
    if(!data.name) return 'name not provided'
    if(!data.idClub) return 'idClub not provided'
    return model.updateProject(data)
}

exports.deleteProject = (data) => {
    if(!data.id) return 'id not provided'
    return model.deleteProject(data.id)
}