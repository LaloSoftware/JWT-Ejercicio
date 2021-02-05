import bodyParser from "body-parser";
import morgan from "morgan";
import Server from "./classes/server";
import cors from 'cors';
import router from './routes/router';
import productsRoutes from './routes/products.routes'
import './database'

const server = new Server(3000);

server.app.use(morgan('dev'));
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());
server.app.use( cors({ origin: true, credentials: true }) );
server.app.use('/api/', productsRoutes);
server.app.use('/api/', router);

server.start();