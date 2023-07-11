import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bycrpt from 'bcrypt';
import { ApplicantEntity } from 'src/entities/Applicant.entity';
import { v4 as uuidv4 } from 'uuid';
import { WorkExperienceEntity } from 'src/entities/WorkExperience.entity';
import { JwtService } from '@nestjs/jwt';
import { EducationEntity } from 'src/entities/Education.entity';
import { EducationDto } from '../education/dto/education-applicant.dto';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/entities/User.entity';
import { ProfileApplicantDto } from './dto/profile-applicant.dto';
import { ProjectsEntity } from 'src/entities/Projects.entity';
@Injectable()
export class ApplicantService {
  constructor(
    private readonly conFig: ConfigService,
    @InjectRepository(ApplicantEntity) private applicantRepo:Repository<ApplicantEntity>,
    @InjectRepository(WorkExperienceEntity) private worExpRepo:Repository<WorkExperienceEntity>,
    @InjectRepository(EducationEntity) private educationRepo:Repository<EducationEntity>,
    @InjectRepository(UserEntity) private userRepo:Repository<UserEntity>,
    @InjectRepository(ProjectsEntity) private projectRepo:Repository<ProjectsEntity>,
    private jwtService:JwtService
  ) {}


  async getApplicantProfile(applicantId:string){
    const userprof = await this.applicantRepo.findOne({where:{applicantId:applicantId}});
    const user = await this.userRepo.findOne({where:{userId:applicantId}});

    if(!user){
      throw new HttpException("User Not Found !!!",HttpStatus.NOT_FOUND);
    }
    const workExp = await this.worExpRepo.find({where:{applicant:{applicantId}}});
    if(!workExp){
      throw new HttpException("Work Experience Not Found !!!",HttpStatus.NOT_FOUND);
    }
    const education = await this.educationRepo.find({where:{applicant:{applicantId}}});
    if(!education){
      throw new HttpException("Education Not Found !!!",HttpStatus.NOT_FOUND);
    }
    return {...user,...userprof,workExp,education};
  }

  async update(applicantId:string,profileApplicantDto: ProfileApplicantDto,file:any) {
    const {applicant,education,workExperience,projects} = profileApplicantDto;
    const checkEmail = await this.userRepo.findOne({where:{userId:applicantId,role:"applicant"}});
    if(!checkEmail){
      throw new HttpException("User Not Exists !!!",HttpStatus.BAD_REQUEST);
    }
    const updateApplicant = await this.applicantRepo.findOne({where:{applicantId:applicantId}});
    if(!updateApplicant){
      throw new HttpException("Applicant Not Found !!!",HttpStatus.NOT_FOUND);
    }
    if(file){
      applicant.file = file.filename;
    }
    workExperience.workExperienceId = uuidv4();
    education.educationId = uuidv4();
    const createdApplicant = await this.applicantRepo.update({applicantId:applicantId},{skills:applicant.skills,file:applicant.file});
    if(!createdApplicant){
      throw new HttpException("Applicant Profile Update Failed !!!",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const workExp = await this.worExpRepo.save({...workExperience,applicant:updateApplicant});
    if(!workExp){
      throw new HttpException("Work Experience Not Saved !!!",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const edu = await this.educationRepo.save({...education,applicant:updateApplicant});
    if(!edu){
      throw new HttpException("Education Not Saved !!!",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const project = await this.projectRepo.save({...projects,applicant:updateApplicant});
    if(!project){
      throw new HttpException("Education Not Saved !!!",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return {msg:"Applicant Profile Updated Successfully !!!"};

  }


 
}



