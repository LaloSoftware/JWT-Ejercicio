import express from 'express';
import morgan from 'morgan';

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