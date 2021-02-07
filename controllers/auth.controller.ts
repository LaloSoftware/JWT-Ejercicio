import { Request, response, Response } from 'express';
import Usuario from '../models/usuario';
import jwt from 'jsonwebtoken';
import config from '../config';
import { encryptPassword, comparePassword } from '../libs/encrypt';
import rol from '../models/rol';

export const signUp = async (req: Request, res: Response) => {
    try {
        const { userName, email, password, roles } = req.body;
        if (!userName || !email || !password || !roles) res.status(500).json('Datos incompletos');
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
        const token = jwt.sign({id: usuarioGuardado._id}, config.SECRET, { expiresIn: 86400 })
        res.json({token})
    } catch (err) {
        res.status(500).json(err)
    }
}

export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const usuarioRegistrado = await Usuario.findOne({email: email}).populate("roles");
        if (!usuarioRegistrado) return res.status(400).json({message: 'User not found'});
        const matchPassword = await comparePassword(password, usuarioRegistrado.password);
        if (matchPassword) {
            const token = await jwt.sign({id: usuarioRegistrado._id}, config.SECRET, {expiresIn: 86400});
            res.json({token});
        } else {
            res.status(401).json({message: "invalid password"});
        }
    } catch (err) {
        res.status(500).json(err)
    }
}