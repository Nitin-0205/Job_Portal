import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JobsFilterDto } from './dto/jobs-Filter.dto';

@ApiTags("Job")
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post("createJob/:employerId")
  create(@Param("employerId")employerId:string,@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto,employerId);
  }

  @Get("findAllJobsById/:Id")
  findAllJobsById(@Param("Id")Id:string) {
    return this.jobService.findAllJobsById(+Id);
  }

  @Post('findAllJobs')
  findAllJobs(@Body()jobsFilterDto:JobsFilterDto) {
    return this.jobService.findJobs(jobsFilterDto);
  }

  @Patch('updateJob/:jobId')
  update(@Param('jobId') jobId: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(jobId, updateJobDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.jobService.remove(+id);
  // }
}
