import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EducationDto } from './dto/education-applicant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EducationEntity } from 'src/entities/Education.entity';
import { Repository } from 'typeorm';
import { ApplicantEntity } from 'src/entities/Applicant.entity';
import {v4 as uuidv4} from 'uuid';
import { UpdateEducationDto } from './dto/update-education.dto';
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
        const store = await this.educationRepo.save({...educationDto,applicant:user})
      if(!store){
        throw new HttpException("Education Not Saved !!!",HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return {msg:"Education Added Successfully !!!",educationId:store?.educationId};

      }catch(err){
        console.log("err",err);
        return {msg:"Failed To  add Education !!!"};
      }
    }

  async getEducation(applicantId:string){
    const user = await this.applicantRepo.findOne({where:{applicantId:applicantId}});
    if(!user){
      throw new HttpException("User Not Found !!!",HttpStatus.NOT_FOUND);
    }
    const education = await this.educationRepo.find({relations:["applicant"] ,where:{applicant:{applicantId}}});
    if(!education){
      throw new HttpException("Education Not Found !!!",HttpStatus.NOT_FOUND);
    }
    return education;
  }

  async updEducation(educationDto:UpdateEducationDto,educationId:string){
    const exp = await this.educationRepo.findOne({where:{educationId}});
    if(!exp){
      throw new HttpException("Education Not Found !!!",HttpStatus.NOT_FOUND);
    }
    
    if(educationDto.school){
      exp.school = educationDto.school;
    }
    if(educationDto.degree){
      exp.degree = educationDto.degree;
    }
    if(educationDto.current){
      exp.current = educationDto.current;
    }
    if(educationDto.fieldofstudy){
      exp.fieldofstudy = educationDto.fieldofstudy;
    }
    if(educationDto.from){
      exp.from = educationDto.from;
    }
    if(educationDto.to){
      exp.to = educationDto.to;
    }
    
    const store = await this.educationRepo.save({...exp,updatedAt:new Date()});
    if(!store){
      throw new HttpException("Education Not Updated !!!",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return {msg:"Education Updated Successfully !!!"};
  }

  async delEducation(educationId:string){
    const exp = await this.educationRepo.findOne({where:{educationId}});
    if(!exp){
      throw new HttpException("Education Not Found !!!",HttpStatus.NOT_FOUND);
    }
    const store = await this.educationRepo.delete({educationId});
    if(!store){
      throw new HttpException("Education Not Deleted !!!",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return {msg:"Education Deleted Successfully !!!"};
  }
}
