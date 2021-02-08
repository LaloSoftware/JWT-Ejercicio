import { NextFunction, Request, Response } from "express";
import { ROLES } from "../models/rol";
import usuario from "../models/usuario";

/*
 * Validación de datos al registrar un usuario nuevo 
 */

export const verificarRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.roles) {
            req.body.roles.forEach((r: string) => {
                if (!ROLES.includes(r)) {
                    res.status(400).json({message: `Role: "${r}" doesn't exists`})
                }
            });
            next();
        }
    } catch (err) {
        return res.json(err)
    }
}

export const existeNombreOCorreo = async (req: Request, res: Response, next: NextFunction) => {
    const { userName, email } = req.body;
    console.table({userName, email});
    const usuarioEncontrado = await usuario.findOne({userName: userName});
    if (usuarioEncontrado) return res.status(400).json({message: `User with user name "${userName}" and e-mail "${email}" already exists`});
    console.log(usuarioEncontrado);
    next();
}