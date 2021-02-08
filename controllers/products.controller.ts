import { Request, Response } from "express";
import producto from "../models/producto";

/*
 * Método de obtención de productos 
 */
export const obtenerProductos = async (req: Request, res: Response) => {
    try {
        const productos = await producto.find();
        if(productos){
            res.json({
                productos
            })
        } else {
            throw new Error("No se obtuvieron productos");
        }
    } catch (err) {
        res.status(500).json(
            err
        )
    }
}

/**
 * Método de obtención de un producto
 */
export const obtenerProducto = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        if(!id) throw new Error("No se encontró un ID en la petición");
        const product = await producto.findById(id);
        res.json({
            product
        })
    } catch (err) {
        res.status(500).json(
            err
        )
    }
}

/*
 * Método de creación de productos
 */
export const crearProducto = async (req: Request, res: Response) => {
    try {
        const { name, category, price } = req.body;
        const newProduct = new producto({name, category, price});
        const productSaved = await newProduct.save();
        res.status(201).json({
            productSaved
        })
    } catch (err) {
        res.status(500).json({
            err
        })
    }
}

/*
 * Método de actualización de productos
 */
export const actualizarProducto = async (req: Request, res: Response) => {
    try {        
        const id: string = req.params.id;
        if (!id) throw new Error("No se encuentró un ID valido en la petición");
        const updated = req.body;
        const product = await producto.findOneAndUpdate({ "_id": id}, updated, { new: true });
        res.status(204).json({
            product
        })
    } catch (err) {
        res.status(500).json(
            err
        )
    }
}

/**
 * Método para eliminar productos 
 */
export const eliminarProducto = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        if(!id) throw new Error("No se reconoce un ID valido en la petición");
        const deleted = await producto.findOneAndDelete({ "_id": id});
        res.status(204).json({
            deleted
        })
    } catch (err) {
        res.status(500).json(
            err
        )
    }
}