import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JobsFilterDto } from './dto/jobs-Filter.dto';
import {JwtGuard } from 'src/jwt/guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { JwtApplicantGuard } from 'src/jwt/guards/applicantjwt.guard';
// import { JwtApplicantGuard } from "src/jwt/applicantjwt.guard"
// @ApiTags("Job")
@ApiBearerAuth()
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @ApiTags("Emplyeer Profile")
  @UseGuards(JwtGuard)
  @Post("createJob/:employerId")
  create(@Param("employerId")employerId:string,@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto,employerId);
  }

  @ApiTags("Emplyeer Profile")
  @UseGuards(JwtGuard)
  @Get("findAllJobsByEmpId")
  findAllJobsByEmpId(@Param("employerId")employerId:string) {
    return this.jobService.findAllJobsByEmpId(employerId);
  }

  @ApiTags("Emplyeer Profile")
  @UseGuards(JwtGuard)
  @Get("viewjobApplicant/")
  viewjobApplicant(@Query("jobId")jobId:string ,@Query("emplId")emplId: string) {
    return this.jobService.viewjobApplicant(emplId,jobId);
  }

  @ApiTags("Emplyeer Profile")
  @UseGuards(JwtGuard)
  @Get("viewjobApplicantProfile")
  viewjobApplicantProfile(@Query("applicantId")applicantId:string,@Query("jobId")jobId:string) {
    return this.jobService.viewjobApplicantProfile(jobId,applicantId);
  }

  
  @ApiTags("Emplyeer Profile")
  @UseGuards(JwtGuard)
  @Get("findJobsById/:JobId")
  findJobsById(@Param("JobId")JobId:string) {
    return this.jobService.findJobsById(JobId);
  }

  @ApiTags("Applicant Profile")
  @UseGuards(JwtApplicantGuard)
  @Get('findAllJobs')
  findAllJobs(@Query()jobsFilterDto:JobsFilterDto) {
    return this.jobService.findJobs(jobsFilterDto);
  }

  @ApiTags("Emplyeer Profile")
  @UseGuards(JwtGuard)
  @Patch('updateJob/:jobId')
  update(@Param('jobId') jobId: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(jobId, updateJobDto);
  }

  @ApiTags("Applicant Profile")
  @UseGuards(JwtApplicantGuard)
  @Get("findAllApplyedJobs/:applcantId")
  findAllJobsByAppId(@Param("applcantId")applcantId:string) {
    return this.jobService.findAllJobsByAppId(applcantId);
  }

  @ApiTags("Applicant Profile")
  @UseGuards(JwtApplicantGuard)
  @Post("jobApply/:jobId/:applicantId")
  jobApply(@Param("jobId")jobId:string,@Param("applicantId")applicantId:string){
    return this.jobService.jobApply(jobId,applicantId)
  }

  @ApiTags("Emplyeer Profile")
  @UseGuards(JwtGuard)
  @Delete(':jobid')
  remove(@Param('id') id: string) {
    return this.jobService.remove(id);
  }
}
