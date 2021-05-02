import express, { Router } from 'express';

import * as personHandler from '../../domain/persons/handlers';
import { handler } from '../handler';
import { requireAuthMiddleware } from '../middleware/auth';
import { createRequireOwnerMiddleware } from '../middleware/owner';

export function createRouter(): Router {
    const Persons = express.Router();

    // protected
    Persons.use(requireAuthMiddleware)

    Persons.get('/', handler(personHandler.getHandlers().getAll));
    Persons.get('/:personId', handler(personHandler.getHandlers().getById));
    
    
    Persons.get('/:personId/games', handler(personHandler.getHandlers().getPersonsGames))
    Persons.get('/:personId/games/:gameId', handler(personHandler.getHandlers().getSingleGame))
    
    // owner
    const isOwner = createRequireOwnerMiddleware('personId');

    Persons.post('/:personId/games', isOwner, handler(personHandler.postHandlers().createGame))

    Persons.put('/:personId/profiles/:profile', isOwner, handler(personHandler.postHandlers().attachProfile));
    Persons.delete('/:personId/profiles/:profile', isOwner, handler(personHandler.postHandlers().detachProfile));
    
    

    return Persons;

}




