import {hash} from 'bcrypt';
import {User} from '../entity';

import {Repository} from "typeorm";
import { Person } from '../../persons/entity';


export default function userService(userRepo: Repository<User>) {
  return {
    createUser: async (username: string, email: string, password: string): Promise<User> => {
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = await hash(password, 10);

        const person = new Person();
        person.user = user;
        
        
        return userRepo.save(user);
    },

    getUsers: async ():Promise<User[]> => {
        const users = await userRepo.find()

        return users;
    }
  };
}