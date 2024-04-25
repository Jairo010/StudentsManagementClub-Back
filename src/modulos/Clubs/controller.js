const model = require('./model')

exports.createCLub =(data) =>{
    if(!data.name) return 'There is no name'
    if(!data.description) return 'There is no description'
    if(!data.responsible) return 'There is no responsible'
    return model.createClub(data.name, data.description, data.responsible)
}