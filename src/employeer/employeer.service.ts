import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeerDto } from './dto/create-employeer.dto';
import { UpdateEmployeerDto } from './dto/update-employeer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployerEntity } from '../entities/Employer.entity';
import * as bycrpt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class EmployeerService {
  constructor(
    @InjectRepository(EmployerEntity) private employeerRepo:Repository<EmployerEntity>
  ) {}
  
  async create(createEmployeerDto: CreateEmployeerDto) {

    const checkEmail = await this.employeerRepo.findOneBy({email:createEmployeerDto.email});
    if(checkEmail){
      throw new HttpException("User Already Exists !!!",HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bycrpt.hash(createEmployeerDto.password,10);
    createEmployeerDto.password = hashPassword;
    createEmployeerDto.employerId = uuidv4()
    this.employeerRepo.create(createEmployeerDto)
    const createdApplicant = await this.employeerRepo.save(createEmployeerDto);
    if(!createdApplicant){
      throw new HttpException("Employeer Signup Failed !!!",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return {msg:"Employeer SignUp Successfull !!!"};
  }
}