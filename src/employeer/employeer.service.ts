import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeerDto } from './dto/create-employeer.dto';
import { UpdateEmployeerDto } from './dto/update-employeer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployerEntity } from '../entities/Employer.entity';
import * as bycrpt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginEmployeerDto } from './dto/login-employer.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class EmployeerService {
  constructor(
    @InjectRepository(EmployerEntity) private employeerRepo:Repository<EmployerEntity>,
    private jwtService:JwtService
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

  async employeerLogin(loginEmployeerDto:LoginEmployeerDto) {
    const employeer = await this.employeerRepo.findOne({where:{email:loginEmployeerDto.email}});
    console.log("employeer",employeer);
    if(!employeer){
      throw new HttpException("User Not Found !!!",HttpStatus.NOT_FOUND);
    }
    const isMatch = await bycrpt.compare(loginEmployeerDto.password,employeer.password);
    if(!isMatch){
      throw new HttpException("Invalid Credentials !!!",HttpStatus.BAD_REQUEST);
    }
    const payload = {email:employeer.email,employerId:employeer.employerId}
    const token = await this.jwtService.sign(payload);
    return {msg:"Employeer Login Successfull !!!",employeerId:employeer.employerId,token:token};
  }

  async employeerProfile(employerId:string) {
    const employeer = await this.employeerRepo.findOne({where:{employerId}})
    if(!employeer){
      throw new HttpException("Employeer Not Found !!!",HttpStatus.NOT_FOUND)
    }
    return employeer;
  }

  async updateEmployeerProfile(updateEmployeerDto:UpdateEmployeerDto,employerId:string) {
    const employeer = await this.employeerRepo.findOne({where:{employerId}})
    if(!employeer){
      throw new HttpException("Employeer Not Found !!!",HttpStatus.NOT_FOUND)
    }
    if(updateEmployeerDto.password){
      const hashPassword = await bycrpt.hash(updateEmployeerDto.password,10);
      employeer.password = hashPassword;
    }
    if(updateEmployeerDto.company){
      // const checkCompanyName = await this.employeerRepo.findOne({where:{company:updateEmployeerDto.company}});
      employeer.company = updateEmployeerDto.company;
    }
    if(updateEmployeerDto.name){
      employeer.name = updateEmployeerDto.name;
    }
    if(updateEmployeerDto.phone){
      employeer.phone = updateEmployeerDto.phone;
    }
    if(updateEmployeerDto.address){
      employeer.address = updateEmployeerDto.address;
    }
    employeer.updatedAt = new Date();

    const update = await this.employeerRepo.save(employeer)
    if(!update){
      throw new HttpException("Employeer Profile Not Updated !!!",HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return {msg:"Employeer Profile Updated Successfully !!!"}
  }
}