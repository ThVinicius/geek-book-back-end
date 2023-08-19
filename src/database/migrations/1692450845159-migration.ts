import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1692450845159 implements MigrationInterface {
    name = 'Migration1692450845159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."users_authtype_enum" AS ENUM('EMAIL', 'GITHUB')
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "nickname" character varying NOT NULL,
                "avatar" character varying,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "authType" "public"."users_authtype_enum" NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."users_authtype_enum"
        `);
    }

}
