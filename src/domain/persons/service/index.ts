import { Person } from "../entity";

import { Repository } from "typeorm";
import { User } from "../../users/entity";
import { Platform } from "../../games/entity";
import { LichessProfile } from "../../profiles/lichess/entity";
import { ChessComProfile } from "../../profiles/chessCom/entity";
import { OtbProfile } from "../../profiles/otb/entity";

export default function PersonService(
  personRepo: Repository<Person>,
  lichessProfileRepo: Repository<LichessProfile>,
  chessComProfileRepo: Repository<ChessComProfile>,
  otbProfileRepo: Repository<OtbProfile>
) {
  return {
    // createPerson: async (user: User): Promise<Person> => {
    //     const person = new Person();
    //     person.user = user;

    //     return personRepo.save(person);
    // },

    getAll: async (): Promise<Person[]> => {
      const persons = await personRepo.find();

      return persons;
    },
    getById: async (id: string): Promise<Person> => {
      const person = await personRepo.findOne(id, {
        relations: ["chessComProfile", "lichessProfile", "otbProfile"],
      });

      return person;
    },

    attachProfile: async (
      personId: string,
      platform: Platform,
      username: string
    ): Promise<void> => {
      const person = await personRepo.findOne(personId, {
        relations: ["chessComProfile", "lichessProfile", "otbProfile"],
      });

      if (!person) {
        throw new Error("NO_PERSON_FOUND");
      }

      if (platform === Platform.CHESS_COM) {
        if (person.chessComProfile) {
          if (person.chessComProfile.username === username) {
            return;
          }

          const oldUsername = person.chessComProfile.username;
          person.chessComProfile = null;
          await personRepo.save(person);

          await chessComProfileRepo.delete({
            username: oldUsername,
          });
        }

        const chessComProfile = new ChessComProfile();

        chessComProfile.username = username;

        console.log("about to save lichess profile");
        await chessComProfileRepo.save(chessComProfile);

        console.log("about to save person");
        person.chessComProfile = chessComProfile;
        await personRepo.save(person);
      } else if (platform === Platform.LICHESS) {
        console.log('lichessing', person)
        if (person.lichessProfile) {
          console.log('already has profile')
          if (person.lichessProfile.username === username) {
            console.log('username is the same')
            return;
          }

          const currentUsername = person.lichessProfile.username;


          person.lichessProfile = null;
          await personRepo.save(person);

          console.log('deleting ', currentUsername)
          await lichessProfileRepo.delete({
            username: currentUsername,
          });
        }

        const lichessProfile = new LichessProfile();

        lichessProfile.username = username;

        console.log("about to save lichess profile");
        await lichessProfileRepo.save(lichessProfile);

        console.log("about to save person");
        person.lichessProfile = lichessProfile;
        await personRepo.save(person);
      } else if (platform === Platform.OTB) {
        throw new Error("FEATURE_NOT_SUPPORTED");
      } else {
        throw new Error("INVALID_PLATFORM");
      }
    },
    detachProfile: async (personId: string, platform: Platform) => {
      const person = await personRepo.findOne(personId, {
        relations: ["chessComProfile", "lichessProfile", "otbProfile"],
      });

      if (!person) {
        throw new Error("NO_PERSON_FOUND");
      }

      if (platform === Platform.CHESS_COM) {
        const usernameToDelete = person.chessComProfile.username;
        person.chessComProfile = null;
        await personRepo.save(person);
  
        await chessComProfileRepo.delete({
          username: usernameToDelete,
        });
      } else if (platform === Platform.LICHESS) {
        const usernameToDelete = person.lichessProfile.username;
        person.lichessProfile = null;
        await personRepo.save(person);
  
        await lichessProfileRepo.delete({
          username: usernameToDelete,
        });

      } else if (platform === Platform.OTB) {
        throw new Error("FEATURE_NOT_SUPPORTED");
      } else {
        throw new Error("INVALID_PLATFORM");
      }
      
    }
  };
}

// const attachProfileHelper = async (profileKey, profileRepo: Repository<ChessComProfile> | Repository<LichessProfile>, profileObject: LichessProfile | ChessComProfile) => {

// }
