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
    const gameService = GameService(getConnection().getRepository(Game), getConnection().getRepository(Person), getConnection().getRepository(User),getConnection().getRepository(ChessComProfile),getConnection().getRepository(LichessProfile), getConnection().getRepository(OtbProfile));

    return {
        getGames: async function(
            req: express.Request,
            res: express.Response
          ): Promise<void> {
            const games = await gameService.getAll()
            const gamesResponse = games.map((game) => {
              delete game.pgn
              delete game.hash
              return game
            })
            res.json(gamesResponse);
          },
        getGameById: async function(
            req: express.Request,
            res: express.Response
          ): Promise<void> {

            const Params = t.Record({
              id: t.String,
            });
            const params = Params.check(req.params);

            const game = await gameService.getById(params.id);
            
            res.json(game);
          }
    }

}

