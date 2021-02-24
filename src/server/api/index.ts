import express, { Router } from 'express';
import * as Users from './users';
import * as Platforms from './platforms';



export function createApi(): Router {

    const Api = express.Router();
    Api.use('/users', Users.createRouter());
    Api.use('/platforms', Platforms.createRouter());

    return Api

}


