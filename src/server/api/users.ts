import express, { Router } from 'express';

import * as userHandlers from '../../domain/users/handlers';
import { handler } from '../handler';

export function createRouter(): Router {
    const Users = express.Router();
    Users.get('/', handler(userHandlers.getHandlers().getUsers));
    Users.post('/', handler(userHandlers.saveHandlers().createUser));

    return Users;

}




