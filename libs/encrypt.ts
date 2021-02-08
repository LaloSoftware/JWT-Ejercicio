import bcrypt from 'bcryptjs'

export const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);      //generamos el salt para la encriptación
    return await bcrypt.hash(password, salt);   //encriptamos la contraseña y retornamos el resultado
}

export const comparePassword = async (password: string, recivedPassword: string) => {
    return await bcrypt.compare(password, recivedPassword); //Comparación entre el password en la DB y el que manda el usuario para el login
}