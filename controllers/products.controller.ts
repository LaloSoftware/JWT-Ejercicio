import { Request, Response } from "express";

export const obtenerProductos = (req: Request, res: Response) => {
    console.log('se ejecuta esto');
    res.json({
        status: 200,
        ok: true,
        products: 'productos'
    });
}

export const obtenerProducto = (req: Request, res: Response) => {
    
}

export const crearProducto = (req: Request, res: Response) => {

}

export const actualizarProducto = (req: Request, res: Response) => {
    
}

export const eliminarProducto = (req: Request, res: Response) => {
    
}