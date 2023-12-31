import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from 'src/entities/Projects.entity';
import { ApplicantEntity } from 'src/entities/Applicant.entity';
import { UserEntity } from 'src/entities/User.entity';
import { JwtApplicantStategy } from 'src/jwt/strategy/applicantjwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectsEntity,ApplicantEntity,UserEntity]),
    JwtApplicantStategy,
    
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
