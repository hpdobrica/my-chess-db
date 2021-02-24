import * as t from 'runtypes';
import express from 'express';

import service from '../service';
import { getConnection } from 'typeorm';
import { User } from '../entity';



const Params = t.Partial({
  firstName: t.String,
  lastName: t.String,
  age: t.Number
});


export function saveHandlers() {
  console.log('getting connection!')
  const userService = service(getConnection().getRepository(User));

  return {
      saveUser: async function(
          req: express.Request,
          res: express.Response
        ): Promise<void> {
          const params = Params.check(req.body);
          await userService.saveUser(params.firstName, params.lastName, params.age)
          res.json({status: 'success'});
        }
  }
}
