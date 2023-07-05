import { Module } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { ApplicantController } from './applicant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantEntity } from 'src/entities/Applicant.entity';
import { WorkExperienceEntity } from 'src/entities/WorkExperience.entity';
import { EducationEntity } from 'src/entities/Education.entity';
import { JwtModule } from '@nestjs/jwt';

export const key = "secret";
@Module({
  imports: [TypeOrmModule.forFeature([ApplicantEntity, WorkExperienceEntity, EducationEntity]),
  JwtModule.register({
    secret:key,
    signOptions: {
      expiresIn: "1d"
    }
  })],
  controllers: [ApplicantController],
  providers: [ApplicantService]
})
export class ApplicantModule { }
