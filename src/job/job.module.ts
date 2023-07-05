import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from '../entities/Job.entity';
import { EmployerEntity } from 'src/entities/Employer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity,EmployerEntity])],
  controllers: [JobController],
  providers: [JobService]
})
export class JobModule {}
