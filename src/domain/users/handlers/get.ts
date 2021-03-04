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
            res.json({users: usersResponse});
          }
    }
}

