import { Request, Response } from 'express';
import Usuario from '../models/usuario';
import jwt from 'jsonwebtoken';
import config from '../config';
import { encryptPassword, comparePassword } from '../libs/encrypt';
import rol from '../models/rol';

/**
 * 
 * Método de creación de usuarios en la base de datos
 *  
 */
export const signUp = async (req: Request, res: Response) => {
    try {
        //Verificación de la información de datos en la petición
        const { userName, email, password, roles } = req.body;
        if (!userName || !email || !password || !roles) res.status(500).json('Datos incompletos');
        //creación de usuario, configuración de roles y encriptación de contraseña
        const rolesEncontrados = await rol.find({nombre: {$in: roles}});
        const idRoles = rolesEncontrados.map( r => r._id );
        const newPassword = await encryptPassword(password);
        const nuevoUsuario = new Usuario({
            userName,
            email, 
            password: newPassword,
            roles: idRoles
        });
        const usuarioGuardado = await nuevoUsuario.save();
        //creación del token
        const token = jwt.sign({id: usuarioGuardado._id}, config.SECRET, { expiresIn: 86400 })
        res.json({token})       //respuesta al servidor con el token
    } catch (err) {
        res.status(500).json(err)
    }
}

export const signIn = async (req: Request, res: Response) => {
    try {
        //validación de datos en la petición
        const { email, password } = req.body;
        const usuarioRegistrado = await Usuario.findOne({email: email}).populate("roles");
        if (!usuarioRegistrado) return res.status(400).json({message: 'User not found'});
        //comprobación de contraseña 
        const matchPassword = await comparePassword(password, usuarioRegistrado.password);
        if (matchPassword) {
            //si la contraseña hace match entonces genera un token y lo envía al usuario
            const token = await jwt.sign({id: usuarioRegistrado._id}, config.SECRET, {expiresIn: 86400});
            res.json({token});
        } else {
            //en caso de que no concuerden las contraseas, un mensaje de 'contraseña incorrecta'
            res.status(401).json({message: "invalid password"});
        }
    } catch (err) {
        res.status(500).json(err)
    }
}