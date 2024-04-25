const supabase = require('../../DB/postgresql').supabase

exports.createClub = async (name, description, responsible) =>{
    
    const { data, error } = await supabase
    .from('Clubs')
    .insert([
    { Nombre: name, Descripcion: description, Id_Responsable: responsible },
    ])
    .select()
        
    if(!error){
        return ("Club has been created successfully")
    }else{
        return ("Something went worng " +error)
    }
}

