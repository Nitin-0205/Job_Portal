import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantEntity } from 'src/entities/Applicant.entity';
import { ProjectsEntity } from 'src/entities/Projects.entity';
import { Repository } from 'typeorm';
import { ProjectDto } from './dto/projects.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateProjectDto } from './dto/update-project.dto';


@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectRepo:Repository<ProjectsEntity>,
    @InjectRepository(ApplicantEntity)
    private readonly applicantRepo:Repository<ApplicantEntity>
){}
  
  
    async addProject(projectDto:ProjectDto,applicantId:string){
      const user = await this.applicantRepo.findOne({where:{applicantId:applicantId}});
      projectDto.projectId = uuidv4();
      console.log(projectDto)
      if(!user){
        throw new HttpException("User Not Found !!!",HttpStatus.NOT_FOUND);
      }
      try{
        const store = await this.projectRepo.save({...projectDto,applicant:user})
      if(!store){
        throw new HttpException("Project Not Saved !!!",HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return {msg:"Project Added Successfully !!!",ProjectId:store?.projectId};

      }catch(err){
        console.log("err",err);
        return {msg:"Failed To  add Project !!!"};
      }
    }

    async getProject(applicantId:string){

      const user = await this.applicantRepo.findOne({where:{applicantId:applicantId}});
      if(!user){
        throw new HttpException("User Not Found !!!",HttpStatus.NOT_FOUND);
      }
      const Project = await this.projectRepo.find({relations:["applicant"] ,where:{applicant:{applicantId}}});
      if(!Project){
        throw new HttpException("Project Not Found !!!",HttpStatus.NOT_FOUND);
      }
      return Project;
    }
  
    async updProject(projectDto:UpdateProjectDto,projectId:string){
      const exp = await this.projectRepo.findOne({where:{projectId}});
      if(!exp){
        throw new HttpException("Project Not Found !!!",HttpStatus.NOT_FOUND);
      }
      
      if(projectDto.title){
        exp.title = projectDto.title;
      }
      if(projectDto.description){
        exp.description = projectDto.description;
      }
      if(projectDto.from){
        exp.from = projectDto.from;
      }
      if(projectDto.to){
        exp.to = projectDto.to;
      }
      if(projectDto.link){
        exp.link = projectDto.link;
      }
      
      const store = await this.projectRepo.save({...exp,updatedAt:new Date()});
      if(!store){
        throw new HttpException("Project Not Updated !!!",HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return {msg:"Project Updated Successfully !!!"};
    }
  
    async delProject(projectId:string){
      const exp = await this.projectRepo.findOne({where:{projectId}});
      if(!exp){
        throw new HttpException("Project Not Found !!!",HttpStatus.NOT_FOUND);
      }
      const store = await this.projectRepo.delete({projectId});
      if(!store){
        throw new HttpException("Project Not Deleted !!!",HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return {msg:"Project Deleted Successfully !!!"};
    }
}
