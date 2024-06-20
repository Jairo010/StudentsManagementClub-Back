const supabase = require('../../DB/postgresql').supabase

exports.createSpeaker = async (data) =>{
    const { data: speaker, error } = await supabase
    .from('Ponentes')
    .insert(
    { Cedula_Ponente: data.card, Nombre_Ponente: data.name, Apellido_Ponente: data.lastName, Correo_Ponente: data.email, Telefono_Ponente: data.phone, Biografia_Ponente: data.biography, Tema_Charla: data.topic})
    .select()
    .single()
    if(error) return error
    return speaker
}

exports.getSpeakers = async () =>{        
    let { data: speakers, error } = await supabase
    .from('Ponentes')
    .select('*')
    .order('Apellido_Ponente', { ascending: true })
    if(error) return error
    return speakers
}

exports.getSpeaker = async (card) =>{
    let { data: speaker, error } = await supabase
    .from('Ponentes')
    .select('*')
    .eq("Cedula_Ponente", card)
    .single()
    if(error) return error
    return speaker
}

exports.updateSpeaker = async (data) =>{
    const { data: speaker, error } = await supabase
    .from('Ponentes')
    .update({Cedula_Ponente: data.card, Nombre_Ponente: data.name, Apellido_Ponente: data.lastName, Correo_Ponente: data.email, Telefono_Ponente: data.phone, Biografia_Ponente: data.biography, Tema_Charla: data.topic})
    .eq('Cedula_Ponente', data.card)
    .select()
    .single()
    if(error) return error
    return speaker
}

exports.deleteSpeaker = async(card) =>{    
    const speaker = await this.getSpeaker(card)
    if(!speaker.Cedula_Ponente) return 'Non-existing speaker'
    const { error } = await supabase
    .from('Ponentes')
    .delete()
    .eq('Cedula_Ponente', card)
    if(error) return error
    return "speaker eliminated"
}

exports.getTalksOfSpeaker = async(card) => {
    const speaker = await this.getSpeaker(card)
    if(!speaker.Cedula_Ponente) return 'Non-existing speaker'
    let { data: DetalleTalks, error } = await supabase
    .from('DetalleCharlas')
    .select('Charlas (*)')
    .eq('Cedula_Ponente', card)
    if(error) return error
    const newTalks=  DetalleTalks.map(talk=> {
        return {"id_Charla": talk.Charlas.id_Charla, 
                "Tema_Charla": talk.Charlas.Tema_Charla, 
                "Imagen_Charla": talk.Charlas.Imagen_Charla,
                "Hora_Inicio": talk.Charlas.Hora_Inicio,
                "Hora_Fin": talk.Charlas.Hora_Fin,
                "Estado_Charla": talk.Charlas.Estado_Charla
                }
    })
    return newTalks
}