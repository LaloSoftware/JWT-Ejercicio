import { Router, Request, Response} from 'express';
import router from './router';
import * as productsController from '../controllers/products.controller';

const productsRoutes = Router();

router.get('/', productsController.obtenerProductos);
router.get('/:id', productsController.obtenerProducto);
router.post('/', productsController.crearProducto);
router.put('/:id', productsController.actualizarProducto);
router.delete('/:id', productsController.eliminarProducto);

export default productsRoutes;