import { Module } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { ApplicantController } from './applicant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantEntity } from 'src/entities/Applicant.entity';
import { WorkExperienceEntity } from 'src/entities/WorkExperience.entity';
import { EducationEntity } from 'src/entities/Education.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from 'src/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from 'src/entities/User.entity';
import { ProjectsEntity } from 'src/entities/Projects.entity';

@Module({
  imports: [ConfigModule , TypeOrmModule.forFeature([UserEntity,ApplicantEntity, WorkExperienceEntity, EducationEntity,ProjectsEntity]),
  JwtModule.register(JwtConfig)],
  controllers: [ApplicantController],
  providers: [ApplicantService],
  exports:[ApplicantService]
})
export class ApplicantModule {}
