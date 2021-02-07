import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import rol from '../models/rol';
import Usuario from '../models/usuario'

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["x-access-token"];
        if (!token) return res.status(403).json({message: "No token provited"});
        const decodificado: any = await jwt.verify(token, config.SECRET);
        req.body.userId = decodificado.id;
        const usuario = Usuario.findOne(decodificado.id)
        if (!usuario) return res.status(404).json({message: "User not found"});
        next()
    } catch (err) {
        res.status(401).json({message: "Unauthorized"});
    }
}

export const isModerator = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuario = await Usuario.findById(req.body.userId);
        if (usuario) {
            const rolesEncontrados = await rol.find({_id: {$in: usuario.roles}});
            const esModerador = rolesEncontrados.some(r => r.nombre === "moderador");
            if (esModerador) {
                next();
            } else {
                return res.status(403).json({message: "'Moderador' role is required"})
            }
        } else {
            throw new Error("User not found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuario = await Usuario.findById(req.body.userId);
        if (usuario) {
            const rolesEncontrados = await rol.find({_id: {$in: usuario.roles}});
            console.log(rolesEncontrados);
            const esAdmin = rolesEncontrados.some(r => r.nombre === "admin");
            if (esAdmin) {
                next();
            } else {
                return res.status(403).json({message: "'admin' role is required"})
            }
        } else {
            throw new Error("User not found");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}