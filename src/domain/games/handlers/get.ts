import * as t from 'runtypes';
import express from 'express';

import GameService from '../service';
import { getConnection } from 'typeorm';
import { Game } from '../entity';
import { Person } from '../../persons/entity';



export function getHandlers() {
    console.log('getting connection!')
    const gameService = GameService(getConnection().getRepository(Game), getConnection().getRepository(Person));

    return {
        getGames: async function(
            req: express.Request,
            res: express.Response
          ): Promise<void> {
            const games = await gameService.getAll()
            res.json({games});
          }
    }
}

