import { Body, Controller, Param, Post } from '@nestjs/common';
import { EducationService } from './education.service';
import { ApiTags } from '@nestjs/swagger';
import { EducationDto } from './dto/education-applicant.dto';

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  
  @ApiTags("Education")
  @Post("addeducation/:applicantId")
  addeducation(@Param("applicantId") applicantId: string, @Body() educationdto: EducationDto) {
    return this.educationService.addEducation(educationdto, applicantId);
  }

}
