import * as t from 'runtypes';
import express from 'express';

import GameService from '../service';
import UserService from '../../users/service';
import PersonService from '../../persons/service';
import { getConnection } from 'typeorm';
import { Game } from '../entity';
import { Person } from '../../persons/entity';
import { User } from '../../users/entity';
import { Session } from '../../sessions/types';
import { parseGames } from '../../pgn';
import { ChessComProfile } from '../../profiles/chessCom/entity';
import { LichessProfile } from '../../profiles/lichess/entity';
import { OtbProfile } from '../../profiles/otb/entity';

const Body = t.Record({
  pgn: t.String,
});


export function postHandlers() {
  console.log('getting connection!')
  const userService = UserService(getConnection().getRepository(User), getConnection().getRepository(Person));
  // const personService = PersonService(getConnection().getRepository(Person));
  const gameService = GameService(getConnection().getRepository(Game), getConnection().getRepository(Person), getConnection().getRepository(User),getConnection().getRepository(ChessComProfile),getConnection().getRepository(LichessProfile), getConnection().getRepository(OtbProfile));

  return {
      createGame: async function(
          req: express.Request,
          res: express.Response
        ): Promise<void> {
          const body = Body.check(req.body);

          const session = res.locals.session as Session;

          const isOwner = await gameService.checkOwnership(session.personId, body.pgn);

          if(!isOwner) {
            throw new Error('NOT_GAME_OWNER')
          }
          // const games = parseGames(body.pgn)

          const game = await gameService.create(session.personId, body.pgn)

          // console.log('created game', game);

          res.json({status: 'success'});
        }
  }
}
