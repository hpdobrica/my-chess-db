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

const Body = t.Record({
  pgn: t.String,
});


export function postHandlers() {
  console.log('getting connection!')
  const userService = UserService(getConnection().getRepository(User), getConnection().getRepository(Person));
  // const personService = PersonService(getConnection().getRepository(Person));
  const gameService = GameService(getConnection().getRepository(Game), getConnection().getRepository(Person), getConnection().getRepository(User));

  return {
      createGame: async function(
          req: express.Request,
          res: express.Response
        ): Promise<void> {
          const body = Body.check(req.body);

          const session = res.locals.session as Session;

          await gameService.checkOwnership(session.userId, body.pgn);

          // const games = parseGames(body.pgn)

          // const game = await gameService.create(currentUser, body.pgn)

          // console.log('created game', game);

          res.json({status: 'success'});
        }
  }
}
