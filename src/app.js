import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';


class App{
    constructor(){
        this.server = express();

        mongoose.set('strictQuery', true);
        mongoose.connect(`mongodb+srv://mrldevhouse:deuspai07@mrltestes.fmvikmi.mongodb.net/mrltestes?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
        });
        

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(cors())// uso para qualquer um
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'uploads'))
        );

        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }
}

export default new App().server;