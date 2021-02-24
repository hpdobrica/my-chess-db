import {User} from '../entity';

import {Repository} from "typeorm";


export default function helloWorldService(userRepo: Repository<User>) {
  return {
    saveUser: async (firstName: string, lastName: string, age: number): Promise<void> => {
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.age = age;
        
        await userRepo.save(user);
    },

    getUsers: async ():Promise<User[]> => {
        const users = await userRepo.find();

        return users;
    }
  };
}