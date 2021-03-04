import express, { Router } from 'express';

import * as userHandlers from '../../domain/users/handlers';
import { handler } from '../handler';
import { requireAuthMiddleware } from '../middleware/auth';

export function createRouter(): Router {
    const Users = express.Router();

    // unprotected
    Users.post('/', handler(userHandlers.postHandlers().createUser));
    Users.post('/login', handler(userHandlers.postHandlers().login));

    Users.use(requireAuthMiddleware)

    // protected
    Users.get('/', handler(userHandlers.getHandlers().getUsers));
    

    return Users;

}




