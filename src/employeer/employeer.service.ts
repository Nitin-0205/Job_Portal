import { Injectable } from '@nestjs/common';
import { CreateEmployeerDto } from './dto/create-employeer.dto';
import { UpdateEmployeerDto } from './dto/update-employeer.dto';

@Injectable()
export class EmployeerService {
  create(createEmployeerDto: CreateEmployeerDto) {
    return 'This action adds a new employeer';
  }

  findAll() {
    return `This action returns all employeer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employeer`;
  }

  update(id: number, updateEmployeerDto: UpdateEmployeerDto) {
    return `This action updates a #${id} employeer`;
  }

  remove(id: number) {
    return `This action removes a #${id} employeer`;
  }
}
