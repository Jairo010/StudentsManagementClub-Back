const supabase = require('../../DB/postgresql').supabase

exports.createClub = async (name, description, cardResponsible) =>{
    const { data, error } = await supabase
    .from('Clubs')
    .insert({ Nombre: name , Descripcion: description, cedResponsable: cardResponsible})
    .select()
    if(error) {
        if(error.details) return 'Non-existing card'
        return error
    }
    return data
}

exports.getClubs = async () =>{
    let { data: Clubs, error } = await supabase
    .from('Clubs')
    .select('*')
    .order('id', { ascending: true })
    if(error) return error
    return Clubs
}

exports.getClub = async (id) =>{
    let { data: Club, error } = await supabase
    .from('Clubs')
    .select('*')
    .eq('id', id)
    .single()
    if(error) {
        if(error.details) return 'Non-existing club'
        return error
    }
    return Club
}

exports.updateClub = async(id, name, description, cardResponsible) =>{  
    const { data, error } = await supabase
    .from('Clubs')
    .update({ Nombre: name , Descripcion: description, cedResponsable: cardResponsible})
    .eq('id', id)
    .select()
    if(error) return error
    return data
}

exports.deleteClub = async(id) =>{  
    const club = await this.getClub(id)
    if(!club.id) return 'Non-existing club'
    const { error } = await supabase
    .from('Clubs')
    .delete()
    .eq('id', id)
    if(error) return error
    return 'club eliminated'
}