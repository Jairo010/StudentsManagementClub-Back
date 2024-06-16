const supabase = require('../../DB/postgresql').supabase

exports.createUniversity = async (data) =>{
    const { data: university, error } = await supabase
    .from('Universidades')
    .insert(
    { Nombre_Universidad: data.name, Ciudad_Universidad: data.city, Provincia_Universidad: data.province})
    .select()
    .single()
    if(error) return error
    return university
}

exports.getUniversities = async () =>{        
    let { data: universities, error } = await supabase
    .from('Universidades')
    .select('*')
    .order('Nombre_Universidad', { ascending: true })
    if(error) return error
    return universities
}

exports.getUniversity = async (id) =>{
    let { data: university, error } = await supabase
    .from('Universidades')
    .select('*')
    .eq("Id_Universidades", id)
    .single()
    if(error) return error
    return university
}

exports.updateUniversity = async (data) =>{
    
    const { data: university, error } = await supabase
    .from('Universidades')
    .update({Nombre_Universidad: data.name, Ciudad_Universidad: data.city, Provincia_Universidad: data.province})
    .eq('Id_Universidades', data.id)
    .select()
    .single()
    if(error) return error
    return university
}

exports.deleteUniversity = async(id) =>{    
    const university = await this.getUniversity(id)
    if(!university.Id_Universidades) return 'Non-existing university'
    const { error } = await supabase
    .from('Universidades')
    .delete()
    .eq('Id_Universidades', id)
    if(error) return error
    return "university eliminated"
}