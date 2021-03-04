import * as t from 'runtypes';
import express from 'express';

import PersonService from '../service';
import { getConnection } from 'typeorm';
import { Person } from '../../persons/entity';
import { Platform } from '../../games/entity';
import { runtypeFromEnum } from '../../../util';
import { LichessProfile } from '../../profiles/lichess/entity';

const Params = t.Record({
  personId: t.String,
});

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
  const personService = PersonService(getConnection().getRepository(Person), getConnection().getRepository(LichessProfile));

  return {
      attachProfile: async function(
          req: express.Request,
          res: express.Response
        ): Promise<void> {
          const params = Params.check(req.params);
          const body = Body.check(req.body);

          await personService.attachProfile(params.personId, body.profileType, body.username)

          res.send({status: 'success'})
        }
  }
}
