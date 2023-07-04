import { Module } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { ApplicantController } from './applicant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantEntity } from 'src/entities/Applicant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicantEntity])],
  controllers: [ApplicantController],
  providers: [ApplicantService]
})
export class ApplicantModule {}
