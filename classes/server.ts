import express from 'express';

/**
 * La clase que contiene la configuración básica inicial del servidor y el método de inicio del mismo
 */
export default class Server{
    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = Number( process.env.PORT ) || port;
    }

    start(){
        this.app.listen(this.port, () => {
            console.log(`Corriendo en puerto ${this.port}`);
        });
    }
}