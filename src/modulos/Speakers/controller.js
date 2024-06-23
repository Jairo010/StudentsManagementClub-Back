const model = require('./model')

exports.createSpeaker =(data) =>{
    if(!data.card) return 'card not provided'
    if(!data.name) return 'name not provided'
    if(!data.lastName) return 'lastName not provided'
    if(!data.email) return 'email not provided'
    if(!data.phone) return 'phone not provided'
    if(!data.biography) return 'biography not provided'
    if(!data.topic) return  'topic not provided'
    return model.createSpeaker(data)
}

exports.getSpeakers = () =>{
    return model.getSpeakers()
}

exports.getSpeaker =(data) =>{
    if(!data.card) return 'card not provided'
    return model.getSpeaker(data.card)
}

exports.updateSpeaker =(data) =>{
    if(!data.card) return 'card not provided'
    if(!data.name) return 'name not provided'
    if(!data.lastName) return 'lastName not provided'
    if(!data.email) return 'email not provided'
    if(!data.phone) return 'phone not provided'
    if(!data.biography) return 'biography not provided'
    if(!data.topic) return  'topic not provided'
    return model.updateSpeaker(data)
}

exports.deleteSpeaker= (data) => {
    if(!data.card) return 'card not provided'
    return model.deleteSpeaker(data.card)
}

exports.getTalksOfSpeaker = (data) =>{
    if(!data.card) return 'card not provided'
    return model.getTalksOfSpeaker(data.card)
}