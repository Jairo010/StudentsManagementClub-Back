const model = require('./model')

exports.createCLub =(data) =>{
    if(!data.name) return 'name not provided'
    if(!data.description) return 'description not provided'
    if(!data.cardResponsible) return 'cardResponsible not provided'
    return model.createClub(data.name, data.description, data.cardResponsible)
}

exports.getClubs =() =>{
    return model.getClubs()
}

exports.getClub =(data) =>{
    if(!data.id) return 'id not provided'
    return model.getClub(data.id)
}

exports.updateClub =(data) =>{
    if(!data.id) return 'id not provided'
    if(!data.name) return 'name not provided'
    if(!data.description) return 'description not provided'
    if(!data.cardResponsible) return 'cardResponsible not provided'
    return model.updateClub(data.id,data.name, data.description, data.cardResponsible)
}

exports.deleteClub =(data) =>{
    if(!data.id) return 'id not provided'
    return model.deleteClub(data.id)
}