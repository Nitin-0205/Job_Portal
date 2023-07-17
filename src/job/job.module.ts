import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from '../entities/Job.entity';
import { EmployerEntity } from 'src/entities/Employer.entity';
import { ApplicantEntity } from 'src/entities/Applicant.entity';
import { UserEntity } from 'src/entities/User.entity';
import { ApplicantModule } from 'src/applicant/applicant.module';
import { JwtApplicantStategy } from 'src/jwt/strategy/applicantjwt.strategy';
import { JwtStategy } from 'src/jwt/strategy/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity,EmployerEntity,ApplicantEntity,UserEntity]),JwtApplicantStategy,JwtStategy,ApplicantModule],
  controllers: [JobController],
  providers: [JobService]
})
export class JobModule {}
