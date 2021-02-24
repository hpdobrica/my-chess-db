import {Platform} from '../entity';

import {Repository} from "typeorm";
import { User } from '../../users/entity';


export default function platformService(platformRepo: Repository<Platform>) {
  return {
    getPlatforms: async ():Promise<Platform[]> => {
        const platforms = await platformRepo.find()

        return platforms;
    }
  };
}