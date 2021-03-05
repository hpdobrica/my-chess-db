import express, { Router } from 'express';
import * as Users from './users';
import * as Persons from './persons';
import * as Games from './games';



export function createApi(): Router {

    const Api = express.Router();
    Api.use('/users', Users.createRouter());
    Api.use('/persons', Persons.createRouter());
    Api.use('/games', Games.createRouter());

    return Api

}


