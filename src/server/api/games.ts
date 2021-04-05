import express, { Router } from 'express';

import * as gameHandlers from '../../domain/games/handlers';
import { handler } from '../handler';
import { requireAdminMiddleware } from '../middleware/admin';
import { requireAuthMiddleware } from '../middleware/auth';

export function createRouter(): Router {
    const Games = express.Router();

    // unprotected



    Games.use(requireAuthMiddleware);
    Games.use(requireAdminMiddleware);

    // admin
    Games.post('/', handler(gameHandlers.postHandlers().createGame));
    Games.get('/', handler(gameHandlers.getHandlers().getGames));
    Games.get('/:gameId', handler(gameHandlers.getHandlers().getGameById));

    

    

    return Games;

}




