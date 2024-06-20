const model = require('./model')

exports.createTalk =(data) =>{
    if(!data.topic) return 'topic not provided'
    if(!data.startDate) return 'startDate not provided'
    if(!data.status) return 'status not provided'
    return model.createTalk(data)
}

exports.getTalks = () =>{
    return model.getTalks()
}

exports.getTalk =(data) =>{
    if(!data.id) return 'id not provided'
    return model.getTalk(data.id)
}

exports.updateTalk =(data) =>{
    if(!data.id) return 'id not provided'
    if(!data.topic) return 'topic not provided'
    if(!data.startDate) return 'startDate not provided'
    if(!data.status) return 'status not provided'
    return model.updateTalk(data)
}

exports.deleteTalk= (data) => {
    if(!data.id) return 'id not provided'
    return model.deleteTalk(data.id)
}

exports.assignTalk = (data) =>{
    if(!data.idTalk) return 'idTalk not provided'
    if(!data.card) return 'card not provided'
    return model.assignTalk(data.idTalk, data.card)
}

exports.deleteAssignedTalk = (data) =>{
    if(!data.idTalk) return 'idTalk not provided'
    if(!data.card) return 'card not provided'
    return model.deleteAssignedTalk(data.idTalk, data.card)
}

exports.getSpeakersByTalk =(data) =>{
    if(!data.idTalk) return 'idTalk not provided'
    return model.getSpeakersByTalk(data.idTalk)
}
