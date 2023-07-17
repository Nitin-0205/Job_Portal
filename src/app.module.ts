import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOption } from './db/datasource';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeerModule } from './employeer/employeer.module';
import { ApplicantModule } from './applicant/applicant.module';
import { JobModule } from './job/job.module';
import { ConfigModule } from '@nestjs/config';
import { WorkExperienceModule } from './work-experience/work-experience.module';
import { EducationModule } from './education/education.module';
import { UserModule } from './user/user.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot(
    ),

  TypeOrmModule.forRoot(dataSourceOption),
    EmployeerModule, ApplicantModule, JobModule, WorkExperienceModule, EducationModule, UserModule, ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
