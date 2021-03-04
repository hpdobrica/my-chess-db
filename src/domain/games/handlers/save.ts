import * as t from 'runtypes';
import express from 'express';

import GameService from '../service';
import UserService from '../../users/service';
import PersonService from '../../persons/service';
import { getConnection } from 'typeorm';
import { Game } from '../entity';
import { Person } from '../../persons/entity';
import { User } from '../../users/entity';

const Params = t.Record({
  pgn: t.String,
});


export function postHandlers() {
  console.log('getting connection!')
  const userService = UserService(getConnection().getRepository(User), getConnection().getRepository(Person));
  // const personService = PersonService(getConnection().getRepository(Person));
  const gameService = GameService(getConnection().getRepository(Game), getConnection().getRepository(Person));

  return {
      createGame: async function(
          req: express.Request,
          res: express.Response
        ): Promise<void> {
          const body = Params.check(req.body);

          // todo temporary until login comes
          const [currentUser] = await userService.getUsers();

          const game = await gameService.create(currentUser, body.pgn)

          console.log('created game', game);

          res.json({status: 'success'});
        }
  }
}
