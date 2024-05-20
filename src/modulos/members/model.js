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
    
        return userData;
        //return {email:user.email, data:userData};
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