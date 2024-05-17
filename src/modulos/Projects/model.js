const supabase = require('../../DB/postgresql').supabase

exports.createProject = async (dato) =>{
    const currentDate= new Date()
    const formattedDate = currentDate.toISOString()
    const { data, error } = await supabase
    .from('Proyectos')
    .insert({ Nombre: dato.name , Descripcion: dato.description? dato.description : null, Fecha_Ini: dato.startDate ? dato.startDate: formattedDate, Fecha_Fin: dato.endDate, Id_Club: dato.idClub})
    .select('*, Id_Club(id, Nombre)')
    if(error) {
        if(error.details) return 'Non-existing club'
        return error
    }
    return data
}

exports.getProjects = async () =>{    
    let { data: Proyectos, error } = await supabase
    .from('Proyectos')
    .select('*, Id_Club(id, Nombre)')
    .order('id', { ascending: true })
    if(error) return error
    return Proyectos
}

exports.getProject = async (id) =>{
    let { data: Proyecto, error } = await supabase
    .from('Proyectos')
    .select('*, Id_Club(id, Nombre)')
    .eq('id', id)
    .single()
    if(error) {
        if(error.details) return 'Non-existing Club'
        return error
    }
    return Proyecto
}

exports.updateProject = async (dato) =>{
    const { data, error } = await supabase
    .from('Proyectos')
    .update({Nombre: dato.name , Descripcion: dato.description, Fecha_Ini: dato.startDate , Fecha_Fin: dato.endDate, Id_Club: dato.idClub})
    .eq('id', dato.id)
    .select('*, Id_Club(id, Nombre)')
    if(error) {
        if(error.details) return 'Non-existing Club'
        return error
    }
    return data
}

exports.deleteProject = async(id) =>{    
    const project = await this.getProject(id)
    if(!project.id) return 'Non-existing project'
    const { error } = await supabase
    .from('Proyectos')
    .delete()
    .eq('id', id)
    if(error) return error
    return 'project eliminated'
}