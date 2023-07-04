import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeerService } from './employeer.service';
import { CreateEmployeerDto } from './dto/create-employeer.dto';
import { UpdateEmployeerDto } from './dto/update-employeer.dto';

@Controller('employeer')
export class EmployeerController {
  constructor(private readonly employeerService: EmployeerService) {}

  @Post()
  create(@Body() createEmployeerDto: CreateEmployeerDto) {
    return this.employeerService.create(createEmployeerDto);
  }

  @Get()
  findAll() {
    return this.employeerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeerDto: UpdateEmployeerDto) {
    return this.employeerService.update(+id, updateEmployeerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeerService.remove(+id);
  }
}
