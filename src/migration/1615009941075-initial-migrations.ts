import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigrations1615009941075 implements MigrationInterface {
    name = 'initialMigrations1615009941075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chess_com_profile" ("username" character varying NOT NULL, "sync_date" date, CONSTRAINT "PK_30943d0b0f4395b7fab1bab3ca4" PRIMARY KEY ("username"))`);
        await queryRunner.query(`CREATE TABLE "lichess_profile" ("username" character varying NOT NULL, "sync_date" date, CONSTRAINT "PK_67198959a9401d1a8783ce69811" PRIMARY KEY ("username"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "personId" uuid, CONSTRAINT "REL_6aac19005cea8e2119cbe7759e" UNIQUE ("personId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "otb_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "ownerId" uuid, CONSTRAINT "PK_882b01c90a70ef914f28df39c65" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9223472490b330328803d93a3a" ON "otb_profile" ("username", "ownerId") `);
        await queryRunner.query(`CREATE TABLE "person" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "chessComProfileUsername" character varying, "lichessProfileUsername" character varying, "otbProfileId" uuid, CONSTRAINT "REL_a5c1a763c2b506bcb4c2001a7c" UNIQUE ("chessComProfileUsername"), CONSTRAINT "REL_5f2791a48983e3911aa44b1736" UNIQUE ("lichessProfileUsername"), CONSTRAINT "REL_417d8edecd6f0c3e925b1b644a" UNIQUE ("otbProfileId"), CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "game" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "platform" character varying NOT NULL, "date" date NOT NULL, "result" character varying NOT NULL, "pgn" character varying NOT NULL, "hash" character varying NOT NULL, "whitePlayerId" uuid, "blackPlayerId" uuid, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6aac19005cea8e2119cbe7759e8" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "otb_profile" ADD CONSTRAINT "FK_86316aed5b6b44d9d748ebd92bd" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_a5c1a763c2b506bcb4c2001a7c6" FOREIGN KEY ("chessComProfileUsername") REFERENCES "chess_com_profile"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_5f2791a48983e3911aa44b17360" FOREIGN KEY ("lichessProfileUsername") REFERENCES "lichess_profile"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_417d8edecd6f0c3e925b1b644ad" FOREIGN KEY ("otbProfileId") REFERENCES "otb_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_dfaccdf36ad63a50196aef12ada" FOREIGN KEY ("whitePlayerId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_aeb7adfc37d1757192a10d2c983" FOREIGN KEY ("blackPlayerId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_aeb7adfc37d1757192a10d2c983"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_dfaccdf36ad63a50196aef12ada"`);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_417d8edecd6f0c3e925b1b644ad"`);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_5f2791a48983e3911aa44b17360"`);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_a5c1a763c2b506bcb4c2001a7c6"`);
        await queryRunner.query(`ALTER TABLE "otb_profile" DROP CONSTRAINT "FK_86316aed5b6b44d9d748ebd92bd"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6aac19005cea8e2119cbe7759e8"`);
        await queryRunner.query(`DROP TABLE "game"`);
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`DROP INDEX "IDX_9223472490b330328803d93a3a"`);
        await queryRunner.query(`DROP TABLE "otb_profile"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "lichess_profile"`);
        await queryRunner.query(`DROP TABLE "chess_com_profile"`);
    }

}
