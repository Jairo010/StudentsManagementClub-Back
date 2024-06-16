const model = require('./model')

exports.createParticipant =(data) =>{
    if(!data.card) return 'card not provided'
    if(!data.name) return 'name not provided'
    if(!data.lastName) return 'lastName not provided'
    if(!data.email) return 'email not provided'
    if(!data.document) return 'document not provided'
    if(!data.idUniversity) return 'idUniversity not provided'
    if(data.status  ==null) return 'status not provided'
    return model.createParticipant(data)
}

exports.getParticipants = () =>{
    return model.getParticipants()
}

exports.getParticipant =(data) =>{
    if(!data.card) return 'card not provided'
    return model.getParticipant(data.card)
}

exports.updateParticipant =(data) =>{
    if(!data.card) return 'card not provided'
    if(!data.name) return 'name not provided'
    if(!data.lastName) return 'lastName not provided'
    if(!data.email) return 'email not provided'
    if(!data.document) return 'document not provided'
    if(!data.idUniversity) return 'idUniversity not provided'
    if(data.status == null) return 'status not provided'
    return model.updateParticipant(data)
}

exports.deleteParticipant = (data) => {
    if(!data.card) return 'card not provided'
    return model.deleteParticipant(data.card)
}

exports.getGroupsOfParticipant = (data) =>{
    if(!data.card) return 'card not provided'
    return model.getGroupsOfParticipant(data.card)
}