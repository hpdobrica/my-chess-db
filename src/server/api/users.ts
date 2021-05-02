import express, { Router } from 'express';

import * as userHandlers from '../../domain/users/handlers';
import { handler } from '../handler';
import { requireAdminMiddleware } from '../middleware/admin';
import { requireAuthMiddleware } from '../middleware/auth';

export function createRouter(): Router {
    const Users = express.Router();

    // unprotected
    Users.post('/', handler(userHandlers.postHandlers().createUser));
    Users.post('/login', handler(userHandlers.postHandlers().login));

    // protected
    Users.use(requireAuthMiddleware)

    Users.get('/:username', handler(userHandlers.getHandlers().getUserByUsername));

    // admin
    Users.use(requireAdminMiddleware)

    Users.get('/', handler(userHandlers.getHandlers().getUsers));

    

    return Users;

}




