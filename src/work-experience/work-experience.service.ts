import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantEntity } from 'src/entities/Applicant.entity';
import { WorkExperienceEntity } from 'src/entities/WorkExperience.entity';
import { Repository } from 'typeorm';
import { WorkExpDto } from './dto/work-experience.dto';
import {v4 as uuidv4} from 'uuid';
@Injectable()
export class WorkExperienceService {
    constructor(
        @InjectRepository(ApplicantEntity)
        private readonly applicantRepo:Repository<ApplicantEntity>,
        @InjectRepository(WorkExperienceEntity)
        private readonly worExpRepo:Repository<WorkExperienceEntity>
      ){}

    async getAllWorkExperience(applicantId:string) {
        const user = await this.applicantRepo.findOne({where:{applicantId:applicantId}});
        if(!user){
          throw new HttpException("User Not Found !!!",HttpStatus.NOT_FOUND);
        }
        const workExp = await this.worExpRepo.find({relations:["applicant"],where:{applicant:{applicantId}}});
        if(!workExp){
          throw new HttpException("Work Experience Not Found !!!",HttpStatus.NOT_FOUND);
        }
        return workExp;
      }

      async addWorkExperience(workExpDto:WorkExpDto,applicantId:string){
        const user = await this.applicantRepo.findOne({where:{applicantId:applicantId}});
        if(!user){
          throw new HttpException("User Not Found !!!",HttpStatus.NOT_FOUND);
        }
        workExpDto.workExperienceId = uuidv4();
        try{
          const store  = this.worExpRepo.save({...workExpDto,applicant:user})
        if(!store){
          throw new HttpException("Work Experience Not Saved !!!",HttpStatus.INTERNAL_SERVER_ERROR);
        } 
        return {msg:"Work Experience Added Successfully !!!"};
        }catch(err){
          console.log("err",err);
          return {msg:"Failed To Add WorkExperiance  !!!"};
    
        }
      }

      async updWorkExperience(workExpDto:WorkExpDto,workExperienceId:string){
        try{
        console.log(workExpDto)
        const exp = await this.worExpRepo.findOne({where:{workExperienceId}});
        if(!exp){
          throw new HttpException("Work Experience Not Found !!!",HttpStatus.NOT_FOUND);
        }
        if(workExpDto.company){
          exp.company = workExpDto.company;
        }
        if(workExpDto.description){
          exp.description = workExpDto.description;
        }
        if(workExpDto.from){
          exp.from = workExpDto.from;
        }
        if(workExpDto.to){
          exp.to = workExpDto.to;
        }
        if(workExpDto.current){
          exp.current = workExpDto.current;
        }
        if(workExpDto.position){
          exp.position = workExpDto.position;
        }
        if(workExpDto.location){
          exp.location = workExpDto.location;
        }
          exp.updatedAt = new Date();
          const store  = this.worExpRepo.save(exp)
    
        if(!store){
          throw new HttpException("Work Experience Not Saved !!!",HttpStatus.INTERNAL_SERVER_ERROR);
        } 
        return {msg:"Work Experience Updated Successfully !!!"};
    
        }catch(err){
          console.log("err",err);
          return {msg:"Work Experience Updated Failed !!!"};
    
        }
        // return ;
      }
}
