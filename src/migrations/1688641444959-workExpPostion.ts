import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkExpPostion1688641444959 implements MigrationInterface {
    name = 'WorkExpPostion1688641444959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_experience_entity" ADD "position" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_experience_entity" DROP COLUMN "position"`);
    }

}
