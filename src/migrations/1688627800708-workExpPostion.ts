import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkExpPostion1688627800708 implements MigrationInterface {
    name = 'WorkExpPostion1688627800708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Base" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" date, "deletedAt" date, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "isDeleted" bit NOT NULL DEFAULT '0', CONSTRAINT "PK_09521c2534e67b3614a63c9dcfe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Employer" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" date, "deletedAt" date, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "isDeleted" bit NOT NULL DEFAULT '0', "employerId" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, "company" character varying NOT NULL, CONSTRAINT "UQ_88be2a1dc03ba71371699f9822f" UNIQUE ("employerId"), CONSTRAINT "PK_e098b5394a9242bcf3e17331674" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Job" ("id" SERIAL NOT NULL, "jobId" character varying(50) NOT NULL, "JobTitle" character varying(50) NOT NULL, "description" character varying(500) NOT NULL, "salary" integer NOT NULL, "location" character varying(50) NOT NULL, "company" character varying(50) NOT NULL, "type" character varying(50) NOT NULL, "employerId" integer, CONSTRAINT "UQ_ecb0d5de3a5499d78ce6f079574" UNIQUE ("jobId"), CONSTRAINT "PK_981d90e7185b9ec1ee6b814ec21" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "education_entity" ("id" SERIAL NOT NULL, "educationId" character varying NOT NULL, "school" character varying NOT NULL, "degree" character varying NOT NULL, "fieldofstudy" character varying NOT NULL, "from" character varying NOT NULL, "to" character varying NOT NULL, "current" character varying NOT NULL, "applicantId" integer, CONSTRAINT "UQ_8a340e616cf2ed9db595b69834e" UNIQUE ("educationId"), CONSTRAINT "PK_79c0b39bc47664de1f081eeb325" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects_entity" ("id" SERIAL NOT NULL, "projectId" character varying(50) NOT NULL, "title" character varying(50) NOT NULL, "description" character varying(50) NOT NULL, "link" character varying(50) NOT NULL, "from" character varying(50) NOT NULL, "to" character varying(50) NOT NULL, "applicantId" integer, CONSTRAINT "UQ_a8b8be19c284eafc3db15316aec" UNIQUE ("projectId"), CONSTRAINT "PK_b7b7e232c878fcdccdb3a18189b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "work_experience_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" date, "deletedAt" date, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "isDeleted" bit NOT NULL DEFAULT '0', "workExperienceId" character varying(50) NOT NULL, "company" character varying NOT NULL, "location" character varying NOT NULL, "from" character varying NOT NULL, "to" character varying NOT NULL, "current" character varying NOT NULL, "description" character varying NOT NULL, "applicantId" integer, CONSTRAINT "UQ_65864e7bb8286abd85b2c0d07cb" UNIQUE ("workExperienceId"), CONSTRAINT "PK_999d4284d58652278922d429d34" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Applicant" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" date, "deletedAt" date, "createdBy" character varying, "updatedBy" character varying, "deletedBy" character varying, "isDeleted" bit NOT NULL DEFAULT '0', "applicantId" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "skills" character varying array NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, "file" character varying, CONSTRAINT "UQ_b3ed6c8dac1185b71ab7f38280c" UNIQUE ("applicantId"), CONSTRAINT "PK_e68a6314b718c9314489ea19270" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job_applicant_applicant" ("jobId" integer NOT NULL, "applicantId" integer NOT NULL, CONSTRAINT "PK_8c79532d63a783797516e3d7917" PRIMARY KEY ("jobId", "applicantId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4fc16ad65405dbcec14d667e32" ON "job_applicant_applicant" ("jobId") `);
        await queryRunner.query(`CREATE INDEX "IDX_daec55909771453355648c4e51" ON "job_applicant_applicant" ("applicantId") `);
        await queryRunner.query(`ALTER TABLE "Job" ADD CONSTRAINT "FK_19f77e97f26c12a804b450060a1" FOREIGN KEY ("employerId") REFERENCES "Employer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "education_entity" ADD CONSTRAINT "FK_2aa35b7a93fdd7fdc7aef500a97" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_entity" ADD CONSTRAINT "FK_f71228f81308e59064362067a4d" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "work_experience_entity" ADD CONSTRAINT "FK_109f46114ba10f8d9a0e9496691" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_applicant_applicant" ADD CONSTRAINT "FK_4fc16ad65405dbcec14d667e325" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "job_applicant_applicant" ADD CONSTRAINT "FK_daec55909771453355648c4e51d" FOREIGN KEY ("applicantId") REFERENCES "Applicant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_applicant_applicant" DROP CONSTRAINT "FK_daec55909771453355648c4e51d"`);
        await queryRunner.query(`ALTER TABLE "job_applicant_applicant" DROP CONSTRAINT "FK_4fc16ad65405dbcec14d667e325"`);
        await queryRunner.query(`ALTER TABLE "work_experience_entity" DROP CONSTRAINT "FK_109f46114ba10f8d9a0e9496691"`);
        await queryRunner.query(`ALTER TABLE "projects_entity" DROP CONSTRAINT "FK_f71228f81308e59064362067a4d"`);
        await queryRunner.query(`ALTER TABLE "education_entity" DROP CONSTRAINT "FK_2aa35b7a93fdd7fdc7aef500a97"`);
        await queryRunner.query(`ALTER TABLE "Job" DROP CONSTRAINT "FK_19f77e97f26c12a804b450060a1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_daec55909771453355648c4e51"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4fc16ad65405dbcec14d667e32"`);
        await queryRunner.query(`DROP TABLE "job_applicant_applicant"`);
        await queryRunner.query(`DROP TABLE "Applicant"`);
        await queryRunner.query(`DROP TABLE "work_experience_entity"`);
        await queryRunner.query(`DROP TABLE "projects_entity"`);
        await queryRunner.query(`DROP TABLE "education_entity"`);
        await queryRunner.query(`DROP TABLE "Job"`);
        await queryRunner.query(`DROP TABLE "Employer"`);
        await queryRunner.query(`DROP TABLE "Base"`);
    }

}
