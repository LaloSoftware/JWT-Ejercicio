import { Router } from 'express';
import * as userController from '../controllers/user.controller'
import { authJWT } from '../middlewares'

const userRoutes = Router();

userRoutes.post('/user', [authJWT.verifyToken], userController.createUser);
userRoutes.get('/users', [authJWT.verifyToken],userController.getUser);

export default userRoutes;