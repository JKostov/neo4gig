import {MigrationInterface, QueryRunner} from "typeorm";

export class entities1547048014813 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'inactive', "registerToken" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "passwordRecoveries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_913b5c2ca4b13932eaefd1a0592" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "passwordRecoveries" ADD CONSTRAINT "FK_61b5006cf4f74b04b2265553e7d" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "passwordRecoveries" DROP CONSTRAINT "FK_61b5006cf4f74b04b2265553e7d"`);
        await queryRunner.query(`DROP TABLE "passwordRecoveries"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
