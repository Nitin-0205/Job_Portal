import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkExpPostion1688552993986 implements MigrationInterface {
    name = 'WorkExpPostion1688552993986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Applicant" ADD "file" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Applicant" DROP COLUMN "file"`);
    }

}
