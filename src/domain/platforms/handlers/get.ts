import * as t from 'runtypes';
import express from 'express';

import PlatformService from '../service';
import { getConnection } from 'typeorm';
import { Platform } from '../entity';


export function getHandlers() {
    console.log('getting connection!')
    const platformService = PlatformService(getConnection().getRepository(Platform));

    return {
        getPlatforms: async function(
            req: express.Request,
            res: express.Response
          ): Promise<void> {
            const platforms = await platformService.getPlatforms()
            
            res.json({platforms});
          }
    }
}

