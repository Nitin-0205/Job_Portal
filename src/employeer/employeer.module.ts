import { Module } from '@nestjs/common';
import { EmployeerService } from './employeer.service';
import { EmployeerController } from './employeer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployerEntity } from '../entities/Employer.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtConfig } from 'src/config/jwt.config';
import { CreateEmployeerDto } from './dto/create-employeer.dto';
import { UserEntity } from 'src/entities/User.entity';
import { JwtApplicantStategy } from 'src/jwt/strategy/applicantjwt.strategy';
import { JwtStategy } from 'src/jwt/strategy/jwt.strategy';

@Module({
  imports: [
  TypeOrmModule.forFeature([EmployerEntity,UserEntity]),
  JwtModule.register(JwtConfig),
JwtStategy],
  controllers: [EmployeerController],
  providers: [EmployeerService],
  exports:[EmployeerService]
})
export class EmployeerModule {}
