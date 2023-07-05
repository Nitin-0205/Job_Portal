import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bycrpt from 'bcrypt';
import { LoginApplicantDto } from './dto/login-applicant.dto';
import { ApplicantEntity } from 'src/entities/Applicant.entity';
import { WorkExpDto } from './dto/work-experience.dto';
import { v4 as uuidv4 } from 'uuid';
import { WorkExperienceEntity } from 'src/entities/WorkExperience.entity';
import { JwtService } from '@nestjs/jwt';
import { EducationEntity } from 'src/entities/Education.entity';
import { EducationDto } from './dto/education-applicant.dto';
@Injectable()
export class ApplicantService {
  constructor(
    @InjectRepository(ApplicantEntity) private applicantRepo:Repository<ApplicantEntity>,
    @InjectRepository(WorkExperienceEntity) private worExpRepo:Repository<WorkExperienceEntity>,
    @InjectRepository(EducationEntity) private educationRepo:Repository<EducationEntity>,
    private jwtService:JwtService
  ) {}



  async create(createApplicantDto: CreateApplicantDto,file:any) {
    const checkEmail = await this.applicantRepo.findOne({where:{email:createApplicantDto.email}});
    if(checkEmail){
      throw new HttpException("User Already Exists !!!",HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bycrpt.hash(createApplicantDto.password,10);
    createApplicantDto.password = hashPassword;
    createApplicantDto.applicantId = uuidv4();
    createApplicantDto.file = file.filename;
    this.applicantRepo.create(createApplicantDto);
    // const workExppayload = createApplicantDto.workExperience;
    // workExppayload.workExperienceId = uuidv4();
    // const applicant = await  this.applicantRepo.find({where:{email:createApplicantDto.email}});

    // console.log("applicant",applicant);
    // const workExp = await this.worExpRepo.save({...workExppayload,applicant:applicant});
    // if(!workExp){
    //   throw new HttpException("Work Experience Not Saved !!!",HttpStatus.INTERNAL_SERVER_ERROR);
    // }
    const createdApplicant = await this.applicantRepo.save(createApplicantDto);
    if(!createdApplicant){
      throw new HttpException("Applicant Signup Failed !!!",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    // const data = await this.worExpRepo.find({relations: ['applicant'], where: { workExperienceId: "af001fbf-d073-42e7-bccf-0a02481b8548" } });
    // return data;

    return {msg:"Applicant SignUp Successfull !!!"};
  }

  async applicantLogin(loginApplicantDto:LoginApplicantDto) {
    const applicant = await this.applicantRepo.findOne({where:{email:loginApplicantDto.email}});
    console.log("applicant",applicant);
    if(!applicant){
      throw new HttpException("User Not Found !!!",HttpStatus.NOT_FOUND);
    }
    const isMatch = await bycrpt.compare(loginApplicantDto.password,applicant.password);
    if(!isMatch){
      throw new HttpException("Invalid Credentials !!!",HttpStatus.BAD_REQUEST);
    }
    const token = this.jwtService.sign({id:applicant.applicantId});
    return {token:token};
    // return `This action returns all applicant`;
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
    }catch(err){
      console.log("err",err);
      return {msg:"Work Experience Added Successfully !!!"};

    }
    // return ;
  }
  async updWorkExperience(workExpDto:WorkExpDto,workExperienceId:string){
    try{
    console.log(workExpDto)
    const exp = await this.worExpRepo.findOne({where:{workExperienceId}});
    if(!exp){
      throw new HttpException("Work Experience Not Found !!!",HttpStatus.NOT_FOUND);
    }
      // const update = this.worExpRepo.update()
    //   const store  = this.worExpRepo.save({...workExpDto})

    // if(!store){
    //   throw new HttpException("Work Experience Not Saved !!!",HttpStatus.INTERNAL_SERVER_ERROR);
    // } 

    }catch(err){
      console.log("err",err);
      return {msg:"Work Experience Updated Successfully !!!"};

    }
    // return ;
  }
  

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
