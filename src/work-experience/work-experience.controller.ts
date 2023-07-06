import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WorkExperienceService } from './work-experience.service';
import { ApiTags } from '@nestjs/swagger';
import { WorkExpDto } from './dto/work-experience.dto';

@ApiTags("Work Experience")
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
  @Post("updateworkexperience/:workExperienceId")
  updWorkExperience(@Param("workExperienceId") workExperienceId: string, @Body() workExpDto: WorkExpDto) {
    return this.workExperienceService.updWorkExperience(workExpDto, workExperienceId);
  }
  
}
