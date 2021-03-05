import * as t from 'runtypes';
import express from 'express';

import GameService from '../service';
import { getConnection } from 'typeorm';
import { Game } from '../entity';
import { Person } from '../../persons/entity';
import { User } from '../../users/entity';
import { ChessComProfile } from '../../profiles/chessCom/entity';
import { LichessProfile } from '../../profiles/lichess/entity';
import { OtbProfile } from '../../profiles/otb/entity';



export function getHandlers() {
    console.log('getting connection!')
    const gameService = GameService(getConnection().getRepository(Game), getConnection().getRepository(Person), getConnection().getRepository(User),getConnection().getRepository(ChessComProfile),getConnection().getRepository(LichessProfile), getConnection().getRepository(OtbProfile));

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

