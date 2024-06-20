const supabase = require('../../DB/postgresql').supabase

exports.createTalk = async (data) =>{
    const { data: talk, error } = await supabase
    .from('Charlas')
    .insert(
    { Tema_Charla: data.topic, Imagen_Charla: data.image, Hora_Inicio: data.startDate, Hora_Fin: data.endDate, Estado_Charla: data.status})
    .select()
    .single()
    if(error) return error
    return talk
}

exports.getTalks = async () =>{        
    let { data: talks, error } = await supabase
    .from('Charlas')
    .select('*')
    .order('id_Charla', { ascending: true })
    if(error) return error
    return talks
}

exports.getTalk = async (id) =>{
    let { data: talk, error } = await supabase
    .from('Charlas')
    .select('*')
    .eq("id_Charla", id)
    .single()
    if(error) return error
    return talk
}

exports.updateTalk = async (data) =>{
    const { data: talk, error } = await supabase
    .from('Charlas')
    .update({Tema_Charla: data.topic, Imagen_Charla: data.image, Hora_Inicio: data.startDate, Hora_Fin: data.endDate, Estado_Charla: data.status})
    .eq('id_Charla', data.id)
    .select()
    .single()
    if(error) return error
    return talk
}

exports.deleteTalk = async(id) =>{    
    const talk = await this.getTalk(id)
    if(!talk.id_Charla) return 'Non-existing talk'
    const { error } = await supabase
    .from('Charlas')
    .delete()
    .eq('id_Charla', id)
    if(error) return error
    return "talk eliminated"
}

exports.assignTalk = async (idTalk, card) => {
    const talk = await this.getTalk(idTalk)
    if(!talk.id_Charla) return 'Non-existing talk'
    let { data: DetalleTalk, errorTalk } = await supabase
    .from('DetalleCharlas')
    .select("*")
    .eq('Id_Charla', idTalk)
    .eq('Cedula_Ponente', card)   
    if(errorTalk) return errorTalk
    if(DetalleTalk.length>0) return 'Talk already assigned to speaker'
    const { data, error } = await supabase
    .from('DetalleCharlas')
    .insert({ Id_Charla: idTalk, Cedula_Ponente: card})
    .select()
    if(error) return error
    return "Talk: " + idTalk + " assigned to the speaker: "+ card
}

exports.deleteAssignedTalk= async(idTalk, card) =>{
    const { error } = await supabase
    .from('DetalleCharlas')
    .delete()
    .eq('Id_Charla', idTalk)
    .eq("Cedula_Ponente", card)
    if(error) return error
    return "assigned speaker deleted"      
}

exports.getSpeakersByTalk = async (idTalk) =>{    
    let { data: DetalleTalk, error } = await supabase
    .from('DetalleCharlas')
    .select('Ponentes (*)')
    .eq('Id_Charla', idTalk)
    if(error) return error
    const newSpeakers=  DetalleTalk.map(speaker=> {
        return {"cedula": speaker.Ponentes.Cedula_Ponente, 
                "nombre": speaker.Ponentes.Nombre_Ponente,
                "correo": speaker.Ponentes.Correo_Ponente,
                "telefono": speaker.Ponentes.Telefono_Ponente,
                "briografia": speaker.Ponentes.Biografia_Ponente 
                }
    })
    return newSpeakers
} 