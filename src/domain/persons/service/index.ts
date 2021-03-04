import {Person} from '../entity';

import {Repository} from "typeorm";
import { User } from '../../users/entity';
import { Platform } from '../../games/entity';
import { LichessProfile } from '../../profiles/lichess/entity';


export default function PersonService(personRepo: Repository<Person>, lichessProfileRepo: Repository<LichessProfile> ) {
  return {
    // createPerson: async (user: User): Promise<Person> => {
    //     const person = new Person();
    //     person.user = user;
        
    //     return personRepo.save(person);
    // },

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

    attachProfile: async (personId: string, platform: Platform, username: string):Promise<void> => {
      const person = await personRepo.findOne(personId);

      if(!person) {
        throw new Error('no person found')
      }
      
      if(platform === Platform.CHESS_COM){
        console.log('todo')
      } else if (platform === Platform.LICHESS){
        const lichessProfile = new LichessProfile()

        lichessProfile.username = username;

        console.log('about to save lichess profile')
        await lichessProfileRepo.save(lichessProfile)

        console.log('about to save person')
        person.lichessProfile = lichessProfile;
        await personRepo.save(person);

      }else if (platform === Platform.OTB) {
        console.log('todo')
      } else {
        throw new Error('invalid platform')
      }
    }

  };
}