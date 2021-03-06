import {Person} from '../entity';

import {Repository} from "typeorm";
import { User } from '../../users/entity';
import { Platform } from '../../games/entity';
import { LichessProfile } from '../../profiles/lichess/entity';
import { ChessComProfile } from '../../profiles/chessCom/entity';
import { OtbProfile } from '../../profiles/otb/entity';


export default function PersonService(personRepo: Repository<Person>, lichessProfileRepo: Repository<LichessProfile>, chessComProfileRepo: Repository<ChessComProfile>, otbProfileRepo: Repository<OtbProfile> ) {
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

      return person;
  },

    attachProfile: async (personId: string, platform: Platform, username: string):Promise<void> => {
      const person = await personRepo.findOne(personId);

      if(!person) {
        throw new Error('NO_PERSON_FOUND')
      }
      
      if(platform === Platform.CHESS_COM){
        const chessComProfile = new ChessComProfile()

        chessComProfile.username = username;

        console.log('about to save lichess profile')
        await chessComProfileRepo.save(chessComProfile)

        console.log('about to save person')
        person.chessComProfile = chessComProfile;
        await personRepo.save(person);
      } else if (platform === Platform.LICHESS){
        const lichessProfile = new LichessProfile()

        lichessProfile.username = username;

        console.log('about to save lichess profile')
        await lichessProfileRepo.save(lichessProfile)

        console.log('about to save person')
        person.lichessProfile = lichessProfile;
        await personRepo.save(person);

      }else if (platform === Platform.OTB) {
        throw new Error('FEATURE_NOT_SUPPORTED')
      } else {
        throw new Error('INVALID_PLATFORM')
      }
    }

  };
}