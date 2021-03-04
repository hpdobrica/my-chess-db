import * as bcrypt from 'bcrypt';
import {User} from '../entity';

import {Repository} from "typeorm";
import { Person } from '../../persons/entity';


export default function UserService(userRepo: Repository<User>, personRepo: Repository<Person>) {
  return {
    createUser: async (username: string, email: string, password: string): Promise<User> => {
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = await bcrypt.hash(password, 10);

        const person = new Person();
        await personRepo.save(person);


        user.person = person;
        
        
        return userRepo.save(user);
    },

    getUsers: async ():Promise<User[]> => {
        const users = await userRepo.find({relations: ['person']})

        return users;
    },

    getByEmail: async (email: string):Promise<User> => {
      const user = await userRepo.findOneOrFail({ email }, {relations: ['person']})

      return user;
  },
  };
}