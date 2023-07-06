import { Module } from '@nestjs/common';
import { EmployeerService } from './employeer.service';
import { EmployeerController } from './employeer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployerEntity } from '../entities/Employer.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [TypeOrmModule.forFeature([EmployerEntity]),
  JwtModule.register(JwtConfig)],
  controllers: [EmployeerController],
  providers: [EmployeerService]
})
export class EmployeerModule {}
