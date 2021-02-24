import express, { Router } from 'express';

import * as platformHandlers from '../../domain/platforms/handlers';
import { handler } from '../handler';

export function createRouter(): Router {
    const Platforms = express.Router();
    Platforms.get('/', handler(platformHandlers.getHandlers().getPlatforms));

    return Platforms;

}




