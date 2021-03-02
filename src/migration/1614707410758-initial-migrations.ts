import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigrations1614707410758 implements MigrationInterface {
    name = 'initialMigrations1614707410758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('up of initial migration start')
        
        await queryRunner.query(`CREATE TABLE "platform" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "url" character varying NOT NULL, CONSTRAINT "PK_c33d6abeebd214bd2850bfd6b8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "person" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "REL_83b775da14886d352de2a4cac0" UNIQUE ("userId"), CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "person_platform" ("personId" character varying NOT NULL, "platformId" character varying NOT NULL, "username" character varying, "otbOwnerId" uuid, CONSTRAINT "PK_d3f08808217f71e7da799c54f01" PRIMARY KEY ("personId", "platformId"))`);
        await queryRunner.query(`CREATE TABLE "game" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "result" character varying NOT NULL, "pgn" character varying NOT NULL, "whitePlayerId" uuid, "blackPlayerId" uuid, "platformId" uuid, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "person_platform" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "person_platform" DROP COLUMN "otbOwnerId"`);
        await queryRunner.query(`ALTER TABLE "person_platform" ADD "username" character varying`);
        await queryRunner.query(`ALTER TABLE "person_platform" ADD "otbOwnerId" uuid`);
        await queryRunner.query(`ALTER TABLE "person_platform" DROP CONSTRAINT "PK_d3f08808217f71e7da799c54f01"`);
        await queryRunner.query(`ALTER TABLE "person_platform" ADD CONSTRAINT "PK_10f6064f1b726341f6193d8331f" PRIMARY KEY ("platformId")`);
        await queryRunner.query(`ALTER TABLE "person_platform" DROP COLUMN "personId"`);
        await queryRunner.query(`ALTER TABLE "person_platform" ADD "personId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "person_platform" DROP CONSTRAINT "PK_10f6064f1b726341f6193d8331f"`);
        await queryRunner.query(`ALTER TABLE "person_platform" ADD CONSTRAINT "PK_d3f08808217f71e7da799c54f01" PRIMARY KEY ("platformId", "personId")`);
        await queryRunner.query(`ALTER TABLE "person_platform" DROP CONSTRAINT "PK_d3f08808217f71e7da799c54f01"`);
        await queryRunner.query(`ALTER TABLE "person_platform" ADD CONSTRAINT "PK_7615eaa6aca2056a447dceba7f4" PRIMARY KEY ("personId")`);
        await queryRunner.query(`ALTER TABLE "person_platform" DROP COLUMN "platformId"`);
        await queryRunner.query(`ALTER TABLE "person_platform" ADD "platformId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "person_platform" DROP CONSTRAINT "PK_7615eaa6aca2056a447dceba7f4"`);
        await queryRunner.query(`ALTER TABLE "person_platform" ADD CONSTRAINT "PK_d3f08808217f71e7da799c54f01" PRIMARY KEY ("personId", "platformId")`);
        await queryRunner.query(`CREATE INDEX "IDX_7615eaa6aca2056a447dceba7f" ON "person_platform" ("personId") `);
        await queryRunner.query(`CREATE INDEX "IDX_10f6064f1b726341f6193d8331" ON "person_platform" ("platformId") `);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_83b775da14886d352de2a4cac01" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person_platform" ADD CONSTRAINT "FK_ef125f6cf1932d2f5f5fb55cd63" FOREIGN KEY ("otbOwnerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_dfaccdf36ad63a50196aef12ada" FOREIGN KEY ("whitePlayerId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_aeb7adfc37d1757192a10d2c983" FOREIGN KEY ("blackPlayerId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_0608b18e03616d432f71c10fd86" FOREIGN KEY ("platformId") REFERENCES "platform"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person_platform" ADD CONSTRAINT "FK_7615eaa6aca2056a447dceba7f4" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person_platform" ADD CONSTRAINT "FK_10f6064f1b726341f6193d8331f" FOREIGN KEY ("platformId") REFERENCES "platform"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);

        console.log('up of initial migration end')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "person_platform" DROP CONSTRAINT "FK_10f6064f1b726341f6193d8331f"`);
        await queryRunner.query(`ALTER TABLE "person_platform" DROP CONSTRAINT "FK_7615eaa6aca2056a447dceba7f4"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_0608b18e03616d432f71c10fd86"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_aeb7adfc37d1757192a10d2c983"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_dfaccdf36ad63a50196aef12ada"`);
        await queryRunner.query(`ALTER TABLE "person_platform" DROP CONSTRAINT "FK_ef125f6cf1932d2f5f5fb55cd63"`);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_83b775da14886d352de2a4cac01"`);
        await queryRunner.query(`DROP INDEX "IDX_10f6064f1b726341f6193d8331"`);
        await queryRunner.query(`DROP INDEX "IDX_7615eaa6aca2056a447dceba7f"`);
        await queryRunner.query(`ALTER TABLE "person_platform" DROP CONSTRAINT "PK_d3f08808217f71e7da799c54f01"`);
        await queryRunner.query(`ALTER TABLE "person_platform" ADD CONSTRAINT "PK_7615eaa6aca2056a447dceba7f4" PRIMARY KEY ("personId")`);
        await queryRunner.query(`ALTER TABLE "person_platform" DROP COLUMN "platformId"`);
        await queryRunner.query(`ALTER TABLE "person_platform" ADD "platformId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "person_platform" DROP CONSTRAINT "PK_7615eaa6aca2056a447dceba7f4"`);
        await queryRunner.query(`ALTER TABLE "person_platform" ADD CONSTRAINT "PK_d3f08808217f71e7da799c54f01" PRIMARY KEY ("platformId", "personId")`);
        await queryRunner.query(`ALTER TABLE "person_platform" DROP CONSTRAINT "PK_d3f08808217f71e7da799c54f01"`);
        await queryRunner.query(`ALTER TABLE "person_platform" ADD CONSTRAINT "PK_10f6064f1b726341f6193d8331f" PRIMARY KEY ("platformId")`);
        await queryRunner.query(`ALTER TABLE "person_platform" DROP COLUMN "personId"`);
        await queryRunner.query(`ALTER TABLE "person_platform" ADD "personId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "person_platform" DROP CONSTRAINT "PK_10f6064f1b726341f6193d8331f"`);
        await queryRunner.query(`ALTER TABLE "person_platform" ADD CONSTRAINT "PK_d3f08808217f71e7da799c54f01" PRIMARY KEY ("personId", "platformId")`);
        await queryRunner.query(`ALTER TABLE "person_platform" DROP COLUMN "otbOwnerId"`);
        await queryRunner.query(`ALTER TABLE "person_platform" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "person_platform" ADD "otbOwnerId" uuid`);
        await queryRunner.query(`ALTER TABLE "person_platform" ADD "username" character varying`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TABLE "person_platform"`);
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "platform"`);
    }

}
