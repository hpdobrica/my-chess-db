import {MigrationInterface, QueryRunner} from "typeorm";

export class seedPlatforms1614707977571 implements MigrationInterface {
    name = 'seedPlatforms1614707977571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('up of seed platform migration start')

        // await getRepository(Platform).save(PlatformSeed)
        await queryRunner.query(`INSERT INTO platform (name, url) values('Chess.com', 'https://chess.com')`);
        await queryRunner.query(`INSERT INTO platform (name, url) values('Lichess', 'https://lichess.org')`);
        await queryRunner.query(`INSERT INTO platform (name, url) values('OTB', '')`);

        console.log('up of seed platform migration end')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}


// import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
// import { Platform } from "../domain/platforms/entity";
// import { PlatformSeed } from "../domain/platforms/platforms.seed";

// export class SeedPlatforms1614707634846 implements MigrationInterface {
//     name = 'SeedPlatforms1614707634846'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await getRepository(Platform).save(PlatformSeed)
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         // todo
//     }

// }

