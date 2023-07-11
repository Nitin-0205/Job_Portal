import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bycrpt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from 'src/entities/User.entity';
import { EmployerEntity } from 'src/entities/Employer.entity';
import { CreateEmployeerDto } from 'src/employeer/dto/create-employeer.dto';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { ApplicantEntity } from 'src/entities/Applicant.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo:Repository<UserEntity>,
    @InjectRepository(EmployerEntity) private employerRepo:Repository<EmployerEntity>,
    @InjectRepository(ApplicantEntity) private applicantRepo:Repository<ApplicantEntity>,
    private jwtService:JwtService)
  {}
  async create(createUserDto: CreateUserDto) {

    const checkEmail = await this.userRepo.findOneBy({email:createUserDto.email,role:createUserDto.role});
    if(checkEmail){
      throw new HttpException("User Already Exists !!!",HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bycrpt.hash(createUserDto.password,10);
    createUserDto.password = hashPassword;
    const UserId = uuidv4();
    createUserDto.userId = UserId;
    if(createUserDto.role.toString().toLowerCase() === "employer"){
      this.employerRepo.save({employerId:UserId})
    }
    else if(createUserDto.role.toString().toLowerCase() === "applicant"){
      this.applicantRepo.save({applicantId:UserId})
    }else{
      throw new HttpException("Invalid Role !!!",HttpStatus.BAD_REQUEST);
    }
    this.userRepo.create(createUserDto);
    const createdApplicant = await this.userRepo.save(createUserDto);
    if(!createdApplicant){
      throw new HttpException("User Signup Failed !!!",HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return {msg:"User SignUp Successfull !!!"};
  }

  async userLogin(loginUserDto:LoginUserDto) {
    const user = await this.userRepo.findOne({where:{email:loginUserDto.email,role:loginUserDto.role}});
    console.log("user",user);
    if(!user){
      throw new HttpException("User Not Found !!!",HttpStatus.NOT_FOUND);
    }
    const isMatch = await bycrpt.compare(loginUserDto.password,user.password);
    if(!isMatch){
      throw new HttpException("Invalid Credentials !!!",HttpStatus.BAD_REQUEST);
    }
    const payload = {email:loginUserDto.email,userId:user.userId}
    const token = await this.jwtService.sign(payload);
    return {msg:"User Login Successfull !!!",userId:user.userId,token:token};
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}


