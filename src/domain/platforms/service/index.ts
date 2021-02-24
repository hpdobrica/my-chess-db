import {Platform} from '../entity';

import {Repository} from "typeorm";
import { User } from '../../users/entity';


export default function PlatformService(platformRepo: Repository<Platform>) {
  return {
    getPlatforms: async ():Promise<Platform[]> => {
        const platforms = await platformRepo.find()

        return platforms;
    },
    getById: async (id: string):Promise<Platform> => {
      const platform = await platformRepo.findOne(id);

      return platform;
  }
  };
}