const model = require('./model')

exports.getMembers =() =>{
    return model.getMembers()
}

exports.getMember =(data) =>{
    if(!data.id) return 'id not provided'
    return model.getMember(data.id)
}

exports.updateMember = (data) =>{
    if(!data.id) return 'id not provided'
    if(!data.card) return 'card not provided'
    if(!data.name) return 'name not provided'
    if(!data.lastName) return 'lastName not provided'
    if(!data.semester) return 'semester not provided'
    if(!data.idMajor) return 'idMajor not provided'
    if(!data.idRol) return 'idRol not provided'
    return model.updateMember(data.id, data.card, data.name, data.lastName, data.semester, data.idMajor, data.idRol)
}

exports.deleteMember = (data) =>{
    if(!data.id) return 'id not provided'
    return model.deleteMember(data.id)
}

exports.getMembersByCard = (data) =>{
    if(!data.card) return 'card not provided'
    return model.getMembersByCard(data.card)
}

exports.getClubsOfMember= (data) =>{
    if(!data.card) return 'card not provided'
    return model.getClubsOfMember(data.card)
} 