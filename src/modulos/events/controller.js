const model = require('./model')

exports.createEvent =(data) =>{
    if(!data.name) return 'name not provided'
    if(!data.startDate) return 'startDate not provided'
    if(!data.endDate) return 'endDate not provided'
    if(!data.typeEvent) return 'typeEvent not provided'
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
    return model.updateEvent(data)
}

exports.deleteEvent = (data) => {
    if(!data.id) return 'id not provided'
    return model.deleteEvent(data.id)
}