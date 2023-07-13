import { HttpException, HttpStatus, Injectable,StreamableFile } from '@nestjs/common';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { Repository } from 'typeorm';
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
import { ProjectDto } from 'src/projects/dto/projects.dto';
import { ProjectsEntity } from 'src/entities/Projects.entity';

@Injectable()
export class ApplicantService {
  constructor(
    private readonly conFig: ConfigService,
    @InjectRepository(ApplicantEntity) private applicantRepo: Repository<ApplicantEntity>,
    @InjectRepository(WorkExperienceEntity) private worExpRepo: Repository<WorkExperienceEntity>,
    @InjectRepository(EducationEntity) private educationRepo: Repository<EducationEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    @InjectRepository(ProjectsEntity) private projectRepo: Repository<ProjectsEntity>,
    private jwtService: JwtService
  ) { }


  async getApplicantProfile(applicantId: string) {
    const userprof = await this.applicantRepo.findOne({ where: { applicantId: applicantId } });
    const user = await this.userRepo.findOne({ where: { userId: applicantId } });

    if (!user) {
      throw new HttpException("User Not Found !!!", HttpStatus.NOT_FOUND);
    }
    const workExp = await this.worExpRepo.find({ where: { applicant: { applicantId } } });
    if (!workExp) {
      throw new HttpException("Work Experience Not Found !!!", HttpStatus.NOT_FOUND);
    }
    const education = await this.educationRepo.find({ where: { applicant: { applicantId } } });
    if (!education) {
      throw new HttpException("Education Not Found !!!", HttpStatus.NOT_FOUND);
    }
    return { ...user, ...userprof, workExp, education };
  }

  async update(applicantId: string, profileApplicantDto: ProfileApplicantDto) {
    const { applicant, education, workExperience, projects } = profileApplicantDto;
    const checkEmail = await this.userRepo.findOne({ where: { userId: applicantId, role: "applicant" } });
    if (!checkEmail) {
      throw new HttpException("User Not Exists !!!", HttpStatus.BAD_REQUEST);
    }
    const updateApplicant = await this.applicantRepo.findOne({ where: { applicantId: applicantId } });
    if (!updateApplicant) {
      throw new HttpException("Applicant Not Found !!!", HttpStatus.NOT_FOUND);
    }
    console.log("applicant", applicant);

    const createdApplicant = await this.applicantRepo.update({ applicantId: applicantId }, { skills: applicant.skills, file: applicant.file });
    if (!createdApplicant) {
      throw new HttpException("Applicant Profile Update Failed !!!", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    workExperience?.forEach(async (element: WorkExperienceEntity) => {
      element.workExperienceId = uuidv4();
      const workExp = await this.worExpRepo.save({ ...element, applicant: updateApplicant });
      if (!workExp) {
        throw new HttpException("Work Experience Not Saved !!!", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });



    education?.forEach(async (element: EducationDto) => {
      element.educationId = uuidv4();
      const edu = await this.educationRepo.save({ ...element, applicant: updateApplicant });
      if (!edu) {
        throw new HttpException("Education Not Saved !!!", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });


    projects?.forEach(async (element: ProjectDto) => {
      element.projectId = uuidv4();
      const project = await this.projectRepo.save({ ...element, applicant: updateApplicant });
      if (!project) {
        throw new HttpException("Project Not Saved !!!", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
    return { msg: "Applicant Profile Updated Successfully !!!" };

  }

  async uploadResume(applicantId: string, file: Express.Multer.File) {
    const user = await this.userRepo.findOne({ where: { userId: applicantId } });
    if (!user) {
      throw new HttpException("User Not Found !!!", HttpStatus.NOT_FOUND);
    }

    const uploaded = await this.applicantRepo.update({ applicantId: applicantId }, { file: file.originalname });
    if (!uploaded) {

      throw new HttpException("Resume Not Uploaded !!!", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return { msg: "Resume Uploaded Successfully !!!" };

  }


}



