import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmployeerService } from './employeer.service';
import { CreateEmployeerDto } from './dto/create-employeer.dto';
import { UpdateEmployeerDto } from './dto/update-employeer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/jwt/guards/jwt.guard'
// import { ConfigService } from '@nestjs/config';

@Controller('employeer')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class EmployeerController {
  constructor(private readonly employeerService: EmployeerService,
    // private configService: ConfigService,
    ) {}

  // @ApiTags("Emplyeer Signup/Login")
  // @Post("signup")
  // create(@Body() createEmployeerDto: CreateEmployeerDto) {
  //   console.log(process.env.JWT_SECRET)
  //   return this.configService.get("JWT_SECRET")
  //   return this.employeerService.create(createEmployeerDto);
  // }
  // @ApiTags("Emplyeer Signup/Login")
  // @Post("login")
  // login(@Body() loginEmployeerDto : LoginEmployeerDto) {
  //   return this.employeerService.employeerLogin(loginEmployeerDto);
  // }

  @ApiTags("Emplyeer Profile")
  @Get("getEmployeerProfile:employerId")
  profile(@Param("employerId") employerId:string) {
    return this.employeerService.employeerProfile(employerId);
  }

  @ApiTags("Emplyeer Profile")
  @Patch("updateEmployeerProfile/:employerId")
  update(@Param("employerId") employerId:string,@Body() updateEmployeerDto: UpdateEmployeerDto) {

    return this.employeerService.updateEmployeerProfile(updateEmployeerDto,employerId);
  }

}
