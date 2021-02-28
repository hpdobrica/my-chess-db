import * as t from 'runtypes';
import express from 'express';

import GameService from '../service';
import PersonService from '../../persons/service';
import { getConnection } from 'typeorm';
import { Game } from '../entity';
import { Person, PersonPlatform } from '../../persons/entity';

const Params = t.Record({
  username: t.String,
  email: t.String,
  password: t.String
});


export function saveHandlers() {
  console.log('getting connection!')
  // const userService = UserService(getConnection().getRepository(User));
  // const personService = PersonService(getConnection().getRepository(Person), getConnection().getRepository(PersonPlatform));
  const gameService = GameService(getConnection().getRepository(Game));

  return {
      createUser: async function(
          req: express.Request,
          res: express.Response
        ): Promise<void> {
          const params = Params.check(req.body);
          const user = await userService.createUser(params.username, params.email, params.password)

          await personService.createPerson(user);

          res.json({status: 'success'});
        }
  }
}
