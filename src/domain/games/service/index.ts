import {Repository} from "typeorm";

import {Game, Result} from '../entity';


import { User } from '../../users/entity';
import { parseGames } from "../../pgn";
import { Person } from "../../persons/entity";


export default function GameService(gameRepo: Repository<Game>, personRepo: Repository<Person>) {
  return {
    create: async (importer: User, pgn: string): Promise<Game[]> => {


        const gameData = parseGames(pgn);

        const promises = gameData.map(async (data) => {
          const game = new Game();
          

          // todo create white and black persons, find appropriate platform
          // personRepo.

          // game.blackPlayer = data.headers.black
          // game.whitePlayer = data.headers.white
          // game.date = data.headers.date
          // game.platform = data.headers.platform
          // game.result = data.headers.result
          // game.pgn = data.pgn

          return gameRepo.save(game)
          

        })


        
        return Promise.all(promises);
    },

    getAll: async ():Promise<Game[]> => {
        const games = await gameRepo.find()

        return games;
    }
  };
}