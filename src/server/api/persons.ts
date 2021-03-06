import express, { Router } from 'express';

import * as personHandler from '../../domain/persons/handlers';
import { handler } from '../handler';
import { requireAuthMiddleware } from '../middleware/auth';

export function createRouter(): Router {
    const Persons = express.Router();

    Persons.use(requireAuthMiddleware)
    Persons.post('/attachProfile', handler(personHandler.postHandlers().attachProfile));

    return Persons;

}




