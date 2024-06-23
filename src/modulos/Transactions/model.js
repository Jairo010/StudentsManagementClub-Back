const supabase = require('../../DB/postgresql').supabase

exports.createTransaction = async (data) =>{
    const currentDate= new Date()
    const formattedDate = currentDate.toISOString()
    const { data: dataTransaction, error } = await supabase
    .from('Transacciones')
    .insert({ Fecha_Transaccion: formattedDate , Monto_Transaccion: data.amount, Tipo_Registro: data.typeRegister, Tipo_Transaccion: data.typeTransaction, Id_Concurso: data.idCompetition, Id_Grupo: data.idGroup, Total: data.total, Descripcion: data.description})
    .select('*, Id_Concurso(*), Id_Grupo(Id_Grupo, Nombre_Grupo, Descripcion_Grupo, Habilitado_Grupo)')
    if(error) {
        if(error.details) return error.details
        return error
    }
    return dataTransaction
}

exports.getTransactions = async () =>{    
    let { data: transactions, error } = await supabase
    .from('Transacciones')
    .select('*, Id_Concurso(*), Id_Grupo(Id_Grupo, Nombre_Grupo, Descripcion_Grupo, Habilitado_Grupo)')
    .order('Fecha_Transaccion', { ascending: true })
    if(error) return error
    return transactions
}

exports.getTransaction = async (id) =>{
    let { data: transactions, error } = await supabase
    .from('Transacciones')
    .select('*, Id_Concurso(*), Id_Grupo(Id_Grupo, Nombre_Grupo, Descripcion_Grupo, Habilitado_Grupo)')
    .eq('id_Transaccion', id)
    .single()
    if(error) {
        if(error.details) return 'non-existing transaction'
        return error
    }
    return transactions
}

exports.updateTransaction = async (data) =>{
    const transaction = await this.getTransaction(data.id)
    const { data: dataTransaction, error } = await supabase
    .from('Transacciones')
    .update({Fecha_Transaccion: transaction.Fecha_Transaccion , Monto_Transaccion: data.amount, Tipo_Registro: data.typeRegister, Tipo_Transaccion: data.typeTransaction, Id_Concurso: data.idCompetition, Id_Grupo: data.idGroup,  Total: data.total, Descripcion: data.description})
    .eq('id_Transaccion', data.id)
    .select()
    if(error) {
        if(error.details) return 'non-existing transaction'
        return error
    }
    return dataTransaction
}

exports.deleteTransaction = async(id) =>{    
    const transaction = await this.getTransaction(id)
    if(!transaction.id_Transaccion) return 'non-existing transaction'
    const { error } = await supabase
    .from('Transacciones')
    .delete()
    .eq('id_Transaccion', id)
    if(error) return error
    return 'transaction eliminated'
}
