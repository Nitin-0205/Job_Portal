import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1688414885439 implements MigrationInterface {
    name = 'FirstMigration1688414885439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Job" ("id" SERIAL NOT NULL, "jobId" character varying(50) NOT NULL, "JobTitle" character varying(50) NOT NULL, "description" character varying(500) NOT NULL, "salary" integer NOT NULL, "location" character varying(50) NOT NULL, "company" character varying(50) NOT NULL, "type" character varying(50) NOT NULL, "applicantId" integer, CONSTRAINT "UQ_ecb0d5de3a5499d78ce6f079574" UNIQUE ("jobId"), CONSTRAINT "PK_981d90e7185b9ec1ee6b814ec21" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "education_entity" ("id" SERIAL NOT NULL, "educationId" character varying(50) NOT NULL, "school" character varying(50) NOT NULL, "degree" character varying(50) NOT NULL, "fieldofstudy" character varying(50) NOT NULL, "from" character varying(50) NOT NULL, "to" character varying(50) NOT NULL, "current" character varying(50) NOT NULL, "description" character varying(50) NOT NULL, "applicantId" integer, CONSTRAINT "UQ_8a340e616cf2ed9db595b69834e" UNIQUE ("educationId"), CONSTRAINT "PK_79c0b39bc47664de1f081eeb325" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Base" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" date, "deletedAt" date, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "isDeleted" bit NOT NULL DEFAULT '0', CONSTRAINT "PK_09521c2534e67b3614a63c9dcfe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects_entity" ("id" SERIAL NOT NULL, "projectId" character varying(50) NOT NULL, "title" character varying(50) NOT NULL, "description" character varying(50) NOT NULL, "link" character varying(50) NOT NULL, "from" character varying(50) NOT NULL, "to" character varying(50) NOT NULL, "applicantId" integer, CONSTRAINT "UQ_a8b8be19c284eafc3db15316aec" UNIQUE ("projectId"), CONSTRAINT "PK_b7b7e232c878fcdccdb3a18189b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_experience_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" date, "deletedAt" date, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "isDeleted" bit NOT NULL DEFAULT '0', "workExperienceId" character varying(50) NOT NULL, "company" character varying(50) NOT NULL, "location" character varying(50) NOT NULL, "from" character varying(50) NOT NULL, "to" character varying(50) NOT NULL, "current" character varying(50) NOT NULL, "description" character varying(50) NOT NULL, "applicantId" integer, CONSTRAINT "UQ_65864e7bb8286abd85b2c0d07cb" UNIQUE ("workExperienceId"), CONSTRAINT "PK_999d4284d58652278922d429d34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Applicant" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" date, "deletedAt" date, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "isDeleted" bit NOT NULL DEFAULT '0', "employeeId" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "skills" character varying array NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "UQ_d426bb226f90c06dbe62cdcc6b0" UNIQUE ("employeeId"), CONSTRAINT "PK_e68a6314b718c9314489ea19270" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Employer" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" date, "deletedAt" date, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "isDeleted" bit NOT NULL DEFAULT '0', "employerId" character varying(50) NOT NULL, "name" character varying(50) NOT NULL, "companyName" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "role" character varying(50) NOT NULL, "address" character varying NOT NULL, "company" character varying(50) NOT NULL, "type" character varying(50) NOT NULL, CONSTRAINT "UQ_88be2a1dc03ba71371699f9822f" UNIQUE ("employerId"), CONSTRAINT "PK_e098b5394a9242bcf3e17331674" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Job" ADD CONSTRAINT "FK_4c7975ce5d5df0e13bf889e26cf" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "education_entity" ADD CONSTRAINT "FK_2aa35b7a93fdd7fdc7aef500a97" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_entity" ADD CONSTRAINT "FK_f71228f81308e59064362067a4d" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_experience_entity" ADD CONSTRAINT "FK_109f46114ba10f8d9a0e9496691" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "work_experience_entity" DROP CONSTRAINT "FK_109f46114ba10f8d9a0e9496691"`);
        await queryRunner.query(`ALTER TABLE "projects_entity" DROP CONSTRAINT "FK_f71228f81308e59064362067a4d"`);
        await queryRunner.query(`ALTER TABLE "education_entity" DROP CONSTRAINT "FK_2aa35b7a93fdd7fdc7aef500a97"`);
        await queryRunner.query(`ALTER TABLE "Job" DROP CONSTRAINT "FK_4c7975ce5d5df0e13bf889e26cf"`);
        await queryRunner.query(`DROP TABLE "Employer"`);
        await queryRunner.query(`DROP TABLE "Applicant"`);
        await queryRunner.query(`DROP TABLE "work_experience_entity"`);
        await queryRunner.query(`DROP TABLE "projects_entity"`);
        await queryRunner.query(`DROP TABLE "Base"`);
        await queryRunner.query(`DROP TABLE "education_entity"`);
        await queryRunner.query(`DROP TABLE "Job"`);
    }

}
