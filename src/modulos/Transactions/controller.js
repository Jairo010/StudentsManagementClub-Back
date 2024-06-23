const model = require('./model')

exports.createTransaction =(data) =>{
    if(!data.amount) return 'amount not provided'
    if(!data.typeRegister) return 'typeRegister not provided'
    if(!data.typeTransaction) return 'typeTransaction not provided'
    if(!data.idCompetition) return 'idCompetition not provided'
    if(!data.idGroup) return 'idGroup not provided'
    if(!data.total) return 'total not provided'
    if(!data.description) return 'description not provided'
    return model.createTransaction(data)
}

exports.getTransactions = () =>{
    return model.getTransactions()
}

exports.getTransaction =(data) =>{
    if(!data.id) return 'id not provided'
    return model.getTransaction(data.id)
}

exports.updateTransaction =(data) =>{
    if(!data.id) return 'id not provided'
    if(!data.amount) return 'amount not provided'
    if(!data.typeRegister) return 'typeRegister not provided'
    if(!data.typeTransaction) return 'typeTransaction not provided'
    if(!data.idCompetition) return 'idCompetition not provided'
    if(!data.idGroup) return 'idGroup not provided'
    if(!data.total) return 'total not provided'
    if(!data.description) return 'description not provided'
    return model.updateTransaction(data)
}

exports.deleteTransaction = (data) => {
    if(!data.id) return 'id not provided'
    return model.deleteTransaction(data.id)
}
