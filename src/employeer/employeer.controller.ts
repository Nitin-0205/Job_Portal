import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeerService } from './employeer.service';
import { CreateEmployeerDto } from './dto/create-employeer.dto';
import { UpdateEmployeerDto } from './dto/update-employeer.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('employeer')
export class EmployeerController {
  constructor(private readonly employeerService: EmployeerService) {}

  @ApiTags("Emplyeer Signup/Login")
  @Post("signup")
  create(@Body() createEmployeerDto: CreateEmployeerDto) {
    return this.employeerService.create(createEmployeerDto);
  }
}
