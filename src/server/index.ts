import express from 'express';
import cors from 'cors';
import * as useragent from 'express-useragent';
import cookieParser from 'cookie-parser';

import { createApi } from './api';


export function CreateServer() {
    const app = express();
    app.disable("x-powered-by");
    app.use(express.json());
    app.use(cors({
        origin : "http://localhost:8080",
        credentials: true,
    }))
    app.use(useragent.express());
    
    app.use(cookieParser());


    app.use('/api', createApi());

    return app;

}



