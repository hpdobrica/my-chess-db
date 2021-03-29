import { Repository } from "typeorm";

import { Game, Platform, Result } from "../entity";

import { User } from "../../users/entity";
import { parseGames, GameData } from "../../pgn";
import { Person } from "../../persons/entity";
import { getUsernameForPlatform } from "../../persons/helpers";
import { ChessComProfile } from "../../profiles/chessCom/entity";
import { LichessProfile } from "../../profiles/lichess/entity";
import { OtbProfile } from "../../profiles/otb/entity";

export default function GameService(
  gameRepo: Repository<Game>,
  personRepo: Repository<Person>,
  userRepo: Repository<User>,
  chessComRepo: Repository<ChessComProfile>,
  lichessRepo: Repository<LichessProfile>,
  otbRepo: Repository<OtbProfile>
) {
  return {
    create: async (personId: string, pgn: string): Promise<Game[]> => {
      const gameData = parseGames(pgn);

      const person = await personRepo.findOne(
        { id: personId },
        { relations: ["chessComProfile", "otbProfile", "lichessProfile"] }
      );

      const promises = gameData.map(async (data) => {
        const game = new Game();
        const platform = data.headers.platform;

        let ownerUsername: string;
        let opponentPerson: Person;

        const gamesWithHash = await gameRepo.find({
          where: {
            hash: data.hash,
            platform: data.headers.platform,
            date: data.headers.date,
          },
        });
        if (gamesWithHash.length !== 0) {
          console.log(gamesWithHash);
          console.log("game already added, skipping");
          return;
        }

        switch (platform) {
          case Platform.CHESS_COM: {
            ownerUsername = person.chessComProfile.username;
            const opponentUsername =
              data.headers.white === ownerUsername
                ? data.headers.black
                : data.headers.white;

            // const opponentProfile = await chessComRepo.findOne({username: opponentUsername});
            opponentPerson = await personRepo.findOne({
              where: { chessComProfile: opponentUsername },
            });

            if (!opponentPerson) {
              opponentPerson = new Person();
              let opponentProfile = new ChessComProfile();

              opponentProfile.username = opponentUsername;
              opponentProfile = await chessComRepo.save(opponentProfile);

              opponentPerson.chessComProfile = opponentProfile;
              opponentPerson = await personRepo.save(opponentPerson);
            }
            break;
          }
          case Platform.LICHESS: {
            ownerUsername = person.lichessProfile.username;
            const opponentUsername =
              data.headers.white === ownerUsername
                ? data.headers.black
                : data.headers.white;

            // const opponentProfile = await lichessRepo.findOne({username: opponentUsername});
            opponentPerson = await personRepo.findOne({
              where: { lichessProfile: opponentUsername },
            });

            if (!opponentPerson) {
              opponentPerson = new Person();
              let opponentProfile = new LichessProfile();

              opponentProfile.username = opponentUsername;
              opponentProfile = await lichessRepo.save(opponentProfile);

              opponentPerson.lichessProfile = opponentProfile;
              opponentPerson = await personRepo.save(opponentPerson);
            }
            break;
          }
          case Platform.OTB: {
            ownerUsername = person.otbProfile.username;
            const opponentUsername =
              data.headers.white === ownerUsername
                ? data.headers.black
                : data.headers.white;

            const opponentProfile = await otbRepo.findOne({
              username: opponentUsername,
              owner: person.user,
            });
            opponentPerson = await personRepo.findOne({
              where: { otbProfile: opponentProfile },
            });

            if (!opponentPerson) {
              opponentPerson = new Person();
              let opponentProfile = new OtbProfile();

              opponentProfile.username = opponentUsername;
              // const ownerUser = await userRepo.findOne({person: {id: personId}})
              const ownerUser = await userRepo.findOne(person.user.id);
              opponentProfile.owner = ownerUser;
              opponentProfile = await otbRepo.save(opponentProfile);

              opponentPerson.otbProfile = opponentProfile;
              opponentPerson = await personRepo.save(opponentPerson);
            }
            break;
          }
        }

        game.blackPlayer =
          data.headers.black === ownerUsername ? person : opponentPerson;
        game.whitePlayer =
          data.headers.white === ownerUsername ? person : opponentPerson;
        game.date = data.headers.date;
        game.platform = data.headers.platform;
        game.result = data.headers.result;
        game.pgn = data.pgn;
        game.hash = data.hash;

        return gameRepo.save(game);
      });

      return Promise.all(promises);
    },

    checkOwnership: async (
      personId: string,
      pgns: string
    ): Promise<boolean> => {
      const games = parseGames(pgns);

      type GamesByPlatform = {
        Lichess?: GameData[];
        ChessCom?: GameData[];
        OTB?: GameData[];
      };

      const gamesByPlatform: GamesByPlatform = games.reduce(
        (acc: GamesByPlatform, game) => {
          if (!Array.isArray(acc[game.headers.platform])) {
            acc[game.headers.platform] = [game];
          } else {
            acc[game.headers.platform].push(game);
          }
          return acc;
        },
        {}
      );

      const person = await personRepo.findOne(personId, {
        relations: ["chessComProfile", "otbProfile", "lichessProfile"],
      });

      if (gamesByPlatform[Platform.CHESS_COM]) {
        if (!person.chessComProfile) {
          throw new Error("PROFILE_NOT_CONNECTED");
        }
        const notOwnedGamesFound = gamesByPlatform[Platform.CHESS_COM].some(
          (game) => {
            if (
              game.headers.black !== person.chessComProfile.username &&
              game.headers.white !== person.chessComProfile.username
            ) {
              return true;
            }
          }
        );
        if (notOwnedGamesFound) {
          throw new Error("GAME_NOT_OWNED_BY_USER");
        }
      }

      if (gamesByPlatform[Platform.LICHESS]) {
        if (!person.lichessProfile) {
          throw new Error("PROFILE_NOT_CONNECTED");
        }
        const notOwnedGamesFound = gamesByPlatform[Platform.LICHESS].some(
          (game) => {
            if (
              game.headers.black !== person.lichessProfile.username &&
              game.headers.white !== person.lichessProfile.username
            ) {
              return true;
            }
          }
        );
        console.log(notOwnedGamesFound);
        if (notOwnedGamesFound) {
          throw new Error("GAME_NOT_OWNED_BY_USER");
        }
      }

      if (gamesByPlatform[Platform.OTB]) {
        const user = await userRepo.findOne(person.user.id);
        const notOwnedGamesFound = gamesByPlatform[Platform.OTB].some(
          (game) => {
            if (
              game.headers.black !== user.username &&
              game.headers.white !== user.username
            ) {
              return true;
            }
          }
        );
        console.log(notOwnedGamesFound);
        if (notOwnedGamesFound) {
          throw new Error("GAME_NOT_OWNED_BY_USER");
        }
      }

      return true;
    },

    getAll: async (): Promise<Game[]> => {
      // const games = await gameRepo.find({relations: [
      //   'whitePlayer',
      //   'whitePlayer.chessComProfile',
      //   'whitePlayer.lichessProfile',
      //   'whitePlayer.otbProfile',
      //   'blackPlayer',
      //   'blackPlayer.chessComProfile',
      //   'blackPlayer.lichessProfile',
      //   'blackPlayer.otbProfile',

      // ], select: ['id', 'platform', 'result', 'date']});

      const games = await gameRepo.find({ loadRelationIds: true });

      return games;
    },

    getById: async (id: string): Promise<Game> => {
      const games = await gameRepo.findOne(id, {
        relations: [
          "whitePlayer",
          "whitePlayer.chessComProfile",
          "whitePlayer.lichessProfile",
          "whitePlayer.otbProfile",
          "blackPlayer",
          "blackPlayer.chessComProfile",
          "blackPlayer.lichessProfile",
          "blackPlayer.otbProfile",
        ],
      });

      return games;
    },

    getByPersonId: async (personId: string): Promise<Game[]> => {
      const games = await gameRepo.find({
        loadRelationIds: true,
        where: [
          {
            blackPlayer: personId,
          },
          {
            whitePlayer: personId,
          },
        ],
      });

      return games;
    },
  };
}
