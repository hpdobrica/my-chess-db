import express, { Router } from 'express';

import * as personHandler from '../../domain/persons/handlers';
import { handler } from '../handler';
import { requireAuthMiddleware } from '../middleware/auth';

export function createRouter(): Router {
    const Persons = express.Router();

    Persons.use(requireAuthMiddleware)
    Persons.get('/', handler(personHandler.getHandlers().getAll));
    Persons.get('/:id', handler(personHandler.getHandlers().getById));
    Persons.get('/:id/games', handler(personHandler.getHandlers().getPersonsGames))

    Persons.put('/:id/profiles/:profile', handler(personHandler.postHandlers().attachProfile));
    Persons.delete('/:id/profiles/:profile', handler(personHandler.postHandlers().detachProfile));
    
    

    return Persons;

}




