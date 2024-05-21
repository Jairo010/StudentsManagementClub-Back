const supabase = require('../../DB/postgresql').supabase

exports.createProject = async (data) =>{
    const currentDate= new Date()
    const formattedDate = currentDate.toISOString()
    const { data: dataProject, error } = await supabase
    .from('Proyectos')
    .insert({ Nombre: data.name , Descripcion: data.description? data.description : null, Fecha_Ini: data.startDate ? data.startDate: formattedDate, Fecha_Fin: data.endDate, Id_Club: data.idClub})
    .select()
    if(error) {
        if(error.details) return 'Creating project was wrong'
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
        if(error.details) return 'Non-existing Project'
        return error
    }
    return Proyecto
}

exports.updateProject = async (data) =>{
    const { data: dataProject, error } = await supabase
    .from('Proyectos')
    .update({Nombre: data.name , Descripcion: data.description, Fecha_Ini: data.startDate , Fecha_Fin: data.endDate, Id_Club: data.idClub})
    .eq('id', data.id)
    .select()
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