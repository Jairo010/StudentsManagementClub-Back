const model = require('./model')

exports.createUniversity =(data) =>{
    if(!data.name) return 'name not provided'
    if(!data.city) return 'city not provided'
    if(!data.province) return 'province not provided'
    return model.createUniversity(data)
}

exports.getUniversities = () =>{
    return model.getUniversities()
}

exports.getUniversity =(data) =>{
    if(!data.id) return 'id not provided'
    return model.getUniversity(data.id)
}

exports.updateUniversity =(data) =>{
    if(!data.id) return 'id not provided'
    if(!data.name) return 'name not provided'
    if(!data.city) return 'city not provided'
    if(!data.province) return 'province not provided'
    return model.updateUniversity(data)
}

exports.deleteUniversity = (data) => {
    if(!data.id) return 'id not provided'
    return model.deleteUniversity(data.id)
}