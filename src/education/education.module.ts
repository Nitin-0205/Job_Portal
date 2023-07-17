import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationEntity } from 'src/entities/Education.entity';
import { ApplicantEntity } from 'src/entities/Applicant.entity';
import { JwtApplicantStategy } from 'src/jwt/strategy/applicantjwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicantEntity, EducationEntity]),JwtApplicantStategy],
  controllers: [EducationController],
  providers: [EducationService]
})
export class EducationModule {}
