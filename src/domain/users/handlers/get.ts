import * as t from 'runtypes';
import express from 'express';

import UserService from '../service';
import { getConnection } from 'typeorm';
import { User } from '../entity';
import { Person } from '../../persons/entity';


export function getHandlers() {
    console.log('getting connection!')
    const userService = UserService(getConnection().getRepository(User), getConnection().getRepository(Person));

    return {
        getUsers: async function(
            req: express.Request,
            res: express.Response
          ): Promise<void> {
            const users = await userService.getUsers()
            const usersResponse = users.map((user) => {
                delete user.password
                return user;
            });
            res.json(usersResponse);
          },
          getUserById: async function(
            req: express.Request,
            res: express.Response
          ): Promise<void> {
            const Params = t.Record({
              id: t.String,
            });
            const params = Params.check(req.params);

            const user = await userService.getById(params.id);

            delete user.password;

            res.json(user);
          }
    }
}

