import express, { Router } from 'express';

import * as gameHandlers from '../../domain/games/handlers';
import { handler } from '../handler';
import { requireAuthMiddleware } from '../middleware/auth';

export function createRouter(): Router {
    const Games = express.Router();

    // unprotected



    Games.use(requireAuthMiddleware)

    // protected
    Games.post('/', handler(gameHandlers.postHandlers().createGame));
    Games.get('/', handler(gameHandlers.getHandlers().getGames));
    Games.get('/:id', handler(gameHandlers.getHandlers().getGameById));

    

    

    return Games;

}




