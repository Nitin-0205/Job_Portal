import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EducationDto } from './dto/education-applicant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EducationEntity } from 'src/entities/Education.entity';
import { Repository } from 'typeorm';
import { ApplicantEntity } from 'src/entities/Applicant.entity';
import {v4 as uuidv4} from 'uuid';
@Injectable()
export class EducationService {
    constructor(
        @InjectRepository(EducationEntity)
        private readonly educationRepo:Repository<EducationEntity>,
        @InjectRepository(ApplicantEntity)
        private readonly applicantRepo:Repository<ApplicantEntity>
    ){}
    
  async addEducation(educationDto:EducationDto,applicantId:string){
    const user = await this.applicantRepo.findOne({where:{applicantId:applicantId}});
    educationDto.educationId = uuidv4();
    if(!user){
      throw new HttpException("User Not Found !!!",HttpStatus.NOT_FOUND);
    }
    try{
      const store = this.educationRepo.save({...educationDto,applicant:user})
    if(!store){
      throw new HttpException("Education Not Saved !!!",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }catch(err){
      console.log("err",err);
      return {msg:"Education Added Successfully !!!"};
    }
  }

}
