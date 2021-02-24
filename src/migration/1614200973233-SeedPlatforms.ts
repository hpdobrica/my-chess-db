import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { Platform } from "../domain/platforms/entity";
import { PlatformSeed } from "../domain/platforms/platforms.seed";



export class SeedPlatforms1614200973233 implements MigrationInterface {



    public async up(queryRunner: QueryRunner): Promise<void> {
        await getRepository(Platform).save(PlatformSeed)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // do nothing
    }

}
