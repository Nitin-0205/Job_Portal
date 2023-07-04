import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOption } from './db/datasource';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeerModule } from './employeer/employeer.module';
import { ApplicantModule } from './applicant/applicant.module';
import { JobModule } from './job/job.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOption), EmployeerModule, ApplicantModule, JobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
