import { Module } from '@nestjs/common';
import { EmployeerService } from './employeer.service';
import { EmployeerController } from './employeer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployerEntity } from '../entities/Employer.entity';


@Module({
  imports: [TypeOrmModule.forFeature([EmployerEntity])],
  controllers: [EmployeerController],
  providers: [EmployeerService]
})
export class EmployeerModule {}
