const model = require('./model')

exports.createGroup =(data) =>{
    if(!data.name) return 'name not provided'
    if(!data.status == null ) return 'status not provided'
    return model.createGroup(data)
}

exports.getGroups = () =>{
    return model.getGroups()
}

exports.getGroup =(data) =>{
    if(!data.id) return 'id not provided'
    return model.getGroup(data.id)
}

exports.updateGroup =(data) =>{
    if(!data.name) return 'name not provided'
    if(!data.status == null ) return 'status not provided'
    return model.updateGroup(data)
}

exports.deleteGroup = (data) => {
    if(!data.id) return 'id not provided'
    return model.deleteGroup(data.id)
}

exports.assignGroup = (data) =>{
    if(!data.idGroup) return 'idGroup not provided'
    if(!data.card) return 'card not provided'
    if(!data.key) return 'key not provided'
    return model.assignGroup(data.idGroup, data.card, data.key)
}

exports.deleteAssignedGroup = (data) =>{
    if(!data.idGroup) return 'idGroup not provided'
    if(!data.card) return 'card not provided'
    return model.deleteAssignedGroup(data.idGroup, data.card)
}

exports.getParticipantsByGroup =(data) =>{
    if(!data.idGroup) return 'idGroup not provided'
    return model.getParticipantsByGroup(data.idGroup)
}

exports.getCompetitionsOfGroup =(data)=>{
    if(!data.id) return 'id not provided'
    return model .getCompetitionsOfGroup(data.id)
}
