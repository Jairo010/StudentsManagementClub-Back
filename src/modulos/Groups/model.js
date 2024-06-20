const supabase = require('../../DB/postgresql').supabase

exports.createGroup = async (data) =>{
    const clave = generarClave()
    const { data: group, error } = await supabase
    .from('Grupos')
    .insert(
    { Nombre_Grupo: data.name, Descripcion_Grupo: data.description, Habilitado_Grupo: data.status, Clave_Grupo: clave})
    .select()
    .single()
    if(error) return error
    return group
}

exports.getGroups = async () =>{        
    let { data: groups, error } = await supabase
    .from('Grupos')
    .select('*')
    .order('Id_Grupo', { ascending: true })
    if(error) return error
    return groups
}

exports.getGroup = async (id) =>{
    let { data: group, error } = await supabase
    .from('Grupos')
    .select('*')
    .eq("Id_Grupo", id)
    .single()
    if(error) return error
    return group
}

exports.updateGroup = async (data) =>{
    const clave = generarClave()
    const { data: group, error } = await supabase
    .from('Grupos')
    .update({Nombre_Grupo: data.name, Descripcion_Grupo: data.description, Habilitado_Grupo: data.status, Clave_Grupo: clave})
    .eq('Id_Grupo', data.id)
    .select()
    .single()
    if(error) return error
    return group
}

exports.deleteGroup = async(id) =>{    
    const group = await this.getGroup(id)
    if(!group.Id_Grupo) return 'Non-existing group'
    const { error } = await supabase
    .from('Grupos')
    .delete()
    .eq('Id_Grupo', id)
    if(error) return error
    return "group eliminated"
}

exports.assignGroup = async (idGroup, card, key) => {
    const group = await this.getGroup(idGroup)
    console.log(group)
    if(!group.Id_Grupo) return 'Non-existing group'
    if(group.Clave_Grupo != key) return 'invalid key'
    let { data: DetalleGroup, errorGroup } = await supabase
    .from('DetalleGrupos')
    .select("*")
    .eq('Id_Grupo', idGroup)
    .eq('Cedula_Participante', card)   
    if(errorGroup) return errorGroup
    if(DetalleGroup.length>0) return 'Group already assigned to participant'
    const { data, error } = await supabase
    .from('DetalleGrupos')
    .insert({ Id_Grupo: idGroup, Cedula_Participante: card})
    .select()
    if(error) return error
    return "Group: " + idGroup + " assigned to the participant: "+ card
}

exports.deleteAssignedGroup= async(idGroup, card) =>{
    const { error } = await supabase
    .from('DetalleGrupos')
    .delete()
    .eq('Id_Grupo', idGroup)
    .eq("Cedula_Participante", card)
    if(error) return error
    return "assigned participant deleted"      
}

exports.getParticipantsByGroup = async (idGroup) =>{    
    let { data: DetalleGrupo, error } = await supabase
    .from('DetalleGrupos')
    .select('Participantes (*, Id_Universidad (*))')
    .eq('Id_Grupo', idGroup)
    if(error) return error
    console.log(DetalleGrupo)
    const newParticipants=  DetalleGrupo.map(Participant=> {
        return {"cedula": Participant.Participantes.Cedula_Participante, 
                "nombre": Participant.Participantes.Nombre_Participante, 
                "apellido": Participant.Participantes.Apellido_Participante,
                "correo": Participant.Participantes.Correo_Participante,
                "documento": Participant.Participantes.Documento_Habilitante,
                "universidad": Participant.Participantes.Id_Universidad,
                "habilitado": Participant.Participantes.Habilitado_Participante,  
                }
    })
    return newParticipants
} 

exports.getCompetitionsOfGroup = async(id) => {
    const group = await this.getGroup(id)
    if(!group.Id_Grupo) return 'Non-existing group'
    let { data: DetalleCompetition, error } = await supabase
    .from('DetalleConcursos')
    .select('Concursos (*)')
    .eq('Id_Grupo', id)
    if(error) return error
    const newCompetitions=  DetalleCompetition.map(competition=> {
        return {"id": competition.Concursos.id, 
                "Tipo_Concurso": competition.Concursos.Tipo_Concurso,
                "Num_Max_Integrantes": competition.Concursos.Num_Max_Integrantes,
                "Valor_Inscripcion": competition.Concursos.Valor_Inscripcion,
                "Estado": competition.Concursos.Estado
                }
    })
    return newCompetitions
}

function generarClave(){
    const clave = Math.floor(10000 + Math.random() * 90000);
    console.log(clave)
    return clave;
}