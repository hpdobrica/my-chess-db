import {Repository} from "typeorm";

import {Game, Result} from '../entity';


import { User } from '../../users/entity';
import { parseGames } from "../../pgn";


export default function GameService(gameRepo: Repository<Game>) {
  return {
    create: async (importer: User, pgn: string): Promise<Game> => {


        const gameData = parseGames(pgn);

        const promises = gameData.map(async (data) => {
          const game = new Game();

          // todo create white and black players, find appropriate platform
          game.blackPlayer = data.headers.black
          game.whitePlayer = data.headers.white
          game.date = data.headers.date
          game.platform = data.headers.platform
          game.result = data.headers.result
          game.pgn = data.pgn

          // await gameRepo.save(game)
          

        })


        


        
        
       ;
    },

    getAll: async ():Promise<Game[]> => {
        const games = await gameRepo.find()

        return games;
    }
  };
}