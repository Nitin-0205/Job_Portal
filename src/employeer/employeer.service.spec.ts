import { Test, TestingModule } from '@nestjs/testing';
import { EmployeerService } from './employeer.service';

describe('EmployeerService', () => {
  let service: EmployeerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeerService],
    }).compile();

    service = module.get<EmployeerService>(EmployeerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
