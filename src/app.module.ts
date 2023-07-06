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

export const key = "sigma_007_secret";
@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:'.env'
  }),
  TypeOrmModule.forRoot(dataSourceOption), 
    EmployeerModule, ApplicantModule, JobModule, WorkExperienceModule, EducationModule,
 ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
