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




export function getHandlers() {
  const personService = PersonService(getConnection().getRepository(Person), getConnection().getRepository(LichessProfile), getConnection().getRepository(ChessComProfile), getConnection().getRepository(OtbProfile));

  return {
      getById: async function(
          req: express.Request,
          res: express.Response
        ): Promise<void> {
          const Params = t.Record({
              id: t.String,
          });
          const params = Params.check(req.params);

          const person = await personService.getById(params.id)

          res.send(person)
        }
  }
}
