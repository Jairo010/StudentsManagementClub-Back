const supabase = require('../../DB/postgresql').supabase

exports.createTask = async (data) =>{
    const { data: dataTasks, error } = await supabase
    .from('Tareas')
    .insert({ Nombre: data.name , Descripcion: data.description? data.description : null, Fecha_Limite: data.limitDate , Estado: data.state, Evidencia: data.evidence, Id_Proyecto: data.idProject})
    .select()
    if(error) {
        if(error.details) return 'Creating task was wrong'
        return error
    }
    return data
}

exports.getTasks = async () =>{    
    let { data: Tareas, error } = await supabase
    .from('Tareas')
    .select('*, Id_Proyecto(id, Nombre)')
    .order('id', { ascending: true })
    if(error) return error
    return Tareas
}

exports.getTask = async (id) =>{
    let { data: Proyecto, error } = await supabase
    .from('Tareas')
    .select('*, Id_Proyecto(id, Nombre)')
    .eq('id', id)
    .single()
    if(error) {
        if(error.details) return 'Non-existing Task'
        return error
    }
    return Proyecto
}

exports.updateTask = async (data) =>{
    const { data: dataTasks, error } = await supabase
    .from('Tareas')
    .update({Nombre: data.name , Descripcion: data.description, Fecha_Limite: data.limitDate , Estado: data.state, Evidencia: data.evidence, Id_Proyecto: data.idProject})
    .eq('id', data.id)
    .select()
    if(error) {
        if(error.details) return 'Non-existing Task'
        return error
    }
    return data
}

exports.deleteTask = async(id) =>{    
    const project = await this.getProject(id)
    if(!project.id) return 'Non-existing project'
    const { error } = await supabase
    .from('Tareas')
    .delete()
    .eq('id', id)
    if(error) return error
    return 'Task eliminated'
}