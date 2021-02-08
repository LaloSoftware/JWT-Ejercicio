import bodyParser from "body-parser";
import morgan from "morgan";
import Server from "./classes/server";
import cors from 'cors';
import router from './routes/router';
import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes'
import { createRoles } from './libs/initialSetUp';
import './database'

const commonPath = '/api';                                      //path o ruta inicial en cumún de la api
const server = new Server(3000);                                //Instanciación de la clase Server con el puerto 3000
createRoles();                                                  //creación de roles por medio de la configuración inicial
server.app.use(morgan('dev'));                                  //Configuración de entorno de desarrollo
server.app.use(bodyParser.urlencoded({extended: true}));        //Integración de bodyParser para la decodificación de los datos
server.app.use(bodyParser.json());
server.app.use( cors({ origin: true, credentials: true }) );    //integración de cors para el cros-domain
server.app.use(`${commonPath}/`, productsRoutes);               //integración de las rutas de productos
server.app.use(`${commonPath}/`, userRoutes);                   //integración de las rutas de usuario
server.app.use(`${commonPath}/auth/`, authRoutes);              //integración de las rutas de autenticación
server.app.use(`${commonPath}/`, router);                       //integración de la ruta por defecto

server.start();                                                 //Se inicia el servidor