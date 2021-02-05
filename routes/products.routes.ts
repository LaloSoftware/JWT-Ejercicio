import { Router } from 'express';
import router from './router';
import * as productsController from '../controllers/products.controller';

const productsRoutes = Router();

router.get('/productos', productsController.obtenerProductos);
router.get('/producto/:id', productsController.obtenerProducto);
router.post('/producto', productsController.crearProducto);
router.put('/producto/:id', productsController.actualizarProducto);
router.delete('/producto/:id', productsController.eliminarProducto);

export default productsRoutes;