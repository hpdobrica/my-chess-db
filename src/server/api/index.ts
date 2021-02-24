import express, { Router } from 'express';
import * as Users from './users';



export function createApi(): Router {

    const Api = express.Router();
    Api.use('/users', Users.createRouter());

    return Api

}


