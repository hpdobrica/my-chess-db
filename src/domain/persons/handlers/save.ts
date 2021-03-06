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


const Body = t.Record({
  username: t.String,
  profileType: runtypeFromEnum(Platform),
});

// POST /api/persons/{personId}/attachProfile
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
          const body = Body.check(req.body);

          const session = res.locals.session as Session;

          await personService.attachProfile(session.personId, body.profileType, body.username)

          res.send({status: 'success'})
        }
  }
}
