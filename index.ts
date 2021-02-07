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

const commonPath = '/api';
const server = new Server(3000);
createRoles();
server.app.use(morgan('dev'));
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());
server.app.use( cors({ origin: true, credentials: true }) );
server.app.use(`${commonPath}/`, productsRoutes);
server.app.use(`${commonPath}/`, userRoutes);
server.app.use(`${commonPath}/auth/`, authRoutes);
server.app.use(`${commonPath}/`, router);

server.start();