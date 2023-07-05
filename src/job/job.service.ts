import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobEntity } from '../entities/Job.entity';
import { Repository } from 'typeorm';
import { EmployerEntity } from '../entities/Employer.entity';
import {v4 as uuidv4} from "uuid"
import { JobsFilterDto } from './dto/jobs-Filter.dto';
@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobEntity)private jobRepo:Repository<JobEntity>,
    @InjectRepository(EmployerEntity) private employerRepo:Repository<EmployerEntity>
  ){}
  async create(createJobDto: CreateJobDto,employerId:string) {
    const employer = await this.employerRepo.findOne({where:{employerId}})
    if(!employer){
      throw new HttpException("No Access !!!",HttpStatus.FORBIDDEN)
    }
    createJobDto.jobId = uuidv4()
    const addJob = await this.jobRepo.save({...createJobDto,employer})
    console.log(addJob)
    if(!addJob){
      throw new HttpException("Failed  to create New Job !!!",HttpStatus.BAD_REQUEST)
    }

    return {msg :"Job Created Successfully !!!"}
  }

  async findAllJobsById(id:number) {

    const Jobs = await this.jobRepo.find({relations:["employer"],where:{employer:{id}}})
    if(!Jobs){
      throw new HttpException(" No Job Job Created Yet!!!",HttpStatus.NOT_FOUND)

    }
    return Jobs;
  }

  async findJobs(jobsFilterDto:JobsFilterDto) {
    const jobs = await this.jobRepo.find()
    const jobpayload = jobs.filter((job)=>{

      const dat =  (jobsFilterDto?.company !== undefined || job.company.toLowerCase().includes(jobsFilterDto?.company?.toLowerCase()) )
      &&(jobsFilterDto?.jobId !== undefined || job.jobId.includes(jobsFilterDto.jobId))
      && job.jobtitle.toLowerCase().includes(jobsFilterDto?.jobtitle?.toLowerCase())
      && (jobsFilterDto.location !== undefined || job.location.toLowerCase().includes(jobsFilterDto?.location?.toLowerCase()))
      // && job.salary >= jobsFilterDto.salary 
      && (jobsFilterDto?.type !== undefined ||job.type.toLowerCase().includes(jobsFilterDto?.type?.toLowerCase()))

      console.log(job.type.toLowerCase(),jobsFilterDto?.type?.toLowerCase(),(jobsFilterDto?.type === undefined ||job.type.toLowerCase().includes(jobsFilterDto?.type?.toLowerCase())),dat)
      return dat
    })
    
    return jobpayload;
  }

  async update(jobid: string, updateJobDto: UpdateJobDto) {
    const job = await this.jobRepo.findOne({where:{jobId:jobid}})
    if(!job){
      throw new HttpException("Job Not Found !!!",HttpStatus.NOT_FOUND)
    }
    if(updateJobDto.jobtitle){
      job.jobtitle = updateJobDto.jobtitle
    }
    if(updateJobDto.description){
      job.description = updateJobDto.description
    }
    if(updateJobDto.salary){
      job.salary = updateJobDto.salary
    }
    if(updateJobDto.location){
      job.location = updateJobDto.location
    }
    if(updateJobDto.company){
      job.company = updateJobDto.company
    }
    if(updateJobDto.type){
      job.type = updateJobDto.type
    }
    const updatedJob = this.jobRepo.save(job)
    if(!updatedJob){
      throw new HttpException("Failed to Update Job !!!",HttpStatus.BAD_REQUEST)
    }
    return `This Job updated of id  #${jobid}`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
