const supabase = require('../../DB/postgresql').supabase

exports.createEvent = async (data) =>{
    const { data: event, error } = await supabase
    .from('Eventos')
    .insert(
    { Nombre: data.name, Descripcion: data.description, Fecha_Ini: data.startDate, Fecha_Fin: data.endDate, Tipo_Evento: data.typeEvent})
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
    .update({Nombre: data.name, Descripcion: data.description, Fecha_Ini: data.startDate, Fecha_Fin: data.endDate, Tipo_Evento: data.typeEvent})
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