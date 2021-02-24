import {Person} from '../entity';

import {Repository} from "typeorm";
import { User } from '../../users/entity';


export default function personService(personRepo: Repository<Person>) {
  return {
    createPerson: async (user: User): Promise<Person> => {
        const person = new Person();
        person.user = user;
        
        return personRepo.save(person);
    },

    getPersons: async ():Promise<Person[]> => {
        const persons = await personRepo.find()

        return persons;
    }
  };
}