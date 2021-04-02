import * as t from 'runtypes';
import express from 'express';

import PersonService from '../service';
import { getConnection } from 'typeorm';
import { Person } from '../../persons/entity';
import { Game, Platform } from '../../games/entity';
import { runtypeFromEnum } from '../../../util';
import { LichessProfile } from '../../profiles/lichess/entity';
import { ChessComProfile } from '../../profiles/chessCom/entity';
import { OtbProfile } from '../../profiles/otb/entity';
import { Session } from '../../sessions/types';
import { forbidden } from '../../../app/responses';
import GameService from '../../games/service';
import { User } from '../../users/entity';




// POST /api/persons/attachProfile
// {
//   username: test,
//   profileType: CHESS_COM
// }

export function postHandlers() {
  const personService = PersonService(getConnection().getRepository(Person), getConnection().getRepository(LichessProfile), getConnection().getRepository(ChessComProfile), getConnection().getRepository(OtbProfile));
  const gameService = GameService(getConnection().getRepository(Game), getConnection().getRepository(Person), getConnection().getRepository(User),getConnection().getRepository(ChessComProfile),getConnection().getRepository(LichessProfile), getConnection().getRepository(OtbProfile));

  return {
      attachProfile: async function(
          req: express.Request,
          res: express.Response
        ): Promise<void> {
          const Params = t.Record({
            id: t.String,
            profile: runtypeFromEnum(Platform),
          });
          const Body = t.Record({
            username: t.String,
          });

          const params = Params.check(req.params);
          const body = Body.check(req.body);

          const session = res.locals.session as Session;

          if(session.personId !== params.id) {
            forbidden(res, `Invalid person`);
            return;
          }

          await personService.attachProfile(session.personId, params.profile, body.username)

          res.send({status: 'success'})
        },
        detachProfile: async function(
          req: express.Request,
          res: express.Response
        ): Promise<void> {
          const Params = t.Record({
            id: t.String,
            profile: runtypeFromEnum(Platform),
          });

          const params = Params.check(req.params);

          const session = res.locals.session as Session;

          if(session.personId !== params.id) {
            forbidden(res, `Invalid person`);
            return;
          }

          await personService.detachProfile(session.personId, params.profile)

          res.send({status: 'success'})
        },

        createGame: async function(
          req: express.Request,
          res: express.Response
        ): Promise<void> {
          const Body = t.Record({
            pgn: t.String,
          });

          const Params = t.Record({
            id: t.String,
          });

          const body = Body.check(req.body);
          const params = Params.check(req.params);


          const isOwner = await gameService.checkOwnership(params.id, body.pgn);

          if(!isOwner) {
            throw new Error('NOT_GAME_OWNER')
          }

          await gameService.create(params.id, body.pgn)

          res.json({status: 'success'});
        }
  }
}
