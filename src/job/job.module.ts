import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from '../entities/Job.entity';
import { EmployerEntity } from 'src/entities/Employer.entity';
import { JwtStategy } from 'src/jwt/jwt.strategy';
import { ApplicantEntity } from 'src/entities/Applicant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity,EmployerEntity,ApplicantEntity]),JwtStategy],
  controllers: [JobController],
  providers: [JobService]
})
export class JobModule {}
