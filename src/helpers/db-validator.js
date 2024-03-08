import User from '../user/user.model.js';

export const esRoleValido = async (role = '') => {
    const existeRol = await User.findOne({role});
    if (!existeRol){
        throw new Error(`El role ${role} no existe en la base datos`);
    }
}

export const existsEmail = async (email = '') => {

    const existsEmail = await User.findOne({email});

    if(existsEmail){
        throw new Error(`The email ${email} has already been registered`);
    }
}

export const existsUserById = async (id = '') => {
    
    const existsUser = await User.findById(id);
    
    if(!existsUser){
        throw new Error(`The ID: ${id} does not exist`);
    }
}