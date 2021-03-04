import * as t from 'runtypes';
import express from 'express';

import UserService from '../service';
import PersonService from '../../persons/service';
import { getConnection } from 'typeorm';
import { User } from '../entity';
import { Person} from '../../persons/entity';

const Params = t.Record({
  username: t.String,
  email: t.String,
  password: t.String
});


export function saveHandlers() {
  console.log('getting connection!')
  const userService = UserService(getConnection().getRepository(User), getConnection().getRepository(Person));
  // const personService = PersonService(getConnection().getRepository(Person));

  return {
      createUser: async function(
          req: express.Request,
          res: express.Response
        ): Promise<void> {
          const params = Params.check(req.body);
          await userService.createUser(params.username, params.email, params.password)

          res.json({status: 'success'});
        }
  }
}
