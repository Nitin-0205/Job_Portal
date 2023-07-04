import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApplicantService } from './applicant.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { LoginApplicantDto } from './dto/login-applicant.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Applicant")
@Controller('applicant')
export class ApplicantController {
  constructor(private readonly applicantService: ApplicantService
    ) {}

  @Post("signup")
  create(@Body() createApplicantDto: CreateApplicantDto) {
    return this.applicantService.create(createApplicantDto);
  }

  @Get("login")
  Login(@Body() loginApplicantDto: LoginApplicantDto) {
    return this.applicantService.applicantLogin(loginApplicantDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplicantDto: UpdateApplicantDto) {
    return this.applicantService.update(+id, updateApplicantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicantService.remove(+id);
  }
}
