const supabase = require('../../DB/postgresql').supabase

exports.createEvent = async (data) =>{
    const { data: event, error } = await supabase
    .from('Eventos')
    .insert(
    { Nombre: data.name, Descripcion: data.description, Fecha_Ini: data.startDate, Fecha_Fin: data.endDate, Tipo_Evento: data.typeEvent, Estado: data.status})
    .select()
    .single()
    if(error) return error
    return event
}

exports.getEvents = async () =>{        
    let { data: Events, error } = await supabase
    .from('Eventos')
    .select('*')
    .order('id', { ascending: false })
    if(error) return error
    return Events
}

exports.getEvent = async (id) =>{
    let { data: Event, error } = await supabase
    .from('Eventos')
    .select('*')
    .eq("id", id)
    .single()
    if(error) return error
    return Event
}

exports.updateEvent = async (data) =>{
    
    const { data: event, error } = await supabase
    .from('Eventos')
    .update({Nombre: data.name, Descripcion: data.description, Fecha_Ini: data.startDate, Fecha_Fin: data.endDate, Tipo_Evento: data.typeEvent, Estado: data.status})
    .eq('id', data.id)
    .select()
    .single()
    if(error) return error
    return event
}

exports.deleteEvent = async(id) =>{    
    const event = await this.getEvent(id)
    if(!event.id) return 'Non-existing event'
    const { error } = await supabase
    .from('Eventos')
    .delete()
    .eq('id', id)
    if(error) return error
    return "event eliminated"
}

exports.assignCompetition = async (idEvent, idCompetition) => {
    const event = await this.getEvent(idEvent)
    if(!event.id) return 'Non-existing event'
    let { data: DetalleEvent, errorEvent } = await supabase
    .from('DetalleEventosConcursos')
    .select("*")
    .eq('Id_Evento', idEvent)
    .eq('Id_Concurso', idCompetition)   
    if(errorEvent) return errorEvent
    if(DetalleEvent.length>0) return 'competition already assigned to event'
    const { data, error } = await supabase
    .from('DetalleEventosConcursos')
    .insert({ Id_Evento: idEvent, Id_Concurso: idCompetition})
    .select()
    if(error) return error
    return "competition: " + idCompetition+ " assigned to the event: "+ idEvent
}

exports.assignTalk = async (idEvent, idTalk) => {
    const event = await this.getEvent(idEvent)
    if(!event.id) return 'Non-existing event'
    let { data: DetalleEvent, errorEvent } = await supabase
    .from('DetalleEventosCharlas')
    .select("*")
    .eq('Id_Evento', idEvent)
    .eq('Id_Charla', idTalk)   
    if(errorEvent) return errorEvent
    if(DetalleEvent.length>0) return 'talk already assigned to event'
    const { data, error } = await supabase
    .from('DetalleEventosCharlas')
    .insert({ Id_Evento: idEvent, Id_Charla: idTalk})
    .select()
    if(error) return error
    return "talk: " + idTalk+ " assigned to the event: "+ idEvent
}

exports.deleteAssignedCompetition= async(idEvent, idCompetition) =>{
    const { error } = await supabase
    .from('DetalleEventosConcursos')
    .delete()
    .eq('Id_Evento', idEvent)
    .eq("Id_Concurso", idCompetition)
    if(error) return error
    return "assigned competition deleted"      
}

exports.deleteAssignedTalk= async(idEvent, idTalk) =>{
    const { error } = await supabase
    .from('DetalleEventosCharlas')
    .delete()
    .eq('Id_Evento', idEvent)
    .eq("Id_Charla", idTalk)
    if(error) return error
    return "assigned talk deleted"      
}

exports.getCompetitionsByEvent = async (idEvent) =>{    
    let { data: DetalleEvent, error } = await supabase
    .from('DetalleEventosConcursos')
    .select('Concursos (*)')
    .eq('Id_Evento', idEvent)
    if(error) return error
    const newCompetitions=  DetalleEvent.map(competition=> {
        return {
                "id": competition.Concursos.id,
                "Tipo_Concurso": competition.Concursos.Tipo_Concurso,
                "Num_Max_Integrantes": competition.Concursos.Num_Max_Integrantes,
                "Valor_Inscripcion": competition.Concursos.Valor_Inscripcion,
                "Estado": competition.Concursos.Estado
                }
    })
    return newCompetitions
} 

exports.getTalksByEvent = async (idEvent) =>{    
    let { data: DetalleEvent, error } = await supabase
    .from('DetalleEventosCharlas')
    .select('Charlas (*)')
    .eq('Id_Evento', idEvent)
    if(error) return error
    const newTalks=  DetalleEvent.map(talk=> {
        return {
                "id_Charla": talk.Charlas.id_Charla,
                "Tema_Charla": talk.Charlas.Tema_Charla,
                "Imagen_Charla": talk.Charlas.Imagen_Charla,
                "Hora_Inicio": talk.Charlas.Hora_Inicio,
                "Hora_Fin": talk.Charlas.Hora_Fin,
                "Estado_Charla": talk.Charlas.Estado_Charla
                }
    })
    return newTalks
} 