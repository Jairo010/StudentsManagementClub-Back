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

exports.getTasksByCard = async (card) =>{    
    let { data: DetalleTareas, error } = await supabase
    .from('DetalleTareas')
    .select('Tareas (*, Id_Proyecto (id, Nombre, Id_Club(id, Nombre)))')
    .eq('Id_Integrante', card)
    if(error) return error
    const newTasks=  DetalleTareas.map(Tarea=> {
        return {"id": Tarea.Tareas.id, 
                "estado": Tarea.Tareas.Estado,
                "nombre": Tarea.Tareas.Nombre,
                "evidencia": Tarea.Tareas.Evidencia,
               "descripcion": Tarea.Tareas.Descripcion,
                "idProyecto": Tarea.Tareas.Id_Proyecto.id,
                "nombreProyecto": Tarea.Tareas.Id_Proyecto.Nombre,
                "idClub": Tarea.Tareas.Id_Proyecto.Id_Club.id,
                "nombreClub": Tarea.Tareas.Id_Proyecto.Id_Club.Nombre
                }
    })
    return newTasks
}   

exports.assignTask = async (idTask, card) => {
    
    let { data: DetalleTareas, errorTareas } = await supabase
    .from('DetalleTareas')
    .select("*")
    .eq('Id_Tarea', idTask)
    .eq('Id_Integrante', card)   
    if(errorTareas) return errorTareas
    if(DetalleTareas.length>0) return 'Task already assigned to member'
    const { data, error } = await supabase
    .from('DetalleTareas')
    .insert({ Id_Tarea: idTask, Id_Integrante: card})
    .select()
    if(error) return error
    return "Task: " + idTask + " assigned to the student: "+ card
}

exports.deleteAssignedTask= async(idTask, card) =>{
    const { error } = await supabase
    .from('DetalleTareas')
    .delete()
    .eq('Id_Tarea', idTask)
    .eq("Id_Integrante", card)
    if(error) return error
    return "assigned task deleted"      
}

exports.deleteTask = async(id) =>{    
    const project = await this.getTask(id)
    if(!project.id) return 'Non-existing task'
    const { error } = await supabase
    .from('Tareas')
    .delete()
    .eq('id', id)
    if(error) return error
    return 'Task eliminated'
}