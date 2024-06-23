const model = require('./model')

exports.createEvent =(data) =>{
    if(!data.name) return 'name not provided'
    if(!data.startDate) return 'startDate not provided'
    if(!data.endDate) return 'endDate not provided'
    if(!data.typeEvent) return 'typeEvent not provided'
    if(!data.status) return 'status not provided'
    return model.createEvent(data)
}

exports.getEvents = () =>{
    return model.getEvents()
}

exports.getEvent =(data) =>{
    if(!data.id) return 'id not provided'
    return model.getEvent(data.id)
}

exports.updateEvent =(data) =>{
    if(!data.id) return 'id not provided'
    if(!data.name) return 'name not provided'
    if(!data.startDate) return 'startDate not provided'
    if(!data.endDate) return 'endDate not provided'
    if(!data.typeEvent) return 'typeEvent not provided'
    if(!data.status) return 'status not provided'
    return model.updateEvent(data)
}

exports.deleteEvent = (data) => {
    if(!data.id) return 'id not provided'
    return model.deleteEvent(data.id)
}

exports.assignCompetition = (data) =>{
    if(!data.idEvent) return 'idEvent not provided'
    if(!data.idCompetition) return 'idCompetition not provided'
    return model.assignCompetition(data.idEvent, data.idCompetition)
}

exports.assignTalk = (data) =>{
    if(!data.idEvent) return 'idEvent not provided'
    if(!data.idTalk) return 'idTalk not provided'
    return model.assignTalk(data.idEvent, data.idTalk)
}

exports.deleteAssignedCompetition =(data) =>{
    if(!data.idEvent) return 'idEvent not provided'
    if(!data.idCompetition) return 'idCompetition not provided'
    return model.deleteAssignedCompetition(data.idEvent, data.idCompetition)
}

exports.deleteAssignedTalk =(data) =>{
    if(!data.idEvent) return 'idEvent not provided'
    if(!data.idTalk) return 'idTalk not provided'
    return model.deleteAssignedTalk(data.idEvent, data.idTalk)
}

exports.getCompetitionsByEvent = (data)=>{
    if(!data.idEvent) return 'idEvento not provided'
    return model.getCompetitionsByEvent(data.idEvent)
}

exports.getTalksByEvent = (data)=>{
    if(!data.idEvent) return 'idEvento not provided'
    return model.getTalksByEvent(data.idEvent)
}