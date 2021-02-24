import * as t from 'runtypes';
import express from 'express';

import service from '../service';
import { getConnection } from 'typeorm';
import { User } from '../entity';


export function getHandlers() {
    console.log('getting connection!')
    const userService = service(getConnection().getRepository(User));

    return {
        getUsers: async function(
            req: express.Request,
            res: express.Response
          ): Promise<void> {
            const users = await userService.getUsers()
            const usersWithoutPass = users.map((user) => {
                delete user.password
                return user;
            });
            res.json({users: usersWithoutPass});
          }
    }
}

