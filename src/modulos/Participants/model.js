const supabase = require('../../DB/postgresql').supabase

exports.createParticipant = async (data) =>{
    const { data: participant, error } = await supabase
    .from('Participantes')
    .insert(
    { Cedula_Participante: data.card, Nombre_Participante: data.name, Apellido_Participante: data.lastName, Correo_Participante: data.email, Documento_Habilitante: data.document, Id_Universidad: data.idUniversity, Habilitado_Participante: data.status})
    .select()
    .single()
    if(error) return error
    return participant
}

exports.getParticipants = async () =>{        
    let { data: participants, error } = await supabase
    .from('Participantes')
    .select('*')
    .order('Apellido_Participante', { ascending: true })
    if(error) return error
    return participants
}

exports.getParticipant = async (card) =>{
    let { data: participant, error } = await supabase
    .from('Participantes')
    .select('*')
    .eq("Cedula_Participante", card)
    .single()
    if(error) return error
    return participant
}

exports.updateParticipant = async (data) =>{
    
    const { data: participant, error } = await supabase
    .from('Participantes')
    .update({ Cedula_Participante: data.card, Nombre_Participante: data.name, Apellido_Participante: data.lastName, Correo_Participante: data.email, Documento_Habilitante: data.document, Id_Universidad: data.idUniversity, Habilitado_Participante: data.status})
    .eq('Cedula_Participante', data.card)
    .select()
    .single()
    if(error) return error
    return participant
}

exports.deleteParticipant = async(card) =>{    
    const participant = await this.getParticipant(card)
    if(!participant.Cedula_Participante) return 'Non-existing participant'
    const { error } = await supabase
    .from('Participantes')
    .delete()
    .eq('Cedula_Participante', card)
    if(error) return error
    return "participant eliminated"
}