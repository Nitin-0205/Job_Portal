import { Test, TestingModule } from '@nestjs/testing';
import { EmployeerController } from './employeer.controller';
import { EmployeerService } from './employeer.service';

describe('EmployeerController', () => {
  let controller: EmployeerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeerController],
      providers: [EmployeerService],
    }).compile();

    controller = module.get<EmployeerController>(EmployeerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
