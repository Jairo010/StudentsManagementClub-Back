const supabase = require('../../DB/postgresql').supabase

exports.getMajors = async () =>{
    
    let { data: Carreras, error } = await supabase
    .from('Carreras')
    .select('*')
    .order('id', { ascending: true })
    if(error) return error
    return Carreras
        
}

exports.getMajor = async (id) =>{
    let { data: Carrera, error } = await supabase
    .from('Carreras')
    .select('*')
    .eq('id', id)
    .single()
    if(error) return error
    return Carrera
}