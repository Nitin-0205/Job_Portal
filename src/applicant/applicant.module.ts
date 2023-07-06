import { Module } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { ApplicantController } from './applicant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantEntity } from 'src/entities/Applicant.entity';
import { WorkExperienceEntity } from 'src/entities/WorkExperience.entity';
import { EducationEntity } from 'src/entities/Education.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicantEntity, WorkExperienceEntity, EducationEntity]),
  JwtModule.register(JwtConfig)],
  controllers: [ApplicantController],
  providers: [ApplicantService]
})
export class ApplicantModule { }
