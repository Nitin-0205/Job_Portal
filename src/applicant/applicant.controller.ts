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
import {AwsS3Service} from "../S3_AWS_Services/aws-s3.config";

@ApiTags("Applicant Profile")
// @UseGuards(JwtApplicantGuard)
@Controller('applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService,
    private readonly awsService: AwsS3Service
  ) { }

  @Get("getApplicantProfile/:applicantId")
  profile(@Param("applicantId") applicantId: string) {
    return this.applicantService.getApplicantProfile(applicantId);
  }

  @Patch("profile/:applicantId")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        applicant: {
            properties: {
              skills: {
                type: "array",
                items: {
                  type: "string"
                }}
          }
        },
        education: {
          type: "array",
          items: {
            type: "object",
            properties: {
              school: { type: "string" },
              degree: { type: "string" },
              fieldofstudy: { type: "string" },
              from: { type: "string" },
              to: { type: "string" },
              current: { type: "string" }
            }
          }
        },
        workExperience: {
          type: "array",
          items: {
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
          }
        },
        projects: {
          type: "array",
          items: {
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
      }
    },
  })
  create(
    @Param("applicantId") applicantId: string,
    @Body() profileApplicantDto: ProfileApplicantDto
    ) {
    profileApplicantDto.applicant.skills = profileApplicantDto?.applicant?.skills?.toString().split(",");
    return this.applicantService.update(applicantId, profileApplicantDto);
  }

  
  @Post("profile/uploadresume/")
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type:"string",
          format: "binary",
          
        },
      }
    },
  })

  @UseInterceptors(FileInterceptor('file'))
  async uploadResume(
    // @Param("applicantId") applicantId: string,
    @UploadedFile("file") file: Express.Multer.File,
    ) {

    return await this.awsService.uploadFile(file);
    console.log("file",file);
    // return this.applicantService.uploadResume(applicantId, file);
  }

}

