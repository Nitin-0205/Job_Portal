import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobEntity } from '../entities/Job.entity';
import { Repository } from 'typeorm';
import { EmployerEntity } from '../entities/Employer.entity';
import {v4 as uuidv4} from "uuid"
import { JobsFilterDto } from './dto/jobs-Filter.dto';
import { ApplicantEntity } from 'src/entities/Applicant.entity';
@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobEntity)private jobRepo:Repository<JobEntity>,
    @InjectRepository(EmployerEntity) private employerRepo:Repository<EmployerEntity>,
    @InjectRepository(ApplicantEntity) private applcantRepo:Repository<ApplicantEntity>
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
    const upd = jobs.filter((job)=>{
      if(jobsFilterDto.jobtitle){
        return job.jobtitle.toLowerCase().includes(jobsFilterDto.jobtitle.toLowerCase())
      }
      if(jobsFilterDto.location){
        return job.location.toLowerCase().includes(jobsFilterDto.location.toLowerCase())
      }
      if(jobsFilterDto.type){
        return job.type.toLowerCase().includes(jobsFilterDto.type.toLowerCase())
      }
      if(jobsFilterDto.company){
        return job.company.toLowerCase().includes(jobsFilterDto.company.toLowerCase())
      }
      if(jobsFilterDto.salary){
        return job.salary >= jobsFilterDto.salary
      }
    })
    
    const jobpayload = upd.map((job)=>{
      return {
        jobId:job.jobId,
        jobtitle:job.jobtitle,
        description:job.description,
        salary:job.salary,
        location:job.location,
        company:job.company,
        type:job.type,
        employer:job.employer
      }
    })
    if(jobpayload.length == 0){
      throw new HttpException("No Job Found !!!",HttpStatus.NOT_FOUND)
    }
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

  async jobApply(jobId:string,applicantId:string){
    const job = await this.jobRepo.findOne({relations:["applicant"],where:{jobId}})
    if(!job){
      throw new HttpException("Job Not Found !!!",HttpStatus.NOT_FOUND)
    }
    const applicant = await this.applcantRepo.findOne({where:{applicantId}})
    if(!applicant){
      throw new HttpException("Applicant Not Found !!!",HttpStatus.NOT_FOUND)
    }
    console.log(job)
    if(job.applicant.length != 0){
      const check = job.applicant.find((app)=>{
        return app.applicantId == applicantId
      })
      if(check){
        throw new HttpException("Already Applied !!!",HttpStatus.BAD_REQUEST)
      }
    }
    job.applicant.push(applicant) 
    const apply = await this.jobRepo.save(job)
    if(!apply){
      throw new HttpException("Failed to Apply !!!",HttpStatus.BAD_REQUEST)
    }
    return {msg:"You have Applied for This Job Successfully !!!"}


  }

  // async remove(jobid: string) {
  //   const job = await this.jobRepo.findOne({where:{jobId:jobid}})
  //   if(!job){
  //     throw new HttpException("Job Not Found !!!",HttpStatus.NOT_FOUND)
  //   }
  //   const deleteJob = await this.jobRepo.delete(jobid)
  //   if(!deleteJob){
  //     throw new HttpException("Failed to Delete Job !!!",HttpStatus.BAD_REQUEST)
  //   }
  //   return `This Job deleted of id  #${jobid}`;
  // }

}
