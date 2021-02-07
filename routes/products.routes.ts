import { Router } from 'express';
import router from './router';
import * as productsController from '../controllers/products.controller';
import { authJWT } from '../middlewares'

const productsRoutes = Router();

router.get('/productos', [authJWT.verifyToken, authJWT.isModerator, authJWT.isAdmin], productsController.obtenerProductos);
router.get('/producto/:id', [authJWT.verifyToken], productsController.obtenerProducto);
router.post('/producto', [authJWT.verifyToken], productsController.crearProducto);
router.put('/producto/:id', [authJWT.verifyToken], productsController.actualizarProducto);
router.delete('/producto/:id', [authJWT.verifyToken], productsController.eliminarProducto);

export default productsRoutes;