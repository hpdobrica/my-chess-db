import bodyParser from 'body-parser';
import express from 'express';

import { createApi } from './api';


export function CreateServer() {
    const app = express();
    app.disable("x-powered-by");
    app.use(bodyParser.json());


    app.use('/api', createApi());

    return app;

}



