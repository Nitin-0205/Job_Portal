import { Module } from '@nestjs/common';
import { WorkExperienceService } from './work-experience.service';
import { WorkExperienceController } from './work-experience.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkExperienceEntity } from 'src/entities/WorkExperience.entity';
import { ApplicantEntity } from 'src/entities/Applicant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkExperienceEntity,ApplicantEntity])],
  controllers: [WorkExperienceController],
  providers: [WorkExperienceService]
})
export class WorkExperienceModule {}
