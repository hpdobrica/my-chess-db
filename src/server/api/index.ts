import express, { Router } from 'express';
import * as Users from './users';
import * as Persons from './persons';
import * as Games from './games';
import { authTransformMiddleware } from '../middleware/authTransform';



export function createApi(): Router {

    const Api = express.Router();
    Api.use(authTransformMiddleware);
    Api.use('/users', Users.createRouter());
    Api.use('/persons', Persons.createRouter());
    Api.use('/games', Games.createRouter());

    return Api

}


