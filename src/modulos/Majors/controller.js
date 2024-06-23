const model = require('./model')

exports.getMajors =() =>{
    return model.getMajors()
}

exports.getMajor =(data) =>{
    if(!data.id) return 'id not provided'
    return model.getMajor(data.id)
}