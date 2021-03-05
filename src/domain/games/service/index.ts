import {Repository} from "typeorm";

import {Game, Result} from '../entity';


import { User } from '../../users/entity';
import { parseGames, GameData } from "../../pgn";
import { Person } from "../../persons/entity";


export default function GameService(gameRepo: Repository<Game>, personRepo: Repository<Person>, userRepo: Repository<User>) {
  return {
    create: async (creatorId: string, pgn: string): Promise<Game[]> => {


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

    checkOwnership: async (userId:string, pgns: string) => {
      const games = parseGames(pgns)

      type GamesByPlatform = {
        Lichess?: GameData[],
        ChessCom?: GameData[],
        OTB?: GameData[]
      }

      const gamesByPlatform: GamesByPlatform = games.reduce((acc: GamesByPlatform, game) => {
        if(!Array.isArray(acc[game.headers.platform])) {
          acc[game.headers.platform] = [game]
        } else {
          acc[game.headers.platform].push(game)
        }
        return acc;
      },{})

      const user = await userRepo.findOne({id: userId}, {relations: ['person']});
      const person = await personRepo.findOne({id: user.person.id}, {relations:['chessComProfile', 'otbProfile', 'lichessProfile']})

      console.log('persons chess com profile', person.chessComProfile)
      console.log('persons lichess profile', person.lichessProfile)
      
      if(gamesByPlatform.ChessCom) {
        if(!person.chessComProfile) {
          throw new Error('PROFILE_NOT_CONNECTED')
        }
        const notOwnedGamesFound = gamesByPlatform.ChessCom.some((game) => {
          if(game.headers.black !== person.chessComProfile.username && game.headers.white !== person.chessComProfile.username) {
            return true;
          }
        })
        if(notOwnedGamesFound) {
          throw new Error('GAME_NOT_OWNED_BY_USER')
        }
      }

      if(gamesByPlatform.Lichess) {
        if(!person.lichessProfile) {
          throw new Error('PROFILE_NOT_CONNECTED')
        }
        const notOwnedGamesFound = gamesByPlatform.Lichess.some((game) => {
          if(game.headers.black !== person.lichessProfile.username && game.headers.white !== person.lichessProfile.username) {
            return true;
          }
        })
        if(notOwnedGamesFound) {
          throw new Error('GAME_NOT_OWNED_BY_USER')
        }
      }

      

    },

    getAll: async ():Promise<Game[]> => {
        const games = await gameRepo.find()

        return games;
    }
  };
}