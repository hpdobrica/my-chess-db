import express, { Router } from 'express';

import * as personHandler from '../../domain/persons/handlers';
import { handler } from '../handler';

export function createRouter(): Router {
    const Persons = express.Router();
    Persons.post('/:personId/attachProfile', handler(personHandler.postHandlers().attachProfile));

    return Persons;

}




