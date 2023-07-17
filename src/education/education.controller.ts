import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { EducationService } from './education.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EducationDto } from './dto/education-applicant.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { JwtApplicantGuard } from "src/jwt/guards/applicantjwt.guard"

@UseGuards(JwtApplicantGuard)
@ApiBearerAuth()
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  
  @ApiTags("Education")
  @Post("addeducation/:applicantId")
  addeducation(@Param("applicantId") applicantId: string, @Body() educationdto: EducationDto) {
    return this.educationService.addEducation(educationdto, applicantId);
  }

  @ApiTags("Education") 
  @Get("geteducation/:applicantId")
  geteducation(@Param("applicantId") applicantId: string) {
    return this.educationService.getEducation(applicantId);
  }
  
  @ApiTags("Education")
  @Patch("updeducation/:educationId")
  updeducation(@Param("educationId") educationId: string, @Body() updateEducationDto: UpdateEducationDto) {
    return this.educationService.updEducation(updateEducationDto, educationId);
  }

  @ApiTags("Education")
  @Delete("deleducation/:educationId")
  deleducation(@Param("educationId") educationId: string) {
    return this.educationService.delEducation(educationId);
  }
  
  

}
