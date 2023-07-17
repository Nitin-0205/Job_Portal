import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmployerEntity } from 'src/entities/Employer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfig } from 'src/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { UserEntity } from 'src/entities/User.entity';
import { EmployeerModule } from 'src/employeer/employeer.module';
import { CreateEmployeerDto } from 'src/employeer/dto/create-employeer.dto';
import { ApplicantEntity } from 'src/entities/Applicant.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
  EmployeerModule,
  TypeOrmModule.forFeature([EmployerEntity,UserEntity,ApplicantEntity]),
  JwtModule.register(JwtConfig)],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
