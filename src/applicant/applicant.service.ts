import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bycrpt from 'bcrypt';
import { LoginApplicantDto } from './dto/login-applicant.dto';
import { ApplicantEntity } from 'src/entities/Applicant.entity';

@Injectable()
export class ApplicantService {
  constructor(
    @InjectRepository(ApplicantEntity) private applicantRepo:Repository<ApplicantEntity>
  ) {}


  async create(createApplicantDto: CreateApplicantDto) {
    const hashPassword = await bycrpt.hash(createApplicantDto.password,10);
    createApplicantDto.password = hashPassword;
    this.applicantRepo.create(createApplicantDto)
    const createdApplicant = await this.applicantRepo.save(createApplicantDto);
    if(!createdApplicant){
      throw new HttpException("Applicant Signup Failed !!!",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return {msg:"Applicant Signup Failed !!!"};
  }

  async applicantLogin(loginApplicantDto:LoginApplicantDto) {
    const applicant = await this.applicantRepo.findOneBy({email:loginApplicantDto.email});
    if(!applicant){
      throw new HttpException("User Not Found !!!",HttpStatus.NOT_FOUND);
    }
    const isMatch = await bycrpt.compare(loginApplicantDto.password,applicant?.password);
    if(!isMatch){
      throw new HttpException("Invalid Credentials !!!",HttpStatus.BAD_REQUEST);
    }
    return `This action returns all applicant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} applicant`;
  }

  update(id: number, updateApplicantDto: UpdateApplicantDto) {
    return `This action updates a #${id} applicant`;
  }

  remove(id: number) {
    return `This action removes a #${id} applicant`;
  }
}
