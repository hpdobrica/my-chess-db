import * as t from 'runtypes';
import express from 'express';

import PersonService from '../service';
import PlatformService from '../../platforms/service';
import { getConnection } from 'typeorm';
import { Person, PersonPlatform } from '../../persons/entity';
import { Platform } from '../../platforms/entity';

const Params = t.Record({
  platformId: t.String,
  personId: t.String,
});

const Body = t.Record({
  username: t.String,
});

// POST /api/persons/{personId}/platforms/{platformId}
// {username: test}

export function saveHandlers() {
  const personService = PersonService(getConnection().getRepository(Person), getConnection().getRepository(PersonPlatform));
  const platformService = PlatformService(getConnection().getRepository(Platform));

  return {
      addPlatform: async function(
          req: express.Request,
          res: express.Response
        ): Promise<void> {
          const params = Params.check(req.params);
          const body = Body.check(req.body);

          const person = await personService.getById(params.personId);

          console.log('person platforms check', person.platforms);

          const platform = await platformService.getById(params.platformId);
          await personService.addPlatform(person, platform, body.username);


          res.json({status: 'success'});
        }
  }
}
