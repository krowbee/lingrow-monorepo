import { Test, TestingModule } from '@nestjs/testing';
import { UserProgressService } from './userprogress.service';

describe('UserprogressService', () => {
  let service: UserProgressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserProgressService],
    }).compile();

    service = module.get<UserProgressService>(UserProgressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
