import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { authJWT, verifySigning } from '../middlewares';

const authRoutes = Router();

authRoutes.post('/sign-in', authController.signIn);

authRoutes.post('/sign-up', [authJWT.verifyToken, authJWT.isAdmin, verifySigning.existeNombreOCorreo, verifySigning.verificarRoles], authController.signUp);

export default authRoutes;