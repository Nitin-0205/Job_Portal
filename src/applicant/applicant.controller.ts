import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { LoginApplicantDto } from './dto/login-applicant.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { EducationDto } from '../education/dto/education-applicant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';

@Controller('applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService
  ) { }

  @ApiTags("Applicant Signup/Login")
  @Post("signup")
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
        name: {
          type: "string"
        },
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
        phone: {
          type: "string",
        },
        address: {
          type: "string"
        },
        skills: {
          type: "array",
          items: {
            type: "string"
          }
        }
      },
    },
  })

  @UseInterceptors(FileInterceptor('file', {
    dest: './files',
    storage: diskStorage({
      destination: './files',
      filename: (req, file, cb) => {
        const fil: string = uuidv4();
        cb(null, `${fil}.${file.originalname}`);
      }
    })
  }))
  create(
    @UploadedFile("file") file: Express.Multer.File,
    @Body() createApplicantDto: CreateApplicantDto) {
    createApplicantDto.skills = createApplicantDto.skills.toString().split(",");
    console.log("file", file,createApplicantDto);

    return this.applicantService.create(createApplicantDto, file);
  }

  @ApiTags("Applicant Signup/Login")
  @Post("login")
  Login(@Body() loginApplicantDto: LoginApplicantDto) {
    return this.applicantService.applicantLogin(loginApplicantDto);
  }

}

