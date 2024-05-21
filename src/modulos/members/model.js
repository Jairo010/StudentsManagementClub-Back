const supabase = require('../../DB/postgresql').supabase

exports.getMembers = async () =>{
    const {data: {users}, error} = await supabase.auth.admin.listUsers()
    if(error) return error
    const usersWithAdditionalData = await Promise.all(users.map(async (user) => {
        const { data: userData, error: userError } = await supabase
            .from('Integrantes')
            .select('cedula, Nombre, Apellido, Semestre, Carreras (id, Nombre), Roles (id, Nombre)')
            .eq('id', user.id)
            .order('id', { ascending: true });
        if (userError) {
            console.error('Error al obtener datos adicionales para el usuario:', user.id, userError);
            return { id: user.id, email: user.email, additionalData: null };
        }
    
        return {id: user.id, email: user.email, cedula: userData[0].cedula, nombre: userData[0].Nombre, apellido: userData[0].Apellido, semestre: userData[0].Semestre, carrera: userData[0].Carreras, rol: userData[0].Roles };
    }));
    return usersWithAdditionalData
}

exports.getMember = async (id) =>{
    const { data: userData, error: userError } = await supabase
            .from('Integrantes')
            .select('cedula, Nombre, Apellido, Semestre, Carreras (id, Nombre), Roles (id, Nombre)')
            .eq('id', id)
            .single();
    if(userError) return userError
    const {data: {user}, error} = await supabase.auth.admin.getUserById(id)
    if(error) return error
    
    return {email: user.email , ...userData}
}

exports.updateMember = async (id, card, name, lastName, semester, idMajor, idRol) =>{
    let { data: Integrantes, errorIntegrantes } = await supabase
        .from('Integrantes')
        .select("*")
        .eq('cedula', card)
        .neq('id', id)
    if(Integrantes.length>0) return 'Member with exiting card'  
    const { data: userData, error: userError } = await supabase
            .from('Integrantes')
            .update({ cedula: card, Nombre: name, Apellido: lastName, Semestre: semester, Id_Carrera: idMajor, Id_Rol: idRol })
            .eq('id', id)
            .select('cedula, Nombre, Apellido, Semestre, Carreras (id, Nombre), Roles (id, Nombre)')
            .single();
    if(userError) return userError
    const {data: {user}, error} = await supabase.auth.admin.getUserById(id)
    if(error) return error
    return {email: user.email , ...userData}
}

exports.deleteMember = async (id) => {
    const user = await this.getMember(id)
    if(user.details) return 'Non-existing member'
    const { error } = await supabase
    .from('Integrantes')
    .delete()
    .eq('id', id)
    if(error) return error
    const { data, errorUser } = await supabase.auth.admin.deleteUser(id)
    if(errorUser){
        const { error } = await supabase
        .from('Integrantes')
        .insert({ cedula: user.cedula, Nombre: user.Nombre, Apellido: user.Apellido, Semestre: user.Semestre, Id_Carrera: user.Carreras.id, Id_Rol: user.Roles.id})
        if(error) return error
        return 'Problem deleting'
    }
    return 'Member eliminated'
}

exports.getMembersByCard = async (card) =>{
    const { data: users, error: userError } = await supabase
            .from('Integrantes')
            .select('id, cedula, Nombre, Apellido, Semestre, Carreras (id, Nombre), Roles (id, Nombre)')
            .ilike('cedula', `%${card}%`)
            .order('Nombre')
    if(userError) return userError
    const usersWithAdditionalData = await Promise.all(users.map(async (user)=>{
        const {data: userData, error} = await supabase.auth.admin.getUserById(user.id)
        console.log(userData)
        if(error) return {message: 'Data not found', id: user.id,cedula: user.cedula, nombre: user.Nombre, apellido: user.Apellido, semestre: user.Semestre, carrera: user.Carreras, rol: user.Roles}
        return {email: userData.user.email, id: user.id,cedula: user.cedula, nombre: user.Nombre, apellido: user.Apellido, semestre: user.Semestre, carrera: user.Carreras, rol: user.Roles}
    }))
    return usersWithAdditionalData
}

exports.getId =async (id) =>{
    const {data: userData, error} = await supabase.auth.admin.getUserById('f8c6599d-bc75-4496-8cc8-0eaa73c77d12')
    console.log(userData)
    if(error) return error
    return userData
}