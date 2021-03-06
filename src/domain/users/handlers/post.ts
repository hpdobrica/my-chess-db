import * as t from 'runtypes';
import * as bcrypt from 'bcrypt';

import express from 'express';

import UserService from '../service';
import PersonService from '../../persons/service';
import { getConnection } from 'typeorm';
import { User } from '../entity';
import { Person} from '../../persons/entity';
import { encodeSession } from '../../sessions';




export function postHandlers() {
  console.log('getting connection!')
  const userService = UserService(getConnection().getRepository(User), getConnection().getRepository(Person));
  // const personService = PersonService(getConnection().getRepository(Person), getConnection().getRepository(LichessProfile), getConnection().getRepository(ChessComProfile), getConnection().getRepository(OtbProfile));

  return {
    createUser: async function(
        req: express.Request,
        res: express.Response
      ): Promise<void> {
        const Body = t.Record({
          username: t.String,
          email: t.String,
          password: t.String
        });

        const body = Body.check(req.body);
        await userService.createUser(body.username, body.email, body.password)

        res.json({status: 'success'});
      },
    login: async function(
      req: express.Request,
      res: express.Response
    ): Promise<void> {
      const Body = t.Record({
        email: t.String,
        password: t.String
      });
      const body = Body.check(req.body);

      const user = await userService.getByEmail(body.email)
      
      const isValidPassword = await bcrypt.compare(body.password, user.password);

      if(!isValidPassword) {
        res.status(401).json({status: 'failure', message: 'Bad credentials'});
        return;
      }
      
      const result = encodeSession({
        username: user.username,
        email: user.email,
        userId: user.id,
        personId: user.person.id
      });
      res.json(result);
    },
  }
}
