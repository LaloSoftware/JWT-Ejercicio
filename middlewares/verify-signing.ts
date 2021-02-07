import { NextFunction, Request, Response } from "express";
import { ROLES } from "../models/rol";

export const verificarRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { roles } = req.body.roles;
        if (roles) {
            roles.forEach((r: string) => {
                const esValido = ROLES.includes(r);
                if (!esValido) {
                    return res.status(400).json({message: `Role: "${r} doesn't exists"`})
                }
            });
            next();
        }
    } catch (err) {
        return res.json(err)
    }
}