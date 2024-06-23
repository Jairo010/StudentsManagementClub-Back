const model = require('./model')

exports.getRoles =() =>{
    return model.getRoles()
}

exports.getRol =(data) =>{
    if(!data.id) return 'id not provided'
    return model.getRol(data.id)
}