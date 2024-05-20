const supabase = require('../../DB/postgresql').supabase

exports.getRoles = async () =>{
    
    let { data: Roles, error } = await supabase
    .from('Roles')
    .select('*')
    .order('id', { ascending: true })
    if(error) return error
    return Roles
        
}

exports.getRol = async (id) =>{
    let { data: Rol, error } = await supabase
    .from('Roles')
    .select('*')
    .eq('id', id)
    .single()
    if(error) return error
    return Rol
}