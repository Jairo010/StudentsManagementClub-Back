const model = require('./model')

exports.createCompetition =(data) =>{
    if(!data.type) return 'type not provided'
    if(!data.numParticipants) return 'numParticipants not provided'
    if(!data.price) return 'price not provided'
    if(!data.status) return 'status not provided'
    return model.createCompetition(data)
}

exports.getCompetitions = () =>{
    return model.getCompetitions()
}

exports.getCompetition =(data) =>{
    if(!data.id) return 'id not provided'
    return model.getCompetition(data.id)
}

exports.updateCompetition =(data) =>{
    if(!data.id) return 'id not provided'
    if(!data.type) return 'type not provided'
    if(!data.numParticipants) return 'numParticipants not provided'
    if(!data.price) return 'price not provided'
    if(!data.status) return 'status not provided'
    return model.updateCompetition(data)
}

exports.deleteCompetition= (data) => {
    if(!data.id) return 'id not provided'
    return model.deleteCompetition(data.id)
}

exports.assignCompetition = (data) =>{
    if(!data.idCompetition) return 'idcompetition not provided'
    if(!data.idGroup) return 'idGroup not provided'
    return model.assignCompetition(data.idCompetition, data.idGroup)
}

exports.deleteAssignedCompetition = (data) =>{
    if(!data.idCompetition) return 'idCompetition not provided'
    if(!data.idGroup) return 'idGroup not provided'
    return model.deleteAssignedCompetition(data.idCompetition, data.idGroup)
}

exports.getGroupsByCompetition =(data) =>{
    if(!data.idCompetition) return 'idCompetition not provided'
    return model.getGroupsByCompetition(data.idCompetition)
}