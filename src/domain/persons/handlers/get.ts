import * as t from 'runtypes';
import express from 'express';

import PersonService from '../service';
import { getConnection } from 'typeorm';
import { Person } from '../../persons/entity';
import { Game, Platform } from '../../games/entity';
import { runtypeFromEnum } from '../../../util';
import { LichessProfile } from '../../profiles/lichess/entity';
import { ChessComProfile } from '../../profiles/chessCom/entity';
import { OtbProfile } from '../../profiles/otb/entity';
import { Session } from '../../sessions/types';
import GameService from '../../games/service';
import { User } from '../../users/entity';




export function getHandlers() {
  const personService = PersonService(getConnection().getRepository(Person), getConnection().getRepository(LichessProfile), getConnection().getRepository(ChessComProfile), getConnection().getRepository(OtbProfile));
  const gameService = GameService(getConnection().getRepository(Game), getConnection().getRepository(Person), getConnection().getRepository(User),getConnection().getRepository(ChessComProfile),getConnection().getRepository(LichessProfile), getConnection().getRepository(OtbProfile));

  return {
      getAll: async function(
        req: express.Request,
        res: express.Response
      ): Promise<void> {
        const persons = await personService.getAll()

        res.send(persons)
      },
      

      getById: async function(
          req: express.Request,
          res: express.Response
        ): Promise<void> {
          const Params = t.Record({
              personId: t.String,
          });
          const params = Params.check(req.params);

          const person = await personService.getById(params.personId)

          res.send(person)
        },


        getPersonsGames: async function(
          req: express.Request,
          res: express.Response
        ): Promise<void> {
          const Params = t.Record({
              personId: t.String,
          });
          const params = Params.check(req.params);

          const games = await gameService.getByPersonId(params.personId);

          const gamesResponse = games.map((game) => {
            delete game.pgn
            delete game.hash
            return game
          })

          res.send(gamesResponse)
        },

        getSingleGame: async function(
          req: express.Request,
          res: express.Response
        ): Promise<void> {
          const Params = t.Record({
              personId: t.String,
              gameId: t.String
          });
          const params = Params.check(req.params);

          const game = await gameService.getById(params.gameId);

          res.send(game)
        }
  }
}
