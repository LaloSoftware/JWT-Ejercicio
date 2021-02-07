import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
    res.json("creando usuario");
}

export const getUser = async (req: Request, res: Response) => {
    res.json('usuarios')
}