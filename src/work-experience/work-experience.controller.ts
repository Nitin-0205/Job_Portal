import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { WorkExperienceService } from './work-experience.service';
import { ApiTags } from '@nestjs/swagger';
import { WorkExpDto } from './dto/work-experience.dto';
import { JwtGuard } from 'src/jwt/jwt.guard';
// import { JwtApplicantGuard } from "src/jwt/applicantjwt.guard"

// @UseGuards(JwtApplicantGuard)
@ApiTags("Work Experience")
@UseGuards(JwtGuard)
@Controller('applicant')
export class WorkExperienceController {
  constructor(private readonly workExperienceService: WorkExperienceService) {}
    
  @Post("addworkexperience/:applicantId")
  addWorkExperience(@Param("applicantId") applicantId: string, @Body() workExpDto: WorkExpDto) {
    return this.workExperienceService.addWorkExperience(workExpDto, applicantId);
  }

  @Get("getworkexperience/:applicantId")
  getWorkExperience(@Param("applicantId") applicantId: string) {
    return this.workExperienceService.getAllWorkExperience(applicantId);
  }

  @ApiTags("Work Experience")
  @Patch("updateworkexperience/:workExperienceId")
  updWorkExperience(@Param("workExperienceId") workExperienceId: string, @Query() workExpDto: WorkExpDto) {
    return this.workExperienceService.updWorkExperience(workExpDto, workExperienceId);
  }

  @ApiTags("Work Experience")
  @Delete("delworkexperience/:workExperienceId")
  delWorkExperience(@Param("workExperienceId") workExperienceId: string) {
    return this.workExperienceService.delWorkExperience(workExperienceId);
  }
  
  
}
