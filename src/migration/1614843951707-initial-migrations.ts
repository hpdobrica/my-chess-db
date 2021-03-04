import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigrations1614843951707 implements MigrationInterface {
    name = 'initialMigrations1614843951707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chess_com_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "sync_date" date, CONSTRAINT "PK_e287538479987a90683778c5748" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "lichess_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "sync_date" date, CONSTRAINT "PK_f91e2dfadb0bc73a955630c5a79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "personId" uuid, CONSTRAINT "REL_6aac19005cea8e2119cbe7759e" UNIQUE ("personId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "otb_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "ownerId" uuid, CONSTRAINT "PK_882b01c90a70ef914f28df39c65" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "person" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "chessComProfileId" uuid, "lichessProfileId" uuid, "otbProfileId" uuid, CONSTRAINT "REL_5444af06c1f7add8fd0dfd06f8" UNIQUE ("chessComProfileId"), CONSTRAINT "REL_3840aea66cfb3ac2aa9192e18a" UNIQUE ("lichessProfileId"), CONSTRAINT "REL_417d8edecd6f0c3e925b1b644a" UNIQUE ("otbProfileId"), CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "platform" character varying NOT NULL, "date" date NOT NULL, "result" character varying NOT NULL, "pgn" character varying NOT NULL, "whitePlayerId" uuid, "blackPlayerId" uuid, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6aac19005cea8e2119cbe7759e8" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "otb_profile" ADD CONSTRAINT "FK_86316aed5b6b44d9d748ebd92bd" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_5444af06c1f7add8fd0dfd06f88" FOREIGN KEY ("chessComProfileId") REFERENCES "chess_com_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_3840aea66cfb3ac2aa9192e18a9" FOREIGN KEY ("lichessProfileId") REFERENCES "lichess_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_417d8edecd6f0c3e925b1b644ad" FOREIGN KEY ("otbProfileId") REFERENCES "otb_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_dfaccdf36ad63a50196aef12ada" FOREIGN KEY ("whitePlayerId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_aeb7adfc37d1757192a10d2c983" FOREIGN KEY ("blackPlayerId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_aeb7adfc37d1757192a10d2c983"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_dfaccdf36ad63a50196aef12ada"`);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_417d8edecd6f0c3e925b1b644ad"`);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_3840aea66cfb3ac2aa9192e18a9"`);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_5444af06c1f7add8fd0dfd06f88"`);
        await queryRunner.query(`ALTER TABLE "otb_profile" DROP CONSTRAINT "FK_86316aed5b6b44d9d748ebd92bd"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6aac19005cea8e2119cbe7759e8"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`DROP TABLE "otb_profile"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "lichess_profile"`);
        await queryRunner.query(`DROP TABLE "chess_com_profile"`);
    }

}
