const supabase = require('../../DB/postgresql').supabase

exports.createCompetition = async (data) =>{
    const { data: competition, error } = await supabase
    .from('Concursos')
    .insert(
    { Tipo_Concurso: data.type, Num_Max_Integrantes: data.numParticipants, Valor_Inscripcion: data.price, Estado: data.status})
    .select()
    .single()
    if(error) return error
    return competition
}

exports.getCompetitions = async () =>{        
    let { data: competitions, error } = await supabase
    .from('Concursos')
    .select('*')
    .order('id', { ascending: true })
    if(error) return error
    return competitions
}

exports.getCompetition = async (id) =>{
    let { data: competition, error } = await supabase
    .from('Concursos')
    .select('*')
    .eq("id", id)
    .single()
    if(error) return error
    return competition
}

exports.updateCompetition = async (data) =>{
    const { data: competition, error } = await supabase
    .from('Concursos')
    .update({Tipo_Concurso: data.type, Num_Max_Integrantes: data.numParticipants, Valor_Inscripcion: data.price, Estado: data.status})
    .eq('id', data.id)
    .select()
    .single()
    if(error) return error
    return competition
}

exports.deleteCompetition = async(id) =>{    
    const competition = await this.getCompetition(id)
    if(!competition.id) return 'Non-existing competition'
    const { error } = await supabase
    .from('Concursos')
    .delete()
    .eq('id', id)
    if(error) return error
    return "competition eliminated"
}

exports.assignCompetition = async (idCompetition, idGroup) => {
    const competition = await this.getCompetition(idCompetition)
    if(!competition.id) return 'Non-existing competition'
    let { data: DetalleCompetition, errorCompetition } = await supabase
    .from('DetalleConcursos')
    .select("*")
    .eq('Id_Concurso', idCompetition)
    .eq('Id_Grupo', idGroup)   
    if(errorCompetition) return errorCompetition
    if(DetalleCompetition.length>0) return 'competition already assigned to group'
    const { data, error } = await supabase
    .from('DetalleConcursos')
    .insert({ Id_Concurso: idCompetition, Id_Grupo: idGroup})
    .select()
    if(error) return error
    return "Competition: " + idCompetition + " assigned to the group: "+ idGroup
}

exports.deleteAssignedCompetition= async(idCompetition, idGroup) =>{
    const { error } = await supabase
    .from('DetalleConcursos')
    .delete()
    .eq('Id_Concurso', idCompetition)
    .eq("Id_Grupo", idGroup)
    if(error) return error
    return "assigned group deleted"      
}

exports.getGroupsByCompetition = async (idCompetition) =>{    
    let { data: DetalleCompetition, error } = await supabase
    .from('DetalleConcursos')
    .select('Grupos (*)')
    .eq('Id_Concurso', idCompetition)
    if(error) return error
    const newGroups=  DetalleCompetition.map(group=> {
        return {"id_Grupo": group.Grupos.Id_Grupo, 
                "Nombre_Grupo": group.Grupos.Nombre_Grupo,
                "Descripcion_Grupo": group.Grupos.Descripcion_Grupo,
                "Habilitado_Grupo": group.Grupos.Habilitado_Grupo,
                }
    })
    return newGroups
} 