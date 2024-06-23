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

exports.assignMember = async (idClub, idMember) => {
    const club = await this.getClub(idClub)
    if(!club.id) return 'Non-existing club'
    let { data: DetalleClub, errorClub } = await supabase
    .from('DetalleClubs')
    .select("*")
    .eq('id_Club', idClub)
    .eq('id_Integrante', idMember)   
    if(errorClub) return errorClub
    if(DetalleClub.length>0) return 'member already assigned to club'
    const { data, error } = await supabase
    .from('DetalleClubs')
    .insert({ id_Club: idClub, id_Integrante: idMember})
    .select()
    if(error) return error
    return "member: " + idMember+ " assigned to the club: "+ idClub
}

exports.deleteAssignedMember= async(idClub, idMember) =>{
    const { error } = await supabase
    .from('DetalleClubs')
    .delete()
    .eq('id_Club', idClub)
    .eq('id_Integrante', idMember)
    if(error) return error
    return "assigned member deleted"      
}

exports.getMembersByClub = async (idClub) =>{    
    let { data: DetalleClub, error } = await supabase
    .from('DetalleClubs')
    .select('Integrantes (*, Id_Carrera(*), Id_Rol(*))')
    .eq('id_Club', idClub)
    if(error) return error
    const newMembers=  DetalleClub.map(member=> {
        return {
                "cedula": member.Integrantes.cedula,
                "id": member.Integrantes.id,
                "Nombre": member.Integrantes.Nombre,
                "Apellido": member.Integrantes.Apellido,
                "Semestre": member.Integrantes.Semestre,
                "Carrera": member.Integrantes.Id_Carrera,
                "Rol": member.Integrantes.Id_Rol
                }
    })
    return newMembers
} 