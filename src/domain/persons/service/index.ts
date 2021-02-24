import {Person, PersonPlatform} from '../entity';

import {Repository} from "typeorm";
import { User } from '../../users/entity';
import { Platform } from '../../platforms/entity';


export default function PersonService(personRepo: Repository<Person>, personPlatformRepo: Repository<PersonPlatform>) {
  return {
    createPerson: async (user: User): Promise<Person> => {
        const person = new Person();
        person.user = user;
        
        return personRepo.save(person);
    },

    getAll: async ():Promise<Person[]> => {
        const persons = await personRepo.find()

        return persons;
    },
    getById: async (id: string):Promise<Person> => {
      const person = await personRepo.findOne(id)
      // ), {
      //   relations: ['platforms']
      // })

      return person;
  },

    addPlatform: async (person: Person, platform: Platform, username: string):Promise<void> => {
      // person.platforms = 
      
      
      const personPlatform = new PersonPlatform()
      personPlatform.personId = person.id;
      personPlatform.platformId = platform.id;
      personPlatform.username = username;

      if(platform.name === 'OTB') {
        personPlatform.otbOwner = person.user
      }

      await personPlatformRepo.save(personPlatform)
  }

  };
}