import * as t from 'runtypes';
import express from 'express';

import PersonService from '../service';
import { getConnection } from 'typeorm';
import { Person } from '../../persons/entity';
import { Platform } from '../../games/entity';
import { runtypeFromEnum } from '../../../util';
import { LichessProfile } from '../../profiles/lichess/entity';
import { ChessComProfile } from '../../profiles/chessCom/entity';
import { OtbProfile } from '../../profiles/otb/entity';
import { Session } from '../../sessions/types';
import { forbidden } from '../../../app/responses';




// POST /api/persons/attachProfile
// {
//   username: test,
//   profileType: CHESS_COM
// }

export function postHandlers() {
  const personService = PersonService(getConnection().getRepository(Person), getConnection().getRepository(LichessProfile), getConnection().getRepository(ChessComProfile), getConnection().getRepository(OtbProfile));

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
        }
  }
}
