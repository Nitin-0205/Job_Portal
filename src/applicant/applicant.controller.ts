import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { EducationDto } from '../education/dto/education-applicant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { ProfileApplicantDto } from './dto/profile-applicant.dto';
// import { JwtApplicantGuard } from "src/jwt/applicantjwt.guard"

@ApiTags("Applicant Profile")
// @UseGuards(JwtApplicantGuard)
@Controller('applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService
  ) { }

  @Get("getApplicantProfile/:applicantId")
  profile(@Param("applicantId") applicantId: string) {
    return this.applicantService.getApplicantProfile(applicantId);
  }

  @Patch("profile/:applicantId")
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
        applicant: {
          type: "object",
          properties: {

            skills: {
              type: "array",
              items: {
                type: "string"
              }
            }
          }
        },
        education: {
          type: "object",
          properties: {
            school: { type: "string" },
            degree: { type: "string" },
            fieldofstudy: { type: "string" },
            from: { type: "string" },
            to: { type: "string" },
            current: { type: "string" }
          }
        },
        workExperience: {
          type: "object",
          properties: {
            company: { type: "string" },
            location: { type: "string" },
            position: { type: "string" },
            from: { type: "string" },
            to: { type: "string" },
            current: { type: "string" },
            description: { type: "string" }
          }
        },
        projects: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            link: { type: "string" },
            from: { type: "string" },
            to: { type: "string" },
          }
        }
      }
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
    @Param("applicantId") applicantId: string,
    @UploadedFile("file") file: Express.Multer.File,
    @Body() profileApplicantDto: ProfileApplicantDto) {

    profileApplicantDto.applicant.skills = profileApplicantDto?.applicant?.skills?.toString().split(",");
    console.log("file", profileApplicantDto, file);

    return this.applicantService.update(applicantId, profileApplicantDto, file);
  }

  // @ApiTags("Applicant Signup/Login")
  // @Post("login")
  //  Login(@Body() loginApplicantDto: LoginApplicantDto) {
  //   console.log("loginApplicantDto", loginApplicantDto)
  //   return   this.applicantService.applicantLogin(loginApplicantDto);
  // }

}

