const supabase = require('../../DB/postgresql').supabase

async function existUser (email, card) {
    const {data: {users}, error} = await supabase.auth.admin.listUsers()
    if(error) return error
    let existUser = users.find(user => user.email == email)
    if(existUser) return true
    
    let { data: Integrantes, errorIntegrantes } = await supabase
        .from('Integrantes')
        .select("*")
        .eq('cedula', card)
    if(Integrantes.length>0) return true   
    return false
}

exports.createUser = async (email, password, card, name, lastName, semester, idMajor, idRol) =>{ 
    let userExist = await existUser(email, card)
    if( userExist == true ) return 'Usuario ya existente'
    let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    })
    if(error) return error
    let { dataIntegrantes, errorInsert } = await supabase
    .from('Integrantes')
    .insert(
    { id: data.user.id, cedula: card, Nombre: name, Apellido: lastName, Semestre: semester, Id_Carrera: idMajor, Id_Rol: idRol }
    )
    .select()
    console.log(dataIntegrantes)
    if(errorInsert) {
        const { dataUser, errorUser } = await supabase.auth.admin.deleteUser(data.user.id)
        if(dataUser) return errorInsert
    }
    return data.user
}


exports.login = async (email, password) =>{
    let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
    if(error) return error
    let { data: users, errorUsers } = await supabase
    .from('Integrantes')
    .select('cedula, Nombre, Apellido, Semestre, Carreras (Nombre), Roles (Nombre)')
    .eq('id', data.user.id)
    .single()
    if(errorUsers) return errorUsers
    console.log(users)
    const user = {
         "email":data.user.email,
         "card": users.cedula,
         "name": users.Nombre,
         "lastName": users.Apellido,
         "semester": users.Semestre,
         "major": users.Carreras.Nombre,
         "rol": users.Roles.Nombre,
         "access_token": data.session.access_token
     }
    return user
}

exports.getResetToken = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
         redirectTo: `http://localhost:5173/restablecer-password/`,
    })
    if(error) return error
    return data
}   

exports.resetPassword = async (token, refreshToken, newPassword) => {   
    const { dataSigIn, errorsigIn } = await supabase.auth.refreshSession({"refresh_token": refreshToken})
    if (errorsigIn) errorsigIn
    console.log(dataSigIn)
    const { data, error } = await supabase.auth.updateUser(token,{
        password: newPassword
    })
    if(error) return error
    const { data: user, errorUpdate } = await supabase.auth.admin.updateUserById(
        data.user.id,
        { password: newPassword }
    )
    if(errorUpdate) return errorUpdate
    return user
}

exports.authMiddleware = async (datos) =>{
    const token = datos.headers.authorization?.split(' ')[1]
    if(!token) return 'Token no proporcionado'
    let { data, error } = await supabase.auth.getUser(token)
    if(error){
        console.log("Failed to get supabase auth user", error)
        return "Unauthorized"
    }
    return data
}
